"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { LayoutDashboard, Layers, ChevronDown } from "lucide-react";
import { ALGORITHMS } from "@/constants";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border/40 glass-panel sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <Link href="/" prefetch={false} className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
          A
        </div>
        <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          AlgoVerse
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <Link
          href="/dashboard"
          prefetch={false}
          className="flex items-center gap-2 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800/50"
        >
          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
          <span>Dashboard</span>
        </Link>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800/50 text-indigo-300 font-semibold"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Algorithm Catalog</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 max-h-[480px] overflow-y-auto rounded-2xl glass-panel border border-slate-800 p-2 shadow-2xl z-50 space-y-1">
              {ALGORITHMS.map((algo) => (
                <Link
                  key={algo.id}
                  href={algo.path}
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-600/20 text-xs text-slate-200 hover:text-white transition-colors group"
                >
                  <div>
                    <span className="font-bold block">{algo.title}</span>
                    <span className="text-[10px] text-slate-400">{algo.category}</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                    {algo.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Control Buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <Link
            href="/sign-in"
            prefetch={false}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            prefetch={false}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-9 h-9 border-2 border-indigo-500/40 hover:border-indigo-400 transition-colors",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
}
