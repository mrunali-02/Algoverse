import { SimulationStep } from '@/types';

export function generateKnapsackSteps(
  weights: number[],
  values: number[],
  capacity: number
): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const n = weights.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const rowLabels = ['Ø', ...weights.map((w, idx) => `Item ${idx + 1} (w:${w}, v:${values[idx]})`)];
  const colLabels = Array.from({ length: capacity + 1 }, (_, idx) => `w=${idx}`);

  let stepCount = 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      grid: dp.map((row) => [...row]),
      rowLabels,
      colLabels,
      capacity,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "0/1 Knapsack DP Table Initialized",
    explanationDescription: `Created DP table of size (${n + 1} x ${capacity + 1}). All base cases dp[0][w] = 0 and dp[i][0] = 0 set.`,
    explanationReason: "Tabulation state representation for subset selection optimization.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (let i = 1; i <= n; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];

    for (let w = 1; w <= capacity; w++) {
      const dependencies: Array<[number, number]> = [[i - 1, w]];

      if (wt <= w) {
        dependencies.push([i - 1, w - wt]);
        const optionExclude = dp[i - 1][w];
        const optionInclude = val + dp[i - 1][w - wt];

        dp[i][w] = Math.max(optionExclude, optionInclude);

        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          visitedNodes: [],
          distances: {
            grid: dp.map((row) => [...row]),
            rowLabels,
            colLabels,
            activeCell: [i, w],
            dependencyCells: dependencies,
            wt,
            val,
            capacity: w,
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Evaluating Item ${i} for Capacity ${w}`,
          explanationDescription: `wt[${i - 1}] (${wt}) <= capacity ${w}. Max(Exclude: ${optionExclude}, Include: ${val} + dp[${i - 1}][${w - wt}] = ${optionInclude}) = ${dp[i][w]}.`,
          explanationReason: "Recurrence: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]]).",
          highlightedPseudocodeLine: 6,
          animationType: 'bounce',
        });
      } else {
        dp[i][w] = dp[i - 1][w];

        steps.push({
          stepNumber: stepCount++,
          action: 'EXAMINE_NEIGHBOR',
          visitedNodes: [],
          distances: {
            grid: dp.map((row) => [...row]),
            rowLabels,
            colLabels,
            activeCell: [i, w],
            dependencyCells: dependencies,
            wt,
            val,
            capacity: w,
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Item ${i} Exceeds Capacity ${w}`,
          explanationDescription: `wt[${i - 1}] (${wt}) > capacity ${w}. Inheriting value from row above dp[${i - 1}][${w}] = ${dp[i][w]}.`,
          explanationReason: "Item too heavy for current capacity window.",
          highlightedPseudocodeLine: 7,
          animationType: 'fade',
        });
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      grid: dp.map((row) => [...row]),
      rowLabels,
      colLabels,
      maxVal: dp[n][capacity],
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "Knapsack DP Completed",
    explanationDescription: `Maximum achievable knapsack value is ${dp[n][capacity]}.`,
    explanationReason: "Tabulation complete. Cell dp[N][W] contains optimal value.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateLCSSteps(str1: string, str2: string): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const m = str1.length;
  const n = str2.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const rowLabels = ['Ø', ...str1.split('')];
  const colLabels = ['Ø', ...str2.split('')];

  let stepCount = 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      grid: dp.map((r) => [...r]),
      rowLabels,
      colLabels,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "LCS DP Table Initialized",
    explanationDescription: `Comparing string "${str1}" and "${str2}".`,
    explanationReason: "Initialized base cases dp[0][j] = 0 and dp[i][0] = 0.",
    highlightedPseudocodeLine: 2,
    animationType: 'pulse',
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const char1 = str1[i - 1];
      const char2 = str2[j - 1];
      const isMatch = char1 === char2;

      if (isMatch) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          visitedNodes: [],
          distances: {
            grid: dp.map((r) => [...r]),
            rowLabels,
            colLabels,
            activeCell: [i, j],
            dependencyCells: [[i - 1, j - 1]],
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Match Found: '${char1}' == '${char2}'`,
          explanationDescription: `Characters match! dp[${i}][${j}] = 1 + dp[${i - 1}][${j - 1}] = ${dp[i][j]}.`,
          explanationReason: "Diagonal extension of common subsequence.",
          highlightedPseudocodeLine: 5,
          animationType: 'bounce',
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          stepNumber: stepCount++,
          action: 'EXAMINE_NEIGHBOR',
          visitedNodes: [],
          distances: {
            grid: dp.map((r) => [...r]),
            rowLabels,
            colLabels,
            activeCell: [i, j],
            dependencyCells: [[i - 1, j], [i, j - 1]],
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Mismatch: '${char1}' != '${char2}'`,
          explanationDescription: `dp[${i}][${j}] = max(Top: ${dp[i - 1][j]}, Left: ${dp[i][j - 1]}) = ${dp[i][j]}.`,
          explanationReason: "Inheriting optimal length from adjacent sub-problems.",
          highlightedPseudocodeLine: 6,
          animationType: 'fade',
        });
      }
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      grid: dp.map((r) => [...r]),
      rowLabels,
      colLabels,
      lcsLength: dp[m][n],
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "LCS DP Complete",
    explanationDescription: `Longest Common Subsequence length is ${dp[m][n]}.`,
    explanationReason: "DP matrix evaluation finished.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
