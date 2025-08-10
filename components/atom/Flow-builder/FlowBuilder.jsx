'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Plus, Settings, Trash2, X, Play, SearchCheck, XCircleIcon, CheckCircle2 } from 'lucide-react';
import { useFlowStore } from '@/store/useFlowStore';
import { useNodeSettings } from '@/store/useNodeSettings';
import GoogleSheet from '@/lib/googleSheet/googleSheet';
import { toast } from 'sonner';
import { useResponse } from '@/store/useResponse';
import useExecutionDataStore from '@/store/useExecutionDataStore';


export default function FlowBuilder() {
    const [loadingNodeType, setLoadingNodeType] = useState(null);
    const [nodeResult, setNodeResult] = useState({
        node: '',
        data: [],
        status: null
    });

    const canvasRef = useRef(null);
    const nodeRefMap = useRef({});
    const [forceUpdate, setForceUpdate] = useState(0); // Add force update state
    const nodes = useFlowStore((s) => s.nodes);
    const edges = useFlowStore((s) => s.edges);
    const offset = useFlowStore((s) => s.offset);
    const scale = useFlowStore((s) => s.scale);
    const connecting = useFlowStore((s) => s.connecting);
    const mousePosition = useFlowStore((s) => s.mousePosition);
    const setNodesUpdate = useFlowStore((s) => s.setNodesUpdate);
    const setEdges = useFlowStore((s) => s.setEdges);
    const setOffset = useFlowStore((s) => s.setOffset);
    const setScale = useFlowStore((s) => s.setScale);
    const setConnecting = useFlowStore((s) => s.setConnecting);
    const setMousePosition = useFlowStore((s) => s.setMousePosition);
    const removeNode = useFlowStore((s) => s.removeNode);
    const removeEdge = useFlowStore((s) => s.removeEdge);
    const setNodeType = useNodeSettings((s) => s.setNodeType);
    const setNodeSettingOpen = useNodeSettings((s) => s.setNodeSettingOpen);

    const ExecutionResult = useResponse((state) => state.result)
    const pushNodeExecutionData = useExecutionDataStore((state) => state.pushNodeExecutionData);
    const executionData = useExecutionDataStore((state) => state.executionData);


  

    // Force re-render when nodes change especially after import
    useEffect(() => {
        if (nodes.length > 0) {
            // Small delay to ensure DOM elements are rendered
            const timer = setTimeout(() => {
                setForceUpdate(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [nodes.length]);

    const handleWheel = (e) => {
        const delta = e.deltaY * 0.001;
        const newScale = Math.max(0.1, Math.min(3, scale - delta));
        setScale(newScale);
    };


    const handleMouseDown = (e) => {
        if (connecting) {
            setConnecting(null);
            return;
        }

        if (e.target.classList.contains('node') || e.target.closest('.connector')) return;
        const startX = e.clientX;
        const startY = e.clientY;
        const initialOffset = { ...offset };

        const onMouseMove = (moveEvent) => {
            setOffset({
                x: initialOffset.x + (moveEvent.clientX - startX),
                y: initialOffset.y + (moveEvent.clientY - startY),
            });
        };
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const handleNodeMouseDown = (e, nodeId) => {
        e.stopPropagation();
        const node = nodes.find((n) => n.id === nodeId);
        const startX = e.clientX;
        const startY = e.clientY;
        const startPos = { ...node.position };

        const onMouseMove = (moveEvent) => {
            const newPos = {
                x: startPos.x + (moveEvent.clientX - startX) / scale,
                y: startPos.y + (moveEvent.clientY - startY) / scale,
            };

            const updatedNodes = nodes.map(n =>
                n.id === nodeId ? { ...n, position: newPos } : n
            );

            setNodesUpdate(updatedNodes)


        };
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };



    // Check if a node can have more outgoing connections
    const canNodeConnect = (nodeId) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return false;

        // Router nodes can have unlimited outgoing connections
        if (node.type === 'router') return true;

        // Other nodes can only have one outgoing connection
        const outgoingConnections = edges.filter(edge => edge.source === nodeId);
        return outgoingConnections.length === 0;
    };

    // Check if a node can receive more incoming connections
    const canNodeReceiveConnection = (nodeId) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return false;

        // ALL nodes (including router) can only receive one incoming connection
        const incomingConnections = edges.filter(edge => edge.target === nodeId);
        return incomingConnections.length === 0;
    };

    const handleStartConnect = (e, sourceId) => {
        e.stopPropagation();

        // Check if source node can make a connection
        if (!canNodeConnect(sourceId)) {
            return; // Don't start connecting if node already has max connections
        }

        const bounds = canvasRef.current.getBoundingClientRect();
        const mouseX = (e.clientX - bounds.left - offset.x) / scale;
        const mouseY = (e.clientY - bounds.top - offset.y) / scale;
        setConnecting({ source: sourceId });
        setMousePosition({ x: mouseX, y: mouseY });
    };

    const handleMouseMove = (e) => {
        if (!connecting) return;
        const bounds = canvasRef.current.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - bounds.left - offset.x) / scale,
            y: (e.clientY - bounds.top - offset.y) / scale,
        });
    };

    const handleCompleteConnect = (targetId) => {
        if (connecting && connecting.source !== targetId) {
            // Check if target can receive connection
            if (!canNodeReceiveConnection(targetId)) {
                setConnecting(null);
                return;
            }

            const edgeId = `e-${connecting.source}-${targetId}`;
            const exists = edges.some((e) => e.id === edgeId);
            if (!exists) {

                const newEdge = {
                    id: edgeId,
                    source: connecting.source,
                    target: targetId,
                    animated: true,
                };

                setEdges(newEdge)
            }
        }
        setConnecting(null);
    };

    // Function to disconnect an edge
    const handleDisconnectEdge = (edgeId, e) => {
        e.stopPropagation();
        removeEdge(edgeId)
    };

    const generateSmoothPath = (x1, y1, x2, y2) => {
        const dx = Math.abs(x2 - x1) / 2;
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    };




    const getConnectorPosition = (nodeId, direction = 'right') => {
        const node = nodes.find(n => n.id === nodeId);

        // Return null if node doesn't exist - this will be handled by the caller
        if (!node || !node.position) {
            return null;
        }

        const nodeElement = nodeRefMap.current[nodeId];

        if (!nodeElement) {
            // Fallback: use default node dimensions if element not available
            const defaultWidth = 96; // w-24 = 6rem = 96px (diamond width)
            const defaultHeight = 96; // h-24 = 6rem = 96px (diamond height)

            if (direction === 'right') {
                return {
                    x: node.position.x + defaultWidth,
                    y: node.position.y + defaultHeight / 2,
                };
            } else {
                return {
                    x: node.position.x,
                    y: node.position.y + defaultHeight / 2,
                };
            }
        }

        const computedStyle = window.getComputedStyle(nodeElement);
        const nodeWidth = parseFloat(computedStyle.width);
        const nodeHeight = parseFloat(computedStyle.height);

        if (direction === 'right') {
            return {
                x: node.position.x + nodeWidth,
                y: node.position.y + nodeHeight / 2,
            };
        } else {
            return {
                x: node.position.x,
                y: node.position.y + nodeHeight / 2,
            };
        }
    };




    const getSVGBounds = () => {
        if (!Array.isArray(nodes) || nodes.length === 0) {
            return { x: 0, y: 0, width: 0, height: 0 };
        }

        const padding = 1000;
        const minX = Math.min(...nodes.map(n => n?.position?.x || 0)) - padding;
        const minY = Math.min(...nodes.map(n => n?.position?.y || 0)) - padding;
        const maxX = Math.max(...nodes.map(n => n?.position?.x || 0)) + padding;
        const maxY = Math.max(...nodes.map(n => n?.position?.y || 0)) + padding;


        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        };
    };

    const svgBounds = getSVGBounds();






    // function pushNodeExecutionData(nodeId, jsonData, executionDataStore) {
    //     executionDataStore[nodeId] = {
    //         json: jsonData,
    //         headers: Object.keys(jsonData),
    //         timestamp: Date.now()
    //     };
    // }

    //single node execution
    const handleSingleNode = async (node) => {

        setLoadingNodeType(node.type)

        try {
            switch (node.type) {
                case 'sheet': {

                    const sheetName = 'Sheet1'
                    const currentNode = nodes.find(n => n.id === node.id);
                    const { content } = currentNode



                    const result = await GoogleSheet({ spreadsheetId: content.sheetId, sheetName, containHeader: true, nodeId: currentNode.id, range: 'A1:Z' })
                    console.log(result)
                    if (result.status === 201) {
                        setNodeResult({ node: node.type, data: result, status: 201 })

                        pushNodeExecutionData(currentNode.id, result.data)



                        toast.success('Google Sheet executed successfully', {
                            position: 'bottom-right'
                        })
                    } else if (result.status === 401) {
                        console.log('something wrong')
                        setNodeResult({ node: node.type, data: result, status: 401 })
                        toast.error('Google Sheet execution failed ', {
                            position: 'bottom-right'
                        })
                    } else {
                        console.log('server error')
                        toast.error('Your Google Sheet connection has expired. Please reconnect.', {
                            position: 'bottom-right'
                        })
                    }

                }

                    break;

                case 'telegram': {
                    console.log('telegram click')
                }

            }
        } catch (error) {

            console.log(error)

        } finally {
            setLoadingNodeType(null)
        }



    }

    console.log(executionData, 'execution data store')


    const handleExecutionDetailOpen = (node) => {

        console.log(nodeResult, 'node result')

        console.log(ExecutionResult, 'execution result')

        // console.log(node)

    }



    return (
        <div className="w-full h-screen bg-gray-100" onMouseMove={handleMouseMove}>

            <div
                ref={canvasRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                className="relative w-full h-[100dvh] overflow-hidden cursor-grab select-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0",
                }}


            >


                {nodes.length !== 0 && (
                    <svg
                        className="absolute top-0 left-0 pointer-events-none"
                        style={{
                            left: svgBounds.x * scale + offset.x,
                            top: svgBounds.y * scale + offset.y,
                            width: svgBounds.width * scale,
                            height: svgBounds.height * scale,
                        }}
                        viewBox={`${svgBounds.x} ${svgBounds.y} ${svgBounds.width} ${svgBounds.height}`}
                        preserveAspectRatio="none"
                        key={forceUpdate} // Force SVG re-render when nodes change
                    >
                        {edges.map((edge) => {
                            const source = getConnectorPosition(edge.source, 'right');
                            const target = getConnectorPosition(edge.target, 'left');
                            if (!source || !target) return null;
                            const d = generateSmoothPath(source.x, source.y, target.x, target.y);

                            // Calculate midpoint for disconnect button
                            const midX = (source.x + target.x) / 2;
                            const midY = (source.y + target.y) / 2;

                            return (
                                <g key={edge.id}>
                                    <path
                                        d={d}
                                        stroke="black"
                                        fill="none"
                                        strokeWidth="2"
                                        className="hover:stroke-red-500 cursor-pointer"
                                    />
                                    {/* Disconnect button */}
                                    <foreignObject
                                        x={midX - 10}
                                        y={midY - 10}
                                        width="20"
                                        height="20"
                                        className="pointer-events-auto"
                                    >
                                        <div
                                            className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 shadow-lg"
                                            onClick={(e) => handleDisconnectEdge(edge.id, e)}
                                        >
                                            <X size={12} className="text-white" />
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })}
                        {connecting && (() => {
                            const source = getConnectorPosition(connecting.source, 'right');
                            const d = generateSmoothPath(source.x, source.y, mousePosition.x, mousePosition.y);
                            return <path d={d} stroke="gray" strokeDasharray="4 2" fill="none" strokeWidth="2" />;
                        })()}
                    </svg>
                )}

                <div
                    className="absolute top-0 left-0"
                    style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
                >
                    {Array.isArray(nodes) && nodes.map((node, index) => {
                        const canConnect = canNodeConnect(node.id);
                        const canReceive = canNodeReceiveConnection(node.id);


                        return (
                            <div
                                key={index}
                                ref={(el) => (nodeRefMap.current[node.id] = el)}
                                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                                className="absolute cursor-pointer"
                                style={{ left: node?.position?.x, top: node?.position?.y }}
                            >
                                {/* Diamond Shape */}



                                {/* <button className="absolute -top-10 left-20 flex items-center justify-center bg-white shadow-xl rounded-full w-10 h-10 p-3 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                onClick={() => handleExecutionDetailOpen(node)}
                                >
                                 <p>1</p>
                                </button> */}




                                {/* <div className="absolute -top-20 left-64 -translate-x-1/2 bg-white shadow-xl rounded-xl p-3 w-64 z-50 border border-gray-300 animate-fade-in">
                                    <div className="text-sm text-gray-800 font-medium mb-2">Execution Result</div>
                                    <pre className="text-xs text-gray-600 whitespace-pre-wrap break-words max-h-40 overflow-auto">
                                       lorem100
                                    </pre>
                                    <button
                                        //   onClick={() => setVisibleBubbleId(null)}
                                        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                                    >
                                        ×
                                    </button>
                                </div> */}





                                <div
                                    className={`w-24 h-24 transform rotate-45 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white relative group rounded-2xl`}
                                    style={{
                                        background: `linear-gradient(135deg, ${node.color}dd, ${node.color})`
                                    }}
                                >
                                    {/* Icon inside diamond (counter-rotated) */}
                                    <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                                        <div className="text-white text-5xl">
                                            {React.isValidElement(node.icon) && React.cloneElement(node.icon, { size: 40 })}
                                        </div>
                                    </div>

                                    {/* Settings and Delete buttons (counter-rotated) */}
                                    <div className="absolute top-0  transform -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="flex gap-1">

                                            <button
                                                onClick={() => handleSingleNode(node)}
                                                className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100" >
                                                <Play size={12} className="text-gray-600" />
                                            </button>

                                            <button className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100" onClick={() => {
                                                setNodeType(node.type)
                                                setNodeSettingOpen(true)
                                            }}>
                                                <Settings size={12} className="text-gray-600" />
                                            </button>
                                            <button
                                                className="w-6 h-6 bg-red-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeNode(node.id);
                                                    setNodeSettingOpen(false)
                                                }}
                                            >
                                                <Trash2 size={12} className="text-white" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* single node */}

                                    {loadingNodeType === node.type ? (
                                        <div className=" absolute bottom-15 -right-8 animate-spin w-5 h-5 border-t-2 border-gray-600 rounded-full" />
                                    ) : nodeResult.status === 201 && nodeResult.node === node.type ?
                                        (
                                            <div className=" absolute bottom-15 -right-8 transform -rotate-45 ">

                                                <CheckCircle2 size={30} className="text-green-600" />

                                            </div>
                                        ) : nodeResult.status === 401 && nodeResult.node === node.type &&

                                        (
                                            <div className=" absolute bottom-15 -right-8 transform -rotate-45 ">


                                                <XCircleIcon size={30} className="text-red-600" />

                                            </div>
                                        )

                                    }




                                    {/* <button className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full w-10 h-10 p-3 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                        onClick={() => handleExecutionDetailOpen(node)}
                                    >
                                        <p>1</p>
                                    </button> */}

                                    {ExecutionResult.executionStatus &&

                                        Object.keys(ExecutionResult.executionStatus)[index] === node.id && (

                                            <div>{ExecutionResult.executionStatus?.[node.id].success ? (
                                                <button className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full p-2 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                                    onClick={() => handleExecutionDetailOpen(node)}
                                                >
                                                    <SearchCheck size={25} className="text-green-600" />
                                                </button>
                                            ) : (
                                                <div className=" absolute bottom-15 -right-8 transform -rotate-45 ">


                                                    <XCircleIcon size={30} className="text-red-600" />

                                                </div>
                                            )}

                                            </div>

                                            // <button className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full p-2 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                            //     onClick={() => handleExecutionDetailOpen(node)}
                                            // >
                                            // <SearchCheck size={25} className="text-green-600" />
                                            // </button>


                                        )


                                    }



                                    {Object.keys(executionData).length !== 0 &&

                                        Object.keys(executionData)[index] === node.id && (
                                            <div>
                                                {/* <button className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full p-2 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                                onClick={() => handleExecutionDetailOpen(node)}
                                            >
                                                <SearchCheck size={25} className="text-green-600" />
                                            </button> */}


                                                <div className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full p-2 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                                    onClick={() => handleExecutionDetailOpen(node)}
                                                >

                                                    {Object.entries(executionData).map(([nodeId, nodeData]) => (
                                                        <div key={nodeId} style={{ marginBottom: '20px' }}>

                                                            <ul>
                                                                {Object.entries(nodeData.json).map(([key, value]) => (
                                                                    <li key={key}>
                                                                        <strong>{key}</strong>: {value}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}

                                                </div>

                                            </div>











                                            // <div>{ExecutionResult.executionStatus?.[node.id].success ? (
                                            //     <button className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full p-2 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                            //         onClick={() => handleExecutionDetailOpen(node)}
                                            //     >
                                            //         <SearchCheck size={25} className="text-green-600" />
                                            //     </button>
                                            // ) : (
                                            //     <div className=" absolute bottom-15 -right-8 transform -rotate-45 ">


                                            //         <XCircleIcon size={30} className="text-red-600" />

                                            //     </div>
                                            // )}

                                            // </div>

                                            // <button className="absolute -top-20 left-6 -rotate-45 flex items-center justify-center bg-white shadow-xl rounded-full p-2 z-50 border cursor-pointer border-gray-300 animate-fade-in"
                                            //     onClick={() => handleExecutionDetailOpen(node)}
                                            // >
                                            // <SearchCheck size={25} className="text-green-600" />
                                            // </button>


                                        )


                                    }







                                    {/* whole execution  */}
                                    {ExecutionResult.executionStatus &&
                                        Object.keys(ExecutionResult.executionStatus)[index] === node.id && (
                                            <div>{ExecutionResult.executionStatus?.[node.id].success ? (
                                                <div className=" absolute bottom-15 -right-8 transform -rotate-45 ">

                                                    <CheckCircle2 size={30} className="text-green-600" />

                                                </div>
                                            ) : (
                                                <div className=" absolute bottom-15 -right-8 transform -rotate-45 ">


                                                    <XCircleIcon size={30} className="text-red-600" />

                                                </div>
                                            )}

                                            </div>
                                        )}






                                </div>



                                {/* Output connector (right) */}

                                <div
                                    className={`connector absolute right-[-12px] top-1/2 -translate-y-1/2 rounded-full border-2 w-6 h-6 flex items-center justify-center shadow-lg transition-all duration-200 ${canConnect
                                        ? 'bg-white border-blue-500 text-blue-500 cursor-crosshair hover:bg-blue-500 hover:text-white'
                                        : 'bg-gray-300 border-gray-400 text-gray-400 cursor-not-allowed'
                                        }`}
                                    onMouseDown={canConnect ? (e) => handleStartConnect(e, node.id) : undefined}
                                >
                                    <Plus size={14} />
                                </div>



                                {/* Input connector (left) - don't show on first node */}
                                {index !== 0 && (
                                    <div
                                        className={`connector absolute left-[-12px] top-1/2 -translate-y-1/2 rounded-full border-2 w-6 h-6 cursor-pointer shadow-lg transition-all duration-200 ${canReceive
                                            ? 'bg-white border-green-500 hover:bg-green-500'
                                            : 'bg-gray-300 border-gray-400 cursor-not-allowed'
                                            }`}
                                        onMouseUp={canReceive ? () => handleCompleteConnect(node.id) : undefined}
                                    >
                                        <div className={`w-2 h-2 rounded-full mx-auto ${canReceive ? 'bg-green-500' : 'bg-gray-400'
                                            }`}></div>
                                    </div>
                                )}

                                {/* Label and Description (below diamond) */}
                                <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 text-center min-w-max">
                                    <p className="font-bold text-lg text-gray-800 mb-1">{node.label}</p>
                                    <p className="text-sm text-gray-600">{node.description}</p>
                                </div>


                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}