import Link from 'next/link';
import { Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Account · PSR Train',
    template: '%s · PSR Train',
  },
  description: 'Sign in or create your PSR Train account to access practice questions, modules, and training.',
  robots: { index: false, follow: true },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — dark branding */}
      <div
        className="hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col justify-between p-10 flex-shrink-0"
        style={{ background: '#060d1a' }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 group"
          aria-label="PSR Train home"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
            <Shield className="w-5 h-5 text-white" aria-hidden />
          </div>
          <span className="leading-tight">
            <span className="font-bold text-white text-base tracking-tight block">PSR Train</span>
            <span className="text-[9px] text-[#4a6080] font-bold uppercase tracking-widest block mt-0.5">
              Police Station Rep
            </span>
          </span>
        </Link>

        <div>
          <div className="mb-6">
            <div className="h-px w-10 bg-gold mb-6" />
            <h2 className="font-display text-2xl font-bold text-white mb-3 leading-tight">
              Professional training for Police Station Representatives
            </h2>
            <p className="text-[#8b9bb4] text-[0.9375rem] leading-relaxed">
              Practice questions, learning modules, PACE code reference, and scenario training — all in one place.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              'MCQ practice with instant feedback',
              'Topic-based learning modules',
              'CIT-style scenario exercises',
              'Progress tracking by topic',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#8b9bb4] text-sm">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#c9a84c' }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[#2a4060] text-xs leading-relaxed">
          Training guidance only — not legal advice. Completion does not confer PSRAS accreditation.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-[#f7f6f2]">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-white">
          <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="PSR Train home">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-white" aria-hidden />
            </div>
            <span className="font-bold text-foreground text-sm tracking-tight">PSR Train</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
