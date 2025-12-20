import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  title: string;
  intro?: string;
  children: ReactNode;
};

/**
 * Shared layout wrapper for individual police station pages.
 * Useful for standardising structure across static station pages.
 */
export default function PoliceStationPageLayout({ title, intro, children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="prose prose-lg max-w-none">
              <h1>{title}</h1>
              {intro ? <p className="lead">{intro}</p> : null}
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

