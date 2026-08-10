import { SITE } from '@/lib/site';
import { PSRUK_SITE } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_SITE } from '@/lib/custodynote-promo';
import { PSA_SITE } from '@/lib/policestationagent-promo';

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
      email: SITE.contactEmail,
      areaServed: 'GB',
      description:
        'Online training platform for Police Station Representatives preparing for the PSRAS accreditation exam.',
      sameAs: [PSRUK_SITE, CUSTODYNOTE_SITE, PSA_SITE],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description:
        'Online training for Police Station Representatives preparing for the PSRAS — mock exams, MCQs, and PACE-aligned study.',
      inLanguage: 'en-GB',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': 'Course',
      '@id': `${SITE.url}/#course`,
      name: 'Police Station Representative Accreditation Training',
      description:
        'Comprehensive online training for the Police Station Representative Accreditation Scheme (PSRAS), covering PACE codes, MCQ practice, and mock exams.',
      url: SITE.url,
      provider: { '@id': `${SITE.url}/#organization` },
      inLanguage: 'en-GB',
      educationalLevel: 'Professional',
      teaches: 'Police Station Representative duties under PACE, PSRAS accreditation requirements',
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
