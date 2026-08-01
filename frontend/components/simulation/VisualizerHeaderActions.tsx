"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bookmark, BookmarkCheck, CheckCircle2, Save } from "lucide-react";
import { progressService } from "@/services/progressService";
import { activityTracker } from "@/services/activityTracker";
import { ALGORITHMS } from "@/constants";
import { THEORY_REGISTRY } from "@/constants/theoryRegistry";
import { SaveGraphModal } from "@/components/graph/SaveGraphModal";

interface VisualizerHeaderActionsProps {
  algorithmTitle: string;
  algorithmId: string;
}

const GRAPH_ALGORITHMS = ["dijkstra", "bfs", "dfs", "prim", "kruskal", "bellman-ford", "topological-sort"];

export function VisualizerHeaderActions({ algorithmTitle, algorithmId }: VisualizerHeaderActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const pathname = usePathname();

  const isGraphAlgo = GRAPH_ALGORITHMS.includes(algorithmId);

  useEffect(() => {
    // Check initial bookmark status
    setIsBookmarked(activityTracker.isBookmarked(algorithmId));

    // Find algorithm metadata
    const algoMeta = ALGORITHMS.find((a) => a.id === algorithmId) || ALGORITHMS[0];

    // Track module view in real time
    activityTracker.trackModuleView(
      algorithmId,
      algorithmTitle,
      algoMeta.category,
      algoMeta.difficulty,
      algoMeta.description,
      pathname || algoMeta.path
    );
  }, [algorithmId, algorithmTitle, pathname]);

  const handleBookmarkToggle = async () => {
    const algoMeta = ALGORITHMS.find((a) => a.id === algorithmId) || ALGORITHMS[0];
    const theoryMeta = (THEORY_REGISTRY as any)[algorithmId];

    const nextState = activityTracker.toggleBookmark({
      id: algorithmId,
      title: algorithmTitle,
      category: algoMeta.category,
      complexity: theoryMeta?.timeComplexity || "O(1)",
      link: pathname || algoMeta.path,
    });

    setIsBookmarked(nextState);
    await progressService.toggleBookmark(algorithmId, nextState);
  };

  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-100">{algorithmTitle} Visualizer</h1>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Interactive Simulation Engine</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleBookmarkToggle}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
            isBookmarked
              ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm"
              : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
          }`}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className="w-4 h-4 text-indigo-400" />
              <span>Bookmarked</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 text-slate-400" />
              <span>Bookmark Topic</span>
            </>
          )}
        </button>

        {isGraphAlgo && (
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>Save Graph Topology</span>
          </button>
        )}
      </div>

      {isGraphAlgo && (
        <SaveGraphModal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} />
      )}
    </div>
  );
}
