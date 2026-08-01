"use client";

import { useState } from "react";
import { Sliders, RefreshCw } from "lucide-react";

interface ArrayPlaygroundProps {
  onUpdateArray: (newArr: number[], newTarget: number) => void;
  isSortedRequired?: boolean;
}

export function ArrayPlayground({ onUpdateArray, isSortedRequired = false }: ArrayPlaygroundProps) {
  const [inputStr, setInputStr] = useState("10, 20, 30, 45, 60, 75, 90");
  const [targetVal, setTargetVal] = useState(60);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    let parsed = inputStr
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !isNaN(n));

    if (parsed.length === 0) parsed = [10, 20, 30, 40, 50];

    if (isSortedRequired) {
      parsed.sort((a, b) => a - b);
      setInputStr(parsed.join(", "));
    }

    onUpdateArray(parsed, targetVal);
  };

  const handleRandomize = () => {
    const len = 7;
    const randomArr = Array.from({ length: len }, () => Math.floor(Math.random() * 90) + 10);
    if (isSortedRequired) randomArr.sort((a, b) => a - b);

    const randomTarget = randomArr[Math.floor(Math.random() * len)];

    setInputStr(randomArr.join(", "));
    setTargetVal(randomTarget);
    onUpdateArray(randomArr, randomTarget);
  };

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
        <Sliders className="w-4 h-4 text-indigo-400" />
        <span>Practice Playground:</span>
      </div>

      <form onSubmit={handleApply} className="flex items-center gap-3 w-full md:w-auto flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <span className="text-xs text-slate-400">Array:</span>
          <input
            type="text"
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            placeholder="e.g. 10, 20, 30"
            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Target:</span>
          <input
            type="number"
            value={targetVal}
            onChange={(e) => setTargetVal(parseInt(e.target.value) || 0)}
            className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
        >
          Update Array
        </button>

        <button
          type="button"
          onClick={handleRandomize}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Randomize Array & Target"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
