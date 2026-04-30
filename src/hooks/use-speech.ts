import { useCallback, useRef } from "react";

/**
 * Advanced Speech Hook for Custom MP3 Audio.
 * This version uses pre-recorded high-quality audio files
 * for a consistent, professional "calm" tone across all devices.
 */
export function useSpeech() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Cache for preloaded Audio objects to ensure instant playback
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  /**
   * Pre-loads an audio file into memory.
   * Best called when a lesson starts to prepare all step audios.
   */
  const preloadAudio = useCallback((url: string) => {
    if (audioCache.current.has(url)) return;
    
    const audio = new Audio();
    audio.src = url;
    audio.load();
    audioCache.current.set(url, audio);
  }, []);

  /**
   * Plays a specific audio file (either from cache or URL).
   */
  const playAudio = useCallback((url: string) => {
    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    let audio = audioCache.current.get(url);

    if (!audio) {
      audio = new Audio(url);
      audioCache.current.set(url, audio);
    }

    /**
     * CALM TONE PRESERVATION:
     * We can still adjust the playbackRate of our custom MP3s 
     * if we want them even slower/calmer.
     */
    audio.playbackRate = 1.0; 
    
    audioRef.current = audio;
    audio.play().catch(err => {
      console.warn("Audio playback failed (interaction required?):", err);
    });
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  /**
   * FALLBACK: Web Speech API (for development or missing files)
   */
  const speakFallback = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.name.includes('Google') || v.name.includes('Female')) || voices[0];
    utterance.rate = 0.75;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { 
    playAudio, 
    preloadAudio, 
    stop, 
    speakFallback 
  };
}
