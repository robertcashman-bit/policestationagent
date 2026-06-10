import { partnerHref } from '@/lib/utm';

export const REPUK_SITE = 'https://policestationrepuk.org';

export function repukHref(campaign: string, path = ''): string {
  const base = path
    ? `${REPUK_SITE}${path.startsWith('/') ? path : `/${path}`}`
    : REPUK_SITE;
  return partnerHref(base, campaign, 'policestationagent');
}

export const REPUK_DIRECTORY_KENT_HREF = repukHref('footer', '/directory/kent');
export const REPUK_DIRECTORY_HREF = repukHref('footer', '/directory');
