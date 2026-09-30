import { useState, useEffect, useRef, useCallback } from 'react';

const AUDIO_SRC = '/audio/birthday-music.mp3';

// ONE persistent global Audio instance for the entire application
let globalAudioInstance: HTMLAudioElement | null = null;
let isAudioInitialized = false;

function getOrCreateGlobalAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;

  if (!globalAudioInstance) {
    try {
      globalAudioInstance = new Audio(AUDIO_SRC);
      globalAudioInstance.loop = true;
      globalAudioInstance.volume = 0.35;
      globalAudioInstance.preload = 'auto';

      globalAudioInstance.addEventListener('error', () => {
        // Gracefully log to console only without breaking UI
        console.warn('MUSIC UNAVAILABLE');
      });

      isAudioInitialized = true;
    } catch {
      console.warn('MUSIC UNAVAILABLE');
    }
  }

  return globalAudioInstance;
}

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  play: () => Promise<void>;
  pause: () => void;
}

export function useAudioAtmosphere(): AudioState {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.35);
  const userExplicitlyPausedRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;

    // Reset playback to start on fresh load only once
    if (!isAudioInitialized) {
      try {
        audio.currentTime = 0;
      } catch {
        // ignore
      }
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      console.warn('MUSIC UNAVAILABLE');
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Sync current playing and volume state
    setIsPlaying(!audio.paused && !audio.ended);
    setVolumeState(audio.volume);

    // 1. Attempt autoplay on mount
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without user gesture
          setIsPlaying(false);
        });
    }

    // 2. Global gesture listener: starts audio on first user touch/click if autoplay was blocked
    const handleFirstGesture = () => {
      if (audio.paused && !userExplicitlyPausedRef.current) {
        audio.play().catch(() => {
          // Keep paused if still blocked
        });
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const play = useCallback(async () => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;
    userExplicitlyPausedRef.current = false;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      console.warn('MUSIC UNAVAILABLE');
    }
  }, []);

  const pause = useCallback(() => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;
    userExplicitlyPausedRef.current = true;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = getOrCreateGlobalAudio();
    if (!audio) return;

    if (audio.paused) {
      userExplicitlyPausedRef.current = false;
      audio.play().catch(() => {
        console.warn('MUSIC UNAVAILABLE');
      });
    } else {
      userExplicitlyPausedRef.current = true;
      audio.pause();
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    const audio = getOrCreateGlobalAudio();
    if (audio) {
      audio.volume = clamped;
    }
  }, []);

  return {
    isPlaying,
    volume,
    togglePlay,
    setVolume,
    play,
    pause,
  };
}
