import { expect, test } from 'vitest';
import { getTrafficDigestConfig } from '../../lib/traffic-digest/config.ts';
import { buildDigestText } from '../../lib/traffic-digest/email.ts';

test('traffic digest config has defaults', () => {
  const cfg = getTrafficDigestConfig();
  expect(cfg.emailTo.includes('@')).toBeTruthy();
  expect(cfg.siteUrl).toBe('https://psrtrain.com');
});

test('buildDigestText formats summary', () => {
  const text = buildDigestText({
    gsc: { totalClicks: 5, totalImpressions: 100, topQueries: [], topPages: [] },
    ga4: { sessions: 20, organicSessions: 8, bufferSessions: 1, partnerClicks: 2, topPages: [] },
    indexableUrls: 75,
    emailSent: false,
  });
  expect(text).toMatch(/GSC clicks: 5/);
  expect(text).toMatch(/GA4 sessions: 20/);
});
