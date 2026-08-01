"use client";

import { CheckCircle2, BookOpen, Layers, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export function StatCards() {
  const items = [
    {
      label: "Completed Curriculum",
      value: 15,
      total: 15,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Active Categories",
      value: 15,
      total: 15,
      icon: BookOpen,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Interactive Simulations",
      value: 31,
      icon: Layers,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Simulation Engine",
      value: "V1.0",
      icon: Cpu,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">{item.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-100">{item.value}</span>
                {item.total && (
                  <span className="text-xs text-slate-500">/ {item.total}</span>
                )}
              </div>
            </div>
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${item.bgColor} ${item.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
