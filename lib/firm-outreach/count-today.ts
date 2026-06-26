import { Redis } from '@upstash/redis';
import type { FirmOutreachSend } from './types';

/**
 * Count outreach emails sent "today" across our sending domains.
 *
 * Outbound outreach emails are logged as FirmOutreachSend records in each
 * site's Upstash Redis (KV) store: an index array at `firmoutreach:send:index`
 * plus one record per send at `firmoutreach:send:<id>` carrying a `sentAt`
 * ISO-8601 (UTC) timestamp. These records are the outreach emails to firms —
 * owner approval / digest / confirmation emails are not in this index.
 *
 * Each send record carries a `campaignId`. PSA and REPUK share one Upstash
 * instance but use different campaigns (`agent_cover_kent_v1` vs
 * `whatsapp_invite_v1`), so callers must pass campaignId on each source.
 */

const SEND_INDEX = 'firmoutreach:send:index';
const SEND_PREFIX = 'firmoutreach:send:';
const MGET_CHUNK = 64;

export interface OutreachDomainSource {
  /** Sending domain, e.g. "policestationagent.com". */
  domain: string;
  /** Upstash Redis REST URL for that domain's KV store. */
  url: string;
  /** Upstash Redis REST token for that domain's KV store. */
  token: string;
  /** Firm-outreach campaign id — required when multiple campaigns share one KV store. */
  campaignId?: string;
}

export interface OutreachTodayCount {
  /** UTC calendar day used as the window (YYYY-MM-DD). */
  date: string;
  timezone: 'UTC';
  /** Emails sent today per domain. */
  perDomain: Record<string, number>;
  /** Sum across all domains. */
  combined: number;
}

/** One outreach email sent today (for listing "what was sent"). */
export interface OutreachSentRecord {
  domain: string;
  sentAt: string;
  firmName: string;
  email: string;
  sequenceStep: number;
  subject: string;
}

/** Start/end epoch ms for the UTC calendar day containing `now`. */
function utcDayWindow(now: Date): { date: string; start: number; end: number } {
  const date = now.toISOString().slice(0, 10);
  return {
    date,
    start: Date.parse(`${date}T00:00:00.000Z`),
    end: Date.parse(`${date}T23:59:59.999Z`),
  };
}

/** Fetch send records for one KV store whose `sentAt` falls within the window. */
async function fetchSentInWindow(
  source: OutreachDomainSource,
  start: number,
  end: number,
): Promise<OutreachSentRecord[]> {
  if (!source.url || !source.token) return [];
  const redis = new Redis({ url: source.url, token: source.token });
  const ids = (await redis.get<string[]>(SEND_INDEX)) ?? [];
  if (ids.length === 0) return [];

  const out: OutreachSentRecord[] = [];
  for (let i = 0; i < ids.length; i += MGET_CHUNK) {
    const keys = ids.slice(i, i + MGET_CHUNK).map((id) => `${SEND_PREFIX}${id}`);
    const sends = await redis.mget<(FirmOutreachSend | null)[]>(...keys);
    for (const send of sends) {
      // Only include emails that were actually sent (sentAt is set on send),
      // not records still queued for approval.
      if (!send?.sentAt) continue;
      const t = Date.parse(send.sentAt);
      if (!Number.isFinite(t) || t < start || t > end) continue;
      if (source.campaignId && send.campaignId !== source.campaignId) continue;
      out.push({
        domain: source.domain,
        sentAt: send.sentAt,
        firmName: send.firmName,
        email: send.email,
        sequenceStep: send.sequenceStep,
        subject: send.subject,
      });
    }
  }
  out.sort((a, b) => a.sentAt.localeCompare(b.sentAt));
  return out;
}

/**
 * List the outreach emails sent today for one KV-backed domain.
 *
 * @param source KV source (domain + url + token).
 * @param now Reference time (defaults to now); window is its UTC calendar day.
 */
export async function listOutreachSentToday(
  source: OutreachDomainSource,
  now: Date = new Date(),
): Promise<OutreachSentRecord[]> {
  const { start, end } = utcDayWindow(now);
  return fetchSentInWindow(source, start, end);
}

/**
 * Count outreach emails sent today, per domain and combined.
 *
 * @param sources One KV source per sending domain. A source with a missing
 *   url/token is reported as 0 (so a misconfigured domain never throws).
 * @param now Reference time (defaults to current time); the window is the
 *   UTC calendar day containing it.
 */
export async function countOutreachEmailsToday(
  sources: OutreachDomainSource[],
  now: Date = new Date(),
): Promise<OutreachTodayCount> {
  const { date, start, end } = utcDayWindow(now);
  const perDomain: Record<string, number> = {};

  for (const source of sources) {
    const records = await fetchSentInWindow(source, start, end);
    perDomain[source.domain] = records.length;
  }

  const combined = Object.values(perDomain).reduce((sum, n) => sum + n, 0);
  return { date, timezone: 'UTC', perDomain, combined };
}
