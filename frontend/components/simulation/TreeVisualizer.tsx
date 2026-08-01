"use client";

import { motion } from "framer-motion";
import { TreeNode } from "@/utils/algorithms/tree/types";
import { Network } from "lucide-react";

interface TreeVisualizerProps {
  root: TreeNode;
  highlightedNodeId?: string;
  visitedNodeIds?: string[];
  traversalOrder?: number[];
}

interface ProcessedNode {
  id: string;
  value: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

export function TreeVisualizer({
  root,
  highlightedNodeId,
  visitedNodeIds = [],
  traversalOrder = [],
}: TreeVisualizerProps) {
  // Convert tree hierarchy into 2D coordinates for rendering
  const nodesList: ProcessedNode[] = [];

  function layoutTree(
    node: TreeNode | null | undefined,
    depth: number = 0,
    leftBound: number = 50,
    rightBound: number = 750,
    parentX?: number,
    parentY?: number
  ) {
    if (!node) return;

    const x = (leftBound + rightBound) / 2;
    const y = 60 + depth * 80;

    nodesList.push({
      id: `node-${node.value}`,
      value: node.value,
      x,
      y,
      parentX,
      parentY,
    });

    if (node.left) {
      layoutTree(node.left, depth + 1, leftBound, x, x, y);
    }
    if (node.right) {
      layoutTree(node.right, depth + 1, x, rightBound, x, y);
    }
  }

  layoutTree(root);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Traversal Order Banner */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Network className="w-4 h-4" />
          <span>Active Traversal Order:</span>
          <strong className="text-white font-mono text-sm ml-1">
            [{traversalOrder.join(", ")}]
          </strong>
        </div>
      </div>

      {/* SVG Canvas for Tree Node Links */}
      <div className="relative w-full h-80 my-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodesList.map((n) => {
            if (n.parentX === undefined || n.parentY === undefined) return null;
            return (
              <line
                key={`link-${n.id}`}
                x1={n.parentX}
                y1={n.parentY}
                x2={n.x}
                y2={n.y}
                stroke="#334155"
                strokeWidth={2.5}
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Tree Nodes */}
        {nodesList.map((n) => {
          const isHighlighted = n.id === highlightedNodeId;
          const isVisited = visitedNodeIds.includes(n.id);

          let bgStyle = "bg-slate-900 border-slate-700 text-slate-200";
          let scale = 1;

          if (isHighlighted) {
            bgStyle = "bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/40 ring-4 ring-amber-400/30";
            scale = 1.2;
          } else if (isVisited) {
            bgStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20";
          }

          return (
            <motion.div
              key={n.id}
              initial={{ scale: 0 }}
              animate={{ scale }}
              transition={{ duration: 0.3 }}
              style={{ left: `${n.x}px`, top: `${n.y}px` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${bgStyle}`}
              >
                {n.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Binary Search Tree structure: Left child &lt; Root &lt; Right child.
      </div>
    </div>
  );
}
