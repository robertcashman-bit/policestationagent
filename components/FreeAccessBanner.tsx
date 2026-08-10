import { freeAccessEndsLabel, isFreeAccessPeriodActive } from '@/lib/free-access-promo';
import { Sparkles } from 'lucide-react';

type Props = {
  variant?: 'light' | 'dark';
};

export function FreeAccessBanner({ variant = 'light' }: Props) {
  if (!isFreeAccessPeriodActive()) return null;
  const until = freeAccessEndsLabel();
  const isDark = variant === 'dark';

  return (
    <p
      className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide ${
        isDark
          ? 'border border-emerald-400/30 bg-emerald-500/15 text-emerald-200'
          : 'border border-emerald-300 bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-800 shadow-sm'
      }`}
    >
      <Sparkles className={`h-3.5 w-3.5 shrink-0 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`} aria-hidden />
      Free access whilst testing{until ? ` — until ${until}` : ''}
    </p>
  );
}
