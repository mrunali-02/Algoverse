"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { DPTableVisualizer } from "@/components/simulation/DPTableVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateKnapsackSteps } from "@/utils/algorithms/dynamicProgramming/steps";
import { progressService } from "@/services/progressService";

export default function KnapsackPage() {
  const [weights] = useState<number[]>([2, 3, 4, 5]);
  const [values] = useState<number[]>([3, 4, 5, 6]);
  const [capacity] = useState<number>(5);

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateKnapsackSteps(weights, values, capacity);
    setSteps(generatedSteps);
  }, [weights, values, capacity, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("knapsack", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const grid = (currentStep?.distances?.grid as number[][]) || [];
  const rowLabels = (currentStep?.distances?.rowLabels as string[]) || [];
  const colLabels = (currentStep?.distances?.colLabels as string[]) || [];
  const activeCell = currentStep?.distances?.activeCell as [number, number] | undefined;
  const depCells = currentStep?.distances?.dependencyCells as Array<[number, number]> | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="0/1 Knapsack Problem" algorithmId="knapsack" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <DPTableVisualizer
                grid={grid}
                rowLabels={rowLabels}
                colLabels={colLabels}
                activeCell={activeCell}
                dependencyCells={depCells}
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
