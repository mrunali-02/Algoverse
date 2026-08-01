import { SimulationStep } from '@/types';

export function generateMaxSubarraySteps(arr: number[], k: number): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  if (arr.length < k) return [];

  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  let maxSum = windowSum;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      array: [...arr],
      k,
      left: 0,
      right: k - 1,
      currentSum: windowSum,
      maxSum,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `Sliding Window Initialized (Size K=${k})`,
    explanationDescription: `Initial window [0..${k - 1}] sum = ${windowSum}. Initial Max Sum = ${maxSum}.`,
    explanationReason: "Computing sum of first K elements.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (let i = k; i < arr.length; i++) {
    const leftOut = arr[i - k];
    const rightIn = arr[i];

    windowSum += rightIn - leftOut;
    const isNewMax = windowSum > maxSum;
    if (isNewMax) maxSum = windowSum;

    steps.push({
      stepNumber: stepCount++,
      action: isNewMax ? 'UPDATE_DISTANCE' : 'EXAMINE_NEIGHBOR',
      visitedNodes: [],
      distances: {
        array: [...arr],
        k,
        left: i - k + 1,
        right: i,
        currentSum: windowSum,
        maxSum,
        leftOut,
        rightIn,
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Slid Window to Range [${i - k + 1}..${i}]`,
      explanationDescription: `Subtracted left element ${leftOut} and added right element ${rightIn}. New Window Sum = ${windowSum}. ${
        isNewMax ? `New Max Sum = ${maxSum}!` : `Max Sum remains ${maxSum}.`
      }`,
      explanationReason: "O(1) window update: windowSum += arr[right] - arr[left-1].",
      highlightedPseudocodeLine: 4,
      animationType: isNewMax ? 'bounce' : 'glow',
    });
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      array: [...arr],
      k,
      maxSum,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Sliding Window Search Complete",
    explanationDescription: `Maximum contiguous subarray sum of size K=${k} is ${maxSum}.`,
    explanationReason: "Single O(N) pass across entire array complete.",
    highlightedPseudocodeLine: 6,
    animationType: 'glow',
  });

  return steps;
}

export function generateLongestSubstringSteps(str: string): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  let left = 0;
  let maxLength = 0;
  const set = new Set<string>();

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      str,
      left: 0,
      right: 0,
      maxLength: 0,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Variable Sliding Window Initialized",
    explanationDescription: `Finding longest substring without repeating characters in "${str}".`,
    explanationReason: "Window expands right until a duplicate is found, then shrinks left.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (let right = 0; right < str.length; right++) {
    const char = str[right];

    while (set.has(char)) {
      set.delete(str[left]);

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        visitedNodes: [],
        distances: {
          str,
          left,
          right,
          currentLength: right - left,
          maxLength,
          duplicateChar: char,
          charSet: Array.from(set),
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Duplicate Character '${char}' Detected!`,
        explanationDescription: `Shrinking window left side. Removed '${str[left]}' at index ${left}. New left = ${left + 1}.`,
        explanationReason: "Window contraction resolves character duplicate constraint.",
        highlightedPseudocodeLine: 5,
        animationType: 'fade',
      });
      left++;
    }

    set.add(char);
    const currLen = right - left + 1;
    const isNewMax = currLen > maxLength;
    if (isNewMax) maxLength = currLen;

    steps.push({
      stepNumber: stepCount++,
      action: isNewMax ? 'UPDATE_DISTANCE' : 'SELECT_NODE',
      visitedNodes: [],
      distances: {
        str,
        left,
        right,
        currentLength: currLen,
        maxLength,
        charSet: Array.from(set),
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Expanded Window to Substring "${str.substring(left, right + 1)}"`,
      explanationDescription: `Added '${char}' at index ${right}. Current unique length = ${currLen}. Max Length = ${maxLength}.`,
      explanationReason: "Window expansion: all characters in active window are unique.",
      highlightedPseudocodeLine: 6,
      animationType: isNewMax ? 'bounce' : 'glow',
    });
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      str,
      maxLength,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Sliding Window Completed",
    explanationDescription: `Longest substring length without repeating characters is ${maxLength}.`,
    explanationReason: "Linear O(N) scan completed.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
