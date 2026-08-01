"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

export const CustomNode = memo(({ id, data, selected }: NodeProps) => {
  const isVisited = data?.isVisited as boolean;
  const isHighlighted = data?.isHighlighted as boolean;
  const distance = data?.distance as string | number;

  let borderColor = "border-slate-700 bg-slate-900";
  let textColor = "text-slate-200";
  let ringStyle = "";

  if (isHighlighted) {
    borderColor = "border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/40";
    textColor = "text-amber-200 font-bold";
    ringStyle = "ring-4 ring-amber-400/30 scale-110";
  } else if (isVisited) {
    borderColor = "border-emerald-500 bg-emerald-950/80 shadow-md shadow-emerald-500/30";
    textColor = "text-emerald-200";
  } else if (selected) {
    borderColor = "border-indigo-500 bg-indigo-950/80 shadow-lg shadow-indigo-500/40";
    textColor = "text-indigo-200 font-bold";
    ringStyle = "ring-4 ring-indigo-500/30";
  }

  return (
    <div className="relative group">
      {/* Distance Badge for Simulation */}
      {distance !== undefined && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-indigo-600 border border-indigo-400 text-[10px] font-bold text-white shadow-md">
          {distance === Infinity ? "∞" : distance}
        </div>
      )}

      {/* Main Circular Node */}
      <div
        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${borderColor} ${textColor} ${ringStyle}`}
      >
        <span className="text-sm font-semibold">{data.label as string}</span>
      </div>

      {/* Target/Source Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-indigo-500 !border-2 !border-slate-900"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-indigo-500 !border-2 !border-slate-900"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-3 h-3 !bg-indigo-500 !border-2 !border-slate-900"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-3 h-3 !bg-indigo-500 !border-2 !border-slate-900"
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
