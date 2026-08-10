import { PSRUK_DIRECTORY_HREF, PSRUK_REGISTER_HREF } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';
import { PSA_HOME_HREF } from '@/lib/policestationagent-promo';

/** Compact partner links for legal/compliance pages (full banners are hidden there). */
export function LegalPartnerStrip() {
  const links = [
    { href: PSRUK_REGISTER_HREF, label: 'PoliceStationRepUK — register free' },
    { href: PSRUK_DIRECTORY_HREF, label: 'Rep directory' },
    { href: CUSTODYNOTE_TRIAL_HREF, label: 'Custody Note — free trial' },
    { href: PSA_HOME_HREF, label: 'Police Station Agent' },
  ];

  return (
    <aside
      className="mb-8 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs text-slate-600"
      aria-label="Partner resources"
    >
      <p className="mb-2 font-semibold uppercase tracking-wider text-slate-500">Partner resources</p>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {links.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0B3C5D] underline decoration-slate-300 underline-offset-2 hover:decoration-[#0B3C5D]"
          >
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
}
