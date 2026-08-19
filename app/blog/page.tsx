import PageShell from "@/components/PageShell";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatBlogDate, generateExcerpt } from "@/lib/blog-reader";
import { stripFirmPhonePlainText } from "@/lib/seo/strip-firm-phones";
import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

// Use ISR for blog listing - revalidate every hour
export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody. Authored by Robert Cashman.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: {
      "application/rss+xml": [
        { url: `${SITE_URL}/feed.xml`, title: "Police Station Agent - All Posts" },
        { url: `${SITE_URL}/feed/recent`, title: "Police Station Agent - Recent Posts" },
      ],
    },
  },
  openGraph: {
    title: "Blog",
    description:
      "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody. Authored by Robert Cashman.",
    url: `${SITE_URL}/blog`,
    siteName: "Police Station Agent",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogPage() {
  // Get ALL published blog posts
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: "Police Station Agent Blog",
    description:
      "Expert legal insights on police station representation, criminal defence procedures, and your rights in custody.",
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE_URL}#legalservice` },
    blogPost: posts.slice(0, 50).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: { "@type": "Person", name: post.author },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.slice(0, 50).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <PageShell forceHidePhone>
      <JsonLd data={blogSchema} />
      <JsonLd data={itemListSchema} />

      <section className="hero-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Legal Insights & <span className="text-accent-light">Advice</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-6">
            Expert guidance on police station procedures, your rights in custody, and criminal
            defence strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`${SITE_URL}/feed.xml`}
              className="btn-gold text-sm"
              title="Subscribe to RSS feed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M4 11a9 9 0 0 1 9 9"></path>
                <path d="M4 4a16 16 0 0 1 16 16"></path>
                <circle cx="5" cy="19" r="1"></circle>
              </svg>
              RSS Feed
            </a>
            <Link href="/feed" className="btn-ghost-light text-sm">
              All Feeds
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {posts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full surface-card overflow-hidden w-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden relative aspect-[16/9] bg-secondary w-full"
                >
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      loading="lazy"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary via-muted to-border">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                    </div>
                  )}
                </Link>
                <div className="flex flex-col flex-grow p-5">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow min-h-[3rem]">
                    {stripFirmPhonePlainText(
                      post.metaDescription || generateExcerpt(post.contentHtml, 160),
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary hover:text-primary-light mt-auto inline-flex items-center gap-1 group/link"
                  >
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover/link:translate-x-1 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                  <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>{post.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatBlogDate(post.date)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No blog posts available yet.</p>
            <p className="text-muted-foreground text-sm mt-2">Check back soon for updates.</p>
          </div>
        )}

        <div className="hero-navy py-16 md:py-20 relative overflow-hidden mt-4 rounded-[var(--radius-lg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">
              Need Legal <span className="text-accent-light">Advice?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
              If you&apos;ve been arrested or need police station representation, contact us
              immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-gold">
                Instruct solicitor (Contact)
              </Link>
              <Link href="/start/voluntary-interview" className="btn-ghost-light">
                Voluntary interview help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
