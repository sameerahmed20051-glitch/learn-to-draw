import { createFileRoute, Link } from "@tanstack/react-router";
import { StepIllustration } from "@/components/StepIllustration";
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
      
      <header className="relative z-10 flex items-center justify-between px-6 py-6 bg-slate-900/60 backdrop-blur-xl border-b border-white/10">
        <Link to="/">
          <Button variant="ghost" size="lg" className="rounded-2xl font-black text-white hover:bg-white/10 hover:scale-105 transition-all">
            <ArrowLeft className="mr-2 h-6 w-6 text-sky-400" /> Home
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <Sparkles className="h-8 w-8 text-sky-400" />
          <h1 className="font-display font-black text-3xl text-white tracking-tighter text-glow uppercase">DRAWING GAMES</h1>
        </div>
        <div className="w-32" /> {/* Spacer */}
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
                  <div className="h-40 w-40 mx-auto mb-6 transition-all duration-500 group-hover:scale-110 drop-shadow-2xl flex items-center justify-center">
                    <StepIllustration 
                      lesson={lesson} 
                      upToStep={lesson.steps.length - 1} 
                      className="w-full h-full text-white" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-xs font-black text-white/50 uppercase tracking-[0.4em] mb-2">Lesson</div>
                    <h2 className="font-display font-black text-3xl text-white uppercase tracking-tighter leading-none group-hover:text-sky-200 transition-colors">
                      {lesson.title.replace("How to Draw a ", "").replace("How to Draw an ", "")}
                    </h2>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/20">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Difficulty</span>
                      <div className="flex gap-1">
                         {Array.from({ length: lesson.difficulty === 'Easy' ? 1 : lesson.difficulty === 'Medium' ? 2 : 3 }).map((_, i) => (
                           <div key={i} className="h-2 w-4 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                         ))}
                      </div>
                      <span className="text-sm font-black text-white tracking-wide">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:bg-white group-hover:text-slate-900 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-500">
                      <Play className="h-8 w-8 fill-current ml-1" />
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
          text-shadow: 0 0 30px rgba(56, 189, 248, 0.6);
        }
        .galaxy-glow {
          box-shadow: 0 0 60px rgba(56, 189, 248, 0.4);
          border-color: rgba(255,255,255,0.4);
        }
      `}</style>
    </div>
  );
}
