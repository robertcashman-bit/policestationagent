import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd, organizationJsonLd } from "@/components/JsonLd";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Custody Note – LAA-compliant custody notes for legal aid",
    template: "%s | Custody Note",
  },
  description:
    "Desktop app for police station legal aid. LAA-compliant custody notes, time recording, and PDF export. Built for solicitors and custody visitors.",
  keywords: [
    "custody notes",
    "legal aid",
    "LAA",
    "police station",
    "solicitor",
    "duty solicitor",
    "custody visitor",
    "legal aid agency",
    "freelance police station representative",
  ],
  authors: [{ name: "Custody Note" }],
  creator: "Custody Note",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Custody Note",
    title: "Custody Note – LAA-compliant custody notes for legal aid",
    description:
      "Desktop app for police station legal aid. LAA-compliant custody notes, time recording, and PDF export.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Custody Note – The custody note app for freelance police station reps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custody Note – LAA-compliant custody notes for legal aid",
    description:
      "Desktop app for police station legal aid. LAA-compliant custody notes, time recording, and PDF export.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export function viewport() {
  return {
    themeColor: "#0f172a",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
