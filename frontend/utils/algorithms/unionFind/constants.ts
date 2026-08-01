/**
 * Union Find (DSU) Constants & Theory Definitions
 */

export const UNION_FIND_THEORY = {
  dsu: {
    title: "Union Find / Disjoint Set Union (DSU)",
    description: "Data structure that tracks set partitions into disjoint non-overlapping subsets. Supports Find (with Path Compression) and Union (by Rank) in near-constant O(α(N)) time.",
    complexities: { best: "O(α(N))", average: "O(α(N))", worst: "O(α(N))", space: "O(N)" },
    pseudocode: [
      { line: 1, text: "function find(i):" },
      { line: 2, text: "  if parent[i] == i: return i" },
      { line: 3, text: "  return parent[i] = find(parent[i]) // Path Compression" },
      { line: 4, text: "function union(i, j):" },
      { line: 5, text: "  rootI = find(i), rootJ = find(j)" },
      { line: 6, text: "  if rootI != rootJ:" },
      { line: 7, text: "    if rank[rootI] < rank[rootJ]: parent[rootI] = rootJ" },
      { line: 8, text: "    else if rank[rootI] > rank[rootJ]: parent[rootJ] = rootI" },
      { line: 9, text: "    else: parent[rootJ] = rootI; rank[rootI]++" },
    ]
  }
};
