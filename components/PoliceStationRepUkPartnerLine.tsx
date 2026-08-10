import { PSRUK_REGISTER_HREF } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';

type Props = {
  variant?: 'light' | 'dark';
};

/** Inline partner mentions for marketing page heroes. */
export function PoliceStationRepUkPartnerLine({ variant = 'light' }: Props) {
  const isDark = variant === 'dark';
  return (
    <p className={`text-sm ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>
      <strong className={isDark ? 'text-white' : 'text-[#0B3C5D]'}>Partner:</strong> Accredited reps can{' '}
      <a
        href={PSRUK_REGISTER_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold underline underline-offset-2 ${isDark ? 'text-[#D4AF37]' : 'text-[#0B3C5D]'}`}
      >
        register free on PoliceStationRepUK
      </a>{' '}
      while building their practice.
    </p>
  );
}
