"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { HashVisualizer } from "@/components/simulation/HashVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateHashTableSteps } from "@/utils/algorithms/hashing/steps";
import { HashBucket } from "@/utils/algorithms/hashing/types";
import { progressService } from "@/services/progressService";

export default function HashTablePage() {
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateHashTableSteps();
    setSteps(generatedSteps);
  }, [setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("hash-table", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const table = (currentStep?.distances?.table as HashBucket[]) || [];
  const insertedKey = currentStep?.distances?.insertedKey as number | undefined;
  const calculatedIndex = currentStep?.distances?.calculatedIndex as number | undefined;
  const isCollision = currentStep?.distances?.isCollision as boolean | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Hash Table & Collision Resolution" algorithmId="hash-table" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <HashVisualizer
                table={table}
                insertedKey={insertedKey}
                calculatedIndex={calculatedIndex}
                isCollision={isCollision}
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
