import { SimulationStep } from '@/types';

export function generateKMPSteps(
  text: string = "ABABDABACDABABCABAB",
  pattern: string = "ABABCABAB"
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let stepCount = 1;

  // Build LPS table
  const m = pattern.length;
  const lps: number[] = Array(m).fill(0);
  let len = 0;
  let idx = 1;

  while (idx < m) {
    if (pattern[idx] === pattern[len]) {
      len++;
      lps[idx] = len;
      idx++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[idx] = 0;
        idx++;
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      text,
      pattern,
      lps: [...lps],
      textIndex: 0,
      patternIndex: 0,
      matchIndices: [],
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "KMP Algorithm Initialized",
    explanationDescription: `Precomputed LPS Table for pattern "${pattern}": [${lps.join(', ')}].`,
    explanationReason: "LPS array stores length of longest proper prefix that is also a suffix.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  const n = text.length;
  let i = 0;
  let j = 0;
  const matchIndices: number[] = [];

  while (i < n) {
    const isCharMatch = pattern[j] === text[i];

    steps.push({
      stepNumber: stepCount++,
      action: isCharMatch ? 'UPDATE_DISTANCE' : 'EXAMINE_NEIGHBOR',
      visitedNodes: [],
      distances: {
        text,
        pattern,
        lps: [...lps],
        textIndex: i,
        patternIndex: j,
        matchIndices: [...matchIndices],
        isCharMatch,
      },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Comparing text[${i}] ('${text[i]}') with pattern[${j}] ('${pattern[j]}')`,
      explanationDescription: isCharMatch
        ? `Match! text[${i}] == pattern[${j}] ('${text[i]}'). Advancing both pointers.`
        : `Mismatch! text[${i}] ('${text[i]}') != pattern[${j}] ('${pattern[j]}').`,
      explanationReason: "Character comparison.",
      highlightedPseudocodeLine: 5,
      animationType: isCharMatch ? 'bounce' : 'fade',
    });

    if (isCharMatch) {
      i++;
      j++;
    }

    if (j === m) {
      const matchStart = i - j;
      matchIndices.push(matchStart);

      steps.push({
        stepNumber: stepCount++,
        action: 'PATH_FOUND',
        visitedNodes: [],
        distances: {
          text,
          pattern,
          lps: [...lps],
          textIndex: i,
          patternIndex: j,
          matchIndices: [...matchIndices],
          fullMatchFound: true,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Pattern Found at Index ${matchStart}!`,
        explanationDescription: `Full pattern "${pattern}" matched in text from index ${matchStart} to ${i - 1}.`,
        explanationReason: "Full pattern match complete.",
        highlightedPseudocodeLine: 6,
        animationType: 'bounce',
      });

      j = lps[j - 1];
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        const prevJ = j;
        j = lps[j - 1];

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          visitedNodes: [],
          distances: {
            text,
            pattern,
            lps: [...lps],
            textIndex: i,
            patternIndex: j,
            matchIndices: [...matchIndices],
            lpsShift: true,
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Smart Shift using LPS: Moved pattern index from ${prevJ} ➔ ${j}`,
          explanationDescription: `Using LPS[${prevJ - 1}] = ${j}. Text pointer i remains at ${i} without re-scanning!`,
          explanationReason: "O(N) linear time optimization by skipping redundant comparisons.",
          highlightedPseudocodeLine: 8,
          animationType: 'pulse',
        });
      } else {
        i++;
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      text,
      pattern,
      lps: [...lps],
      matchIndices: [...matchIndices],
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "KMP String Matching Complete",
    explanationDescription: `Found ${matchIndices.length} occurrences of pattern "${pattern}" in text.`,
    explanationReason: "Linear scan finished.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
