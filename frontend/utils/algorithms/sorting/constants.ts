/**
 * Sorting Algorithm Constants, Theory, and Pseudocode
 */

export const SORTING_ALGORITHMS_THEORY = {
  bubbleSort: {
    title: "Bubble Sort",
    description: "Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order.",
    complexities: { best: "O(N)", average: "O(N²)", worst: "O(N²)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function bubbleSort(arr):" },
      { line: 2, text: "  for i from 0 to N-1:" },
      { line: 3, text: "    for j from 0 to N-i-2:" },
      { line: 4, text: "      if arr[j] > arr[j+1]:" },
      { line: 5, text: "        swap(arr[j], arr[j+1])" },
    ]
  },

  selectionSort: {
    title: "Selection Sort",
    description: "Divides array into sorted and unsorted regions, repeatedly finding the minimum element from the unsorted region and moving it to the sorted region.",
    complexities: { best: "O(N²)", average: "O(N²)", worst: "O(N²)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function selectionSort(arr):" },
      { line: 2, text: "  for i from 0 to N-1:" },
      { line: 3, text: "    minIdx = i" },
      { line: 4, text: "    for j from i+1 to N-1:" },
      { line: 5, text: "      if arr[j] < arr[minIdx]: minIdx = j" },
      { line: 6, text: "    swap(arr[i], arr[minIdx])" },
    ]
  },

  insertionSort: {
    title: "Insertion Sort",
    description: "Builds the sorted array one element at a time by inserting each element into its proper position relative to previously sorted elements.",
    complexities: { best: "O(N)", average: "O(N²)", worst: "O(N²)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function insertionSort(arr):" },
      { line: 2, text: "  for i from 1 to N-1:" },
      { line: 3, text: "    key = arr[i], j = i - 1" },
      { line: 4, text: "    while j >= 0 and arr[j] > key:" },
      { line: 5, text: "      arr[j+1] = arr[j], j--" },
      { line: 6, text: "    arr[j+1] = key" },
    ]
  },

  mergeSort: {
    title: "Merge Sort",
    description: "Divide-and-conquer algorithm that divides array into two halves, recursively sorts them, and merges the sorted halves.",
    complexities: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)", space: "O(N)" },
    pseudocode: [
      { line: 1, text: "function mergeSort(arr, L, R):" },
      { line: 2, text: "  if L >= R: return" },
      { line: 3, text: "  mid = floor((L + R) / 2)" },
      { line: 4, text: "  mergeSort(arr, L, mid)" },
      { line: 5, text: "  mergeSort(arr, mid+1, R)" },
      { line: 6, text: "  merge(arr, L, mid, R)" },
    ]
  },

  quickSort: {
    title: "Quick Sort",
    description: "Efficient divide-and-conquer algorithm that selects a pivot element and partitions array into elements smaller and larger than the pivot.",
    complexities: { best: "O(N log N)", average: "O(N log N)", worst: "O(N²)", space: "O(log N)" },
    pseudocode: [
      { line: 1, text: "function quickSort(arr, low, high):" },
      { line: 2, text: "  if low < high:" },
      { line: 3, text: "    p = partition(arr, low, high)" },
      { line: 4, text: "    quickSort(arr, low, p - 1)" },
      { line: 5, text: "    quickSort(arr, p + 1, high)" },
    ]
  }
};
