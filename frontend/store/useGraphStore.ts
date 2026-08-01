import { create } from 'zustand';
import { Node, Edge, Connection, addEdge as addReactFlowEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';

export interface GraphState {
  nodes: Node[];
  edges: Edge[];
  isDirected: boolean;
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  
  // Actions
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (x?: number, y?: number) => void;
  deleteSelected: () => void;
  updateEdgeWeight: (edgeId: string, weight: number) => void;
  toggleDirected: () => void;
  loadPresetGraph: (presetName: 'default' | 'dense' | 'star') => void;
  clearGraph: () => void;
  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
}

// Preset Graph Data
const PRESET_DEFAULT = {
  nodes: [
    { id: 'A', position: { x: 100, y: 150 }, data: { label: 'A' }, type: 'customNode' },
    { id: 'B', position: { x: 300, y: 50 }, data: { label: 'B' }, type: 'customNode' },
    { id: 'C', position: { x: 300, y: 250 }, data: { label: 'C' }, type: 'customNode' },
    { id: 'D', position: { x: 500, y: 50 }, data: { label: 'D' }, type: 'customNode' },
    { id: 'E', position: { x: 500, y: 250 }, data: { label: 'E' }, type: 'customNode' },
    { id: 'F', position: { x: 700, y: 150 }, data: { label: 'F' }, type: 'customNode' },
  ],
  edges: [
    { id: 'eA-B', source: 'A', target: 'B', label: '4', data: { weight: 4 }, animated: false },
    { id: 'eA-C', source: 'A', target: 'C', label: '2', data: { weight: 2 }, animated: false },
    { id: 'eB-C', source: 'B', target: 'C', label: '1', data: { weight: 1 }, animated: false },
    { id: 'eB-D', source: 'B', target: 'D', label: '5', data: { weight: 5 }, animated: false },
    { id: 'eC-E', source: 'C', target: 'E', label: '10', data: { weight: 10 }, animated: false },
    { id: 'eD-E', source: 'D', target: 'E', label: '2', data: { weight: 2 }, animated: false },
    { id: 'eD-F', source: 'D', target: 'F', label: '6', data: { weight: 6 }, animated: false },
    { id: 'eE-F', source: 'E', target: 'F', label: '3', data: { weight: 3 }, animated: false },
  ],
};

const PRESET_STAR = {
  nodes: [
    { id: 'Center', position: { x: 400, y: 200 }, data: { label: 'Center' }, type: 'customNode' },
    { id: 'N1', position: { x: 200, y: 100 }, data: { label: 'N1' }, type: 'customNode' },
    { id: 'N2', position: { x: 600, y: 100 }, data: { label: 'N2' }, type: 'customNode' },
    { id: 'N3', position: { x: 200, y: 300 }, data: { label: 'N3' }, type: 'customNode' },
    { id: 'N4', position: { x: 600, y: 300 }, data: { label: 'N4' }, type: 'customNode' },
  ],
  edges: [
    { id: 'eC-N1', source: 'Center', target: 'N1', label: '3', data: { weight: 3 } },
    { id: 'eC-N2', source: 'Center', target: 'N2', label: '7', data: { weight: 7 } },
    { id: 'eC-N3', source: 'Center', target: 'N3', label: '2', data: { weight: 2 } },
    { id: 'eC-N4', source: 'Center', target: 'N4', label: '5', data: { weight: 5 } },
  ],
};

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: PRESET_DEFAULT.nodes,
  edges: PRESET_DEFAULT.edges,
  isDirected: false,
  selectedNodeId: null,
  selectedEdgeId: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    if (!connection.source || !connection.target) return;
    const edgeId = `e${connection.source}-${connection.target}`;
    const defaultWeight = 1;

    const newEdge: Edge = {
      ...connection,
      id: edgeId,
      label: `${defaultWeight}`,
      data: { weight: defaultWeight },
      source: connection.source,
      target: connection.target,
    };

    set({
      edges: addReactFlowEdge(newEdge, get().edges),
    });
  },

  addNode: (x, y) => {
    const existingNodes = get().nodes;
    const nextChar = String.fromCharCode(65 + existingNodes.length); // A, B, C, D...
    const nodeLabel = existingNodes.length < 26 ? nextChar : `N${existingNodes.length + 1}`;

    const newNode: Node = {
      id: nodeLabel,
      position: {
        x: x ?? 100 + Math.random() * 400,
        y: y ?? 100 + Math.random() * 300,
      },
      data: { label: nodeLabel },
      type: 'customNode',
    };

    set({ nodes: [...existingNodes, newNode] });
  },

  deleteSelected: () => {
    const { selectedNodeId, selectedEdgeId, nodes, edges } = get();

    if (selectedNodeId) {
      set({
        nodes: nodes.filter((n) => n.id !== selectedNodeId),
        edges: edges.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId),
        selectedNodeId: null,
      });
    } else if (selectedEdgeId) {
      set({
        edges: edges.filter((e) => e.id !== selectedEdgeId),
        selectedEdgeId: null,
      });
    }
  },

  updateEdgeWeight: (edgeId, weight) => {
    set({
      edges: get().edges.map((e) =>
        e.id === edgeId ? { ...e, label: `${weight}`, data: { ...e.data, weight } } : e
      ),
    });
  },

  toggleDirected: () => {
    set((state) => ({ isDirected: !state.isDirected }));
  },

  loadPresetGraph: (presetName) => {
    if (presetName === 'default') {
      set({ nodes: PRESET_DEFAULT.nodes, edges: PRESET_DEFAULT.edges });
    } else if (presetName === 'star') {
      set({ nodes: PRESET_STAR.nodes, edges: PRESET_STAR.edges });
    }
  },

  clearGraph: () => {
    set({ nodes: [], edges: [], selectedNodeId: null, selectedEdgeId: null });
  },

  selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
}));
