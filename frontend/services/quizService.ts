import { apiClient } from './api';
import { QuizQuestion } from '@/types';

// Default Benchmark Dijkstra Questions
const DEFAULT_DIJKSTRA_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    type: "MCQ",
    difficulty: "Easy",
    question: "What type of graph edge weights does Dijkstra's Algorithm require?",
    options: [
      "Non-negative edge weights only",
      "Negative edge weights only",
      "Unweighted edges only",
      "Any arbitrary real numbers",
    ],
    correctAnswer: "Non-negative edge weights only",
    explanation: "Dijkstra relies on a greedy strategy where path distances monotonically increase. Negative weights break this assumption.",
  },
  {
    id: "q2",
    type: "PREDICT_NEXT_STEP",
    difficulty: "Medium",
    question: "Suppose PQ contains nodes [(B, 4), (C, 2), (D, 5)]. Which node is popped next?",
    options: ["Node B", "Node C", "Node D", "Node A"],
    correctAnswer: "Node C",
    explanation: "Dijkstra always extracts the node with the minimum tentative distance from the Min-Priority Queue (Node C with distance 2).",
  },
  {
    id: "q3",
    type: "FILL_BLANK",
    difficulty: "Hard",
    question: "What is the worst-case time complexity of Dijkstra's Algorithm using a Min-Binary Heap?",
    options: ["O(V + E)", "O((V + E) log V)", "O(V²)", "O(V E)"],
    correctAnswer: "O((V + E) log V)",
    explanation: "Extract-Min takes O(log V) time for V vertices, and edge relaxations take O(E log V), yielding O((V + E) log V).",
  },
];

export const quizService = {
  async getQuestions(algorithmSlug: string): Promise<QuizQuestion[]> {
    try {
      const response = await apiClient.get(`/quiz/questions/?algorithm=${algorithmSlug}`);
      return response.data.length > 0 ? response.data : DEFAULT_DIJKSTRA_QUIZ;
    } catch (error) {
      console.warn('Using fallback quiz questions', error);
      return DEFAULT_DIJKSTRA_QUIZ;
    }
  },

  async submitAnswer(questionId: string, selectedAnswer: string) {
    try {
      const response = await apiClient.post('/quiz/submit/', {
        question: questionId,
        selected_answer: selectedAnswer,
      });
      return response.data;
    } catch (error) {
      console.warn('API error submitting quiz answer:', error);
      return null;
    }
  },
};
