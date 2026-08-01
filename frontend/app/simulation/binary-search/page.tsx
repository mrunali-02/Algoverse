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
import { generateBinarySearchSteps } from "@/utils/algorithms/search/steps";
import { progressService } from "@/services/progressService";

export default function BinarySearchPage() {
  const [array, setArray] = useState<number[]>([10, 20, 30, 45, 60, 75, 90, 105]);
  const [target, setTarget] = useState<number>(60);

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateBinarySearchSteps(array, target);
    setSteps(generatedSteps);
  }, [array, target, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("binary-search", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const lowIdx = currentStep?.distances?.low as number | undefined;
  const highIdx = currentStep?.distances?.high as number | undefined;
  const midIdx = currentStep?.distances?.mid as number | undefined;
  const isFound = currentStep?.action === "PATH_FOUND";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Binary Search" algorithmId="binary-search" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Theory */}
          <div className="lg:col-span-3">
            <TheoryPanel algorithmId="binary-search" />
          </div>

          {/* Center: Array Canvas & Playground & Controls */}
          <div className="lg:col-span-6 space-y-4">
            <ArrayPlayground
              onUpdateArray={(newArr, newTarget) => {
                setArray(newArr);
                setTarget(newTarget);
              }}
              isSortedRequired={true}
            />

            <div className="h-[480px] w-full">
              <ArrayVisualizer
                array={array}
                target={target}
                lowIndex={lowIdx}
                highIndex={highIdx}
                midIndex={midIdx}
                isFound={isFound}
              />
            </div>

            <SimulationControls />
          </div>

          {/* Right: Inspection Panels */}
          <div className="lg:col-span-3 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            <ExplanationPanel step={currentStep} />
            <PseudocodePanel algorithmId="binary-search" activeLine={currentStep?.highlightedPseudocodeLine} />
          </div>
        </div>
      </main>
    </div>
  );
}
