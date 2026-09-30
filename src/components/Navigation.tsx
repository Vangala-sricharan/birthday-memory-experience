import React, { useState, useEffect } from 'react';

interface NavigationProps {
  friendName: string;
  onOpenSettings: () => void;
}

interface SectionItem {
  id: string;
  number: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'hero-section', number: '01', label: 'PROLOGUE' },
  { id: 'journey-section', number: '02', label: 'THE RUN' },
  { id: 'story-section', number: '03', label: 'THE STORY' },
  { id: 'moments-section', number: '04', label: 'MOMENTS' },
  { id: 'gallery-section', number: '05', label: '3D VAULT' },
  { id: 'finale-section', number: '06', label: 'FINALE' },
];

export const Navigation: React.FC<NavigationProps> = ({ friendName, onOpenSettings }) => {
  const [activeSection, setActiveSection] = useState<string>('hero-section');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top minimal header bar following 3-zone contract */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'bg-black/70 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span className="font-cinzel text-xs md:text-sm tracking-[0.3em] font-semibold text-white uppercase">
            FILM NO. {friendName || 'YOUR ARMY'}
          </span>
        </div>

        {/* Zone 2: Minimal floating section indicator */}
        <nav
          aria-label="Experience Sections"
          className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-wider text-zinc-400"
        >
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`transition-all duration-300 flex items-center gap-1.5 hover:text-white cursor-pointer group ${
                  isActive ? 'text-white font-medium' : 'text-zinc-400'
                }`}
              >
                <span className={isActive ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-400'}>
                  {sec.number}
                </span>
                <span className={`tracking-widest ${isActive ? 'border-b border-red-500 pb-0.5' : ''}`}>
                  {sec.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Edit & Personalize Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 hover:border-red-500/50 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Personalize identity, message & settings"
          >
            EDIT GIFT
          </button>
        </div>
      </header>

      {/* Floating Side Progress Indicator on Desktop */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 pointer-events-auto">
        <span className="text-[9px] font-mono tracking-widest text-zinc-400 rotate-90 mb-4 select-none">
          TIMELINE
        </span>
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={`dot-${sec.id}`}
              onClick={() => scrollToSection(sec.id)}
              aria-label={`Jump to ${sec.label}`}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
            >
              <div
                className={`w-1.5 transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-6 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]'
                    : 'h-1.5 bg-zinc-700 group-hover:bg-zinc-400'
                }`}
              />
              {/* Tooltip on hover */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono tracking-widest bg-zinc-900 border border-white/10 text-white px-2 py-0.5 pointer-events-none">
                {sec.number} {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
};
