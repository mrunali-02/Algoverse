import { SimulationStep } from '@/types';
import { Node, Edge } from '@xyflow/react';
import { buildAdjacencyList } from '@/utils/dijkstraEngine';

export function generateKahnsSteps(nodes: Node[], edges: Edge[]): SimulationStep[] {
  if (!nodes.length) return [];

  const steps: SimulationStep[] = [];
  const adj = buildAdjacencyList(nodes, edges, true); // Directed graph
  const inDegree: Record<string, number> = {};

  nodes.forEach((n) => {
    inDegree[n.id] = 0;
  });

  edges.forEach((e) => {
    if (inDegree[e.target] !== undefined) {
      inDegree[e.target]++;
    }
  });

  const queue: string[] = [];
  nodes.forEach((n) => {
    if (inDegree[n.id] === 0) queue.push(n.id);
  });

  let stepCount = 1;
  const topoOrder: string[] = [];

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      inDegree: { ...inDegree },
      topologicalOrder: [],
    },
    previousNodes: {},
    priorityQueueState: queue.map((node) => ({ node, distance: 0 })),
    explanationTitle: "Kahn's Algorithm Initialized",
    explanationDescription: `Calculated initial in-degrees for ${nodes.length} vertices. Enqueued ${queue.length} zero in-degree vertices.`,
    explanationReason: "Vertices with zero incoming dependencies can start immediately.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  while (queue.length > 0) {
    const u = queue.shift()!;
    topoOrder.push(u);

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: u,
      visitedNodes: [...topoOrder],
      distances: {
        inDegree: { ...inDegree },
        topologicalOrder: [...topoOrder],
      },
      previousNodes: {},
      priorityQueueState: queue.map((node) => ({ node, distance: 0 })),
      explanationTitle: `Dequeued Vertex '${u}' ➔ Added to Topological Order`,
      explanationDescription: `Processed vertex '${u}'. Current Topological Order: [${topoOrder.join(', ')}].`,
      explanationReason: "Vertex dependency resolution complete.",
      highlightedPseudocodeLine: 5,
      animationType: 'glow',
    });

    const neighbors = adj[u] || [];
    for (const edgeInfo of neighbors) {
      const v = edgeInfo.neighbor;
      inDegree[v]--;

      const newlyZero = inDegree[v] === 0;
      if (newlyZero) queue.push(v);

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: v,
        highlightedEdgeId: edgeInfo.edgeId,
        visitedNodes: [...topoOrder],
        distances: {
          inDegree: { ...inDegree },
          topologicalOrder: [...topoOrder],
        },
        previousNodes: {},
        priorityQueueState: queue.map((node) => ({ node, distance: 0 })),
        explanationTitle: `Decremented In-Degree of '${v}' to ${inDegree[v]}`,
        explanationDescription: newlyZero
          ? `In-degree of '${v}' reached 0! Enqueued vertex '${v}'.`
          : `Decremented in-degree of '${v}' by removing incoming edge from '${u}'.`,
        explanationReason: "Dependency edge removed.",
        highlightedPseudocodeLine: 7,
        animationType: newlyZero ? 'bounce' : 'fade',
      });
    }
  }

  const isDAG = topoOrder.length === nodes.length;

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [...topoOrder],
    distances: {
      inDegree: { ...inDegree },
      topologicalOrder: [...topoOrder],
      isDAG,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: isDAG ? "Topological Sort Completed" : "Cycle Detected!",
    explanationDescription: isDAG
      ? `Valid Topological Order found: [${topoOrder.join(' ➔ ')}].`
      : "Graph contains a directed cycle! Topological sort impossible for non-DAGs.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
