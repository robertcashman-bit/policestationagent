import Link from 'next/link';
import { freeAccessEndsLabel, isFreeAccessPeriodActive } from '@/lib/free-access-promo';
import { Sparkles } from 'lucide-react';

/**
 * Prominent, site-wide announcement bar for the limited free-access period.
 * Rendered at the very top of every page (above all other promos) from the
 * root layout. Disappears automatically once FREE_ACCESS_ENABLED is unset or
 * FREE_ACCESS_UNTIL has passed — no code change needed to end the promo.
 */
export function FreeAccessStrip() {
  if (!isFreeAccessPeriodActive()) return null;
  const until = freeAccessEndsLabel();
  return (
    <aside
      className="relative overflow-hidden border-b border-emerald-900/30 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 px-4 py-2.5 text-center text-sm text-white"
      aria-label="Free access promotion"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]"
        aria-hidden
      />
      <p className="relative font-semibold tracking-tight">
        <Sparkles className="mr-1.5 inline h-3.5 w-3.5 text-emerald-200" aria-hidden />
        Free access whilst we&rsquo;re testing
        {until ? ` — everything is free until ${until}` : ''}.{' '}
        <Link
          href="/signup"
          className="font-bold underline decoration-2 underline-offset-2 hover:text-emerald-100"
        >
          Create a free account
        </Link>{' '}
        <span className="text-emerald-100">— no card required.</span>
      </p>
    </aside>
  );
}
