"use client";

import { motion } from "framer-motion";
import { MoveRight, Sparkles } from "lucide-react";

interface WindowVisualizerProps {
  array?: number[];
  str?: string;
  left?: number;
  right?: number;
  currentSum?: number;
  maxSum?: number;
  currentLength?: number;
  maxLength?: number;
}

export function WindowVisualizer({
  array,
  str,
  left = 0,
  right = 0,
  currentSum,
  maxSum,
  currentLength,
  maxLength,
}: WindowVisualizerProps) {
  const elements = array ? array.map((val) => val.toString()) : str ? str.split("") : [];

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Metrics Banner */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <MoveRight className="w-4 h-4" />
          <span>Active Window Range: <strong className="text-white font-mono text-sm ml-1">[{left} .. {right}]</strong></span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {currentSum !== undefined && (
            <span className="text-slate-300">
              Current Sum: <strong className="text-amber-400 font-bold">{currentSum}</strong>
            </span>
          )}
          {maxSum !== undefined && (
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Max Sum: {maxSum}</span>
            </span>
          )}
          {currentLength !== undefined && (
            <span className="text-slate-300">
              Length: <strong className="text-amber-400 font-bold">{currentLength}</strong>
            </span>
          )}
          {maxLength !== undefined && (
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Max Length: {maxLength}</span>
            </span>
          )}
        </div>
      </div>

      {/* Array / String Elements Render */}
      <div className="flex items-center justify-center gap-3 my-auto py-12 flex-wrap max-w-4xl mx-auto">
        {elements.map((char, idx) => {
          const inWindow = idx >= left && idx <= right;
          const isLeftBoundary = idx === left;
          const isRightBoundary = idx === right;

          let cardStyle = "bg-slate-900 border-slate-800 text-slate-400 opacity-50";
          let scale = 1;

          if (inWindow) {
            cardStyle = "bg-indigo-600/20 border-indigo-400 text-indigo-200 font-bold shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/40";
            scale = 1.05;
          }
          if (isLeftBoundary || isRightBoundary) {
            scale = 1.15;
          }

          return (
            <motion.div
              key={idx}
              layout
              initial={{ scale: 0.9 }}
              animate={{ scale }}
              className="relative flex flex-col items-center group"
            >
              {/* Boundary Badges */}
              <div className="absolute -top-7 flex items-center gap-1 text-[10px] font-bold font-mono">
                {isLeftBoundary && <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white">L</span>}
                {isRightBoundary && <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white">R</span>}
              </div>

              {/* Element Card */}
              <div
                className={`w-14 h-16 md:w-16 md:h-20 rounded-2xl border-2 flex items-center justify-center font-mono font-bold text-lg md:text-xl transition-all duration-300 ${cardStyle}`}
              >
                {char}
              </div>

              {/* Index Number */}
              <span className="mt-2 text-xs font-mono text-slate-500">[{idx}]</span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Sliding window boundaries [L..R] maintain contiguous subset operations.
      </div>
    </div>
  );
}
