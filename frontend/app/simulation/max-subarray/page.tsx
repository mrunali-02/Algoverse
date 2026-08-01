"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { WindowVisualizer } from "@/components/simulation/WindowVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateMaxSubarraySteps } from "@/utils/algorithms/slidingWindow/steps";
import { progressService } from "@/services/progressService";

export default function MaxSubarrayPage() {
  const [array] = useState<number[]>([2, 1, 5, 1, 3, 2, 8, 4]);
  const [k] = useState<number>(3);

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateMaxSubarraySteps(array, k);
    setSteps(generatedSteps);
  }, [array, k, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("max-subarray", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const left = (currentStep?.distances?.left as number) || 0;
  const right = (currentStep?.distances?.right as number) || 0;
  const currSum = currentStep?.distances?.currentSum as number | undefined;
  const maxSum = currentStep?.distances?.maxSum as number | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Maximum Sum Subarray of Size K" algorithmId="max-subarray" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <WindowVisualizer
                array={array}
                left={left}
                right={right}
                currentSum={currSum}
                maxSum={maxSum}
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
