"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { DSUVisualizer } from "@/components/simulation/DSUVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateDSUSteps } from "@/utils/algorithms/unionFind/steps";
import { progressService } from "@/services/progressService";

export default function UnionFindPage() {
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateDSUSteps();
    setSteps(generatedSteps);
  }, [setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("union-find", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const parent = (currentStep?.distances?.parent as number[]) || [];
  const rank = (currentStep?.distances?.rank as number[]) || [];
  const activeElement = currentStep?.distances?.activeElement as number | undefined;
  const rootU = currentStep?.distances?.rootU as number | undefined;
  const rootV = currentStep?.distances?.rootV as number | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Union Find (DSU)" algorithmId="union-find" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <DSUVisualizer
                parent={parent}
                rank={rank}
                activeElement={activeElement}
                rootU={rootU}
                rootV={rootV}
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
