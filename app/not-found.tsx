import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingHeader from '@/components/layout/MarketingHeader';
import Footer from '@/components/layout/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you requested could not be found on PSR Train.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketingHeader />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">404</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Page not found</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            The link may be out of date or the page may have moved. Try the home page, training
            overview, or contact us if you need help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              Back to home
            </Link>
            <Link
              href="/legal/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Contact support
            </Link>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Legal:{' '}
            <Link href="/legal/privacy" className="underline hover:text-primary">
              Privacy
            </Link>
            {' · '}
            <Link href="/legal/terms" className="underline hover:text-primary">
              Terms
            </Link>
            {' · '}
            <a href={`mailto:${SITE.contactEmail}`} className="underline hover:text-primary">
              {SITE.contactEmail}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
