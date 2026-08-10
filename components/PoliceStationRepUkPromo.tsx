'use client';

import { usePathname } from 'next/navigation';
import {
  PSRUK_DIRECTORY_HREF,
  PSRUK_PROMO_BODY,
  PSRUK_PROMO_HEADLINE,
  PSRUK_REGISTER_HREF,
} from '@/lib/policestationrepuk-promo';

const HIDDEN_PREFIXES = ['/legal', '/admin', '/guides'];

export function PoliceStationRepUkPromo() {
  const pathname = usePathname() ?? '';
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <aside
      className="border-b border-amber-300/60 bg-gradient-to-r from-amber-50 to-amber-100/80 px-4 py-3 text-center text-sm text-amber-950"
      aria-label="Partner directory promotion"
    >
      <p className="font-semibold">{PSRUK_PROMO_HEADLINE}</p>
      <p className="mt-1 text-xs text-amber-900/90">{PSRUK_PROMO_BODY}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <a
          href={PSRUK_REGISTER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[36px] items-center rounded-md bg-amber-900 px-3 text-xs font-bold text-amber-50 no-underline hover:bg-amber-800"
        >
          Register free
        </a>
        <a
          href={PSRUK_DIRECTORY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[36px] items-center rounded-md border border-amber-900/30 bg-white/80 px-3 text-xs font-semibold text-amber-950 no-underline hover:border-amber-900"
        >
          Browse directory
        </a>
      </div>
    </aside>
  );
}
