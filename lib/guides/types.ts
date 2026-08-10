export type GuideSection = {
  heading: string;
  level?: 2 | 3;
  paragraphs?: string[];
  bullets?: string[];
};

import type { GuideHeroImage } from './hero-image';

export type GuideFaq = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  /** ISO date (YYYY-MM-DD) — used for publishing-pace CI */
  published: string;
  category: 'PSRAS' | 'PACE' | 'Career' | 'Exams';
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  summary: string;
  readMinutes: number;
  /** JPEG or PNG — required for Buffer RSS enclosures and GBP */
  heroImage: GuideHeroImage;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedSlugs: string[];
};
