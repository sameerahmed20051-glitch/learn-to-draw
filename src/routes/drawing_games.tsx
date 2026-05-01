import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/lib/lessons";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/drawing_games")({
  component: DrawingGamesPage,
});

function DrawingGamesPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0f172a]">
      {/* Galaxy Background */}
      <div className="stars-bg absolute inset-0 z-0 opacity-40" />
      
      <header className="relative z-10 flex items-center justify-between px-6 py-4 bg-slate-900/60 backdrop-blur-md border-b border-white/10">
        <Link to="/">
          <Button variant="ghost" size="lg" className="rounded-full font-bold text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-5 w-5" /> Home
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-sky-400" />
          <h1 className="font-display font-black text-2xl text-white tracking-tight text-glow uppercase">DRAWING GAMES</h1>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </header>

      <main className="relative z-10 flex-1 overflow-auto p-8 md:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              to="/draw/$slug"
              params={{ slug: lesson.slug }}
              className="group"
            >
              <div className={cn(
                "relative overflow-hidden rounded-[40px] border-2 border-white/10 p-8 h-full transition-all hover:scale-105 hover:galaxy-glow bg-gradient-to-br shadow-2xl",
                lesson.accentFrom,
                lesson.accentTo
              )}>
                {/* Decorative Pattern */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-7xl mb-6 group-hover:animate-bounce transition-all duration-500">
                    {lesson.emoji}
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">Lesson</div>
                    <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight leading-tight">
                      {lesson.title.replace("How to Draw a ", "").replace("How to Draw an ", "")}
                    </h2>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Difficulty</span>
                      <span className="text-xs font-bold text-white/80 tracking-wide">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <style>{`
        .font-display {
          font-family: 'Orbitron', sans-serif;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
        }
        .galaxy-glow {
          box-shadow: 0 0 50px rgba(56, 189, 248, 0.3);
          border-color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}
