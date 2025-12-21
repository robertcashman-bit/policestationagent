import type { Metadata } from "next";
import "./globals.css";
import { inter } from './fonts';
import { SITE_URL, SITE_DOMAIN } from '@/config/site';
import Script from 'next/script';
import Chatbot from '@/components/Chatbot';
import CookieBanner from '@/components/CookieBanner';
import InternalLinkInterceptor from '@/components/InternalLinkInterceptor';

function getSafeSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    // Support a few common env var names used in deployments
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    SITE_URL;

  const noWhitespace = String(raw).trim().replace(/\s+/g, "");
  if (!noWhitespace) return SITE_URL;

  const withProtocol =
    noWhitespace.startsWith("http://") || noWhitespace.startsWith("https://")
      ? noWhitespace
      : `https://${noWhitespace}`;

  try {
    // Normalize and remove trailing slash for consistency across metadata/schema.
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    // Fallback to canonical config to avoid a hard crash in RootLayout/metadataBase.
    return SITE_URL || `https://${SITE_DOMAIN}`;
  }
}

const siteUrl = getSafeSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Police Station Agent - Expert Legal Representation",
    template: "%s | Police Station Agent",
  },
  description:
    "Professional police station representation and legal services across Kent and the UK. Extended hours availability for urgent legal assistance. Free legal advice under Legal Aid.",
  keywords: ["police station agent", "legal representation", "solicitor", "criminal defense", "duty solicitor", "Kent", "police station representation", "legal aid"],
  authors: [{ name: "Robert Cashman", url: siteUrl }],
  creator: "Robert Cashman",
  publisher: "Police Station Agent",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Police Station Agent",
    title: "Police Station Agent - Expert Legal Representation",
    description:
      "Professional police station representation and legal services across Kent and the UK. Extended hours availability for urgent legal assistance.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Default OG image - can be customized per page
        width: 1200,
        height: 630,
        alt: "Police Station Agent - Expert Legal Representation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Police Station Agent - Expert Legal Representation",
    description: "Professional police station representation and legal services across Kent and the UK.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'verification-token',
  },
};

// WebSite schema with SearchAction
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: 'Police Station Agent',
  description: 'Expert police station representation and legal services across Kent and the UK.',
  publisher: {
    '@id': `${siteUrl}#legalservice`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-GB',
};

// Comprehensive Legal Service Schema for Local SEO Dominance in Kent
// Combines LegalService, Attorney, and LocalBusiness types using @graph
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    websiteSchema,
    {
      "@type": "LegalService",
      "@id": `${siteUrl}#legalservice`,
      "name": "Robert Cashman – Police Station Duty Solicitor (Kent)",
      "alternateName": "Police Station Agent",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "description": "Qualified Police Station Duty Solicitor and Higher Court Advocate serving Kent since 2001. Accredited duty solicitor providing expert police station representation, pre-charge advice, and bail representation at all Kent custody suites. FREE legal advice under Legal Aid.",
      "telephone": "+441732247427",
      "email": "robertcashman@defencelegalservices.co.uk",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "Kent",
        "addressLocality": "Kent"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Maidstone",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "City",
          "name": "Medway",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "City",
          "name": "Canterbury",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "City",
          "name": "Ashford",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "City",
          "name": "Dartford",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "City",
          "name": "Sevenoaks",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "City",
          "name": "Gravesend",
          "containedIn": {
            "@type": "State",
            "name": "Kent"
          }
        },
        {
          "@type": "State",
          "name": "Kent"
        }
      ],
      "serviceType": "Police Station Duty Solicitor Services",
      "priceRange": "Free under Legal Aid",
      "founder": {
        "@id": `${siteUrl}#attorney`
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Police Station Duty Solicitor Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Police Station Duty Solicitor",
              "description": "Expert duty solicitor representation at all Kent police stations. FREE under Legal Aid.",
              "areaServed": {
                "@type": "State",
                "name": "Kent"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Police Station Representation",
              "description": "Professional legal representation during police interviews, voluntary attendances, and custody matters across Kent.",
              "areaServed": {
                "@type": "State",
                "name": "Kent"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Advice Before Police Interview",
              "description": "Pre-interview legal advice and preparation. Understand your rights before speaking with police.",
              "areaServed": {
                "@type": "State",
                "name": "Kent"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bail Advice & Pre-Charge Representation",
              "description": "Expert bail applications and pre-charge legal representation at Kent custody suites.",
              "areaServed": {
                "@type": "State",
                "name": "Kent"
              }
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Higher Court Advocate (Criminal)",
              "description": "Higher Rights of Audience (Criminal) enables representation in Crown Court and higher courts.",
              "areaServed": {
                "@type": "State",
                "name": "Kent"
              }
            }
          }
        ]
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "23:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/policestationagent",
        "https://www.linkedin.com/company/police-station-agent",
        "https://twitter.com/policestation"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#localbusiness`,
      "name": "Robert Cashman – Police Station Duty Solicitor (Kent)",
      "image": `${siteUrl}/logo.png`,
      "telephone": "+441732247427",
      "email": "robertcashman@defencelegalservices.co.uk",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "Kent"
      },
      "areaServed": {
        "@type": "State",
        "name": "Kent"
      },
      "priceRange": "Free under Legal Aid"
    },
    {
      "@type": "Attorney",
      "@id": `${siteUrl}#attorney`,
      "name": "Robert Cashman",
      "jobTitle": "Police Station Duty Solicitor & Higher Court Advocate",
      "worksFor": {
        "@id": `${siteUrl}#legalservice`
      },
      "description": "Qualified solicitor and accredited duty solicitor with Higher Rights of Audience (Criminal). Providing expert police station representation across Kent since 2001. 35+ years experience, 21,000+ cases.",
      "knowsAbout": [
        "Criminal Defence",
        "Police Station Representation",
        "Duty Solicitor Services",
        "Bail Applications",
        "Pre-Charge Advice",
        "Higher Court Advocacy",
        "Legal Aid"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Qualification",
          "name": "Qualified Solicitor",
          "datePublished": "2001"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Accreditation",
          "name": "Accredited Police Station Duty Solicitor"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Accreditation",
          "name": "Higher Rights of Audience (Criminal)"
        }
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Law Society Accredited"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Police Station Agent - All Posts" href={`${siteUrl}/feed.xml`} />
        <link rel="alternate" type="application/rss+xml" title="Police Station Agent - Recent Posts" href={`${siteUrl}/feed/recent`} />
        {/* Critical inline styles for LCP - reduces render delay */}
        <style dangerouslySetInnerHTML={{ __html: `
          .lcp-hero{font-size:1.25rem;line-height:1.75rem;color:rgb(191 219 254);margin-bottom:2rem;font-weight:500;max-width:56rem;margin-left:auto;margin-right:auto}
          @media(min-width:768px){.lcp-hero{font-size:1.5rem;line-height:2rem}}
          /* Prevent layout shift */
          body{margin:0;padding:0}
          /* Critical above-fold styles */
          header{position:relative;z-index:50}
        `}} />
        {/* DNS prefetch for external resources - early connection establishment */}
        <link rel="dns-prefetch" href="https://static.wixstatic.com" />
        <link rel="dns-prefetch" href="https://wixstatic.com" />
        <link rel="dns-prefetch" href="https://base44.app" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preconnect for critical external resources - establish early connections */}
        <link rel="preconnect" href="https://static.wixstatic.com" crossOrigin="anonymous" />
        {/* Trusted Types policy for DOM-based XSS protection */}
        <Script
          id="trusted-types"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
                window.trustedTypes.createPolicy('default', {
                  createHTML: (string) => string,
                  createScript: (string) => string,
                  createScriptURL: (string) => string,
                });
              }
            `,
          }}
        />
        {/* Organization structured data - defer to afterInteractive for better LCP */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Preload critical hero images for LCP optimization */}
        <link rel="preload" as="image" href={`${siteUrl}/og-image.jpg`} />
        {/* Optimize font loading with font-display swap */}
        <link rel="preload" href="/_next/static/media/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:no-underline"
        >
          Skip to main content
        </a>
        <InternalLinkInterceptor>{children}</InternalLinkInterceptor>
        {/* Cookie Consent Banner - Minimal, compliant */}
        <CookieBanner />
        {/* Chatbot Assistant - Fixed position, non-blocking */}
        <Chatbot />
      </body>
    </html>
  );
}

