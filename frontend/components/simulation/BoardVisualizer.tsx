"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

interface BoardVisualizerProps {
  grid: number[][];
  activeRow?: number;
  activeCol?: number;
  isValidPlacement?: boolean;
  isBacktracking?: boolean;
}

export function BoardVisualizer({
  grid,
  activeRow,
  activeCol,
  isValidPlacement,
  isBacktracking,
}: BoardVisualizerProps) {
  if (!grid || !grid.length) return null;
  const n = grid.length;

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4" />
          <span>Chessboard Backtracking State ({n}x{n})</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Queen Placed</span>
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>Conflict / Backtrack</span>
          </span>
        </div>
      </div>

      {/* Chessboard Grid Render */}
      <div className="my-auto max-w-md mx-auto w-full aspect-square p-2 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
        <div
          className="grid h-full w-full rounded-xl overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {grid.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              const isDarkSquare = (rIdx + cIdx) % 2 === 1;
              const hasQueen = cell === 1;
              const isActiveCell = activeRow === rIdx && activeCol === cIdx;

              let squareBg = isDarkSquare ? "bg-slate-800/80" : "bg-slate-700/40";

              if (isActiveCell) {
                squareBg = isValidPlacement
                  ? "bg-emerald-500/40 border-2 border-emerald-400 ring-2 ring-emerald-400/30"
                  : "bg-rose-500/40 border-2 border-rose-400 ring-2 ring-rose-400/30";
              } else if (isBacktracking && activeRow === rIdx && activeCol === cIdx) {
                squareBg = "bg-amber-500/40 border-2 border-amber-400";
              }

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`relative flex items-center justify-center border border-slate-900/40 transition-all ${squareBg}`}
                >
                  {hasQueen && (
                    <motion.div
                      layout
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-2xl md:text-3xl filter drop-shadow-md select-none"
                    >
                      👑
                    </motion.div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Backtracking explores valid choices and undoes conflicting queen placements.
      </div>
    </div>
  );
}
