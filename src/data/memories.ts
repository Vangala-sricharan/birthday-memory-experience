/**
 * =======================================================================
 * CINEMATIC BIRTHDAY EXPERIENCE - REAL IMAGE CONFIGURATION
 * =======================================================================
 * 
 * PHOTO UPLOAD LOCATION:
 * public/images/birthday/
 * 
 * EXACT 12 BIRTHDAY ASSETS:
 * 01 — HERO IMAGE      -> /images/birthday/01-hero.jpeg
 * 02 — AJAY            -> /images/birthday/02-ajay.jpeg
 * 03 — BEER            -> /images/birthday/03-beer.jpeg
 * 04 — BHARGAV         -> /images/birthday/04-bhargav.jpeg
 * 05 — JOURNEY         -> /images/birthday/05-journey.jpeg
 * 06 — PARTY           -> /images/birthday/06-party.jpeg
 * 07 — PRATAP          -> /images/birthday/07-pratap.jpeg
 * 08 — RISHI           -> /images/birthday/08-rishi.jpeg
 * 09 — RISHWANTH       -> /images/birthday/09-rishwanth.jpeg
 * 10 — SRI CHARAN      -> /images/birthday/10-sri-charan.jpeg
 * 11 — SOLO            -> /images/birthday/11-solo.jpeg
 * 12 — SURPRISE IMAGE  -> /images/birthday/12-surprise.jpeg
 */

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
  friendName: "YOUR ARMY",
  chapterNumber: "CHAPTER 28",
  birthdayYear: "MMXXVI",
  subtitle: "A CINEMATIC TRIBUTE TO UNBREAKABLE BONDS",
  finalMessage: "Here's to another year of memories, triumphs, late-night conversations, and living boldly.",
  closingQuote: "May your coming year be as vast and luminous as the dreams you dare to chase."
};

/**
 * 01 — HERO IMAGE
 * The primary hero image shown first in the experience.
 */
export const HERO_IMAGE: MemorySlot = {
  id: 1,
  src: "/images/birthday/01-hero.jpeg",
  type: "hero",
  title: "01 — HERO",
  slotNumber: "01",
  year: "PROLOGUE",
  location: "WHERE IT ALL BEGINS",
  caption: "The journey begins here with YOUR ARMY."
};

/**
 * 12 — SURPRISE IMAGE
 * The final surprise image shown only at the grand reveal!
 */
export const SURPRISE_IMAGE: MemorySlot = {
  id: 12,
  src: "/images/birthday/12-surprise.jpeg",
  type: "surprise",
  title: "12 — SURPRISE",
  slotNumber: "12",
  year: "THE GRAND FINALE",
  location: "FROM YOUR ARMY",
  caption: "The final celebration and heartfelt surprise from YOUR ARMY."
};

/**
 * The 10 Core Memory Moments between Hero and Surprise (02 through 11).
 * Strictly follows the required order:
 * 02 AJAY, 03 BEER, 04 BHARGAV, 05 JOURNEY, 06 PARTY,
 * 07 PRATAP, 08 RISHI, 09 RISHWANTH, 10 SRI CHARAN, 11 SOLO
 */
export const memories: MemorySlot[] = [
  {
    id: 2,
    src: "/images/birthday/02-ajay.jpeg",
    title: "02 — AJAY",
    slotNumber: "02",
    year: "MILESTONE",
    location: "COMRADES IN ARMS",
    caption: "Brothers through every storm and triumph.",
    quote: "Some people enter your life quietly..."
  },
  {
    id: 3,
    src: "/images/birthday/03-beer.jpeg",
    title: "03 — BEER",
    slotNumber: "03",
    year: "REVELRY",
    location: "MIDNIGHT TOASTS",
    caption: "Glasses raised to unforgettable nights and stories only we know.",
    quote: "...and somehow become part of the story."
  },
  {
    id: 4,
    src: "/images/birthday/04-bhargav.jpeg",
    title: "04 — BHARGAV",
    slotNumber: "04",
    year: "SOLIDARITY",
    location: "THE INNER CIRCLE",
    caption: "Standing shoulder to shoulder through every chapter.",
    quote: "Some memories defy the passage of time..."
  },
  {
    id: 5,
    src: "/images/birthday/05-journey.jpeg",
    title: "05 — JOURNEY",
    slotNumber: "05",
    year: "EXPEDITION",
    location: "THE OPEN HORIZON",
    caption: "The boundless road, late-night drives, and chasing horizons.",
    quote: "...and simply stay."
  },
  {
    id: 6,
    src: "/images/birthday/06-party.jpeg",
    title: "06 — PARTY",
    slotNumber: "06",
    year: "CELEBRATION",
    location: "THE HIGH TIDE",
    caption: "Pure energy, roaring laughter, and unmatched memories.",
    quote: "To the moments that shaped who we are."
  },
  {
    id: 7,
    src: "/images/birthday/07-pratap.jpeg",
    title: "07 — PRATAP",
    slotNumber: "07",
    year: "LOYALTY",
    location: "BROTHERHOOD",
    caption: "Steadfast presence and timeless camaraderie.",
    quote: "Unshakable through every season."
  },
  {
    id: 8,
    src: "/images/birthday/08-rishi.jpeg",
    title: "08 — RISHI",
    slotNumber: "08",
    year: "ADVENTURE",
    location: "SHARED SUMMITS",
    caption: "Moments of laughter and shared ambition that echo through years.",
    quote: "Memories etched in gold."
  },
  {
    id: 9,
    src: "/images/birthday/09-rishwanth.jpeg",
    title: "09 — RISHWANTH",
    slotNumber: "09",
    year: "KINSHIP",
    location: "THE STRONGHOLD",
    caption: "Comrades in every endeavor and wild memory.",
    quote: "Built on unwavering trust."
  },
  {
    id: 10,
    src: "/images/birthday/10-sri-charan.jpeg",
    title: "10 — SRI CHARAN",
    slotNumber: "10",
    year: "FELLOWSHIP",
    location: "THE SANCTUARY",
    caption: "Quiet wisdom, steadfast support, and shared triumphs.",
    quote: "A brotherhood that stands the test of time."
  },
  {
    id: 11,
    src: "/images/birthday/11-solo.jpeg",
    title: "11 — SOLO",
    slotNumber: "11",
    year: "THE CHAMPION",
    location: "IN THE SPOTLIGHT",
    caption: "The individual whose milestone and greatness we gather to celebrate.",
    quote: "Here's to the legend himself."
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
