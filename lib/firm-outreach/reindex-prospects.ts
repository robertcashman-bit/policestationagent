/**
 * Rebuild prospect status indexes in KV.
 * npx tsx scripts/firm-outreach-reindex.ts
 */
import { getKV } from '@/lib/kv';
import type { FirmProspectStatus } from './types';
import { getProspectsByIds, listAllProspectIds } from './storage';

const PROSPECT_STATUS_INDEX = 'firmprospect:status:';

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

export async function reindexProspectStatuses(): Promise<{
  scanned: number;
  byStatus: Record<string, number>;
}> {
  const kv = getKV();
  if (!kv) throw new Error('KV not configured');

  const byStatus: Record<string, number> = {};
  for (const s of ALL_STATUSES) {
    byStatus[s] = 0;
  }

  const ids = await listAllProspectIds();
  const buckets = new Map<FirmProspectStatus, string[]>();
  for (const s of ALL_STATUSES) {
    buckets.set(s, []);
  }

  const prospects = await getProspectsByIds(ids);
  for (const id of ids) {
    const p = prospects.get(id);
    if (!p) continue;
    const bucket = buckets.get(p.status);
    if (bucket) bucket.push(id);
    byStatus[p.status] = (byStatus[p.status] ?? 0) + 1;
  }

  const bucketTotal = [...buckets.values()].reduce((sum, bucket) => sum + bucket.length, 0);
  assertSafeReindexWrite(ids, byStatus, bucketTotal);

  await Promise.all(
    ALL_STATUSES.map((status) => kv.set(statusIndexKey(status), buckets.get(status) ?? [])),
  );

  return { scanned: ids.length, byStatus };
}
