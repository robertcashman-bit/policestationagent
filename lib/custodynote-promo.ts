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

/** Windows only — live on Microsoft Store (UK). Do not use for Mac. */
export const CUSTODYNOTE_MICROSOFT_STORE_ID = '9NFSRVT3T45V';
export const CUSTODYNOTE_MICROSOFT_STORE_HREF =
  'https://apps.microsoft.com/detail/9NFSRVT3T45V';
/** Primary Windows CTA — Store first; Mac is never claimed here. */
export const CUSTODYNOTE_MICROSOFT_STORE_CTA =
  'Get Custody Note on Microsoft Store (Windows UK)';

export const CUSTODYNOTE_PRICE_GBP = '9.99';
export const CUSTODYNOTE_FREE_LABEL = 'Free during beta';
/**
 * Cross-promo line for FOOTER_NETWORK_LINKS / OWNED_NETWORK_SITES.
 * Primary path: Microsoft Store (Windows UK). Download is backup (Windows & Mac).
 * Do not imply Mac is on the Store.
 */
export const CUSTODYNOTE_PROMO_PRICE_LINE =
  'Windows via Microsoft Store (UK) · backup download for Windows & Mac · free during beta';
export const CUSTODYNOTE_DOWNLOAD_CTA = 'Download for Windows & Mac';
export const CUSTODYNOTE_BETA_REASON =
  "Custody Note is in beta — that's why it's free while we test with real police station work.";
