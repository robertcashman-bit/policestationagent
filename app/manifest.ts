import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description:
      'Police Station Representative training — mock exams, MCQs, and PSRAS preparation aligned with PACE.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#0B3C5D',
    lang: 'en-GB',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
