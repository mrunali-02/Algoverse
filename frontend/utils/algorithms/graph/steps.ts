import { SimulationStep } from '@/types';
import { Node, Edge } from '@xyflow/react';
import { buildAdjacencyList } from '@/utils/dijkstraEngine';

export function generatePrimSteps(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string,
  isDirected: boolean = false
): SimulationStep[] {
  if (!nodes.length || !nodes.find((n) => n.id === startNodeId)) return [];

  const steps: SimulationStep[] = [];
  const adj = buildAdjacencyList(nodes, edges, false); // Prim works on undirected graphs

  const key: Record<string, number | '∞'> = {};
  const parent: Record<string, string | null> = {};
  const inMST = new Set<string>();

  nodes.forEach((n) => {
    key[n.id] = n.id === startNodeId ? 0 : '∞';
    parent[n.id] = null;
  });

  const pq: Array<{ node: string; distance: number }> = [{ node: startNodeId, distance: 0 }];
  let stepCount = 1;
  let totalMSTWeight = 0;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: startNodeId,
    visitedNodes: [],
    distances: { ...key },
    previousNodes: { ...parent },
    priorityQueueState: [...pq],
    explanationTitle: "Prim's Algorithm Initialized",
    explanationDescription: `Set start node '${startNodeId}' key to 0. All other node keys set to ∞.`,
    explanationReason: "Growing Minimum Spanning Tree from start vertex.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance);
    const { node: u, distance: uKey } = pq.shift()!;

    if (inMST.has(u)) continue;
    inMST.add(u);
    if (parent[u]) totalMSTWeight += uKey;

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: u,
      visitedNodes: Array.from(inMST),
      distances: { ...key, totalWeight: totalMSTWeight },
      previousNodes: { ...parent },
      priorityQueueState: [...pq],
      explanationTitle: `Added Node '${u}' to MST`,
      explanationDescription: `Minimum cut edge key is ${uKey}. Total MST Weight = ${totalMSTWeight}.`,
      explanationReason: "Greedy choice: Extract minimum weight cut edge.",
      highlightedPseudocodeLine: 6,
      animationType: 'glow',
    });

    const neighbors = adj[u] || [];
    for (const edgeInfo of neighbors) {
      const { neighbor: v, weight, edgeId } = edgeInfo;

      if (!inMST.has(v)) {
        const currentKeyVal = key[v];
        if (currentKeyVal === '∞' || weight < (currentKeyVal as number)) {
          key[v] = weight;
          parent[v] = u;

          const existingIdx = pq.findIndex((item) => item.node === v);
          if (existingIdx >= 0) pq[existingIdx].distance = weight;
          else pq.push({ node: v, distance: weight });
          pq.sort((a, b) => a.distance - b.distance);

          steps.push({
            stepNumber: stepCount++,
            action: 'UPDATE_DISTANCE',
            highlightedNodeId: v,
            highlightedEdgeId: edgeId,
            visitedNodes: Array.from(inMST),
            distances: { ...key, totalWeight: totalMSTWeight },
            previousNodes: { ...parent },
            priorityQueueState: [...pq],
            explanationTitle: `Updated Key for '${v}' to ${weight}`,
            explanationDescription: `Edge (${u} ➔ ${v}) with weight ${weight} offers a cheaper connection to the MST.`,
            explanationReason: "Cut property: Minimizing edge weights connecting to MST.",
            highlightedPseudocodeLine: 8,
            animationType: 'bounce',
          });
        }
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: Array.from(inMST),
    distances: { ...key, totalWeight: totalMSTWeight },
    previousNodes: { ...parent },
    priorityQueueState: [],
    explanationTitle: "Prim's Algorithm Complete",
    explanationDescription: `Minimum Spanning Tree constructed with total weight = ${totalMSTWeight}.`,
    explanationReason: "All reachable vertices spanned with minimum total weight.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateKruskalSteps(
  nodes: Node[],
  edges: Edge[]
): SimulationStep[] {
  if (!nodes.length) return [];

  const steps: SimulationStep[] = [];
  const parent: Record<string, string> = {};
  const rank: Record<string, number> = {};

  nodes.forEach((n) => {
    parent[n.id] = n.id;
    rank[n.id] = 0;
  });

  function find(i: string): string {
    if (parent[i] === i) return i;
    parent[i] = find(parent[i]);
    return parent[i];
  }

  function union(i: string, j: string): boolean {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
      else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
      else {
        parent[rootJ] = rootI;
        rank[rootI]++;
      }
      return true;
    }
    return false;
  }

  // Sort edges by weight
  const sortedEdges = [...edges].sort(
    (a, b) => Number(a.data?.weight ?? a.label ?? 1) - Number(b.data?.weight ?? b.label ?? 1)
  );

  let stepCount = 1;
  let totalMSTWeight = 0;
  const mstEdges: string[] = [];

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: { totalWeight: 0 },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Kruskal's Algorithm Initialized",
    explanationDescription: `Sorted all ${sortedEdges.length} edges by weight ascending. Created Disjoint Sets.`,
    explanationReason: "Greedy edge sorting for cycle-free Spanning Tree.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (const edge of sortedEdges) {
    const weight = Number(edge.data?.weight ?? edge.label ?? 1);
    const u = edge.source;
    const v = edge.target;

    const rootU = find(u);
    const rootV = find(v);

    if (rootU !== rootV) {
      union(u, v);
      totalMSTWeight += weight;
      mstEdges.push(edge.id);

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: u,
        highlightedEdgeId: edge.id,
        visitedNodes: [],
        distances: { totalWeight: totalMSTWeight, currentWeight: weight },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Accepted Edge (${u} ➔ ${v}) with Weight ${weight}`,
        explanationDescription: `Nodes '${u}' and '${v}' are in different components. Added edge to MST. Total Weight = ${totalMSTWeight}.`,
        explanationReason: "No cycle created. Edge included in MST.",
        highlightedPseudocodeLine: 7,
        animationType: 'bounce',
      });
    } else {
      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: u,
        highlightedEdgeId: edge.id,
        visitedNodes: [],
        distances: { totalWeight: totalMSTWeight, rejectedWeight: weight },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Rejected Edge (${u} ➔ ${v}) with Weight ${weight}`,
        explanationDescription: `Nodes '${u}' and '${v}' belong to the same component (${rootU}). Adding edge would create a cycle!`,
        explanationReason: "Cycle prevention rule in Spanning Trees.",
        highlightedPseudocodeLine: 5,
        animationType: 'fade',
      });
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: { totalWeight: totalMSTWeight },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Kruskal's Algorithm Complete",
    explanationDescription: `Minimum Spanning Tree constructed with ${mstEdges.length} edges and total weight = ${totalMSTWeight}.`,
    explanationReason: "All edges processed.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateBellmanFordSteps(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string
): SimulationStep[] {
  if (!nodes.length || !nodes.find((n) => n.id === startNodeId)) return [];

  const steps: SimulationStep[] = [];
  const distances: Record<string, number | '∞'> = {};
  const previousNodes: Record<string, string | null> = {};

  nodes.forEach((n) => {
    distances[n.id] = n.id === startNodeId ? 0 : '∞';
    previousNodes[n.id] = null;
  });

  let stepCount = 1;
  const V = nodes.length;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: startNodeId,
    visitedNodes: [],
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: [],
    explanationTitle: "Bellman-Ford Algorithm Initialized",
    explanationDescription: `Set start node '${startNodeId}' distance to 0, all others to ∞. Will execute ${V - 1} relaxation passes over all edges.`,
    explanationReason: "Supports negative edge weights by relaxing all edges V-1 times.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (let pass = 1; pass <= V - 1; pass++) {
    let updatedInPass = false;

    for (const edge of edges) {
      const u = edge.source;
      const v = edge.target;
      const weight = Number(edge.data?.weight ?? edge.label ?? 1);

      if (distances[u] !== '∞') {
        const potentialDist = (distances[u] as number) + weight;
        const currentDist = distances[v];

        if (currentDist === '∞' || potentialDist < (currentDist as number)) {
          distances[v] = potentialDist;
          previousNodes[v] = u;
          updatedInPass = true;

          steps.push({
            stepNumber: stepCount++,
            action: 'UPDATE_DISTANCE',
            highlightedNodeId: v,
            highlightedEdgeId: edge.id,
            visitedNodes: [],
            distances: { ...distances, pass },
            previousNodes: { ...previousNodes },
            priorityQueueState: [],
            explanationTitle: `Pass ${pass}: Relaxed Edge (${u} ➔ ${v})`,
            explanationDescription: `Updated distance to '${v}' from ${currentDist} to ${potentialDist} via '${u}'.`,
            explanationReason: "Relaxation condition met.",
            highlightedPseudocodeLine: 5,
            animationType: 'bounce',
          });
        }
      }
    }

    if (!updatedInPass) break;
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: { ...distances },
    previousNodes: { ...previousNodes },
    priorityQueueState: [],
    explanationTitle: "Bellman-Ford Algorithm Complete",
    explanationDescription: "All shortest paths calculated successfully.",
    explanationReason: "Relaxation passes finished without negative cycles.",
    highlightedPseudocodeLine: 6,
    animationType: 'glow',
  });

  return steps;
}
