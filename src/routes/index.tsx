import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn to Draw Game" },
    ],
  }),
  component: SimpleLandingPage,
});

function SimpleLandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Galaxy Background stays for theme consistency */}
      <div className="stars-bg absolute inset-0 z-0" />
      
      <main className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="font-display text-7xl md:text-9xl font-black tracking-tighter text-glow mb-12 animate-in fade-in zoom-in duration-1000">
          LEARN TO DRAW
        </h1>

        <Link to="/lessons" className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button size="lg" className="h-20 px-12 rounded-full text-2xl font-black galaxy-glow group transition-all hover:scale-110 active:scale-95">
            <Play className="mr-3 h-8 w-8 fill-current group-hover:translate-x-1 transition-transform" />
            START GAME
          </Button>
        </Link>
      </main>

      {/* Subtle Footer */}
      <footer className="absolute bottom-10 left-0 right-0 text-center text-muted-foreground text-sm font-bold opacity-40">
        NEXTGEN SCHOOLING
      </footer>
    </div>
  );
}
