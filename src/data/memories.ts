/**
 * =======================================================================
 * CINEMATIC BIRTHDAY EXPERIENCE - SECTION-SPECIFIC PHOTO REGISTRY
 * =======================================================================
 * 
 * DESIGNATED SECTION ARCHITECTURE:
 * 1. HERO / LANDING PAGE (1 Photo):
 *    - Hero image.jpeg (path: /images/birthday/Hero image.jpeg)
 * 
 * 2. INNER CIRCLE (EXACTLY 4 Photos in Mandated Order):
 *    - 1. Rishi Image.jpeg
 *    - 2. Sri charan Image.jpeg
 *    - 3. Rishwanth image.jpeg
 *    - 4. Solo.jpeg
 * 
 * 3. BELOW INNER CIRCLE / PEOPLE GALLERY (EXACTLY 10 Photos Line-by-Line):
 *    - 1. Ajay.jpeg
 *    - 2. Beer image.jpeg
 *    - 3. Bhargav Image.jpeg (displayed title: 04 — BHARATH)
 *    - 4. Journey image.jpeg
 *    - 5. Party image.jpeg
 *    - 6. Pratap Image.jpeg
 *    - 7. Rishi Image.jpeg
 *    - 8. Rishwanth image.jpeg
 *    - 9. Sri charan Image.jpeg
 *    - 10. Solo.jpeg
 * 
 * 4. 3D VAULT (EXACTLY 11 Photos, All Except Surprise):
 *    - 1. Hero image.jpeg
 *    - 2. Ajay.jpeg
 *    - 3. Beer image.jpeg
 *    - 4. Bhargav Image.jpeg
 *    - 5. Journey image.jpeg
 *    - 6. Party image.jpeg
 *    - 7. Pratap Image.jpeg
 *    - 8. Rishi Image.jpeg
 *    - 9. Rishwanth image.jpeg
 *    - 10. Sri charan Image.jpeg
 *    - 11. Solo.jpeg
 * 
 * 5. FINAL SURPRISE (EXACTLY 1 Photo):
 *    - Surprize image.jpeg (path: /images/birthday/Surprize image.jpeg)
 */

export interface ImagePresentation {
  orientation: 'landscape' | 'portrait';
  aspectRatio: string;
  rawRatio: number;
  fit: 'cover' | 'contain';
  position: string;
  focalPoint?: { x: number; y: number };
  scale?: number;
  containerMaxWidth: string;
}

export type PhotoId =
  | 'hero'
  | 'ajay'
  | 'beer'
  | 'bhargav'
  | 'journey'
  | 'party'
  | 'pratap'
  | 'rishi'
  | 'rishwanth'
  | 'sri-charan'
  | 'solo'
  | 'surprize';

export interface AuthoritativeStoryPhoto {
  id: PhotoId;
  fileName: string;
  src: string;
  name: string;
  title: string;
  role: string;
  slotNumber: string;
  year: string;
  location: string;
  caption: string;
  quote: string;
  assignedSection?: string;
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
 * MASTER ASSET DEFINITIONS (12 Unique Source Photographs)
 */

// 1. HERO: Hero image.jpeg
export const PHOTO_HERO: AuthoritativeStoryPhoto = {
  id: 'hero',
  fileName: 'Hero image.jpeg',
  src: '/images/birthday/Hero image.jpeg',
  name: 'HERO',
  title: '01 — HERO',
  role: 'PROLOGUE',
  slotNumber: '01',
  year: 'PROLOGUE',
  location: 'WHERE IT ALL BEGINS',
  caption: 'The cinematic tribute begins here for DHARMA RAJU.',
  quote: 'Every legend begins with a defining moment.',
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

// 2. AJAY: Ajay.jpeg
export const PHOTO_AJAY: AuthoritativeStoryPhoto = {
  id: 'ajay',
  fileName: 'Ajay.jpeg',
  src: '/images/birthday/Ajay.jpeg',
  name: 'AJAY',
  title: '01 — AJAY',
  role: 'THE CORNERSTONE',
  slotNumber: '01',
  year: 'MILESTONE',
  location: 'FRONT LINES',
  caption: 'Brothers through every storm, celebration, and victory.',
  quote: 'Some people enter your life and redefine family.',
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
};

// 3. BEER: Beer image.jpeg
export const PHOTO_BEER: AuthoritativeStoryPhoto = {
  id: 'beer',
  fileName: 'Beer image.jpeg',
  src: '/images/birthday/Beer image.jpeg',
  name: 'BEER',
  title: '02 — REVELRY',
  role: 'THE GATHERING',
  slotNumber: '02',
  year: 'CELEBRATION',
  location: 'THE ROARING EVENING',
  caption: 'Glasses raised high, timeless memories echoing through the night.',
  quote: 'Some memories defy the passage of years...',
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
};

// 4. BHARGAV / BHARATH: Bhargav Image.jpeg
export const PHOTO_BHARGAV: AuthoritativeStoryPhoto = {
  id: 'bhargav',
  fileName: 'Bhargav Image.jpeg',
  src: '/images/birthday/Bhargav Image.jpeg',
  name: 'BHARATH',
  title: '03 — BHARATH',
  role: 'THE ALLIANCE',
  slotNumber: '03',
  year: 'UNWAVERING',
  location: 'SHOULDER TO SHOULDER',
  caption: 'Standing together through every chapter with fierce loyalty.',
  quote: '...and somehow become part of the story.',
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
};

// 5. JOURNEY: Journey image.jpeg
export const PHOTO_JOURNEY: AuthoritativeStoryPhoto = {
  id: 'journey',
  fileName: 'Journey image.jpeg',
  src: '/images/birthday/Journey image.jpeg',
  name: 'JOURNEY',
  title: '04 — THE ODYSSEY',
  role: 'THE ROAD',
  slotNumber: '04',
  year: 'EXPEDITION',
  location: 'OPEN HIGHWAYS',
  caption: 'Endless horizons, wheels spinning, stories forged on open roads.',
  quote: 'It is not about the destination, but the brothers beside you.',
  presentation: {
    orientation: 'landscape',
    aspectRatio: 'aspect-[4/3]',
    rawRatio: 1.33,
    fit: 'cover',
    position: 'center 45%',
    focalPoint: { x: 50, y: 45 },
    scale: 1.0,
    containerMaxWidth: 'max-w-2xl lg:max-w-3xl'
  }
};

// 6. PARTY: Party image.jpeg
export const PHOTO_PARTY: AuthoritativeStoryPhoto = {
  id: 'party',
  fileName: 'Party image.jpeg',
  src: '/images/birthday/Party image.jpeg',
  name: 'PARTY',
  title: '05 — CELEBRATION',
  role: 'THE FESTIVAL',
  slotNumber: '05',
  year: 'TRIUMPH',
  location: 'UNDER THE LIGHTS',
  caption: 'Pure electric energy, roaring laughter, and unmatched camaraderie.',
  quote: 'Moments that turn into legendary stories.',
  presentation: {
    orientation: 'landscape',
    aspectRatio: 'aspect-[4/3]',
    rawRatio: 1.33,
    fit: 'cover',
    position: 'center 40%',
    focalPoint: { x: 50, y: 40 },
    scale: 1.0,
    containerMaxWidth: 'max-w-2xl lg:max-w-3xl'
  }
};

// 7. PRATAP: Pratap Image.jpeg
export const PHOTO_PRATAP: AuthoritativeStoryPhoto = {
  id: 'pratap',
  fileName: 'Pratap Image.jpeg',
  src: '/images/birthday/Pratap Image.jpeg',
  name: 'PRATAP',
  title: '06 — THE VANGUARD',
  role: 'THE HERITAGE',
  slotNumber: '06',
  year: 'CHRONICLE',
  location: 'THE ARCHIVE',
  caption: 'Shared memories preserved like gold in the vault of time.',
  quote: 'True camaraderie never fades with time.',
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
};

// 8. RISHI: Rishi Image.jpeg
export const PHOTO_RISHI: AuthoritativeStoryPhoto = {
  id: 'rishi',
  fileName: 'Rishi Image.jpeg',
  src: '/images/birthday/Rishi Image.jpeg',
  name: 'RISHI',
  title: '01 — RISHI',
  role: 'THE BROTHERHOOD',
  slotNumber: '01',
  year: 'ORIGINS',
  location: 'FIRST CHAPTERS',
  caption: 'Through every triumph and quiet trial, an unbroken presence.',
  quote: 'True brothers need no words to stand together.',
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
};

// 9. RISHWANTH: Rishwanth image.jpeg
export const PHOTO_RISHWANTH: AuthoritativeStoryPhoto = {
  id: 'rishwanth',
  fileName: 'Rishwanth image.jpeg',
  src: '/images/birthday/Rishwanth image.jpeg',
  name: 'RISHWANTH',
  title: '03 — RISHWANTH',
  role: 'THE ALLY',
  slotNumber: '03',
  year: 'ENDURING',
  location: 'SACRED CIRCLE',
  caption: 'A friendship tested by miles and strengthened by years.',
  quote: 'Bound not just by memory, but by respect.',
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
};

// 10. SRI CHARAN: Sri charan Image.jpeg
export const PHOTO_SRI_CHARAN: AuthoritativeStoryPhoto = {
  id: 'sri-charan',
  fileName: 'Sri charan Image.jpeg',
  src: '/images/birthday/Sri charan Image.jpeg',
  name: 'SRI CHARAN',
  title: '02 — SRI CHARAN',
  role: 'THE INNER CIRCLE',
  slotNumber: '02',
  year: 'SOLIDARITY',
  location: 'ALWAYS IN SYNC',
  caption: 'Laughter that fills the room and loyalty forged in fire.',
  quote: 'The journey is richest with those who share the climb.',
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
};

// 11. SOLO: Solo.jpeg
export const PHOTO_SOLO: AuthoritativeStoryPhoto = {
  id: 'solo',
  fileName: 'Solo.jpeg',
  src: '/images/birthday/Solo.jpeg',
  name: 'SOLO',
  title: '04 — SOLO',
  role: 'THE PROTAGONIST',
  slotNumber: '04',
  year: 'ETERNAL',
  location: 'THE HIGHEST PEAK',
  caption: 'The legend himself—standing tall at the horizon of his next greatness.',
  quote: 'Here is to the man, the milestone, and the legacy.',
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
};

// 12. SURPRISE: Surprize image.jpeg
export const PHOTO_SURPRIZE: AuthoritativeStoryPhoto = {
  id: 'surprize',
  fileName: 'Surprize image.jpeg',
  src: '/images/birthday/Surprize image.jpeg',
  name: 'SURPRISE',
  title: '11 — THE SURPRISE',
  role: 'THE CROWNING MOMENT',
  slotNumber: '11',
  year: 'THE GRAND FINALE',
  location: 'FOR DHARMA RAJU',
  caption: 'The final heartfelt celebration and unforgettable surprise for DHARMA RAJU.',
  quote: 'Here is to another year of legendary moments.',
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
 * =======================================================================
 * EXACT SECTION-SPECIFIC CONFIGURATIONS (Separated & Non-Deduplicated)
 * =======================================================================
 */

// 1. HERO PHOTO (Appears on Hero landing page)
export const heroPhoto: AuthoritativeStoryPhoto = PHOTO_HERO;

// 2. INNER CIRCLE (EXACTLY 4 Photos: Rishi -> Sri Charan -> Rishwanth -> Solo)
export const innerCirclePhotos: AuthoritativeStoryPhoto[] = [
  PHOTO_RISHI,
  PHOTO_SRI_CHARAN,
  PHOTO_RISHWANTH,
  PHOTO_SOLO,
];

// 3. PEOPLE GALLERY / BELOW INNER CIRCLE (EXACTLY 10 Photos Line-by-Line)
export const peopleGalleryPhotos: AuthoritativeStoryPhoto[] = [
  PHOTO_AJAY,
  PHOTO_BEER,
  PHOTO_BHARGAV,
  PHOTO_JOURNEY,
  PHOTO_PARTY,
  PHOTO_PRATAP,
  PHOTO_RISHI,
  PHOTO_RISHWANTH,
  PHOTO_SRI_CHARAN,
  PHOTO_SOLO,
];

// 4. 3D VAULT (EXACTLY 11 Photos, All Except Surprise)
export const vaultPhotos: AuthoritativeStoryPhoto[] = [
  PHOTO_HERO,
  PHOTO_AJAY,
  PHOTO_BEER,
  PHOTO_BHARGAV,
  PHOTO_JOURNEY,
  PHOTO_PARTY,
  PHOTO_PRATAP,
  PHOTO_RISHI,
  PHOTO_RISHWANTH,
  PHOTO_SRI_CHARAN,
  PHOTO_SOLO,
];

// 5. FINAL SURPRISE (EXACTLY 1 Photo)
export const finalSurprise: AuthoritativeStoryPhoto = PHOTO_SURPRIZE;

/**
 * BACKWARD COMPATIBILITY ALIASES & EXPORTS
 */
export const HERO_PHOTO = heroPhoto;
export const HERO_IMAGE = heroPhoto;
export const INNER_CIRCLE_PHOTOS = innerCirclePhotos;
export const PEOPLE_GALLERY_PHOTOS = peopleGalleryPhotos;
export const MOMENTS_PHOTOS = peopleGalleryPhotos;
export const VAULT_PHOTOS = vaultPhotos;
export const FINAL_SURPRISE_PHOTO = finalSurprise;
export const SURPRISE_IMAGE = finalSurprise;
export const FINALE_PHOTO = finalSurprise;
export const memories = vaultPhotos;
export const MEMORY_PHOTOS = vaultPhotos;
export const ALL_STORY_PHOTOS = peopleGalleryPhotos;
export type MemorySlot = AuthoritativeStoryPhoto;

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
