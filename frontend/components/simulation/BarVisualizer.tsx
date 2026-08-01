"use client";

import { motion } from "framer-motion";
import { BarChart2, Repeat, CheckCircle } from "lucide-react";

interface BarVisualizerProps {
  array: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  pivotIndex?: number;
  sortedIndices?: number[];
  partitionRange?: [number, number];
  comparisonCount?: number;
  swapCount?: number;
}

export function BarVisualizer({
  array,
  comparingIndices = [],
  swappingIndices = [],
  pivotIndex,
  sortedIndices = [],
  partitionRange,
  comparisonCount = 0,
  swapCount = 0,
}: BarVisualizerProps) {
  const maxVal = Math.max(...array, 100);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Top Bar Metrics */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400">Comparisons:</span>
            <strong className="text-indigo-300 font-bold">{comparisonCount}</strong>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <Repeat className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Swaps/Shifts:</span>
            <strong className="text-emerald-300 font-bold">{swapCount}</strong>
          </div>
        </div>

        {/* Bar State Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Comparing</span>
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>Swapping</span>
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span>Pivot</span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Sorted</span>
          </span>
        </div>
      </div>

      {/* Vertical Bar Chart Renderer */}
      <div className="flex items-end justify-center gap-2.5 md:gap-4 my-auto h-72 py-4 px-4 max-w-4xl mx-auto w-full">
        {array.map((val, idx) => {
          const heightPercent = Math.max(12, Math.round((val / maxVal) * 100));
          const isComparing = comparingIndices.includes(idx);
          const isSwapping = swappingIndices.includes(idx);
          const isPivot = idx === pivotIndex;
          const isSorted = sortedIndices.includes(idx);
          const isInRange =
            partitionRange && idx >= partitionRange[0] && idx <= partitionRange[1];

          let barBg = "bg-gradient-to-t from-slate-800 to-indigo-950 border-slate-700/80";
          let textColor = "text-slate-300";

          if (isSwapping) {
            barBg = "bg-gradient-to-t from-rose-600 to-pink-500 border-rose-400 shadow-lg shadow-rose-500/40";
            textColor = "text-white font-bold";
          } else if (isComparing) {
            barBg = "bg-gradient-to-t from-amber-600 to-yellow-400 border-amber-300 shadow-lg shadow-amber-500/30";
            textColor = "text-amber-100 font-bold";
          } else if (isPivot) {
            barBg = "bg-gradient-to-t from-indigo-600 to-purple-500 border-indigo-400 shadow-lg shadow-indigo-500/40 ring-2 ring-indigo-400/50";
            textColor = "text-white font-bold";
          } else if (isSorted) {
            barBg = "bg-gradient-to-t from-emerald-700 to-teal-500 border-emerald-400 shadow-md shadow-emerald-500/30";
            textColor = "text-emerald-100 font-semibold";
          } else if (isInRange) {
            barBg = "bg-gradient-to-t from-slate-800 to-slate-700 border-indigo-500/40";
          }

          return (
            <motion.div
              key={`${idx}-${val}`}
              layout
              initial={{ height: "0%" }}
              animate={{ height: `${heightPercent}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex-1 max-w-[48px] relative flex flex-col items-center justify-between rounded-xl border-2 transition-all duration-300 group"
              style={{ minHeight: "40px" }}
            >
              <div className={`w-full h-full rounded-lg ${barBg} flex flex-col items-center justify-between py-2`}>
                {/* Value Label Top */}
                <span className={`text-xs md:text-sm font-mono ${textColor}`}>{val}</span>

                {/* Index Label Bottom */}
                <span className="text-[10px] font-mono text-slate-400 opacity-60">[{idx}]</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Bar height represents numerical element magnitude. Colors track active operations in real-time.
      </div>
    </div>
  );
}
