import { SimulationStep } from '@/types';
import { Node, Edge } from '@xyflow/react';
import { buildAdjacencyList } from './dijkstraEngine';

export function generateDFSSteps(
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
  const stack: string[] = [startNodeId];

  nodes.forEach((n) => {
    distances[n.id] = '∞';
    previousNodes[n.id] = null;
  });

  distances[startNodeId] = 0;
  let stepCount = 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: startNodeId,
    visitedNodes: [],
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: stack.map((node) => ({ node, distance: 0 })),
    explanationTitle: "DFS Initialized",
    explanationDescription: `Pushed start node '${startNodeId}' onto Stack.`,
    explanationReason: "Depth-First Search uses a Last-In-First-Out (LIFO) stack to traverse deep branches first.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  while (stack.length > 0) {
    const currentNodeId = stack.pop()!;

    if (visitedSet.has(currentNodeId)) continue;
    visitedSet.add(currentNodeId);

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: currentNodeId,
      visitedNodes: Array.from(visitedSet),
      distances: { ...distances },
      previousNodes: { ...previousNodes },
      priorityQueueState: stack.map((node) => ({ node, distance: 0 })),
      explanationTitle: `Popped Node '${currentNodeId}' from Stack`,
      explanationDescription: `Marked '${currentNodeId}' as visited. Exploring neighbors deeper into branch.`,
      explanationReason: "LIFO stack ordering probes maximum path depth before backtracking.",
      highlightedPseudocodeLine: 4,
      animationType: 'glow',
    });

    const neighbors = adj[currentNodeId] || [];

    for (const edgeInfo of neighbors) {
      const { neighbor, edgeId } = edgeInfo;

      if (!visitedSet.has(neighbor)) {
        previousNodes[neighbor] = currentNodeId;
        distances[neighbor] = (distances[currentNodeId] === '∞' ? 0 : (distances[currentNodeId] as number)) + 1;
        stack.push(neighbor);

        steps.push({
          stepNumber: stepCount++,
          action: 'EXAMINE_NEIGHBOR',
          highlightedNodeId: neighbor,
          highlightedEdgeId: edgeId,
          visitedNodes: Array.from(visitedSet),
          distances: { ...distances },
          previousNodes: { ...previousNodes },
          priorityQueueState: stack.map((node) => ({ node, distance: 0 })),
          explanationTitle: `Pushed Neighbor '${neighbor}' onto Stack`,
          explanationDescription: `Discovered unvisited neighbor '${neighbor}' via edge (${currentNodeId} ➔ ${neighbor}).`,
          explanationReason: "Deep traversal: Pushing neighbor ensures it will be visited next before returning.",
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
    explanationTitle: "DFS Traversal Complete",
    explanationDescription: "All reachable branches thoroughly explored.",
    explanationReason: "Stack is empty.",
    highlightedPseudocodeLine: 9,
    animationType: 'glow',
  });

  return steps;
}
