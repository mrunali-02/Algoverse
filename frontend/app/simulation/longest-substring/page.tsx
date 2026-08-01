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
import { generateLongestSubstringSteps } from "@/utils/algorithms/slidingWindow/steps";
import { progressService } from "@/services/progressService";

export default function LongestSubstringPage() {
  const [str] = useState<string>("abcabcbb");

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateLongestSubstringSteps(str);
    setSteps(generatedSteps);
  }, [str, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("longest-substring", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const left = (currentStep?.distances?.left as number) || 0;
  const right = (currentStep?.distances?.right as number) || 0;
  const currLen = currentStep?.distances?.currentLength as number | undefined;
  const maxLen = currentStep?.distances?.maxLength as number | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Longest Substring Without Repeating Characters" algorithmId="longest-substring" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <WindowVisualizer
                str={str}
                left={left}
                right={right}
                currentLength={currLen}
                maxLength={maxLen}
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
