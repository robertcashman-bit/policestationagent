import type { ReactNode } from "react";
import PageShell from "@/components/PageShell";
import { StandardPaceSources } from "@/components/legal/StandardPaceSources";
import { normalizeScrapedHtml } from "@/lib/scraped-html";

function htmlHasPaceLegalRefs(html: string) {
  return /\bPACE\b|\bCode C\b|\bsection \d+[A-Za-z]?\b|\bparagraph \d+[\d.A-Za-z]*\b/i.test(html);
}

type Props = {
  html: string;
  className?: string;
  beforeMain?: ReactNode;
  afterMain?: ReactNode;
  preprocess?: (html: string) => string;
  forceHidePhone?: boolean;
};

/**
 * Standard shell for scraped HTML blob pages.
 * Ensures skip-link target, strips version badges, and normalizes contact links.
 */
export default function ScrapedHtmlPage({
  html,
  className = "prose prose-lg prose-navy max-w-6xl mx-auto px-4 py-12 md:py-16",
  beforeMain,
  afterMain,
  preprocess,
  forceHidePhone = true,
}: Props) {
  const raw = preprocess ? preprocess(html) : html;
  const normalized = normalizeScrapedHtml(raw);

  return (
    <PageShell forceHidePhone={forceHidePhone} beforeHeader={beforeMain} afterFooter={afterMain}>
      <div className="bg-background min-h-full">
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: normalized }}
        />
      </div>
      {htmlHasPaceLegalRefs(raw) ? (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <StandardPaceSources />
        </div>
      ) : null}
    </PageShell>
  );
}

export function ScrapedHtmlContent({
  html,
  className = "prose prose-lg prose-navy max-w-6xl mx-auto px-4 py-12 md:py-16",
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
