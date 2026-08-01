"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { BarVisualizer } from "@/components/simulation/BarVisualizer";
import { SortingPlayground } from "@/components/simulation/SortingPlayground";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateQuickSortSteps } from "@/utils/algorithms/sorting/steps";
import { progressService } from "@/services/progressService";

export default function QuickSortPage() {
  const [array, setArray] = useState<number[]>([10, 80, 30, 90, 40, 50, 70]);

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateQuickSortSteps(array);
    setSteps(generatedSteps);
  }, [array, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("quick-sort", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const currentArray = (currentStep?.distances?.array as number[]) || array;
  const comparingIdxs = (currentStep?.distances?.comparingIndices as number[]) || [];
  const swappingIdxs = (currentStep?.distances?.swappingIndices as number[]) || [];
  const pivotIdx = currentStep?.distances?.pivotIndex as number | undefined;
  const partitionRange = currentStep?.distances?.partitionRange as [number, number] | undefined;
  const sortedIdxs = (currentStep?.distances?.sortedIndices as number[]) || [];
  const compCount = (currentStep?.distances?.comparisonCount as number) || 0;
  const swapCount = (currentStep?.distances?.swapCount as number) || 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Quick Sort" algorithmId="quick-sort" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel algorithmId="quick-sort" />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <SortingPlayground onUpdateArray={setArray} />

            <div className="h-[480px] w-full">
              <BarVisualizer
                array={currentArray}
                comparingIndices={comparingIdxs}
                swappingIndices={swappingIdxs}
                pivotIndex={pivotIdx}
                partitionRange={partitionRange}
                sortedIndices={sortedIdxs}
                comparisonCount={compCount}
                swapCount={swapCount}
              />
            </div>

            <SimulationControls />
          </div>

          <div className="lg:col-span-3 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            <ExplanationPanel step={currentStep} />
            <PseudocodePanel algorithmId="quick-sort" activeLine={currentStep?.highlightedPseudocodeLine} />
          </div>
        </div>
      </main>
    </div>
  );
}
