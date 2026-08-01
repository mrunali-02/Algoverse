"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowUpRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { activityTracker, BookmarkItem } from "@/services/activityTracker";

export function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    setBookmarks(activityTracker.getBookmarks());
  }, []);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item = bookmarks.find((b) => b.id === id);
    if (item) {
      activityTracker.toggleBookmark(item);
      setBookmarks(activityTracker.getBookmarks());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 rounded-3xl border border-slate-800"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">Saved Bookmarks</h3>
        </div>
        <span className="text-xs text-indigo-300 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
          {bookmarks.length} Saved
        </span>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-xs text-slate-500 py-6 text-center italic">No bookmarks saved yet. Click "Bookmark Topic" in any visualizer.</p>
      ) : (
        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{bm.title}</h4>
                <p className="text-xs text-slate-400">{bm.category} • {bm.complexity}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleRemove(bm.id, e)}
                  title="Remove Bookmark"
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={bm.link}
                  prefetch={false}
                  className="p-2 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
