import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Arrested at a Police Station – Free Legal Advice",
  description:
    "Free legal advice for those arrested at a police station. Independent solicitor representation available immediately. Call 01732 247427.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/arrested-at-police-station`,
  },
  openGraph: {
    title: "Arrested at a Police Station – Free Legal Advice",
    description:
      "Free legal advice for those arrested at a police station. Independent solicitor representation available immediately.",
    url: `https://${SITE_DOMAIN}/arrested-at-police-station`,
    siteName: "Police Station Agent",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ArrestedAtPoliceStationPage() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
        id="main-content"
        role="main"
        aria-live="polite"
      >
        <div className="prose prose-lg max-w-6xl mx-auto px-4 py-16">
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="bg-gradient-to-br from-slate-50 via-blue-50 to-white"><section class="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800 text-white pt-32 pb-32 md:pt-28 md:pb-40" aria-labelledby="hero-heading"><div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" aria-hidden="true"></div><div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" aria-hidden="true"></div><div class="max-w-7xl mx-auto px-4 relative z-10"><div class="text-center max-w-5xl mx-auto"><h1 id="hero-heading" class="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg">Arrested at a Police Station? You Are Entitled to a Free Solicitor</h1><h2 class="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto font-medium">Independent legal advice is available immediately following arrest and cannot be refused by the police.</h2><div class="flex flex-wrap justify-center gap-4 mb-10"><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-full shadow-xl border-2 border-amber-500">Call If Someone Is in Custody</a><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-full shadow-xl">Request Duty Solicitor</a></div></div></div><div class="absolute bottom-0 left-0 right-0" aria-hidden="true"><svg viewBox="0 0 1440 120" class="w-full h-auto" role="presentation"><path fill="#f8fafc" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path></svg></div></section><section class="py-20 bg-white"><div class="max-w-4xl mx-auto px-4"><p class="text-lg text-slate-700 leading-relaxed">If someone has been arrested and is currently in police custody, they have the right to free and independent legal advice. We provide police station representation to ensure detainees are properly advised before interview.</p></div></section></div>`,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
