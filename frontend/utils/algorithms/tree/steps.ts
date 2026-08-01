import { SimulationStep } from '@/types';
import { TreeNode, TraversalType } from './types';

export function generateTreeTraversalSteps(
  root: TreeNode | null,
  type: TraversalType
): SimulationStep[] {
  if (!root) return [];

  const steps: SimulationStep[] = [];
  let stepCount = 1;
  const traversalOrder: number[] = [];

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    visitedNodes: [],
    distances: { mode: type, traversalOrder: [] },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `${type.toUpperCase()} Traversal Initialized`,
    explanationDescription: `Starting ${type} traversal from root node (${root.value}).`,
    explanationReason: "Traversing binary tree according to structural recursion order.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
    highlightedNodeId: `node-${root.value}`,
  });

  if (type === 'inorder') {
    function inorder(node: TreeNode | null) {
      if (!node) return;
      inorder(node.left || null);
      traversalOrder.push(node.value);
      steps.push({
        stepNumber: stepCount++,
        action: 'SELECT_NODE',
        highlightedNodeId: `node-${node.value}`,
        visitedNodes: traversalOrder.map((v) => `node-${v}`),
        distances: { mode: type, traversalOrder: [...traversalOrder] },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Visited Node ${node.value} (Inorder)`,
        explanationDescription: `Inorder visits Left child ➔ Current Root (${node.value}) ➔ Right child. Current order: [${traversalOrder.join(', ')}].`,
        explanationReason: "Inorder traversal produces sorted order for BSTs.",
        highlightedPseudocodeLine: 5,
        animationType: 'bounce',
      });
      inorder(node.right || null);
    }
    inorder(root);
  } else if (type === 'preorder') {
    function preorder(node: TreeNode | null) {
      if (!node) return;
      traversalOrder.push(node.value);
      steps.push({
        stepNumber: stepCount++,
        action: 'SELECT_NODE',
        highlightedNodeId: `node-${node.value}`,
        visitedNodes: traversalOrder.map((v) => `node-${v}`),
        distances: { mode: type, traversalOrder: [...traversalOrder] },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Visited Node ${node.value} (Preorder)`,
        explanationDescription: `Preorder visits Current Root (${node.value}) ➔ Left child ➔ Right child. Current order: [${traversalOrder.join(', ')}].`,
        explanationReason: "Preorder processes root before subtrees.",
        highlightedPseudocodeLine: 3,
        animationType: 'bounce',
      });
      preorder(node.left || null);
      preorder(node.right || null);
    }
    preorder(root);
  } else if (type === 'postorder') {
    function postorder(node: TreeNode | null) {
      if (!node) return;
      postorder(node.left || null);
      postorder(node.right || null);
      traversalOrder.push(node.value);
      steps.push({
        stepNumber: stepCount++,
        action: 'SELECT_NODE',
        highlightedNodeId: `node-${node.value}`,
        visitedNodes: traversalOrder.map((v) => `node-${v}`),
        distances: { mode: type, traversalOrder: [...traversalOrder] },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Visited Node ${node.value} (Postorder)`,
        explanationDescription: `Postorder visits Left child ➔ Right child ➔ Current Root (${node.value}). Current order: [${traversalOrder.join(', ')}].`,
        explanationReason: "Postorder processes subtrees before root.",
        highlightedPseudocodeLine: 7,
        animationType: 'bounce',
      });
    }
    postorder(root);
  } else if (type === 'levelorder') {
    const queue: TreeNode[] = [root];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      traversalOrder.push(curr.value);
      steps.push({
        stepNumber: stepCount++,
        action: 'SELECT_NODE',
        highlightedNodeId: `node-${curr.value}`,
        visitedNodes: traversalOrder.map((v) => `node-${v}`),
        distances: { mode: type, traversalOrder: [...traversalOrder] },
        previousNodes: {},
        priorityQueueState: [],
        explanationTitle: `Visited Node ${curr.value} (Level Order)`,
        explanationDescription: `Level-order visited node ${curr.value}. Current order: [${traversalOrder.join(', ')}].`,
        explanationReason: "Breadth-First level order traversal using FIFO Queue.",
        highlightedPseudocodeLine: 3,
        animationType: 'glow',
      });
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: traversalOrder.map((v) => `node-${v}`),
    distances: { mode: type, traversalOrder: [...traversalOrder] },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: `${type.toUpperCase()} Traversal Complete`,
    explanationDescription: `All tree nodes visited: [${traversalOrder.join(', ')}].`,
    explanationReason: "Tree traversal completed.",
    highlightedPseudocodeLine: 1,
    animationType: 'glow',
  });

  return steps;
}

export function generateBSTSearchSteps(
  root: TreeNode | null,
  target: number
): SimulationStep[] {
  if (!root) return [];

  const steps: SimulationStep[] = [];
  let stepCount = 1;
  let curr: TreeNode | null = root;
  let found = false;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: `node-${root.value}`,
    visitedNodes: [],
    distances: { target },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "BST Search Initialized",
    explanationDescription: `Searching for target ${target} starting at root (${root.value}).`,
    explanationReason: "Exploiting BST ordering property: left < root < right.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  while (curr) {
    steps.push({
      stepNumber: stepCount++,
      action: curr.value === target ? 'PATH_FOUND' : 'EXAMINE_NEIGHBOR',
      highlightedNodeId: `node-${curr.value}`,
      visitedNodes: [],
      distances: { target, currValue: curr.value },
      previousNodes: {},
      priorityQueueState: [],
      explanationTitle: `Comparing Node ${curr.value} with Target ${target}`,
      explanationDescription: curr.value === target
        ? `Match found! Node ${curr.value} equals target ${target}.`
        : target < curr.value
        ? `${target} < ${curr.value}. Moving to LEFT subtree.`
        : `${target} > ${curr.value}. Moving to RIGHT subtree.`,
      explanationReason: curr.value === target ? "Target found." : "Navigating BST branch.",
      highlightedPseudocodeLine: curr.value === target ? 2 : target < curr.value ? 3 : 4,
      animationType: curr.value === target ? 'bounce' : 'glow',
    });

    if (curr.value === target) {
      found = true;
      break;
    } else if (target < curr.value) {
      curr = curr.left || null;
    } else {
      curr = curr.right || null;
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: { target, found },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: found ? "BST Search Successful" : "BST Search Failed",
    explanationDescription: found
      ? `Successfully located target ${target} in BST.`
      : `Target ${target} is not present in the tree.`,
    explanationReason: found ? "Return node." : "Return null.",
    highlightedPseudocodeLine: found ? 2 : 2,
    animationType: 'fade',
  });

  return steps;
}

export function generateBSTInsertSteps(
  root: TreeNode | null,
  val: number
): SimulationStep[] {
  if (!root) return [];

  const steps: SimulationStep[] = [];
  let stepCount = 1;
  let curr: TreeNode | null = root;

  steps.push({
    stepNumber: stepCount++,
    action: 'INITIALIZE',
    highlightedNodeId: `node-${root.value}`,
    visitedNodes: [],
    distances: { val },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "BST Insertion Initialized",
    explanationDescription: `Inserting new value ${val} starting at root (${root.value}).`,
    explanationReason: "Navigating to leaf position maintaining BST property.",
    highlightedPseudocodeLine: 1,
    animationType: 'pulse',
  });

  while (curr) {
    if (val < curr.value) {
      if (!curr.left) {
        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: `node-${curr.value}`,
          visitedNodes: [],
          distances: { val, parent: curr.value, pos: 'left' },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Inserted Node ${val} as LEFT Child of ${curr.value}`,
          explanationDescription: `${val} < ${curr.value} and left child is empty. Created new leaf node ${val}.`,
          explanationReason: "Leaf insertion complete.",
          highlightedPseudocodeLine: 3,
          animationType: 'bounce',
        });
        break;
      }
      curr = curr.left;
    } else {
      if (!curr.right) {
        steps.push({
          stepNumber: stepCount++,
          action: 'UPDATE_DISTANCE',
          highlightedNodeId: `node-${curr.value}`,
          visitedNodes: [],
          distances: { val, parent: curr.value, pos: 'right' },
          previousNodes: {},
          priorityQueueState: [],
          explanationTitle: `Inserted Node ${val} as RIGHT Child of ${curr.value}`,
          explanationDescription: `${val} > ${curr.value} and right child is empty. Created new leaf node ${val}.`,
          explanationReason: "Leaf insertion complete.",
          highlightedPseudocodeLine: 4,
          animationType: 'bounce',
        });
        break;
      }
      curr = curr.right;
    }
  }

  steps.push({
    stepNumber: stepCount++,
    action: 'FINISHED',
    visitedNodes: [],
    distances: { val },
    previousNodes: {},
    priorityQueueState: [],
    explanationTitle: "BST Insertion Completed",
    explanationDescription: `Successfully inserted ${val} into BST.`,
    explanationReason: "BST ordering maintained.",
    highlightedPseudocodeLine: 5,
    animationType: 'glow',
  });

  return steps;
}
