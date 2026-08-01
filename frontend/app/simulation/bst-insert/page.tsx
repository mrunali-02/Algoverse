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
import { generateBSTInsertSteps } from "@/utils/algorithms/tree/steps";
import { TreeNode } from "@/utils/algorithms/tree/types";
import { progressService } from "@/services/progressService";

const SAMPLE_TREE: TreeNode = {
  id: "node-50",
  value: 50,
  left: {
    id: "node-30",
    value: 30,
    left: { id: "node-20", value: 20 },
  },
  right: {
    id: "node-70",
    value: 70,
    right: { id: "node-80", value: 80 },
  },
};

export default function BSTInsertPage() {
  const [insertVal, setInsertVal] = useState<number>(40);
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateBSTInsertSteps(SAMPLE_TREE, insertVal);
    setSteps(generatedSteps);
  }, [insertVal, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("bst-insert", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="BST Insertion" algorithmId="bst-insert" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-semibold">Value to Insert:</span>
              <div className="flex items-center gap-2">
                {[15, 40, 65, 90].map((val) => (
                  <button
                    key={val}
                    onClick={() => setInsertVal(val)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      insertVal === val
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[480px] w-full">
              <TreeVisualizer
                root={SAMPLE_TREE}
                highlightedNodeId={currentStep?.highlightedNodeId}
                visitedNodeIds={currentStep?.visitedNodes || []}
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
