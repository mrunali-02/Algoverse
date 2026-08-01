/**
 * Graph Algorithm Constants & Theory Definitions
 */

export const GRAPH_ALGORITHMS_THEORY = {
  prim: {
    title: "Prim's Algorithm (Minimum Spanning Tree)",
    description: "Greedy algorithm that finds a Minimum Spanning Tree (MST) for a weighted undirected graph by growing the tree one vertex at a time.",
    complexities: { best: "O((V + E) log V)", average: "O((V + E) log V)", worst: "O((V + E) log V)", space: "O(V + E)" },
    pseudocode: [
      { line: 1, text: "function Prim(Graph, startNode):" },
      { line: 2, text: "  key[start] = 0, key[v] = ∞ for all others" },
      { line: 3, text: "  PQ.push((startNode, 0))" },
      { line: 4, text: "  while PQ is not empty:" },
      { line: 5, text: "    u = PQ.pop_min()" },
      { line: 6, text: "    add u to MST" },
      { line: 7, text: "    for each neighbor v of u:" },
      { line: 8, text: "      if weight(u,v) < key[v]: key[v] = weight(u,v); PQ.push((v, key[v]))" },
    ]
  },

  kruskal: {
    title: "Kruskal's Algorithm (Minimum Spanning Tree)",
    description: "Finds a Minimum Spanning Tree by sorting all edges by weight and iteratively adding non-cycle-forming edges using Disjoint Set Union (DSU).",
    complexities: { best: "O(E log E)", average: "O(E log E)", worst: "O(E log E)", space: "O(V + E)" },
    pseudocode: [
      { line: 1, text: "function Kruskal(Graph):" },
      { line: 2, text: "  sort all edges by weight ascending" },
      { line: 3, text: "  create DSU for all vertices" },
      { line: 4, text: "  for each edge (u, v, w) in sorted edges:" },
      { line: 5, text: "    if find(u) != find(v):" },
      { line: 6, text: "      union(u, v)" },
      { line: 7, text: "      add edge to MST" },
    ]
  },

  bellmanFord: {
    title: "Bellman-Ford Algorithm",
    description: "Computes single-source shortest paths on graphs, even with negative edge weights, and detects negative weight cycles.",
    complexities: { best: "O(E)", average: "O(V * E)", worst: "O(V * E)", space: "O(V)" },
    pseudocode: [
      { line: 1, text: "function BellmanFord(Graph, source):" },
      { line: 2, text: "  dist[source] = 0, dist[v] = ∞ for all others" },
      { line: 3, text: "  for i from 1 to |V| - 1:" },
      { line: 4, text: "    for each edge (u, v, w):" },
      { line: 5, text: "      if dist[u] + w < dist[v]: dist[v] = dist[u] + w" },
      { line: 6, text: "  check for negative weight cycles" },
    ]
  }
};
