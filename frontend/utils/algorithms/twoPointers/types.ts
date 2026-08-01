/**
 * Two Pointers Algorithms Type Definitions
 */

export interface TwoPointersState {
  left: number;
  right: number;
  currentSum?: number;
  targetSum?: number;
  currentArea?: number;
  maxArea?: number;
  foundMatch?: boolean;
}
