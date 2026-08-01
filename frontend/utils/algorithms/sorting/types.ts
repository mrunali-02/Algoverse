/**
 * Sorting Algorithms Type Definitions
 */

export interface SortElement {
  value: number;
  id: string;
}

export interface SortingStateExtra {
  comparingIndices?: number[];
  swappingIndices?: number[];
  pivotIndex?: number;
  sortedIndices?: number[];
  partitionRange?: [number, number];
  comparisonCount?: number;
  swapCount?: number;
}
