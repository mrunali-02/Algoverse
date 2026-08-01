"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { IntervalVisualizer } from "@/components/simulation/IntervalVisualizer";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useSimulationStore } from "@/store/useSimulationStore";
import { generateActivitySelectionSteps } from "@/utils/algorithms/greedy/steps";
import { Activity } from "@/utils/algorithms/greedy/types";
import { progressService } from "@/services/progressService";

const SAMPLE_ACTIVITIES: Activity[] = [
  { id: "a1", name: "Task 1", start: 1, finish: 4 },
  { id: "a2", name: "Task 2", start: 3, finish: 5 },
  { id: "a3", name: "Task 3", start: 0, finish: 6 },
  { id: "a4", name: "Task 4", start: 5, finish: 7 },
  { id: "a5", name: "Task 5", start: 3, finish: 8 },
  { id: "a6", name: "Task 6", start: 5, finish: 9 },
  { id: "a7", name: "Task 7", start: 8, finish: 11 },
];

export default function ActivitySelectionPage() {
  const [activities] = useState<Activity[]>(SAMPLE_ACTIVITIES);
  const { steps, currentStepIndex, setSteps } = useSimulationStore();

  useEffect(() => {
    const generatedSteps = generateActivitySelectionSteps(activities);
    setSteps(generatedSteps);
  }, [activities, setSteps]);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("activity-selection", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  const activeActivities = (currentStep?.distances?.activities as Activity[]) || activities;
  const selCount = (currentStep?.distances?.selectedCount as number) || 0;
  const lastFinish = currentStep?.distances?.lastFinish as number | undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        <VisualizerHeaderActions algorithmTitle="Activity Selection Problem" algorithmId="activity-selection" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="h-[480px] w-full">
              <IntervalVisualizer
                activities={activeActivities}
                selectedCount={selCount}
                lastFinish={lastFinish}
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
