/**
 * Rebuild prospect indexes as Redis SETs (shared-KV compatible with RepUK).
 * Uses SCAN so orphaned records survive master-index wipes.
 * Supports chunked passes for Vercel maxDuration limits.
 */
import { addToIndexSet } from '@/lib/kv-atomic';
import { getKV } from '@/lib/kv';
import { isActiveCampaignProspect } from './campaign-scope';
import { scanKeys } from './kv-scan';
import type { FirmProspect, FirmProspectStatus } from './types';
import {
  getProspect,
  getProspectsByIds,
  listAllProspectIds,
  listProspectIdsByStatus,
  writeProspectCountsCache,
} from './storage';

const PROSPECT_INDEX = 'firmprospect:index';
const PROSPECT_STATUS_INDEX = 'firmprospect:status:';
const PROSPECT_FIRM_INDEX = 'firmprospect:firm:';
const PROSPECT_PREFIX = 'firmprospect:';
const REINDEX_CURSOR_KEY = 'firmoutreach:reindex:scan_cursor';
const REINDEX_COUNTS_KEY = 'firmoutreach:reindex:partial_counts';

function statusIndexKey(status: FirmProspectStatus): string {
  return `${PROSPECT_STATUS_INDEX}${status}`;
}

const ALL_STATUSES: FirmProspectStatus[] = [
  'discovered',
  'enriching',
  'enriched',
  'ready_to_send',
  'sent',
  'bounced',
  'unsubscribed',
  'joined_whatsapp',
  'excluded',
  'no_email',
];

export class ReindexSafetyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReindexSafetyError';
  }
}

/** Refuse to overwrite indexes when rebuild data is clearly invalid. */
export function assertSafeReindexWrite(
  masterIds: string[],
  byStatus: Record<string, number>,
  bucketTotal: number,
): void {
  const recordsFound = Object.values(byStatus).reduce((sum, n) => sum + n, 0);
  if (masterIds.length > 0 && recordsFound === 0) {
    throw new ReindexSafetyError(
      `reindex refused: ${masterIds.length} prospect ids but 0 records loaded from KV`,
    );
  }
  if (masterIds.length > 0 && bucketTotal === 0) {
    throw new ReindexSafetyError('reindex refused: would write empty status indexes');
  }
}

function isProspectDocumentKey(key: string): boolean {
  if (!key.startsWith(PROSPECT_PREFIX)) return false;
  const rest = key.slice(PROSPECT_PREFIX.length);
  if (!rest || rest.includes(':')) return false;
  if (rest === 'index') return false;
  return true;
}

function emptyStatusCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const s of ALL_STATUSES) counts[s] = 0;
  return counts;
}

async function collectProspectIds(): Promise<string[]> {
  const ids = new Set<string>();

  for (const id of await listAllProspectIds()) ids.add(id);

  for (const status of ALL_STATUSES) {
    for (const id of await listProspectIdsByStatus(status)) ids.add(id);
  }

  // Full DB walk recovers after JSON-array code wiped Redis SET indexes.
  for (const key of await scanKeys('firmprospect:fop_*', { count: 500, maxIterations: 500 })) {
    if (!isProspectDocumentKey(key)) continue;
    ids.add(key.slice(PROSPECT_PREFIX.length));
  }

  return [...ids];
}

async function rewriteSet(key: string, members: string[]): Promise<void> {
  const kv = getKV();
  if (!kv) throw new Error('KV not configured');
  try {
    await kv.del(key);
  } catch {
    /* ignore */
  }
  if (members.length === 0) return;
  const BATCH = 200;
  for (let i = 0; i < members.length; i += BATCH) {
    const chunk = members.slice(i, i + BATCH);
    if (typeof kv.pipeline === 'function' && typeof kv.sadd === 'function') {
      const pipeline = kv.pipeline();
      for (const member of chunk) pipeline.sadd(key, member);
      await pipeline.exec();
    } else if (typeof kv.sadd === 'function') {
      for (const member of chunk) await kv.sadd(key, member);
    } else {
      await kv.set(key, chunk);
    }
  }
}

async function indexProspectRecord(p: FirmProspect): Promise<void> {
  // Use addToIndexSet so legacy JSON-array keys (from the old WRONGTYPE wipe path)
  // are migrated to Redis SETs instead of throwing WRONGTYPE on SADD.
  await addToIndexSet(PROSPECT_INDEX, p.id);
  await addToIndexSet(statusIndexKey(p.status), p.id);
  if (p.firmKey) {
    await addToIndexSet(PROSPECT_FIRM_INDEX + p.firmKey, p.id);
  }
}

type ScanResult = [string | number, string[]] | { cursor: string | number; keys: string[] };

function normalizeScanResult(result: ScanResult): { cursor: string; keys: string[] } {
  if (Array.isArray(result)) {
    return {
      cursor: String(result[0] ?? '0'),
      keys: Array.isArray(result[1]) ? result[1].map(String) : [],
    };
  }
  return {
    cursor: String(result?.cursor ?? '0'),
    keys: Array.isArray(result?.keys) ? result.keys.map(String) : [],
  };
}

/**
 * One time-bounded SCAN pass: find prospect docs and SADD them into SET indexes.
 * Call repeatedly until `done` — safe under Vercel 300s limits.
 */
export async function reindexProspectStatusesChunk(opts?: {
  maxElapsedMs?: number;
  maxKeys?: number;
  reset?: boolean;
}): Promise<{
  done: boolean;
  keysProcessed: number;
  scanCursor: string;
  byStatus: Record<string, number>;
  activeByStatus: Record<string, number>;
  scanned: number;
  indexSize: number;
  firmIndexes: number;
}> {
  const kv = getKV();
  if (!kv || typeof kv.scan !== 'function') {
    // No SCAN — fall back to full rebuild (tests / limited clients).
    const full = await reindexProspectStatuses();
    return { done: true, keysProcessed: full.scanned, scanCursor: '0', ...full };
  }

  const maxElapsedMs = opts?.maxElapsedMs ?? 45_000;
  const maxKeys = opts?.maxKeys ?? 400;
  const deadline = Date.now() + maxElapsedMs;

  if (opts?.reset) {
    await kv.del(REINDEX_CURSOR_KEY);
    await kv.del(REINDEX_COUNTS_KEY);
  }

  let cursor = String((await kv.get<string>(REINDEX_CURSOR_KEY)) ?? '0');
  const partial =
    (await kv.get<{ byStatus: Record<string, number>; activeByStatus: Record<string, number> }>(
      REINDEX_COUNTS_KEY,
    )) ?? { byStatus: emptyStatusCounts(), activeByStatus: emptyStatusCounts() };

  let keysProcessed = 0;
  let iterations = 0;

  while (Date.now() < deadline && keysProcessed < maxKeys && iterations < 80) {
    iterations++;
    const result = (await kv.scan(cursor, {
      match: 'firmprospect:fop_*',
      count: 200,
    })) as ScanResult;
    const { cursor: next, keys } = normalizeScanResult(result);
    cursor = next;

    const ids = keys.filter(isProspectDocumentKey).map((k) => k.slice(PROSPECT_PREFIX.length));
    if (ids.length > 0) {
      const prospects = await getProspectsByIds(ids);
      for (const id of ids) {
        const p = prospects.get(id);
        if (!p) continue;
        await indexProspectRecord(p);
        partial.byStatus[p.status] = (partial.byStatus[p.status] ?? 0) + 1;
        if (isActiveCampaignProspect(p)) {
          partial.activeByStatus[p.status] = (partial.activeByStatus[p.status] ?? 0) + 1;
        }
        keysProcessed++;
      }
    }

    await kv.set(REINDEX_CURSOR_KEY, cursor);
    await kv.set(REINDEX_COUNTS_KEY, partial);

    if (cursor === '0') break;
  }

  const done = cursor === '0';
  if (done) {
    await writeProspectCountsCache({
      counts: partial.activeByStatus,
      masterIndexCount: Object.values(partial.byStatus).reduce((s, n) => s + (n || 0), 0),
      computedAt: new Date().toISOString(),
    });
    await kv.del(REINDEX_CURSOR_KEY);
    await kv.del(REINDEX_COUNTS_KEY);
  }

  const scanned = Object.values(partial.byStatus).reduce((s, n) => s + (n || 0), 0);
  return {
    done,
    keysProcessed,
    scanCursor: cursor,
    byStatus: partial.byStatus,
    activeByStatus: partial.activeByStatus,
    scanned,
    indexSize: scanned,
    firmIndexes: 0,
  };
}

export async function reindexProspectStatuses(): Promise<{
  scanned: number;
  byStatus: Record<string, number>;
  activeByStatus: Record<string, number>;
  indexSize: number;
  firmIndexes: number;
}> {
  const kv = getKV();
  if (!kv) throw new Error('KV not configured');

  const ids = await collectProspectIds();
  const byStatus: Record<string, number> = emptyStatusCounts();
  const activeByStatus: Record<string, number> = emptyStatusCounts();

  const statusMembers: Record<string, string[]> = {};
  for (const s of ALL_STATUSES) statusMembers[s] = [];

  const firmMembers = new Map<string, string[]>();
  const validIds: string[] = [];

  const prospects = await getProspectsByIds(ids);
  for (const id of ids) {
    const p = prospects.get(id) ?? (await getProspect(id));
    if (!p) continue;
    validIds.push(id);
    const status = p.status;
    if (!statusMembers[status]) statusMembers[status] = [];
    statusMembers[status].push(id);
    byStatus[status] = (byStatus[status] ?? 0) + 1;
    if (isActiveCampaignProspect(p)) {
      activeByStatus[status] = (activeByStatus[status] ?? 0) + 1;
    }

    if (p.firmKey) {
      const firmKey = PROSPECT_FIRM_INDEX + p.firmKey;
      const list = firmMembers.get(firmKey) ?? [];
      list.push(id);
      firmMembers.set(firmKey, list);
    }
  }

  const bucketTotal = Object.values(statusMembers).reduce((sum, m) => sum + m.length, 0);
  assertSafeReindexWrite(ids, byStatus, bucketTotal);

  await rewriteSet(PROSPECT_INDEX, validIds);
  for (const status of ALL_STATUSES) {
    await rewriteSet(statusIndexKey(status), statusMembers[status] ?? []);
  }

  let firmIndexes = 0;
  for (const [key, members] of firmMembers) {
    await rewriteSet(key, members);
    firmIndexes++;
  }

  await writeProspectCountsCache({
    counts: activeByStatus,
    masterIndexCount: validIds.length,
    computedAt: new Date().toISOString(),
  });

  return {
    scanned: validIds.length,
    byStatus,
    activeByStatus,
    indexSize: validIds.length,
    firmIndexes,
  };
}
