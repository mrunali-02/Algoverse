"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { KMPVisualizer } from "@/components/simulation/KMPVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateKMPSteps } from "@/utils/algorithms/kmp/steps";
import { progressService } from "@/services/progressService";

export default function KMPPage() {
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateKMPSteps();
    setSteps(generatedSteps);
  }, [setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("kmp", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const text = (currentStep?.distances?.text as string) || "";
  const pattern = (currentStep?.distances?.pattern as string) || "";
  const lps = (currentStep?.distances?.lps as number[]) || [];
  const textIdx = currentStep?.distances?.textIndex as number | undefined;
  const patternIdx = currentStep?.distances?.patternIndex as number | undefined;
  const matchIdxs = (currentStep?.distances?.matchIndices as number[]) || [];
  const isCharMatch = currentStep?.distances?.isCharMatch as boolean | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Knuth-Morris-Pratt (KMP)" algorithmId="kmp" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <KMPVisualizer
                text={text}
                pattern={pattern}
                lps={lps}
                textIndex={textIdx}
                patternIndex={patternIdx}
                matchIndices={matchIdxs}
                isCharMatch={isCharMatch}
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
