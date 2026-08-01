/**
 * Graph Algorithms Type Definitions
 */

export interface GraphNodeState {
  id: string;
  label: string;
  isVisited?: boolean;
  distance?: number | '∞';
}

export interface GraphEdgeState {
  id: string;
  source: string;
  target: string;
  weight: number;
  isMST?: boolean;
}
