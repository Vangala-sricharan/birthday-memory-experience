import React from 'react';
import { X, FolderOpen, Image as ImageIcon, Volume2, Check } from 'lucide-react';
import { ExperienceConfig } from '../data/memories';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ExperienceConfig;
  onUpdateConfig: (updated: Partial<ExperienceConfig>) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  volume,
  onVolumeChange,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md transition-opacity select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-500 block mb-0.5">
                EXPERIENCE SUITE
              </span>
              <h2 className="text-xl font-cinzel font-bold text-white tracking-wide">
                CUSTOMIZE GIFT
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close settings"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Recipient Details Inputs */}
          <div className="flex flex-col gap-5 mb-8">
            <div>
              <label htmlFor="friendNameInput" className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-1.5">
                RECIPIENT IDENTITY / NAME
              </label>
              <input
                id="friendNameInput"
                type="text"
                value={config.friendName}
                onChange={(e) => onUpdateConfig({ friendName: e.target.value })}
                placeholder="DHARMA RAJU"
                className="w-full bg-zinc-900 border border-white/15 focus:border-red-500 rounded px-3 py-2 text-sm text-white font-cinzel outline-none transition-colors"
              />
              <span className="text-[10px] text-zinc-500 font-sans mt-1 block">
                Updates typography across Hero, Pinned Run, Vault, and Grand Finale.
              </span>
            </div>

            <div>
              <label htmlFor="chapterInput" className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-1.5">
                CHAPTER / AGE MILESTONE
              </label>
              <input
                id="chapterInput"
                type="text"
                value={config.chapterNumber}
                onChange={(e) => onUpdateConfig({ chapterNumber: e.target.value })}
                placeholder="e.g. CHAPTER 28, THE 30TH MILESTONE"
                className="w-full bg-zinc-900 border border-white/15 focus:border-red-500 rounded px-3 py-2 text-sm text-white font-mono outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="finalMsgInput" className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-1.5">
                FINAL TRIBUTE MESSAGE
              </label>
              <textarea
                id="finalMsgInput"
                rows={3}
                value={config.finalMessage}
                onChange={(e) => onUpdateConfig({ finalMessage: e.target.value })}
                className="w-full bg-zinc-900 border border-white/15 focus:border-red-500 rounded px-3 py-2 text-xs text-white font-sans outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Audio Volume Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400 uppercase mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Volume2 size={13} className="text-red-500" />
                  SOUNDTRACK INTENSITY
                </span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-red-600 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Photo Customization Guide */}
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/10 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 uppercase mb-2">
              <FolderOpen size={14} />
              <span>PHOTO UPLOAD LOCATION</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-3">
              Place your birthday photos into the repository at <code className="text-red-400">public/images/birthday/</code>:
            </p>
            <div className="bg-black/90 p-3 rounded font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/01-hero.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/02-ajay.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/03-beer.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/04-bhargav.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/05-journey.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/06-party.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/07-pratap.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/08-rishi.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/09-rishwanth.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/10-sri-charan.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/11-solo.jpeg</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon size={12} className="text-red-500" />
                <span>public/images/birthday/12-surprise.jpeg</span>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans mt-2">
              All 12 assets are tracked in <code className="text-zinc-300">src/data/memories.ts</code>.
            </p>
          </div>
        </div>

        {/* Footer Save / Close */}
        <div className="pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check size={14} />
            <span>APPLY & VIEW EXPERIENCE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
