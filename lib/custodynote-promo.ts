import { partnerHref } from '@/lib/utm';

export const CUSTODYNOTE_SITE = 'https://custodynote.com';

export function cnHref(campaign: string, path = ''): string {
  const base = path
    ? `${CUSTODYNOTE_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : CUSTODYNOTE_SITE;
  return partnerHref(base, campaign, 'policestationagent');
}

/** Campaign-scoped link to custodynote.com/download (notarised Mac .dmg + Windows Setup). */
export function cnDownloadHref(campaign: string): string {
  return cnHref(campaign, '/download');
}

export const CUSTODYNOTE_DOWNLOAD_HREF = cnDownloadHref('footer');
export const CUSTODYNOTE_TRIAL_HREF = CUSTODYNOTE_DOWNLOAD_HREF;

/**
 * Windows only — LIVE on Microsoft Store (UK). Do not use for Mac.
 * Prefer en-GB / gl=GB so the Store never routes to the US listing.
 */
export const CUSTODYNOTE_MICROSOFT_STORE_ID = '9NFSRVT3T45V';
export const CUSTODYNOTE_MICROSOFT_STORE_HREF =
  'https://apps.microsoft.com/detail/9nfsrvt3t45v?hl=en-GB&gl=GB';
/** Primary Windows CTA — Store first; Mac is never claimed here. */
export const CUSTODYNOTE_MICROSOFT_STORE_CTA = 'Get it on Microsoft Store';

/**
 * Mac CTA — notarised .dmg via custodynote.com/download.
 * Never claim Mac is available on any app store.
 */
export const CUSTODYNOTE_MAC_DOWNLOAD_CTA = 'Download for Mac';
export const CUSTODYNOTE_MAC_DOWNLOAD_HREF = cnDownloadHref('footer');

export const CUSTODYNOTE_PRICE_GBP = '9.99';
export const CUSTODYNOTE_FREE_LABEL = 'Free during beta';
/**
 * Cross-promo line for FOOTER_NETWORK_LINKS / OWNED_NETWORK_SITES.
 * Paired paths: Microsoft Store (Windows UK) + Mac direct download.
 * Backup download remains optional for Windows Setup.exe.
 * Do not imply Mac is on any store.
 */
export const CUSTODYNOTE_PROMO_PRICE_LINE =
  'Windows via Microsoft Store (UK) · Mac via direct download · free during beta';
/** Optional backup — direct Setup.exe / generic Windows & Mac download page. */
export const CUSTODYNOTE_DOWNLOAD_CTA = 'Backup download (Windows & Mac)';
export const CUSTODYNOTE_BETA_REASON =
  "Custody Note is in beta — that's why it's free while we test with real police station work.";
export const CUSTODYNOTE_STORE_WINDOWS_NOTE =
  'Microsoft Store is Windows only (UK). Mac uses the direct download — not on any store.';
