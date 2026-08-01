import { SimulationStep } from '@/types';

export function generateTwoSumSteps(arr: number[], target: number): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  let left = 0;
  let right = arr.length - 1;
  let found = false;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      array: [...arr],
      left,
      right,
      target,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Two Pointers Initialized",
    explanationDescription: `Left pointer at index 0 (${arr[0]}), Right pointer at index ${right} (${arr[right]}). Target = ${target}.`,
    explanationReason: "Array is sorted. Sum increases when left moves right, decreases when right moves left.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (sum === target) {
      found = true;
      steps.push({
        stepNumber: stepCount++,
        action: 'PATH_FOUND',
        visitedNodes: [],
        distances: {
          array: [...arr],
          left,
          right,
          currentSum: sum,
          target,
          foundMatch: true,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Target Sum Found! arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${target}`,
        explanationDescription: `Match located at index indices [${left}, ${right}].`,
        explanationReason: "arr[left] + arr[right] equals target.",
        highlightedPseudocodeLine: 5,
        animationType: 'bounce',
      });
      break;
    } else if (sum < target) {
      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        visitedNodes: [],
        distances: {
          array: [...arr],
          left,
          right,
          currentSum: sum,
          target,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Sum (${sum}) < Target (${target})`,
        explanationDescription: `${arr[left]} + ${arr[right]} = ${sum} < ${target}. Incrementing left pointer to increase sum.`,
        explanationReason: "Sum too small: Moving left pointer right increases value.",
        highlightedPseudocodeLine: 6,
        animationType: 'fade',
      });
      left++;
    } else {
      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        visitedNodes: [],
        distances: {
          array: [...arr],
          left,
          right,
          currentSum: sum,
          target,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Sum (${sum}) > Target (${target})`,
        explanationDescription: `${arr[left]} + ${arr[right]} = ${sum} > ${target}. Decrementing right pointer to decrease sum.`,
        explanationReason: "Sum too large: Moving right pointer left decreases value.",
        highlightedPseudocodeLine: 7,
        animationType: 'fade',
      });
      right--;
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      left,
      right,
      target,
      foundMatch: found,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Two Pointers Search Completed",
    explanationDescription: found ? "Target sum achieved." : "No pair found matching target sum.",
    explanationReason: "Search terminated.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateContainerWaterSteps(heights: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      heights: [...heights],
      left,
      right,
      maxArea,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Container With Most Water Initialized",
    explanationDescription: `Left pointer at 0 (h:${heights[0]}), Right pointer at ${right} (h:${heights[right]}).`,
    explanationReason: "Maximum width container initialized. Moving shorter line inward gives chance for higher area.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  while (left < right) {
    const hLeft = heights[left];
    const hRight = heights[right];
    const width = right - left;
    const currentArea = Math.min(hLeft, hRight) * width;
    const isNewMax = currentArea > maxArea;
    if (isNewMax) maxArea = currentArea;

    const moveLeft = hLeft < hRight;

    steps.push({
      stepNumber: stepCount++,
      action: isNewMax ? 'UPDATE_DISTANCE' : 'EXAMINE_NEIGHBOR',
      visitedNodes: [],
      distances: {
        heights: [...heights],
        left,
        right,
        currentArea,
        maxArea,
        hLeft,
        hRight,
        width,
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Container Area = min(${hLeft}, ${hRight}) * ${width} = ${currentArea}`,
      explanationDescription: `${isNewMax ? `New Max Area = ${maxArea}!` : `Max Area remains ${maxArea}.`} ${
        moveLeft ? `h[left] (${hLeft}) < h[right] (${hRight}). Incrementing left pointer.` : `h[right] (${hRight}) <= h[left] (${hLeft}). Decrementing right pointer.`
      }`,
      explanationReason: "Greedy pointer movement: The bottleneck height is advanced.",
      highlightedPseudocodeLine: moveLeft ? 6 : 7,
      animationType: isNewMax ? 'bounce' : 'glow',
    });

    if (moveLeft) left++;
    else right--;
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      heights: [...heights],
      maxArea,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Container With Most Water Complete",
    explanationDescription: `Maximum achievable water container volume is ${maxArea}.`,
    explanationReason: "All line pairs evaluated in O(N) linear time.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
