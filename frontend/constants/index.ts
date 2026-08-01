/**
 * Application Constants & Curriculum Categories
 */

export const APP_NAME = "AlgoVerse";
export const APP_TAGLINE = "Interactive Engineering Learning Platform";

export const CATEGORIES = [
  { id: "searching", name: "1. Searching Algorithms", count: 2 },
  { id: "sorting", name: "2. Sorting Algorithms", count: 5 },
  { id: "graph", name: "3. Graph Algorithms", count: 6 },
  { id: "trees", name: "4. Trees & Hierarchies", count: 3 },
  { id: "dp", name: "5. Dynamic Programming", count: 2 },
  { id: "greedy", name: "6. Greedy Algorithms", count: 2 },
  { id: "backtracking", name: "7. Backtracking", count: 1 },
  { id: "slidingWindow", name: "8. Sliding Window", count: 2 },
  { id: "twoPointers", name: "9. Two Pointers", count: 2 },
  { id: "unionFind", name: "10. Union Find (DSU)", count: 1 },
  { id: "trie", name: "11. Trie Structures", count: 1 },
  { id: "heap", name: "12. Heap & Priority Queue", count: 2 },
  { id: "topological", name: "13. Topological Sort", count: 1 },
  { id: "stringMatching", name: "14. String Matching (KMP)", count: 1 },
  { id: "hashing", name: "15. Hashing & Collision", count: 1 },
] as const;

export const ALGORITHMS = [
  // Searching Category
  {
    id: "linear-search",
    title: "Linear Search",
    category: "Searching Algorithms",
    difficulty: "Easy",
    description: "Scan array elements sequentially from index 0 until the target value is found.",
    path: "/simulation/linear-search",
    isAvailable: true,
  },
  {
    id: "binary-search",
    title: "Binary Search",
    category: "Searching Algorithms",
    difficulty: "Easy",
    description: "Logarithmic divide-and-conquer search on sorted arrays by repeatedly halving the search window.",
    path: "/simulation/binary-search",
    isAvailable: true,
  },

  // Sorting Category
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    category: "Sorting Algorithms",
    difficulty: "Easy",
    description: "Repeatedly swap adjacent elements if they are in wrong order until the array is fully sorted.",
    path: "/simulation/bubble-sort",
    isAvailable: true,
  },
  {
    id: "selection-sort",
    title: "Selection Sort",
    category: "Sorting Algorithms",
    difficulty: "Easy",
    description: "Repeatedly find the minimum element from unsorted portion and place it at the sorted front.",
    path: "/simulation/selection-sort",
    isAvailable: true,
  },
  {
    id: "insertion-sort",
    title: "Insertion Sort",
    category: "Sorting Algorithms",
    difficulty: "Easy",
    description: "Build sorted array one element at a time by inserting each item into its correct relative position.",
    path: "/simulation/insertion-sort",
    isAvailable: true,
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    category: "Sorting Algorithms",
    difficulty: "Medium",
    description: "Divide-and-conquer algorithm that recursively splits array into halves and merges sorted sub-lists.",
    path: "/simulation/merge-sort",
    isAvailable: true,
  },
  {
    id: "quick-sort",
    title: "Quick Sort",
    category: "Sorting Algorithms",
    difficulty: "Medium",
    description: "Partition array around a chosen pivot element such that smaller values are left and larger are right.",
    path: "/simulation/quick-sort",
    isAvailable: true,
  },

  // Graph Category
  {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    category: "Graph Algorithms",
    difficulty: "Medium",
    description: "Find shortest paths from a single source node to all other nodes in a weighted graph with non-negative edge weights.",
    path: "/simulation/dijkstra",
    isAvailable: true,
  },
  {
    id: "bfs",
    title: "Breadth-First Search",
    category: "Graph Algorithms",
    difficulty: "Easy",
    description: "Explore graph layer-by-layer starting from a selected source node using a FIFO Queue.",
    path: "/simulation/bfs",
    isAvailable: true,
  },
  {
    id: "dfs",
    title: "Depth-First Search",
    category: "Graph Algorithms",
    difficulty: "Easy",
    description: "Traverse graph as deep as possible along each branch before backtracking using a LIFO Stack.",
    path: "/simulation/dfs",
    isAvailable: true,
  },
  {
    id: "prim",
    title: "Prim's MST Algorithm",
    category: "Graph Algorithms",
    difficulty: "Hard",
    description: "Greedy algorithm growing a Minimum Spanning Tree from a start vertex by adding minimum cut edges.",
    path: "/simulation/prim",
    isAvailable: true,
  },
  {
    id: "kruskal",
    title: "Kruskal's MST Algorithm",
    category: "Graph Algorithms",
    difficulty: "Hard",
    description: "Sorts all graph edges by weight and iteratively builds MST using Disjoint Set Union (DSU) cycle prevention.",
    path: "/simulation/kruskal",
    isAvailable: true,
  },
  {
    id: "bellman-ford",
    title: "Bellman-Ford Algorithm",
    category: "Graph Algorithms",
    difficulty: "Hard",
    description: "Finds single-source shortest paths on graphs with negative edge weights and detects negative weight cycles.",
    path: "/simulation/bellman-ford",
    isAvailable: true,
  },

  // Tree Category
  {
    id: "tree-traversal",
    title: "Binary Tree Traversals",
    category: "Trees & Hierarchies",
    difficulty: "Easy",
    description: "Systematically visit all nodes in a binary tree: Inorder, Preorder, Postorder, and Level Order.",
    path: "/simulation/tree-traversal",
    isAvailable: true,
  },
  {
    id: "bst-search",
    title: "BST Search",
    category: "Trees & Hierarchies",
    difficulty: "Easy",
    description: "Search for a target value in a Binary Search Tree by exploiting left < root < right ordering.",
    path: "/simulation/bst-search",
    isAvailable: true,
  },
  {
    id: "bst-insert",
    title: "BST Insertion",
    category: "Trees & Hierarchies",
    difficulty: "Easy",
    description: "Insert a new value into a Binary Search Tree at the correct leaf position.",
    path: "/simulation/bst-insert",
    isAvailable: true,
  },

  // Dynamic Programming Category
  {
    id: "knapsack",
    title: "0/1 Knapsack Problem",
    category: "Dynamic Programming",
    difficulty: "Hard",
    description: "Maximize subset value fitting within knapsack weight capacity using 2D tabulation DP.",
    path: "/simulation/knapsack",
    isAvailable: true,
  },
  {
    id: "lcs",
    title: "Longest Common Subsequence",
    category: "Dynamic Programming",
    difficulty: "Medium",
    description: "Find the maximum length common character sequence in two string inputs using matrix DP.",
    path: "/simulation/lcs",
    isAvailable: true,
  },

  // Greedy Category
  {
    id: "activity-selection",
    title: "Activity Selection Problem",
    category: "Greedy Algorithms",
    difficulty: "Medium",
    description: "Select the maximum number of mutually compatible non-overlapping activities using earliest finish time sorting.",
    path: "/simulation/activity-selection",
    isAvailable: true,
  },
  {
    id: "fractional-knapsack",
    title: "Fractional Knapsack Problem",
    category: "Greedy Algorithms",
    difficulty: "Medium",
    description: "Maximize total value by taking items or fractional parts based on value-to-weight density ratio.",
    path: "/simulation/fractional-knapsack",
    isAvailable: true,
  },

  // Backtracking Category
  {
    id: "n-queens",
    title: "N-Queens Problem",
    category: "Backtracking",
    difficulty: "Hard",
    description: "Place N non-attacking queens on an N x N chessboard using state-space tree search and undo backtracking.",
    path: "/simulation/n-queens",
    isAvailable: true,
  },

  // Sliding Window Category
  {
    id: "max-subarray",
    title: "Maximum Sum Subarray (Size K)",
    category: "Sliding Window",
    difficulty: "Easy",
    description: "Find the maximum contiguous subarray sum of fixed size K using O(1) sliding window updates.",
    path: "/simulation/max-subarray",
    isAvailable: true,
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating",
    category: "Sliding Window",
    difficulty: "Medium",
    description: "Find the maximum length unique character substring using a variable-length sliding window.",
    path: "/simulation/longest-substring",
    isAvailable: true,
  },

  // Two Pointers Category
  {
    id: "two-sum",
    title: "Two Sum (Sorted Array)",
    category: "Two Pointers",
    difficulty: "Easy",
    description: "Find two numbers adding to target in a sorted array using converging left and right pointers.",
    path: "/simulation/two-sum",
    isAvailable: true,
  },
  {
    id: "container-water",
    title: "Container With Most Water",
    category: "Two Pointers",
    difficulty: "Medium",
    description: "Find two vertical lines forming a container with maximum water capacity in linear O(N) time.",
    path: "/simulation/container-water",
    isAvailable: true,
  },

  // Union Find Category
  {
    id: "union-find",
    title: "Union Find (DSU)",
    category: "Union Find (DSU)",
    difficulty: "Medium",
    description: "Track disjoint set partitions supporting Find (Path Compression) and Union (Union by Rank) in near-constant time.",
    path: "/simulation/union-find",
    isAvailable: true,
  },

  // Trie Category
  {
    id: "trie",
    title: "Trie (Prefix Tree)",
    category: "Trie Structures",
    difficulty: "Medium",
    description: "Multi-way prefix tree enabling fast string insertion and character-by-character prefix searching.",
    path: "/simulation/trie",
    isAvailable: true,
  },

  // Heap Category
  {
    id: "min-heap",
    title: "Min Heap Operations",
    category: "Heap & Priority Queue",
    difficulty: "Medium",
    description: "Complete binary tree where parent <= children supporting push, pop, and sift-up heapify operations.",
    path: "/simulation/min-heap",
    isAvailable: true,
  },
  {
    id: "heap-sort",
    title: "Heap Sort Algorithm",
    category: "Heap & Priority Queue",
    difficulty: "Medium",
    description: "Sorts array by building Max Heap and repeatedly extracting root maximum element.",
    path: "/simulation/heap-sort",
    isAvailable: true,
  },

  // Topological Category
  {
    id: "topological-sort",
    title: "Topological Sort (Kahn's Algorithm)",
    category: "Topological Sort",
    difficulty: "Medium",
    description: "Linear ordering of DAG vertices using in-degree counting and zero in-degree BFS Queue.",
    path: "/simulation/topological-sort",
    isAvailable: true,
  },

  // String Matching Category
  {
    id: "kmp",
    title: "Knuth-Morris-Pratt (KMP)",
    category: "String Matching (KMP)",
    difficulty: "Hard",
    description: "Efficient linear O(N+M) string matching using Longest Prefix Suffix (LPS) non-backtracking shift table.",
    path: "/simulation/kmp",
    isAvailable: true,
  },

  // Hashing Category
  {
    id: "hash-table",
    title: "Hash Table & Collision Resolution",
    category: "Hashing & Collision",
    difficulty: "Medium",
    description: "Direct bucket indexing via hash function h(k) = k mod M with Separate Chaining collision handling.",
    path: "/simulation/hash-table",
    isAvailable: true,
  },
] as const;
