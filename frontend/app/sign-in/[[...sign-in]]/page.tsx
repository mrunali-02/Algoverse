"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
          A
        </div>
        <span className="font-bold text-2xl tracking-tight text-slate-100">
          AlgoVerse
        </span>
      </div>

      <div className="w-full max-w-md flex justify-center">
        <SignIn
          fallback={<div className="text-slate-400 text-sm py-8">Loading Authentication Form...</div>}
        />
      </div>
    </div>
  );
}
