import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import RescueLegacyHash from "@/components/auth/RescueLegacyHash";
import { PoliceStationRepUkPromo } from "@/components/PoliceStationRepUkPromo";
import { FreeAccessStrip } from "@/components/FreeAccessStrip";
import { SiteVersionStamp } from "@/components/SiteVersionStamp";
import { SisterProductsPromo } from "@/components/SisterProductsPromo";
import { SupportWidget } from "@/components/SupportWidget";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsEventBinder } from "@/components/AnalyticsEventBinder";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: '#0B3C5D',
};

export const metadata: Metadata = {
  title: {
    default: "PSR Train - Police Station Representative Training",
    template: "%s | PSR Train"
  },
  description: "Professional training platform for Police Station Representatives. Practice questions, mock exams, PACE codes, and study materials to prepare for the Police Station Representative Accreditation Scheme (PSRAS).",
  keywords: ["PSR", "Police Station Representative", "PSRAS", "PACE", "Training", "Legal Training", "Police Station", "Accreditation", "Mock Exam"],
  authors: [{ name: "PSR Train" }],
  creator: "PSR Train",
  publisher: "PSR Train",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://psrtrain.com'),
  openGraph: {
    title: "PSR Train - Police Station Representative Training",
    description: "Practical training for police station representatives. Prepare for the PSRAS with practice questions, mock exams, and PACE materials.",
    siteName: "PSR Train",
    locale: "en_GB",
    type: "website",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'PSR Train - Police Station Representative Training' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PSR Train - Police Station Representative Training",
    description: "Practical training for police station representatives. Prepare for the PSRAS.",
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'ZIkPA3Q0x_BUfA5rVLu8ebQKBtP5l8DzabsxU0TqgTE',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed', title: 'PSR Train RSS' }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#0B3C5D] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <RescueLegacyHash />
        <SiteJsonLd />
        <FreeAccessStrip />
        <PoliceStationRepUkPromo />
        <SisterProductsPromo />
        <ThemeProvider>{children}</ThemeProvider>
        <SupportWidget />
        <CookieBanner />
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <AnalyticsEventBinder />
        </Suspense>
        <SiteVersionStamp className="fixed bottom-1.5 left-2 z-[5] pointer-events-none select-none" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
