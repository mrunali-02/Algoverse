"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES, ALGORITHMS } from "@/constants";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";

export function ProgressChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-100">Engineering Curriculum Progress (15 Categories)</h3>
          <p className="text-xs text-slate-400">Interactive simulation status across all 15 algorithm subjects</p>
        </div>
        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>15 Active Modules</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => {
          const categoryAlgos = ALGORITHMS.filter((a) => a.category.includes(cat.name.split(". ")[1]?.split(" ")[0] || ""));
          const firstAlgo = categoryAlgos[0] || ALGORITHMS.find((a) => a.category.toLowerCase().includes(cat.id.toLowerCase())) || ALGORITHMS[0];

          return (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">{cat.name}</span>
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {cat.count} {cat.count === 1 ? "Algorithm" : "Algorithms"}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden my-3">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full w-full" />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">Available to Simulate</span>
                <Link
                  href={firstAlgo.path}
                  prefetch={false}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
