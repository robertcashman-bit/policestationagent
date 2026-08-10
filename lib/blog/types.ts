import type { BlogHeroImage } from './hero-image';

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  /** ISO date (YYYY-MM-DD) */
  published: string;
  category: 'PSRAS Prep' | 'PACE' | 'CIT' | 'Career';
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  summary: string;
  readMinutes: number;
  /** JPEG or PNG — required for Buffer RSS enclosures */
  heroImage: BlogHeroImage;
  sections: BlogSection[];
  relatedSlugs: string[];
};
