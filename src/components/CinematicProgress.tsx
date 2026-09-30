import React, { useEffect, useState, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ChapterItem {
  id: string;
  number: string;
  label: string;
}

const CHAPTERS: ChapterItem[] = [
  { id: 'hero-section', number: '01', label: 'PROLOGUE' },
  { id: 'journey-section', number: '02', label: 'THE RUN' },
  { id: 'story-section', number: '03', label: 'THE STORY' },
  { id: 'moments-section', number: '04', label: 'MOMENTS' },
  { id: 'gallery-section', number: '05', label: '3D VAULT' },
  { id: 'finale-section', number: '06', label: 'FINALE' },
];

interface InnerCircleState {
  isActive: boolean;
  memberNumber: string;
  memberName: string;
}

export const CinematicProgress: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [innerCircleState, setInnerCircleState] = useState<InnerCircleState | null>(null);
  const isInnerCircleActiveRef = useRef<boolean>(false);

  useEffect(() => {
    const handleInnerCircleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        isActive: boolean;
        memberIndex: number;
        memberNumber: string;
        memberName: string;
        progress: number;
      }>;

      if (customEvent.detail) {
        if (customEvent.detail.isActive) {
          isInnerCircleActiveRef.current = true;
          setInnerCircleState({
            isActive: true,
            memberNumber: customEvent.detail.memberNumber,
            memberName: customEvent.detail.memberName,
          });
          setActiveIndex(1); // Locked firmly on Chapter 02
        } else {
          isInnerCircleActiveRef.current = false;
          setInnerCircleState(null);
        }
      }
    };

    window.addEventListener('innerCircleUpdate', handleInnerCircleUpdate);
    return () => {
      window.removeEventListener('innerCircleUpdate', handleInnerCircleUpdate);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollable > 0 ? Math.min(1, Math.max(0, scrollY / totalScrollable)) : 0;
      setOverallProgress(progress);

      // If currently inside the pinned Inner Circle portrait sequence, lock to Chapter 02
      if (isInnerCircleActiveRef.current) {
        setActiveIndex(1);
        return;
      }

      // Determine active section with viewport midpoint bias
      const scrollPosition = scrollY + window.innerHeight * 0.45;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Hook to ScrollTrigger refresh for synchronized physics
    ScrollTrigger.addEventListener('refresh', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      ScrollTrigger.removeEventListener('refresh', updateProgress);
    };
  }, []);

  const activeChapter = CHAPTERS[activeIndex] || CHAPTERS[0];

  return (
    <aside
      aria-label="Cinematic Experience Progress"
      className="fixed top-1/2 -translate-y-1/2 right-3 sm:right-6 md:right-8 z-40 select-none pointer-events-none flex flex-col items-end"
    >
      {/* Chapter Counter Badge */}
      <div className="flex flex-col items-end mb-3 pr-0.5">
        <div className="flex items-center gap-1 font-mono tracking-widest text-[10px] sm:text-xs">
          <span className="text-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            {activeChapter.number}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500">06</span>
        </div>

        {/* Dynamic Portrait Member Label when inside Chapter 02 (The Inner Circle) */}
        {innerCircleState?.isActive ? (
          <div className="flex flex-col items-end">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] text-red-400 uppercase mt-0.5 text-right drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-300">
              {innerCircleState.memberNumber} — {innerCircleState.memberName}
            </span>
            <span className="text-[7px] sm:text-[8px] font-cinzel tracking-[0.25em] text-zinc-500 uppercase text-right">
              THE INNER CIRCLE
            </span>
          </div>
        ) : (
          <span className="hidden sm:block text-[8px] md:text-[9px] font-cinzel font-semibold tracking-[0.25em] text-zinc-400 uppercase mt-0.5 text-right transition-all duration-300">
            {activeChapter.label}
          </span>
        )}
      </div>

      {/* Vertical Progress Rail System */}
      <div className="relative w-4 sm:w-6 flex flex-col items-center py-2 h-44 sm:h-56 md:h-64">
        {/* Background Track Rail */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />

        {/* Dynamic Glowing Filled Progress Track */}
        <div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-red-600 via-red-500 to-amber-500 shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-all duration-150 ease-out"
          style={{ height: `${Math.max(2, overallProgress * 100)}%` }}
        />

        {/* 6 Chapter Indicator Nodes */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between items-center">
          {CHAPTERS.map((chapter, idx) => {
            const isActive = activeIndex === idx;
            const isPassed = activeIndex > idx;

            return (
              <div
                key={chapter.id}
                className="relative flex items-center justify-center"
              >
                {/* Active Indicator Pulse Ring */}
                {isActive && (
                  <span className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600/20 animate-ping pointer-events-none" />
                )}

                {/* Node Dot */}
                <div
                  className={`transition-all duration-500 rounded-full ${
                    isActive
                      ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 ring-2 sm:ring-4 ring-red-500/30 shadow-[0_0_14px_rgba(239,68,68,1)]'
                      : isPassed
                      ? 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-900/80 border border-red-700/50'
                      : 'w-1.5 h-1.5 bg-zinc-800 border border-white/10'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Scroll Percentage Indicator */}
      <div className="mt-2 pr-0.5 font-mono text-[8px] sm:text-[9px] tracking-wider text-zinc-500">
        {Math.round(overallProgress * 100)}%
      </div>
    </aside>
  );
};
