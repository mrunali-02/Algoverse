"use client";

import { motion } from "framer-motion";
import { GitMerge } from "lucide-react";

interface DSUVisualizerProps {
  parent: number[];
  rank: number[];
  activeElement?: number;
  rootU?: number;
  rootV?: number;
}

export function DSUVisualizer({
  parent = [],
  rank = [],
  activeElement,
  rootU,
  rootV,
}: DSUVisualizerProps) {
  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <GitMerge className="w-4 h-4" />
          <span>Disjoint Set Union (DSU) Pointer Array</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {rootU !== undefined && (
            <span className="text-emerald-400">
              Root U: <strong className="text-white font-bold">Node {rootU}</strong>
            </span>
          )}
          {rootV !== undefined && (
            <span className="text-amber-400">
              Root V: <strong className="text-white font-bold">Node {rootV}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Array Elements Cards Render */}
      <div className="flex items-center justify-center gap-3 md:gap-4 my-auto py-12 flex-wrap max-w-4xl mx-auto">
        {parent.map((pVal, idx) => {
          const isRoot = pVal === idx;
          const isActive = idx === activeElement;
          const isRootU = idx === rootU;
          const isRootV = idx === rootV;

          let cardStyle = "bg-slate-900 border-slate-800 text-slate-300";
          let scale = 1;

          if (isRootU || isRootV) {
            cardStyle = "bg-indigo-600 border-indigo-400 text-white font-bold shadow-xl shadow-indigo-500/40 ring-4 ring-indigo-400/30";
            scale = 1.15;
          } else if (isActive) {
            cardStyle = "bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/40";
            scale = 1.1;
          } else if (isRoot) {
            cardStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200";
          }

          return (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale }}
              className="relative flex flex-col items-center group"
            >
              {/* Root Indicator Badge */}
              <div className="absolute -top-7 flex items-center gap-1 text-[10px] font-bold font-mono">
                {isRoot && <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white">ROOT</span>}
              </div>

              {/* Element Card */}
              <div
                className={`w-16 h-20 md:w-20 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-between py-2 font-mono transition-all duration-300 ${cardStyle}`}
              >
                <span className="text-[10px] text-slate-400">ID: {idx}</span>
                <span className="text-lg md:text-xl font-bold">➔ {pVal}</span>
                <span className="text-[10px] text-indigo-300 bg-indigo-950/80 px-1.5 py-0.5 rounded">
                  r:{rank[idx]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Parent pointer ➔ i shows root representative. Rank r: height bound.
      </div>
    </div>
  );
}
