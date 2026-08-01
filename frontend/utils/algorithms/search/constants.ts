/**
 * Search Algorithm Constants, Theory, and Pseudocode
 */

export const LINEAR_SEARCH_THEORY = {
  title: "Linear Search",
  description: "Sequentially checks each element of the list until a match is found or the end of the list is reached.",
  problemStatement: "Given an unsorted array arr and a target value x, find the index of x in arr or return -1 if not present.",
  applications: [
    "Searching in small or unsorted datasets",
    "Finding an element in a linked list",
    "Simple brute-force validation checks"
  ],
  advantages: [
    "Works on both sorted and unsorted arrays",
    "Requires zero extra memory (O(1) space)",
    "Extremely simple to implement"
  ],
  disadvantages: [
    "In-efficient on large datasets (O(N) time complexity)",
    "Slow compared to logarithmic binary search"
  ],
  complexities: {
    best: "O(1) - Element is at first index",
    average: "O(N) - Element is in middle",
    worst: "O(N) - Element is at last index or absent",
    space: "O(1) - Aux space"
  },
  pseudocode: [
    { line: 1, text: "function linearSearch(arr, target):" },
    { line: 2, text: "  for i from 0 to arr.length - 1:" },
    { line: 3, text: "    if arr[i] == target:" },
    { line: 4, text: "      return i  // Match found" },
    { line: 5, text: "  return -1     // Target not present" },
  ]
};

export const BINARY_SEARCH_THEORY = {
  title: "Binary Search",
  description: "Efficient divide-and-conquer algorithm that repeatedly halves the search space of a sorted array.",
  problemStatement: "Given a sorted array arr in ascending order and a target value x, find the index of x or return -1.",
  applications: [
    "Database index queries (B-Trees)",
    "Standard library lookup functions (std::lower_bound)",
    "Finding square roots / monotonic optimization problems"
  ],
  advantages: [
    "Logarithmic search time O(log N) suitable for millions of items",
    "Minimal memory consumption O(1)"
  ],
  disadvantages: [
    "Array MUST be pre-sorted (O(N log N) sorting cost if unsorted)",
    "Requires random access memory structure (arrays, not linked lists)"
  ],
  complexities: {
    best: "O(1) - Target is exact middle element",
    average: "O(log N)",
    worst: "O(log N) - Target at boundary or absent",
    space: "O(1) - Iterative space"
  },
  pseudocode: [
    { line: 1, text: "function binarySearch(arr, target):" },
    { line: 2, text: "  low = 0, high = arr.length - 1" },
    { line: 3, text: "  while low <= high:" },
    { line: 4, text: "    mid = floor((low + high) / 2)" },
    { line: 5, text: "    if arr[mid] == target: return mid" },
    { line: 6, text: "    else if arr[mid] < target: low = mid + 1" },
    { line: 7, text: "    else: high = mid - 1" },
    { line: 8, text: "  return -1" },
  ]
};
