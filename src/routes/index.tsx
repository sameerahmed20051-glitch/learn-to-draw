import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/lib/lessons";
import { StepIllustration } from "@/components/StepIllustration";
import { Sparkles, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn to Draw — Creative Arts for Kids | NextGen Schooling" },
      {
        name: "description",
        content:
          "Step-by-step drawing lessons for Kindergarten to Year 4. Learn to draw an elephant, cat, dog, fish, butterfly, flower, house and star with an interactive Konva drawing canvas.",
      },
      {
        property: "og:title",
        content: "Learn to Draw — Creative Arts for Kids",
      },
      {
        property: "og:description",
        content:
          "Interactive drawing lessons with a digital canvas. Pick a subject, follow the steps, save your masterpiece.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="stars-bg absolute inset-0" />

      <header className="relative px-6 pt-12 pb-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-sm font-bold text-primary backdrop-blur">
          <Palette className="h-4 w-4" /> Creative Arts • Kindergarten – Year 4
        </div>
        <h1 className="mt-5 font-display text-5xl md:text-6xl font-black tracking-tight text-glow">
          Learn to Draw
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Choose a picture, follow the easy steps, and create your own
          masterpiece on the magic drawing canvas.
        </p>
      </header>

      <main className="relative px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {lessons.map((l, index) => (
            <Link
              key={l.slug}
              to="/draw/$slug"
              params={{ slug: l.slug }}
              preload="intent"
              style={{ animationDelay: `${index * 50}ms` }}
              className="group animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both relative flex flex-col rounded-3xl lesson-card p-4 transition-all hover:-translate-y-2 hover:galaxy-glow focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {/* Difficulty badge */}
              <span
                className={cn(
                   "absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider",
                  l.difficulty === "Easy"
                    ? "bg-[oklch(0.75_0.18_140)]/20 text-[oklch(0.85_0.16_150)] border border-[oklch(0.75_0.18_140)]/40"
                    : "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.85_0.13_320)] border border-[oklch(0.7_0.18_320)]/40",
                )}
              >
                {l.difficulty}
              </span>

              {/* Preview — final composed step illustration */}
              <div
                className={cn(
                  "aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br p-4 flex items-center justify-center",
                  l.accentFrom,
                  l.accentTo,
                )}
              >
                <StepIllustration
                  lesson={l}
                  upToStep={l.steps.length - 1}
                  className="h-full w-full text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="font-display font-extrabold text-foreground text-lg leading-tight">
                    Draw a {l.shortTitle}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {l.steps.length} easy steps
                  </div>
                </div>
                <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{l.emoji}</span>
              </div>

              <div className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-black shadow-lg group-hover:galaxy-glow transition-all">
                <Sparkles className="h-4 w-4" /> Let's Draw!
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
