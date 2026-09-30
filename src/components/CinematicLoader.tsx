import React, { useState, useEffect } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
  friendName: string;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete, friendName }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Quick, smooth progress animation (approx 1.2s total)
    const startTime = performance.now();
    const duration = 1400; // Fast and responsive

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 200);
      }
    };

    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient red glow pulse */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-950/20 blur-[120px] pointer-events-none animate-pulse" />

      {/* Main loading typography */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        <div className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-zinc-400 font-cinzel mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span>INITIALIZING EXPERIENCE</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-cinzel tracking-[0.25em] text-white font-semibold mb-8">
          LOADING MEMORIES
        </h1>

        {/* Progress Bar */}
        <div className="w-64 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative mb-4">
          <div
            className="h-full bg-gradient-to-r from-red-800 via-red-500 to-amber-300 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between w-64 text-[11px] font-mono text-zinc-400">
          <span className="tracking-widest">ARCHIVE // {friendName}</span>
          <span className="text-zinc-300 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
