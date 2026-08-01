"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { BoardVisualizer } from "@/components/simulation/BoardVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateNQueensSteps } from "@/utils/algorithms/backtracking/steps";
import { progressService } from "@/services/progressService";

export default function NQueensPage() {
  const [boardSize, setBoardSize] = useState<number>(4);
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateNQueensSteps(boardSize);
    setSteps(generatedSteps);
  }, [boardSize, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("n-queens", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const grid = (currentStep?.distances?.grid as number[][]) || [];
  const activeRow = currentStep?.distances?.activeRow as number | undefined;
  const activeCol = currentStep?.distances?.activeCol as number | undefined;
  const isValidPlacement = currentStep?.distances?.isValidPlacement as boolean | undefined;
  const isBacktracking = currentStep?.distances?.isBacktracking as boolean | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="N-Queens Problem" algorithmId="n-queens" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="glass-panel p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-semibold">Board Size (N x N):</span>
              <div className="flex items-center gap-2">
                {[4, 5, 6].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBoardSize(size)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      boardSize === size
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[480px] w-full">
              <BoardVisualizer
                grid={grid}
                activeRow={activeRow}
                activeCol={activeCol}
                isValidPlacement={isValidPlacement}
                isBacktracking={isBacktracking}
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
