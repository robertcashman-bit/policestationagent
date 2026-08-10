import type { BlogPost } from '@/lib/blog/types';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCtaCapture } from './BlogCtaCapture';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/blog/article-schema';

type Props = {
  post: BlogPost;
  related: BlogPost[];
  relatedGuides?: import('@/lib/guides/types').Guide[];
};

export function BlogArticleView({ post, related, relatedGuides = [] }: Props) {
  const articleJsonLd = buildArticleJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(post);

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#0B3C5D]/70">
          {post.category} · {post.readMinutes} min read · {post.published}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B3C5D] leading-tight">{post.h1}</h1>
        <div className="bg-[#e8eef5] border-l-4 border-[#0B3C5D] p-4 rounded-r-lg">
          <p className="text-lg text-slate-800 leading-relaxed">{post.summary}</p>
        </div>
      </header>

      <figure className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
        <Image
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          width={post.heroImage.width}
          height={post.heroImage.height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          priority
        />
      </figure>

      <div className="prose prose-lg max-w-none space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#0B3C5D]">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 48)} className="text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="border-t border-slate-200 pt-8 space-y-6">
        <BlogCtaCapture source={`blog:${post.slug}`} />
        <p className="text-sm text-slate-600">
          General training information for police station representative candidates in England &amp; Wales — not legal advice.
        </p>
        {related.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0B3C5D]">Related posts</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="text-[#0B3C5D] font-medium hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {relatedGuides.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[#0B3C5D]">Related guides</h2>
            <ul className="space-y-2">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="text-[#0B3C5D] font-medium hover:underline">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link href="/blog" className="inline-block text-sm font-medium text-[#0B3C5D] hover:underline">
          ← All blog posts
        </Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </article>
  );
}
