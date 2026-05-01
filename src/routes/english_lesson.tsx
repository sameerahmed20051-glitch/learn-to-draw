import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Volume2, CheckCircle2, XCircle, Star, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpeech } from "@/hooks/use-speech";

export const Route = createFileRoute("/english_lesson")({
  component: EnglishLessonPage,
});

// ── helpers ──────────────────────────────────────────────────────────────────
const AUDIO = (name: string) => `/audio/english/${name}.mp3`;
const WORD_AUDIO = (w: string) => `/audio/english/words/${w.toLowerCase().replace(/[^a-z]/g, "")}.mp3`;

// Sentences for Activity 1 (ordering)
const ORDER_ACTIVITIES = [
  { words: ["The", "dog", "ran."], emoji: "🐶" },
  { words: ["The", "red", "ball", "rolled."], emoji: "⚽" },
  { words: ["The", "little", "bird", "sang."], emoji: "🐦" },
];

// Sentences for Activity 2 (broken vs smooth)
const LISTEN_ACTIVITIES = [
  {
    broken: "The. Red. Ball. Rolled.",
    smooth: "The red ball rolled.",
    brokenAudio: AUDIO("card-1-broken"),
    smoothAudio: AUDIO("card-1-smooth"),
    emoji: "⚽",
  },
  {
    broken: "The. Little. Bird. Sang.",
    smooth: "The little bird sang.",
    brokenAudio: AUDIO("card-1-broken"),
    smoothAudio: AUDIO("card-1-smooth"),
    emoji: "🐦",
  },
];

// ── sub-components ────────────────────────────────────────────────────────────

function CardShell({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700",
        bg
      )}
    >
      {children}
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-3 justify-center py-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 rounded-full transition-all duration-500",
            i < current ? "w-8 bg-sky-500" : i === current ? "w-8 bg-sky-400" : "w-3 bg-slate-200"
          )}
        />
      ))}
    </div>
  );
}

function WordChip({ word, playAudio, speakFallback }: { word: string; playAudio: (url: string) => void; speakFallback: (t: string) => void }) {
  const [active, setActive] = useState(false);
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  const handleClick = () => {
    setActive(true);
    // Try playing MP3 first, if it fails (handled in useSpeech usually), but here we can't easily check 'exists'
    // So we'll try to use a heuristic or just use speakFallback if it's a common word not in our generated list
    const commonWords = [
      "a", "sentence", "should", "sound", "like", "thought", "is", "not", "only", "row", "of", "words", 
      "it", "one", "idea", "the", "work", "together", "to", "carry", "that", "dog", "ran", "in", "year", 
      "many", "readers", "read", "word", "by", "completely", "normal", "means", "your", "brain", 
      "working", "hard", "you", "are", "looking", "at", "letters", "remembering", "sounds", "and", 
      "blending", "them", "wonderful", "but", "reading", "must", "keep", "growing", "strong", 
      "reader", "works", "out", "then", "reads", "again", "so", "can", "join", "small", "basket", 
      "each", "sits", "inside", "if", "stay", "too", "far", "apart", "may", "fall", "sit", 
      "carries", "whole", "real", "writer", "asks", "two", "important", "questions", "first", 
      "did", "i", "say", "correctly", "second", "clearly", "this", "called", "check", "use", 
      "every", "time", "red", "ball", "rolled", "little", "bird", "sang", "practising", "brilliant"
    ];
    
    if (commonWords.includes(clean)) {
      playAudio(WORD_AUDIO(clean));
    } else {
      speakFallback(word);
    }
    setTimeout(() => setActive(false), 600);
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-lg transition-all border-2 select-none",
        active
          ? "bg-amber-400 border-amber-500 text-white scale-110 shadow-md"
          : "bg-white/50 border-transparent text-slate-800 hover:bg-sky-100 hover:border-sky-200"
      )}
    >
      {word}
    </button>
  );
}

function ClickableText({ text, playAudio, speakFallback, className }: { text: string; playAudio: (url: string) => void; speakFallback: (t: string) => void; className?: string }) {
  const words = text.split(" ");
  return (
    <div className={cn("flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((w, i) => (
        <WordChip key={i} word={w} playAudio={playAudio} speakFallback={speakFallback} />
      ))}
    </div>
  );
}

// ── Reading Card 1 ────────────────────────────────────────────────────────────
function Card1({ onNext, playAudio, speakFallback }: { onNext: () => void; playAudio: (u: string) => void; speakFallback: (t: string) => void }) {
  useEffect(() => { playAudio(AUDIO("card-1-intro")); }, []);

  return (
    <CardShell bg="bg-[#EFF6FF]">
      <div className="max-w-3xl mx-auto w-full px-6 flex-1 flex flex-col">
        <ProgressDots total={4} current={0} />

        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-sky-400">Part 1 of 2 · Reading</span>
          <button onClick={() => playAudio(AUDIO("card-1-intro"))} className="p-3 rounded-2xl bg-sky-100 hover:bg-sky-200 transition">
            <Volume2 className="h-6 w-6 text-sky-500" />
          </button>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
          <ClickableText text="A sentence should sound like a thought!" playAudio={playAudio} speakFallback={speakFallback} className="text-5xl md:text-6xl font-black" />
        </h1>

        <div className="mb-10">
          <ClickableText 
            text="A sentence is not only a row of words. It is one idea. The words work together to carry that idea." 
            playAudio={playAudio} 
            speakFallback={speakFallback} 
            className="text-2xl md:text-3xl text-slate-600 font-bold"
          />
        </div>

        {/* Broken vs Smooth */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-[32px] p-8 border-4 border-red-100 shadow-md space-y-4">
            <div className="text-sm font-black uppercase tracking-widest text-red-400">Broken Way ❌</div>
            <button
              onClick={() => playAudio(AUDIO("card-1-broken"))}
              className="w-full text-3xl font-serif italic text-slate-400 tracking-widest text-left hover:text-slate-600 transition flex items-center gap-3"
            >
              <Volume2 className="h-7 w-7 text-red-300 shrink-0" />
              The. Dog. Ran.
            </button>
            <p className="text-lg text-slate-400 font-medium">Hard to hold the thought!</p>
          </div>

          <div className="bg-white rounded-[32px] p-8 border-4 border-green-100 shadow-md space-y-4">
            <div className="text-sm font-black uppercase tracking-widest text-green-500">Smooth Way ✅</div>
            <button
              onClick={() => playAudio(AUDIO("card-1-smooth"))}
              className="w-full text-3xl font-black text-slate-800 tracking-tight text-left hover:text-sky-700 transition flex items-center gap-3"
            >
              <Volume2 className="h-7 w-7 text-green-400 shrink-0" />
              The dog ran.
            </button>
            <p className="text-lg text-slate-500 font-medium">Sounds like one thought!</p>
          </div>
        </div>

        <p className="text-xl text-slate-500 font-bold mb-4">Tap any word above to hear it!</p>

        <Button
          onClick={onNext}
          className="mt-auto h-20 rounded-[24px] bg-sky-500 hover:bg-sky-400 text-white text-2xl font-black shadow-[0_8px_0_#0284c7] active:translate-y-2 active:shadow-none transition-all"
        >
          Activity Time! <ArrowRight className="ml-3 h-7 w-7" />
        </Button>
        <div className="h-8" />
      </div>
    </CardShell>
  );
}

// ── Activity Card 1: Smooth It! ───────────────────────────────────────────────
function Card2({ onNext, playAudio }: { onNext: () => void; playAudio: (u: string) => void }) {
  const [actIdx, setActIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [stars, setStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const act = ORDER_ACTIVITIES[actIdx];
  const [shuffled, setShuffled] = useState<string[]>([]);

  useEffect(() => {
    setShuffled([...act.words].sort(() => Math.random() - 0.5));
  }, [actIdx, act.words]);

  useEffect(() => { playAudio(AUDIO("card-2-intro")); }, []);

  const handleWord = (word: string) => {
    if (done) return;
    const next = [...selected, word];
    setSelected(next);
    playAudio(WORD_AUDIO(word.replace(/[^a-zA-Z]/g, "")));
    if (next.length === act.words.length) {
      const correct = next.join(" ") === act.words.join(" ");
      setAttempts(a => a + 1);
      if (correct) {
        setDone(true);
        setStars(attempts === 0 ? 3 : attempts === 1 ? 2 : 1);
        playAudio(AUDIO("card-2-correct"));
      } else {
        setWrong(true);
        setTimeout(() => { setSelected([]); setWrong(false); }, 900);
        playAudio(AUDIO("card-2-try-again"));
      }
    }
  };

  const goNext = () => {
    if (actIdx < ORDER_ACTIVITIES.length - 1) {
      setActIdx(i => i + 1);
      setSelected([]); setDone(false); setWrong(false); setAttempts(0);
      playAudio(AUDIO("card-2-intro"));
    } else {
      onNext();
    }
  };

  const remaining = shuffled.filter(w => !selected.includes(w));

  return (
    <CardShell bg="bg-[#FFFBEB]">
      <div className="max-w-3xl mx-auto w-full px-6 flex-1 flex flex-col">
        <ProgressDots total={4} current={1} />
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-500">Activity 1 · Smooth It!</span>
          <button onClick={() => playAudio(AUDIO("card-2-intro"))} className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 transition">
            <Volume2 className="h-6 w-6 text-amber-500" />
          </button>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">Tap the words in order! {act.emoji}</h2>
        <p className="text-xl text-slate-500 font-bold mb-8">Build the sentence so the thought comes through!</p>

        {/* Answer slots */}
        <div className="bg-white rounded-[32px] p-8 border-4 border-amber-100 mb-8 min-h-[100px] flex flex-wrap gap-4 items-center shadow-md">
          {selected.length === 0 && (
            <span className="text-slate-300 text-2xl font-bold">Tap words below...</span>
          )}
          {selected.map((w, i) => (
            <span key={i} className={cn(
              "px-5 py-3 rounded-2xl text-3xl font-black transition-all",
              done ? "bg-green-100 text-green-700 border-4 border-green-200" : wrong ? "bg-red-100 text-red-500 border-4 border-red-200 animate-pulse" : "bg-amber-50 text-slate-800 border-4 border-amber-200"
            )}>
              {w}
            </span>
          ))}
          {done && <CheckCircle2 className="h-10 w-10 text-green-500 ml-2" />}
        </div>

        {/* Word pool */}
        <div className="flex flex-wrap gap-4 mb-8">
          {remaining.map((w, i) => (
            <button
              key={i}
              onClick={() => handleWord(w)}
              className="px-6 py-4 rounded-2xl bg-white border-4 border-amber-200 text-3xl font-black text-slate-800 hover:bg-amber-50 hover:scale-105 active:scale-95 shadow-[0_6px_0_#fcd34d] active:translate-y-1.5 active:shadow-none transition-all"
            >
              {w}
            </button>
          ))}
        </div>

        {/* Stars + reset */}
        {done ? (
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {[1, 2, 3].map(n => (
                <Star key={n} className={cn("h-12 w-12 transition-all", n <= stars ? "text-amber-400 fill-amber-400 scale-110" : "text-slate-200 fill-slate-200")} />
              ))}
            </div>
            <Button onClick={goNext} className="w-full h-20 rounded-[24px] bg-green-500 hover:bg-green-400 text-white text-2xl font-black shadow-[0_8px_0_#16a34a] active:translate-y-2 active:shadow-none transition-all">
              {actIdx < ORDER_ACTIVITIES.length - 1 ? "Next Sentence!" : "Keep Going!"} <ArrowRight className="ml-3 h-7 w-7" />
            </Button>
          </div>
        ) : (
          <button onClick={() => { setSelected([]); setWrong(false); }} className="text-slate-400 font-bold hover:text-slate-600 transition">
            Reset ↺
          </button>
        )}
        <div className="h-8" />
      </div>
    </CardShell>
  );
}

// ── Reading Card 2 ────────────────────────────────────────────────────────────
function Card3({ onNext, playAudio, speakFallback }: { onNext: () => void; playAudio: (u: string) => void; speakFallback: (t: string) => void }) {
  useEffect(() => { playAudio(AUDIO("card-3-intro")); }, []);

  return (
    <CardShell bg="bg-[#F0FDF4]">
      <div className="max-w-3xl mx-auto w-full px-6 flex-1 flex flex-col">
        <ProgressDots total={4} current={2} />
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-green-500">Part 2 of 2 · Reading</span>
          <button onClick={() => playAudio(AUDIO("card-3-intro"))} className="p-3 rounded-2xl bg-green-100 hover:bg-green-200 transition">
            <Volume2 className="h-6 w-6 text-green-500" />
          </button>
        </div>

        <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
          Words in a <span className="text-green-500 italic">Basket!</span> 🧺
        </h2>

        <div className="bg-white rounded-[32px] p-8 border-4 border-green-100 shadow-md mb-6 space-y-4">
          <div className="flex items-start gap-3 w-full text-left group">
            <Volume2 onClick={() => playAudio(AUDIO("card-3-basket"))} className="h-7 w-7 text-green-400 mt-1 shrink-0 group-hover:text-green-600 transition cursor-pointer" />
            <ClickableText 
              text="A sentence is like a small basket. Each word is inside. If words stay too far apart, the thought may fall out. If they sit together, the basket carries the thought!" 
              playAudio={playAudio} 
              speakFallback={speakFallback} 
              className="text-2xl md:text-3xl text-slate-700 font-bold"
            />
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border-4 border-amber-100 shadow-md mb-8 space-y-4">
          <button onClick={() => playAudio(AUDIO("card-3-check"))} className="flex items-start gap-3 w-full text-left group">
            <Volume2 className="h-7 w-7 text-amber-400 mt-1 shrink-0 group-hover:text-amber-600 transition" />
            <div className="space-y-3">
              <p className="text-2xl font-black text-slate-800">The Thought Check 💡</p>
              <p className="text-xl text-slate-600 font-bold">Ask yourself two questions after reading:</p>
              <p className="text-xl text-amber-700 font-bold">"Did I say the words correctly?"</p>
              <p className="text-xl text-amber-700 font-bold">"Did the sentence say its thought clearly?"</p>
            </div>
          </button>
        </div>

        <div className="bg-emerald-50 rounded-[28px] p-6 border-4 border-emerald-100 mb-8">
          <p className="text-xl font-black text-emerald-800 leading-snug">
            Reading word by word is okay! That means your brain is working hard. But keep growing — a strong reader reads again so the words can join! 💪
          </p>
        </div>

        <Button onClick={onNext} className="mt-auto h-20 rounded-[24px] bg-green-500 hover:bg-green-400 text-white text-2xl font-black shadow-[0_8px_0_#16a34a] active:translate-y-2 active:shadow-none transition-all">
          Final Activity! <ArrowRight className="ml-3 h-7 w-7" />
        </Button>
        <div className="h-8" />
      </div>
    </CardShell>
  );
}

// ── Activity Card 2: Tap the Right Way ───────────────────────────────────────
function Card4({ onNext, playAudio }: { onNext: () => void; playAudio: (u: string) => void }) {
  const [actIdx, setActIdx] = useState(0);
  const [chosen, setChosen] = useState<"broken" | "smooth" | null>(null);
  const [stars, setStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const act = LISTEN_ACTIVITIES[actIdx];

  useEffect(() => { playAudio(AUDIO("card-4-intro")); }, []);

  const handleChoose = (choice: "broken" | "smooth") => {
    if (chosen) return;
    setChosen(choice);
    setAttempts(a => a + 1);
    if (choice === "smooth") {
      setStars(attempts === 0 ? 3 : 2);
      playAudio(AUDIO("card-4-correct"));
    } else {
      playAudio(AUDIO("card-4-try-again"));
    }
  };

  const goNext = () => {
    if (actIdx < LISTEN_ACTIVITIES.length - 1) {
      setActIdx(i => i + 1);
      setChosen(null); setAttempts(0);
      playAudio(AUDIO("card-4-intro"));
    } else {
      onNext();
    }
  };

  const correct = chosen === "smooth";

  return (
    <CardShell bg="bg-[#F5F3FF]">
      <div className="max-w-3xl mx-auto w-full px-6 flex-1 flex flex-col">
        <ProgressDots total={4} current={3} />
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Activity 2 · Tap the Right Way!</span>
          <button onClick={() => playAudio(AUDIO("card-4-intro"))} className="p-3 rounded-2xl bg-indigo-100 hover:bg-indigo-200 transition">
            <Volume2 className="h-6 w-6 text-indigo-500" />
          </button>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">Which one sounds like a thought? {act.emoji}</h2>
        <p className="text-xl text-slate-500 font-bold mb-10">Press the speaker to listen, then tap the one that sounds smooth!</p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Broken option */}
          <button
            onClick={() => handleChoose("broken")}
            className={cn(
              "p-8 rounded-[32px] border-4 text-left space-y-4 transition-all",
              chosen === "broken" ? "border-red-400 bg-red-50 scale-95" : "border-slate-200 bg-white hover:border-red-200 hover:scale-105"
            )}
          >
            <button
              onClick={(e) => { e.stopPropagation(); playAudio(act.brokenAudio); }}
              className="flex items-center gap-3 text-red-400 font-black text-base uppercase tracking-wider hover:text-red-600 transition"
            >
              <Volume2 className="h-7 w-7" /> Play Option A
            </button>
            <p className="text-3xl font-serif italic text-slate-500 tracking-widest">{act.broken}</p>
            {chosen === "broken" && <XCircle className="h-10 w-10 text-red-500" />}
          </button>

          {/* Smooth option */}
          <button
            onClick={() => handleChoose("smooth")}
            className={cn(
              "p-8 rounded-[32px] border-4 text-left space-y-4 transition-all",
              chosen === "smooth" ? "border-green-400 bg-green-50 scale-105 shadow-xl" : "border-slate-200 bg-white hover:border-green-200 hover:scale-105"
            )}
          >
            <button
              onClick={(e) => { e.stopPropagation(); playAudio(act.smoothAudio); }}
              className="flex items-center gap-3 text-green-500 font-black text-base uppercase tracking-wider hover:text-green-700 transition"
            >
              <Volume2 className="h-7 w-7" /> Play Option B
            </button>
            <p className="text-3xl font-black text-slate-800 tracking-tight">{act.smooth}</p>
            {chosen === "smooth" && <CheckCircle2 className="h-10 w-10 text-green-500" />}
          </button>
        </div>

        {chosen && (
          <div className={cn("rounded-[24px] p-6 text-center mb-6 animate-in zoom-in duration-500", correct ? "bg-green-100 border-4 border-green-200" : "bg-red-50 border-4 border-red-100")}>
            <p className={cn("text-2xl font-black", correct ? "text-green-700" : "text-red-600")}>
              {correct ? "Brilliant! That sounds like a real thought! 🌟" : "Good try! Option B sounds smoother. Listen again!"}
            </p>
            {correct && (
              <div className="flex justify-center gap-3 mt-4">
                {[1, 2, 3].map(n => <Star key={n} className={cn("h-10 w-10", n <= stars ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200")} />)}
              </div>
            )}
          </div>
        )}

        {chosen && (
          <Button onClick={goNext} className="h-20 rounded-[24px] bg-indigo-600 hover:bg-indigo-500 text-white text-2xl font-black shadow-[0_8px_0_#4338ca] active:translate-y-2 active:shadow-none transition-all">
            {actIdx < LISTEN_ACTIVITIES.length - 1 ? "Next One!" : "Finish Lesson!"} <ArrowRight className="ml-3 h-7 w-7" />
          </Button>
        )}
        <div className="h-8" />
      </div>
    </CardShell>
  );
}

// ── Finale ────────────────────────────────────────────────────────────────────
function CardFinale({ playAudio }: { playAudio: (u: string) => void }) {
  useEffect(() => { playAudio(AUDIO("finale")); }, []);
  return (
    <CardShell bg="bg-[#FFFBEB]">
      <div className="max-w-2xl mx-auto w-full px-6 flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="text-9xl animate-bounce">🎉</div>
        <h2 className="text-6xl font-black text-slate-900 leading-[1.1]">
          You're a Real <span className="text-sky-500">Reader-Writer!</span>
        </h2>
        <p className="text-2xl text-slate-600 font-bold">
          Amazing work today! Remember the Thought Check every time you read. Keep growing!
        </p>
        <div className="flex gap-3 justify-center">
          {[1, 2, 3].map(n => <Star key={n} className="h-14 w-14 text-amber-400 fill-amber-400 animate-pulse" style={{ animationDelay: `${n * 0.2}s` }} />)}
        </div>
        <Link to="/">
          <Button className="h-20 px-12 rounded-[24px] bg-sky-500 hover:bg-sky-400 text-white text-2xl font-black shadow-[0_8px_0_#0284c7] active:translate-y-2 active:shadow-none transition-all">
            <Home className="mr-3 h-7 w-7" /> Back Home
          </Button>
        </Link>
      </div>
    </CardShell>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function EnglishLessonPage() {
  const [card, setCard] = useState(0);
  const { playAudio, stop, speakFallback } = useSpeech();

  const next = useCallback(() => { stop(); setCard(c => c + 1); }, [stop]);

  return (
    <div className="relative" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Nav */}
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <button onClick={stop} className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur border-2 border-slate-200 text-slate-600 font-black hover:bg-white transition shadow-sm">
            <ArrowLeft className="h-5 w-5" /> Home
          </button>
        </Link>
      </div>

      {card === 0 && <Card1 onNext={next} playAudio={playAudio} speakFallback={speakFallback} />}
      {card === 1 && <Card2 onNext={next} playAudio={playAudio} />}
      {card === 2 && <Card3 onNext={next} playAudio={playAudio} speakFallback={speakFallback} />}
      {card === 3 && <Card4 onNext={next} playAudio={playAudio} />}
      {card === 4 && <CardFinale playAudio={playAudio} />}
    </div>
  );
}
