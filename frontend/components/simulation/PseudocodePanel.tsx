"use client";

import { usePathname } from "next/navigation";
import { Code2 } from "lucide-react";
import { THEORY_REGISTRY } from "@/constants/theoryRegistry";

interface PseudocodePanelProps {
  algorithmId?: string;
  activeLine?: number;
  customCodeLines?: Array<{ line: number; text: string }>;
}

export function PseudocodePanel({ algorithmId, activeLine = 1, customCodeLines }: PseudocodePanelProps) {
  const pathname = usePathname();

  // Extract algorithm key from pathname if algorithmId is not explicitly provided
  const pathKey = pathname ? pathname.replace("/simulation/", "").trim() : "dijkstra";
  const resolvedKey = algorithmId || pathKey;

  const registryData = THEORY_REGISTRY[resolvedKey] || THEORY_REGISTRY["dijkstra"];
  const codeLines = customCodeLines || registryData.pseudocode;

  return (
    <div className="glass-panel p-4 rounded-3xl border border-slate-800 font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
        <Code2 className="w-4 h-4 text-indigo-400" />
        <h4 className="font-sans font-bold text-slate-200">{registryData.title} Pseudocode</h4>
      </div>

      <div className="space-y-1">
        {codeLines.map((item) => {
          const isActive = item.line === activeLine;
          return (
            <div
              key={item.line}
              className={`flex items-center gap-3 px-2.5 py-1 rounded-lg transition-colors ${
                isActive
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-200 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/40"
              }`}
            >
              <span className="w-4 text-right text-[10px] text-slate-600 select-none">{item.line}</span>
              <span className="whitespace-pre">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
