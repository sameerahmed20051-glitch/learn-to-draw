import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Palette, BookOpen, GraduationCap, Sparkles, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Little Artist's Studio - Learn & Play" },
    ],
  }),
  component: SimpleLandingPage,
});

function SimpleLandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Galaxy Background */}
      <div className="stars-bg absolute inset-0 z-0 opacity-60" />
      
      <main className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl w-full">
        <div className="mb-16 space-y-4 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 backdrop-blur-md mb-4">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">NextGen Schooling</span>
          </div>
          <h1 className="font-display text-7xl md:text-8xl font-black tracking-tighter text-glow text-white">
            LEARN & PLAY
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            Welcome to your digital studio! Choose an adventure below to start learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl animate-in fade-in zoom-in duration-1000 delay-300">
          {/* Drawing Game Card */}
          <Link to="/drawing_games" className="group">
            <div className="relative overflow-hidden rounded-[40px] border-2 border-white/10 p-10 h-full transition-all hover:scale-105 hover:galaxy-glow bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <Palette className="h-32 w-32 text-white" />
              </div>
              
              <div className="relative z-10 space-y-6 text-left">
                <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:rotate-12 transition-transform duration-500">
                  <Pencil className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight">Drawing Games</h2>
                  <p className="text-indigo-100/70 font-medium">Learn to draw animals and shapes step-by-step!</p>
                </div>
                <Button size="lg" className="rounded-full px-8 bg-white text-indigo-900 font-bold hover:bg-indigo-50 group-hover:shadow-lg transition-all">
                  Play Now
                </Button>
              </div>
            </div>
          </Link>

          {/* English Lesson Card */}
          <Link to="/english_lesson" className="group">
            <div className="relative overflow-hidden rounded-[40px] border-2 border-white/10 p-10 h-full transition-all hover:scale-105 hover:galaxy-glow bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-700 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <BookOpen className="h-32 w-32 text-white" />
              </div>
              
              <div className="relative z-10 space-y-6 text-left">
                <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:rotate-12 transition-transform duration-500">
                  <GraduationCap className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-display font-black text-4xl text-white uppercase tracking-tight">English Lessons</h2>
                  <p className="text-sky-100/70 font-medium">Master fluency and vocabulary with fun stories!</p>
                </div>
                <Button size="lg" className="rounded-full px-8 bg-white text-sky-900 font-bold hover:bg-sky-50 group-hover:shadow-lg transition-all">
                  Start Learning
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="absolute bottom-10 left-0 right-0 text-center text-slate-600 text-sm font-bold opacity-40">
        © 2026 NEXTGEN SCHOOLING
      </footer>

      <style>{`
        .font-display {
          font-family: 'Orbitron', sans-serif;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
        .galaxy-glow {
          box-shadow: 0 0 50px rgba(56, 189, 248, 0.3);
          border-color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}
