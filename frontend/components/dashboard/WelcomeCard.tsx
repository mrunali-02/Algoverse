"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles, Award, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";

export function WelcomeCard() {
  const { user } = useUser();
  const { stats } = useUserStore();

  const displayName = user?.firstName || user?.username || "Engineering Student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden glass-panel p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 shadow-2xl"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Learning Platform</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">{displayName}</span>! 👋
          </h1>

          <p className="mt-2 text-slate-400 text-sm max-w-xl leading-relaxed">
            Ready to master computer science algorithms? Explore 31 step-by-step visual simulations across 15 complete curriculum categories with real-time execution inspection.
          </p>
        </div>

        {/* Quick Badges */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Daily Streak</p>
              <p className="text-lg font-bold text-slate-100">{stats.learningStreakDays} Days 🔥</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Curriculum</p>
              <p className="text-lg font-bold text-slate-100">100% Active</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
