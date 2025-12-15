import type { Metadata } from "next";
import "./globals.css";
import { inter } from './fonts';
import { SITE_URL, SITE_DOMAIN } from '@/config/site';
import Script from 'next/script';
import Chatbot from '@/components/Chatbot';
import CookieBanner from '@/components/CookieBanner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Police Station Agent - Expert Legal Representation",
    template: "%s | Police Station Agent",
  },
  description: "Professional police station representation and legal services across Kent and the UK. Available 24/7 for urgent legal assistance. Free legal advice under Legal Aid.",
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
    description: "Professional police station representation and legal services across Kent and the UK. Available 24/7 for urgent legal assistance.",
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

// Enhanced LocalBusiness structured data for Kent local SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${siteUrl}#organization`,
  "name": "Police Station Agent",
  "alternateName": "Defence Legal Services",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "description": "Kent's leading police station representative service. Accredited duty solicitor providing FREE 24/7 police station representation across all Kent custody suites.",
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
      "name": "Medway",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    },
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
      "name": "Canterbury",
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
      "@type": "City",
      "name": "Tonbridge",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    },
    {
      "@type": "City",
      "name": "Folkestone",
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
      "name": "Sittingbourne",
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
      "name": "Tunbridge Wells",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    },
    {
      "@type": "City",
      "name": "Margate",
      "containedIn": {
        "@type": "State",
        "name": "Kent"
      }
    },
    {
      "@type": "City",
      "name": "Dover",
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
  "serviceType": "Police Station Representation",
  "priceRange": "Free under Legal Aid",
  "provider": {
    "@type": "Person",
    "name": "Robert Cashman",
    "jobTitle": "Accredited Duty Solicitor",
    "description": "Qualified solicitor with 35+ years experience, 6000+ cases, Practice Director, Higher Court Advocate"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Police Station Representation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Police Station Representation",
          "description": "FREE police station representation under Legal Aid at all Kent custody suites",
          "areaServed": {
            "@type": "State",
            "name": "Kent"
          }
        }
      }
    ]
  },
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Critical inline styles for LCP - reduces render delay */}
        <style dangerouslySetInnerHTML={{ __html: `
          .lcp-hero{font-size:1.25rem;line-height:1.75rem;color:rgb(191 219 254);margin-bottom:2rem;font-weight:500;max-width:56rem;margin-left:auto;margin-right:auto}
          @media(min-width:768px){.lcp-hero{font-size:1.5rem;line-height:2rem}}
        `}} />
        {/* DNS prefetch for external resources - early connection establishment */}
        <link rel="dns-prefetch" href="https://static.wixstatic.com" />
        <link rel="dns-prefetch" href="https://wixstatic.com" />
        <link rel="dns-prefetch" href="https://base44.app" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preconnect for critical external resources - establish early connections */}
        <link rel="preconnect" href="https://static.wixstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Organization structured data - defer to afterInteractive for better LCP */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:no-underline"
        >
          Skip to main content
        </a>
        {children}
        {/* Cookie Consent Banner - Minimal, compliant */}
        <CookieBanner />
        {/* Chatbot Assistant - Fixed position, non-blocking */}
        <Chatbot />
      </body>
    </html>
  );
}

