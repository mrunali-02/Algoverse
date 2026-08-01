/**
 * Heap & Priority Queue Constants & Theory Definitions
 */

export const HEAP_ALGORITHMS_THEORY = {
  minHeap: {
    title: "Min Heap",
    description: "Complete binary tree where parent node key is less than or equal to children keys. Root contains minimum element.",
    complexities: { best: "O(1) peek", average: "O(log N) push/pop", worst: "O(log N) push/pop", space: "O(N)" },
    pseudocode: [
      { line: 1, text: "function heapifyUp(i):" },
      { line: 2, text: "  while i > 0 and heap[parent(i)] > heap[i]:" },
      { line: 3, text: "    swap(heap[parent(i)], heap[i])" },
      { line: 4, text: "    i = parent(i)" },
    ]
  },

  maxHeap: {
    title: "Max Heap",
    description: "Complete binary tree where parent node key is greater than or equal to children keys. Root contains maximum element.",
    complexities: { best: "O(1) peek", average: "O(log N) push/pop", worst: "O(log N) push/pop", space: "O(N)" },
    pseudocode: [
      { line: 1, text: "function heapifyDown(i):" },
      { line: 2, text: "  maxIdx = i, left = 2i+1, right = 2i+2" },
      { line: 3, text: "  if left < N and heap[left] > heap[maxIdx]: maxIdx = left" },
      { line: 4, text: "  if right < N and heap[right] > heap[maxIdx]: maxIdx = right" },
      { line: 5, text: "  if maxIdx != i: swap(heap[i], heap[maxIdx]); heapifyDown(maxIdx)" },
    ]
  },

  heapSort: {
    title: "Heap Sort",
    description: "Comparison-based sorting algorithm that builds a Max Heap and repeatedly extracts the maximum root element to the end of the array.",
    complexities: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)", space: "O(1)" },
    pseudocode: [
      { line: 1, text: "function heapSort(arr):" },
      { line: 2, text: "  buildMaxHeap(arr)" },
      { line: 3, text: "  for i from N-1 down to 1:" },
      { line: 4, text: "    swap(arr[0], arr[i]) // Extract max" },
      { line: 5, text: "    heapifyDown(arr, 0, i) // Restore heap property" },
    ]
  }
};
