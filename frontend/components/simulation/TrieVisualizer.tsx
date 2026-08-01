"use client";

import { motion } from "framer-motion";
import { TrieNode } from "@/utils/algorithms/trie/types";
import { Type } from "lucide-react";

interface TrieVisualizerProps {
  trie: TrieNode;
  highlightedNodeId?: string;
  visitedNodeIds?: string[];
  searchWord?: string;
}

interface ProcessedTrieNode {
  id: string;
  char: string;
  isEndOfWord: boolean;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

export function TrieVisualizer({
  trie,
  highlightedNodeId,
  visitedNodeIds = [],
  searchWord,
}: TrieVisualizerProps) {
  const nodeList: ProcessedTrieNode[] = [];

  function layoutTrie(
    node: TrieNode,
    depth: number = 0,
    leftBound: number = 50,
    rightBound: number = 750,
    parentX?: number,
    parentY?: number
  ) {
    const x = (leftBound + rightBound) / 2;
    const y = 50 + depth * 75;

    nodeList.push({
      id: node.id,
      char: node.char,
      isEndOfWord: node.isEndOfWord,
      x,
      y,
      parentX,
      parentY,
    });

    const childKeys = Object.keys(node.children);
    if (childKeys.length > 0) {
      const stepWidth = (rightBound - leftBound) / childKeys.length;
      childKeys.forEach((key, idx) => {
        const childLeft = leftBound + idx * stepWidth;
        const childRight = childLeft + stepWidth;
        layoutTrie(node.children[key], depth + 1, childLeft, childRight, x, y);
      });
    }
  }

  layoutTrie(trie);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Type className="w-4 h-4" />
          <span>Trie Multi-way Prefix Tree</span>
        </div>

        {searchWord && (
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/20">
            Target Prefix: <strong className="text-white">{searchWord}</strong>
          </span>
        )}
      </div>

      {/* SVG Canvas for Tree Node Links */}
      <div className="relative w-full h-80 my-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodeList.map((n) => {
            if (n.parentX === undefined || n.parentY === undefined) return null;
            return (
              <line
                key={`link-${n.id}`}
                x1={n.parentX}
                y1={n.parentY}
                x2={n.x}
                y2={n.y}
                stroke="#334155"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Trie Nodes */}
        {nodeList.map((n) => {
          const isHighlighted = n.id === highlightedNodeId;
          const isVisited = visitedNodeIds.includes(n.id);

          let nodeStyle = "bg-slate-900 border-slate-700 text-slate-300";
          let scale = 1;

          if (isHighlighted) {
            nodeStyle = "bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/40 ring-4 ring-amber-400/30";
            scale = 1.25;
          } else if (isVisited) {
            nodeStyle = "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/30";
            scale = 1.1;
          }

          return (
            <motion.div
              key={n.id}
              initial={{ scale: 0 }}
              animate={{ scale }}
              style={{ left: `${n.x}px`, top: `${n.y}px` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className={`relative w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs md:text-sm transition-all ${nodeStyle} ${
                  n.isEndOfWord ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950" : ""
                }`}
              >
                {n.char}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Green ring around node indicates End-of-Word flag (`isEndOfWord = true`).
      </div>
    </div>
  );
}
