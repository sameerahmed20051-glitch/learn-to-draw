import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook for Text-to-Speech (TTS) using Web Speech API.
 * Optimized for a friendly female voice at a slow pace for kids.
 */
export function useSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Strategy to find a friendly female voice
    // 1. Look for specific high-quality voices (Google, Apple)
    // 2. Look for "female" or "woman" in the name
    // 3. Look for common female names (Samantha, Victoria, Zira)
    const femaleVoice =
      voices.find((v) => v.name.includes("Google UK English Female")) ||
      voices.find((v) => v.name.includes("Google US English Female")) ||
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.name.includes("Samantha")) ||
      voices.find((v) => v.name.includes("Victoria")) ||
      voices.find((v) => v.name.includes("Zira")) ||
      voices.find((v) => v.lang.startsWith("en") && !v.name.toLowerCase().includes("male"));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Slow pace for kids (0.7 - 0.8 is usually good)
    utterance.rate = 0.8;
    // Slightly higher pitch for a friendlier tone
    utterance.pitch = 1.1;

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Pre-load voices (browsers often load them lazily)
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return { speak, stop };
}
