/**
 * ONE persistent global background audio player for the entire birthday experience.
 *
 * Characteristics:
 * - Plays continuously throughout all chapters and sections.
 * - Looping enabled with zero silent gap between loops.
 * - Resumes seamlessly from the current playback position without restarting.
 * - Starts automatically or upon first user interaction (touch/click/key/scroll).
 * - Decoupled from React lifecycle, ScrollTrigger, route, or section changes.
 */

import { useState, useEffect, useCallback } from 'react';

const AUDIO_SRC = '/audio/birthday-music.mp3';
const DEFAULT_VOLUME = 0.35;

class GlobalAudioController {
  private static instance: GlobalAudioController | null = null;
  private audio: HTMLAudioElement | null = null;
  private userExplicitlyPaused: boolean = false;
  private listeners: Set<(isPlaying: boolean, volume: number) => void> = new Set();
  private interactionAttached: boolean = false;

  private constructor() {
    if (typeof window === 'undefined') return;
    this.initAudio();
  }

  public static getInstance(): GlobalAudioController {
    if (!GlobalAudioController.instance) {
      GlobalAudioController.instance = new GlobalAudioController();
    }
    return GlobalAudioController.instance;
  }

  private initAudio() {
    if (this.audio || typeof window === 'undefined') return;

    try {
      const audio = new Audio(AUDIO_SRC);
      audio.loop = true;
      audio.volume = DEFAULT_VOLUME;
      audio.preload = 'auto';

      // Gapless seamless loop guarantee: if ended fires, immediately loop back to 0
      audio.addEventListener('ended', () => {
        try {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } catch {
          // ignore
        }
      });

      audio.addEventListener('play', () => this.notify());
      audio.addEventListener('pause', () => this.notify());
      audio.addEventListener('volumechange', () => this.notify());
      audio.addEventListener('error', (e) => {
        console.warn('Audio note:', e);
      });

      this.audio = audio;

      // Attempt immediate background playback
      this.attemptAutoplay();

      // Ensure audio starts on very first user gesture if browser blocked unmuted autoplay
      this.setupInteractionListeners();
    } catch (err) {
      console.warn('Audio initialization deferred:', err);
    }
  }

  private attemptAutoplay() {
    if (!this.audio) return;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.notify();
        })
        .catch(() => {
          // Autoplay policy prevented playback without gesture; interaction listeners will trigger it
          this.notify();
        });
    }
  }

  private setupInteractionListeners() {
    if (this.interactionAttached || typeof window === 'undefined') return;
    this.interactionAttached = true;

    const onUserInteraction = () => {
      if (this.audio && this.audio.paused && !this.userExplicitlyPaused) {
        this.audio.play().then(() => {
          this.notify();
        }).catch(() => {});
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('pointerdown', onUserInteraction);
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('scroll', onUserInteraction);
    };

    window.addEventListener('pointerdown', onUserInteraction, { passive: true });
    window.addEventListener('click', onUserInteraction, { passive: true });
    window.addEventListener('keydown', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('scroll', onUserInteraction, { passive: true });
  }

  public subscribe(listener: (isPlaying: boolean, volume: number) => void): () => void {
    this.listeners.add(listener);
    listener(this.getIsPlaying(), this.getVolume());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const isPlaying = this.getIsPlaying();
    const volume = this.getVolume();
    this.listeners.forEach((listener) => listener(isPlaying, volume));
  }

  public getIsPlaying(): boolean {
    return Boolean(this.audio && !this.audio.paused && !this.audio.ended);
  }

  public getVolume(): number {
    return this.audio ? this.audio.volume : DEFAULT_VOLUME;
  }

  public async play(): Promise<void> {
    if (!this.audio) return;
    this.userExplicitlyPaused = false;
    try {
      await this.audio.play();
      this.notify();
    } catch {
      // Audio playback deferred until user interaction
    }
  }

  public pause(): void {
    if (!this.audio) return;
    this.userExplicitlyPaused = true;
    this.audio.pause();
    this.notify();
  }

  public togglePlay(): void {
    if (!this.audio) return;
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  public setVolume(v: number): void {
    const clamped = Math.max(0, Math.min(1, v));
    if (this.audio) {
      this.audio.volume = clamped;
    }
    this.notify();
  }
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
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);

  useEffect(() => {
    const controller = GlobalAudioController.getInstance();
    const unsubscribe = controller.subscribe((playing, vol) => {
      setIsPlaying(playing);
      setVolumeState(vol);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const togglePlay = useCallback(() => {
    GlobalAudioController.getInstance().togglePlay();
  }, []);

  const play = useCallback(() => {
    return GlobalAudioController.getInstance().play();
  }, []);

  const pause = useCallback(() => {
    GlobalAudioController.getInstance().pause();
  }, []);

  const setVolume = useCallback((v: number) => {
    GlobalAudioController.getInstance().setVolume(v);
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
