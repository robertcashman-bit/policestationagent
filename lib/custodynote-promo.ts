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
export const CUSTODYNOTE_MICROSOFT_STORE_CTA =
  'Get for Windows on Microsoft Store (UK)';

export const CUSTODYNOTE_PRICE_GBP = '9.99';
export const CUSTODYNOTE_FREE_LABEL = 'Free during beta';
/**
 * Cross-promo line for FOOTER_NETWORK_LINKS / OWNED_NETWORK_SITES.
 * Windows: Microsoft Store (UK) + download. Mac: download only.
 */
export const CUSTODYNOTE_PROMO_PRICE_LINE =
  'Windows (Microsoft Store UK + download) · Mac (download) · free during beta';
export const CUSTODYNOTE_DOWNLOAD_CTA = 'Download for Windows & Mac';
export const CUSTODYNOTE_BETA_REASON =
  "Custody Note is in beta — that's why it's free while we test with real police station work.";
