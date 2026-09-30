import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CINEMATIC_QUOTES } from '../data/memories';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const InteractiveQuotes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const quoteCards = container.querySelectorAll('.quote-word-reveal');

      quoteCards.forEach((card) => {
        const words = card.querySelectorAll('.quote-word');
        gsap.fromTo(
          words,
          { opacity: 0, y: 15, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 md:px-16 bg-[#020202] text-white select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-24">
        {CINEMATIC_QUOTES.map((q, idx) => {
          const words = q.quote.split(' ');
          return (
            <div
              key={idx}
              className="quote-word-reveal relative p-8 md:p-12 rounded-xl border border-white/10 bg-zinc-950/60 backdrop-blur-md shadow-2xl flex flex-col items-center text-center group hover:border-red-600/40 transition-colors"
            >
              <Quote size={28} className="text-red-600/60 mb-6 group-hover:text-red-500 transition-colors" />

              {/* Word-by-word reveal container */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-cinzel font-normal tracking-wide text-zinc-200 leading-relaxed mb-6">
                “
                {words.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="quote-word inline-block mr-2"
                  >
                    {word}
                  </span>
                ))}
                ”
              </blockquote>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-mono tracking-[0.25em] text-red-400 uppercase font-semibold">
                  {q.author}
                </span>
                <span className="text-[11px] font-sans text-zinc-500 italic">
                  {q.accent}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
