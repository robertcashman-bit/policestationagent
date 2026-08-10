'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Blog footer CTA: course sign-up link + lightweight email capture.
 * Posts to /api/newsletter (server-side). No secrets client-side.
 */
export function BlogCtaCapture({ source = 'blog' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      setMessage('Thanks — check your inbox for PSRAS study tips.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section className="rounded-xl border border-[#0B3C5D]/20 bg-[#e8eef5] p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-[#0B3C5D]">Preparing for PSRAS?</h2>
        <p className="text-slate-700">
          Get the question bank and timed mocks, or join the free study-tips list — practical
          PSRAS, PACE and CIT preparation for police station representative candidates.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="/pricing"
          className="inline-flex items-center justify-center rounded-lg bg-[#0B3C5D] px-5 py-2.5 font-semibold text-white hover:bg-[#0B3C5D]/90"
        >
          Explore the course
        </a>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 focus:border-[#0B3C5D] focus:outline-none focus:ring-1 focus:ring-[#0B3C5D]"
            disabled={status === 'loading'}
          />
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg border border-[#0B3C5D] px-5 py-2.5 font-semibold text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining…' : 'Get free study tips'}
        </button>
      </form>

      {message && (
        <p
          className={`text-sm ${status === 'error' ? 'text-red-700' : 'text-green-700'}`}
          role="status"
        >
          {message}
        </p>
      )}
      <p className="text-xs text-slate-500">
        Training information only — not legal advice. Unsubscribe any time.
      </p>
    </section>
  );
}
