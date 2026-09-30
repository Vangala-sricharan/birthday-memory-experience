import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { CinematicArtwork } from './CinematicArtwork';
import { SURPRISE_IMAGE } from '../data/memories';
import { Sparkles, Heart, ArrowUp, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinalRevealProps {
  friendName: string;
  finalMessage: string;
  closingQuote: string;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({
  friendName,
  finalMessage,
  closingQuote,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const textStep1Ref = useRef<HTMLDivElement | null>(null);
  const textStep2Ref = useRef<HTMLDivElement | null>(null);
  const textStep3Ref = useRef<HTMLDivElement | null>(null);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);

  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [submittedNote, setSubmittedNote] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Slow timeline as user scrolls into final section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Single spotlight blooms in pure darkness
      tl.fromTo(
        spotlightRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.2, duration: 2.0, ease: 'power2.out' }
      );

      // 2. "AND FINALLY..."
      tl.fromTo(
        textStep1Ref.current,
        { opacity: 0, filter: 'blur(14px)', y: 25 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.4 },
        '-=1.2'
      );

      // 3. "HAPPY BIRTHDAY"
      tl.fromTo(
        textStep2Ref.current,
        { opacity: 0, filter: 'blur(16px)', scale: 0.92 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.6 },
        '+=0.4'
      );

      // 4. "YOUR ARMY" with glowing crimson & gold
      tl.fromTo(
        textStep3Ref.current,
        { opacity: 0, filter: 'blur(20px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.8 },
        '+=0.3'
      );

      // 5. Final Photo Frame gently emerges into the spotlight
      tl.fromTo(
        photoContainerRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power3.out' },
        '+=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triggerCelebration = () => {
    setHasCelebrated(true);

    // Luxury crimson and metallic gold celebratory confetti
    const count = 120;
    const defaults = {
      origin: { y: 0.75 },
      colors: ['#dc2626', '#b91c1c', '#facc15', '#fef08a', '#ffffff'],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.6),
      spread: 70,
      startVelocity: 55,
    });

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalNote.trim()) return;
    setSubmittedNote(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="finale-section"
      ref={containerRef}
      className="relative min-h-screen w-full py-36 px-6 md:px-16 bg-black text-white select-none flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic Spotlight in the dark */}
      <div
        ref={spotlightRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[700px] md:h-[1000px] rounded-full bg-radial from-red-950/30 via-red-900/10 to-transparent blur-[160px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Step 1: AND FINALLY... */}
        <div ref={textStep1Ref} className="mb-6">
          <span className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-red-500">
            AND FINALLY...
          </span>
        </div>

        {/* Step 2: HAPPY BIRTHDAY */}
        <div ref={textStep2Ref} className="mb-4">
          <h2 className="text-4xl sm:text-7xl md:text-8xl font-cinzel font-black tracking-[0.1em] text-metallic uppercase leading-none">
            HAPPY BIRTHDAY
          </h2>
        </div>

        {/* Step 3: YOUR ARMY */}
        <div ref={textStep3Ref} className="relative mb-14">
          <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-cinzel font-black tracking-[0.1em] text-metallic-crimson uppercase leading-none">
            {friendName || 'YOUR ARMY'}
          </span>
          <div className="absolute inset-0 bg-red-600/25 blur-2xl -z-10" />
        </div>

        {/* Step 4: Final Tribute Photo with light aura */}
        <div
          ref={photoContainerRef}
          className="w-full max-w-2xl rounded-2xl overflow-hidden border border-red-800/40 bg-zinc-950 shadow-[0_0_80px_-10px_rgba(220,38,38,0.45)] relative group mb-12"
        >
          {/* Subtle particle / light aura border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-2xl opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />

          <div className="relative z-10">
            <CinematicArtwork
              src={SURPRISE_IMAGE.src}
              alt={SURPRISE_IMAGE.title}
              slotLabel="12 — SURPRISE // 12-surprise.jpeg"
              aspectRatio="aspect-[4/3]"
            />

            <div className="p-8 md:p-10 bg-zinc-950/95 border-t border-white/10 text-center">
              <p className="text-base sm:text-lg md:text-xl font-cinzel font-medium text-white mb-3 tracking-wide">
                “Here’s to another year of memories.”
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans font-light leading-relaxed max-w-lg mx-auto">
                {finalMessage}
              </p>

              {/* Action Button: Ignite Celebration */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={triggerCelebration}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-mono text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={14} />
                  <span>{hasCelebrated ? 'RE-IGNITE CELEBRATION' : 'IGNITE CELEBRATION'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Telegram / Heartfelt Note Tribute Scroll */}
        <div className="w-full max-w-xl p-8 rounded-xl bg-zinc-950/60 border border-white/10 backdrop-blur-md mb-16 text-left">
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-zinc-500 uppercase border-b border-white/5 pb-3 mb-4">
            <span className="flex items-center gap-2 text-zinc-300">
              <Heart size={13} className="text-red-500 fill-red-500" />
              DESPATCH MEMORANDUM
            </span>
            <span>FOR // {friendName || 'YOUR ARMY'}</span>
          </div>

          <p className="text-sm font-sans text-zinc-300 leading-relaxed italic mb-6">
            “{closingQuote}”
          </p>

          {/* Interactive Wish Form */}
          {!submittedNote ? (
            <form onSubmit={handleSendWish} className="flex flex-col gap-3">
              <label htmlFor="wishInput" className="text-[11px] font-mono tracking-wider text-zinc-400">
                LEAVE A PRIVATE BIRTHDAY WISH:
              </label>
              <div className="flex gap-2">
                <input
                  id="wishInput"
                  type="text"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Type your heartfelt wish..."
                  className="flex-1 bg-black/70 border border-white/15 focus:border-red-500 px-4 py-2 rounded text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-mono tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                >
                  <Send size={13} />
                  <span>SEAL</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-3 bg-red-950/40 border border-red-800/40 rounded text-xs text-red-300 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              <span>Wish inscribed into the permanent ledger. Thank you!</span>
            </div>
          )}
        </div>

        {/* Replay Journey Scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform text-red-500" />
          <span>REPLAY EXPERIENCE FROM BEGINNING</span>
        </button>
      </div>
    </section>
  );
};
