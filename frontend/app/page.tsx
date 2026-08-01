import Link from "next/link";
import { ArrowRight, Cpu, Network, Share2, Sparkles, Trophy } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Navigation */}
      <header className="border-b border-border/40 glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
            A
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            AlgoVerse
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#categories" className="hover:text-foreground transition-colors">Subjects</a>
          <a href="#visualizer" className="hover:text-foreground transition-colors">Dijkstra Simulation</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative py-24 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visual Engineering Education</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-slate-100 leading-tight">
            Master CS Algorithms Through <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Real-Time Simulations
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            Replace static notes with interactive simulations, graph editors, step-by-step state visualization, and automated quizzes.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/simulation/dijkstra"
              className="px-6 py-3.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Try Dijkstra Visualizer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3.5 text-sm font-semibold glass-panel text-slate-200 hover:bg-slate-800/60 rounded-xl border border-slate-700/60 transition-all"
            >
              Explore Dashboard
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section id="features" className="py-16 px-6 max-w-6xl mx-auto border-t border-border/30">
          <h2 className="text-2xl font-bold text-center text-slate-200 mb-12">
            Why Learn Engineering on AlgoVerse?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Interactive Graph Editor</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Build, edit, move, delete nodes and edges with custom weights in real-time.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Step-by-Step State Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Inspect distance tables, priority queue transformations, and exact pseudocode line highlights.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Interactive Quizzes</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Test step predictions, algorithm edge cases, and earn achievements as you master topics.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 AlgoVerse. Interactive CS Engineering Platform.</p>
      </footer>
    </div>
  );
}
