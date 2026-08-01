/**
 * Core AlgoVerse Frontend Type Definitions
 */

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  weight: number;
  isDirected: boolean;
}

export interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
  isDirected: boolean;
}

export interface SimulationStep {
  stepNumber: number;
  action: string;

  highlights?: {
    nodes?: string[];
    edges?: string[];
    indices?: number[];
    cells?: { row: number; col: number }[];
    pointers?: Record<string, number>;
  };

  state?: Record<string, unknown>;

  explanation?: {
    title: string;
    description: string;
    reason: string;
  };

  highlightedPseudocodeLine: number;
  animationType: 'fade' | 'pulse' | 'glow' | 'bounce';

  // Legacy/Convenience properties for step engine compatibility
  highlightedNodeId?: string;
  highlightedEdgeId?: string;
  visitedNodes?: string[];
  distances?: Record<string, any>;
  previousNodes?: Record<string, any>;
  priorityQueueState?: Array<any>;
  explanationTitle?: string;
  explanationDescription?: string;
  explanationReason?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'MCQ' | 'PREDICT_NEXT_STEP' | 'FILL_BLANK';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}
