import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getLesson, lessons } from "@/lib/lessons";
import { DrawingPad } from "@/components/DrawingPad";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home as HomeIcon, PartyPopper } from "lucide-react";

export const Route = createFileRoute("/draw/$slug")({
  loader: ({ params }) => {
    const lesson = getLesson(params.slug);
    if (!lesson) throw notFound();
    return { lesson };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.lesson?.title ?? "Learn to Draw";
    return {
      meta: [
        { title: `${title} — Learn to Draw` },
        {
          name: "description",
          content: `${title} — easy step-by-step drawing lesson for kids with a digital drawing pad.`,
        },
        { property: "og:title", content: `${title} — Learn to Draw` },
        {
          property: "og:description",
          content: `Follow the steps to draw and try it on the digital pad.`,
        },
      ],
    };
  },
  component: DrawPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-3xl font-black">Oops! Lesson not found 😅</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to lessons
        </Link>
      </div>
    </div>
  ),
});

function DrawPage() {
  const { lesson } = Route.useLoaderData();
  const [stepIndex, setStepIndex] = useState(0);
  const step = lesson.steps[stepIndex];
  const isLast = stepIndex === lesson.steps.length - 1;
  const isFirst = stepIndex === 0;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[oklch(0.97_0.04_85)] to-[oklch(0.95_0.06_200)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card/80 backdrop-blur">
        <Link to="/">
          <Button variant="outline" size="lg" className="rounded-full">
            <HomeIcon className="mr-1 h-5 w-5" /> Lessons
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{lesson.emoji}</span>
          <h1 className="font-extrabold text-lg md:text-xl">{lesson.title}</h1>
        </div>
        <div className="text-sm font-bold text-muted-foreground">
          Step {stepIndex + 1} / {lesson.steps.length}
        </div>
      </div>

      {/* Split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(320px,420px)_1fr] gap-4 p-4 overflow-hidden">
        {/* LEFT: instructions */}
        <aside className="flex flex-col rounded-3xl bg-card border shadow-md overflow-hidden">
          <div className={`${lesson.color} p-4 flex items-center justify-center border-b`}>
            <img
              src={lesson.image}
              alt={lesson.title}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-40 md:h-52 w-auto object-contain drop-shadow"
            />
          </div>

          <div className="flex-1 overflow-auto p-5">
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 mb-4">
              {lesson.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    i <= stepIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <h2 className="font-black text-2xl text-foreground">{step.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground/80">{step.instruction}</p>
            {step.tip && (
              <div className="mt-4 rounded-2xl bg-secondary/40 border-2 border-secondary p-3">
                <span className="font-bold">💡 Tip: </span>
                <span>{step.tip}</span>
              </div>
            )}

            {isLast && (
              <div className="mt-5 rounded-2xl bg-primary/10 border-2 border-primary/30 p-4 flex items-center gap-3">
                <PartyPopper className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <div className="font-extrabold">Great job!</div>
                  <div className="text-sm text-muted-foreground">
                    You finished your {lesson.title.replace(/How to Draw an? /, "")}!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step nav */}
          <div className="flex items-center justify-between gap-2 p-4 border-t bg-muted/30">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              disabled={isFirst}
              className="rounded-full flex-1"
            >
              <ArrowLeft className="mr-1 h-5 w-5" /> Back
            </Button>
            <Button
              size="lg"
              onClick={() => setStepIndex((i) => Math.min(lesson.steps.length - 1, i + 1))}
              disabled={isLast}
              className="rounded-full flex-1"
            >
              Next <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </aside>

        {/* RIGHT: drawing pad */}
        <section className="min-h-[60vh] lg:min-h-0">
          <DrawingPad />
        </section>
      </div>

      {/* Other lessons quick switcher */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 border-t bg-card/60 overflow-x-auto">
        <span className="text-xs font-bold text-muted-foreground mr-2">More to draw:</span>
        {lessons
          .filter((l) => l.slug !== lesson.slug)
          .map((l) => (
            <Link
              key={l.slug}
              to="/draw/$slug"
              params={{ slug: l.slug }}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary/40 hover:bg-secondary px-3 py-1 text-sm font-semibold"
            >
              <span>{l.emoji}</span>
              <span>{l.title.replace(/How to Draw an? /, "")}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
