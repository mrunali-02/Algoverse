import { SimulationStep } from '@/types';
import { Node, Edge } from '@xyflow/react';
import { buildAdjacencyList } from './dijkstraEngine';

export function generateBFSSteps(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string,
  isDirected: boolean = false
): SimulationStep[] {
  if (!nodes.length || !nodes.find((n) => n.id === startNodeId)) {
    return [];
  }

  const steps: SimulationStep[] = [];
  const adj = buildAdjacencyList(nodes, edges, isDirected);

  const distances: Record<string, number | '∞'> = {};
  const previousNodes: Record<string, string | null> = {};
  const visitedSet = new Set<string>();
  const queue: string[] = [startNodeId];

  nodes.forEach((n) => {
    distances[n.id] = n.id === startNodeId ? 0 : '∞';
    previousNodes[n.id] = null;
  });

  visitedSet.add(startNodeId);
  let stepCount = 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: startNodeId,
    visitedNodes: [startNodeId],
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: queue.map((node) => ({ node, distance: distances[node] as number })),
    explanationTitle: "BFS Initialized",
    explanationDescription: `Enqueued start node '${startNodeId}' into Queue. Set distance to 0.`,
    explanationReason: "Breadth-First Search uses a First-In-First-Out (FIFO) queue for level-order traversal.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: currentNodeId,
      visitedNodes: Array.from(visitedSet),
      distances: { ...distances },
      previousNodes: { ...previousNodes },
      priorityQueueState: queue.map((node) => ({ node, distance: distances[node] as number })),
      explanationTitle: `Dequeued Node '${currentNodeId}'`,
      explanationDescription: `Exploring all unvisited neighbors of '${currentNodeId}'.`,
      explanationReason: "FIFO ordering guarantees nodes are explored level by level.",
      highlightedPseudocodeLine: 4,
      animationType: 'glow',
    });

    const neighbors = adj[currentNodeId] || [];

    for (const edgeInfo of neighbors) {
      const { neighbor, edgeId } = edgeInfo;

      if (!visitedSet.has(neighbor)) {
        visitedSet.add(neighbor);
        distances[neighbor] = (distances[currentNodeId] as number) + 1;
        previousNodes[neighbor] = currentNodeId;
        queue.push(neighbor);

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: neighbor,
          highlightedEdgeId: edgeId,
          visitedNodes: Array.from(visitedSet),
          distances: { ...distances },
          previousNodes: { ...previousNodes },
          priorityQueueState: queue.map((node) => ({ node, distance: distances[node] as number })),
          explanationTitle: `Discovered Neighbor '${neighbor}'`,
          explanationDescription: `Enqueued '${neighbor}' at level ${distances[neighbor]} via edge (${currentNodeId} ➔ ${neighbor}).`,
          explanationReason: `Level-order expansion: Path length is ${distances[neighbor]}.`,
          highlightedPseudocodeLine: 7,
          animationType: 'bounce',
        });
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: Array.from(visitedSet),
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: [],
    explanationTitle: "BFS Traversal Complete",
    explanationDescription: "All reachable nodes visited level-by-level.",
    explanationReason: "Queue is empty.",
    highlightedPseudocodeLine: 9,
    animationType: 'glow',
  });

  return steps;
}
