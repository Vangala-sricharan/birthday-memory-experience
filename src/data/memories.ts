/**
 * =======================================================================
 * CINEMATIC BIRTHDAY EXPERIENCE - INTELLIGENT CANVAS CONFIGURATION
 * =======================================================================
 * 
 * Each of the 12 images has been individually analyzed for:
 * - Original dimensions (width x height)
 * - Aspect ratio & orientation (Landscape 4:3 vs Portrait 3:4)
 * - Main subject composition, face locations, and focal centers
 * - Custom canvas aspect ratio, object-position, fit, scale, and max-width sizing
 */

export interface ImagePresentation {
  orientation: 'landscape' | 'portrait';
  aspectRatio: string;        // CSS aspect ratio class (e.g. aspect-[4/3], aspect-[3/4])
  rawRatio: number;          // width / height decimal
  fit: 'cover' | 'contain';  // object-fit strategy
  position: string;          // object-position for focal preservation (e.g. "center 25%")
  focalPoint?: { x: number; y: number };
  scale?: number;            // fine-tuned scale
  containerMaxWidth: string; // responsive container max width (e.g. max-w-4xl vs max-w-xl)
}

export interface MemorySlot {
  id: number;
  src: string;
  title: string;
  slotNumber: string;
  caption: string;
  year?: string;
  location?: string;
  quote?: string;
  type?: 'hero' | 'memory' | 'surprise';
  presentation: ImagePresentation;
}

export interface ExperienceConfig {
  friendName: string;
  chapterNumber: string;
  birthdayYear: string;
  subtitle: string;
  finalMessage: string;
  closingQuote: string;
}

export const DEFAULT_CONFIG: ExperienceConfig = {
  friendName: "DHARMA RAJU",
  chapterNumber: "CHAPTER 28",
  birthdayYear: "MMXXVI",
  subtitle: "A CINEMATIC TRIBUTE TO UNBREAKABLE BONDS",
  finalMessage: "Here's to another year of memories, triumphs, late-night conversations, and living boldly.",
  closingQuote: "May your coming year be as vast and luminous as the dreams you dare to chase."
};

/**
 * 01 — HERO IMAGE
 * Dimensions: 1600x1200 | Landscape (4:3, ratio 1.33)
 * Composition: Wide panoramic group composition across horizontal width.
 * Canvas: 4:3 ratio with center 45% focal anchor to keep all faces and bodies visible.
 */
export const HERO_IMAGE: MemorySlot = {
  id: 1,
  src: "/images/birthday/Hero image.jpeg",
  type: "hero",
  title: "01 — HERO",
  slotNumber: "01",
  year: "PROLOGUE",
  location: "WHERE IT ALL BEGINS",
  caption: "The journey begins here with DHARMA RAJU.",
  presentation: {
    orientation: 'landscape',
    aspectRatio: 'aspect-[4/3]',
    rawRatio: 1.33,
    fit: 'cover',
    position: 'center 45%',
    focalPoint: { x: 50, y: 45 },
    scale: 1.0,
    containerMaxWidth: 'max-w-3xl lg:max-w-4xl'
  }
};

/**
 * 12 — SURPRISE IMAGE
 * Dimensions: 960x1280 | Portrait (3:4, ratio 0.75)
 * Composition: Final emotional surprise moment with subject centered vertically.
 * Canvas: 3:4 portrait canvas to prevent cropping heads or context.
 */
export const SURPRISE_IMAGE: MemorySlot = {
  id: 12,
  src: "/images/birthday/Surprize image.jpeg",
  type: "surprise",
  title: "12 — SURPRISE",
  slotNumber: "12",
  year: "THE GRAND FINALE",
  location: "FOR DHARMA RAJU",
  caption: "The final celebration and heartfelt surprise for DHARMA RAJU.",
  presentation: {
    orientation: 'portrait',
    aspectRatio: 'aspect-[3/4]',
    rawRatio: 0.75,
    fit: 'cover',
    position: 'center 32%',
    focalPoint: { x: 50, y: 32 },
    scale: 1.0,
    containerMaxWidth: 'max-w-md sm:max-w-lg md:max-w-xl'
  }
};

/**
 * 10 Core Memory Moments (02 through 11).
 * Custom-tailored canvas for each photo's true orientation and focal center.
 */
export const memories: MemorySlot[] = [
  // 02 — AJAY: 1200x1600 (Portrait 3:4)
  // Faces in top-third; center 16% anchors upper faces cleanly.
  {
    id: 2,
    src: "/images/birthday/Ajay.jpeg",
    title: "02 — AJAY",
    slotNumber: "02",
    year: "MILESTONE",
    location: "COMRADES IN ARMS",
    caption: "Brothers through every storm and triumph.",
    quote: "Some people enter your life quietly...",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 16%',
      focalPoint: { x: 50, y: 16 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 03 — BEER: 1204x1600 (Portrait 3:4)
  // Toast & gathering scene; center 38% preserves both glasses and faces.
  {
    id: 3,
    src: "/images/birthday/Beer image.jpeg",
    title: "03 — BEER",
    slotNumber: "03",
    year: "REVELRY",
    location: "MIDNIGHT TOASTS",
    caption: "Glasses raised to unforgettable nights and stories only we know.",
    quote: "...and somehow become part of the story.",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 38%',
      focalPoint: { x: 50, y: 38 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 04 — BHARATH: 1200x1600 (Portrait 3:4)
  // Standing portrait; center 22% keeps heads and upper torso intact.
  {
    id: 4,
    src: "/images/birthday/Bhargav Image.jpeg",
    title: "04 — BHARATH",
    slotNumber: "04",
    year: "SOLIDARITY",
    location: "THE INNER CIRCLE",
    caption: "Standing shoulder to shoulder through every chapter.",
    quote: "Some memories defy the passage of time...",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 22%',
      focalPoint: { x: 50, y: 22 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 05 — JOURNEY: 1600x1204 (Landscape 4:3)
  // Open road & scenic expedition; 4:3 landscape canvas with 40% center bias.
  {
    id: 5,
    src: "/images/birthday/Journey image.jpeg",
    title: "05 — JOURNEY",
    slotNumber: "05",
    year: "EXPEDITION",
    location: "THE OPEN HORIZON",
    caption: "Chasing horizons, unforgettable voyages, and timeless camaraderie.",
    quote: "...and simply stay.",
    presentation: {
      orientation: 'landscape',
      aspectRatio: 'aspect-[4/3]',
      rawRatio: 1.33,
      fit: 'cover',
      position: '40% center',
      focalPoint: { x: 40, y: 50 },
      scale: 1.0,
      containerMaxWidth: 'max-w-3xl md:max-w-4xl'
    }
  },

  // 06 — PARTY: 1600x1204 (Landscape 4:3)
  // Celebration scene; 4:3 landscape canvas with center 35% focal anchor.
  {
    id: 6,
    src: "/images/birthday/Party image.jpeg",
    title: "06 — PARTY",
    slotNumber: "06",
    year: "CELEBRATION",
    location: "THE HIGH TIDE",
    caption: "Pure energy, roaring laughter, and unmatched memories.",
    quote: "To the moments that shaped who we are.",
    presentation: {
      orientation: 'landscape',
      aspectRatio: 'aspect-[4/3]',
      rawRatio: 1.33,
      fit: 'cover',
      position: 'center 35%',
      focalPoint: { x: 50, y: 35 },
      scale: 1.0,
      containerMaxWidth: 'max-w-3xl md:max-w-4xl'
    }
  },

  // 07 — PRATAP: 1200x1600 (Portrait 3:4)
  // Standing camaraderie portrait; center 22% anchors faces without chopping.
  {
    id: 7,
    src: "/images/birthday/Pratap Image.jpeg",
    title: "07 — PRATAP",
    slotNumber: "07",
    year: "LOYALTY",
    location: "BROTHERHOOD",
    caption: "Steadfast presence and timeless camaraderie.",
    quote: "Unshakable through every season.",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 22%',
      focalPoint: { x: 50, y: 22 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 08 — RISHI: 1200x1600 (Portrait 3:4)
  // Portrait framing; center 18% focus preserves facial expressions & upper headroom.
  {
    id: 8,
    src: "/images/birthday/Rishi Image.jpeg",
    title: "08 — RISHI",
    slotNumber: "08",
    year: "ADVENTURE",
    location: "SHARED SUMMITS",
    caption: "Moments of laughter and shared ambition that echo through years.",
    quote: "Memories etched in gold.",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 18%',
      focalPoint: { x: 50, y: 18 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 09 — RISHWANTH: 1200x1600 (Portrait 3:4)
  // Portrait scene; center 30% preserves composition comfortably.
  {
    id: 9,
    src: "/images/birthday/Rishwanth image.jpeg",
    title: "09 — RISHWANTH",
    slotNumber: "09",
    year: "KINSHIP",
    location: "THE STRONGHOLD",
    caption: "Comrades in every endeavor and wild memory.",
    quote: "Built on unwavering trust.",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 30%',
      focalPoint: { x: 50, y: 30 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 10 — SRI CHARAN: 1200x1600 (Portrait 3:4)
  // Portrait; center 20% anchors upper faces and shoulders without clipping.
  {
    id: 10,
    src: "/images/birthday/Sri charan Image.jpeg",
    title: "10 — SRI CHARAN",
    slotNumber: "10",
    year: "FELLOWSHIP",
    location: "THE SANCTUARY",
    caption: "Quiet wisdom, steadfast support, and shared triumphs.",
    quote: "A brotherhood that stands the test of time.",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 20%',
      focalPoint: { x: 50, y: 20 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  },

  // 11 — SOLO: 1200x1600 (Portrait 3:4)
  // Solo celebration portrait; center 20% anchors the hero of the day.
  {
    id: 11,
    src: "/images/birthday/Solo.jpeg",
    title: "11 — SOLO",
    slotNumber: "11",
    year: "THE CHAMPION",
    location: "IN THE SPOTLIGHT",
    caption: "The individual whose milestone and greatness we gather to celebrate.",
    quote: "Here's to the legend himself.",
    presentation: {
      orientation: 'portrait',
      aspectRatio: 'aspect-[3/4]',
      rawRatio: 0.75,
      fit: 'cover',
      position: 'center 20%',
      focalPoint: { x: 50, y: 20 },
      scale: 1.0,
      containerMaxWidth: 'max-w-lg md:max-w-xl'
    }
  }
];

// Complete array of all 12 assets in exact sequence
export const allMemories: MemorySlot[] = [
  HERO_IMAGE,
  ...memories,
  SURPRISE_IMAGE
];

// Backward compatibility aliases
export const MEMORY_PHOTOS = memories;
export const FINAL_PHOTO = SURPRISE_IMAGE;

export const CINEMATIC_QUOTES = [
  {
    quote: "We do not remember days; we remember moments.",
    author: "Cesare Pavese",
    accent: "A life measured in shared laughter"
  },
  {
    quote: "True friendship is a sheltering tree in the storm, and a roaring fire in the cold.",
    author: "Samuel Taylor Coleridge",
    accent: "Unwavering & steadfast"
  },
  {
    quote: "The best is yet to come, and babe, won't it be fine.",
    author: "Frank Sinatra",
    accent: "Onto the next great chapter"
  }
];
