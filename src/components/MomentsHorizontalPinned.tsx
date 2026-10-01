import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { CinematicArtwork } from './CinematicArtwork';
import { INNER_CIRCLE_PHOTOS, AuthoritativeStoryPhoto } from '../data/memories';

gsap.registerPlugin(ScrollTrigger);

interface MomentsHorizontalPinnedProps {
  friendName?: string;
}

export const MomentsHorizontalPinned: React.FC<MomentsHorizontalPinnedProps> = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Single authoritative logical state for Inner Circle:
  // 0 = Rishi, 1 = Sri Charan, 2 = Rishwanth, 3 = Solo
  const [innerCircleIndex, setInnerCircleIndex] = useState<0 | 1 | 2 | 3>(0);
  const [smoothProgress, setSmoothProgress] = useState<number>(0);

  // Authoritative ScrollTrigger implementation with 4 equal, stable stages
  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: trigger,
        start: 'top top',
        end: '+=4400', // Substantial track providing stable, comfortable scroll breathing room for all 4 portraits
        pin: container,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Authoritative 4-state index:
          // [0.00, 0.25) -> 0 (Rishi)
          // [0.25, 0.50) -> 1 (Sri Charan)
          // [0.50, 0.75) -> 2 (Rishwanth)
          // [0.75, 1.00] -> 3 (Solo)
          let idx: 0 | 1 | 2 | 3 = 0;
          if (p < 0.25) {
            idx = 0;
          } else if (p < 0.50) {
            idx = 1;
          } else if (p < 0.75) {
            idx = 2;
          } else {
            idx = 3;
          }
          setInnerCircleIndex(idx);

          // 2. Glitch-free smooth transition progress:
          // Within each 25% section, first 60% holds firmly on the member,
          // final 40% smoothly eases into the next member.
          let continuous = idx;
          if (idx < 3) {
            const segP = (p - idx * 0.25) / 0.25;
            if (segP > 0.60) {
              const t = (segP - 0.60) / 0.40;
              const ease = t * t * (3 - 2 * t); // Smooth Hermite ease
              continuous = idx + ease;
            }
          } else {
            // For Solo (idx = 3), stay firmly locked at 3 through the entire 25% final zone
            continuous = 3;
          }
          setSmoothProgress(continuous);

          // 3. Broadcast to global progress rail
          window.dispatchEvent(
            new CustomEvent('innerCircleUpdate', {
              detail: {
                isActive: self.isActive && p < 0.99,
                memberIndex: idx,
                memberNumber: INNER_CIRCLE_PHOTOS[idx].slotNumber,
                memberName: INNER_CIRCLE_PHOTOS[idx].name,
                progress: p,
              },
            })
          );
        },
        onLeave: () => {
          setInnerCircleIndex(3);
          setSmoothProgress(3);
          window.dispatchEvent(
            new CustomEvent('innerCircleUpdate', {
              detail: {
                isActive: false,
                memberIndex: 3,
                memberNumber: '04',
                memberName: 'SOLO',
                progress: 1,
              },
            })
          );
        },
        onLeaveBack: () => {
          setInnerCircleIndex(0);
          setSmoothProgress(0);
          window.dispatchEvent(
            new CustomEvent('innerCircleUpdate', {
              detail: {
                isActive: false,
                memberIndex: 0,
                memberNumber: '01',
                memberName: 'RISHI',
                progress: 0,
              },
            })
          );
        },
      });

      scrollTriggerRef.current = st;
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Jump smoothly to a specific member
  const handleSelectMember = useCallback((targetIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(3, targetIndex)) as 0 | 1 | 2 | 3;
    setInnerCircleIndex(clampedIndex);
    setSmoothProgress(clampedIndex);

    const st = scrollTriggerRef.current;
    if (st && st.start !== undefined && st.end !== undefined) {
      // Position target safely in the middle of that member's 25% zone
      const targetP = (clampedIndex * 0.25) + 0.12;
      const targetScroll = st.start + targetP * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  const activeMember: AuthoritativeStoryPhoto = INNER_CIRCLE_PHOTOS[innerCircleIndex] || INNER_CIRCLE_PHOTOS[0];

  return (
    <section
      id="journey-section"
      ref={triggerRef}
      className="relative w-full bg-[#030303] select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between relative bg-[#030303] px-4 sm:px-8 md:pl-16 md:pr-20"
      >
        {/* Ambient Dark Theater Back-Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0305] to-[#040404] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-red-950/20 blur-[160px] pointer-events-none" />

        {/* Section Header HUD (Safe Top Area) */}
        <header className="relative z-30 pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-6xl mx-auto w-full">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-red-500 uppercase mb-1.5">
              <Users size={13} className="text-red-500" />
              <span>CHAPTER 02 // BROTHERHOOD PORTRAITS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-cinzel font-black text-white tracking-wider uppercase">
              THE INNER CIRCLE
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-lg mt-1 line-clamp-1">
              Scroll down to navigate through each brother. All portraits are preserved in their true aspect ratio.
            </p>
          </div>

          {/* Member Pill Switcher */}
          <nav
            aria-label="Member selection"
            className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md self-start sm:self-auto"
          >
            {INNER_CIRCLE_PHOTOS.map((m, idx) => {
              const isSelected = innerCircleIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMember(idx)}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.5)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {m.name}
                </button>
              );
            })}
          </nav>
        </header>

        {/* SINGLE UNIFIED PHOTO STAGE: Zero duplicate cards across mobile & desktop */}
        <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-auto py-2">
          <div className="relative w-full h-[50vh] max-h-[480px] flex items-center justify-center">
            {INNER_CIRCLE_PHOTOS.map((member, idx) => {
              const offset = idx - smoothProgress;
              const isCenter = Math.abs(offset) < 0.45;
              const isSide = Math.abs(offset) >= 0.45 && Math.abs(offset) <= 1.45;
              const isFar = Math.abs(offset) > 1.45;

              // Responsive horizontal spacing
              const spacing = typeof window !== 'undefined' && window.innerWidth < 768 ? 290 : 330;
              const translateX = offset * spacing;
              const scale = isCenter ? 1.0 : isSide ? 0.88 : 0.75;
              const opacity = isCenter ? 1.0 : isSide ? 0.65 : 0;
              const zIndex = isCenter ? 25 : isSide ? 15 : 5;

              return (
                <article
                  key={member.id}
                  onClick={() => handleSelectMember(idx)}
                  aria-label={`${member.name} photo card`}
                  style={{
                    transform: `translate3d(${translateX}px, 0, 0) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    pointerEvents: isFar ? 'none' : 'auto',
                  }}
                  className={`absolute w-[275px] sm:w-[300px] lg:w-[320px] rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 cursor-pointer group flex flex-col ${
                    isCenter
                      ? 'border-red-600/70 bg-zinc-950/95 shadow-[0_0_40px_rgba(220,38,38,0.3)] ring-1 ring-red-500/30'
                      : 'border-white/10 bg-zinc-950/80 hover:border-white/20 shadow-2xl'
                  }`}
                >
                  {/* Photo Canvas: Exact 3:4 portrait ratio & upper focal anchor */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-black max-h-[36vh]">
                    <CinematicArtwork
                      src={member.src}
                      alt={member.name}
                      slotLabel={member.name}
                      aspectRatio="aspect-[3/4]"
                      fit={member.presentation.fit}
                      position={member.presentation.position}
                    />

                    {/* Member Name Header Pill */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-200 uppercase tracking-widest">
                      <span className={`w-1.5 h-1.5 rounded-full ${isCenter ? 'bg-red-500 animate-pulse' : 'bg-zinc-500'}`} />
                      <span>{member.name}</span>
                    </div>
                  </div>

                  {/* Metadata Footer */}
                  <div className="p-4 bg-zinc-950/95 border-t border-white/5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                      <span className={isCenter ? 'text-red-400 font-bold' : 'text-zinc-500'}>
                        {member.role}
                      </span>
                      <span className="text-zinc-500 text-[10px]">{member.year}</span>
                    </div>

                    <p className="text-white font-cinzel text-sm font-semibold tracking-wide line-clamp-1 mb-1">
                      {member.quote}
                    </p>

                    <p className="text-zinc-400 text-[11px] font-sans line-clamp-2 leading-relaxed">
                      {member.caption}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quick-Nav controls (Chevron arrows for mobile touch convenience) */}
          <div className="flex sm:hidden items-center justify-between w-full max-w-[280px] mt-2 px-2 z-30">
            <button
              onClick={() => handleSelectMember(innerCircleIndex - 1)}
              disabled={innerCircleIndex === 0}
              aria-label="Previous member"
              className={`p-1.5 rounded-full border border-white/10 bg-zinc-950/80 text-zinc-300 transition-all ${
                innerCircleIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-red-600/50 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
              {activeMember.name} ({innerCircleIndex + 1} OF 4)
            </span>

            <button
              onClick={() => handleSelectMember(innerCircleIndex + 1)}
              disabled={innerCircleIndex === 3}
              aria-label="Next member"
              className={`p-1.5 rounded-full border border-white/10 bg-zinc-950/80 text-zinc-300 transition-all ${
                innerCircleIndex === 3 ? 'opacity-30 cursor-not-allowed' : 'hover:border-red-600/50 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </main>

        {/* Section Footer HUD (Safe Bottom Area) */}
        <footer className="relative z-30 pb-6 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400 max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-zinc-300">SCROLL VERTICALLY TO CYCLE MEMBERS</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <Sparkles size={12} className="text-amber-500" />
            <span className="hidden sm:inline">ALL PORTRAITS CONTAINED IN SAFE VIEWPORT</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
