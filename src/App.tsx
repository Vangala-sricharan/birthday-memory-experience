/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { DEFAULT_CONFIG, ExperienceConfig } from './data/memories';
import { useParallax } from './hooks/useParallax';
import { useAudioAtmosphere } from './hooks/useAudioAtmosphere';

import { CinematicLoader } from './components/CinematicLoader';
import { CinematicProgress } from './components/CinematicProgress';
import { MotionBackground } from './components/MotionBackground';
import { CinematicHero } from './components/CinematicHero';
import { MomentsHorizontalPinned } from './components/MomentsHorizontalPinned';
import { StorySection } from './components/StorySection';
import { PhotoStory } from './components/PhotoStory';
import { ThreeDPhotoWall } from './components/ThreeDPhotoWall';
import { InteractiveQuotes } from './components/InteractiveQuotes';
import { FinalReveal } from './components/FinalReveal';
import { MusicControl } from './components/MusicControl';
import { CustomizerModal } from './components/CustomizerModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<ExperienceConfig>(DEFAULT_CONFIG);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Parallax hook tracking mouse on desktop & gyroscope tilt on mobile
  const { x: parallaxX, y: parallaxY } = useParallax();

  // Ambient Web Audio soundtrack synthesizer
  const audio = useAudioAtmosphere();

  // Lenis smooth scrolling synchronized with GSAP ScrollTrigger
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  const handleUpdateConfig = (updated: Partial<ExperienceConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleExploreClick = () => {
    const journeyEl = document.getElementById('journey-section');
    if (journeyEl) {
      journeyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 selection:bg-red-600/30 selection:text-white overflow-x-hidden">
      {/* 0% -> 100% Cinematic Loader */}
      {loading && (
        <CinematicLoader
          friendName={config.friendName}
          onComplete={() => setLoading(false)}
        />
      )}

      {/* Cinematic Star Dust & Ambient Atmospheric Nebulae Background */}
      <MotionBackground parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* Right-Side Vertical Cinematic Progress Indicator */}
      <CinematicProgress />

      {/* Main Cinematic Scroll Experience */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 01. PROLOGUE: Hero Experience */}
        <CinematicHero
          friendName={config.friendName}
          chapterNumber={config.chapterNumber}
          birthdayYear={config.birthdayYear}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          onExploreClick={handleExploreClick}
        />

        {/* 02. THE RUN: Real GSAP ScrollTrigger Pinned Horizontal Journey */}
        <MomentsHorizontalPinned friendName={config.friendName} />

        {/* 03. THE STORY: Narrative Chronicle Between Moments */}
        <StorySection />

        {/* 04. OUR MOMENTS: Scale Expansion, Clip-path Wipe, Color Shift & 3D Tilt */}
        <PhotoStory friendName={config.friendName} />

        {/* 05. 3D VAULT: Multi-plane Spatial Interactive Photo Gallery */}
        <ThreeDPhotoWall parallaxX={parallaxX} parallaxY={parallaxY} />

        {/* Interactive Quotes Section: Word-by-word reveal */}
        <InteractiveQuotes />

        {/* 06. THE FINALE: Spotlight in the Dark, Grand Birthday Reveal & Celebration */}
        <FinalReveal
          friendName={config.friendName}
          finalMessage={config.finalMessage}
          closingQuote={config.closingQuote}
        />
      </main>

      {/* Subtle Floating Music Control */}
      <MusicControl
        isPlaying={audio.isPlaying}
        onToggle={audio.togglePlay}
      />

      {/* Slide-over Customization Drawer for Friend's Details & Photo Guide */}
      <CustomizerModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        volume={audio.volume}
        onVolumeChange={audio.setVolume}
      />

      {/* Minimal Footer */}
      <footer className="relative z-20 py-8 px-6 border-t border-white/5 bg-black/90 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          <span>A PRIVATE CINEMATIC TRIBUTE // {config.birthdayYear}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-3 py-1 rounded border border-white/10 hover:border-red-600/50 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer text-[10px] tracking-widest uppercase"
          >
            CUSTOMIZE
          </button>
          <div className="text-zinc-500">
            DESIGNED FOR {config.friendName.toUpperCase()} · ALL MEMORIES RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}
