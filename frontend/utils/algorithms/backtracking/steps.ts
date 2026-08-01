import { SimulationStep } from '@/types';

export function generateNQueensSteps(n: number = 4): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const board: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  let stepCount = 1;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: {
      grid: board.map((row) => [...row]),
      n,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `N-Queens Initialized (${n}x${n} Board)`,
    explanationDescription: `Placing ${n} queens on an empty ${n}x${n} chessboard without conflict.`,
    explanationReason: "Backtracking trial-and-error state space tree search.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) return false;
    }
    return true;
  }

  function solve(row: number): boolean {
    if (row >= n) {
      steps.push({
        stepNumber: stepCount++,
        action: 'PATH_FOUND',
        visitedNodes: [],
        distances: {
          grid: board.map((r) => [...r]),
          n,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Valid Solution Found!`,
        explanationDescription: `All ${n} queens placed safely with zero attacking pairs.`,
        explanationReason: "All constraints satisfied.",
        highlightedPseudocodeLine: 2,
        animationType: 'bounce',
      });
      return true;
    }

    for (let col = 0; col < n; col++) {
      const safe = isSafe(row, col);

      steps.push({
        stepNumber: stepCount++,
        action: 'EXAMINE_NEIGHBOR',
        visitedNodes: [],
        distances: {
          grid: board.map((r) => [...r]),
          n,
          activeRow: row,
          activeCol: col,
          isValidPlacement: safe,
        },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Testing Queen at Row ${row}, Col ${col}`,
        explanationDescription: safe
          ? `Cell (${row}, ${col}) is SAFE. Placing queen.`
          : `Cell (${row}, ${col}) is IN CONFLICT with existing queens. Skipping column.`,
        explanationReason: "Constraint verification: row, col, and diagonal attacks.",
        highlightedPseudocodeLine: 4,
        animationType: safe ? 'bounce' : 'fade',
      });

      if (safe) {
        board[row][col] = 1;

        if (solve(row + 1)) return true;

        // Backtrack
        board[row][col] = 0;
        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          visitedNodes: [],
          distances: {
            grid: board.map((r) => [...r]),
            n,
            activeRow: row,
            activeCol: col,
            isBacktracking: true,
          },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Backtracking from Row ${row}, Col ${col}`,
          explanationDescription: `Dead end reached in deeper rows. Removed queen from (${row}, ${col}) to try next column.`,
          explanationReason: "Backtracking step: Undoing choice and restoring state.",
          highlightedPseudocodeLine: 7,
          animationType: 'pulse',
        });
      }
    }
    return false;
  }

  solve(0);

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: {
      grid: board.map((r) => [...r]),
      n,
    },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "N-Queens Backtracking Search Completed",
    explanationDescription: `State space tree search completed.`,
    explanationReason: "Finished backtracking exploration.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}
