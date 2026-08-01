/**
 * Sliding Window Algorithms Type Definitions
 */

export interface SlidingWindowState {
  left: number;
  right: number;
  currentSum?: number;
  maxSum?: number;
  currentLength?: number;
  maxLength?: number;
  windowElements?: number[];
  charSet?: string[];
}
