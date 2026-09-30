import { useState, useEffect, useRef, useCallback } from 'react';

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  frequencies: number[]; // For visualizer
  togglePlay: () => void;
  setVolume: (v: number) => void;
}

export function useAudioAtmosphere(): AudioState {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.6);
  const [frequencies, setFrequencies] = useState<number[]>([15, 25, 45, 30, 20]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const filterNodesRef = useRef<BiquadFilterNode[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const visualizerRafRef = useRef<number | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  // Initialize Web Audio synthesizer for cinematic ambient drone
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.setValueAtTime(volume, ctx.currentTime);
      masterGainRef.current = master;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      master.connect(analyser);
      analyser.connect(ctx.destination);

      // Create a lush cinematic chord progression (C2, G2, Eb3, Bb3, D4)
      const baseFreqs = [65.41, 98.0, 155.56, 233.08, 293.66];
      const oscillators: OscillatorNode[] = [];
      const filters: BiquadFilterNode[] = [];

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Warm sine and triangle mix
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow frequency detune for rich analog chorus
        osc.detune.setValueAtTime((idx - 2) * 4, ctx.currentTime);

        // Lowpass filter for deep cinematic warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380 + idx * 80, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(master);

        oscillators.push(osc);
        filters.push(filter);
        osc.start();
      });

      oscNodesRef.current = oscillators;
      filterNodesRef.current = filters;
    } catch (e) {
      console.warn('Web Audio API not supported or initialization failed:', e);
    }
  }, [volume]);

  const startVisualizer = useCallback(() => {
    if (!analyserRef.current) return;
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      // Sample 5 bars for luxury visualizer
      const bars = [
        Math.min(95, Math.max(15, dataArray[1] / 2.7)),
        Math.min(95, Math.max(20, dataArray[3] / 2.4)),
        Math.min(95, Math.max(30, dataArray[5] / 2.2)),
        Math.min(95, Math.max(20, dataArray[8] / 2.6)),
        Math.min(95, Math.max(12, dataArray[12] / 2.9)),
      ];
      setFrequencies(bars);
      visualizerRafRef.current = requestAnimationFrame(update);
    };

    visualizerRafRef.current = requestAnimationFrame(update);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        setIsPlaying(true);
        startVisualizer();
      });
    } else if (isPlaying) {
      if (masterGainRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      }
      setTimeout(() => {
        ctx.suspend();
        setIsPlaying(false);
      }, 400);
    } else {
      ctx.resume().then(() => {
        if (masterGainRef.current) {
          masterGainRef.current.gain.setTargetAtTime(volume, ctx.currentTime, 0.4);
        }
        setIsPlaying(true);
        startVisualizer();
      });
    }
  }, [initAudio, isPlaying, startVisualizer, volume]);

  const setVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(newVol, audioCtxRef.current.currentTime, 0.1);
    }
  }, []);

  // Listen for initial user gesture to enable audio smoothly
  useEffect(() => {
    const handleFirstGesture = () => {
      if (userInteractedRef.current) return;
      userInteractedRef.current = true;
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      if (visualizerRafRef.current !== null) {
        cancelAnimationFrame(visualizerRafRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    volume,
    frequencies: isPlaying ? frequencies : [15, 12, 18, 14, 10],
    togglePlay,
    setVolume,
  };
}
