import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Navigation as CompassIcon, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MomentsHorizontalPinnedProps {
  friendName: string;
}

export const MomentsHorizontalPinned: React.FC<MomentsHorizontalPinnedProps> = ({ friendName }) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const wheelsRef = useRef<(SVGGElement | null)[]>([]);
  const roadMarksRef = useRef<HTMLDivElement | null>(null);
  const skylineRef = useRef<HTMLDivElement | null>(null);
  const mountainsRef = useRef<HTMLDivElement | null>(null);
  const milestonesRef = useRef<HTMLDivElement | null>(null);

  const [velocitySpeed, setVelocitySpeed] = useState<number>(0);
  const [currentMilestone, setCurrentMilestone] = useState<number>(1);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    const car = carRef.current;
    const roadMarks = roadMarksRef.current;
    const skyline = skylineRef.current;
    const mountains = mountainsRef.current;
    const milestones = milestonesRef.current;

    if (!trigger || !container || !car) return;

    // Create GSAP ScrollTrigger timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: '+=3000', // Vertical scroll distance for full horizontal journey
          scrub: 1.2,    // Smooth 60fps physics interpolation
          pin: container,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Speedometer responds directly to scroll velocity
            const speed = Math.round(Math.abs(self.getVelocity()) / 25);
            setVelocitySpeed(Math.min(180, Math.max(0, speed)));

            // Milestone progression
            const progress = self.progress;
            if (progress < 0.25) setCurrentMilestone(1);
            else if (progress < 0.5) setCurrentMilestone(2);
            else if (progress < 0.75) setCurrentMilestone(3);
            else setCurrentMilestone(4);

            // Wheel rotation directly bound to scroll progress
            const wheelAngle = progress * 2880; // Multiple rotations
            wheelsRef.current.forEach((wheel) => {
              if (wheel) {
                wheel.setAttribute('transform', `rotate(${wheelAngle} 25 25)`);
              }
            });
          },
        },
      });

      // 1. Car moves horizontally across screen from left entry to cruising center-right
      tl.fromTo(
        car,
        { x: -280, y: 0 },
        { x: () => window.innerWidth * 0.42, ease: 'none', duration: 1.5 }
      )
      .to(
        car,
        { x: () => window.innerWidth * 0.75, ease: 'none', duration: 1.5 }
      );

      // 2. Parallax: Road surface markings scroll rapidly to the left
      if (roadMarks) {
        tl.fromTo(
          roadMarks,
          { x: 0 },
          { x: -1600, ease: 'none', duration: 3 },
          0
        );
      }

      // 3. Parallax: Mountains scroll at medium speed
      if (mountains) {
        tl.fromTo(
          mountains,
          { x: 0 },
          { x: -900, ease: 'none', duration: 3 },
          0
        );
      }

      // 4. Parallax: Distant skyline / stars scroll slowly
      if (skyline) {
        tl.fromTo(
          skyline,
          { x: 0 },
          { x: -450, ease: 'none', duration: 3 },
          0
        );
      }

      // 5. Milestones cards slide from right to left
      if (milestones) {
        tl.fromTo(
          milestones,
          { x: 1200 },
          { x: -2400, ease: 'none', duration: 3 },
          0
        );
      }
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="journey-section"
      ref={triggerRef}
      className="relative w-full bg-black select-none"
      style={{ height: '400vh' }} // Tall vertical track that drives horizontal animation
    >
      {/* Pinned Viewport Container */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between relative bg-[#030303]"
      >
        {/* Sky / Twilight Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#140508] to-[#250810]" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] rounded-full bg-red-900/15 blur-[140px] pointer-events-none" />

        {/* Section Header HUD */}
        <div className="relative z-30 pt-20 px-8 md:px-16 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.35em] text-red-500 uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span>THE EXPEDITION // CHAPTER RUN</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-cinzel font-black text-white tracking-wider uppercase">
              THROUGH EVERY HORIZON
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-md mt-1">
              Scroll down to propel the journey. Vertical momentum directly commands horizontal velocity.
            </p>
          </div>

          {/* Luxury Telemetry Widget */}
          <div className="hidden sm:flex flex-col items-end gap-2 bg-zinc-950/80 border border-white/10 backdrop-blur-md px-5 py-3 rounded-lg">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Gauge size={14} className="text-red-500" />
                <span className="text-white font-bold tracking-wider">{velocitySpeed}</span> KM/H
              </span>
              <span className="text-zinc-600">|</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CompassIcon size={14} className="text-amber-500" />
                STAGE {currentMilestone}/4
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400">
              PILOT // {friendName.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Layer 1: Distant City Skyline & Celestial Stars (Slow Parallax) */}
        <div
          ref={skylineRef}
          className="absolute bottom-44 left-0 w-[4000px] h-44 pointer-events-none opacity-40 z-10 flex items-end"
        >
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2000 200">
            {/* Repeating skyline silhouettes */}
            <path
              d="M0,200 L0,110 L40,110 L40,60 L70,60 L70,110 L120,110 L120,40 L160,40 L160,110 L230,110 L230,80 L280,80 L280,130 L350,130 L350,20 L380,20 L380,130 L450,130 L450,90 L500,90 L500,200 Z"
              fill="#18181b"
            />
            <path
              d="M500,200 L500,100 L540,100 L540,50 L580,50 L580,100 L640,100 L640,70 L700,70 L700,120 L760,120 L760,30 L800,30 L800,120 L870,120 L870,80 L920,80 L920,200 Z"
              fill="#121215"
            />
            <path
              d="M1000,200 L1000,110 L1040,110 L1040,60 L1070,60 L1070,110 L1120,110 L1120,40 L1160,40 L1160,110 L1230,110 L1230,80 L1280,80 L1280,130 L1350,130 L1350,20 L1380,20 L1380,130 L1450,130 L1450,90 L1500,90 L1500,200 Z"
              fill="#18181b"
            />
          </svg>
        </div>

        {/* Layer 2: Mid-ground Alpine Ridge & Dunes (Medium Parallax) */}
        <div
          ref={mountainsRef}
          className="absolute bottom-36 left-0 w-[4500px] h-56 pointer-events-none opacity-70 z-10"
        >
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 2500 250">
            <polygon
              points="0,250 180,70 380,210 650,40 920,230 1200,90 1480,240 1750,50 2050,210 2350,80 2500,250"
              fill="#09090b"
            />
          </svg>
        </div>

        {/* Layer 3: Passing Milestones along the route */}
        <div
          ref={milestonesRef}
          className="absolute bottom-48 left-0 flex items-center gap-48 z-15 pointer-events-none"
        >
          <div className="w-80 p-5 rounded-lg bg-black/85 border border-red-900/40 backdrop-blur-md text-white shadow-2xl">
            <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase block mb-1">
              MILESTONE 01 // 2022
            </span>
            <h4 className="text-lg font-cinzel font-bold text-white mb-1">THE FIRST ROAD TRIP</h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Windows down in the cool coastal breeze. Laughing at wrong turns that became unforgettable destinations.
            </p>
          </div>

          <div className="w-80 p-5 rounded-lg bg-black/85 border border-white/15 backdrop-blur-md text-white shadow-2xl">
            <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase block mb-1">
              MILESTONE 02 // 2023
            </span>
            <h4 className="text-lg font-cinzel font-bold text-white mb-1">THE MIDNIGHT ODYSSEY</h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              When ideas were born over 2 AM diners and ambition burned brighter than city skylines.
            </p>
          </div>

          <div className="w-80 p-5 rounded-lg bg-black/85 border border-red-900/40 backdrop-blur-md text-white shadow-2xl">
            <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase block mb-1">
              MILESTONE 03 // 2024
            </span>
            <h4 className="text-lg font-cinzel font-bold text-white mb-1">WEATHERING THE STORM</h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Side by side when challenges struck, proving that true alliance never wavers when roads get steep.
            </p>
          </div>

          <div className="w-80 p-5 rounded-lg bg-black/85 border border-white/15 backdrop-blur-md text-white shadow-2xl">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
              MILESTONE 04 // 2026
            </span>
            <h4 className="text-lg font-cinzel font-bold text-white mb-1">THE NEW ERA AHEAD</h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Standing tall at the boundary of a brand-new year. Greater heights await your command.
            </p>
          </div>
        </div>

        {/* Layer 4: The Asphalt Road & High-Speed Highway Track */}
        <div className="relative w-full h-36 bg-gradient-to-b from-[#111113] to-[#040404] border-t border-zinc-800 z-20 overflow-hidden">
          {/* Subtle asphalt texture */}
          <div className="absolute inset-0 opacity-15 film-grain" />

          {/* Road guardrail */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-900/40 via-zinc-600/40 to-red-900/40" />

          {/* Dashed Center Road Lines (moving fast with scroll) */}
          <div
            ref={roadMarksRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 w-[5000px] h-[4px] flex items-center gap-12 pointer-events-none"
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="w-16 h-1 bg-gradient-to-r from-amber-400/90 to-amber-200/90 rounded-sm shadow-[0_0_8px_rgba(251,191,36,0.6)] shrink-0"
              />
            ))}
          </div>

          {/* Road side reflector posts */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4 opacity-50">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-red-600/80 rounded-sm" />
            ))}
          </div>
        </div>

        {/* The Star of the Scene: Sleek Luxury GT Sports Coupe (Controlled by Scroll) */}
        <div
          ref={carRef}
          className="absolute bottom-24 z-25 pointer-events-none filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
        >
          <div className="relative w-[340px] md:w-[420px] h-[130px]">
            {/* Front Headlight Beam (Bright Xenon beam cutting through twilight) */}
            <div
              className="absolute top-12 left-[90%] w-[320px] md:w-[460px] h-[90px] bg-gradient-to-r from-white/35 via-red-500/15 to-transparent pointer-events-none"
              style={{
                clipPath: 'polygon(0% 30%, 100% 0%, 100% 100%, 0% 85%)',
                filter: 'blur(6px)',
              }}
            />

            {/* Rear Crimson Taillight Trails */}
            <div className="absolute top-14 -left-20 w-24 h-4 bg-gradient-to-l from-red-600/80 to-transparent blur-[3px]" />

            {/* Luxury Automobile Vector Silhouette */}
            <svg
              className="w-full h-full"
              viewBox="0 0 500 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#0a0a0a" />
                  <stop offset="35%" stopColor="#1a060a" />
                  <stop offset="65%" stopColor="#2d0a11" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
                <linearGradient id="carRoof" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#52525b" />
                  <stop offset="100%" stopColor="#09090b" />
                </linearGradient>
                <linearGradient id="rimChrome" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Under-chassis shadow & red underglow */}
              <ellipse cx="250" cy="142" rx="210" ry="10" fill="#000000" opacity="0.85" />
              <ellipse cx="250" cy="140" rx="140" ry="6" fill="#dc2626" opacity="0.25" filter="blur(4px)" />

              {/* Main Grand Tourer Body Line */}
              <path
                d="M 40 120 
                   Q 30 115 32 98 
                   Q 35 78 70 74 
                   L 130 72 
                   L 190 32 
                   Q 220 22 280 22 
                   L 345 28 
                   L 415 65 
                   Q 470 72 478 92 
                   Q 485 108 470 120 
                   L 435 120 
                   Q 430 85 385 85 
                   Q 340 85 335 120 
                   L 185 120 
                   Q 180 85 135 85 
                   Q 90 85 85 120 
                   Z"
                fill="url(#carBody)"
                stroke="#3f3f46"
                strokeWidth="1.5"
              />

              {/* Cabin Glass & Pillar */}
              <path
                d="M 195 36 
                   L 278 26 
                   L 340 32 
                   L 395 68 
                   L 205 68 
                   Z"
                fill="#050508"
                stroke="#71717a"
                strokeWidth="1"
                opacity="0.9"
              />
              {/* Window partition divider */}
              <line x1="280" y1="26" x2="282" y2="68" stroke="#3f3f46" strokeWidth="2" />

              {/* Front Aerodynamic Splitter & Grille */}
              <path d="M 450 95 L 480 98 L 475 116 L 440 116 Z" fill="#18181b" />
              {/* Front Headlight Cluster */}
              <polygon points="440,75 470,82 460,94 435,88" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />

              {/* Rear Aerodynamic Lip & Taillight Strip */}
              <path d="M 32 88 L 48 88 L 46 98 L 30 96 Z" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)" />

              {/* Chrome side accent line */}
              <path d="M 120 78 L 360 78" stroke="url(#rimChrome)" strokeWidth="1" opacity="0.6" />

              {/* Front Wheel Well & Spinning Alloy Wheel */}
              <g transform="translate(360, 95)">
                <circle cx="25" cy="25" r="26" fill="#000000" stroke="#27272a" strokeWidth="3" />
                <circle cx="25" cy="25" r="18" fill="#18181b" stroke="url(#rimChrome)" strokeWidth="2" />
                {/* 5-Spoke Wheel that rotates with velocity */}
                <g ref={(el) => { wheelsRef.current[0] = el; }}>
                  <line x1="25" y1="25" x2="25" y2="7" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="42" y2="20" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="35" y2="39" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="15" y2="39" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="8" y2="20" stroke="url(#rimChrome)" strokeWidth="3" />
                  <circle cx="25" cy="25" r="5" fill="#dc2626" />
                </g>
              </g>

              {/* Rear Wheel Well & Spinning Alloy Wheel */}
              <g transform="translate(110, 95)">
                <circle cx="25" cy="25" r="26" fill="#000000" stroke="#27272a" strokeWidth="3" />
                <circle cx="25" cy="25" r="18" fill="#18181b" stroke="url(#rimChrome)" strokeWidth="2" />
                {/* 5-Spoke Wheel that rotates with velocity */}
                <g ref={(el) => { wheelsRef.current[1] = el; }}>
                  <line x1="25" y1="25" x2="25" y2="7" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="42" y2="20" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="35" y2="39" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="15" y2="39" stroke="url(#rimChrome)" strokeWidth="3" />
                  <line x1="25" y1="25" x2="8" y2="20" stroke="url(#rimChrome)" strokeWidth="3" />
                  <circle cx="25" cy="25" r="5" fill="#dc2626" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Pinned Footer Milestone Ticker */}
        <div className="relative z-30 pb-6 px-8 md:px-16 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>VERTICAL SCROLL SYNCHRONIZED</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-300">
            <Sparkles size={13} className="text-amber-500" />
            <span>CHAPTER RELEASES AT DESTINATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};
