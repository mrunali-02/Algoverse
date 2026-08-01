/**
 * Tree Algorithms Type Definitions
 */

export interface TreeNode {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
  id: string;
  x?: number;
  y?: number;
}

export type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'levelorder';

export interface TreeStateExtra {
  activeNodeValue?: number;
  traversalOrder?: number[];
  searchTarget?: number;
  insertedValue?: number;
  deletedValue?: number;
}
