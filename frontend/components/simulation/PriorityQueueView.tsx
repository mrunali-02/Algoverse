"use client";

import { Layers } from "lucide-react";

interface PriorityQueueViewProps {
  queue?: Array<{ node: string; distance: number }>;
}

export function PriorityQueueView({ queue = [] }: PriorityQueueViewProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-slate-800">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h4 className="font-sans font-bold text-xs text-slate-200">Min-Priority Queue (PQ)</h4>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">{queue.length} elements</span>
      </div>

      {queue.length === 0 ? (
        <p className="text-xs text-slate-500 py-3 text-center">Priority Queue is Empty (Finished)</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {queue.map((item, idx) => (
            <div
              key={`${item.node}-${idx}`}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                idx === 0
                  ? "bg-purple-600/20 border-purple-500 text-purple-200 font-bold scale-105 shadow-md shadow-purple-500/20"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              <span className="text-xs font-mono">{item.node}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {item.distance}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
