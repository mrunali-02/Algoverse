"use client";

import { useEffect, useRef } from "react";
import { useSimulationStore } from "@/store/useSimulationStore";
import { useGraphStore } from "@/store/useGraphStore";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  Flag,
} from "lucide-react";

export function SimulationControls() {
  const {
    steps,
    currentStepIndex,
    isPlaying,
    playbackSpeed,
    startNodeId,
    togglePlayPause,
    stepForward,
    stepBackward,
    reset,
    goToStep,
    setPlaybackSpeed,
    setStartNodeId,
  } = useSimulationStore();

  const { nodes } = useGraphStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback timer ticker effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const { currentStepIndex, steps } = useSimulationStore.getState();
        if (currentStepIndex < steps.length - 1) {
          stepForward();
        } else {
          useSimulationStore.getState().pause();
        }
      }, playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, stepForward]);

  const totalSteps = steps.length;
  const currentStepNum = totalSteps > 0 ? currentStepIndex + 1 : 0;

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left: Source Node Selector & Step Counter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-300">Start Node:</span>
          <select
            value={startNodeId}
            onChange={(e) => setStartNodeId(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-indigo-300 focus:outline-none focus:border-indigo-500"
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id}>
                Node {node.id}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
          Step <strong className="text-indigo-400">{currentStepNum}</strong> / {totalSteps}
        </span>
      </div>

      {/* Center: Playback Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={reset}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Restart Simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={stepBackward}
          disabled={currentStepIndex === 0}
          className={`p-2.5 rounded-xl transition-colors ${
            currentStepIndex > 0
              ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
              : "bg-slate-900 text-slate-600 cursor-not-allowed"
          }`}
          title="Previous Step"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={togglePlayPause}
          className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </button>

        <button
          onClick={stepForward}
          disabled={currentStepIndex >= totalSteps - 1}
          className={`p-2.5 rounded-xl transition-colors ${
            currentStepIndex < totalSteps - 1
              ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
              : "bg-slate-900 text-slate-600 cursor-not-allowed"
          }`}
          title="Next Step"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Scrubber Slider & Speed Selector */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Scrubber */}
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => goToStep(parseInt(e.target.value))}
          className="w-28 md:w-36 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />

        {/* Speed Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800">
          <Gauge className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => setPlaybackSpeed(1500)}
            className={`px-1.5 py-0.5 text-[11px] font-semibold rounded ${
              playbackSpeed === 1500 ? "bg-indigo-600 text-white" : "text-slate-400"
            }`}
          >
            0.5x
          </button>
          <button
            onClick={() => setPlaybackSpeed(1000)}
            className={`px-1.5 py-0.5 text-[11px] font-semibold rounded ${
              playbackSpeed === 1000 ? "bg-indigo-600 text-white" : "text-slate-400"
            }`}
          >
            1x
          </button>
          <button
            onClick={() => setPlaybackSpeed(400)}
            className={`px-1.5 py-0.5 text-[11px] font-semibold rounded ${
              playbackSpeed === 400 ? "bg-indigo-600 text-white" : "text-slate-400"
            }`}
          >
            2x
          </button>
        </div>
      </div>
    </div>
  );
}
