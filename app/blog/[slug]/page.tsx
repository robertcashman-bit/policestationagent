import PageShell from "@/components/PageShell";
import { normalizeScrapedHtml } from "@/lib/scraped-html";
import BlogAdvertBlock from "@/components/BlogAdvertBlock";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { LegalAccuracyNotice } from "@/components/legal/LegalAccuracyNotice";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug, formatBlogDate, generateExcerpt } from "@/lib/blog-reader";
import { sanitizeBlogHtml } from "@/lib/html-sanitizer";
import {
  stripFirmPhonePlainText,
  stripFirmPhonesToContact,
} from "@/lib/seo/strip-firm-phones";
import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ContextualCTA } from "@/components/conversion/ContextualCTA";

// Use ISR for blog posts - revalidate every hour
export const revalidate = 3600; // 1 hour
export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = SITE_URL;
  const safeTitle = stripFirmPhonePlainText(post.metaTitle || post.title);
  const safeDescription = stripFirmPhonePlainText(
    post.metaDescription || generateExcerpt(post.contentHtml, 160),
  );

  return {
    title: safeTitle,
    description: safeDescription,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "Police Station Agent",
      type: "article",
      locale: "en_GB",
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.startsWith("/")
                ? `${siteUrl}${post.featuredImage}`
                : post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: `${siteUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
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
}

export default async function BlogPostPage(props: Readonly<PageProps>) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const siteUrl = SITE_URL;
  // Never publish the firm answering-service number on any blog post.
  const sanitizedContentHtml = stripFirmPhonesToContact(
    sanitizeBlogHtml(post.contentHtml),
  );
  const safeDescription = stripFirmPhonePlainText(
    post.metaDescription || generateExcerpt(post.contentHtml, 160),
  );
  const safeHeadline = stripFirmPhonePlainText(post.title);

  // Build structured data
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "Article"],
    headline: safeHeadline,
    description: safeDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "PoliceStationAgent.com",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    url: `${siteUrl}/blog/${post.slug}`,
    image: post.featuredImage
      ? [
          {
            "@type": "ImageObject",
            url: post.featuredImage.startsWith("/")
              ? `${siteUrl}${post.featuredImage}`
              : post.featuredImage,
          },
        ]
      : undefined,
    articleSection: post.category,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].filter(Boolean),
    inLanguage: "en-GB",
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  // Add FAQ schema if post has FAQs
  const faqSchema =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: stripFirmPhonePlainText(faq.a),
            },
          })),
        }
      : null;

  return (
    <PageShell forceHidePhone>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <section className="hero-navy relative py-14 md:py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
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
                className="w-5 h-5"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to Blog
            </Link>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              {safeHeadline}
            </h1>

            {/voluntary|interview|police-left|police-want|letter|caution|card-at/i.test(
              post.slug,
            ) ? (
              <div className="mb-6 max-w-2xl">
                <Link
                  href="/start/voluntary-interview#request"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent-light"
                >
                  Request VA solicitor
                </Link>
              </div>
            ) : null}

            {post.featuredImage && (
              <div className="mt-6 mb-4 relative w-full max-w-3xl mx-auto aspect-video rounded-[var(--radius-lg)] shadow-elevated overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt ?? post.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={false}
                  quality={95}
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
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
                  className="w-4 h-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="w-4 h-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <span className="text-sm">{formatBlogDate(post.date)}</span>
              </div>
              {post.category && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-navy max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: normalizeScrapedHtml(sanitizedContentHtml) }}
              className="prose prose-lg prose-navy max-w-none [&_img]:max-w-full [&_img]:h-auto [&_img]:my-6 [&_img]:mx-auto [&_img]:block [&_img]:rounded-lg [&_img]:shadow-md [&_img]:filter-none [&_img]:backdrop-filter-none"
            />
          </article>

          {post.faq && post.faq.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="font-display text-2xl font-bold text-primary mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faq.map((faq) => (
                  <div key={faq.q} className="surface-card p-6">
                    <h3 className="font-semibold text-lg text-primary mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{stripFirmPhonePlainText(faq.a)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AuthorBox />

          <div className="mt-12 pt-8 border-t border-border">
            <LegalAccuracyNotice variant="box" />
          </div>

          <BlogAdvertBlock hideDigits />
          <ContextualCTA
            variant={
              /solicitor|agency|firm|freelance|cover|attendance-note/i.test(post.slug)
                ? "agency"
                : /custody|arrest|loved-one|detained|out-of-hours/i.test(post.slug)
                  ? "custody"
                  : "voluntary"
            }
          />
        </div>
      </section>
    </PageShell>
  );
}
