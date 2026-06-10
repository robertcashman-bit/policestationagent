import { partnerHref } from '@/lib/utm';

export const CUSTODYNOTE_SITE = 'https://custodynote.com';

export function cnHref(campaign: string, path = ''): string {
  const base = path
    ? `${CUSTODYNOTE_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : CUSTODYNOTE_SITE;
  return partnerHref(base, campaign, 'policestationagent');
}

export const CUSTODYNOTE_TRIAL_HREF = cnHref('footer');
