import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isPlaying: boolean;
  frequencies: number[];
  onToggle: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, frequencies, onToggle }) => {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
        className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/10 hover:border-red-600/40 backdrop-blur-md text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer shadow-lg group"
      >
        {/* Animated Soundwave Visualizer Bars */}
        <div className="flex items-end gap-[3px] h-3.5 w-4.5 px-0.5">
          {frequencies.slice(0, 4).map((val, idx) => (
            <div
              key={idx}
              className={`w-[2px] rounded-full transition-all duration-150 ${
                isPlaying ? 'bg-red-500' : 'bg-zinc-600'
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, Math.min(100, val))}%` : '25%',
              }}
            />
          ))}
        </div>

        {/* Minimal Typography Label */}
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
          {isPlaying ? 'SOUND ON' : 'SOUND OFF'}
        </span>

        {/* Quiet Icon Indicator */}
        <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
          {isPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </div>
      </button>
    </div>
  );
};
