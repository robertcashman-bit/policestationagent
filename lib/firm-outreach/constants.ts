import { createOutreachEnvHelpers } from '@robertcashman/firm-outreach-core';

export { FIRM_OUTREACH_UA, FIRM_OUTREACH_CAMPAIGN_ID } from './site-config';

export {
  COMPETITOR_KEYWORDS,
  CONTACT_PATHS,
  CRIMINAL_KEYWORDS,
  EXCLUDED_FIRM_PATTERNS,
  FREE_EMAIL_DOMAINS,
  NON_EW_POSTCODE_PREFIXES,
  PREFERRED_EMAIL_LOCALS,
  REJECTED_EMAIL_LOCALS,
} from '@robertcashman/firm-outreach-core';

const env = createOutreachEnvHelpers({
  countyAllowlist: null,
  cronEnrichBatch: 60,
  // Soft daily cap is off by default (unset/0); Resend budget still binds.
  cronSendBatch: 50,
  enrichMaxMs: 270_000,
  paidDailyCap: 150,
});

export const outreachEnabled = env.outreachEnabled;
export const outreachSendEnabled = env.outreachSendEnabled;
export const outreachPaused = env.outreachPaused;
export const outreachRequireApproval = env.outreachRequireApproval;
export const isDailySendCapUnlimited = (cap: number): boolean =>
  cap >= Number.MAX_SAFE_INTEGER;

/**
 * Soft outreach daily cap (UTC day).
 * Unset / 0 / off / unlimited = no soft cap. Legacy free-tier values (≤100,
 * including production leftovers like 45) are treated as unlimited so they
 * cannot throttle the ready queue. Set an explicit value above 100 to restore
 * a throttle. Resend budget still binds via getGlobalResendQuotaRemaining.
 */
export function dailySendCap(): number {
  const raw = process.env.FIRM_OUTREACH_DAILY_CAP?.trim();
  if (
    raw === undefined ||
    raw === '' ||
    raw === '0' ||
    ['off', 'none', 'unlimited', 'false', 'no'].includes(raw.toLowerCase())
  ) {
    return Number.MAX_SAFE_INTEGER;
  }
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return Number.MAX_SAFE_INTEGER;
  // Old Resend free-tier headroom (45/95/100) was blocking the ready queue.
  if (n <= 100) return Number.MAX_SAFE_INTEGER;
  return Math.floor(n);
}
export const enrichBatchSize = env.enrichBatchSize;
export const cronEnrichBatchSize = env.cronEnrichBatchSize;
export const cronSendBatchSize = env.cronSendBatchSize;
export const enrichMaxElapsedMs = env.enrichMaxElapsedMs;
export const paidDailyCap = env.paidDailyCap;
export const countyAllowlist = env.countyAllowlist;
