"use client";

import { motion } from "framer-motion";
import { Activity } from "@/utils/algorithms/greedy/types";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface IntervalVisualizerProps {
  activities: Activity[];
  selectedCount?: number;
  lastFinish?: number;
}

export function IntervalVisualizer({
  activities,
  selectedCount = 0,
  lastFinish,
}: IntervalVisualizerProps) {
  const maxTime = Math.max(...activities.map((a) => a.finish), 10);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Clock className="w-4 h-4" />
          <span>Timeline Activity Scheduler</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Selected ({selectedCount})</span>
          </span>
          {lastFinish !== undefined && (
            <span className="text-slate-400">
              Active Finish Line: <strong className="text-amber-400">{lastFinish}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Timeline Intervals Render */}
      <div className="space-y-3 my-auto py-4 max-w-4xl mx-auto w-full">
        {activities.map((act) => {
          const leftPercent = (act.start / maxTime) * 100;
          const widthPercent = ((act.finish - act.start) / maxTime) * 100;

          let barBg = "bg-slate-900 border-slate-800 text-slate-400";

          if (act.isSelected) {
            barBg = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-500/30";
          } else if (act.isRejected) {
            barBg = "bg-rose-950/40 border-rose-900/60 text-rose-400/60 opacity-40";
          }

          return (
            <div key={act.id} className="relative h-10 w-full bg-slate-900/40 rounded-xl border border-slate-800/60 flex items-center px-3">
              <span className="text-xs font-mono text-slate-400 w-24 shrink-0 font-semibold">{act.name}</span>

              {/* Time Bar */}
              <div className="relative flex-1 h-7">
                <motion.div
                  layout
                  initial={{ opacity: 0, width: "0%" }}
                  animate={{ opacity: 1, width: `${widthPercent}%` }}
                  style={{ left: `${leftPercent}%` }}
                  className={`absolute h-full rounded-lg border flex items-center justify-between px-2 text-xs font-mono transition-all ${barBg}`}
                >
                  <span>{act.start}</span>
                  <span className="font-bold">{act.name}</span>
                  <span>{act.finish}</span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Interval length corresponds to activity duration (Start ➔ Finish).
      </div>
    </div>
  );
}
