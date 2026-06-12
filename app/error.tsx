'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_TEL } from '@/config/contact';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <Link href="/" className="text-lg font-bold text-blue-900 hover:underline">
          Police Station Agent
        </Link>
      </header>
      <main className="flex-grow px-4 py-16" id="main-content" role="main">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong</h1>
          <p className="text-slate-600 mb-8">
            We could not load this page. If you need urgent police station advice, call{' '}
            <a href={`tel:${PHONE_TEL}`} className="text-blue-700 font-semibold hover:underline">
              {PHONE_DISPLAY}
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-white"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-600">
        Legal services provided by Tuckers Solicitors LLP (SRA ID: 127795).
      </footer>
    </div>
  );
}
