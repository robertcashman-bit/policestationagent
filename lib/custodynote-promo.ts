import { partnerHref } from '@/lib/utm';

export const CUSTODYNOTE_SITE = 'https://custodynote.com';

export function cnHref(campaign: string, path = ''): string {
  const base = path
    ? `${CUSTODYNOTE_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : CUSTODYNOTE_SITE;
  return partnerHref(base, campaign, 'policestationagent');
}

export const CUSTODYNOTE_DOWNLOAD_HREF = cnHref('footer', '/download');
export const CUSTODYNOTE_TRIAL_HREF = CUSTODYNOTE_DOWNLOAD_HREF;

export const CUSTODYNOTE_PRICE_GBP = '9.99';
export const CUSTODYNOTE_FREE_LABEL = 'Free forever';
export const CUSTODYNOTE_PROMO_PRICE_LINE = `Free forever · Pro £${CUSTODYNOTE_PRICE_GBP}/mo`;
export const CUSTODYNOTE_DOWNLOAD_CTA = 'Download Free';
