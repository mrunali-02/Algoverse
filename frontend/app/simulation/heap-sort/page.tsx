"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { HeapVisualizer } from "@/components/simulation/HeapVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateHeapSortSteps } from "@/utils/algorithms/heap/steps";
import { progressService } from "@/services/progressService";

export default function HeapSortPage() {
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateHeapSortSteps([4, 10, 3, 5, 1, 8]);
    setSteps(generatedSteps);
  }, [setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("heap-sort", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const heapArr = (currentStep?.distances?.heapArray as number[]) || [];
  const compIdxs = currentStep?.distances?.comparingIndices as [number, number] | undefined;
  const swapIdxs = currentStep?.distances?.swappingIndices as [number, number] | undefined;
  const sortedIdxs = (currentStep?.distances?.sortedIndices as number[]) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Heap Sort Algorithm" algorithmId="heap-sort" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <HeapVisualizer
                heapArray={heapArr}
                comparingIndices={compIdxs}
                swappingIndices={swapIdxs}
                sortedIndices={sortedIdxs}
                heapType="max"
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
