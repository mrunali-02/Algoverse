"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

interface HeapVisualizerProps {
  heapArray: number[];
  comparingIndices?: [number, number];
  swappingIndices?: [number, number];
  sortedIndices?: number[];
  heapType?: "min" | "max";
}

interface TreeElement {
  val: number;
  idx: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

export function HeapVisualizer({
  heapArray = [],
  comparingIndices,
  swappingIndices,
  sortedIndices = [],
  heapType = "min",
}: HeapVisualizerProps) {
  // Convert 1D Heap Array into Complete Binary Tree Layout
  const treeList: TreeElement[] = [];

  function layoutHeapTree(
    idx: number,
    depth: number = 0,
    leftBound: number = 50,
    rightBound: number = 750,
    parentX?: number,
    parentY?: number
  ) {
    if (idx >= heapArray.length) return;

    const x = (leftBound + rightBound) / 2;
    const y = 50 + depth * 65;

    treeList.push({
      val: heapArray[idx],
      idx,
      x,
      y,
      parentX,
      parentY,
    });

    const leftChild = 2 * idx + 1;
    const rightChild = 2 * idx + 2;

    if (leftChild < heapArray.length) {
      layoutHeapTree(leftChild, depth + 1, leftBound, x, x, y);
    }
    if (rightChild < heapArray.length) {
      layoutHeapTree(rightChild, depth + 1, x, rightBound, x, y);
    }
  }

  layoutHeapTree(0);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Layers className="w-4 h-4" />
          <span>{heapType === "min" ? "Min Heap" : "Max Heap"} Dual-View Representation</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Comparing</span>
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>Swapping</span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Sorted</span>
          </span>
        </div>
      </div>

      {/* Binary Tree View (Top Half) */}
      <div className="relative w-full h-60 my-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {treeList.map((n) => {
            if (n.parentX === undefined || n.parentY === undefined) return null;
            return (
              <line
                key={`link-${n.idx}`}
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

        {treeList.map((n) => {
          const isComparing = comparingIndices?.includes(n.idx);
          const isSwapping = swappingIndices?.includes(n.idx);
          const isSorted = sortedIndices.includes(n.idx);

          let nodeBg = "bg-slate-900 border-slate-700 text-slate-200";
          let scale = 1;

          if (isSwapping) {
            nodeBg = "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/40 ring-4 ring-rose-400/30";
            scale = 1.25;
          } else if (isComparing) {
            nodeBg = "bg-amber-500 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/40 ring-4 ring-amber-400/30";
            scale = 1.2;
          } else if (isSorted) {
            nodeBg = "bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20";
          }

          return (
            <motion.div
              key={`tree-node-${n.idx}-${n.val}`}
              layout
              initial={{ scale: 0 }}
              animate={{ scale }}
              style={{ left: `${n.x}px`, top: `${n.y}px` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs md:text-sm transition-all ${nodeBg}`}
              >
                {n.val}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 1D Storage Array View (Bottom Half) */}
      <div className="pt-2 border-t border-slate-800/80 z-10">
        <div className="text-[11px] font-mono text-slate-400 mb-2">1D Storage Array Representation:</div>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {heapArray.map((val, idx) => {
            const isComparing = comparingIndices?.includes(idx);
            const isSwapping = swappingIndices?.includes(idx);
            const isSorted = sortedIndices.includes(idx);

            let cardBg = "bg-slate-900 border-slate-800 text-slate-300";
            if (isSwapping) cardBg = "bg-rose-600 border-rose-400 text-white font-bold";
            else if (isComparing) cardBg = "bg-amber-500 border-amber-300 text-slate-950 font-bold";
            else if (isSorted) cardBg = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";

            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-9 h-10 rounded-lg border flex items-center justify-center font-mono text-xs ${cardBg}`}>
                  {val}
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
