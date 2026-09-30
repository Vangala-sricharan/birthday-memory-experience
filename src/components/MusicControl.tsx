import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 select-none">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Turn background music off' : 'Turn background music on'}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.8)] group border ${
          isPlaying
            ? 'bg-zinc-950/90 border-red-600/40 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)]'
            : 'bg-zinc-950/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
        }`}
      >
        {/* Animated Soundwave Equalizer Bars */}
        <div className="flex items-end gap-[2px] h-3.5 w-4 px-0.5" aria-hidden="true">
          <div
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-red-500 animate-[bounce_0.8s_infinite]' : 'bg-zinc-600 h-[25%]'
            }`}
            style={{ height: isPlaying ? '80%' : '25%' }}
          />
          <div
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-red-500 animate-[bounce_0.6s_infinite_0.15s]' : 'bg-zinc-600 h-[40%]'
            }`}
            style={{ height: isPlaying ? '100%' : '40%' }}
          />
          <div
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-red-500 animate-[bounce_0.75s_infinite_0.3s]' : 'bg-zinc-600 h-[20%]'
            }`}
            style={{ height: isPlaying ? '60%' : '20%' }}
          />
          <div
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPlaying ? 'bg-red-500 animate-[bounce_0.9s_infinite_0.1s]' : 'bg-zinc-600 h-[30%]'
            }`}
            style={{ height: isPlaying ? '90%' : '30%' }}
          />
        </div>

        {/* Cinematic Status Typography */}
        <span className="text-[11px] font-mono tracking-[0.2em] font-medium uppercase whitespace-nowrap">
          {isPlaying ? '🎵 MUSIC ON' : '🎵 MUSIC OFF'}
        </span>

        {/* State Indicator Icon */}
        <div className="text-zinc-400 group-hover:text-white transition-colors ml-0.5">
          {isPlaying ? (
            <Volume2 size={13} className="text-red-400" />
          ) : (
            <VolumeX size={13} className="text-zinc-500" />
          )}
        </div>
      </button>
    </div>
  );
};
