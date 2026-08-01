/**
 * Topological Sort Type Definitions
 */

export interface TopologicalStateExtra {
  inDegree: Record<string, number>;
  zeroInDegreeQueue: string[];
  topologicalOrder: string[];
}
