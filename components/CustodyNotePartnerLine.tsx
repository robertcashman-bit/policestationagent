import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';

type Props = {
  variant?: 'light' | 'dark';
};

export function CustodyNotePartnerLine({ variant = 'light' }: Props) {
  const isDark = variant === 'dark';
  return (
    <p className={`mt-2 text-sm ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
      <strong className={isDark ? 'text-white' : 'text-[#0B3C5D]'}>Also try:</strong>{' '}
      <a
        href={CUSTODYNOTE_TRIAL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold underline underline-offset-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#0B3C5D]'}`}
      >
        Custody Note
      </a>{' '}
      for structured PACE attendance notes — 30-day free trial.
    </p>
  );
}
