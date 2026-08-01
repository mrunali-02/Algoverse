/**
 * Tree Algorithms Constants & Theory Definitions
 */

export const TREE_ALGORITHMS_THEORY = {
  treeTraversal: {
    title: "Binary Tree Traversals",
    description: "Systematic methods for visiting all nodes in a binary tree: Inorder (Left, Root, Right), Preorder (Root, Left, Right), Postorder (Left, Right, Root), and Level Order (Breadth-First).",
    complexities: { best: "O(N)", average: "O(N)", worst: "O(N)", space: "O(H)" },
    pseudocode: [
      { line: 1, text: "function traverse(node):" },
      { line: 2, text: "  if node is null: return" },
      { line: 3, text: "  visit(node) // Preorder" },
      { line: 4, text: "  traverse(node.left)" },
      { line: 5, text: "  visit(node) // Inorder" },
      { line: 6, text: "  traverse(node.right)" },
      { line: 7, text: "  visit(node) // Postorder" },
    ]
  },

  bstSearch: {
    title: "BST Search",
    description: "Searches for a target value in a Binary Search Tree by exploiting the ordering property: left child < root < right child.",
    complexities: { best: "O(1)", average: "O(log N)", worst: "O(N)", space: "O(H)" },
    pseudocode: [
      { line: 1, text: "function search(node, target):" },
      { line: 2, text: "  if node is null or node.val == target: return node" },
      { line: 3, text: "  if target < node.val: return search(node.left, target)" },
      { line: 4, text: "  else: return search(node.right, target)" },
    ]
  },

  bstInsert: {
    title: "BST Insertion",
    description: "Inserts a new value into a Binary Search Tree at the correct leaf position maintaining the BST property.",
    complexities: { best: "O(log N)", average: "O(log N)", worst: "O(N)", space: "O(H)" },
    pseudocode: [
      { line: 1, text: "function insert(node, val):" },
      { line: 2, text: "  if node is null: return new Node(val)" },
      { line: 3, text: "  if val < node.val: node.left = insert(node.left, val)" },
      { line: 4, text: "  else if val > node.val: node.right = insert(node.right, val)" },
      { line: 5, text: "  return node" },
    ]
  },

  bstDelete: {
    title: "BST Deletion",
    description: "Deletes a node from a BST handling 3 cases: node has 0 children, 1 child, or 2 children (replaced by in-order successor).",
    complexities: { best: "O(log N)", average: "O(log N)", worst: "O(N)", space: "O(H)" },
    pseudocode: [
      { line: 1, text: "function deleteNode(node, key):" },
      { line: 2, text: "  if key < node.val: node.left = deleteNode(node.left, key)" },
      { line: 3, text: "  else if key > node.val: node.right = deleteNode(node.right, key)" },
      { line: 4, text: "  else: // Node found" },
      { line: 5, text: "    if 0 or 1 child: return non-null child" },
      { line: 6, text: "    successor = min(node.right); node.val = successor.val" },
      { line: 7, text: "    node.right = deleteNode(node.right, successor.val)" },
    ]
  }
};
