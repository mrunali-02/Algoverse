/**
 * Dynamic Programming Algorithms Type Definitions
 */

export interface DPCellState {
  row: number;
  col: number;
  value: number;
  isCurrent?: boolean;
  isDependency?: boolean;
}

export interface DPTableState {
  grid: number[][];
  rowLabels: string[];
  colLabels: string[];
  activeCell?: [number, number];
  dependencyCells?: Array<[number, number]>;
}
