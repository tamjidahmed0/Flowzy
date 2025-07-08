'use client'
import { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import NodeData from '@/lib/NodeData';



const initialNodes = [
  { id: 'sheet', data: { label: 'Sheet Node' }, position: { x: 0, y: 0 } , type: 'sheet'},
  { id: 'telegram', data: { label: 'Telegram Node' }, position: { x: 200, y: 0 } },
  { id: 'router', data: { label: 'Router Node' }, position: { x: 400, y: 0 } },
   { id: 'whatsapp', data: { label: 'whats app' }, position: { x: 500, y: 0 } },
   { id: 'slack', data: { label: 'Slack' }, position: { x: 100, y: 0 } },
];

// const initialEdges = [
//   { id: 'e1-2', source: 'sheet', target: 'telegram', animated: true },
//   { id: 'e2-3', source: 'telegram', target: 'router', animated: true },
// ];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  console.log('nodes', nodes);
  console.log('edges', edges);





  const runflow = async () => {
  const nodeData = await NodeData({
        node: nodes,  
        edge: edges
      });
      console.log('Node Data:', nodeData);
      setNodes(nodeData.nodes);
      setEdges(nodeData.edges);
  }




  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );



  // const onConnect = useCallback((params) => {
  //     const { source, target } = params;

  //     console.log('Connecting:', source, 'to', target);

  // },[setEdges]);




  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>


      <button className='p-2 bg-blue-500 text-white rounded-md mt-4' onClick={runflow}>
        run flow
      </button>
    </div>
  );
}
