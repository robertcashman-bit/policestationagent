import type { Metadata } from "next";
import { SITE_DOMAIN, SITE_URL } from "@/config/site";
import { SEO_NOT_POLICE } from "@/config/contact";

export type PageMetadataInput = {
  title: string;
  path: string;
  description?: string;
  town?: string;
  siteName?: string;
  noIndex?: boolean;
};

function townDescription(town: string): string {
  return `Police station representation in ${town}, Kent. FREE Legal Aid advice for custody and booked voluntary interviews. ${SEO_NOT_POLICE}`;
}

function defaultDescription(title: string): string {
  return `${title.replace(/\s*\|.*$/, "").trim()}. Kent police station duty solicitor — NOT the police. ${SEO_NOT_POLICE}`;
}

/**
 * Build consistent metadata with canonical, Open Graph, and Twitter tags.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${input.path.startsWith("/") ? input.path : `/${input.path}`}`;
  const description =
    input.description?.trim() ||
    (input.town ? townDescription(input.town) : defaultDescription(input.title));

  const siteName = input.siteName ?? "Police Station Agent";

  const metadata: Metadata = {
    title: input.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: input.title,
      description,
      url: canonical,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
    },
  };

  if (input.noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}

/** Infer town name from URL slug segments like police-station-rep-maidstone */
export function townFromSlug(slug: string): string | undefined {
  const match = slug.match(
    /(?:police-station-(?:rep|agent)-|(?:.+)-solicitor$|(?:.+)-police-station$)([a-z-]+)/i,
  );
  if (!match?.[1]) return undefined;
  return match[1]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export { SITE_DOMAIN, SITE_URL };
