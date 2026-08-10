import { MEDIA_FALLBACK_IMAGE, SITE_URL } from './config';
import type { SchedulablePost } from '@robertcashman/buffer-engine';

/**
 * Marketing pages promoted via Buffer (Custody Note has no blog RSS yet).
 * Images always use the public GBP default so Buffer media fetch never hits
 * app screenshots that historically failed publish.
 */
const PROMO_PAGES: Array<{
  slug: string;
  title: string;
  excerpt: string;
  path: string;
}> = [
  {
    slug: 'what-makes-a-good-attendance-note',
    title: 'What makes a good attendance note for police station work',
    excerpt:
      'Capture times, advice, and outcomes cleanly so your LAA-compliant notes stand up to scrutiny.',
    path: '/how-it-works',
  },
  {
    slug: 'custody-note-desktop-app',
    title: 'Custody Note — LAA-compliant custody notes for legal aid',
    excerpt:
      'Desktop app for freelance police station reps: time recording, firm billing, and PDF export.',
    path: '/',
  },
  {
    slug: 'custody-note-free-trial',
    title: 'Start a free Custody Note trial',
    excerpt: 'Try Custody Note free for 30 days — built for solicitors and custody visitors.',
    path: '/trial',
  },
  {
    slug: 'custody-note-pricing',
    title: 'Custody Note pricing for police station reps',
    excerpt: 'Simple pricing for freelance reps who need reliable custody notes and billing.',
    path: '/pricing',
  },
  {
    slug: 'custody-note-download',
    title: 'Download Custody Note',
    excerpt: 'Install Custody Note on Windows and start recording police station attendances.',
    path: '/download',
  },
  {
    slug: 'custody-note-cloud-backup',
    title: 'Cloud backup for Custody Note records',
    excerpt: 'Keep attendance notes safe with optional cloud backup for your Custody Note workspace.',
    path: '/cloud-backup',
  },
  {
    slug: 'custody-note-support',
    title: 'Custody Note support',
    excerpt: 'Get help with install, licensing, and day-to-day custody note workflows.',
    path: '/support',
  },
];

export function getSchedulablePosts(): SchedulablePost[] {
  return PROMO_PAGES.map((page) => ({
    feedId: 'custodynote',
    slug: page.slug,
    title: page.title,
    excerpt: page.excerpt,
    url: `${SITE_URL}${page.path}`,
    imageUrl: MEDIA_FALLBACK_IMAGE,
    imageAlt: page.title,
  }));
}
