import { SimulationStep } from '@/types';

export function generateLinearSearchSteps(arr: number[], target: number): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  // Initial Step
  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {},
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Linear Search Initialized",
    explanationDescription: `Searching for target value ${target} in array [${arr.join(', ')}].`,
    explanationReason: "Starting from index 0 and scanning sequentially.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
    highlightedNodeId: `idx-0`,
  });

  let found = false;

  for (let i = 0; i < arr.length; i++) {
    const currentVal = arr[i];
    const isMatch = currentVal === target;

    steps.push({
      stepNumber: stepCount++,
      action: isMatch ? 'PATH_FOUND' : 'EXAMINE_NEIGHBOR',
      highlightedNodeId: `idx-${i}`,
      visitedNodes: Array.from({ length: i + 1 }, (_, idx) => `idx-${idx}`),
      distances: { target, current: currentVal, index: i },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: isMatch ? `Match Found at Index ${i}` : `Comparing Index ${i}`,
      explanationDescription: isMatch
        ? `arr[${i}] (${currentVal}) equals target ${target}!`
        : `arr[${i}] (${currentVal}) != target ${target}. Moving to next index.`,
      explanationReason: isMatch
        ? "Target element found. Terminating search."
        : "Current element does not match. Increment search index i.",
      highlightedPseudocodeLine: isMatch ? 4 : 3,
      animationType: isMatch ? 'bounce' : 'glow',
    });

    if (isMatch) {
      found = true;
      break;
    }
  }

  // Final Step
  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {},
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: found ? "Search Completed (Success)" : "Search Completed (Target Not Found)",
    explanationDescription: found
      ? `Successfully located ${target} in the array.`
      : `Scanned all ${arr.length} elements. Target ${target} is not in the array.`,
    explanationReason: found ? "Linear Search finished successfully." : "Returned -1.",
    highlightedPseudocodeLine: found ? 4 : 5,
    animationType: 'fade',
  });

  return steps;
}

export function generateBinarySearchSteps(arr: number[], target: number): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  let low = 0;
  let high = arr.length - 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: { low, high, target },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Binary Search Initialized",
    explanationDescription: `Set low = 0 and high = ${high} for sorted array [${arr.join(', ')}]. Target = ${target}.`,
    explanationReason: "Initial search range covers the entire sorted array.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  let found = false;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    steps.push({
      stepNumber: stepCount++,
      action: 'SELECT_NODE',
      highlightedNodeId: `idx-${mid}`,
      visitedNodes: [],
      distances: { low, high, mid, target, midVal },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Calculate Mid Index ${mid}`,
      explanationDescription: `mid = floor((${low} + ${high}) / 2) = ${mid}. arr[${mid}] = ${midVal}.`,
      explanationReason: "Divide and conquer: Comparing middle element against target.",
      highlightedPseudocodeLine: 4,
      animationType: 'glow',
    });

    if (midVal === target) {
      steps.push({
        stepNumber: stepCount++,
        action: 'PATH_FOUND',
        highlightedNodeId: `idx-${mid}`,
        visitedNodes: [`idx-${mid}`],
        distances: { low, high, mid, target, midVal },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Target Found at Index ${mid}!`,
        explanationDescription: `arr[${mid}] (${midVal}) matches target ${target}.`,
        explanationReason: "Match confirmed. Return mid index.",
        highlightedPseudocodeLine: 5,
        animationType: 'bounce',
      });
      found = true;
      break;
    } else if (midVal < target) {
      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: `idx-${mid}`,
        visitedNodes: [],
        distances: { low: mid + 1, high, mid, target, midVal },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `arr[${mid}] (${midVal}) < target ${target}`,
        explanationDescription: `Target is greater than mid value. Discard left half [${low}..${mid}]. New low = ${mid + 1}.`,
        explanationReason: "Because the array is sorted, all elements to the left of mid are also smaller than target.",
        highlightedPseudocodeLine: 6,
        animationType: 'fade',
      });
      low = mid + 1;
    } else {
      steps.push({
        stepNumber: stepCount++,
        action: 'UPDATE_DISTANCE',
        highlightedNodeId: `idx-${mid}`,
        visitedNodes: [],
        distances: { low, high: mid - 1, mid, target, midVal },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `arr[${mid}] (${midVal}) > target ${target}`,
        explanationDescription: `Target is smaller than mid value. Discard right half [${mid}..${high}]. New high = ${mid - 1}.`,
        explanationReason: "Because the array is sorted, all elements to the right of mid are also larger than target.",
        highlightedPseudocodeLine: 7,
        animationType: 'fade',
      });
      high = mid - 1;
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: { low, high, target },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: found ? "Binary Search Completed (Found)" : "Binary Search Completed (Not Found)",
    explanationDescription: found
      ? `Found target ${target} in ${stepCount - 1} steps.`
      : `Search space exhausted (low > high). Target ${target} is not in array.`,
    explanationReason: found ? "Return index." : "Return -1.",
    highlightedPseudocodeLine: found ? 5 : 8,
    animationType: 'fade',
  });

  return steps;
}
