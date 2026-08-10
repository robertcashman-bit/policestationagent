'use client';

import { usePathname } from 'next/navigation';
import {
  CUSTODYNOTE_PROMO_BODY,
  CUSTODYNOTE_PROMO_HEADLINE,
  CUSTODYNOTE_TRIAL_HREF,
} from '@/lib/custodynote-promo';
import {
  PSA_HOME_HREF,
  PSA_PROMO_BODY,
  PSA_PROMO_HEADLINE,
} from '@/lib/policestationagent-promo';

const HIDDEN_PREFIXES = ['/legal', '/admin', '/guides'];

export function SisterProductsPromo() {
  const pathname = usePathname() ?? '';
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <aside
      className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/90 px-4 py-3"
      aria-label="Partner tools promotion"
    >
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-[#0B3C5D]">{CUSTODYNOTE_PROMO_HEADLINE}</p>
          <p className="mt-1 text-xs text-slate-600">{CUSTODYNOTE_PROMO_BODY}</p>
          <a
            href={CUSTODYNOTE_TRIAL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[32px] items-center rounded-md bg-[#0B3C5D] px-3 text-xs font-bold text-white no-underline hover:bg-[#0a3352]"
          >
            Start free trial
          </a>
        </div>
        <div className="text-center sm:text-left sm:border-l sm:border-slate-200 sm:pl-4">
          <p className="text-sm font-semibold text-[#0B3C5D]">{PSA_PROMO_HEADLINE}</p>
          <p className="mt-1 text-xs text-slate-600">{PSA_PROMO_BODY}</p>
          <a
            href={PSA_HOME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[32px] items-center rounded-md border border-[#0B3C5D]/30 bg-white px-3 text-xs font-semibold text-[#0B3C5D] no-underline hover:border-[#0B3C5D]"
          >
            Visit site
          </a>
        </div>
      </div>
    </aside>
  );
}
