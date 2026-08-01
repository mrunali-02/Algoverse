"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

interface QueueViewProps {
  queue?: string[];
}

export function QueueView({ queue = [] }: QueueViewProps) {
  return (
    <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
        <Layers className="w-4 h-4 text-indigo-400" />
        <span>BFS Queue (FIFO):</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {queue.length === 0 ? (
          <span className="text-xs text-slate-500 italic">Queue is empty</span>
        ) : (
          queue.map((item, idx) => (
            <motion.div
              key={`${idx}-${item}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 text-xs font-mono font-bold whitespace-nowrap"
            >
              {item}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
