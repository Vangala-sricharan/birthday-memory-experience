import React, { useEffect, useRef } from 'react';

interface MotionBackgroundProps {
  parallaxX: number;
  parallaxY: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

export const MotionBackground: React.FC<MotionBackgroundProps> = ({ parallaxX, parallaxY }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 65 subtle cinematic floating particles
    const particleCount = 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1, // Soft upward drift
        opacity: Math.random() * 0.45 + 0.1,
        hue: Math.random() > 0.8 ? 0 : 45, // Subtle crimson or gold accents
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating micro-dust
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle parallax shift
        const posX = p.x + parallaxX * (p.size * 6);
        const posY = p.y + parallaxY * (p.size * 6);

        ctx.beginPath();
        ctx.arc(posX, posY, p.size, 0, Math.PI * 2);
        if (p.hue === 0) {
          ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity})`; // Crimson particle
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`; // Silver/white particle
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [parallaxX, parallaxY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#040404]" />

      {/* Atmospheric Red Nebulae / Ambient Glow Blooms */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-red-950/20 blur-[140px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${parallaxX * 25}px, ${parallaxY * 25}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-crimson-900/15 blur-[160px] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate3d(${parallaxX * -30}px, ${parallaxY * -30}px, 0)`,
        }}
      />

      {/* Center Subtle Flare */}
      <div
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-gradient-to-r from-red-900/10 via-zinc-800/10 to-transparent blur-[120px] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${parallaxX * 15}px), calc(-50% + ${parallaxY * 15}px), 0)`,
        }}
      />

      {/* Film Grain Mesh */}
      <div className="absolute inset-0 film-grain opacity-60" />

      {/* Canvas for floating stars and particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Subtle vignette border */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/85" />
    </div>
  );
};
