/**
 * Searching Algorithms Type Definitions
 */

export interface ArrayElement {
  value: number;
  index: number;
}

export interface SearchStateExtra {
  low?: number;
  high?: number;
  mid?: number;
  currentIndex?: number;
  target?: number;
  foundIndex?: number;
  discardedRange?: [number, number];
}
