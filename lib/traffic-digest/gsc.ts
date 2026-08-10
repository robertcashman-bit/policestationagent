import { getGoogleAccessToken } from '@/lib/google/service-account-token';

export type GscQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscPageRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscReport = {
  totalClicks: number;
  totalImpressions: number;
  topQueries: GscQueryRow[];
  topPages: GscPageRow[];
  error?: string;
};

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

async function queryGsc(
  siteUrl: string,
  body: Record<string, unknown>,
): Promise<{ rows?: { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }[] } | null> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly']);
  if (!token) return null;

  const encodedSite = encodeURIComponent(siteUrl);
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC API ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

export async function fetchGscReport(siteUrl: string, days = 7): Promise<GscReport> {
  const startDate = isoDaysAgo(days);
  const endDate = isoDaysAgo(1);

  try {
    const [queries, pages, totals] = await Promise.all([
      queryGsc(siteUrl, {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 15,
        dataState: 'final',
      }),
      queryGsc(siteUrl, {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 15,
        dataState: 'final',
      }),
      queryGsc(siteUrl, {
        startDate,
        endDate,
        rowLimit: 1,
        dataState: 'final',
      }),
    ]);

    if (!queries && !pages && !totals) {
      return {
        totalClicks: 0,
        totalImpressions: 0,
        topQueries: [],
        topPages: [],
        error: 'GSC not configured (set GOOGLE_SERVICE_ACCOUNT_JSON + GSC_SITE_URL)',
      };
    }

    const totalRow = totals?.rows?.[0];
    const topQueries: GscQueryRow[] = (queries?.rows ?? []).map((r) => ({
      query: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));
    const topPages: GscPageRow[] = (pages?.rows ?? []).map((r) => ({
      page: r.keys?.[0] ?? '',
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));

    return {
      totalClicks: totalRow?.clicks ?? 0,
      totalImpressions: totalRow?.impressions ?? 0,
      topQueries,
      topPages,
    };
  } catch (e) {
    return {
      totalClicks: 0,
      totalImpressions: 0,
      topQueries: [],
      topPages: [],
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/** Submit sitemap via Search Console API (preferred over deprecated ping). */
export async function submitGscSitemap(siteUrl: string, sitemapUrl: string): Promise<{ ok: boolean; error?: string }> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters']);
  if (!token) return { ok: false, error: 'Google service account not configured' };

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
    return { ok: false, error: `GSC sitemap submit ${res.status}: ${text.slice(0, 200)}` };
  }
  return { ok: true };
}
