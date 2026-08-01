"use client";

import { useGraphStore } from "@/store/useGraphStore";
import { Plus, Trash2, ArrowRightLeft, RotateCcw, LayoutTemplate } from "lucide-react";

export function GraphToolbar() {
  const {
    addNode,
    deleteSelected,
    clearGraph,
    toggleDirected,
    isDirected,
    loadPresetGraph,
    selectedNodeId,
    selectedEdgeId,
  } = useGraphStore();

  const hasSelection = Boolean(selectedNodeId || selectedEdgeId);

  return (
    <div className="absolute top-4 left-4 z-10 glass-panel p-2 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-2 flex-wrap">
      <button
        onClick={() => addNode()}
        className="px-3 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Node</span>
      </button>

      <button
        onClick={deleteSelected}
        disabled={!hasSelection}
        className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
          hasSelection
            ? "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
            : "bg-slate-800/60 text-slate-500 cursor-not-allowed"
        }`}
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete Selected</span>
      </button>

      <div className="w-px h-5 bg-slate-700/60 mx-1" />

      <button
        onClick={toggleDirected}
        className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all border ${
          isDirected
            ? "bg-indigo-500/20 border-indigo-500 text-indigo-300"
            : "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white"
        }`}
      >
        <ArrowRightLeft className="w-3.5 h-3.5" />
        <span>{isDirected ? "Directed" : "Undirected"}</span>
      </button>

      <div className="w-px h-5 bg-slate-700/60 mx-1" />

      {/* Preset Selector */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => loadPresetGraph("default")}
          className="px-2.5 py-2 text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center gap-1 border border-slate-700/60 transition-colors"
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
          <span>Preset Dijkstra</span>
        </button>

        <button
          onClick={() => loadPresetGraph("star")}
          className="px-2.5 py-2 text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700/60 transition-colors"
        >
          <span>Star Preset</span>
        </button>
      </div>

      <div className="w-px h-5 bg-slate-700/60 mx-1" />

      <button
        onClick={clearGraph}
        className="px-2.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>
    </div>
  );
}
