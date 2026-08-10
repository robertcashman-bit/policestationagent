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
  enrichMaxMs: 270_000,
  paidDailyCap: 100,
  /**
   * Default when FIRM_OUTREACH_DAILY_CAP is unset.
   * Legacy free-tier values (≤100) are treated as uncapped — set an explicit
   * value above 100 to restore a throttle, or `0` for fully uncapped.
   */
  dailyCap: 5_000,
});

export const outreachEnabled = env.outreachEnabled;
export const outreachSendEnabled = env.outreachSendEnabled;
export const outreachPaused = env.outreachPaused;
export const outreachRequireApproval = env.outreachRequireApproval;

/** Daily outreach send ceiling (UTC day). Legacy caps ≤100 are ignored. */
export function dailySendCap(): number {
  const raw = process.env.FIRM_OUTREACH_DAILY_CAP?.trim();
  if (raw === '0') return 1_000_000;
  const n = Number(raw ?? 5_000);
  if (!Number.isFinite(n) || n <= 0) return 5_000;
  // Old Resend free-tier headroom (45/95/100) was blocking the ready queue.
  if (n <= 100) return 5_000;
  return n;
}
export const enrichBatchSize = env.enrichBatchSize;
export const cronEnrichBatchSize = env.cronEnrichBatchSize;
export const enrichMaxElapsedMs = env.enrichMaxElapsedMs;
export const paidDailyCap = env.paidDailyCap;
export const countyAllowlist = env.countyAllowlist;
