import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { CinematicArtwork } from './CinematicArtwork';

gsap.registerPlugin(ScrollTrigger);

interface MemberData {
  id: string;
  name: string;
  title: string;
  slotNumber: string;
  role: string;
  year: string;
  location: string;
  quote: string;
  caption: string;
  src: string;
  presentation: {
    fit: 'cover';
    position: string;
    aspectRatio: string;
    focalPoint: { x: number; y: number };
  };
}

// Exactly the four members requested with their specific local files & tailored framing
const MEMBERS: MemberData[] = [
  {
    id: 'rishi',
    name: 'RISHI',
    title: '08 — RISHI',
    slotNumber: '01',
    role: 'ADVENTURE // BROTHERHOOD',
    year: 'ALLIANCE',
    location: 'SHARED SUMMITS',
    quote: 'Moments of laughter and shared ambition etched in gold.',
    caption: 'Standing steadfast through every milestone with unyielding camaraderie and shared vision.',
    src: '/images/birthday/Rishi Image.jpeg',
    presentation: {
      fit: 'cover',
      position: 'center 18%', // High anchor preserves head, forehead, and expressions without vertical cut
      aspectRatio: 'aspect-[3/4]',
      focalPoint: { x: 50, y: 18 },
    },
  },
  {
    id: 'sri-charan',
    name: 'SRI CHARAN',
    title: '10 — SRI CHARAN',
    slotNumber: '02',
    role: 'FELLOWSHIP // WISDOM',
    year: 'KINSHIP',
    location: 'THE INNER CIRCLE',
    quote: 'Quiet strength and steadfast support across every season.',
    caption: 'A brotherhood grounded in unwavering loyalty, shared humor, and timeless camaraderie.',
    src: '/images/birthday/Sri charan Image.jpeg',
    presentation: {
      fit: 'cover',
      position: 'center 20%', // Centers posture and keeps head and shoulders fully in frame
      aspectRatio: 'aspect-[3/4]',
      focalPoint: { x: 50, y: 20 },
    },
  },
  {
    id: 'ajay',
    name: 'AJAY',
    title: '02 — AJAY',
    slotNumber: '03',
    role: 'SOLIDARITY // BROTHERHOOD',
    year: 'FOUNDATION',
    location: 'COMRADES IN ARMS',
    quote: 'Brothers through every storm and triumph.',
    caption: 'Steadfast presence from the earliest milestones through every victory and challenge.',
    src: '/images/birthday/Ajay.jpeg',
    presentation: {
      fit: 'cover',
      position: 'center 16%', // Upper faces anchored high; no haircut or cropping
      aspectRatio: 'aspect-[3/4]',
      focalPoint: { x: 50, y: 16 },
    },
  },
  {
    id: 'solo',
    name: 'SOLO',
    title: '11 — SOLO',
    slotNumber: '04',
    role: 'THE CHAMPION // MILESTONE',
    year: 'THE LEGEND',
    location: 'IN THE SPOTLIGHT',
    quote: 'Here’s to the legend himself, forging his own destiny.',
    caption: 'The individual whose milestone, greatness, and vibrant spirit we gather to celebrate.',
    src: '/images/birthday/Solo.jpeg',
    presentation: {
      fit: 'cover',
      position: 'center 20%', // Complete solo portrait visible without cutting the subject
      aspectRatio: 'aspect-[3/4]',
      focalPoint: { x: 50, y: 20 },
    },
  },
];

// Target plateau points for deliberate member jumping when clicking pills/arrows
const PLATEAU_TARGETS = [0.09, 0.35, 0.61, 0.86];

// Smoothstep interpolation helper
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Computes smooth continuous horizontal progress across 4 dedicated portrait plateaus:
 * - 0.00 to 0.18: RISHI plateau (cp = 0)
 * - 0.18 to 0.26: Transition 0 -> 1 (cp eases 0 -> 1)
 * - 0.26 to 0.44: SRI CHARAN plateau (cp = 1)
 * - 0.44 to 0.52: Transition 1 -> 2 (cp eases 1 -> 2)
 * - 0.52 to 0.70: AJAY plateau (cp = 2)
 * - 0.70 to 0.78: Transition 2 -> 3 (cp eases 2 -> 3)
 * - 0.78 to 0.94: SOLO celebration plateau (cp = 3)
 * - 0.94 to 1.00: Section completion & clean unpin release
 */
function computeContinuousProgress(p: number): number {
  if (p < 0.18) {
    return 0;
  }
  if (p < 0.26) {
    return smoothstep(0.18, 0.26, p);
  }
  if (p < 0.44) {
    return 1;
  }
  if (p < 0.52) {
    return 1 + smoothstep(0.44, 0.52, p);
  }
  if (p < 0.70) {
    return 2;
  }
  if (p < 0.78) {
    return 2 + smoothstep(0.70, 0.78, p);
  }
  return 3;
}

function computeActiveIndex(cp: number): number {
  if (cp < 0.5) return 0; // RISHI
  if (cp < 1.5) return 1; // SRI CHARAN
  if (cp < 2.5) return 2; // AJAY
  return 3;               // SOLO
}

interface MomentsHorizontalPinnedProps {
  friendName: string;
}

export const MomentsHorizontalPinned: React.FC<MomentsHorizontalPinnedProps> = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [continuousProgress, setContinuousProgress] = useState<number>(0);
  const [, setIsMobile] = useState<boolean>(false);

  // Detect responsive mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger timeline pinning and smooth progress sync
  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: trigger,
        start: 'top top',
        end: '+=5200', // 5200px vertical track: ample breathing room for all 4 portraits + holds + release
        pin: container,
        anticipatePin: 1,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          const cp = computeContinuousProgress(p);
          const idx = computeActiveIndex(cp);
          setContinuousProgress(cp);
          setActiveIndex(idx);

          // Broadcast state to right-side progress indicator
          window.dispatchEvent(
            new CustomEvent('innerCircleUpdate', {
              detail: {
                isActive: self.isActive && p < 0.99,
                memberIndex: idx,
                memberNumber: MEMBERS[idx].slotNumber,
                memberName: MEMBERS[idx].name,
                progress: p,
              },
            })
          );
        },
        onLeave: () => {
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

  const handleSelectMember = useCallback((index: number) => {
    setActiveIndex(index);
    setContinuousProgress(index);

    const st = scrollTriggerRef.current;
    if (st && st.start !== undefined && st.end !== undefined) {
      const targetScroll = st.start + PLATEAU_TARGETS[index] * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, []);

  const handlePrevMember = useCallback(() => {
    if (activeIndex > 0) {
      handleSelectMember(activeIndex - 1);
    }
  }, [activeIndex, handleSelectMember]);

  const handleNextMember = useCallback(() => {
    if (activeIndex < MEMBERS.length - 1) {
      handleSelectMember(activeIndex + 1);
    }
  }, [activeIndex, handleSelectMember]);

  const activeMember = MEMBERS[activeIndex] || MEMBERS[0];

  return (
    <section
      id="journey-section"
      ref={triggerRef}
      className="relative w-full bg-[#030303] select-none"
    >
      {/* Pinned Viewport Container with safe visual bounds */}
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
            {MEMBERS.map((m, idx) => {
              const isSelected = activeIndex === idx;
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

        {/* Main Cinematic Multi-Photo Stage (Safe Middle Area) */}
        <main className="relative z-20 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto py-2">
          {/* DESKTOP LAYOUT (>= 768px): Cinematic Multi-Card Stage inside Viewport */}
          <div className="hidden md:flex items-center justify-center relative w-full h-[52vh] max-h-[500px]">
            {MEMBERS.map((member, idx) => {
              // Offset relative to current continuous progress
              const offset = idx - continuousProgress;
              const isCenter = Math.abs(offset) < 0.45;
              const isSide = Math.abs(offset) >= 0.45 && Math.abs(offset) <= 1.45;
              const isFar = Math.abs(offset) > 1.45;

              // Card spacing bounded strictly within viewport width
              const spacing = 320;
              const translateX = offset * spacing;
              const scale = isCenter ? 1.0 : isSide ? 0.88 : 0.75;
              const opacity = isCenter ? 1.0 : isSide ? 0.72 : 0;
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
                  className={`absolute w-[280px] lg:w-[320px] rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 cursor-pointer group flex flex-col ${
                    isCenter
                      ? 'border-red-600/70 bg-zinc-950/95 shadow-[0_0_40px_rgba(220,38,38,0.3)] ring-1 ring-red-500/30'
                      : 'border-white/10 bg-zinc-950/80 hover:border-white/20 shadow-2xl'
                  }`}
                >
                  {/* Photo Canvas: Exact 3:4 portrait ratio & upper focal anchor */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-black max-h-[38vh]">
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

          {/* MOBILE LAYOUT (< 768px): Single Centered Active Member inside Viewport */}
          <div className="flex md:hidden flex-col items-center justify-center w-full max-w-[320px] mx-auto">
            <article
              key={activeMember.id}
              className="w-full rounded-2xl overflow-hidden border border-red-600/60 bg-zinc-950 shadow-[0_0_35px_rgba(220,38,38,0.25)] flex flex-col animate-fade-in"
            >
              {/* Photo Canvas: Exact 3:4 portrait ratio & upper focal anchor */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-black max-h-[38vh]">
                <CinematicArtwork
                  src={activeMember.src}
                  alt={activeMember.name}
                  slotLabel={activeMember.name}
                  aspectRatio="aspect-[3/4]"
                  fit={activeMember.presentation.fit}
                  position={activeMember.presentation.position}
                />

                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-200 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{activeMember.name}</span>
                </div>
              </div>

              {/* Mobile Metadata */}
              <div className="p-4 bg-zinc-950 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span className="text-red-400 font-bold">{activeMember.role}</span>
                  <span className="text-zinc-500 text-[10px]">{activeMember.year}</span>
                </div>

                <p className="text-white font-cinzel text-sm font-semibold tracking-wide mb-1">
                  {activeMember.quote}
                </p>

                <p className="text-zinc-400 text-xs font-sans line-clamp-2 leading-relaxed">
                  {activeMember.caption}
                </p>
              </div>
            </article>

            {/* Mobile Navigation Arrows */}
            <div className="flex items-center justify-between w-full mt-3 px-2">
              <button
                onClick={handlePrevMember}
                disabled={activeIndex === 0}
                aria-label="Previous member"
                className={`p-2 rounded-full border border-white/10 bg-zinc-950/80 text-zinc-300 transition-all ${
                  activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-red-600/50 hover:text-white cursor-pointer'
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-[11px] font-mono text-zinc-400 tracking-wider">
                MEMBER {activeIndex + 1} OF {MEMBERS.length}
              </span>

              <button
                onClick={handleNextMember}
                disabled={activeIndex === MEMBERS.length - 1}
                aria-label="Next member"
                className={`p-2 rounded-full border border-white/10 bg-zinc-950/80 text-zinc-300 transition-all ${
                  activeIndex === MEMBERS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-red-600/50 hover:text-white cursor-pointer'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
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
