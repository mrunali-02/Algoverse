/**
 * Topological Sort Constants & Theory Definitions
 */

export const TOPOLOGICAL_THEORY = {
  topologicalSort: {
    title: "Topological Sort (Kahn's Algorithm)",
    description: "Linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u ➔ v, vertex u comes before v. Uses in-degree counting and BFS Queue.",
    complexities: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
    pseudocode: [
      { line: 1, text: "function kahnsAlgorithm(graph):" },
      { line: 2, text: "  calculate in-degree for all vertices" },
      { line: 3, text: "  enqueue all vertices with in-degree == 0" },
      { line: 4, text: "  while queue is not empty:" },
      { line: 5, text: "    u = queue.dequeue(); order.push(u)" },
      { line: 6, text: "    for each neighbor v of u:" },
      { line: 7, text: "      inDegree[v]--; if inDegree[v] == 0: queue.enqueue(v)" },
    ]
  }
};
