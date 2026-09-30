import React, { useState } from 'react';
import { CinematicArtwork } from './CinematicArtwork';
import { memories, MemorySlot } from '../data/memories';
import { Sparkles, X, Calendar, MapPin, Maximize2 } from 'lucide-react';

interface ThreeDPhotoWallProps {
  parallaxX: number;
  parallaxY: number;
}

export const ThreeDPhotoWall: React.FC<ThreeDPhotoWallProps> = ({ parallaxX, parallaxY }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemorySlot | null>(null);

  // Depth plane offsets for cinematic staggered multi-plane gallery
  const depthPattern = [
    { z: 90, rotate: -1.5 },
    { z: -70, rotate: 1.2 },
    { z: -40, rotate: -1.0 },
    { z: 110, rotate: 1.8 },
    { z: 45, rotate: -0.8 },
    { z: -60, rotate: 1.0 },
  ];

  return (
    <section
      id="gallery-section"
      className="relative w-full py-32 px-6 md:px-16 bg-[#030303] select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-950/20 blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-950/20 text-red-400 text-xs font-mono tracking-[0.3em] uppercase mb-4">
          <Sparkles size={12} className="text-red-500" />
          <span>SPATIAL GALLERY ({memories.length} SLOTS)</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-cinzel font-black tracking-wider text-metallic uppercase">
          THE 3D VAULT
        </h2>
        <p className="mt-4 text-zinc-400 text-sm md:text-base font-sans font-light max-w-xl mx-auto leading-relaxed">
          Move your cursor or tilt your device to manipulate the depth field. Click any frame to inspect the archival plate.
        </p>
      </div>

      {/* 3D Multi-Plane Gallery Canvas with orientation-aware columns */}
      <div className="max-w-6xl mx-auto perspective-2000 py-6">
        <div
          className="grid grid-cols-12 gap-6 md:gap-8 transform-style-3d transition-transform duration-500 ease-out items-start"
          style={{
            transform: `rotateY(${parallaxX * 7}deg) rotateX(${-parallaxY * 7}deg)`,
          }}
        >
          {memories.map((item: MemorySlot, idx: number) => {
            const pattern = depthPattern[idx % depthPattern.length];
            const isPortrait = item.presentation?.orientation === 'portrait';
            // Portrait cards take 4 columns (1/3 row on desktop, 1/2 on tablet), Landscape takes 8 columns (2/3 row)
            const spanClass = isPortrait
              ? 'col-span-12 sm:col-span-6 md:col-span-4'
              : 'col-span-12 sm:col-span-12 md:col-span-8';

            return (
              <div
                key={item.id}
                className={`${spanClass} transform-style-3d`}
                style={{
                  transform: `translateZ(${pattern.z}px) rotateZ(${pattern.rotate}deg)`,
                }}
              >
                <div
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-red-500/60 bg-zinc-950/80 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(220,38,38,0.25)]"
                >
                  {/* Image Container with true aspect ratio & focal anchor */}
                  <CinematicArtwork
                    src={item.src}
                    alt={item.title}
                    slotLabel={item.title}
                    aspectRatio={item.presentation?.aspectRatio || 'aspect-[3/4]'}
                    fit={item.presentation?.fit || 'cover'}
                    position={item.presentation?.position || 'center'}
                    scale={item.presentation?.scale || 1.0}
                  />

                  {/* Subtle metallic gloss border highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Card Overlay info */}
                  <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between z-10">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase block mb-1">
                        SLOT {item.slotNumber} // {item.presentation?.orientation.toUpperCase()}
                      </span>
                      <h3 className="text-lg md:text-xl font-cinzel font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      aria-label={`View ${item.title}`}
                      className="p-2 rounded-full bg-white/10 group-hover:bg-red-600/80 backdrop-blur-md text-white transition-all cursor-pointer"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Modal Lightbox with Orientation Preservation */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className={`relative w-full ${
              selectedPhoto.presentation?.orientation === 'portrait' ? 'max-w-xl' : 'max-w-4xl'
            } bg-zinc-950 border border-white/15 rounded-xl overflow-hidden shadow-2xl transition-all`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <CinematicArtwork
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              slotLabel={selectedPhoto.title}
              aspectRatio={selectedPhoto.presentation?.aspectRatio || 'aspect-[4/3]'}
              fit={selectedPhoto.presentation?.fit || 'cover'}
              position={selectedPhoto.presentation?.position || 'center'}
              scale={selectedPhoto.presentation?.scale || 1.0}
            />

            {/* Modal Details */}
            <div className="p-6 md:p-8 bg-zinc-950 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-red-500 block mb-1">
                    SLOT {selectedPhoto.slotNumber} // {selectedPhoto.presentation?.orientation.toUpperCase()} ARCHIVE
                  </span>
                  <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-white tracking-wide">
                    {selectedPhoto.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  {selectedPhoto.year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-red-500" />
                      {selectedPhoto.year}
                    </span>
                  )}
                  {selectedPhoto.year && selectedPhoto.location && <span>·</span>}
                  {selectedPhoto.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-amber-500" />
                      {selectedPhoto.location}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed mb-3">
                {selectedPhoto.caption}
              </p>

              <div className="text-[11px] font-mono text-zinc-500">
                PATH // <span className="text-zinc-400">{selectedPhoto.src}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
