import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbList({ items }: BreadcrumbListProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

interface PlaceSchemaProps {
  name: string;
  /** Full address string, e.g. "Purser Way, Gillingham ME7 1NE". */
  address: string;
  url: string;
  /** Optional human-readable description of the place. */
  description?: string;
  /** Optional UK area/region the place serves or sits within. */
  areaServed?: string;
}

/**
 * Parses a single-line UK address into a schema.org PostalAddress.
 * Extracts a trailing UK postcode when present; the remainder becomes the
 * street address. Falls back to the whole string as streetAddress.
 */
function parsePostalAddress(address: string, areaServed?: string) {
  const postcodeMatch = address.match(
    /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i,
  );
  const postalCode = postcodeMatch ? postcodeMatch[0].trim() : undefined;
  const streetAddress = postalCode
    ? address.replace(postalCode, "").replace(/[,\s]+$/, "").trim()
    : address.trim();

  return {
    "@type": "PostalAddress",
    streetAddress,
    ...(postalCode ? { postalCode } : {}),
    ...(areaServed ? { addressRegion: areaServed } : {}),
    addressCountry: "GB",
  };
}

/**
 * Emits Place JSON-LD for a physical location (e.g. a police station).
 * Police stations are modelled as Place rather than the agent's
 * LocalBusiness, which more accurately reflects what the URL describes.
 */
export function PlaceSchema({
  name,
  address,
  url,
  description,
  areaServed,
}: PlaceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    url,
    ...(description ? { description } : {}),
    address: parsePostalAddress(address, areaServed),
  };

  return (
    <Script
      id="place-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageProps {
  items: FAQItem[];
}

export function FAQPage({ items }: FAQPageProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
