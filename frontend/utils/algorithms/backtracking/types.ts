/**
 * Backtracking Algorithms Type Definitions
 */

export interface ChessBoardState {
  grid: number[][];
  size: number;
  activeRow?: number;
  activeCol?: number;
  isValidPlacement?: boolean;
  isBacktracking?: boolean;
}

export interface SudokuState {
  board: number[][];
  activeRow?: number;
  activeCol?: number;
  attemptVal?: number;
  isBacktracking?: boolean;
}

export interface MazeCell {
  row: number;
  col: number;
  isWall: boolean;
  isPath?: boolean;
  isVisited?: boolean;
}
