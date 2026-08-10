import { cleanEnvValue } from '@/lib/env';

export function getTrafficDigestConfig() {
  return {
    emailTo:
      cleanEnvValue(process.env.TRAFFIC_DIGEST_EMAIL_TO) ||
      cleanEnvValue(process.env.AUDIT_EMAIL_TO) ||
      cleanEnvValue(process.env.CONTACT_EMAIL_TO) ||
      'robertdavidcashman@gmail.com',
    gscSiteUrl:
      cleanEnvValue(process.env.GSC_SITE_URL) || 'sc-domain:psrtrain.com',
    ga4PropertyId: cleanEnvValue(process.env.GA4_PROPERTY_ID),
    siteUrl: cleanEnvValue(process.env.NEXT_PUBLIC_SITE_URL) || 'https://psrtrain.com',
  };
}
