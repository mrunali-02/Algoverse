"use client";

import { useEffect, useState } from "react";
import { Play, CheckCircle2, FileCode, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { activityTracker, ActivityItem } from "@/services/activityTracker";

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    setActivities(activityTracker.getActivities());
  }, []);

  const getIconAndColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'play':
        return { icon: Play, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" };
      case 'quiz':
        return { icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
      case 'save':
        return { icon: FileCode, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" };
      case 'bookmark':
        return { icon: Bookmark, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      default:
        return { icon: Play, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-panel p-6 rounded-3xl border border-slate-800"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-100">Real-Time Activity</h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Live Tracking
        </span>
      </div>

      <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
        {activities.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center italic">No recent activity recorded.</p>
        ) : (
          activities.map((act) => {
            const { icon: Icon, color } = getIconAndColor(act.type);
            return (
              <div key={act.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{act.title}</p>
                  <p className="text-[11px] text-slate-500">{act.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
