/**
 * Central Theory & Pseudocode Registry for all Algorithm Categories
 */

export interface AlgorithmTheoryData {
  title: string;
  title_short?: string;
  introduction: string;
  problemStatement: string;
  applications: string[];
  timeComplexity: string;
  timeDetail: string;
  spaceComplexity: string;
  spaceDetail: string;
  advantages: string;
  disadvantages: string;
  interviewQA: Array<{ question: string; answer: string }>;
  pseudocode: Array<{ line: number; text: string }>;
}

export const THEORY_REGISTRY: Record<string, AlgorithmTheoryData> = {
  "linear-search": {
    title: "Linear Search",
    introduction: "Linear Search is a fundamental search algorithm that checks every element in a list sequentially until a match is found or the end is reached.",
    problemStatement: "Given an array A and a target key K, find the index of K in A.",
    applications: ["Unsorted lists & small datasets", "Sequential access data streams", "Simple lookups with low overhead"],
    timeComplexity: "O(N)",
    timeDetail: "Linear scan across N elements",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place constant memory",
    advantages: "Works on both sorted and unsorted lists. Simple implementation.",
    disadvantages: "Slow on large datasets compared to logarithmic algorithms.",
    interviewQA: [
      { question: "What is the best case time complexity?", answer: "O(1) when the target is at the first index (index 0)." },
      { question: "When should you use Linear Search over Binary Search?", answer: "When the array is unsorted and sorting it would take O(N log N)." }
    ],
    pseudocode: [
      { line: 1, text: "function linearSearch(arr, target):" },
      { line: 2, text: "  for i from 0 to arr.length - 1:" },
      { line: 3, text: "    if arr[i] == target: return i" },
      { line: 4, text: "  return -1 // Not found" }
    ]
  },

  "binary-search": {
    title: "Binary Search",
    introduction: "Binary Search is an efficient divide-and-conquer algorithm that repeatedly halves the search space on a sorted array.",
    problemStatement: "Given a sorted array A and a target key K, determine if K exists and return its index.",
    applications: ["Database indexing & binary trees", "Dictionary and library lookups", "Numerical root finding & optimization"],
    timeComplexity: "O(log N)",
    timeDetail: "Halves search interval every step",
    spaceComplexity: "O(1)",
    spaceDetail: "Iterative pointer storage",
    advantages: "Extremely fast search on large sorted datasets.",
    disadvantages: "Requires array to be pre-sorted.",
    interviewQA: [
      { question: "Why does Binary Search require a sorted array?", answer: "Because it relies on ordering to discard half of the remaining elements at each step." },
      { question: "How do you prevent integer overflow when calculating mid?", answer: "Use mid = low + Math.floor((high - low) / 2) instead of (low + high) / 2." }
    ],
    pseudocode: [
      { line: 1, text: "function binarySearch(arr, target):" },
      { line: 2, text: "  low = 0, high = arr.length - 1" },
      { line: 3, text: "  while low <= high:" },
      { line: 4, text: "    mid = floor((low + high) / 2)" },
      { line: 5, text: "    if arr[mid] == target: return mid" },
      { line: 6, text: "    else if arr[mid] < target: low = mid + 1" },
      { line: 7, text: "    else: high = mid - 1" }
    ]
  },

  "bubble-sort": {
    title: "Bubble Sort",
    introduction: "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    problemStatement: "Given an unsorted array A, reorder its elements in non-decreasing order.",
    applications: ["Educational demonstration of sorting concepts", "Nearly sorted small arrays", "Detecting small order errors"],
    timeComplexity: "O(N²)",
    timeDetail: "Passes over adjacent pairs",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place memory swaps",
    advantages: "Simple implementation and stable sort.",
    disadvantages: "Inaccessible efficiency on large datasets.",
    interviewQA: [
      { question: "Is Bubble Sort stable?", answer: "Yes, adjacent equal elements are not swapped, preserving relative order." },
      { question: "How can Bubble Sort be optimized?", answer: "Add a swapped flag. If no swaps occur during a pass, terminate early." }
    ],
    pseudocode: [
      { line: 1, text: "function bubbleSort(arr):" },
      { line: 2, text: "  for i from 0 to N-1:" },
      { line: 3, text: "    for j from 0 to N-i-2:" },
      { line: 4, text: "      if arr[j] > arr[j+1]:" },
      { line: 5, text: "        swap(arr[j], arr[j+1])" }
    ]
  },

  "selection-sort": {
    title: "Selection Sort",
    introduction: "Selection Sort divides the array into sorted and unsorted regions, repeatedly selecting the minimum element from the unsorted region and moving it to the sorted region.",
    problemStatement: "Given an array A, sort its elements by iteratively placing the minimum unsorted item at the front.",
    applications: ["Small arrays with expensive writing operations", "Systems where memory writes are limited"],
    timeComplexity: "O(N²)",
    timeDetail: "Performs N(N-1)/2 comparisons",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place memory",
    advantages: "Makes at most O(N) swaps.",
    disadvantages: "O(N²) time complexity even for sorted arrays.",
    interviewQA: [
      { question: "What is the primary advantage of Selection Sort?", answer: "It minimizes the number of swap operations to at most O(N)." }
    ],
    pseudocode: [
      { line: 1, text: "function selectionSort(arr):" },
      { line: 2, text: "  for i from 0 to N-1:" },
      { line: 3, text: "    minIdx = i" },
      { line: 4, text: "    for j from i+1 to N-1:" },
      { line: 5, text: "      if arr[j] < arr[minIdx]: minIdx = j" },
      { line: 6, text: "    swap(arr[i], arr[minIdx])" }
    ]
  },

  "insertion-sort": {
    title: "Insertion Sort",
    introduction: "Insertion Sort builds the final sorted array one item at a time by consuming one input element per repetition and inserting it into its correct position.",
    problemStatement: "Insert each element from unsorted portion into its relative sorted location in the left sub-array.",
    applications: ["Small datasets", "Online streaming data receiving elements one by one"],
    timeComplexity: "O(N²)",
    timeDetail: "O(N) for nearly sorted inputs",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place memory",
    advantages: "Efficient for small or nearly sorted arrays. Stable.",
    disadvantages: "O(N²) time complexity for reverse sorted inputs.",
    interviewQA: [
      { question: "Why is Insertion Sort preferred for small arrays?", answer: "Low constant overhead and fast adaptive O(N) performance on partially sorted data." }
    ],
    pseudocode: [
      { line: 1, text: "function insertionSort(arr):" },
      { line: 2, text: "  for i from 1 to N-1:" },
      { line: 3, text: "    key = arr[i], j = i - 1" },
      { line: 4, text: "    while j >= 0 and arr[j] > key:" },
      { line: 5, text: "      arr[j+1] = arr[j], j--" },
      { line: 6, text: "    arr[j+1] = key" }
    ]
  },

  "merge-sort": {
    title: "Merge Sort",
    introduction: "Merge Sort is a stable divide-and-conquer algorithm that recursively splits the input array into halves, sorts them, and merges the sorted sub-lists.",
    problemStatement: "Sort an array A of size N in guaranteed O(N log N) time.",
    applications: ["Sorting linked lists", "External sorting of massive disk-bound files"],
    timeComplexity: "O(N log N)",
    timeDetail: "Guaranteed worst-case log N levels",
    spaceComplexity: "O(N)",
    spaceDetail: "Auxiliary buffer for merging",
    advantages: "Guaranteed O(N log N) performance regardless of initial ordering.",
    disadvantages: "Requires O(N) extra space.",
    interviewQA: [
      { question: "Why is Merge Sort preferred for Linked Lists?", answer: "Linked lists allow merging in O(1) extra space without array indexing overhead." }
    ],
    pseudocode: [
      { line: 1, text: "function mergeSort(arr, L, R):" },
      { line: 2, text: "  if L >= R: return" },
      { line: 3, text: "  mid = floor((L + R) / 2)" },
      { line: 4, text: "  mergeSort(arr, L, mid)" },
      { line: 5, text: "  mergeSort(arr, mid+1, R)" },
      { line: 6, text: "  merge(arr, L, mid, R)" }
    ]
  },

  "quick-sort": {
    title: "Quick Sort",
    introduction: "Quick Sort is a highly efficient divide-and-conquer algorithm that selects a pivot element and partitions the array into elements smaller and larger than the pivot.",
    problemStatement: "Partition and recursively sort array around chosen pivot elements.",
    applications: ["General-purpose system sorting (C++ std::sort, Java dual-pivot)", "High-performance memory caches"],
    timeComplexity: "O(N log N)",
    timeDetail: "Worst-case O(N²) when poor pivot selected",
    spaceComplexity: "O(log N)",
    spaceDetail: "Recursion stack space",
    advantages: "Fastest general-purpose sorting algorithm in practice with low memory footprint.",
    disadvantages: "Unstable sort and worst-case O(N²) time without randomized pivoting.",
    interviewQA: [
      { question: "How to avoid O(N²) worst-case performance in Quick Sort?", answer: "Use randomized pivot selection or median-of-three rule." }
    ],
    pseudocode: [
      { line: 1, text: "function quickSort(arr, low, high):" },
      { line: 2, text: "  if low < high:" },
      { line: 3, text: "    p = partition(arr, low, high)" },
      { line: 4, text: "    quickSort(arr, low, p - 1)" },
      { line: 5, text: "    quickSort(arr, p + 1, high)" }
    ]
  },

  "dijkstra": {
    title: "Dijkstra's Algorithm",
    introduction: "Dijkstra's Algorithm is a greedy single-source shortest path algorithm designed by Edsger W. Dijkstra in 1956. It computes the shortest distance from a start node to all reachable nodes in a graph with non-negative edge weights.",
    problemStatement: "Given a weighted graph G = (V, E) and a starting vertex s, find the minimum weight path from s to every vertex v ∈ V.",
    applications: ["GPS Navigation: Google Maps & Waze shortest routing", "Network Routing: OSPF protocol", "Social Networks: Degrees of separation"],
    timeComplexity: "O((V + E) log V)",
    timeDetail: "With Min-Priority Queue",
    spaceComplexity: "O(V)",
    spaceDetail: "To store distances & PQ",
    advantages: "Guaranteed optimal shortest paths for all non-negative weighted graphs.",
    disadvantages: "Fails on graphs with negative edge weights or negative cycles.",
    interviewQA: [
      { question: "Why does Dijkstra fail on negative edge weights?", answer: "Dijkstra assumes adding an edge increases path weight. Negative weights break greedy optimality." }
    ],
    pseudocode: [
      { line: 1, text: "function Dijkstra(Graph, source):" },
      { line: 2, text: "  dist[source] = 0, dist[v] = ∞ for all v" },
      { line: 3, text: "  PQ.push((source, 0))" },
      { line: 4, text: "  while PQ is not empty:" },
      { line: 5, text: "    (u, d) = PQ.pop_min()" },
      { line: 6, text: "    for each neighbor v of u:" },
      { line: 7, text: "      newDist = dist[u] + weight(u, v)" },
      { line: 8, text: "      if newDist < dist[v]:" },
      { line: 9, text: "        dist[v] = newDist; prev[v] = u" },
      { line: 10, text: "        PQ.push((v, newDist))" }
    ]
  },

  "bfs": {
    title: "Breadth-First Search (BFS)",
    introduction: "Breadth-First Search traverses a graph level-by-level starting from a source vertex using a FIFO Queue.",
    problemStatement: "Explore all vertices of a graph in order of their distance from the source node.",
    applications: ["Shortest path in unweighted graphs", "Web crawlers & peer-to-peer networks", "Social network friend suggestions"],
    timeComplexity: "O(V + E)",
    timeDetail: "Visits all vertices and edges once",
    spaceComplexity: "O(V)",
    spaceDetail: "FIFO Queue storage",
    advantages: "Guarantees shortest path in unweighted graphs.",
    disadvantages: "Requires memory proportional to the widest level of the graph.",
    interviewQA: [
      { question: "What data structure is used to implement BFS?", answer: "A FIFO (First-In, First-Out) Queue." }
    ],
    pseudocode: [
      { line: 1, text: "function BFS(graph, source):" },
      { line: 2, text: "  Q = new Queue(), mark source visited" },
      { line: 3, text: "  Q.enqueue(source)" },
      { line: 4, text: "  while Q is not empty:" },
      { line: 5, text: "    u = Q.dequeue()" },
      { line: 6, text: "    for neighbor v of u:" },
      { line: 7, text: "      if v not visited: mark visited; Q.enqueue(v)" }
    ]
  },

  "dfs": {
    title: "Depth-First Search (DFS)",
    introduction: "Depth-First Search traverses a graph as deep as possible along each branch before backtracking using a LIFO Stack.",
    problemStatement: "Explore all branches of a graph recursively before backtracking.",
    applications: ["Topological sorting & cycle detection", "Maze solving & backtracking puzzles", "Connected components analysis"],
    timeComplexity: "O(V + E)",
    timeDetail: "Visits every node and edge",
    spaceComplexity: "O(V)",
    spaceDetail: "Recursion call stack",
    advantages: "Low memory usage on deep graphs.",
    disadvantages: "Does not guarantee shortest path.",
    interviewQA: [
      { question: "What data structure is used to implement DFS?", answer: "A LIFO (Last-In, First-Out) Stack or recursive call stack." }
    ],
    pseudocode: [
      { line: 1, text: "function DFS(graph, u):" },
      { line: 2, text: "  mark u visited" },
      { line: 3, text: "  for neighbor v of u:" },
      { line: 4, text: "    if v not visited:" },
      { line: 5, text: "      DFS(graph, v)" }
    ]
  },

  "prim": {
    title: "Prim's MST Algorithm",
    introduction: "Prim's Algorithm is a greedy minimum spanning tree (MST) algorithm that grows a tree one vertex at a time from a starting node.",
    problemStatement: "Find a subset of edges connecting all vertices with minimum total weight.",
    applications: ["Network infrastructure design (telecom, electrical grid)", "Approximation algorithms for TSP"],
    timeComplexity: "O((V + E) log V)",
    timeDetail: "Using Min-Priority Queue",
    spaceComplexity: "O(V + E)",
    spaceDetail: "Adjacency list & PQ",
    advantages: "Efficient for dense graphs.",
    disadvantages: "Requires non-negative edge weights on connected undirected graphs.",
    interviewQA: [
      { question: "What is the difference between Prim's and Kruskal's?", answer: "Prim grows a single connected tree from a vertex, whereas Kruskal adds global minimum edges forming a forest until connected." }
    ],
    pseudocode: [
      { line: 1, text: "function Prim(Graph, startNode):" },
      { line: 2, text: "  key[start] = 0, key[v] = ∞ for all others" },
      { line: 3, text: "  PQ.push((startNode, 0))" },
      { line: 4, text: "  while PQ is not empty:" },
      { line: 5, text: "    u = PQ.pop_min()" },
      { line: 6, text: "    add u to MST" },
      { line: 7, text: "    for each neighbor v of u:" },
      { line: 8, text: "      if weight(u,v) < key[v]: key[v] = weight(u,v); PQ.push((v, key[v]))" }
    ]
  },

  "kruskal": {
    title: "Kruskal's MST Algorithm",
    introduction: "Kruskal's Algorithm finds a Minimum Spanning Tree by sorting all edges by weight ascending and adding non-cycle-forming edges using Disjoint Set Union (DSU).",
    problemStatement: "Build a minimum weight spanning tree by greedily selecting global minimum edges.",
    applications: ["LAN network wiring", "Pipeline installation layout"],
    timeComplexity: "O(E log E)",
    timeDetail: "Edge sorting bottleneck",
    spaceComplexity: "O(V + E)",
    spaceDetail: "Edge array & DSU parent array",
    advantages: "Simpler to implement on edge-list graphs. Fast on sparse graphs.",
    disadvantages: "Sorting edges dominates execution time.",
    interviewQA: [
      { question: "How does Kruskal detect cycles?", answer: "Using Disjoint Set Union (DSU) with Find operations." }
    ],
    pseudocode: [
      { line: 1, text: "function Kruskal(Graph):" },
      { line: 2, text: "  sort all edges by weight ascending" },
      { line: 3, text: "  create DSU for all vertices" },
      { line: 4, text: "  for each edge (u, v, w) in sorted edges:" },
      { line: 5, text: "    if find(u) != find(v):" },
      { line: 6, text: "      union(u, v)" },
      { line: 7, text: "      add edge to MST" }
    ]
  },

  "bellman-ford": {
    title: "Bellman-Ford Algorithm",
    introduction: "Bellman-Ford computes single-source shortest paths on graphs, even with negative edge weights, and detects negative weight cycles.",
    problemStatement: "Find shortest paths from source to all vertices handling negative edge weights.",
    applications: ["Distance-vector routing protocols (RIP)", "Financial arbitrage detection"],
    timeComplexity: "O(V * E)",
    timeDetail: "V-1 relaxation passes over E edges",
    spaceComplexity: "O(V)",
    spaceDetail: "Distance array",
    advantages: "Handles negative edge weights and detects negative cycles.",
    disadvantages: "Slower than Dijkstra on non-negative weighted graphs.",
    interviewQA: [
      { question: "How does Bellman-Ford detect negative cycles?", answer: "If distance decreases on the V-th relaxation pass, a negative cycle exists." }
    ],
    pseudocode: [
      { line: 1, text: "function BellmanFord(Graph, source):" },
      { line: 2, text: "  dist[source] = 0, dist[v] = ∞ for all v" },
      { line: 3, text: "  for i from 1 to |V| - 1:" },
      { line: 4, text: "    for each edge (u, v, w):" },
      { line: 5, text: "      if dist[u] + w < dist[v]: dist[v] = dist[u] + w" },
      { line: 6, text: "  check for negative weight cycles" }
    ]
  },

  "tree-traversal": {
    title: "Binary Tree Traversals",
    introduction: "Binary Tree Traversals are systematic methods for visiting all nodes in a binary tree: Inorder, Preorder, Postorder, and Level Order.",
    problemStatement: "Visit every node of a binary tree in specified structural order.",
    applications: ["Expression tree evaluation", "Directory file listing", "BST sorted sequence recovery"],
    timeComplexity: "O(N)",
    timeDetail: "Visits each node once",
    spaceComplexity: "O(H)",
    spaceDetail: "Recursion stack height H",
    advantages: "Comprehensive traversal of hierarchical structures.",
    disadvantages: "Recursive calls use stack memory proportional to tree height.",
    interviewQA: [
      { question: "Which traversal yields sorted output for a Binary Search Tree?", answer: "Inorder traversal (Left, Root, Right)." }
    ],
    pseudocode: [
      { line: 1, text: "function traverse(node):" },
      { line: 2, text: "  if node is null: return" },
      { line: 3, text: "  visit(node) // Preorder" },
      { line: 4, text: "  traverse(node.left)" },
      { line: 5, text: "  visit(node) // Inorder" },
      { line: 6, text: "  traverse(node.right)" },
      { line: 7, text: "  visit(node) // Postorder" }
    ]
  },

  "bst-search": {
    title: "BST Search",
    introduction: "BST Search looks for a target value in a Binary Search Tree by exploiting the ordering property: left < root < right.",
    problemStatement: "Find node containing target key in a Binary Search Tree.",
    applications: ["Symbol tables & key-value dictionaries", "In-memory database indices"],
    timeComplexity: "O(log N)",
    timeDetail: "Degenerates to O(N) for skewed trees",
    spaceComplexity: "O(H)",
    spaceDetail: "Stack height",
    advantages: "Logarithmic lookup on balanced trees.",
    disadvantages: "Performance degrades to O(N) if tree becomes unbalanced.",
    interviewQA: [
      { question: "What is the worst case search time in an un-balanced BST?", answer: "O(N) when the tree degenerates into a linked list." }
    ],
    pseudocode: [
      { line: 1, text: "function search(node, target):" },
      { line: 2, text: "  if node is null or node.val == target: return node" },
      { line: 3, text: "  if target < node.val: return search(node.left, target)" },
      { line: 4, text: "  else: return search(node.right, target)" }
    ]
  },

  "bst-insert": {
    title: "BST Insertion",
    introduction: "BST Insertion adds a new key into a Binary Search Tree at the correct leaf location maintaining the BST property.",
    problemStatement: "Add new key into BST while preserving left < root < right invariant.",
    applications: ["Dynamic set maintenance", "Self-balancing trees (AVL, Red-Black)"],
    timeComplexity: "O(log N)",
    timeDetail: "Average balanced tree height",
    spaceComplexity: "O(H)",
    spaceDetail: "Recursion depth",
    advantages: "Dynamic set insertion without array shifts.",
    disadvantages: "Can cause tree imbalance without self-balancing rotations.",
    interviewQA: [
      { question: "Where is a new key always inserted in a standard BST?", answer: "As a new leaf node." }
    ],
    pseudocode: [
      { line: 1, text: "function insert(node, val):" },
      { line: 2, text: "  if node is null: return new Node(val)" },
      { line: 3, text: "  if val < node.val: node.left = insert(node.left, val)" },
      { line: 4, text: "  else if val > node.val: node.right = insert(node.right, val)" },
      { line: 5, text: "  return node" }
    ]
  },

  "knapsack": {
    title: "0/1 Knapsack Problem",
    title_short: "Knapsack",
    introduction: "The 0/1 Knapsack Problem determines the maximum value subset of items fitting within weight capacity W using 2D Dynamic Programming Tabulation.",
    problemStatement: "Maximize total item value without exceeding weight capacity W.",
    applications: ["Resource allocation & portfolio optimization", "Cargo loading optimization"],
    timeComplexity: "O(N * W)",
    timeDetail: "Pseudo-polynomial tabulation matrix",
    spaceComplexity: "O(N * W)",
    spaceDetail: "2D DP grid table",
    advantages: "Guarantees optimal solution using dynamic programming sub-problems.",
    disadvantages: "Pseudo-polynomial time complexity dependent on weight W.",
    interviewQA: [
      { question: "Why is it called 0/1 Knapsack?", answer: "Because items cannot be broken into fractions; you either take 100% (1) or 0% (0)." }
    ],
    pseudocode: [
      { line: 1, text: "function knapsack(weights, values, W):" },
      { line: 2, text: "  dp = grid[N+1][W+1] initialized to 0" },
      { line: 3, text: "  for i from 1 to N:" },
      { line: 4, text: "    for w from 1 to W:" },
      { line: 5, text: "      if wt[i-1] <= w:" },
      { line: 6, text: "        dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])" },
      { line: 7, text: "      else: dp[i][w] = dp[i-1][w]" }
    ]
  },

  "lcs": {
    title: "Longest Common Subsequence",
    introduction: "LCS finds the maximum length common character sequence in two string inputs using matrix dynamic programming.",
    problemStatement: "Find longest sequence appearing in both strings in same relative order.",
    applications: ["Git diff version control line matching", "DNA sequence alignment in bioinformatics"],
    timeComplexity: "O(M * N)",
    timeDetail: "Matrix grid size M x N",
    spaceComplexity: "O(M * N)",
    spaceDetail: "DP table storage",
    advantages: "Optimal solution for sequence comparison.",
    disadvantages: "O(M*N) memory usage for long strings.",
    interviewQA: [
      { question: "What is the difference between Substring and Subsequence?", answer: "Substrings must be contiguous, while subsequences do not need to be contiguous." }
    ],
    pseudocode: [
      { line: 1, text: "function LCS(text1, text2):" },
      { line: 2, text: "  dp = grid[M+1][N+1] initialized to 0" },
      { line: 3, text: "  for i from 1 to M:" },
      { line: 4, text: "    for j from 1 to N:" },
      { line: 5, text: "      if text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]" },
      { line: 6, text: "      else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])" }
    ]
  },

  "activity-selection": {
    title: "Activity Selection Problem",
    introduction: "Activity Selection finds the maximum number of mutually compatible non-overlapping activities using earliest finish time sorting.",
    problemStatement: "Select maximum count of compatible non-overlapping intervals.",
    applications: ["CPU task scheduling", "Room & venue reservation systems"],
    timeComplexity: "O(N log N)",
    timeDetail: "Sorting activities by finish time",
    spaceComplexity: "O(1)",
    spaceDetail: "Greedy pointer storage",
    advantages: "Fast O(N log N) greedy choice optimization.",
    disadvantages: "Requires activities to be sorted by finish time.",
    interviewQA: [
      { question: "Why do we sort by finish time instead of start time?", answer: "Sorting by finish time leaves maximum remaining time for subsequent activities." }
    ],
    pseudocode: [
      { line: 1, text: "function activitySelection(activities):" },
      { line: 2, text: "  sort activities by finish time ascending" },
      { line: 3, text: "  selected = [activities[0]]" },
      { line: 4, text: "  lastFinish = activities[0].finish" },
      { line: 5, text: "  for i from 1 to N-1:" },
      { line: 6, text: "    if activities[i].start >= lastFinish:" },
      { line: 7, text: "      selected.push(activities[i]); lastFinish = activities[i].finish" }
    ]
  },

  "fractional-knapsack": {
    title: "Fractional Knapsack Problem",
    introduction: "Fractional Knapsack maximizes total value by taking items or fractional parts based on value-to-weight density ratio.",
    problemStatement: "Maximize value taking whole or fractional items up to weight capacity W.",
    applications: ["Liquid & bulk commodity trading", "Bandwidth bandwidth allocation"],
    timeComplexity: "O(N log N)",
    timeDetail: "Sorting items by value/weight ratio",
    spaceComplexity: "O(1)",
    spaceDetail: "Greedy state variables",
    advantages: "Greedy approach yields provably optimal solution for fractional variant.",
    disadvantages: "Does not apply to 0/1 discrete items.",
    interviewQA: [
      { question: "Why does Greedy work for Fractional Knapsack but fail for 0/1 Knapsack?", answer: "Fractions allow filling capacity completely with highest density items without leaving unused capacity gaps." }
    ],
    pseudocode: [
      { line: 1, text: "function fractionalKnapsack(items, W):" },
      { line: 2, text: "  sort items by value/weight ratio descending" },
      { line: 3, text: "  totalVal = 0, currW = 0" },
      { line: 4, text: "  for item in sorted items:" },
      { line: 5, text: "    if currW + item.w <= W: take 100%, totalVal += item.v" },
      { line: 6, text: "    else: take fraction (W - currW)/item.w; break" }
    ]
  },

  "n-queens": {
    title: "N-Queens Problem",
    introduction: "The N-Queens Problem places N non-attacking queens on an N×N chessboard using recursive state-space tree search and undo backtracking.",
    problemStatement: "Place N queens such that no two share row, column, or diagonal.",
    applications: ["Constraint satisfaction problems (CSP)", "VLSI chip layout optimization"],
    timeComplexity: "O(N!)",
    timeDetail: "State-space tree exploration",
    spaceComplexity: "O(N)",
    spaceDetail: "Board and recursion stack",
    advantages: "Systematically finds all valid non-attacking queen configurations.",
    disadvantages: "Exponential search space growth for large N.",
    interviewQA: [
      { question: "How many solutions exist for standard 8-Queens?", answer: "92 total solutions (12 distinct basic solutions considering rotations/reflections)." }
    ],
    pseudocode: [
      { line: 1, text: "function solveNQueens(board, row):" },
      { line: 2, text: "  if row == N: return true // Solution found" },
      { line: 3, text: "  for col from 0 to N-1:" },
      { line: 4, text: "    if isSafe(board, row, col):" },
      { line: 5, text: "      place queen at (row, col)" },
      { line: 6, text: "      if solveNQueens(board, row + 1): return true" },
      { line: 7, text: "      remove queen at (row, col) // Backtrack!" }
    ]
  },

  "max-subarray": {
    title: "Maximum Sum Subarray (Size K)",
    introduction: "Finds the contiguous subarray of fixed size K that has the maximum possible sum by sliding a window across the array in O(N) time.",
    problemStatement: "Find max sum contiguous window of fixed length K.",
    applications: ["Moving averages in finance", "Signal processing smoothing filter"],
    timeComplexity: "O(N)",
    timeDetail: "Single O(1) update pass",
    spaceComplexity: "O(1)",
    spaceDetail: "Window sum state",
    advantages: "O(1) window slide updates avoid redundant re-summing.",
    disadvantages: "Fixed window size K constraint.",
    interviewQA: [
      { question: "What is the time complexity difference between Naive vs Sliding Window?", answer: "Naive takes O(N * K) re-summing every window; Sliding Window takes O(N) total." }
    ],
    pseudocode: [
      { line: 1, text: "function maxSubarray(arr, k):" },
      { line: 2, text: "  windowSum = sum(arr[0..k-1]), maxSum = windowSum" },
      { line: 3, text: "  for i from k to arr.length - 1:" },
      { line: 4, text: "    windowSum += arr[i] - arr[i - k]" },
      { line: 5, text: "    maxSum = max(maxSum, windowSum)" }
    ]
  },

  "longest-substring": {
    title: "Longest Substring Without Repeating",
    introduction: "Finds the length of the longest substring with all unique characters using a variable-length sliding window.",
    problemStatement: "Determine max length contiguous unique character substring.",
    applications: ["Data compression dictionary building", "Token validation"],
    timeComplexity: "O(N)",
    timeDetail: "Left and right pointers advance at most N times",
    spaceComplexity: "O(min(N, M))",
    spaceDetail: "Character set hash storage",
    advantages: "Linear O(N) scan using set tracking.",
    disadvantages: "Requires extra space for character set storage.",
    interviewQA: [
      { question: "Why is the time complexity O(N) despite the inner loop?", answer: "Each character is added to the set once and removed at most once." }
    ],
    pseudocode: [
      { line: 1, text: "function lengthOfLongestSubstring(s):" },
      { line: 2, text: "  left = 0, maxLength = 0, set = new Set()" },
      { line: 3, text: "  for right from 0 to s.length - 1:" },
      { line: 4, text: "    while s[right] in set:" },
      { line: 5, text: "      set.delete(s[left]); left++" },
      { line: 6, text: "    set.add(s[right])" },
      { line: 7, text: "    maxLength = max(maxLength, right - left + 1)" }
    ]
  },

  "two-sum": {
    title: "Two Sum (Sorted Array)",
    introduction: "Finds two numbers in a sorted array that add up to a target sum using opposite end pointers in O(N) time and O(1) space.",
    problemStatement: "Find pair of indices [L, R] such that arr[L] + arr[R] == target.",
    applications: ["Search optimization on sorted arrays", "Pair matching algorithms"],
    timeComplexity: "O(N)",
    timeDetail: "Left and right pointers converge inward",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place pointer storage",
    advantages: "O(1) extra space compared to Hash Map approach.",
    disadvantages: "Requires array to be pre-sorted.",
    interviewQA: [
      { question: "Why move left pointer when sum < target?", answer: "Because array is sorted, incrementing left increases the total sum." }
    ],
    pseudocode: [
      { line: 1, text: "function twoSum(arr, target):" },
      { line: 2, text: "  left = 0, right = arr.length - 1" },
      { line: 3, text: "  while left < right:" },
      { line: 4, text: "    sum = arr[left] + arr[right]" },
      { line: 5, text: "    if sum == target: return [left, right]" },
      { line: 6, text: "    else if sum < target: left++" },
      { line: 7, text: "    else: right--" }
    ]
  },

  "container-water": {
    title: "Container With Most Water",
    introduction: "Finds two vertical lines that together with the x-axis form a container holding the maximum volume of water.",
    problemStatement: "Maximize min(h[L], h[R]) * (R - L) across line pairs.",
    applications: ["Histogram capacity analysis", "Resource containment area calculation"],
    timeComplexity: "O(N)",
    timeDetail: "Single pass pointer convergence",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place pointer storage",
    advantages: "Linear O(N) greedy bottleneck pointer elimination.",
    disadvantages: "Requires linear array scan.",
    interviewQA: [
      { question: "Why move the shorter line pointer?", answer: "Because area is limited by shorter line height; moving taller line can never increase area." }
    ],
    pseudocode: [
      { line: 1, text: "function maxArea(heights):" },
      { line: 2, text: "  left = 0, right = heights.length - 1, maxA = 0" },
      { line: 3, text: "  while left < right:" },
      { line: 4, text: "    area = min(h[left], h[right]) * (right - left)" },
      { line: 5, text: "    maxA = max(maxA, area)" },
      { line: 6, text: "    if h[left] < h[right]: left++" },
      { line: 7, text: "    else: right--" }
    ]
  },

  "union-find": {
    title: "Union Find (DSU)",
    introduction: "Disjoint Set Union (DSU) tracks set partitions into non-overlapping subsets supporting Find (Path Compression) and Union (Union by Rank) in near-constant time.",
    problemStatement: "Maintain disjoint sets supporting fast union and find queries.",
    applications: ["Kruskal's MST algorithm", "Dynamic graph connectivity & cycle detection"],
    timeComplexity: "O(α(N))",
    timeDetail: "Inverse Ackermann function near-constant O(1)",
    spaceComplexity: "O(N)",
    spaceDetail: "Parent and rank arrays",
    advantages: "Extremely fast set partition operations.",
    disadvantages: "Does not support set splitting or deletion.",
    interviewQA: [
      { question: "What is Path Compression?", answer: "Attaching visited nodes directly to the root during Find queries to flatten tree height." }
    ],
    pseudocode: [
      { line: 1, text: "function find(i):" },
      { line: 2, text: "  if parent[i] == i: return i" },
      { line: 3, text: "  return parent[i] = find(parent[i]) // Path Compression" },
      { line: 4, text: "function union(i, j):" },
      { line: 5, text: "  rootI = find(i), rootJ = find(j)" },
      { line: 6, text: "  if rootI != rootJ: parent[rootJ] = rootI" }
    ]
  },

  "trie": {
    title: "Trie (Prefix Tree)",
    introduction: "Trie is a multi-way tree data structure used to store a dynamic set of strings where keys are usually strings. Enables fast prefix lookup and autocomplete in O(L) time.",
    problemStatement: "Store and retrieve keys in character-by-character tree structure.",
    applications: ["Autocomplete & search suggestions", "Spell checkers & IP routing tables"],
    timeComplexity: "O(L)",
    timeDetail: "L is length of word",
    spaceComplexity: "O(N * L)",
    spaceDetail: "Alphabet node pointers",
    advantages: "Fast prefix matching independent of dictionary size.",
    disadvantages: "High memory overhead for sparse character branches.",
    interviewQA: [
      { question: "Why use Trie over Hash Map for autocomplete?", answer: "Trie allows efficient prefix search queries (find all words starting with 'car') in O(L) time." }
    ],
    pseudocode: [
      { line: 1, text: "function insert(word):" },
      { line: 2, text: "  curr = root" },
      { line: 3, text: "  for char in word:" },
      { line: 4, text: "    if char not in curr.children: curr.children[char] = new Node(char)" },
      { line: 5, text: "    curr = curr.children[char]" },
      { line: 6, text: "  curr.isEndOfWord = true" }
    ]
  },

  "min-heap": {
    title: "Min Heap Operations",
    introduction: "Min Heap is a complete binary tree where parent node key is less than or equal to children keys. Root contains the minimum element.",
    problemStatement: "Maintain complete binary tree heap invariant with fast O(1) peek and O(log N) push/pop.",
    applications: ["Priority queues & task schedulers", "Dijkstra's & Prim's algorithms"],
    timeComplexity: "O(log N)",
    timeDetail: "O(1) peek minimum element",
    spaceComplexity: "O(N)",
    spaceDetail: "Array heap storage",
    advantages: "Guaranteed O(1) minimum access time.",
    disadvantages: "Unordered search for arbitrary keys takes O(N).",
    interviewQA: [
      { question: "How to access children of node at index i in 1D array?", answer: "Left child = 2i + 1, Right child = 2i + 2." }
    ],
    pseudocode: [
      { line: 1, text: "function heapifyUp(i):" },
      { line: 2, text: "  while i > 0 and heap[parent(i)] > heap[i]:" },
      { line: 3, text: "    swap(heap[parent(i)], heap[i])" },
      { line: 4, text: "    i = parent(i)" }
    ]
  },

  "heap-sort": {
    title: "Heap Sort Algorithm",
    introduction: "Heap Sort is a comparison-based sorting algorithm that builds a Max Heap and repeatedly extracts the maximum root element to the end of the array.",
    problemStatement: "Sort array by extracting root maximum element repeatedly.",
    applications: ["Embedded systems requiring guaranteed O(N log N) time and O(1) space"],
    timeComplexity: "O(N log N)",
    timeDetail: "Guaranteed worst case O(N log N)",
    spaceComplexity: "O(1)",
    spaceDetail: "In-place array manipulation",
    advantages: "Guaranteed O(N log N) performance with zero extra space.",
    disadvantages: "Slower in practice than Quick Sort due to poor CPU cache locality.",
    interviewQA: [
      { question: "Is Heap Sort stable?", answer: "No, heap swaps do not preserve relative order of equal keys." }
    ],
    pseudocode: [
      { line: 1, text: "function heapSort(arr):" },
      { line: 2, text: "  buildMaxHeap(arr)" },
      { line: 3, text: "  for i from N-1 down to 1:" },
      { line: 4, text: "    swap(arr[0], arr[i])" },
      { line: 5, text: "    heapifyDown(arr, 0, i)" }
    ]
  },

  "topological-sort": {
    title: "Topological Sort (Kahn's Algorithm)",
    introduction: "Topological Sort provides a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u ➔ v, vertex u comes before v.",
    problemStatement: "Order DAG vertices respecting directed dependency constraints.",
    applications: ["Build system dependency resolution (Makefile, npm)", "Course prerequisite scheduling"],
    timeComplexity: "O(V + E)",
    timeDetail: "In-degree BFS Queue traversal",
    spaceComplexity: "O(V)",
    spaceDetail: "In-degree array & queue",
    advantages: "Detects cycles if final order length < V.",
    disadvantages: "Only applies to Directed Acyclic Graphs (DAGs).",
    interviewQA: [
      { question: "How does Kahn's algorithm detect cycles?", answer: "If the output list contains fewer than V vertices, a cycle exists." }
    ],
    pseudocode: [
      { line: 1, text: "function kahnsAlgorithm(graph):" },
      { line: 2, text: "  calculate in-degree for all vertices" },
      { line: 3, text: "  enqueue all vertices with in-degree == 0" },
      { line: 4, text: "  while queue is not empty:" },
      { line: 5, text: "    u = queue.dequeue(); order.push(u)" },
      { line: 6, text: "    for each neighbor v of u: inDegree[v]--; if inDegree[v] == 0: queue.enqueue(v)" }
    ]
  },

  "kmp": {
    title: "Knuth-Morris-Pratt (KMP)",
    introduction: "KMP is an efficient string matching algorithm that searches for occurrences of a pattern within a text in linear O(N + M) time using the Longest Prefix Suffix (LPS) table.",
    problemStatement: "Find pattern matches in text without re-scanning text characters.",
    applications: ["Plagiarism detection software", "Bioinformatics DNA pattern matching"],
    timeComplexity: "O(N + M)",
    timeDetail: "Linear scan without backtracking text pointer i",
    spaceComplexity: "O(M)",
    spaceDetail: "LPS shift table storage",
    advantages: "Text pointer never backtracks.",
    disadvantages: "Requires O(M) preprocessing time and space.",
    interviewQA: [
      { question: "What is the LPS array in KMP?", answer: "LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix." }
    ],
    pseudocode: [
      { line: 1, text: "function KMP(text, pattern):" },
      { line: 2, text: "  lps = computeLPS(pattern)" },
      { line: 3, text: "  i = 0, j = 0" },
      { line: 4, text: "  while i < text.length:" },
      { line: 5, text: "    if pattern[j] == text[i]: i++; j++" },
      { line: 6, text: "    if j == pattern.length: found at (i - j); j = lps[j - 1]" },
      { line: 7, text: "    else if pattern[j] != text[i]: j = (j != 0) ? lps[j - 1] : (i++, 0)" }
    ]
  },

  "hash-table": {
    title: "Hash Table & Collision Resolution",
    introduction: "Hash Table maps key values to array indices using a Hash Function h(k) = k mod M. Resolves collisions using Separate Chaining or Linear Probing.",
    problemStatement: "Perform average O(1) key insertion, lookup, and deletion.",
    applications: ["Compiler symbol tables", "Caching systems (Redis, Memcached)", "Database indexing"],
    timeComplexity: "O(1)",
    timeDetail: "Degenerates to O(N) on high collision load factor",
    spaceComplexity: "O(N)",
    spaceDetail: "Bucket list memory",
    advantages: "Extremely fast average O(1) access time.",
    disadvantages: "Poor hash function causes key collisions.",
    interviewQA: [
      { question: "What is Separate Chaining?", answer: "Resolving collisions by storing colliding elements in a linked list at each bucket index." }
    ],
    pseudocode: [
      { line: 1, text: "function insert(table, key):" },
      { line: 2, text: "  idx = hash(key) = key % table.size" },
      { line: 3, text: "  if table[idx] is occupied: // Collision!" },
      { line: 4, text: "    table[idx].chain.push(key) // Separate Chaining" },
      { line: 5, text: "  else: table[idx] = key" }
    ]
  }
};
