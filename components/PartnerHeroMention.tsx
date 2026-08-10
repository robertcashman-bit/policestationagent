import { PSRUK_REGISTER_HREF } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';

type Props = {
  /** Use on dark hero backgrounds */
  variant?: 'light' | 'dark';
};

/** Homepage hero callout for sister products. */
export function PartnerHeroMention({ variant = 'light' }: Props) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`mx-auto mt-8 max-w-2xl rounded-xl px-4 py-3 text-sm shadow-sm ${
        isDark
          ? 'border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm'
          : 'border border-[#0B3C5D]/10 bg-white/80 text-slate-600'
      }`}
    >
      <p className={`font-semibold ${isDark ? 'text-[#D4AF37]' : 'text-[#0B3C5D]'}`}>
        More tools from our network
      </p>
      <p className="mt-1.5 leading-relaxed">
        List your practice on{' '}
        <a
          href={PSRUK_REGISTER_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold underline decoration-[#D4AF37]/60 underline-offset-2 ${
            isDark ? 'text-white hover:decoration-white' : 'text-[#0B3C5D] hover:decoration-[#0B3C5D]'
          }`}
        >
          PoliceStationRepUK
        </a>{' '}
        · Record attendances with{' '}
        <a
          href={CUSTODYNOTE_TRIAL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold underline decoration-[#D4AF37]/60 underline-offset-2 ${
            isDark ? 'text-white hover:decoration-white' : 'text-[#0B3C5D] hover:decoration-[#0B3C5D]'
          }`}
        >
          Custody Note
        </a>{' '}
        (30-day free trial)
      </p>
    </div>
  );
}
