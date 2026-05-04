import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Palette, BookOpen, Star, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Space Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-5xl text-center space-y-16">
        <header className="space-y-6 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary font-orbitron text-xs uppercase tracking-[0.3em] mb-4 shadow-[0_0_20px_rgba(191,100,50,0.1)]">
            <Star className="h-4 w-4 fill-primary animate-pulse" />
            NextGen Learning Hub
            <Star className="h-4 w-4 fill-primary animate-pulse" />
          </div>
          <h1 className="text-7xl md:text-9xl font-orbitron font-black tracking-tighter text-white uppercase leading-none">
            Learning <br />
            <span className="neon-text">Portal</span>
          </h1>
          <p className="text-xl md:text-2xl font-rajdhani font-bold text-white/40 uppercase tracking-[0.2em] max-w-2xl mx-auto">
            Choose your mission to begin the educational journey
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto px-4">
          <Link to="/english_lesson" className="group">
            <div className="liquid-glass p-12 flex flex-col items-center gap-8 transition-all duration-500 hover:scale-[1.02] hover:neon-border hover:shadow-[0_0_40px_rgba(191,100,50,0.2)] h-full">
              <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(191,100,50,0.2)] transition-transform group-hover:rotate-12">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-orbitron font-black text-white uppercase tracking-wider group-hover:neon-text">English</h2>
                <p className="text-sm font-rajdhani font-bold text-white/30 uppercase tracking-widest">Thought Alignment // Grade 1-3</p>
              </div>
              <Button size="lg" className="mt-4 w-full h-16 rounded-xl bg-primary text-primary-foreground font-orbitron font-black text-xl shadow-[0_0_20px_rgba(191,100,50,0.3)]">
                INITIALIZE
              </Button>
            </div>
          </Link>

          <Link to="/draw/lion" className="group">
            <div className="liquid-glass p-12 flex flex-col items-center gap-8 transition-all duration-500 hover:scale-[1.02] hover:neon-border hover:shadow-[0_0_40px_rgba(191,100,50,0.2)] h-full">
              <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(191,100,50,0.2)] transition-transform group-hover:-rotate-12">
                <Palette className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-orbitron font-black text-white uppercase tracking-wider group-hover:neon-text">Drawing</h2>
                <p className="text-sm font-rajdhani font-bold text-white/30 uppercase tracking-widest">Creative Synthesis // Visual Arts</p>
              </div>
              <Button size="lg" className="mt-4 w-full h-16 rounded-xl bg-white/5 border border-white/10 text-white font-orbitron font-black text-xl hover:bg-white/10">
                START MISSION
              </Button>
            </div>
          </Link>
        </div>

        <footer className="pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
           <div className="flex flex-col items-center gap-4">
              <Rocket className="h-8 w-8 text-primary animate-bounce" />
              <p className="text-[10px] font-orbitron font-black text-white/20 uppercase tracking-[0.5em]">System Status: Ready for Deployment</p>
           </div>
        </footer>
      </div>
    </div>
  );
}
