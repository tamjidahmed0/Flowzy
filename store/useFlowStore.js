import { create } from 'zustand';

export const useFlowStore = create((set) => ({
    // Node & Edge State
    nodes: [],
    edges: [],


    setNodes: (node) =>
        set((state) => {
            const nodeCount = state.nodes.length;
            const offset = 50;

            const newNode = {
                ...node,
                position: {
                    x: 100 + nodeCount * offset,
                    y: 100 + nodeCount * offset,
                },
                id: `${node.type}-${Date.now()}`, // unique id
            };

            return {
                nodes: [...state.nodes, newNode],
            };
        }),


    setNodesUpdate: (updater) =>
        set((state) => ({
            nodes: typeof updater === 'function' ? updater(state.nodes) : updater
        })),

    setEdges: (edge) =>
        set((state) => ({
            edges: [...state.edges, edge],
        })),

    // Viewport Controls
    offset: { x: 0, y: 0 },
    scale: 1,


    setOffset: (offset) => set({ offset }),
    setScale: (scale) => set({ scale }),

    // Connection Logic
    connecting: null,
    setConnecting: (node) => set({ connecting: node }),

    mousePosition: { x: 0, y: 0 },
    setMousePosition: (pos) => set({ mousePosition: pos }),


    removeNode: (nodeId) =>
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== nodeId),
            edges: state.edges.filter(
                (edge) => edge.source !== nodeId && edge.target !== nodeId
            ),
        })),

    removeEdge: (edgeId) =>
        set((state) => ({
            edges: state.edges.filter((edge) => edge.id !== edgeId),
        })),


    setFlow: (newNodes, newEdges) =>
        set(() => ({

            nodes: newNodes,
            edges: newEdges


        })),


    clearAll: () =>
        set(() => ({
            nodes: [],
            edges: []
        }))


}));
