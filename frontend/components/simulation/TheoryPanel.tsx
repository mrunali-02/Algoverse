"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, HelpCircle, CheckCircle, AlertTriangle, Zap, Code } from "lucide-react";
import { THEORY_REGISTRY, AlgorithmTheoryData } from "@/constants/theoryRegistry";

interface TheoryPanelProps {
  algorithmId?: string;
  data?: Partial<AlgorithmTheoryData>;
}

export function TheoryPanel({ algorithmId, data }: TheoryPanelProps) {
  const [activeTab, setActiveTab] = useState<"theory" | "questions">("theory");
  const pathname = usePathname();

  // Extract algorithm key from pathname if algorithmId is not explicitly provided
  const pathKey = pathname ? pathname.replace("/simulation/", "").trim() : "dijkstra";
  const resolvedKey = algorithmId || pathKey;

  // Retrieve algorithm theory from registry, fallback to dijkstra
  const theory: AlgorithmTheoryData = {
    ...(THEORY_REGISTRY[resolvedKey] || THEORY_REGISTRY["dijkstra"]),
    ...data,
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col h-full max-h-[820px] overflow-y-auto">
      {/* Header Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveTab("theory")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "theory"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Theory & Analysis</span>
        </button>

        <button
          onClick={() => setActiveTab("questions")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "questions"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interview Q&A</span>
        </button>
      </div>

      {activeTab === "theory" ? (
        <div className="space-y-6 text-xs text-slate-300">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-1.5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Introduction</span>
            </h3>
            <p className="leading-relaxed text-slate-400">
              {theory.introduction}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h4 className="font-semibold text-slate-200 mb-1">Problem Statement</h4>
            <p className="text-slate-400 leading-relaxed">
              {theory.problemStatement}
            </p>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-indigo-400" />
              <span>Real-World Applications</span>
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              {theory.applications.map((app, idx) => (
                <li key={idx}>{app}</li>
              ))}
            </ul>
          </div>

          {/* Complexity Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <p className="text-[11px] text-indigo-300 font-semibold">Time Complexity</p>
              <p className="text-sm font-mono font-bold text-indigo-200 mt-0.5">{theory.timeComplexity}</p>
              <p className="text-[10px] text-slate-400 mt-1">{theory.timeDetail}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-[11px] text-emerald-300 font-semibold">Space Complexity</p>
              <p className="text-sm font-mono font-bold text-emerald-200 mt-0.5">{theory.spaceComplexity}</p>
              <p className="text-[10px] text-slate-400 mt-1">{theory.spaceDetail}</p>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
              <h5 className="font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Advantages</span>
              </h5>
              <p className="text-[11px] text-slate-400">
                {theory.advantages}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20">
              <h5 className="font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Disadvantages</span>
              </h5>
              <p className="text-[11px] text-slate-400">
                {theory.disadvantages}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-xs">
          {theory.interviewQA.map((qa, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-slate-200 mb-1">
                Q{idx + 1}: {qa.question}
              </h4>
              <p className="text-slate-400 leading-relaxed mt-1">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
