import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicArtwork } from './CinematicArtwork';
import { peopleGalleryPhotos, AuthoritativeStoryPhoto } from '../data/memories';
import { Sparkles, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PhotoStoryProps {
  friendName: string;
}

export const PhotoStory: React.FC<PhotoStoryProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Zoom & Scale Expansion cards
      container.querySelectorAll('.moment-expand-card').forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.82, opacity: 0.6, borderRadius: '24px' },
          {
            scale: 1,
            opacity: 1,
            borderRadius: '12px',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'center 45%',
              scrub: 1,
            },
          }
        );
      });

      // 2. Clip-path wipe reveal cards
      container.querySelectorAll('.moment-clip-card').forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0.2 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'center 45%',
              scrub: 1,
            },
          }
        );
      });

      // 3. Grayscale to Color & Blur-to-Sharp cards
      container.querySelectorAll('.moment-filter-card').forEach((card) => {
        gsap.fromTo(
          card,
          { filter: 'grayscale(100%) blur(10px)', scale: 0.95 },
          {
            filter: 'grayscale(0%) blur(0px)',
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'center 50%',
              scrub: 1,
            },
          }
        );
      });

      // 4. 3D Rotation Tilt on scroll cards
      container.querySelectorAll('.moment-tilt-card').forEach((card) => {
        gsap.fromTo(
          card,
          { rotateX: 18, rotateY: -12, scale: 0.9, opacity: 0.5 },
          {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'center 50%',
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getTransitionMeta = (index: number) => {
    const mod = index % 4;
    switch (mod) {
      case 0:
        return {
          cardClass: 'moment-expand-card',
          label: 'TRANSITION // EXPANSION & SCALE',
          wrapperClass: 'flex flex-col items-center',
          innerBorder: 'border border-white/10',
        };
      case 1:
        return {
          cardClass: 'moment-clip-card',
          label: 'TRANSITION // ANAMORPHIC WIPE',
          wrapperClass: 'flex flex-col items-center',
          innerBorder: 'border border-red-900/30',
        };
      case 2:
        return {
          cardClass: 'moment-filter-card',
          label: 'TRANSITION // LUMINESCENCE & CLARITY',
          wrapperClass: 'flex flex-col items-center',
          innerBorder: 'border border-white/10',
        };
      case 3:
      default:
        return {
          cardClass: 'moment-tilt-card',
          label: 'TRANSITION // 3D SPATIAL TILT',
          wrapperClass: 'flex flex-col items-center perspective-1000',
          innerBorder: 'border border-white/15 transform-style-3d',
        };
    }
  };

  return (
    <section
      id="moments-section"
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-16 bg-[#040404] text-white select-none overflow-hidden"
    >
      {/* Background Decorative Red Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-28">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/20 text-red-400 text-xs font-mono tracking-[0.3em] uppercase mb-4">
          <Sparkles size={12} className="text-red-500" />
          <span>PEOPLE GALLERY ({peopleGalleryPhotos.length} FRAMES)</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-cinzel font-black tracking-wider text-metallic uppercase">
          OUR MOMENTS
        </h2>
        <p className="mt-4 text-zinc-400 text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
          “Some people enter your life quietly, and somehow become an essential part of the journey.”
        </p>
      </div>

      {/* Scalable Cinematic Moments Showcase with Per-Photo Canvas Tuning */}
      <div className="max-w-6xl mx-auto flex flex-col gap-36 md:gap-44">
        {peopleGalleryPhotos.map((slot: AuthoritativeStoryPhoto, idx: number) => {
          const meta = getTransitionMeta(idx);
          const isWipe = idx % 4 === 1;
          const containerWidth = slot.presentation?.containerMaxWidth || 'max-w-xl';

          return (
            <div key={slot.id} className={`${meta.wrapperClass} ${containerWidth} mx-auto w-full`}>
              <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4 px-1">
                <span className="flex items-center gap-2 text-red-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  {meta.label}
                </span>
                <span className="text-zinc-500 text-[11px]">
                  FRAME {String(idx + 1).padStart(2, '0')} OF {peopleGalleryPhotos.length} // {slot.presentation.orientation.toUpperCase()}
                </span>
              </div>

              <div
                className={`${meta.cardClass} w-full rounded-2xl overflow-hidden ${meta.innerBorder} shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-zinc-950 relative`}
              >
                <CinematicArtwork
                  src={slot.src}
                  alt={slot.title}
                  slotLabel={slot.title}
                  aspectRatio={slot.presentation.aspectRatio}
                  fit={slot.presentation.fit}
                  position={slot.presentation.position}
                  scale={slot.presentation.scale}
                />

                {/* Optional red light sweep for wipe cards */}
                {isWipe && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent pointer-events-none -translate-x-full animate-[shimmer_3s_infinite]" />
                )}

                <div className="p-6 md:p-8 bg-zinc-950/90 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h3 className="text-xl md:text-2xl font-cinzel font-bold text-white tracking-wide mb-1">
                      {slot.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                      {slot.caption}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 shrink-0">
                    {slot.year && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-red-500" />
                        {slot.year}
                      </span>
                    )}
                    {slot.year && slot.location && <span>·</span>}
                    {slot.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-amber-500" />
                        {slot.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
