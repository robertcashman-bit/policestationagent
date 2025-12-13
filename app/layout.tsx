import type { Metadata } from "next";
import "./globals.css";
import { inter } from './fonts';
import { SITE_URL, SITE_DOMAIN } from '@/config/site';
import Script from 'next/script';

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Police Station Agent - Expert Legal Representation",
    description: "Professional police station representation and legal services across Kent and the UK.",
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

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${siteUrl}#organization`,
  "name": "Police Station Agent",
  "alternateName": "Defence Legal Services",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`, // Add logo if available
  "description": "Professional police station representation and legal services across Kent and the UK",
  "telephone": "+441732247427",
  "email": "robertcashman@defencelegalservices.co.uk",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
    "addressRegion": "Kent"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 51.2787,
      "longitude": 0.5217
    },
    "geoRadius": {
      "@type": "Distance",
      "name": "Kent"
    }
  },
  "priceRange": "Free under Legal Aid",
  "sameAs": [
    // Add social media profiles if available
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
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

