"use client";

import { useState } from "react";
import { QuizQuestion } from "@/types";
import { quizService } from "@/services/quizService";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizCardProps {
  questions: QuizQuestion[];
}

export function QuizCard({ questions }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!selectedOption || isAnswered) return;

    setIsAnswered(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    await quizService.submitAnswer(currentQ.id, selectedOption);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (!currentQ && !isCompleted) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {isCompleted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl border border-indigo-500/30 text-center space-y-6 shadow-2xl bg-slate-900"
        >
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-100">Quiz Completed! 🎉</h2>
            <p className="text-sm text-slate-400 mt-1">
              You scored <strong className="text-indigo-400 font-bold">{score}</strong> out of {questions.length} questions correctly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 max-w-xs mx-auto">
            <p className="text-xs text-slate-400 font-medium">Accuracy Score</p>
            <p className="text-3xl font-extrabold text-emerald-400 mt-0.5">
              {Math.round((score / questions.length) * 100)}%
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl inline-flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </motion.div>
      ) : (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          {/* Top Bar: Progress & Difficulty */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentQ.difficulty === "Easy"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : currentQ.difficulty === "Medium"
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {currentQ.difficulty}
            </span>
          </div>

          {/* Question Title */}
          <div>
            <h3 className="text-lg font-bold text-slate-100 leading-snug">{currentQ.question}</h3>
            <p className="text-xs text-slate-400 mt-1">Type: {currentQ.type.replace(/_/g, " ")}</p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options?.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrectOpt = opt === currentQ.correctAnswer;

              let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                } else if (isSelected) {
                  btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200 font-semibold";
                }
              } else if (isSelected) {
                btnStyle = "bg-indigo-950/60 border-indigo-500 text-indigo-200 font-semibold shadow-md shadow-indigo-500/20";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 space-y-1"
              >
                <strong className="block text-indigo-300 font-semibold">Explanation:</strong>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {!isAnswered ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50 ml-auto"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 ml-auto"
              >
                <span>{currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
