"use client";

import { motion } from "framer-motion";
import { Grid } from "lucide-react";

interface DPTableVisualizerProps {
  grid: number[][];
  rowLabels: string[];
  colLabels: string[];
  activeCell?: [number, number];
  dependencyCells?: Array<[number, number]>;
}

export function DPTableVisualizer({
  grid,
  rowLabels,
  colLabels,
  activeCell,
  dependencyCells = [],
}: DPTableVisualizerProps) {
  if (!grid || !grid.length) return null;

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Grid className="w-4 h-4" />
          <span>Dynamic Programming Tabulation Grid</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Active Cell</span>
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span>Dependency Sub-problem</span>
          </span>
        </div>
      </div>

      {/* Grid Table */}
      <div className="overflow-auto my-auto max-h-[380px] max-w-4xl mx-auto w-full">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs font-mono text-slate-500 border border-slate-800 bg-slate-900/80">
                Item \ Cap
              </th>
              {colLabels.map((col, idx) => (
                <th
                  key={idx}
                  className="p-2 text-xs font-mono font-bold text-slate-300 border border-slate-800 bg-slate-900/80"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, rIdx) => (
              <tr key={rIdx}>
                {/* Row Header */}
                <td className="p-2 text-xs font-mono font-bold text-indigo-300 border border-slate-800 bg-slate-900/60 whitespace-nowrap">
                  {rowLabels[rIdx] || `R${rIdx}`}
                </td>

                {/* Cells */}
                {row.map((val, cIdx) => {
                  const isActive =
                    activeCell && activeCell[0] === rIdx && activeCell[1] === cIdx;
                  const isDep = dependencyCells.some(
                    (cell) => cell[0] === rIdx && cell[1] === cIdx
                  );

                  let cellBg = "bg-slate-900/60 border-slate-800 text-slate-300";

                  if (isActive) {
                    cellBg = "bg-amber-500 border-amber-300 text-slate-950 font-bold shadow-lg shadow-amber-500/40 ring-4 ring-amber-400/30 scale-105 z-10";
                  } else if (isDep) {
                    cellBg = "bg-indigo-600/30 border-indigo-400 text-indigo-200 font-bold shadow-md shadow-indigo-500/20";
                  }

                  return (
                    <td key={cIdx} className="p-1 border border-slate-800/80">
                      <motion.div
                        layout
                        initial={{ scale: 0.9 }}
                        animate={{ scale: isActive ? 1.1 : 1 }}
                        className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all mx-auto ${cellBg}`}
                      >
                        {val}
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Grid displays optimal sub-problem solutions evaluated step-by-step.
      </div>
    </div>
  );
}
