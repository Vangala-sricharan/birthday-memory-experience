import React, { useEffect, useRef } from 'react';
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
  parallaxX,
  parallaxY,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial atmospheric lighting flare bloom
    tl.fromTo(
      glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 0.85, scale: 1.15, duration: 1.8, ease: 'power2.out' }
    );

    // Central Birthday Typography emerges with cinematic blur-to-sharp & subtle scale
    tl.fromTo(
      titleContainerRef.current,
      { opacity: 0, filter: 'blur(20px)', scale: 0.94, y: 25 },
      { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 2.0 },
      '-=1.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const displayName = (friendName || 'DHARMA RAJU').trim();

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative w-full bg-[#030303] select-none overflow-hidden"
    >
      {/* 3D Depth Layer 1: Atmospheric Center Red Light Flare */}
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

      {/* INITIAL FULL VIEWPORT: Perfectly Centered Hero Composition */}
      <div className="relative w-full h-screen min-h-[520px] flex flex-col items-center justify-between px-4 sm:px-6 py-8 md:py-12">
        {/* Top spacer for optical vertical centering balance */}
        <div className="w-full h-4 sm:h-8" />

        {/* Central Pure Birthday Typography Stage — ONLY VISIBLE HERO CONTENT */}
        <div
          ref={titleContainerRef}
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto transition-transform duration-500 w-full my-auto"
          style={{
            transform: `translate3d(${parallaxX * 35}px, ${parallaxY * 35}px, 0)`,
          }}
        >
          {/* HAPPY */}
          <h1
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5rem)' }}
            className="font-cinzel font-black tracking-[0.14em] text-metallic-silver uppercase leading-none drop-shadow-2xl"
          >
            HAPPY
          </h1>

          {/* BIRTHDAY, */}
          <h1
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5rem)' }}
            className="font-cinzel font-black tracking-[0.14em] text-metallic-silver uppercase leading-none drop-shadow-2xl mt-2 sm:mt-3"
          >
            BIRTHDAY,
          </h1>

          {/* DHARMA RAJU */}
          <div className="relative mt-3 sm:mt-4">
            <h2
              style={{ fontSize: 'clamp(1.75rem, 6.2vw, 5.5rem)' }}
              className="font-cinzel font-black tracking-[0.06em] sm:tracking-[0.1em] text-metallic-crimson uppercase leading-none whitespace-nowrap"
            >
              {displayName}
            </h2>
            {/* Soft ambient red underglow */}
            <div className="absolute inset-0 bg-red-600/25 blur-2xl -z-10 pointer-events-none" />
          </div>
        </div>

        {/* Minimal Bottom Scroll Affordance */}
        <div className="relative z-20 flex flex-col items-center gap-2">
          <button
            onClick={onExploreClick}
            aria-label="Scroll to explore moments"
            className="flex flex-col items-center gap-1.5 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer group"
          >
            <span>SCROLL TO WITNESS</span>
            <div className="w-5 h-8 rounded-full border border-zinc-700 group-hover:border-red-500/70 flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 rounded-full bg-red-500 animate-bounce" />
            </div>
            <ChevronDown size={14} className="text-zinc-600 group-hover:text-red-400 transition-colors animate-pulse" />
          </button>
        </div>
      </div>

      {/* 01 — HERO PHOTOGRAPH: Below-the-fold bridge connecting Hero into Chapter 02 */}
      <div className="relative z-20 w-full flex justify-center px-4 sm:px-6 pb-24 pt-8">
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
    </section>
  );
};
