"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { TrieVisualizer } from "@/components/simulation/TrieVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateTrieSteps } from "@/utils/algorithms/trie/steps";
import { TrieNode } from "@/utils/algorithms/trie/types";
import { progressService } from "@/services/progressService";

export default function TriePage() {
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateTrieSteps(["cat", "car", "card", "dog"], "car");
    setSteps(generatedSteps);
  }, [setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("trie", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const trie = (currentStep?.distances?.trie as TrieNode) || {
    char: "ROOT",
    isEndOfWord: false,
    children: {},
    id: "trie-root",
  };
  const searchWord = currentStep?.distances?.searchWord as string | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Trie (Prefix Tree)" algorithmId="trie" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <TrieVisualizer
                trie={trie}
                highlightedNodeId={currentStep?.highlightedNodeId}
                visitedNodeIds={currentStep?.visitedNodes || []}
                searchWord={searchWord}
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
