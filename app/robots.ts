import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psrtrain.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard', '/practice', '/modules', '/critical-incidents', '/mock-exam', '/syllabus', '/search', '/settings', '/billing', '/progress', '/certificates', '/gate', '/auth/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard', '/practice', '/modules', '/critical-incidents', '/mock-exam', '/syllabus', '/search', '/settings', '/billing', '/progress', '/certificates', '/gate', '/auth/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
