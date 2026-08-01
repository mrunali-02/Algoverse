"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TheoryPanel } from "@/components/simulation/TheoryPanel";
import { GraphEditor } from "@/components/graph/GraphEditor";
import { SimulationControls } from "@/components/simulation/SimulationControls";
import { PseudocodePanel } from "@/components/simulation/PseudocodePanel";
import { ExplanationPanel } from "@/components/simulation/ExplanationPanel";
import { DistanceTable } from "@/components/simulation/DistanceTable";
import { PriorityQueueView } from "@/components/simulation/PriorityQueueView";
import { VisualizerHeaderActions } from "@/components/simulation/VisualizerHeaderActions";

import { useGraphStore } from "@/store/useGraphStore";
import { useSimulationStore } from "@/store/useSimulationStore";
import { generateDijkstraSteps } from "@/utils/dijkstraEngine";
import { progressService } from "@/services/progressService";

export default function DijkstraSimulationPage() {
  const { nodes, edges, isDirected } = useGraphStore();
  const { steps, currentStepIndex, startNodeId, setSteps } = useSimulationStore();

  // Re-generate simulation steps whenever graph structure or start node changes
  useEffect(() => {
    if (nodes.length > 0) {
      const startId = nodes.find((n) => n.id === startNodeId) ? startNodeId : nodes[0].id;
      const generatedSteps = generateDijkstraSteps(nodes, edges, startId, isDirected);
      setSteps(generatedSteps);
    }
  }, [nodes, edges, isDirected, startNodeId, setSteps]);

  const currentStep = steps[currentStepIndex];

  // Auto-record progress to backend when simulation completes
  useEffect(() => {
    if (currentStep?.action === "FINISHED") {
      progressService.recordProgress("dijkstra", "COMPLETED", 100);
    }
  }, [currentStep?.action]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 py-6">
        {/* Top Header Actions */}
        <VisualizerHeaderActions algorithmTitle="Dijkstra's Algorithm" algorithmId="dijkstra" />

        {/* 3-Column Engineering Visualizer Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (3 Cols): Theory & Interview Q&A */}
          <div className="lg:col-span-3">
            <TheoryPanel />
          </div>

          {/* Center Column (6 Cols): Interactive Canvas & Controls */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-[580px] w-full">
              <GraphEditor
                interactive={true}
                highlightedNodeId={currentStep?.highlightedNodeId}
                highlightedEdgeId={currentStep?.highlightedEdgeId}
                visitedNodeIds={currentStep?.visitedNodes || []}
                distances={currentStep?.distances}
              />
            </div>

            {/* Playback Controls */}
            <SimulationControls />
          </div>

          {/* Right Column (3 Cols): Execution Inspection */}
          <div className="lg:col-span-3 space-y-4 max-h-[820px] overflow-y-auto pr-1">
            {/* Step Explanation */}
            <ExplanationPanel step={currentStep} />

            {/* Pseudocode Line Highlight */}
            <PseudocodePanel activeLine={currentStep?.highlightedPseudocodeLine} />

            {/* Min-Priority Queue */}
            <PriorityQueueView queue={currentStep?.priorityQueueState} />

            {/* Distance Table */}
            <DistanceTable
              distances={currentStep?.distances}
              previousNodes={currentStep?.previousNodes}
              visitedNodes={currentStep?.visitedNodes}
              highlightedNodeId={currentStep?.highlightedNodeId}
            />
          </div>

        </div>
      </main>
    </div>
  );
}
