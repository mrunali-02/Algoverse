"use client";

import { useState } from "react";
import { useGraphStore } from "@/store/useGraphStore";
import { progressService } from "@/services/progressService";
import { Save, Check, X, FolderPlus } from "lucide-react";

interface SaveGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveGraphModal({ isOpen, onClose }: SaveGraphModalProps) {
  const { nodes, edges, isDirected } = useGraphStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    const graphData = {
      nodes: nodes.map((n) => ({ id: n.id, label: n.data?.label as string, x: n.position.x, y: n.position.y })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        weight: (e.data?.weight as number) || 1,
        isDirected,
      })),
      isDirected,
    };

    await progressService.saveGraph(title, graphData, isDirected, description);
    setIsSaving(false);
    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
      setTitle("");
      setDescription("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-indigo-500/30 shadow-2xl bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <FolderPlus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Save Custom Graph</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-100">Graph Saved Successfully!</p>
            <p className="text-xs text-slate-400">Available under saved graphs in dashboard.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Graph Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 6-Node Benchmark Network"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Notes on shortest path weights or graph topology..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || !title.trim()}
                className="px-5 py-2.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save to Profile"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
