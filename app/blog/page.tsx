import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketingCtaButton } from '@/components/marketing/MarketingPageHero';
import { BLOG_POSTS, getBlogPostsByCategory } from '@/lib/blog/content';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'PSR Train Blog | PSRAS, PACE & Police Station Rep News',
  description:
    'Practical articles for police station representative candidates — PSRAS revision, PACE Code C, CIT preparation, and portfolio tips. Syndicated for social sharing.',
  path: '/blog',
  keywords: [
    'police station representative blog',
    'PSRAS preparation',
    'PACE Code C',
    'Critical Incidents Test',
  ],
  openGraph: {
    title: 'PSR Train Blog',
    description: 'Training articles for PSRAS candidates in England and Wales.',
  },
});

const categoryOrder = ['PSRAS Prep', 'PACE', 'CIT', 'Career'] as const;

export default function BlogIndexPage() {
  const byCategory = getBlogPostsByCategory();
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="relative overflow-hidden rounded-2xl hero-bright border border-slate-200 px-6 py-14 text-center sm:px-10">
        <div className="relative">
          <p className="section-label-primary justify-center mb-3">Blog</p>
          <div className="section-bar-primary mx-auto mb-6" />
          <h1 className="font-display text-3xl md:text-5xl font-bold text-[#0B3C5D]">
            PSR Train Blog
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed mt-5">
            Practical articles for PSRAS candidates — revision plans, PACE Code C checklists, CIT tips,
            and career guidance for police station representatives in England &amp; Wales.
          </p>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-3">
            {BLOG_POSTS.length} posts · RSS at{' '}
            <Link href="/blog/feed" className="text-[#0B3C5D] font-medium hover:underline">
              /blog/feed
            </Link>{' '}
            (Buffer-ready)
          </p>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#0B3C5D] border-b border-slate-200 pb-2">
          Latest posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sorted.slice(0, 2).map((post) => (
            <Card key={post.slug} className="feature-card group border border-slate-200 overflow-hidden">
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[1200/630] w-full">
                <Image
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <CardHeader>
                <CardDescription>{post.category} · {post.published}</CardDescription>
                <CardTitle className="text-lg leading-snug">
                  <Link href={`/blog/${post.slug}`} className="text-[#0B3C5D] hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">{post.summary}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-[#0B3C5D] hover:underline"
                >
                  Read post →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {categoryOrder.map((category) => {
        const posts = byCategory[category];
        if (!posts.length) return null;

        return (
          <section key={category} className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-2xl font-semibold text-[#0B3C5D]">{category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card key={post.slug} className="feature-card group border border-slate-200 overflow-hidden">
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-[1200/630] w-full">
                    <Image
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                  <CardHeader>
                    <CardTitle className="text-lg leading-snug">
                      <Link href={`/blog/${post.slug}`} className="text-[#0B3C5D] hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {post.readMinutes} min read · {post.published}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">{post.summary}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-[#0B3C5D] hover:underline"
                    >
                      Read post →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#e8f2f8] to-white px-8 py-10 text-center space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#0B3C5D]">Put articles into practice</h2>
        <p className="text-slate-700 max-w-xl mx-auto">
          Timed mock exams, MCQs, and CIT-style scenarios on PSR Train.
        </p>
        <MarketingCtaButton href="/signup">Start training free whilst testing</MarketingCtaButton>
      </section>
    </div>
  );
}
