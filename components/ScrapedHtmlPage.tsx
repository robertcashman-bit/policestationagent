import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { normalizeScrapedHtml } from "@/lib/scraped-html";

type Props = {
  html: string;
  className?: string;
  beforeMain?: ReactNode;
  afterMain?: ReactNode;
  preprocess?: (html: string) => string;
};

/**
 * Standard shell for scraped HTML blob pages.
 * Ensures skip-link target, strips version badges, and normalizes contact links.
 */
export default function ScrapedHtmlPage({
  html,
  className = "prose prose-lg max-w-6xl mx-auto px-4 py-16",
  beforeMain,
  afterMain,
  preprocess,
}: Props) {
  const raw = preprocess ? preprocess(html) : html;
  const normalized = normalizeScrapedHtml(raw);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      {beforeMain}
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: normalized }}
          />
        </div>
      </main>
      <Footer />
      {afterMain}
    </div>
  );
}

export function ScrapedHtmlContent({
  html,
  className = "prose prose-lg max-w-6xl mx-auto px-4 py-16",
  preprocess,
}: {
  html: string;
  className?: string;
  preprocess?: (html: string) => string;
}) {
  const raw = preprocess ? preprocess(html) : html;
  const normalized = normalizeScrapedHtml(raw);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: normalized }}
    />
  );
}
