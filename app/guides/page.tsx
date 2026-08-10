import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketingCtaButton } from '@/components/marketing/MarketingPageHero';
import { getGuidesByCategory, GUIDES } from '@/lib/guides/content';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'PSR & PSRAS Guides | Police Station Representative Training',
  description:
    'Free guides for PSRAS candidates: accreditation explained, PACE Code C, Critical Incidents Test prep, portfolio tips, and how to become a police station representative in England and Wales.',
  path: '/guides',
  keywords: [
    'PSRAS guides',
    'police station representative',
    'PACE Code C',
    'Critical Incidents Test',
    'PSRAS exam preparation',
    'police station rep training',
  ],
  openGraph: {
    title: 'PSR & PSRAS Training Guides',
    description: 'In-depth guides for police station representative accreditation candidates.',
  },
});

const categoryOrder = ['PSRAS', 'Career', 'PACE', 'Exams'] as const;

const GUIDES_HUB_INTRO =
  'In-depth articles for police station representative accreditation candidates — PSRAS pathway, PACE 1984, Code C, the Critical Incidents Test, and exam preparation in England and Wales.';

export default function GuidesIndexPage() {
  const byCategory = getGuidesByCategory();
  const featured = [...GUIDES]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="relative overflow-hidden rounded-2xl hero-bright border border-slate-200 px-6 py-14 text-center sm:px-10">
        <div className="relative">
          <p className="section-label-primary justify-center mb-3">Resources</p>
          <div className="section-bar-primary mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0B3C5D]">
            PSR &amp; PSRAS Training Guides
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed mt-5">
            {GUIDES_HUB_INTRO}
          </p>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3">
            {GUIDES.length} guides · General training information, not legal advice
          </p>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#0B3C5D] border-b border-slate-200 pb-2">
          Featured guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((guide) => (
            <Card key={guide.slug} className="feature-card group border border-slate-200 overflow-hidden">
              <Link href={`/guides/${guide.slug}`} className="block relative aspect-[1200/630] w-full">
                <Image
                  src={guide.heroImage.src}
                  alt={guide.heroImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <CardHeader>
                <CardDescription>{guide.category} · {guide.published}</CardDescription>
                <CardTitle className="text-lg leading-snug">
                  <Link href={`/guides/${guide.slug}`} className="text-[#0B3C5D] hover:underline">
                    {guide.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">{guide.summary}</p>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="text-sm font-medium text-[#0B3C5D] hover:underline"
                >
                  Read guide →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {categoryOrder.map((category) => {
        const guides = byCategory[category];
        if (!guides.length) return null;

        return (
          <section key={category} className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-2xl font-semibold text-[#0B3C5D]">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide) => (
                <Card key={guide.slug} className="feature-card group border border-slate-200 overflow-hidden">
                  <Link href={`/guides/${guide.slug}`} className="block relative aspect-[1200/630] w-full">
                    <Image
                      src={guide.heroImage.src}
                      alt={guide.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link href={`/guides/${guide.slug}`} className="text-[#0B3C5D] hover:underline">
                        {guide.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {guide.readMinutes} min read · {guide.published}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">{guide.summary}</p>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="text-sm font-medium text-[#0B3C5D] hover:underline"
                    >
                      Read guide →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#e8f2f8] to-white px-8 py-10 text-center space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#0B3C5D]">Ready to practise?</h2>
        <p className="text-slate-700 max-w-xl mx-auto">
          Put what you learn into action with timed MCQs, modules, and CIT-style scenarios.
        </p>
        <MarketingCtaButton href="/signup">Start training free whilst testing</MarketingCtaButton>
      </section>
    </div>
  );
}
