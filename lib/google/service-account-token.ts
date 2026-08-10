import { createSign } from 'node:crypto';
import { cleanEnvValue } from '@/lib/env';

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function parseServiceAccount(raw: string): ServiceAccount | null {
  const trimmed = cleanEnvValue(raw);
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed) as ServiceAccount;
    if (!parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getGoogleServiceAccount(): ServiceAccount | null {
  return parseServiceAccount(process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? '');
}

/** Exchange a service-account JWT for a Google API access token. */
export async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const sa = getGoogleServiceAccount();
  if (!sa) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64Url(
    JSON.stringify({
      iss: sa.client_email,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsigned = `${header}.${payload}`;
  const signature = createSign('RSA-SHA256')
    .update(unsigned)
    .sign(sa.private_key)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}
