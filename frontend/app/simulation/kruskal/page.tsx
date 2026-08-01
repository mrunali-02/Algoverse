"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { GraphEditor } from "@/components/graph/GraphEditor";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useGraphStore } from "@/store/useGraphStore";
import { useSimulationStore } from "@/store/useSimulationStore";
import { generateKruskalSteps } from "@/utils/algorithms/graph/steps";
import { progressService } from "@/services/progressService";

export default function KruskalSimulationPage() {
  const { nodes, edges } = useGraphStore();
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    if (nodes.length > 0) {
      const generatedSteps = generateKruskalSteps(nodes, edges);
      setSteps(generatedSteps);
    }
  }, [nodes, edges, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("kruskal", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Kruskal's MST Algorithm" algorithmId="kruskal" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[580px] w-full">
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
          </div>
        </div>
      </main>
    </div>
  );
}
