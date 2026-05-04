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
   * Returns the audio object to allow event listeners.
   */
  const playAudio = useCallback(async (url: string): Promise<HTMLAudioElement | null> => {
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

    audio.playbackRate = 1.0; 
    audioRef.current = audio;
    
    try {
      await audio.play();
      return audio;
    } catch (err) {
      console.warn("Audio playback failed (interaction required?):", err);
      return null;
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { 
    playAudio, 
    preloadAudio, 
    pause,
    resume,
    stop, 
    audio: audioRef.current
  };
}
