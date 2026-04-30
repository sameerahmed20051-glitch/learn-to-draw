import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLesson, lessons } from "@/lib/lessons";
import { StepIllustration } from "@/components/StepIllustration";
import { CelebrationModal } from "@/components/CelebrationModal";
import { lazy, Suspense } from "react";

const KonvaCanvas = lazy(() => import("@/components/KonvaCanvas").then(m => ({ default: m.KonvaCanvas })));
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home as HomeIcon, PartyPopper, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeech } from "@/hooks/use-speech";

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
          content: `${title}. Follow easy step-by-step instructions and draw on an interactive digital canvas.`,
        },
        { property: "og:title", content: `${title} — Learn to Draw` },
        {
          property: "og:description",
          content: `Follow the steps and draw on the magic canvas.`,
        },
      ],
    };
  },
  component: DrawPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="galaxy-card rounded-3xl p-8">
          <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <Button
            className="mt-4"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div className="galaxy-card rounded-3xl p-8">
        <h1 className="font-display text-3xl font-black">Lesson not found 😅</h1>
        <Link
          to="/lessons"
          className="mt-4 inline-block rounded-full bg-primary text-primary-foreground px-5 py-2 font-bold"
        >
          Back to lessons
        </Link>
      </div>
    </div>
  ),
});

function DrawPage() {
  const { lesson } = Route.useLoaderData();
  const [stepIndex, setStepIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<any>(null);
  
  // Use advanced file-based speech hook
  const { playAudio, preloadAudio, stop, speakFallback } = useSpeech();

  const step = lesson.steps[stepIndex];
  const isLast = stepIndex === lesson.steps.length - 1;
  const isFirst = stepIndex === 0;

  // Preload all audio files for this lesson on mount
  useEffect(() => {
    lesson.steps.forEach((_, index) => {
      preloadAudio(`/audio/${lesson.slug}/step-${index + 1}.mp3`);
    });
  }, [lesson, preloadAudio]);

  /**
   * PLAY INSTRUCTION:
   * Constructs path to MP3 file for current step.
   */
  const handlePlayInstruction = useCallback(() => {
    const audioPath = `/audio/${lesson.slug}/step-${stepIndex + 1}.mp3`;
    
    // We try to play the MP3 first
    playAudio(audioPath);
    
    /**
     * FALLBACK LOGIC:
     * If you haven't uploaded the MP3s yet, we can use the high-quality 
     * synthetic WaveNet fallback.
     */
    // speakFallback(`${step.title}. ${step.instruction}`);
  }, [lesson.slug, stepIndex, playAudio]);

  // Auto-play instruction when step changes
  useEffect(() => {
    if (!showCelebration) {
      handlePlayInstruction();
    } else {
      stop();
    }
    return () => stop();
  }, [stepIndex, handlePlayInstruction, stop, showCelebration]);

  const handleRepeat = () => {
    handlePlayInstruction();
  };

  const goNext = () => {
    if (isLast) {
      setShowCelebration(true);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const handleSavePng = () => {
    const url = canvasRef.current?.exportPng();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${lesson.slug}-drawing.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleStartNew = () => {
    canvasRef.current?.clear();
    setStepIndex(0);
    setShowCelebration(false);
  };

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <div className="stars-bg absolute inset-0" />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-4 py-3 border-b border-[var(--galaxy-teal)]/20 bg-card/40 backdrop-blur">
        <Link to="/lessons">
          <Button variant="secondary" size="lg" className="rounded-full font-bold">
            <HomeIcon className="mr-1 h-5 w-5" /> Lessons
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{lesson.emoji}</span>
          <h1 className="font-display font-extrabold text-base md:text-xl text-glow">
            {lesson.title}
          </h1>
        </div>
        <div className="text-sm font-bold text-muted-foreground hidden sm:block">
          Step {stepIndex + 1} of {lesson.steps.length}
        </div>
      </header>

      {/* Split layout */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-[minmax(350px,450px)_1fr] gap-0 overflow-hidden">
        {/* LEFT: instructions */}
        <aside className="relative flex flex-col galaxy-card lg:rounded-none rounded-none border-0 overflow-hidden lg:border-r border-[var(--galaxy-teal)]/20 lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-0 lg:after:bottom-0 lg:after:w-px lg:after:bg-gradient-to-b lg:after:from-transparent lg:after:via-primary/60 lg:after:to-transparent lg:after:shadow-[0_0_12px_rgba(oklch(0.78_0.15_195),0.5)] animate-in slide-in-from-left duration-500">
          {/* ... existing aside content ... */}
          <div
            className={cn(
              "p-5 flex items-center justify-center bg-gradient-to-br border-b border-[var(--galaxy-teal)]/20",
              lesson.accentFrom,
              lesson.accentTo,
            )}
          >
            <StepIllustration
              lesson={lesson}
              upToStep={stepIndex}
              className="h-44 md:h-60 w-auto text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-all duration-700"
            />
          </div>

          <div className="flex-1 overflow-auto p-5">
            {/* Progress dots */}
            <div className="flex items-center gap-2 mb-5">
              {lesson.steps.map((_s: unknown, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "h-2.5 flex-1 rounded-full transition-all",
                    i < stepIndex
                      ? "bg-primary"
                      : i === stepIndex
                        ? "bg-primary galaxy-glow"
                        : "bg-muted/60",
                  )}
                />
              ))}
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              Step {stepIndex + 1} of {lesson.steps.length}
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="font-display font-black text-2xl text-foreground">
                  {step.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                  {step.instruction}
                </p>

                {/* Step nav moved here */}
                <div className="mt-6 flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                    disabled={isFirst}
                    className="rounded-full flex-1 font-bold h-12"
                  >
                    <ArrowLeft className="mr-1 h-5 w-5" /> Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={goNext}
                    className="rounded-full flex-1 font-bold galaxy-glow h-12"
                  >
                    {isLast ? (
                      <>
                        Finish <PartyPopper className="ml-1 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="ml-1 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full h-12 w-12 shrink-0 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all shadow-lg galaxy-glow"
                onClick={handleRepeat}
                title="Repeat instruction"
              >
                <Volume2 className="h-6 w-6 text-primary" />
              </Button>
            </div>

            {step.tip && (
              <div className="mt-4 rounded-2xl bg-accent/15 border border-accent/40 p-3">
                <span className="font-bold text-accent">💡 Tip: </span>
                <span className="text-foreground/90">{step.tip}</span>
              </div>
            )}

            {isLast && (
              <div className="mt-5 rounded-2xl bg-primary/10 border border-primary/40 p-4 flex items-center gap-3 galaxy-glow">
                <PartyPopper className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <div className="font-display font-extrabold">Almost done!</div>
                  <div className="text-sm text-muted-foreground">
                    Tap "Finish" to celebrate your art!
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT: drawing pad */}
        <section className="relative min-h-[50vh] lg:min-h-0 p-3 lg:p-6 animate-in fade-in zoom-in-95 duration-700">
          <Suspense fallback={
            <div className="flex h-full items-center justify-center galaxy-card rounded-3xl border-2 border-[var(--galaxy-teal)]/30 bg-[#fdfaf3]">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <span className="font-bold text-muted-foreground">Preparing your magic canvas...</span>
              </div>
            </div>
          }>
            <KonvaCanvas ref={canvasRef} fileName={`${lesson.slug}-drawing`} />
          </Suspense>
        </section>
      </div>

      {/* Other lessons quick switcher */}
      <div className="hidden md:flex relative items-center gap-2 px-4 py-2 border-t border-[var(--galaxy-teal)]/20 bg-card/40 backdrop-blur overflow-x-auto">
        <span className="text-xs font-bold text-muted-foreground mr-2 shrink-0">
          More to draw:
        </span>
        {lessons
          .filter((l) => l.slug !== lesson.slug)
          .map((l) => (
            <Link
              key={l.slug}
              to="/draw/$slug"
              params={{ slug: l.slug }}
              preload="intent"
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary/50 hover:bg-secondary border border-[var(--galaxy-teal)]/20 px-3 py-1 text-sm font-semibold whitespace-nowrap transition-all hover:galaxy-glow"
            >
              <span>{l.emoji}</span>
              <span>{l.shortTitle}</span>
            </Link>
          ))}
      </div>

      <CelebrationModal
        open={showCelebration}
        onOpenChange={setShowCelebration}
        subject={lesson.shortTitle}
        onSave={handleSavePng}
        onStartNew={handleStartNew}
      />
    </div>
  );
}
