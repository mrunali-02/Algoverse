import { SimulationStep } from '@/types';

export function generateMinHeapSteps(
  elementsToInsert: number[] = [45, 20, 14, 12, 30, 8]
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const heap: number[] = [];
  let stepCount = 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      heapArray: [...heap],
      heapType: 'min',
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Min Heap Initialized",
    explanationDescription: "Created empty Min Heap array representation.",
    explanationReason: "Parent index p = floor((i-1)/2), Left = 2i+1, Right = 2i+2.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  for (const val of elementsToInsert) {
    heap.push(val);
    let i = heap.length - 1;

    steps.push({
      stepNumber: stepCount++,
      action: 'UPDATE_DISTANCE',
      highlightedNodeId: `heap-${i}`,
      visitedNodes: [],
      distances: {
        heapArray: [...heap],
        heapType: 'min',
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Pushed Element ${val} at Index ${i}`,
      explanationDescription: `Inserted ${val} as leaf element at end of heap array.`,
      explanationReason: "Heap insertion appends to end, then heapifies up.",
      highlightedPseudocodeLine: 2,
      animationType: 'bounce',
    });

    // Heapify Up
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        visitedNodes: [],
        distances: {
          heapArray: [...heap],
          comparingIndices: [i, p],
          heapType: 'min',
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Comparing Child heap[${i}] (${heap[i]}) with Parent heap[${p}] (${heap[p]})`,
        explanationDescription: heap[i] < heap[p]
          ? `${heap[i]} < ${heap[p]}. Min heap property violated. Swapping!`
          : `${heap[i]} >= ${heap[p]}. Min heap property satisfied.`,
        explanationReason: "Min Heap condition: parent <= child.",
        highlightedPseudocodeLine: 2,
        animationType: heap[i] < heap[p] ? 'bounce' : 'fade',
      });

      if (heap[i] < heap[p]) {
        [heap[i], heap[p]] = [heap[p], heap[i]];

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          visitedNodes: [],
          distances: {
            heapArray: [...heap],
            swappingIndices: [i, p],
            heapType: 'min',
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Swapped Index ${i} (${heap[i]}) and Index ${p} (${heap[p]})`,
          explanationDescription: `Sift-up moved smaller element ${heap[p]} closer to root.`,
          explanationReason: "Heapify Up bubble swap.",
          highlightedPseudocodeLine: 3,
          animationType: 'bounce',
        });
        i = p;
      } else {
        break;
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      heapArray: [...heap],
      heapType: 'min',
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Min Heap Operations Completed",
    explanationDescription: `Min Heap built successfully with minimum element (${heap[0]}) at root.`,
    explanationReason: "Heapify up complete for all inserted values.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateHeapSortSteps(initialArr: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  let stepCount = 1;
  const sortedIndices: number[] = [];

  function heapifyDown(size: number, i: number) {
    let maxIdx = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size && arr[left] > arr[maxIdx]) maxIdx = left;
    if (right < size && arr[right] > arr[maxIdx]) maxIdx = right;

    if (maxIdx !== i) {
      [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]];

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        visitedNodes: [],
        distances: {
          heapArray: [...arr],
          swappingIndices: [i, maxIdx],
          sortedIndices: [...sortedIndices],
          heapType: 'max',
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Heapify Down: Swapped arr[${i}] and arr[${maxIdx}]`,
        explanationDescription: `Restored Max Heap property for subtree at index ${i}.`,
        explanationReason: "Sift-down swap.",
        highlightedPseudocodeLine: 5,
        animationType: 'bounce',
      });
      heapifyDown(size, maxIdx);
    }
  }

  // Build Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapifyDown(n, i);
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      heapArray: [...arr],
      sortedIndices: [],
      heapType: 'max',
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Max Heap Built for Heap Sort",
    explanationDescription: `Array transformed into Max Heap in O(N) time. Max element ${arr[0]} at root.`,
    explanationReason: "Max Heap initialization complete.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  // Extract root max elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    sortedIndices.push(i);

    steps.push({
      stepNumber: stepCount++,
      action: 'UPDATE_DISTANCE',
      visitedNodes: [],
      distances: {
        heapArray: [...arr],
        swappingIndices: [0, i],
        extractedValue: arr[i],
        sortedIndices: [...sortedIndices],
        heapType: 'max',
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Extracted Max Element ${arr[i]} to Index ${i}`,
      explanationDescription: `Swapped root max value ${arr[i]} into sorted end position ${i}.`,
      explanationReason: "Heap Sort places max element at array end.",
      highlightedPseudocodeLine: 4,
      animationType: 'bounce',
    });

    heapifyDown(i, 0);
  }
  sortedIndices.push(0);

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      heapArray: [...arr],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Heap Sort Completed",
    explanationDescription: `Array fully sorted in O(N log N) time and O(1) auxiliary space.`,
    explanationReason: "All elements extracted.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
