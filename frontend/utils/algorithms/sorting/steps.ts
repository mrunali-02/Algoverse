import { SimulationStep } from '@/types';

export function generateBubbleSortSteps(initialArr: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  let stepCount = 1;
  let comparisonCount = 0;
  let swapCount = 0;
  const sortedIndices: number[] = [];

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      array: [...arr],
      comparisonCount,
      swapCount,
      sortedIndices: [...sortedIndices],
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Bubble Sort Initialized",
    explanationDescription: `Array initialized with ${n} elements.`,
    explanationReason: "Starting pass 1 from index 0.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisonCount++;

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: `bar-${j}`,
        visitedNodes: [],
        distances: {
          array: [...arr],
          comparingIndices: [j, j + 1],
          comparisonCount,
          swapCount,
          sortedIndices: [...sortedIndices],
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]})`,
        explanationDescription: arr[j] > arr[j + 1]
          ? `${arr[j]} > ${arr[j + 1]}. Swap required.`
          : `${arr[j]} <= ${arr[j + 1]}. Order is correct.`,
        explanationReason: "Comparing adjacent elements.",
        highlightedPseudocodeLine: 4,
        animationType: 'fade',
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapCount++;

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: `bar-${j + 1}`,
          visitedNodes: [],
          distances: {
            array: [...arr],
            swappingIndices: [j, j + 1],
            comparisonCount,
            swapCount,
            sortedIndices: [...sortedIndices],
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Swapped arr[${j}] and arr[${j + 1}]`,
          explanationDescription: `Moved larger value ${arr[j + 1]} to the right.`,
          explanationReason: "Swapping out-of-order adjacent elements.",
          highlightedPseudocodeLine: 5,
          animationType: 'bounce',
        });
      }
    }
    sortedIndices.push(n - 1 - i);
  }
  sortedIndices.push(0);

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      comparisonCount,
      swapCount,
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Bubble Sort Completed",
    explanationDescription: `Array fully sorted in ${comparisonCount} comparisons and ${swapCount} swaps.`,
    explanationReason: "All passes complete.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateSelectionSortSteps(initialArr: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  let stepCount = 1;
  let comparisonCount = 0;
  let swapCount = 0;
  const sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: `bar-${i}`,
      visitedNodes: [],
      distances: {
        array: [...arr],
        minIdx,
        currentIndex: i,
        comparisonCount,
        swapCount,
        sortedIndices: [...sortedIndices],
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Finding Minimum starting at Index ${i}`,
      explanationDescription: `Initial minimum candidate is arr[${i}] (${arr[i]}).`,
      explanationReason: "Scanning remaining unsorted portion for smallest element.",
      highlightedPseudocodeLine: 3,
      animationType: 'pulse',
    });

    for (let j = i + 1; j < n; j++) {
      comparisonCount++;
      const isNewMin = arr[j] < arr[minIdx];
      if (isNewMin) minIdx = j;

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: `bar-${j}`,
        visitedNodes: [],
        distances: {
          array: [...arr],
          minIdx,
          comparingIndices: [j, minIdx],
          currentIndex: i,
          comparisonCount,
          swapCount,
          sortedIndices: [...sortedIndices],
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Comparing arr[${j}] (${arr[j]}) with Current Min (${arr[minIdx]})`,
        explanationDescription: isNewMin
          ? `Found smaller element ${arr[j]} at index ${j}! New minimum updated.`
          : `${arr[j]} >= current minimum (${arr[minIdx]}). Keep scanning.`,
        explanationReason: "Comparing candidate with active minimum.",
        highlightedPseudocodeLine: 5,
        animationType: isNewMin ? 'bounce' : 'fade',
      });
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swapCount++;

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: `bar-${i}`,
        visitedNodes: [],
        distances: {
          array: [...arr],
          swappingIndices: [i, minIdx],
          comparisonCount,
          swapCount,
          sortedIndices: [...sortedIndices, i],
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Swapped arr[${i}] (${arr[minIdx]}) and arr[${minIdx}] (${arr[i]})`,
        explanationDescription: `Placed minimum element ${arr[i]} into sorted position ${i}.`,
        explanationReason: "Selection Sort places smallest remaining element at front.",
        highlightedPseudocodeLine: 6,
        animationType: 'bounce',
      });
    }
    sortedIndices.push(i);
  }
  sortedIndices.push(n - 1);

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      comparisonCount,
      swapCount,
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Selection Sort Completed",
    explanationDescription: `Sorted array in ${comparisonCount} comparisons and ${swapCount} swaps.`,
    explanationReason: "Finished scanning all indices.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateInsertionSortSteps(initialArr: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  let stepCount = 1;
  let comparisonCount = 0;
  let swapCount = 0;
  const sortedIndices: number[] = [0];

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: `bar-${i}`,
      visitedNodes: [],
      distances: {
        array: [...arr],
        key,
        currentIndex: i,
        comparisonCount,
        swapCount,
        sortedIndices: [...sortedIndices],
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Inserting Element ${key} at Index ${i}`,
      explanationDescription: `Key value to insert into sorted left portion is ${key}.`,
      explanationReason: "Shift larger elements to the right to make space.",
      highlightedPseudocodeLine: 3,
      animationType: 'pulse',
    });

    while (j >= 0 && arr[j] > key) {
      comparisonCount++;
      arr[j + 1] = arr[j];
      swapCount++;

      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: `bar-${j}`,
        visitedNodes: [],
        distances: {
          array: [...arr],
          key,
          comparingIndices: [j, j + 1],
          comparisonCount,
          swapCount,
          sortedIndices: [...sortedIndices],
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Shifted arr[${j}] (${arr[j + 1]}) Right`,
        explanationDescription: `${arr[j + 1]} > key (${key}). Shifted right to position ${j + 1}.`,
        explanationReason: "Shifting elements larger than key.",
        highlightedPseudocodeLine: 5,
        animationType: 'bounce',
      });
      j--;
    }
    if (j >= 0) comparisonCount++;
    arr[j + 1] = key;
    sortedIndices.push(i);
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      comparisonCount,
      swapCount,
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Insertion Sort Completed",
    explanationDescription: `Array sorted in ${comparisonCount} comparisons and ${swapCount} shifts.`,
    explanationReason: "All elements inserted in place.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateMergeSortSteps(initialArr: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const arr = [...initialArr];
  let stepCount = 1;
  let comparisonCount = 0;
  let swapCount = 0;

  function merge(low: number, mid: number, high: number) {
    const left = arr.slice(low, mid + 1);
    const right = arr.slice(mid + 1, high + 1);

    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
      comparisonCount++;
      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: `bar-${k}`,
        visitedNodes: [],
        distances: {
          array: [...arr],
          comparingIndices: [low + i, mid + 1 + j],
          partitionRange: [low, high],
          comparisonCount,
          swapCount,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Merge Compare: Left[${i}] (${left[i]}) vs Right[${j}] (${right[j]})`,
        explanationDescription: `Comparing elements from left subarray [${low}..${mid}] and right subarray [${mid+1}..${high}].`,
        explanationReason: "Merging two sorted subarrays.",
        highlightedPseudocodeLine: 6,
        animationType: 'fade',
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
        swapCount++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++;
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      j++;
      k++;
    }

    steps.push({
      stepNumber: stepCount++,
      action: 'UPDATE_DISTANCE',
      highlightedNodeId: `bar-${low}`,
      visitedNodes: [],
      distances: {
        array: [...arr],
        partitionRange: [low, high],
        comparisonCount,
        swapCount,
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Merged Subarray Range [${low}..${high}]`,
      explanationDescription: `Subarray [${low}..${high}] is now sorted: [${arr.slice(low, high + 1).join(', ')}].`,
      explanationReason: "Conquer step complete for active range.",
      highlightedPseudocodeLine: 6,
      animationType: 'bounce',
    });
  }

  function mergeSortHelper(low: number, high: number) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);
    mergeSortHelper(low, mid);
    mergeSortHelper(mid + 1, high);
    merge(low, mid, high);
  }

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      comparisonCount,
      swapCount,
      sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx),
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Merge Sort Completed",
    explanationDescription: `Array sorted in ${comparisonCount} comparisons.`,
    explanationReason: "Divide and conquer complete.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateQuickSortSteps(initialArr: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const arr = [...initialArr];
  let stepCount = 1;
  let comparisonCount = 0;
  let swapCount = 0;
  const sortedIndices: number[] = [];

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: `bar-${high}`,
      visitedNodes: [],
      distances: {
        array: [...arr],
        pivotIndex: high,
        partitionRange: [low, high],
        comparisonCount,
        swapCount,
        sortedIndices: [...sortedIndices],
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Selected Pivot ${pivot} at Index ${high}`,
      explanationDescription: `Partitioning range [${low}..${high}] around pivot element ${pivot}.`,
      explanationReason: "Elements smaller than pivot will move to left, larger to right.",
      highlightedPseudocodeLine: 3,
      animationType: 'pulse',
    });

    for (let j = low; j < high; j++) {
      comparisonCount++;
      const isSmaller = arr[j] < pivot;

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        highlightedNodeId: `bar-${j}`,
        visitedNodes: [],
        distances: {
          array: [...arr],
          pivotIndex: high,
          comparingIndices: [j, high],
          partitionRange: [low, high],
          comparisonCount,
          swapCount,
          sortedIndices: [...sortedIndices],
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Comparing arr[${j}] (${arr[j]}) with Pivot (${pivot})`,
        explanationDescription: isSmaller
          ? `${arr[j]} < pivot (${pivot}). Swap to left partition.`
          : `${arr[j]} >= pivot (${pivot}). Remains in right partition.`,
        explanationReason: "Partition comparison.",
        highlightedPseudocodeLine: 3,
        animationType: 'fade',
      });

      if (isSmaller) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapCount++;

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: `bar-${i}`,
          visitedNodes: [],
          distances: {
            array: [...arr],
            pivotIndex: high,
            swappingIndices: [i, j],
            partitionRange: [low, high],
            comparisonCount,
            swapCount,
            sortedIndices: [...sortedIndices],
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Swapped arr[${i}] and arr[${j}]`,
          explanationDescription: `Moved ${arr[i]} into left partition index ${i}.`,
          explanationReason: "Swapping element smaller than pivot.",
          highlightedPseudocodeLine: 3,
          animationType: 'bounce',
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swapCount++;
    const p = i + 1;
    sortedIndices.push(p);

    steps.push({
      stepNumber: stepCount++,
      action: 'UPDATE_DISTANCE',
      highlightedNodeId: `bar-${p}`,
      visitedNodes: [],
      distances: {
        array: [...arr],
        pivotIndex: p,
        swappingIndices: [p, high],
        partitionRange: [low, high],
        comparisonCount,
        swapCount,
        sortedIndices: [...sortedIndices],
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Placed Pivot ${pivot} into Final Position ${p}`,
      explanationDescription: `Pivot ${pivot} settled at index ${p}. All elements to left are <= ${pivot}, all elements to right are >= ${pivot}.`,
      explanationReason: "Pivot placement complete.",
      highlightedPseudocodeLine: 3,
      animationType: 'glow',
    });

    return p;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const p = partition(low, high);
      quickSortHelper(low, p - 1);
      quickSortHelper(p + 1, high);
    } else if (low === high) {
      sortedIndices.push(low);
    }
  }

  quickSortHelper(0, arr.length - 1);

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      comparisonCount,
      swapCount,
      sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx),
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Quick Sort Completed",
    explanationDescription: `Array sorted in ${comparisonCount} comparisons and ${swapCount} swaps.`,
    explanationReason: "All partitions sorted.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
