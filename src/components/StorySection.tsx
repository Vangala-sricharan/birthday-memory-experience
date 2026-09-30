import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicArtwork } from './CinematicArtwork';
import { memories } from '../data/memories';

gsap.registerPlugin(ScrollTrigger);

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate text reveal on scroll for each story block
      const textBlocks = section.querySelectorAll('.story-text-reveal');
      textBlocks.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, filter: 'blur(12px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate photo reveals
      const photoBlocks = section.querySelectorAll('.story-photo-reveal');
      photoBlocks.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9, y: 60 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const slot1 = memories[0] || {
    id: 2,
    src: '/images/birthday/02-ajay.jpeg',
    title: '02 — AJAY',
    year: 'MILESTONE',
  };
  const slot2 = memories[1] || {
    id: 3,
    src: '/images/birthday/03-beer.jpeg',
    title: '03 — BEER',
    year: 'REVELRY',
  };
  const slot3 = memories[2] || {
    id: 4,
    src: '/images/birthday/04-bhargav.jpeg',
    title: '04 — BHARGAV',
    year: 'SOLIDARITY',
  };

  return (
    <section
      id="story-section"
      ref={sectionRef}
      className="relative w-full py-32 px-6 md:px-16 bg-black text-white select-none overflow-hidden"
    >
      {/* Background Subtle Red Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-950/20 blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-32">
        {/* Section Header */}
        <div className="text-center story-text-reveal">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-[0.35em] text-red-500 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>THE NARRATIVE CHRONICLE</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wider text-metallic uppercase">
            THE STORY OF US
          </h2>
        </div>

        {/* Narrative Beat 1 */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="story-text-reveal text-2xl md:text-4xl lg:text-5xl font-cinzel font-light tracking-wide text-zinc-300 max-w-3xl leading-relaxed mb-12">
            “Some people enter your life quietly...”
          </p>

          <div className="story-photo-reveal w-full max-w-3xl rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
            <CinematicArtwork
              src={slot1.src}
              alt={slot1.title}
              slotLabel={slot1.title}
              aspectRatio="aspect-[16/9]"
            />
            <div className="bg-zinc-950 px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-white tracking-widest uppercase">{slot1.title}</span>
              {slot1.year && <span className="text-red-400 font-bold">{slot1.year}</span>}
            </div>
          </div>
        </div>

        {/* Narrative Beat 2 */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="story-text-reveal text-2xl md:text-4xl lg:text-5xl font-cinzel font-light tracking-wide text-metallic-silver max-w-3xl leading-relaxed mb-12">
            “...and somehow become part of the story.”
          </p>

          <div className="story-photo-reveal w-full max-w-3xl rounded-lg overflow-hidden border border-red-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
            <CinematicArtwork
              src={slot2.src}
              alt={slot2.title}
              slotLabel={slot2.title}
              aspectRatio="aspect-[16/9]"
            />
            <div className="bg-zinc-950 px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-white tracking-widest uppercase">{slot2.title}</span>
              {slot2.year && <span className="text-red-400 font-bold">{slot2.year}</span>}
            </div>
          </div>
        </div>

        {/* Narrative Beat 3 */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="story-text-reveal text-2xl md:text-4xl lg:text-5xl font-cinzel font-light tracking-wide text-zinc-300 max-w-3xl leading-relaxed mb-12">
            “Some memories defy the passage of years...”
          </p>

          <div className="story-photo-reveal w-full max-w-3xl rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
            <CinematicArtwork
              src={slot3.src}
              alt={slot3.title}
              slotLabel={slot3.title}
              aspectRatio="aspect-[16/9]"
            />
            <div className="bg-zinc-950 px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-white tracking-widest uppercase">{slot3.title}</span>
              {slot3.year && <span className="text-amber-400 font-bold">{slot3.year}</span>}
            </div>
          </div>
        </div>

        {/* Narrative Beat 4 */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="story-text-reveal text-3xl md:text-6xl lg:text-7xl font-cinzel font-black tracking-wider text-metallic-crimson uppercase max-w-3xl leading-tight">
            “...and simply stay.”
          </p>
        </div>
      </div>
    </section>
  );
};
