import { Resend } from 'resend';
import { cleanEnvValue } from '@/lib/env';
import { getTrafficDigestConfig } from './config';
import type { Ga4Report } from './ga4';
import type { GscReport } from './gsc';

export type TrafficDigestResult = {
  gsc: GscReport;
  ga4: Ga4Report;
  indexableUrls: number;
  emailSent: boolean;
  emailError?: string;
};

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function formatRow(label: string, clicks: number, impressions: number, position: number): string {
  return `  ${label} — ${clicks} clicks, ${impressions} impr, pos ${position.toFixed(1)}`;
}

export async function sendTrafficDigest(result: TrafficDigestResult): Promise<{ sent: boolean; error?: string }> {
  const cfg = getTrafficDigestConfig();
  const apiKey = cleanEnvValue(process.env.RESEND_API_KEY);
  if (!apiKey) return { sent: false, error: 'RESEND_API_KEY not set' };

  const date = new Date().toISOString().slice(0, 10);
  const { gsc, ga4, indexableUrls } = result;

  const lines: string[] = [
    `PSR Train traffic digest — ${date}`,
    `Site: ${cfg.siteUrl}`,
    '',
    '=== Google Search Console (last 7 days) ===',
  ];

  if (gsc.error) {
    lines.push(`  (unavailable: ${gsc.error})`);
  } else {
    lines.push(`  Clicks: ${gsc.totalClicks} | Impressions: ${gsc.totalImpressions}`);
    lines.push('');
    lines.push('Top queries:');
    if (gsc.topQueries.length === 0) lines.push('  (none yet)');
    for (const q of gsc.topQueries.slice(0, 10)) {
      lines.push(formatRow(q.query, q.clicks, q.impressions, q.position));
    }
    lines.push('');
    lines.push('Top pages (GSC):');
    if (gsc.topPages.length === 0) lines.push('  (none yet)');
    for (const p of gsc.topPages.slice(0, 10)) {
      const path = p.page.replace(cfg.siteUrl, '') || '/';
      lines.push(formatRow(path, p.clicks, p.impressions, p.position));
    }
  }

  lines.push('', '=== GA4 (last 7 days) ===');
  if (ga4.error) {
    lines.push(`  (unavailable: ${ga4.error})`);
  } else {
    lines.push(`  Sessions: ${ga4.sessions}`);
    lines.push(`  Organic sessions: ${ga4.organicSessions}`);
    lines.push(`  Buffer (utm_source=buffer): ${ga4.bufferSessions}`);
    lines.push(`  outbound_partner_click events: ${ga4.partnerClicks}`);
    lines.push('');
    lines.push('Top pages (GA4):');
    if (ga4.topPages.length === 0) lines.push('  (none yet)');
    for (const p of ga4.topPages) {
      lines.push(`  ${p.path} — ${p.sessions} sessions`);
    }
  }

  lines.push('', '=== Site inventory ===', `  Indexable URLs (sitemap): ${indexableUrls}`);

  if (gsc.totalImpressions > 0 && gsc.totalClicks > 0) {
    lines.push(`  GSC CTR: ${pct(gsc.totalClicks / gsc.totalImpressions)}`);
  }

  lines.push(
    '',
    'Configure: GOOGLE_SERVICE_ACCOUNT_JSON, GSC_SITE_URL, GA4_PROPERTY_ID, TRAFFIC_DIGEST_EMAIL_TO',
  );

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: 'PSR Train Traffic <noreply@psrtrain.com>',
    to: [cfg.emailTo],
    subject: `[PSR Train Traffic] ${gsc.totalClicks} GSC clicks / ${ga4.sessions} GA4 sessions — ${date}`,
    text: lines.join('\n'),
  });

  if (error) return { sent: false, error: String(error) };
  return { sent: true };
}

export function buildDigestText(result: TrafficDigestResult): string {
  const cfg = getTrafficDigestConfig();
  const { gsc, ga4, indexableUrls } = result;
  return [
    `GSC clicks: ${gsc.totalClicks}, impressions: ${gsc.totalImpressions}`,
    `GA4 sessions: ${ga4.sessions}, organic: ${ga4.organicSessions}`,
    `Indexable URLs: ${indexableUrls}`,
    `Site: ${cfg.siteUrl}`,
  ].join('\n');
}
