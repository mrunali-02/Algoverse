"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface KMPVisualizerProps {
  text: string;
  pattern: string;
  lps: number[];
  textIndex?: number;
  patternIndex?: number;
  matchIndices?: number[];
  isCharMatch?: boolean;
}

export function KMPVisualizer({
  text = "",
  pattern = "",
  lps = [],
  textIndex = 0,
  patternIndex = 0,
  matchIndices = [],
  isCharMatch,
}: KMPVisualizerProps) {
  const textChars = text.split("");
  const patternChars = pattern.split("");

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <FileText className="w-4 h-4" />
          <span>KMP String Matcher: i={textIndex}, j={patternIndex}</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-emerald-400 font-bold">
            Matches Found: {matchIndices.length}
          </span>
        </div>
      </div>

      {/* Main Text & Pattern Render */}
      <div className="my-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Text Cards Row */}
        <div>
          <div className="text-[11px] font-mono text-slate-400 mb-1">Text String (i):</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {textChars.map((ch, idx) => {
              const isCurrent = idx === textIndex;
              const isMatchedStart = matchIndices.some((mIdx) => idx >= mIdx && idx < mIdx + pattern.length);

              let bgStyle = "bg-slate-900 border-slate-800 text-slate-300";
              let scale = 1;

              if (isCurrent) {
                bgStyle = isCharMatch
                  ? "bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-400/30"
                  : "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/40 ring-4 ring-rose-400/30";
                scale = 1.2;
              } else if (isMatchedStart) {
                bgStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
              }

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="h-4">
                    {isCurrent && <span className="text-[10px] font-bold font-mono text-amber-400">i</span>}
                  </div>
                  <motion.div
                    layout
                    initial={{ scale: 0.9 }}
                    animate={{ scale }}
                    className={`w-9 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${bgStyle}`}
                  >
                    {ch}
                  </motion.div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pattern Cards Row */}
        <div>
          <div className="text-[11px] font-mono text-slate-400 mb-1">Pattern String (j):</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {patternChars.map((ch, idx) => {
              const isCurrent = idx === patternIndex;

              let bgStyle = "bg-slate-900 border-slate-800 text-slate-300";
              let scale = 1;

              if (isCurrent) {
                bgStyle = "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/40 ring-4 ring-indigo-400/30";
                scale = 1.2;
              }

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="h-4">
                    {isCurrent && <span className="text-[10px] font-bold font-mono text-indigo-300">j</span>}
                  </div>
                  <motion.div
                    layout
                    initial={{ scale: 0.9 }}
                    animate={{ scale }}
                    className={`w-9 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${bgStyle}`}
                  >
                    {ch}
                  </motion.div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LPS Table Display (Bottom) */}
      <div className="pt-2 border-t border-slate-800/80 z-10">
        <div className="text-[11px] font-mono text-slate-400 mb-1">LPS Table (Longest Prefix Suffix):</div>
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {lps.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-indigo-300">
                {val}
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-0.5">[{idx}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
