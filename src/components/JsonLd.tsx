type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Custody Note",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@custodynote.com",
    contactType: "customer support",
    availableLanguage: "English",
  },
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Custody Note",
  operatingSystem: "Windows 10, Windows 11",
  applicationCategory: "BusinessApplication",
  description:
    "Desktop app for freelance police station representatives and criminal solicitors. LAA-compliant custody notes, time recording, firm billing, and PDF export.",
  url: siteUrl,
  screenshot: `${siteUrl}/screenshots/home.png`,
  offers: {
    "@type": "Offer",
    price: "29.00",
    priceCurrency: "GBP",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "LAA-compliant custody notes",
    "Time recording",
    "Firm billing and tracking",
    "PACE review tracking",
    "PDF export",
    "Offline operation",
    "Encrypted cloud backup",
    "Quick Capture",
    "Multi-firm support",
  ],
};

export function buildFaqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
