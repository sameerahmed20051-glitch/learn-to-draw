import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/use-speech";
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Pause,
  Play,
  Home, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ALIGNMENT } from "@/data/alignment";

export const Route = createFileRoute("/english_lesson")({
  head: () => ({ meta: [{ title: "English Lesson — Year 1" }] }),
  component: EnglishLessonPage,
});

// ── Audio helpers ──────────────────────────────────────────────────────────
const A = (name: string) => `/audio/english/${name}.mp3`;
const W = (word: string) => `/audio/english/words/${word.toLowerCase().replace(/[^a-z]/g, "")}.mp3`;

// ── Card Definitions ────────────────────────────────────────────────────────
type CardID = "part1-read" | "part1-act" | "part2-read" | "part2-act" | "finale";

interface Card {
  id: CardID;
  type: "reading" | "activity" | "celebration";
  title: string;
  color: "sky" | "amber" | "purple" | "green";
  audioKey: string;
}

const CARDS: Card[] = [
  { id: "part1-read", type: "reading", title: "Part 1: The Thought", color: "sky", audioKey: "part1-reading" },
  { id: "part1-act", type: "activity", title: "Activity 1", color: "amber", audioKey: "card-2-intro" },
  { id: "part2-read", type: "reading", title: "Part 2: The Basket", color: "purple", audioKey: "part2-reading" },
  { id: "part2-act", type: "activity", title: "Activity 2", color: "amber", audioKey: "card-2-intro" },
  { id: "finale", type: "celebration", title: "Well Done!", color: "green", audioKey: "finale" },
];

const SENTENCES = [
  { words: ["The", "dog", "ran."], emoji: "🐶" },
  { words: ["The", "red", "ball", "rolled."], emoji: "⚽" },
  { words: ["The", "little", "bird", "sang."], emoji: "🐦" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Components ─────────────────────────────────────────────────────────────

function PipMascot({ mood = "idle" }: { mood?: "idle" | "speaking" | "happy" }) {
  return (
    <div className={cn(
      "w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 shrink-0",
      mood === "speaking" && "animate-bounce",
      mood === "happy" && "scale-110 animate-pulse"
    )}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <circle cx="50" cy="55" r="40" fill="#4B5563" className="filter drop-shadow-[0_0_10px_rgba(75,85,99,0.5)]" />
        <circle cx="35" cy="45" r="12" fill="white" />
        <circle cx="65" cy="45" r="12" fill="white" />
        <circle cx="35" cy="45" r="5" fill="black" />
        <circle cx="65" cy="45" r="5" fill="black" />
        <path d="M45 55 L55 55 L50 65 Z" fill="#F59E0B" />
        {mood === "happy" && (
           <path d="M30 75 Q50 85 70 75" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}

function StoryText({ text, onTap, activeWordIndex, wordOffset = 0 }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const words = text.split(/\s+/);
  return (
    <p className="text-xl md:text-3xl font-rajdhani font-bold leading-relaxed text-white/90 text-center max-w-4xl tracking-wide">
      {words.map((w: string, i: number) => {
        const globalIdx = wordOffset + i;
        const isActive = mounted && activeWordIndex === globalIdx;
        return (
          <button 
            key={i} 
            onClick={() => onTap(w, globalIdx)} 
            className={cn(
              "inline-block px-1 rounded-lg transition-all duration-150 mx-1 relative border-b-2 border-transparent",
              isActive 
                ? "text-primary scale-110 border-primary drop-shadow-[0_0_8px_rgba(191,100,50,0.5)]" 
                : "hover:text-primary/70"
            )}
          >
            {w}
          </button>
        );
      })}
    </p>
  );
}

function ExampleBox({ children, title, color = "indigo" }: any) {
  return (
    <div className="glass-card p-6 md:p-8 relative my-6 animate-in zoom-in duration-500 w-full max-w-2xl">
      {title && (
        <p className="absolute -top-3 left-6 px-4 py-0.5 bg-background border border-primary/30 text-[10px] font-orbitron font-black uppercase tracking-[0.2em] rounded-full text-primary shadow-[0_0_10px_rgba(191,100,50,0.2)]">
          {title}
        </p>
      )}
      <div className="flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────

function EnglishLessonPage() {
  const [index, setIndex] = useState(0);
  const [mood, setMood] = useState<"idle" | "speaking" | "happy">("idle");
  const [activeWordIdx, setActiveWordIdx] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioObjRef = useRef<HTMLAudioElement | null>(null);
  const onTimeUpdateRef = useRef<(() => void) | null>(null);
  
  const { playAudio, preloadAudio, pause, resume, stop } = useSpeech();
  
  const [actStep, setActStep] = useState(0);
  const [pool, setPool] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [actState, setActState] = useState<"playing" | "correct" | "wrong">("playing");

  const card = CARDS[index];

  const part1Text = "A sentence should sound like a thought. A sentence is not only a row of words. It is one idea. The words work together to carry that idea. When we read a sentence, we need to hear the whole thought. Look at this sentence: The dog ran. If we read it like this: The. Dog. Ran. The words are right, but the thought sounds broken. Now read it like this: The dog ran. Now it sounds more like one thought. A Real Reader-Writer knows that careful reading comes first. We do not rush. We do not guess. We read the words from the print. After we read the words, we can read the sentence again so the thought can come through. In Year 1, many readers begin by reading word by word. That is normal. It means the mind is working hard. The reader is looking at letters, remembering sounds, blending, and checking. That is good work! But reading must keep growing. A weak reader stops at every word. A strong reader works out the words, then reads again so the words can join. This is careful reading becoming smoother.";
  const part2Text = "A sentence is like a small basket. Each word sits inside the basket. If the words stay too far apart, the thought may fall out. If the words sit together in the right way, the basket can carry the whole thought. A real reader writer asks two important questions. First, did I say the words correctly? Second, did the sentence say its thought clearly? This question helps reading grow! When a sentence sounds like a thought, the mind can hold it better. The reader can understand more. The listener can understand more too. If you read in a broken way, the listener may hear the words, but the meaning is hard to hold. If you read clearly and smoothly, the listener can follow the thought. Now, a Moment to Picture. Close your eyes. Listen to this: The little bird sang. Can you picture one thought? Imagine words falling away. It is harder to hold! Rereading is not weak. It helps the line carry meaning. Today, let the sentence sound like a thought.";

  useEffect(() => {
    CARDS.forEach(c => preloadAudio(A(c.audioKey)));
  }, [preloadAudio]);

  const cleanupAudio = useCallback(() => {
    if (audioObjRef.current) {
      if (onTimeUpdateRef.current) {
        audioObjRef.current.removeEventListener("timeupdate", onTimeUpdateRef.current);
      }
      audioObjRef.current.pause();
      audioObjRef.current = null;
    }
    setActiveWordIdx(-1);
    setMood("idle");
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const onTimeUpdate = useCallback((words: string[], audio: HTMLAudioElement) => {
    if (!audio.duration || isNaN(audio.duration)) return;

    const alignment = card.id === "part1-read" ? ALIGNMENT.part1 : card.id === "part2-read" ? ALIGNMENT.part2 : [];
    if (alignment.length > 0) {
      const currentWord = alignment.find(w => audio.currentTime >= w.start && audio.currentTime <= w.end);
      if (currentWord) setActiveWordIdx(alignment.indexOf(currentWord));
    } else {
      const progress = audio.currentTime / audio.duration;
      const currentIdx = Math.floor(progress * words.length);
      setActiveWordIdx(currentIdx);
    }
  }, [card.id]);

  const playMain = useCallback(async () => {
    stop();
    cleanupAudio();
    setMood("speaking");
    setIsPlaying(true);
    try {
      const audio = await playAudio(A(card.audioKey));
      if (audio) {
        audioObjRef.current = audio;
        const text = card.id === "part1-read" ? part1Text : card.id === "part2-read" ? part2Text : "";
        const words = text ? text.split(/\s+/) : [];
        const updateFn = () => onTimeUpdate(words, audio);
        onTimeUpdateRef.current = updateFn;
        audio.addEventListener("timeupdate", updateFn);
        audio.onended = () => cleanupAudio();
      }
    } catch (err) {
      setMood("idle");
      setIsPlaying(false);
    }
  }, [card, playAudio, stop, cleanupAudio, onTimeUpdate]);

  const togglePause = useCallback(() => {
    if (isPaused) { resume(); setIsPaused(false); setMood("speaking"); }
    else { pause(); setIsPaused(true); setMood("idle"); }
  }, [isPaused, pause, resume]);

  useEffect(() => {
    playMain();
    if (card.type === "activity") {
       setActStep(0);
       resetActivity(0);
    }
    return cleanupAudio;
  }, [index, playMain, cleanupAudio]);

  const resetActivity = (step: number) => {
    setPool(shuffle(SENTENCES[step].words));
    setAnswer([]);
    setActState("playing");
    setMood("idle");
  };

  const onWordTap = (word: string, idx: number) => {
    cleanupAudio(); stop(); setActiveWordIdx(idx);
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    playAudio(W(clean));
    setTimeout(() => setActiveWordIdx(-1), 1000);
  };

  const next = () => setIndex(i => Math.min(i + 1, CARDS.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-background">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,100,50,0.03),transparent_70%)]" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white/5 border border-white/10 h-10 w-10 hover:bg-white/10">
              <Home className="h-5 w-5 text-white/70" />
            </Button>
          </Link>
          <div>
            <h1 className="font-orbitron font-black text-xs md:text-sm uppercase tracking-[0.2em] text-primary leading-none">Command Portal</h1>
            <p className="text-[10px] font-rajdhani font-bold text-white/40 mt-1 uppercase tracking-widest">English Module // Grade 1-3</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <PipMascot mood={mood} />
          <div className="flex items-center gap-3">
            {isPlaying && (
              <button onClick={togglePause} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white shadow-lg flex items-center justify-center hover:bg-white/10 transition-all">
                {isPaused ? <Play className="h-5 w-5 fill-white" /> : <Pause className="h-5 w-5 fill-white" />}
              </button>
            )}
            <button onClick={playMain} className="w-14 h-14 rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(191,100,50,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
              <Volume2 className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col items-center py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {card.id === "part1-read" && (
            <div className="space-y-12 flex flex-col items-center">
              <StoryText text="A sentence should sound like a thought. A sentence is not only a row of words. It is one idea. The words work together to carry that idea. When we read a sentence, we need to hear the whole thought." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={0} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <ExampleBox title="Broken Flow" color="red">
                  <div className="flex flex-col items-center justify-center h-24">
                    <StoryText text="The. Dog. Ran." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={53} />
                  </div>
                </ExampleBox>
                <ExampleBox title="Smooth Flow" color="green">
                  <div className="flex flex-col items-center justify-center h-24">
                    <StoryText text="The dog ran." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={70} />
                  </div>
                </ExampleBox>
              </div>

              <StoryText text="A Real Reader-Writer knows that careful reading comes first. We do not rush. We do not guess. We read the words from the print. After we read the words, we can read the sentence again so the thought can come through." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={80} />

              <StoryText text="In Year 1, many readers begin by reading word by word. That is normal. It means the mind is working hard. The reader is looking at letters, remembering sounds, blending, and checking. That is good work! But reading must keep growing. A weak reader stops at every word. A strong reader works out the words, then reads again so the words can join. This is careful reading becoming smoother." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={121} />
            </div>
          )}

          {card.id === "part1-act" && (
             <ActivityComponent pool={pool} answer={answer} state={actState} setPool={setPool} setAnswer={setAnswer} sentence={SENTENCES[actStep]}
               onCheck={() => {
                 if (answer.join(" ") === SENTENCES[actStep].words.join(" ")) { setActState("correct"); setMood("happy"); }
                 else { setActState("wrong"); }
               }}
               onNext={() => next()} onRetry={() => resetActivity(actStep)} />
          )}

          {card.id === "part2-read" && (
            <div className="space-y-12 flex flex-col items-center">
              <div className="flex items-center justify-center gap-6">
                 <span className="text-7xl drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">🧺</span>
                 <ExampleBox>
                    <StoryText text="A sentence is like a small basket." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={0} />
                 </ExampleBox>
              </div>
              
              <StoryText text="Each word sits inside the basket. If the words stay too far apart, the thought may fall out. If the words sit together in the right way, the basket can carry the whole thought." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={7} />

              <StoryText text="A real reader writer asks two important questions." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={41} />

              <ExampleBox title="System Check">
                 <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center">
                    <StoryText text="First, did I say the words correctly?" onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={49} />
                    <StoryText text="Second, did the sentence say its thought clearly?" onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={56} />
                 </div>
              </ExampleBox>

              <StoryText text="This question helps reading grow!" onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={64} />

              <StoryText text="When a sentence sounds like a thought, the mind can hold it better. The reader can understand more. The listener can understand more too. If you read in a broken way, the listener may hear the words, but the meaning is hard to hold. If you read clearly and smoothly, the listener can follow the thought." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={69} />

              <ExampleBox title="A Moment to Picture">
                <div className="flex flex-col items-center gap-4">
                  <StoryText text="Now, a Moment to Picture. Close your eyes. Listen to this: The little bird sang. Can you picture one thought? Imagine words falling away. It is harder to hold!" onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={125} />
                </div>
              </ExampleBox>

              <StoryText text="Rereading is not weak. It helps the line carry meaning. Today, let the sentence sound like a thought." onTap={onWordTap} activeWordIndex={activeWordIdx} wordOffset={154} />
            </div>
          )}

          {card.id === "part2-act" && (
             <ActivityComponent pool={pool} answer={answer} state={actState} setPool={setPool} setAnswer={setAnswer} sentence={SENTENCES[actStep + 1]}
               onCheck={() => {
                 if (answer.join(" ") === SENTENCES[actStep + 1].words.join(" ")) { setActState("correct"); setMood("happy"); }
                 else { setActState("wrong"); }
               }}
               onNext={() => next()} onRetry={() => resetActivity(actStep + 1)} />
          )}

          {card.id === "finale" && (
            <div className="text-center space-y-12 py-20">
              <div className="text-[12rem] animate-bounce drop-shadow-[0_0_50px_rgba(191,100,50,0.5)]">🏆</div>
              <h2 className="text-7xl font-orbitron font-black text-primary tracking-tighter uppercase neon-text">Mission Complete</h2>
              <p className="text-3xl font-rajdhani font-bold text-white/50 max-w-md mx-auto">
                AUTHENTICATED AS: <span className="text-white underline">REAL READER-WRITER</span>
              </p>
              <div className="flex gap-6 justify-center pt-8">
                <Button onClick={() => setIndex(0)} className="h-20 px-16 rounded-2xl bg-white/5 border border-white/10 text-white/50 text-2xl font-orbitron font-bold hover:bg-white/10 transition-all">REPLAY</Button>
                <Link to="/">
                  <Button className="h-20 px-20 rounded-2xl bg-primary text-primary-foreground text-3xl font-orbitron font-black shadow-[0_0_30px_rgba(191,100,50,0.3)] hover:scale-105 transition-all">PORTAL HOME</Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Navigation */}
      <footer className="relative z-20 px-8 py-6 border-t border-white/5 bg-background/50 backdrop-blur-xl flex justify-between items-center">
        <Button variant="ghost" onClick={prev} disabled={index === 0} className="rounded-xl h-14 px-10 border border-white/10 font-orbitron font-bold text-white/40 disabled:opacity-5">
          <ArrowLeft className="mr-3 h-5 w-5" /> PREVIOUS
        </Button>
        {card.type === "reading" && (
           <Button onClick={next} className="rounded-xl h-16 px-16 bg-primary text-primary-foreground text-xl font-orbitron font-black shadow-[0_0_20px_rgba(191,100,50,0.2)] hover:scale-105 transition-all">
            INITIALIZE PLAY <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        )}
      </footer>
    </div>
  );
}

function ActivityComponent({ pool, answer, state, setPool, setAnswer, onCheck, onNext, sentence, onRetry }: any) {
  const tap = (w: string, from: "pool" | "answer", i: number) => {
    if (state !== "playing") return;
    if (from === "pool") {
      setPool((p: any) => { const n = [...p]; n.splice(i, 1); return n; });
      setAnswer((a: any) => [...a, w]);
    } else {
      setAnswer((a: any) => { const n = [...a]; n.splice(i, 1); return n; });
      setPool((p: any) => [...p, w]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-8 py-6 animate-in zoom-in duration-500">
      <div className="text-[6rem] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">{sentence.emoji}</div>
      
      <div className="w-full min-h-[120px] glass-card border-dashed border-white/10 flex flex-wrap items-center justify-center p-6 gap-4">
        {answer.length === 0 && <span className="text-white/10 font-orbitron font-black text-xl uppercase tracking-[0.3em]">Build Sequence...</span>}
        {answer.map((w: string, i: number) => (
          <Button key={i} onClick={() => tap(w, "answer", i)} className="h-14 px-6 rounded-xl bg-primary text-primary-foreground text-2xl font-orbitron font-black shadow-[0_0_15px_rgba(191,100,50,0.3)]">{w}</Button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {pool.map((w: string, i: number) => (
          <button key={i} onClick={() => tap(w, "pool", i)} className="h-14 px-6 rounded-xl bg-white/5 border-2 border-white/10 text-white text-2xl font-orbitron font-black hover:border-primary/50 transition-all">{w}</button>
        ))}
      </div>

      {state === "playing" ? (
        <Button onClick={onCheck} disabled={answer.length === 0} className="h-16 px-16 rounded-2xl bg-primary text-primary-foreground text-3xl font-orbitron font-black shadow-[0_0_40px_rgba(191,100,50,0.4)] hover:scale-105 active:scale-95 transition-all">VERIFY</Button>
      ) : state === "correct" ? (
        <div className="flex flex-col items-center gap-6 animate-in zoom-in">
           <div className="bg-primary/20 text-primary px-10 py-4 rounded-full border border-primary/50 text-2xl font-orbitron font-black neon-text">AUTHENTICATED</div>
           <Button onClick={onNext} className="h-16 px-16 rounded-xl bg-white text-black text-xl font-orbitron font-black">CONTINUE</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
           <div className="text-red-500 font-orbitron font-black text-2xl uppercase tracking-widest drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">ERROR: RETRY</div>
           <Button onClick={onRetry} className="h-12 rounded-xl bg-white/5 border border-white/10 text-white font-orbitron font-bold px-8 text-lg uppercase">Reset</Button>
        </div>
      )}
    </div>
  );
}
