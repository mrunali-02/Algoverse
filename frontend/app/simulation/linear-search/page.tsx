"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { ArrayVisualizer } from "@/components/simulation/ArrayVisualizer";
import { ArrayPlayground } from "@/components/simulation/ArrayPlayground";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateLinearSearchSteps } from "@/utils/algorithms/search/steps";
import { progressService } from "@/services/progressService";

export default function LinearSearchPage() {
  const [array, setArray] = useState<number[]>([12, 45, 23, 67, 89, 34, 50]);
  const [target, setTarget] = useState<number>(67);

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateLinearSearchSteps(array, target);
    setSteps(generatedSteps);
  }, [array, target, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("linear-search", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const highlightedIdx = currentStep?.distances?.index as number | undefined;
  const isFound = currentStep?.action === "PATH_FOUND" || currentStep?.action === "FINISHED";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Linear Search" algorithmId="linear-search" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Theory */}
          <div className="lg:col-span-3">
            <TheoryPanel algorithmId="linear-search" />
          </div>

          {/* Center: Array Canvas & Playground & Controls */}
          <div className="lg:col-span-6 space-y-4">
            <ArrayPlayground
              onUpdateArray={(newArr, newTarget) => {
                setArray(newArr);
                setTarget(newTarget);
              }}
              isSortedRequired={false}
            />

            <div className="h-[480px] w-full">
              <ArrayVisualizer
                array={array}
                target={target}
                highlightedIndex={highlightedIdx}
                isFound={isFound}
              />
            </div>

            <SimulationControls />
          </div>

          {/* Right: Inspection Panels */}
          <div className="lg:col-span-3 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            <ExplanationPanel step={currentStep} />
            <PseudocodePanel algorithmId="linear-search" activeLine={currentStep?.highlightedPseudocodeLine} />
          </div>
        </div>
      </main>
    </div>
  );
}
