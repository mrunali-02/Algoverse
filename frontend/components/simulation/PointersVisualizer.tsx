"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, Droplet } from "lucide-react";

interface PointersVisualizerProps {
  array?: number[];
  heights?: number[];
  left?: number;
  right?: number;
  currentSum?: number;
  targetSum?: number;
  currentArea?: number;
  maxArea?: number;
  foundMatch?: boolean;
}

export function PointersVisualizer({
  array,
  heights,
  left = 0,
  right = 0,
  currentSum,
  targetSum,
  currentArea,
  maxArea,
  foundMatch,
}: PointersVisualizerProps) {
  const isWaterMode = heights !== undefined;
  const list = array || heights || [];
  const maxVal = Math.max(...list, 10);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          {isWaterMode ? <Droplet className="w-4 h-4 text-cyan-400" /> : <ArrowLeftRight className="w-4 h-4 text-indigo-400" />}
          <span>Pointers: Left [{left}], Right [{right}]</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {currentSum !== undefined && (
            <span className="text-slate-300">
              Current Sum: <strong className={foundMatch ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>{currentSum}</strong> / Target: {targetSum}
            </span>
          )}
          {currentArea !== undefined && (
            <span className="text-cyan-300">
              Area: <strong className="text-white font-bold">{currentArea}</strong>
            </span>
          )}
          {maxArea !== undefined && (
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Max Area: {maxArea}
            </span>
          )}
        </div>
      </div>

      {/* Render Area / Heights */}
      {isWaterMode ? (
        <div className="flex items-end justify-center gap-3 my-auto h-64 py-4 max-w-4xl mx-auto w-full">
          {heights.map((h, idx) => {
            const heightPercent = Math.max(10, Math.round((h / maxVal) * 100));
            const isLeft = idx === left;
            const isRight = idx === right;
            const inContainer = idx >= left && idx <= right;

            let barBg = "bg-slate-800 border-slate-700 text-slate-400";
            if (isLeft || isRight) {
              barBg = "bg-cyan-500 border-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/40 ring-4 ring-cyan-400/30";
            } else if (inContainer) {
              barBg = "bg-cyan-950/40 border-cyan-900/50 text-cyan-200/60";
            }

            return (
              <div key={idx} className="flex-1 max-w-[48px] relative flex flex-col items-center justify-end h-full">
                <motion.div
                  layout
                  initial={{ height: "0%" }}
                  animate={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-xl border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${barBg}`}
                >
                  {h}
                </motion.div>
                <span className="mt-2 text-[10px] font-mono text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 my-auto py-12 flex-wrap max-w-4xl mx-auto">
          {array?.map((val, idx) => {
            const isLeft = idx === left;
            const isRight = idx === right;
            const isMatch = (isLeft || isRight) && foundMatch;

            let boxStyle = "bg-slate-900 border-slate-800 text-slate-300";
            let scale = 1;

            if (isMatch) {
              boxStyle = "bg-emerald-600 border-emerald-400 text-white shadow-xl shadow-emerald-500/40 ring-4 ring-emerald-400/30";
              scale = 1.15;
            } else if (isLeft) {
              boxStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/40";
              scale = 1.1;
            } else if (isRight) {
              boxStyle = "bg-rose-500/20 border-rose-400 text-rose-200 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/40";
              scale = 1.1;
            }

            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, scale }}
                className="relative flex flex-col items-center group"
              >
                <div className="absolute -top-7 flex items-center gap-1 text-[10px] font-bold font-mono">
                  {isLeft && <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white">Left</span>}
                  {isRight && <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white">Right</span>}
                </div>

                <div
                  className={`w-14 h-16 md:w-16 md:h-20 rounded-2xl border-2 flex items-center justify-center font-mono font-bold text-lg md:text-xl transition-all duration-300 ${boxStyle}`}
                >
                  {val}
                </div>

                <span className="mt-2 text-xs font-mono text-slate-500">[{idx}]</span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Pointers converge inward from boundaries towards optimal solution in O(N) time.
      </div>
    </div>
  );
}
