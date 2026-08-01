"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateFractionalKnapsackSteps } from "@/utils/algorithms/greedy/steps";
import { FractionalItem } from "@/utils/algorithms/greedy/types";
import { progressService } from "@/services/progressService";
import { Package } from "lucide-react";

const SAMPLE_ITEMS: Omit<FractionalItem, "ratio">[] = [
  { id: "item1", name: "Item A", weight: 10, value: 60 },
  { id: "item2", name: "Item B", weight: 20, value: 100 },
  { id: "item3", name: "Item C", weight: 30, value: 120 },
];

export default function FractionalKnapsackPage() {
  const [items] = useState(SAMPLE_ITEMS);
  const [capacity] = useState<number>(50);

  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateFractionalKnapsackSteps(items, capacity);
    setSteps(generatedSteps);
  }, [items, capacity, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("fractional-knapsack", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const stepItems = (currentStep?.distances?.items as FractionalItem[]) || [];
  const currW = (currentStep?.distances?.currentWeight as number) || 0;
  const totalV = (currentStep?.distances?.totalValue as number) || 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Fractional Knapsack Problem" algorithmId="fractional-knapsack" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                  <Package className="w-4 h-4" />
                  <span>Knapsack Weight: <strong className="text-white font-mono text-sm ml-1">{currW} / {capacity}</strong></span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Total Value: ${totalV}
                </span>
              </div>

              {/* Items Render */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto w-full max-w-3xl mx-auto">
                {stepItems.map((item) => {
                  const isHighlighted = item.id === currentStep?.highlightedNodeId;
                  const fraction = item.takenFraction || 0;

                  let cardStyle = "bg-slate-900 border-slate-800 text-slate-300";
                  if (fraction === 1) {
                    cardStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/30";
                  } else if (fraction > 0) {
                    cardStyle = "bg-amber-950/80 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/30";
                  } else if (isHighlighted) {
                    cardStyle = "bg-indigo-950/80 border-indigo-500 text-indigo-200";
                  }

                  return (
                    <div key={item.id} className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${cardStyle}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-indigo-300">
                          Ratio: {item.ratio} $/kg
                        </span>
                      </div>

                      <div className="text-xs space-y-1 text-slate-400">
                        <p>Weight: <strong className="text-slate-200 font-mono">{item.weight} kg</strong></p>
                        <p>Value: <strong className="text-slate-200 font-mono">${item.value}</strong></p>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-300">
                          Taken: <strong className="text-emerald-400">{(fraction * 100).toFixed(0)}%</strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center text-xs text-slate-500 z-10">
                Sorted by value-to-weight density ratio.
              </div>
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
