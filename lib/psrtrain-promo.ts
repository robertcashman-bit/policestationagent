import { partnerHref } from '@/lib/utm';

export const PSRTRAIN_SITE = 'https://www.psrtrain.com';

export function psrTrainHref(campaign: string, path = ''): string {
  const base = path
    ? `${PSRTRAIN_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : PSRTRAIN_SITE;
  return partnerHref(base, campaign, 'policestationagent');
}

export const PSRTRAIN_HOME_HREF = psrTrainHref('footer');
export const PSRTRAIN_CIT_HREF = psrTrainHref('footer', '/guides/cit-prep');
