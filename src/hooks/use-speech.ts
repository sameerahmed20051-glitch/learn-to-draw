import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook for Text-to-Speech (TTS) using Web Speech API.
 * Optimized for a friendly female voice at a slow pace for kids.
 */
export function useSpeech() {
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const femaleVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Helper to find a friendly female voice
  const findFemaleVoice = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return null;

    // Strategy to find a friendly female voice
    // 1. Look for specific high-quality voices (Google, Apple)
    // 2. Look for "female" or "woman" in the name
    // 3. Look for common female names (Samantha, Victoria, Zira, Karen, Moira)
    return (
      voices.find((v) => v.name.includes("Google UK English Female")) ||
      voices.find((v) => v.name.includes("Google US English Female")) ||
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.name.includes("Samantha")) ||
      voices.find((v) => v.name.includes("Victoria")) ||
      voices.find((v) => v.name.includes("Zira")) ||
      voices.find((v) => v.name.includes("Karen")) ||
      voices.find((v) => v.name.includes("Moira")) ||
      voices.find((v) => v.lang.startsWith("en") && !v.name.toLowerCase().includes("male")) ||
      voices[0] // Fallback to first available if all else fails
    );
  }, []);

  // Initialize and listen for voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voice = findFemaleVoice();
      if (voice) {
        femaleVoiceRef.current = voice;
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [findFemaleVoice]);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Ensure we have a voice, or try to get one last-second
    const voice = femaleVoiceRef.current || findFemaleVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Slow pace for kids (0.7 - 0.8 is usually good)
    utterance.rate = 0.8;
    // Slightly higher pitch for a friendlier tone
    utterance.pitch = 1.1;

    window.speechSynthesis.speak(utterance);
  }, [findFemaleVoice]);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop, voicesLoaded };
}
