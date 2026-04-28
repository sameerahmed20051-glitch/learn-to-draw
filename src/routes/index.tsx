import { createFileRoute, Link } from "@tanstack/react-router";
import { lessons } from "@/lib/lessons";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn to Draw — Fun Drawing Lessons for Kids" },
      {
        name: "description",
        content:
          "Step-by-step drawing lessons for kindergarten and primary school kids. Draw an elephant, dog, cat, home, star and flower with a fun digital drawing pad.",
      },
      { property: "og:title", content: "Learn to Draw — Fun Drawing Lessons for Kids" },
      {
        property: "og:description",
        content: "Step-by-step drawing lessons with a digital drawing pad for kids.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.97_0.05_85)] via-background to-[oklch(0.95_0.07_200)]">
      <header className="px-6 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
          <Sparkles className="h-4 w-4" /> Creative Arts • K – Year 4
        </div>
        <h1 className="mt-4 font-black tracking-tight text-foreground text-5xl md:text-6xl">
          Learn to Draw! 🎨
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Pick a picture below and follow the easy steps. Use the drawing pad to make your own
          masterpiece!
        </p>
      </header>

      <main className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {lessons.map((l) => (
            <Link
              key={l.slug}
              to="/draw/$slug"
              params={{ slug: l.slug }}
              className={`group flex flex-col items-center justify-center rounded-3xl ${l.color} p-5 shadow-md transition-all hover:scale-105 hover:shadow-xl border-4 border-white`}
            >
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white/60 flex items-center justify-center">
                <img
                  src={l.image}
                  alt={l.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-contain p-2 transition-transform group-hover:scale-110"
                />
              </div>
              <div className="mt-3 text-center">
                <div className="text-2xl">{l.emoji}</div>
                <div className="font-extrabold text-foreground text-lg leading-tight">
                  {l.title.replace("How to Draw a ", "").replace("How to Draw an ", "")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
