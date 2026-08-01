/**
 * Greedy Algorithms Type Definitions
 */

export interface Activity {
  id: string;
  name: string;
  start: number;
  finish: number;
  isSelected?: boolean;
  isRejected?: boolean;
}

export interface FractionalItem {
  id: string;
  name: string;
  weight: number;
  value: number;
  ratio: number;
  takenFraction?: number; // 0 to 1
}
