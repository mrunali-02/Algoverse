import { SimulationStep } from '@/types';
import { DSUOp } from './types';

export function generateDSUSteps(
  size: number = 6,
  operations: DSUOp[] = [
    { type: 'union', u: 0, v: 1 },
    { type: 'union', u: 2, v: 3 },
    { type: 'union', u: 1, v: 3 },
    { type: 'find', u: 0 },
    { type: 'union', u: 4, v: 5 },
    { type: 'union', u: 3, v: 5 },
  ]
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  const parent: number[] = Array.from({ length: size }, (_, idx) => idx);
  const rank: number[] = Array(size).fill(0);

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      parent: [...parent],
      rank: [...rank],
      size,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `Disjoint Set Union Initialized (${size} Elements)`,
    explanationDescription: `Each element is initially its own root parent: parent[i] = i, rank[i] = 0.`,
    explanationReason: "Initial state of N disjoint singleton sets.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  function find(i: number): number {
    if (parent[i] === i) return i;
    parent[i] = find(parent[i]); // Path compression
    return parent[i];
  }

  for (const op of operations) {
    if (op.type === 'find') {
      const u = op.u;
      const root = find(u);

      steps.push({
        stepNumber: stepCount++,
        action: 'SELECT_NODE',
        highlightedNodeId: `node-${u}`,
        visitedNodes: [],
        distances: {
          parent: [...parent],
          rank: [...rank],
          activeElement: u,
          rootU: root,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Executed Find(${u}) ➔ Representative Root is ${root}`,
        explanationDescription: `Path compression updated direct pointers along search path to root node ${root}.`,
        explanationReason: "Path compression flattens tree structure to O(α(N)).",
        highlightedPseudocodeLine: 3,
        animationType: 'bounce',
      });
    } else if (op.type === 'union') {
      const u = op.u;
      const v = op.v!;

      const rootU = find(u);
      const rootV = find(v);

      if (rootU !== rootV) {
        if (rank[rootU] < rank[rootV]) {
          parent[rootU] = rootV;
        } else if (rank[rootU] > rank[rootV]) {
          parent[rootV] = rootU;
        } else {
          parent[rootV] = rootU;
          rank[rootU]++;
        }

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: `node-${u}`,
          visitedNodes: [],
          distances: {
            parent: [...parent],
            rank: [...rank],
            activeElement: u,
            rootU,
            rootV,
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Executed Union(${u}, ${v}) ➔ Merged Root ${rootV} under ${rootU}`,
          explanationDescription: `Elements ${u} (root ${rootU}) and ${v} (root ${rootV}) belonged to different sets. Merged sets via Union by Rank.`,
          explanationReason: "Union by rank keeps tree height balanced.",
          highlightedPseudocodeLine: 9,
          animationType: 'bounce',
        });
      } else {
        steps.push({
          stepNumber: stepCount++,
          action: 'EXAMINE_NEIGHBOR',
          highlightedNodeId: `node-${u}`,
          visitedNodes: [],
          distances: {
            parent: [...parent],
            rank: [...rank],
            activeElement: u,
            rootU,
            rootV,
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Union(${u}, ${v}) Ignored`,
          explanationDescription: `Elements ${u} and ${v} already share the same representative root ${rootU}.`,
          explanationReason: "Redundant union call: elements are already connected.",
          highlightedPseudocodeLine: 6,
          animationType: 'fade',
        });
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      parent: [...parent],
      rank: [...rank],
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "DSU Operations Sequence Completed",
    explanationDescription: "All set operations evaluated.",
    explanationReason: "DSU state finalized.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
