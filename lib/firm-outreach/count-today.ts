import { Redis } from '@upstash/redis';
import { appendFileSync } from 'fs';
import type { FirmOutreachSend } from './types';

/**
 * Count outreach emails sent "today" across our sending domains.
 *
 * Outbound outreach emails are logged as FirmOutreachSend records in each
 * site's Upstash Redis (KV) store. Indexes are Redis SETs (`firmoutreach:send:index`)
 * after the shared-KV migration; legacy JSON arrays are still supported.
 *
 * Each send record carries a `campaignId`. PSA and REPUK share one Upstash
 * instance but use different campaigns (`agent_cover_kent_v1` vs
 * `whatsapp_invite_v1`), so callers must pass campaignId on each source.
 */

const SEND_INDEX = 'firmoutreach:send:index';
const SEND_PREFIX = 'firmoutreach:send:';
const MGET_CHUNK = 64;
const SCAN_COUNT = 200;
const SCAN_MAX_LOOPS = 80;

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

// #region agent log
function debugLog(
  hypothesisId: string,
  location: string,
  message: string,
  data: Record<string, unknown>,
): void {
  const payload = {
    sessionId: '610743',
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  fetch('http://127.0.0.1:7678/ingest/67d374d4-9332-4432-8909-cec328e5e44c', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '610743' },
    body: JSON.stringify(payload),
  }).catch(() => {});
  try {
    appendFileSync(
      '/Users/robertcashman/Policestationrepuk/.cursor/debug-610743.log',
      `${JSON.stringify(payload)}\n`,
    );
  } catch {
    /* ignore */
  }
}
// #endregion

/** Load send IDs from Redis SET (preferred) or legacy JSON array. */
export async function loadSendIndexIds(redis: Redis): Promise<{
  ids: string[];
  source: 'smembers' | 'json-array' | 'empty';
}> {
  try {
    const members = await redis.smembers(SEND_INDEX);
    if (Array.isArray(members) && members.length > 0) {
      return { ids: members.map(String), source: 'smembers' };
    }
  } catch {
    // Key may be a JSON string — fall through.
  }

  try {
    const legacy = await redis.get<unknown>(SEND_INDEX);
    if (Array.isArray(legacy) && legacy.length > 0) {
      return {
        ids: legacy.filter((x): x is string => typeof x === 'string'),
        source: 'json-array',
      };
    }
  } catch {
    // WRONGTYPE on GET when key is a SET — already tried smembers.
  }

  return { ids: [], source: 'empty' };
}

function toSentRecord(
  domain: string,
  send: FirmOutreachSend,
): OutreachSentRecord {
  return {
    domain,
    sentAt: send.sentAt!,
    firmName: send.firmName,
    email: send.email,
    sequenceStep: send.sequenceStep,
    subject: send.subject,
  };
}

async function fetchSentFromIds(
  redis: Redis,
  source: OutreachDomainSource,
  ids: string[],
  start: number,
  end: number,
): Promise<OutreachSentRecord[]> {
  const out: OutreachSentRecord[] = [];
  for (let i = 0; i < ids.length; i += MGET_CHUNK) {
    const keys = ids.slice(i, i + MGET_CHUNK).map((id) => `${SEND_PREFIX}${id}`);
    const sends = await redis.mget<(FirmOutreachSend | null)[]>(...keys);
    for (const send of sends) {
      if (!send?.sentAt) continue;
      const t = Date.parse(send.sentAt);
      if (!Number.isFinite(t) || t < start || t > end) continue;
      if (source.campaignId && send.campaignId !== source.campaignId) continue;
      out.push(toSentRecord(source.domain, send));
    }
  }
  out.sort((a, b) => a.sentAt.localeCompare(b.sentAt));
  return out;
}

/** SCAN fallback when the send index is empty/corrupt but fos_* records exist. */
async function scanSentInWindow(
  redis: Redis,
  source: OutreachDomainSource,
  start: number,
  end: number,
): Promise<OutreachSentRecord[]> {
  const out: OutreachSentRecord[] = [];
  let cursor: string | number = '0';
  for (let loop = 0; loop < SCAN_MAX_LOOPS; loop++) {
    const result = (await redis.scan(cursor, {
      match: `${SEND_PREFIX}fos_*`,
      count: SCAN_COUNT,
    })) as [string | number, string[]] | { cursor: string | number; keys: string[] };

    const nextCursor = Array.isArray(result) ? result[0] : result.cursor;
    const keys = Array.isArray(result) ? result[1] : result.keys;
    cursor = nextCursor;

    const fosKeys = (keys ?? []).filter((k) => String(k).includes(':fos_'));
    for (let i = 0; i < fosKeys.length; i += MGET_CHUNK) {
      const chunk = fosKeys.slice(i, i + MGET_CHUNK);
      const sends = await redis.mget<(FirmOutreachSend | null)[]>(...chunk);
      for (const send of sends) {
        if (!send?.sentAt) continue;
        const t = Date.parse(send.sentAt);
        if (!Number.isFinite(t) || t < start || t > end) continue;
        if (source.campaignId && send.campaignId !== source.campaignId) continue;
        out.push(toSentRecord(source.domain, send));
      }
    }

    if (String(cursor) === '0') break;
  }
  out.sort((a, b) => a.sentAt.localeCompare(b.sentAt));
  return out;
}

/** Fetch send records for one KV store whose `sentAt` falls within the window. */
async function fetchSentInWindow(
  source: OutreachDomainSource,
  start: number,
  end: number,
): Promise<OutreachSentRecord[]> {
  if (!source.url || !source.token) return [];
  const redis = new Redis({ url: source.url, token: source.token });

  const { ids, source: indexSource } = await loadSendIndexIds(redis);
  // #region agent log
  debugLog('B', 'count-today.ts:fetchSentInWindow', 'send index load', {
    domain: source.domain,
    campaignId: source.campaignId ?? null,
    indexSource,
    indexIdCount: ids.length,
  });
  // #endregion

  let out =
    ids.length > 0
      ? await fetchSentFromIds(redis, source, ids, start, end)
      : await scanSentInWindow(redis, source, start, end);

  // #region agent log
  debugLog('B', 'count-today.ts:fetchSentInWindow', 'sent-in-window result', {
    domain: source.domain,
    campaignId: source.campaignId ?? null,
    usedScanFallback: ids.length === 0,
    sentCount: out.length,
  });
  // #endregion

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
