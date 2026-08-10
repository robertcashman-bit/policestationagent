import { partnerHref } from '@/lib/utm';

export const CUSTODYNOTE_SITE = 'https://custodynote.com';

export function cnHref(campaign: string, path = ''): string {
  const base = path
    ? `${CUSTODYNOTE_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : CUSTODYNOTE_SITE;
  return partnerHref(base, campaign, 'psrtrain');
}

export const CUSTODYNOTE_TRIAL_HREF = cnHref('footer');
export const CUSTODYNOTE_FEATURES_HREF = cnHref('footer', '/features');

export const CUSTODYNOTE_PROMO_HEADLINE = 'Custody Note — structured attendance notes';
export const CUSTODYNOTE_PROMO_BODY =
  'PACE-aligned custody notes for reps and solicitors. Offline at the station, PDF export, 30-day free trial.';
