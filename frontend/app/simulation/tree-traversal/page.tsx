"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { TreeVisualizer } from "@/components/simulation/TreeVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateTreeTraversalSteps } from "@/utils/algorithms/tree/steps";
import { TreeNode, TraversalType } from "@/utils/algorithms/tree/types";
import { progressService } from "@/services/progressService";

const SAMPLE_TREE: TreeNode = {
  id: "node-50",
  value: 50,
  left: {
    id: "node-30",
    value: 30,
    left: { id: "node-20", value: 20 },
    right: { id: "node-40", value: 40 },
  },
  right: {
    id: "node-70",
    value: 70,
    left: { id: "node-60", value: 60 },
    right: { id: "node-80", value: 80 },
  },
};

export default function TreeTraversalPage() {
  const [traversalMode, setTraversalMode] = useState<TraversalType>("inorder");
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateTreeTraversalSteps(SAMPLE_TREE, traversalMode);
    setSteps(generatedSteps);
  }, [traversalMode, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("tree-traversal", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const traversalOrder = (currentStep?.distances?.traversalOrder as number[]) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Binary Tree Traversals" algorithmId="tree-traversal" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Mode Switcher */}
            <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex items-center justify-center gap-2">
              {(["inorder", "preorder", "postorder", "levelorder"] as TraversalType[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTraversalMode(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    traversalMode === mode
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="h-[480px] w-full">
              <TreeVisualizer
                root={SAMPLE_TREE}
                highlightedNodeId={currentStep?.highlightedNodeId}
                visitedNodeIds={currentStep?.visitedNodes || []}
                traversalOrder={traversalOrder}
              />
            </div>

            <SimulationControls />
          </div>

          <div className="lg:col-span-3 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            <ExplanationPanel step={currentStep} />
            <PseudocodePanel activeLine={currentStep?.highlightedPseudocodeLine} />
          </div>
        </div>
      </main>
    </div>
  );
}
