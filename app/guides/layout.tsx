import type { Metadata } from 'next';
import MarketingHeader from '@/components/layout/MarketingHeader';
import Footer from '@/components/layout/Footer';
import { LegalPartnerStrip } from '@/components/LegalPartnerStrip';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    types: {
      'application/rss+xml': `${SITE.url}/feed`,
    },
  },
};

export default function GuidesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketingHeader />
      <main id="main-content" className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <LegalPartnerStrip />
        {children}
      </main>
      <Footer />
    </div>
  );
}
