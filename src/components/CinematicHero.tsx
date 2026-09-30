import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { CinematicArtwork } from './CinematicArtwork';
import { HERO_IMAGE } from '../data/memories';

interface CinematicHeroProps {
  friendName: string;
  chapterNumber: string;
  birthdayYear: string;
  parallaxX: number;
  parallaxY: number;
  onExploreClick: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  friendName,
  chapterNumber,
  birthdayYear,
  parallaxX,
  parallaxY,
  onExploreClick,
}) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const title1Ref = useRef<HTMLDivElement | null>(null);
  const title2Ref = useRef<HTMLDivElement | null>(null);
  const titleFinalRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial dark state -> Red light blooms
    tl.to(glowRef.current, {
      opacity: 0.8,
      scale: 1.15,
      duration: 1.8,
      ease: 'power2.inOut',
    });

    // Phase 0: "ONE MORE YEAR." emerges blur-to-sharp
    tl.fromTo(
      title1Ref.current,
      { opacity: 0, filter: 'blur(16px)', y: 30, letterSpacing: '0.4em' },
      { opacity: 1, filter: 'blur(0px)', y: 0, letterSpacing: '0.2em', duration: 1.6 },
      '-=0.8'
    );

    // Hold briefly, then transition to Phase 1: "ONE MORE CHAPTER."
    tl.to(
      title1Ref.current,
      {
        opacity: 0,
        filter: 'blur(12px)',
        y: -30,
        duration: 1.0,
        onComplete: () => setPhase(1),
      },
      '+=0.8'
    );

    tl.fromTo(
      title2Ref.current,
      { opacity: 0, filter: 'blur(16px)', y: 30, letterSpacing: '0.4em' },
      { opacity: 1, filter: 'blur(0px)', y: 0, letterSpacing: '0.2em', duration: 1.6 },
      '-=0.2'
    );

    // Hold briefly, then transition to Phase 2: "HAPPY BIRTHDAY, DHARMA RAJU"
    tl.to(
      title2Ref.current,
      {
        opacity: 0,
        filter: 'blur(12px)',
        y: -30,
        duration: 1.0,
        onComplete: () => setPhase(2),
      },
      '+=0.9'
    );

    // Phase 2 Typography emerges
    tl.fromTo(
      titleFinalRef.current,
      { opacity: 0, filter: 'blur(20px)', scale: 0.94, y: 20 },
      { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 2.0 },
      '-=0.2'
    );

    // Subtle cinematic entrance for the birthday date
    if (dateRef.current) {
      tl.fromTo(
        dateRef.current,
        { opacity: 0, filter: 'blur(10px)', y: 10 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out' },
        '-=1.4'
      );
    }

    // 01 — HERO IMAGE enters with cinematic scale, blur-to-sharp, and depth
    tl.fromTo(
      heroImageContainerRef.current,
      { opacity: 0, scale: 0.88, filter: 'blur(18px)', y: 50 },
      { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 2.2, ease: 'power3.out' },
      '-=1.2'
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.2 },
      '-=1.0'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-12 md:pt-16 pb-16 select-none"
    >
      {/* 3D Depth Layer 1: Atmospheric Center Red Light Flare (1x Parallax) */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] md:w-[850px] h-[350px] md:h-[600px] rounded-full bg-red-800/20 blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${parallaxX * 20}px), calc(-50% + ${parallaxY * 20}px), 0)`,
        }}
      />

      {/* Anamorphic Crimson Laser Streak in background */}
      <div
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent pointer-events-none transition-transform duration-500"
        style={{
          transform: `translateY(${parallaxY * 30}px) scaleX(1.2)`,
        }}
      />

      {/* 3D Depth Layer 2: Middle floating typographic indices (2x Parallax) */}
      <div
        className="absolute top-6 md:top-8 left-6 md:left-14 text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase flex items-center gap-2 pointer-events-none transition-transform duration-500"
        style={{
          transform: `translate3d(${parallaxX * 35}px, ${parallaxY * 35}px, 0)`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
        <span>MEMORANDUM // {chapterNumber}</span>
      </div>

      <div
        className="absolute top-6 md:top-8 right-6 md:right-14 text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase pointer-events-none transition-transform duration-500"
        style={{
          transform: `translate3d(${parallaxX * -35}px, ${parallaxY * -35}px, 0)`,
        }}
      >
        <span>EDITION // {birthdayYear}</span>
      </div>

      {/* 3D Depth Layer 3: Main Dynamic Typography (3x Parallax) */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto transition-transform duration-500 w-full"
        style={{
          transform: `translate3d(${parallaxX * 40}px, ${parallaxY * 40}px, 0)`,
        }}
      >
        {/* Phase 0 Container */}
        <div
          ref={title1Ref}
          className={`${phase === 0 ? 'block' : 'hidden'} text-center`}
        >
          <p className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-red-500 mb-3">
            PROLOGUE
          </p>
          <h1
            style={{ fontSize: 'clamp(2.25rem, 6.2vw, 5.25rem)' }}
            className="font-cinzel font-black tracking-[0.15em] text-metallic uppercase leading-tight"
          >
            ONE MORE YEAR.
          </h1>
        </div>

        {/* Phase 1 Container */}
        <div
          ref={title2Ref}
          className={`${phase === 1 ? 'block' : 'hidden'} text-center`}
        >
          <p className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-amber-500/80 mb-3">
            THE ODYSSEY CONTINUES
          </p>
          <h1
            style={{ fontSize: 'clamp(2.25rem, 6.2vw, 5.25rem)' }}
            className="font-cinzel font-black tracking-[0.15em] text-metallic uppercase leading-tight"
          >
            ONE MORE CHAPTER.
          </h1>
        </div>

        {/* Phase 2: Final Grand Reveal */}
        <div
          ref={titleFinalRef}
          className={`${phase === 2 ? 'flex' : 'hidden'} flex-col items-center w-full`}
        >
          {/* HONORING THE MILESTONE */}
          <p className="text-[10px] sm:text-xs md:text-sm font-cinzel tracking-[0.35em] sm:tracking-[0.4em] uppercase text-zinc-400 mb-1">
            HONORING THE MILESTONE
          </p>

          {/* Birthday Date */}
          <div
            ref={dateRef}
            className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-2.5"
          >
            <span className="w-6 sm:w-10 md:w-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
            <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] text-red-400 uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]">
              30 SEPTEMBER
            </span>
            <span className="w-6 sm:w-10 md:w-12 h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
          </div>

          {/* Scaled Responsive Main Birthday Typography */}
          <h1
            style={{ fontSize: 'clamp(2rem, 5.2vw, 4.25rem)' }}
            className="font-cinzel font-black tracking-[0.1em] text-metallic-silver uppercase leading-none drop-shadow-2xl mt-1"
          >
            HAPPY
          </h1>
          <h1
            style={{ fontSize: 'clamp(2rem, 5.2vw, 4.25rem)' }}
            className="font-cinzel font-black tracking-[0.1em] text-metallic-silver uppercase leading-none drop-shadow-2xl mt-1 sm:mt-1.5"
          >
            BIRTHDAY,
          </h1>

          <div className="relative mt-2 sm:mt-2.5">
            <h2
              style={{ fontSize: 'clamp(1.75rem, 5.6vw, 4.75rem)' }}
              className="font-cinzel font-black tracking-[0.06em] sm:tracking-[0.1em] text-metallic-crimson uppercase leading-none whitespace-nowrap"
            >
              {friendName || 'DHARMA RAJU'}
            </h2>
            {/* Subtle red underglow */}
            <div className="absolute inset-0 bg-red-600/20 blur-xl -z-10 pointer-events-none" />
          </div>

          <div
            ref={subtitleRef}
            className="mt-4 sm:mt-5 max-w-xl text-zinc-400 font-sans font-light text-xs sm:text-sm md:text-base tracking-wide leading-relaxed mb-6 sm:mb-8"
          >
            A cinematic testament to memories forged, journeys shared, and the untold wonders awaiting your next horizon.
          </div>

          {/* PRIMARY HERO IMAGE: 01 — HERO (Must be the first major photograph shown) */}
          <div
            ref={heroImageContainerRef}
            className={`w-full ${HERO_IMAGE.presentation.containerMaxWidth} rounded-xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative group transition-transform duration-500`}
            style={{
              transform: `rotateY(${parallaxX * 5}deg) rotateX(${-parallaxY * 5}deg)`,
            }}
          >
            <CinematicArtwork
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.title}
              slotLabel={HERO_IMAGE.title}
              aspectRatio={HERO_IMAGE.presentation.aspectRatio}
              fit={HERO_IMAGE.presentation.fit}
              position={HERO_IMAGE.presentation.position}
              scale={HERO_IMAGE.presentation.scale}
            />

            {/* Subtle Metallic & Red Lighting Overlay */}
            <div className="p-4 sm:p-5 bg-zinc-950/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-white tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {HERO_IMAGE.title}
              </span>
              <span className="text-red-400 font-bold tracking-wider">{HERO_IMAGE.src}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Trigger Affordance */}
      <div className="relative mt-10 sm:mt-12 z-20 flex flex-col items-center gap-2">
        <button
          onClick={onExploreClick}
          aria-label="Scroll to explore moments"
          className="flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL TO WITNESS</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 group-hover:border-red-500/70 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-red-500 animate-bounce" />
          </div>
          <ChevronDown size={14} className="text-zinc-600 group-hover:text-red-400 transition-colors animate-pulse" />
        </button>
      </div>
    </section>
  );
};
