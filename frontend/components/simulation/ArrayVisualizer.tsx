"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface ArrayVisualizerProps {
  array: number[];
  target: number;
  highlightedIndex?: number;
  lowIndex?: number;
  highIndex?: number;
  midIndex?: number;
  isFound?: boolean;
}

export function ArrayVisualizer({
  array,
  target,
  highlightedIndex,
  lowIndex,
  highIndex,
  midIndex,
  isFound,
}: ArrayVisualizerProps) {
  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Target Badge Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Search className="w-4 h-4" />
          <span>Searching for Target Value: <strong className="text-white font-mono text-sm ml-1">{target}</strong></span>
        </div>

        {/* Pointer Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          {lowIndex !== undefined && (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Low ({lowIndex})</span>
            </span>
          )}
          {midIndex !== undefined && (
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Mid ({midIndex})</span>
            </span>
          )}
          {highIndex !== undefined && (
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span>High ({highIndex})</span>
            </span>
          )}
        </div>
      </div>

      {/* Array Boxes Render */}
      <div className="flex items-center justify-center gap-3 md:gap-4 my-auto py-12 flex-wrap max-w-4xl mx-auto">
        {array.map((val, idx) => {
          const isHighlighted = idx === highlightedIndex;
          const isMid = idx === midIndex;
          const isLow = idx === lowIndex;
          const isHigh = idx === highIndex;
          const isMatch = isHighlighted && isFound;
          const isDiscarded =
            (lowIndex !== undefined && idx < lowIndex) ||
            (highIndex !== undefined && idx > highIndex);

          let boxStyle = "bg-slate-900 border-slate-800 text-slate-300";
          let scale = 1;

          if (isMatch) {
            boxStyle = "bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/40 ring-4 ring-emerald-400/30";
            scale = 1.15;
          } else if (isMid || isHighlighted) {
            boxStyle = "bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/40";
            scale = 1.1;
          } else if (isDiscarded) {
            boxStyle = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-40 scale-95";
          }

          return (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale }}
              transition={{ duration: 0.3 }}
              className="relative flex flex-col items-center group"
            >
              {/* Pointer Badges Above Box */}
              <div className="absolute -top-7 flex items-center gap-1 text-[10px] font-bold font-mono">
                {isLow && <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white">L</span>}
                {isMid && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">M</span>}
                {isHigh && <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white">H</span>}
              </div>

              {/* Box */}
              <div
                className={`w-14 h-16 md:w-16 md:h-20 rounded-2xl border-2 flex items-center justify-center font-mono font-bold text-lg md:text-xl transition-all duration-300 ${boxStyle}`}
              >
                {val}
              </div>

              {/* Index Number Below Box */}
              <span className="mt-2 text-xs font-mono text-slate-500">[{idx}]</span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Click items in practice playground to customize array values and target.
      </div>
    </div>
  );
}
