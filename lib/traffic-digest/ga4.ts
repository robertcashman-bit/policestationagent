import { getGoogleAccessToken } from '@/lib/google/service-account-token';

export type Ga4Report = {
  sessions: number;
  organicSessions: number;
  bufferSessions: number;
  partnerClicks: number;
  topPages: { path: string; sessions: number }[];
  error?: string;
};

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

async function runGa4Report(
  propertyId: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/analytics.readonly']);
  if (!token) return null;

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
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
    throw new Error(`GA4 API ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

function parseMetricRow(
  data: Record<string, unknown>,
  dimensionIndex = 0,
): { dimension: string; value: number }[] {
  const rows = (data.rows as { dimensionValues?: { value?: string }[]; metricValues?: { value?: string }[] }[]) ?? [];
  return rows.map((row) => ({
    dimension: row.dimensionValues?.[dimensionIndex]?.value ?? '',
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

function sumMetric(data: Record<string, unknown>): number {
  const rows = (data.rows as { metricValues?: { value?: string }[] }[]) ?? [];
  return rows.reduce((sum, row) => sum + Number(row.metricValues?.[0]?.value ?? 0), 0);
}

export async function fetchGa4Report(propertyId: string, days = 7): Promise<Ga4Report> {
  if (!propertyId) {
    return {
      sessions: 0,
      organicSessions: 0,
      bufferSessions: 0,
      partnerClicks: 0,
      topPages: [],
      error: 'GA4 not configured (set GA4_PROPERTY_ID + GOOGLE_SERVICE_ACCOUNT_JSON)',
    };
  }

  const startDate = isoDaysAgo(days);
  const endDate = isoDaysAgo(1);

  try {
    const [sessionsReport, channelReport, bufferReport, partnerReport, pagesReport] = await Promise.all([
      runGa4Report(propertyId, {
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'sessions' }],
      }),
      runGa4Report(propertyId, {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
      }),
      runGa4Report(propertyId, {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionSource',
            stringFilter: { matchType: 'EXACT', value: 'buffer' },
          },
        },
      }),
      runGa4Report(propertyId, {
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: { matchType: 'EXACT', value: 'outbound_partner_click' },
          },
        },
      }),
      runGa4Report(propertyId, {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
    ]);

    if (!sessionsReport) {
      return {
        sessions: 0,
        organicSessions: 0,
        bufferSessions: 0,
        partnerClicks: 0,
        topPages: [],
        error: 'GA4 not configured (set GOOGLE_SERVICE_ACCOUNT_JSON with analytics.readonly)',
      };
    }

    const channels = parseMetricRow(channelReport ?? {});
    const organicSessions =
      channels.find((c) => c.dimension === 'Organic Search')?.value ??
      channels.find((c) => c.dimension.toLowerCase().includes('organic'))?.value ??
      0;

    return {
      sessions: sumMetric(sessionsReport),
      organicSessions,
      bufferSessions: sumMetric(bufferReport ?? {}),
      partnerClicks: sumMetric(partnerReport ?? {}),
      topPages: parseMetricRow(pagesReport ?? {}).map((r) => ({
        path: r.dimension,
        sessions: r.value,
      })),
    };
  } catch (e) {
    return {
      sessions: 0,
      organicSessions: 0,
      bufferSessions: 0,
      partnerClicks: 0,
      topPages: [],
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
