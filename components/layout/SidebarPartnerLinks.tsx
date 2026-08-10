import { PSRUK_DIRECTORY_HREF } from '@/lib/policestationrepuk-promo';
import { CUSTODYNOTE_TRIAL_HREF } from '@/lib/custodynote-promo';
import { PSA_HOME_HREF } from '@/lib/policestationagent-promo';

const partnerLinks = [
  { href: PSRUK_DIRECTORY_HREF, label: 'PoliceStationRepUK' },
  { href: CUSTODYNOTE_TRIAL_HREF, label: 'Custody Note' },
  { href: PSA_HOME_HREF, label: 'Police Station Agent' },
];

/** Partner resource links in the logged-in app sidebar. */
export function SidebarPartnerLinks() {
  return (
    <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: '1px solid #0d1e36' }}>
      <p
        className="mb-2 text-[10px] font-bold uppercase tracking-widest"
        style={{ color: '#3d5070' }}
      >
        Partner resources
      </p>
      <ul className="space-y-1">
        {partnerLinks.map(({ href, label }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-2 py-1.5 text-xs font-medium transition-colors hover:bg-[#0d1e36]"
              style={{ color: '#8b9bb4' }}
            >
              {label} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
