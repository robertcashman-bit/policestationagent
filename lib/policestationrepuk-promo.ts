import { partnerHref } from '@/lib/utm';

export const PSRUK_SITE = 'https://policestationrepuk.org';

export function repukHref(campaign: string, path = ''): string {
  const base = path
    ? `${PSRUK_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : PSRUK_SITE;
  return partnerHref(base, campaign, 'psrtrain');
}

export const PSRUK_REGISTER_HREF = repukHref('footer', '/register');
export const PSRUK_DIRECTORY_HREF = repukHref('footer', '/directory');
export const PSRUK_BECOME_REP_HREF = repukHref('footer', '/HowToBecomePoliceStationRep');

export const PSRUK_PROMO_HEADLINE =
  'List your practice free on the UK police station rep directory';
export const PSRUK_PROMO_BODY =
  'PoliceStationRepUK connects accredited reps with criminal defence firms searching for cover across England & Wales.';
