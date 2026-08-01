"use client";

import { SimulationStep } from "@/types";
import { Info, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExplanationPanelProps {
  step?: SimulationStep;
}

export function ExplanationPanel({ step }: ExplanationPanelProps) {
  if (!step) {
    return (
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 text-center text-slate-500 text-xs py-8">
        Press Play or Step Forward to start simulation.
      </div>
    );
  }

  const title = step.explanation?.title || (step as any).explanationTitle || "Step Execution";
  const description = step.explanation?.description || (step as any).explanationDescription || "";
  const reason = step.explanation?.reason || (step as any).explanationReason || "";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.stepNumber}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="glass-panel p-5 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/20 shadow-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Step {step.stepNumber}: {step.action}</span>
          </div>

          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            Anim: {step.animationType}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-100 mb-1.5">{title}</h3>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">{description}</p>

        {/* Reason Box */}
        {reason && (
          <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[11px] font-semibold text-indigo-300 mb-0.5">Algorithm Execution Rationale:</strong>
              <p className="leading-snug text-slate-300">{reason}</p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
