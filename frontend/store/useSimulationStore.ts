import { create } from 'zustand';
import { SimulationStep } from '@/types';

interface SimulationState {
  steps: SimulationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: number; // Interval in milliseconds (e.g., 1000, 500, 250)
  startNodeId: string;
  
  // Actions
  setSteps: (steps: SimulationStep[]) => void;
  setStartNodeId: (nodeId: string) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (index: number) => void;
  reset: () => void;
  setPlaybackSpeed: (speedMs: number) => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 1000, // 1 second per step
  startNodeId: 'A',

  setSteps: (steps) => {
    set({
      steps,
      currentStepIndex: 0,
      isPlaying: false,
    });
  },

  setStartNodeId: (startNodeId) => {
    set({ startNodeId, currentStepIndex: 0, isPlaying: false });
  },

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),

  stepForward: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  stepBackward: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index) => {
    const { steps } = get();
    if (index >= 0 && index < steps.length) {
      set({ currentStepIndex: index });
    }
  },

  reset: () => {
    set({ currentStepIndex: 0, isPlaying: false });
  },

  setPlaybackSpeed: (playbackSpeed) => {
    set({ playbackSpeed });
  },
}));
