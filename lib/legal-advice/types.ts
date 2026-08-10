export type LegalAdviceCategorySlug = 'police-interviews' | 'legal-rights';

export type LegalAdviceCategoryLabel = 'Police Interviews' | 'Legal Rights';

export type LegalAdviceFaq = {
  question: string;
  answer: string;
};

export type LegalAdviceArticle = {
  slug: string;
  categorySlug: LegalAdviceCategorySlug;
  categoryLabel: LegalAdviceCategoryLabel;
  /** ISO date (YYYY-MM-DD) */
  published: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  shortAnswer: string;
  faqs: LegalAdviceFaq[];
  relatedSlugs: string[];
  legalSources: string[];
};
