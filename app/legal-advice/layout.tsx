import MarketingHeader from '@/components/layout/MarketingHeader';
import Footer from '@/components/layout/Footer';
import LegalAdviceHubDisclaimer from '@/components/legal-advice/LegalAdviceHubDisclaimer';
import { LegalPartnerStrip } from '@/components/LegalPartnerStrip';

export default function LegalAdviceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketingHeader />
      <main id="main-content" className="flex-1 container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <LegalAdviceHubDisclaimer />
        </div>
        <div className="max-w-4xl mx-auto mb-8">
          <LegalPartnerStrip />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
















