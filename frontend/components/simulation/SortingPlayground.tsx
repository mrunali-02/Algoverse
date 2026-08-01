"use client";

import { useState } from "react";
import { Sliders, RefreshCw } from "lucide-react";

interface SortingPlaygroundProps {
  onUpdateArray: (newArr: number[]) => void;
}

export function SortingPlayground({ onUpdateArray }: SortingPlaygroundProps) {
  const [inputStr, setInputStr] = useState("64, 34, 25, 12, 22, 11, 90");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    let parsed = inputStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);

    if (parsed.length === 0) parsed = [50, 30, 70, 20, 90];
    onUpdateArray(parsed);
  };

  const handleRandomize = () => {
    const len = 7;
    const randomArr = Array.from({ length: len }, () => Math.floor(Math.random() * 85) + 15);
    setInputStr(randomArr.join(", "));
    onUpdateArray(randomArr);
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
        <Sliders className="w-4 h-4 text-indigo-400" />
        <span>Practice Playground:</span>
      </div>

      <form onSubmit={handleApply} className="flex items-center gap-3 w-full md:w-auto flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <span className="text-xs text-slate-400">Array Numbers (1-100):</span>
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            placeholder="e.g. 64, 34, 25, 12, 90"
            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
        >
          Sort Array
        </button>

        <button
          type="button"
          onClick={handleRandomize}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Randomize Dataset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
