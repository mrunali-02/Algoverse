import { SimulationStep } from '@/types';
import { Node, Edge } from '@xyflow/react';

export interface GraphAdjacency {
  [nodeId: string]: Array<{ neighbor: string; weight: number; edgeId: string }>;
}

export function buildAdjacencyList(nodes: Node[], edges: Edge[], isDirected: boolean): GraphAdjacency {
  const adj: GraphAdjacency = {};

  nodes.forEach((n) => {
    adj[n.id] = [];
  });

  edges.forEach((e) => {
    const weight = Number(e.data?.weight ?? e.label ?? 1);
    if (adj[e.source]) {
      adj[e.source].push({ neighbor: e.target, weight, edgeId: e.id });
    }
    if (!isDirected && adj[e.target]) {
      adj[e.target].push({ neighbor: e.source, weight, edgeId: e.id });
    }
  });

  return adj;
}

export function generateDijkstraSteps(
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

  // Initialize data structures
  const distances: Record<string, number | '∞'> = {};
  const previousNodes: Record<string, string | null> = {};
  const visitedNodesSet = new Set<string>();

  nodes.forEach((n) => {
    distances[n.id] = n.id === startNodeId ? 0 : '∞';
    previousNodes[n.id] = null;
  });

  // Priority Queue representation: Array of { node, distance }
  let pq: Array<{ node: string; distance: number }> = [{ node: startNodeId, distance: 0 }];

  let stepCount = 1;

  // Step 1: Initial State
  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: startNodeId,
    visitedNodes: [],
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: [...pq],
    explanationTitle: "Algorithm Initialized",
    explanationDescription: `Set start node '${startNodeId}' distance to 0, and all other nodes to infinity (∞).`,
    explanationReason: "Starting from source node requires 0 distance.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  while (pq.length > 0) {
    // Sort Priority Queue to get minimum distance node
    pq.sort((a, b) => a.distance - b.distance);
    const current = pq.shift()!;
    const currentNodeId = current.node;
    const currentDist = current.distance;

    if (visitedNodesSet.has(currentNodeId)) {
      continue;
    }

    visitedNodesSet.add(currentNodeId);

    // Step: Select Minimum Distance Node from PQ
    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: currentNodeId,
      visitedNodes: Array.from(visitedNodesSet),
      distances: { ...distances },
      previousNodes: { ...previousNodes },
      priorityQueueState: [...pq],
      explanationTitle: `Extracted Node '${currentNodeId}' from Priority Queue`,
      explanationDescription: `Node '${currentNodeId}' has the minimum unvisited distance (${currentDist}).`,
      explanationReason: "Greedy choice: Node with smallest tentative distance is settled first.",
      highlightedPseudocodeLine: 4,
      animationType: 'glow',
    });

    const neighbors = adj[currentNodeId] || [];

    for (const edgeInfo of neighbors) {
      const { neighbor, weight, edgeId } = edgeInfo;

      if (visitedNodesSet.has(neighbor)) {
        continue;
      }

      // Step: Examine Neighbor
      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: currentNodeId,
        highlightedEdgeId: edgeId,
        visitedNodes: Array.from(visitedNodesSet),
        distances: { ...distances },
        previousNodes: { ...previousNodes },
        priorityQueueState: [...pq],
        explanationTitle: `Examining Edge (${currentNodeId} ➔ ${neighbor})`,
        explanationDescription: `Weight of edge is ${weight}. Current tentative distance to '${neighbor}' is ${distances[neighbor]}.`,
        explanationReason: `Calculating potential new distance: dist[${currentNodeId}] (${currentDist}) + weight (${weight}) = ${currentDist + weight}.`,
        highlightedPseudocodeLine: 6,
        animationType: 'fade',
      });

      const oldDistVal = distances[neighbor];
      const newDistVal = currentDist + weight;

      if (oldDistVal === '∞' || newDistVal < (oldDistVal as number)) {
        distances[neighbor] = newDistVal;
        previousNodes[neighbor] = currentNodeId;

        // Push / Update in Priority Queue
        const existingPQIdx = pq.findIndex((item) => item.node === neighbor);
        if (existingPQIdx >= 0) {
          pq[existingPQIdx].distance = newDistVal;
        } else {
          pq.push({ node: neighbor, distance: newDistVal });
        }
        pq.sort((a, b) => a.distance - b.distance);

        // Step: Distance Update Relaxation
        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: neighbor,
          highlightedEdgeId: edgeId,
          visitedNodes: Array.from(visitedNodesSet),
          distances: { ...distances },
          previousNodes: { ...previousNodes },
          priorityQueueState: [...pq],
          explanationTitle: `Updated Shortest Distance to '${neighbor}'`,
          explanationDescription: `Node '${neighbor}' distance updated from ${oldDistVal} to ${newDistVal} via path through '${currentNodeId}'.`,
          explanationReason: `Relaxation condition met: Travelling through node ${currentNodeId} gives a shorter total path (${newDistVal} < ${oldDistVal}).`,
          highlightedPseudocodeLine: 8,
          animationType: 'bounce',
        });
      }
    }
  }

  // Final Step: Complete
  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: Array.from(visitedNodesSet),
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: [],
    explanationTitle: "Dijkstra Algorithm Complete",
    explanationDescription: "All reachable nodes have been processed. Shortest path distances from source node are final.",
    explanationReason: "Priority queue is empty.",
    highlightedPseudocodeLine: 10,
    animationType: 'glow',
  });

  return steps;
}
