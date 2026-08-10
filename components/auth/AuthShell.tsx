import Link from 'next/link';
import { Shield } from 'lucide-react';
import type { ReactNode } from 'react';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — bright branding */}
      <div className="hero-bright hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col justify-between border-r border-slate-200 p-10 flex-shrink-0">
        <Link href="/" className="inline-flex items-center gap-3 group" aria-label="PSR Train home">
          <div className="w-11 h-11 rounded-xl bg-[#0B3C5D] flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5 text-[#D4AF37]" aria-hidden />
          </div>
          <span className="leading-tight">
            <span className="font-bold text-[#0B3C5D] text-base tracking-tight block">PSR Train</span>
            <span className="text-[9px] text-[#9a7a24] font-bold uppercase tracking-widest block mt-0.5">
              Police Station Rep
            </span>
          </span>
        </Link>

        <div>
          <div className="section-bar-primary mb-6" />
          <h2 className="font-display text-2xl font-bold text-[#0B3C5D] mb-3 leading-tight">
            Train with confidence for your PSRAS journey
          </h2>
          <p className="text-slate-700 text-[0.9375rem] leading-relaxed">
            Practice questions, learning modules, PACE reference, and scenario training — all in
            one bright, easy-to-use platform.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              'MCQ practice with instant feedback',
              'Topic-based learning modules',
              'CIT-style scenario exercises',
              'Progress tracking by topic',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#D4AF37]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed">
          Training guidance only — not legal advice.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-white">
          <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="PSR Train home">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-[#D4AF37]" aria-hidden />
            </div>
            <span className="font-bold text-[#0B3C5D] text-sm tracking-tight">PSR Train</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">{children}</div>
      </div>
    </div>
  );
}
