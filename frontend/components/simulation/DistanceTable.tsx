"use client";

import { Table, CheckCircle2 } from "lucide-react";

interface DistanceTableProps {
  distances?: Record<string, number | "∞">;
  previousNodes?: Record<string, string | null>;
  visitedNodes?: string[];
  highlightedNodeId?: string;
}

export function DistanceTable({
  distances = {},
  previousNodes = {},
  visitedNodes = [],
  highlightedNodeId,
}: DistanceTableProps) {
  const nodeIds = Object.keys(distances);

  return (
    <div className="glass-panel p-4 rounded-3xl border border-slate-800">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
        <Table className="w-4 h-4 text-emerald-400" />
        <h4 className="font-sans font-bold text-xs text-slate-200">Distance Table State</h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
              <th className="py-2 px-2">Node</th>
              <th className="py-2 px-2">Dist</th>
              <th className="py-2 px-2">Prev</th>
              <th className="py-2 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {nodeIds.map((nodeId) => {
              const distVal = distances[nodeId];
              const prevVal = previousNodes[nodeId] || "-";
              const isVisited = visitedNodes.includes(nodeId);
              const isHighlighted = nodeId === highlightedNodeId;

              return (
                <tr
                  key={nodeId}
                  className={`transition-colors ${
                    isHighlighted
                      ? "bg-amber-500/10 font-bold text-amber-200"
                      : isVisited
                      ? "bg-emerald-950/20 text-slate-300"
                      : "text-slate-400"
                  }`}
                >
                  <td className="py-2 px-2 font-mono font-bold">{nodeId}</td>
                  <td className="py-2 px-2 font-mono">{distVal}</td>
                  <td className="py-2 px-2 font-mono text-slate-400">{prevVal}</td>
                  <td className="py-2 px-2 text-right">
                    {isVisited ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Settled
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">Unvisited</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
