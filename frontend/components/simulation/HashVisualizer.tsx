"use client";

import { motion } from "framer-motion";
import { HashBucket } from "@/utils/algorithms/hashing/types";
import { Hash } from "lucide-react";

interface HashVisualizerProps {
  table: HashBucket[];
  insertedKey?: number;
  calculatedIndex?: number;
  isCollision?: boolean;
}

export function HashVisualizer({
  table = [],
  insertedKey,
  calculatedIndex,
  isCollision,
}: HashVisualizerProps) {
  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950/60 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between shadow-inner overflow-hidden">
      {/* Header Info */}
      <div className="flex items-center justify-between z-10 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Hash className="w-4 h-4" />
          <span>Hash Function: h(key) = key mod {table.length}</span>
        </div>

        {insertedKey !== undefined && calculatedIndex !== undefined && (
          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Inserting Key {insertedKey} ➔ Bucket [{calculatedIndex}]
          </span>
        )}
      </div>

      {/* Hash Buckets Grid & Chaining Render */}
      <div className="space-y-3 my-auto py-4 max-w-4xl mx-auto w-full">
        {table.map((bucket) => {
          const isActiveBucket = bucket.index === calculatedIndex;

          let bucketHeaderStyle = "bg-slate-900 border-slate-800 text-slate-400";
          if (isActiveBucket) {
            bucketHeaderStyle = isCollision
              ? "bg-rose-950 border-rose-500 text-rose-200 font-bold shadow-lg shadow-rose-500/30"
              : "bg-indigo-600 border-indigo-400 text-white font-bold shadow-lg shadow-indigo-500/30";
          }

          return (
            <div key={bucket.index} className="flex items-center gap-3">
              {/* Bucket Index Header */}
              <div
                className={`w-28 h-12 rounded-xl border-2 flex items-center justify-center font-mono text-xs transition-all shrink-0 ${bucketHeaderStyle}`}
              >
                Bucket [{bucket.index}]
              </div>

              {/* Chained Linked List Items */}
              <div className="flex items-center gap-2 flex-wrap flex-1 min-h-[48px] p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
                {bucket.items.length === 0 ? (
                  <span className="text-xs font-mono text-slate-600 italic">EMPTY</span>
                ) : (
                  bucket.items.map((val, itemIdx) => {
                    const isNewest = isActiveBucket && val === insertedKey;

                    return (
                      <div key={itemIdx} className="flex items-center gap-2">
                        {itemIdx > 0 && <span className="text-xs text-indigo-400 font-bold">➔</span>}
                        <motion.div
                          layout
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-xs transition-all ${
                            isNewest
                              ? "bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-500/30"
                              : "bg-slate-800 border-slate-700 text-slate-200"
                          }`}
                        >
                          {val}
                        </motion.div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 z-10">
        Separate Chaining handles hash key collisions via linked lists at each bucket.
      </div>
    </div>
  );
}
