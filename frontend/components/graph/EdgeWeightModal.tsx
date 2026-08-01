"use client";

import { useState, useEffect } from "react";
import { useGraphStore } from "@/store/useGraphStore";
import { Edit3, Check, X } from "lucide-react";

export function EdgeWeightModal() {
  const { selectedEdgeId, edges, updateEdgeWeight, selectEdge } = useGraphStore();
  const [weight, setWeight] = useState<number>(1);

  const selectedEdge = edges.find((e) => e.id === selectedEdgeId);

  useEffect(() => {
    if (selectedEdge) {
      setWeight((selectedEdge.data?.weight as number) || 1);
    }
  }, [selectedEdge]);

  if (!selectedEdge) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEdgeId && weight > 0) {
      updateEdgeWeight(selectedEdgeId, weight);
      selectEdge(null);
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 glass-panel p-4 rounded-2xl border border-indigo-500/30 shadow-2xl bg-slate-900/90 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <Edit3 className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-200">
            Edit Edge Weight ({selectedEdge.source} ➔ {selectedEdge.target})
          </h4>
          <p className="text-[11px] text-slate-400">Set non-negative edge distance weight</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={999}
          value={weight}
          onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 font-semibold text-sm focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => selectEdge(null)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
