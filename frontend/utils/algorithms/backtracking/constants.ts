/**
 * Backtracking Algorithms Constants & Theory Definitions
 */

export const BACKTRACKING_ALGORITHMS_THEORY = {
  nQueens: {
    title: "N-Queens Problem",
    description: "Places N non-attacking queens on an N×N chessboard such that no two queens share the same row, column, or diagonal.",
    complexities: { best: "O(N!)", average: "O(N!)", worst: "O(N!)", space: "O(N)" },
    pseudocode: [
      { line: 1, text: "function solveNQueens(board, row):" },
      { line: 2, text: "  if row == N: return true // All queens placed" },
      { line: 3, text: "  for col from 0 to N-1:" },
      { line: 4, text: "    if isSafe(board, row, col):" },
      { line: 5, text: "      place queen at (row, col)" },
      { line: 6, text: "      if solveNQueens(board, row + 1): return true" },
      { line: 7, text: "      remove queen at (row, col) // Backtrack!" },
      { line: 8, text: "  return false" },
    ]
  },

  sudoku: {
    title: "Sudoku Solver",
    description: "Fills a 9x9 grid with digits 1-9 so that each column, row, and 3x3 sub-grid contains all digits without repetition.",
    complexities: { best: "O(9^(N*N))", average: "O(9^(N*N))", worst: "O(9^(N*N))", space: "O(N*N)" },
    pseudocode: [
      { line: 1, text: "function solveSudoku(board):" },
      { line: 2, text: "  find empty cell (r, c)" },
      { line: 3, text: "  for num from 1 to 9:" },
      { line: 4, text: "    if isValid(board, r, c, num):" },
      { line: 5, text: "      board[r][c] = num" },
      { line: 6, text: "      if solveSudoku(board): return true" },
      { line: 7, text: "      board[r][c] = 0 // Backtrack!" },
    ]
  },

  mazeSolver: {
    title: "Maze Solver (Pathfinding)",
    description: "Finds a path from start cell to target cell in a 2D grid maze using recursive backtracking.",
    complexities: { best: "O(2^(R*C))", average: "O(2^(R*C))", worst: "O(2^(R*C))", space: "O(R*C)" },
    pseudocode: [
      { line: 1, text: "function solveMaze(r, c):" },
      { line: 2, text: "  if destination reached: return true" },
      { line: 3, text: "  if isValid(r, c): mark visited" },
      { line: 4, text: "  if solveMaze(down) or solveMaze(right): return true" },
      { line: 5, text: "  unmark visited // Backtrack!" },
    ]
  }
};
