/**
 * Union Find (DSU) Algorithms Type Definitions
 */

export interface DSUOp {
  type: 'find' | 'union';
  u: number;
  v?: number;
}

export interface DSUStateExtra {
  parent: number[];
  rank: number[];
  activeElement?: number;
  rootU?: number;
  rootV?: number;
  opDescription?: string;
}
