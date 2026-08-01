"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Network, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { activityTracker, CurrentModuleState } from "@/services/activityTracker";

export function ContinueLearningCard() {
  const [currentModule, setCurrentModule] = useState<CurrentModuleState | null>(null);

  useEffect(() => {
    setCurrentModule(activityTracker.getCurrentModule());
  }, []);

  if (!currentModule) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Current Active Module</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
            <Clock className="w-3 h-3" />
            <span>Active Session</span>
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{currentModule.title}</h3>
            <p className="text-xs text-slate-400">{currentModule.category} • {currentModule.difficulty} Difficulty</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {currentModule.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>Simulation Progress</span>
            <span className="text-indigo-400 font-bold">{currentModule.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${currentModule.progress}%` }}
            />
          </div>
        </div>
      </div>

      <Link
        href={currentModule.path}
        prefetch={false}
        className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01]"
      >
        <Play className="w-4 h-4 fill-white" />
        <span>Resume Visualizer ({currentModule.title})</span>
      </Link>
    </motion.div>
  );
}
