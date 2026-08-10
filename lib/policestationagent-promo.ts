import { partnerHref } from '@/lib/utm';

export const PSA_SITE = 'https://www.policestationagent.com';

export function psaHref(campaign: string, path = ''): string {
  const base = path
    ? `${PSA_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : PSA_SITE;
  return partnerHref(base, campaign, 'psrtrain');
}

export const PSA_HOME_HREF = psaHref('footer');

export const PSA_PROMO_HEADLINE = 'Police Station Agent — Kent solicitor cover';
export const PSA_PROMO_BODY =
  'Criminal defence practice tools and guides from Defence Legal Services — built for police station work.';
