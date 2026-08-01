/**
 * Heap & Priority Queue Algorithms Type Definitions
 */

export interface HeapStateExtra {
  heapArray: number[];
  comparingIndices?: [number, number];
  swappingIndices?: [number, number];
  extractedValue?: number;
  sortedIndices?: number[];
  heapType?: 'min' | 'max';
}
