import { createSign } from 'node:crypto';

function base64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function getGoogleAccessToken(serviceAccountJson, scopes) {
  const sa = JSON.parse(serviceAccountJson);
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
  const data = await res.json();
  return data.access_token ?? null;
}

export async function submitGscSitemap(siteUrl, sitemapUrl, serviceAccountJson) {
  const token = await getGoogleAccessToken(serviceAccountJson, [
    'https://www.googleapis.com/auth/webmasters',
  ]);
  if (!token) return { ok: false, error: 'Could not obtain Google access token' };

  const encodedSite = encodeURIComponent(siteUrl);
  const feedpath = encodeURIComponent(sitemapUrl.replace(/^https?:\/\/[^/]+/, ''));
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps/${feedpath}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: `${res.status}: ${text.slice(0, 200)}` };
  }
  return { ok: true };
}
