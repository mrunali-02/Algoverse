"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { GraphEditor } from "@/components/graph/GraphEditor";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { QueueView } from "@/components/simulation/QueueView";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useGraphStore } from "@/store/useGraphStore";
import { useSimulationStore } from "@/store/useSimulationStore";
import { generateKahnsSteps } from "@/utils/algorithms/topological/steps";
import { progressService } from "@/services/progressService";

export default function TopologicalSortPage() {
  const { nodes, edges } = useGraphStore();
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    if (nodes.length > 0) {
      const generatedSteps = generateKahnsSteps(nodes, edges);
      setSteps(generatedSteps);
    }
  }, [nodes, edges, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("topological-sort", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const topoOrder = (currentStep?.distances?.topologicalOrder as string[]) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Topological Sort (Kahn's Algorithm)" algorithmId="topological-sort" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Topo Order Banner */}
            <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Topological Ordering Result:</span>
              <strong className="text-emerald-400 font-mono text-sm">
                {topoOrder.length > 0 ? topoOrder.join(" ➔ ") : "Processing..."}
              </strong>
            </div>

            <div className="h-[520px] w-full">
              <GraphEditor
                interactive={true}
                highlightedNodeId={currentStep?.highlightedNodeId}
                highlightedEdgeId={currentStep?.highlightedEdgeId}
                visitedNodeIds={currentStep?.visitedNodes || []}
                distances={currentStep?.distances}
              />
            </div>
            <SimulationControls />
          </div>

          <div className="lg:col-span-3 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            <ExplanationPanel step={currentStep} />
            <PseudocodePanel activeLine={currentStep?.highlightedPseudocodeLine} />
            <QueueView queue={currentStep?.priorityQueueState?.map((item) => item.node)} />
          </div>
        </div>
      </main>
    </div>
  );
}
