import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface CinematicArtworkProps {
  src: string;
  alt: string;
  slotLabel?: string;
  className?: string;
  aspectRatio?: string;
  fit?: 'cover' | 'contain';
  position?: string;
  scale?: number;
  showAmbientBackdrop?: boolean;
}

// Fallback alias map in case of alternate naming in repository/server
const ALIAS_MAP: Record<string, string[]> = {
  // Hero
  '/images/birthday/Hero image.jpeg': [
    '/images/birthday/Hero image.jpeg',
    '/images/birthday/Hero%20image.jpeg',
    '/images/birthday/01-hero.jpeg',
  ],
  '/images/birthday/01-hero.jpeg': [
    '/images/birthday/01-hero.jpeg',
    '/images/birthday/Hero image.jpeg',
    '/images/birthday/Hero%20image.jpeg',
  ],

  // Ajay
  '/images/birthday/Ajay.jpeg': [
    '/images/birthday/Ajay.jpeg',
    '/images/birthday/02-ajay.jpeg',
  ],
  '/images/birthday/02-ajay.jpeg': [
    '/images/birthday/02-ajay.jpeg',
    '/images/birthday/Ajay.jpeg',
  ],

  // Beer
  '/images/birthday/Beer image.jpeg': [
    '/images/birthday/Beer image.jpeg',
    '/images/birthday/Beer%20image.jpeg',
    '/images/birthday/03-beer.jpeg',
  ],
  '/images/birthday/03-beer.jpeg': [
    '/images/birthday/03-beer.jpeg',
    '/images/birthday/Beer image.jpeg',
    '/images/birthday/Beer%20image.jpeg',
  ],

  // Bhargav
  '/images/birthday/Bhargav Image.jpeg': [
    '/images/birthday/Bhargav Image.jpeg',
    '/images/birthday/Bhargav%20Image.jpeg',
    '/images/birthday/04-bhargav.jpeg',
  ],
  '/images/birthday/04-bhargav.jpeg': [
    '/images/birthday/04-bhargav.jpeg',
    '/images/birthday/Bhargav Image.jpeg',
    '/images/birthday/Bhargav%20Image.jpeg',
  ],

  // Journey
  '/images/birthday/Journey image.jpeg': [
    '/images/birthday/Journey image.jpeg',
    '/images/birthday/Journey%20image.jpeg',
    '/images/birthday/05-journey.jpeg',
  ],
  '/images/birthday/05-journey.jpeg': [
    '/images/birthday/05-journey.jpeg',
    '/images/birthday/Journey image.jpeg',
    '/images/birthday/Journey%20image.jpeg',
  ],

  // Party
  '/images/birthday/Party image.jpeg': [
    '/images/birthday/Party image.jpeg',
    '/images/birthday/Party%20image.jpeg',
    '/images/birthday/06-party.jpeg',
  ],
  '/images/birthday/06-party.jpeg': [
    '/images/birthday/06-party.jpeg',
    '/images/birthday/Party image.jpeg',
    '/images/birthday/Party%20image.jpeg',
  ],

  // Pratap
  '/images/birthday/Pratap Image.jpeg': [
    '/images/birthday/Pratap Image.jpeg',
    '/images/birthday/Pratap%20Image.jpeg',
    '/images/birthday/07-pratap.jpeg',
  ],
  '/images/birthday/07-pratap.jpeg': [
    '/images/birthday/07-pratap.jpeg',
    '/images/birthday/Pratap Image.jpeg',
    '/images/birthday/Pratap%20Image.jpeg',
  ],

  // Rishi
  '/images/birthday/Rishi Image.jpeg': [
    '/images/birthday/Rishi Image.jpeg',
    '/images/birthday/Rishi%20Image.jpeg',
    '/images/birthday/08-rishi.jpeg',
  ],
  '/images/birthday/08-rishi.jpeg': [
    '/images/birthday/08-rishi.jpeg',
    '/images/birthday/Rishi Image.jpeg',
    '/images/birthday/Rishi%20Image.jpeg',
  ],

  // Rishwanth
  '/images/birthday/Rishwanth image.jpeg': [
    '/images/birthday/Rishwanth image.jpeg',
    '/images/birthday/Rishwanth%20image.jpeg',
    '/images/birthday/09-rishwanth.jpeg',
  ],
  '/images/birthday/09-rishwanth.jpeg': [
    '/images/birthday/09-rishwanth.jpeg',
    '/images/birthday/Rishwanth image.jpeg',
    '/images/birthday/Rishwanth%20image.jpeg',
  ],

  // Sri Charan
  '/images/birthday/Sri charan Image.jpeg': [
    '/images/birthday/Sri charan Image.jpeg',
    '/images/birthday/Sri%20charan%20Image.jpeg',
    '/images/birthday/10-sri-charan.jpeg',
  ],
  '/images/birthday/10-sri-charan.jpeg': [
    '/images/birthday/10-sri-charan.jpeg',
    '/images/birthday/Sri charan Image.jpeg',
    '/images/birthday/Sri%20charan%20Image.jpeg',
  ],

  // Solo
  '/images/birthday/Solo.jpeg': [
    '/images/birthday/Solo.jpeg',
    '/images/birthday/11-solo.jpeg',
  ],
  '/images/birthday/11-solo.jpeg': [
    '/images/birthday/11-solo.jpeg',
    '/images/birthday/Solo.jpeg',
  ],

  // Surprise
  '/images/birthday/Surprize image.jpeg': [
    '/images/birthday/Surprize image.jpeg',
    '/images/birthday/Surprize%20image.jpeg',
    '/images/birthday/12-surprise.jpeg',
  ],
  '/images/birthday/12-surprise.jpeg': [
    '/images/birthday/12-surprise.jpeg',
    '/images/birthday/Surprize image.jpeg',
    '/images/birthday/Surprize%20image.jpeg',
  ],
};

export const CinematicArtwork: React.FC<CinematicArtworkProps> = ({
  src,
  alt,
  slotLabel,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  fit = 'cover',
  position = 'center',
  scale = 1.0,
  showAmbientBackdrop = true,
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aliases = ALIAS_MAP[src] || [src];
  const activeSrc = aliases[currentSrcIndex] || src;
  const displaySlotLabel = slotLabel || alt || 'MEMORY';

  const handleImageError = () => {
    if (currentSrcIndex < aliases.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      console.warn(`[Cinematic Birthday] Could not resolve image for ${src} after checking all aliases`);
      setImageError(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio} ${className} bg-[#040404] select-none group rounded-xl`}
    >
      {/* Ambient Theater Back-Glow (soft ambient bleed matching photo colors) */}
      {!imageError && showAmbientBackdrop && (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-35' : 'opacity-0'
          }`}
        >
          <img
            src={activeSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-125 blur-2xl transform-gpu"
          />
        </div>
      )}

      {/* Real Foreground Image Element with Custom Framing */}
      {!imageError && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img
            key={activeSrc}
            src={activeSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            style={{
              objectFit: fit,
              objectPosition: position,
              transform: `scale(${scale})`,
            }}
            className={`w-full h-full transition-all duration-1000 ease-out transform-gpu ${
              imageLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        </div>
      )}

      {/* Loading state before image finishes loading */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#050505] p-6 z-10">
          <div className="w-8 h-8 rounded-full border-2 border-red-600/30 border-t-red-500 animate-spin mb-3" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
            LOADING ASSET...
          </span>
        </div>
      )}

      {/* Premium Dark Placeholder when image is unavailable */}
      {imageError && (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-[#040404] overflow-hidden z-20">
          {/* Subtle red atmospheric center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-48 md:h-64 rounded-full bg-red-950/20 blur-[70px] pointer-events-none" />

          {/* Film Grain Mesh */}
          <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

          {/* Precision Framing Corner Crosshairs */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-red-600/80 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/30 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/30 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-red-600/80 pointer-events-none" />

          {/* Top Slot Header Indicator */}
          <div className="relative z-10 flex items-center justify-between text-[10px] md:text-xs font-mono tracking-widest text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-zinc-300">ARCHIVE REEL</span>
            </span>
            <span className="text-red-400/90 font-bold">{displaySlotLabel}</span>
          </div>

          {/* Centerpiece Reticle & Callout */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-red-600/40 bg-zinc-950/80 flex items-center justify-center text-red-500 mb-3 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <ImageOff size={20} className="text-red-400" />
            </div>

            <h4 className="text-lg sm:text-xl md:text-2xl font-cinzel font-bold text-white tracking-widest uppercase mb-1">
              MEMORY UNAVAILABLE
            </h4>

            <p className="text-[11px] sm:text-xs font-mono text-zinc-400 tracking-[0.2em] uppercase mb-3">
              {displaySlotLabel}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-white/10 bg-black/70 text-[10px] font-mono text-zinc-400">
              <Sparkles size={11} className="text-red-500" />
              <span>{src}</span>
            </div>
          </div>

          {/* Bottom Slot Footer Info */}
          <div className="relative z-10 flex items-center justify-between text-[9px] md:text-[10px] font-mono text-zinc-400 tracking-wider">
            <span>REPOSITORY ASSET SLOT</span>
            <span className="text-zinc-400">AUTO-RESOLVES FROM REPO</span>
          </div>
        </div>
      )}

      {/* Frame Metallic Hairline Border & Subtle Edge Vignette */}
      <div className="absolute inset-0 border border-white/10 group-hover:border-red-600/50 transition-colors duration-500 pointer-events-none rounded-xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
