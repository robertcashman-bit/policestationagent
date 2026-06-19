/**
 * Rebuild prospect status indexes after a saveProspect indexing bug.
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

  await Promise.all(
    ALL_STATUSES.map((status) => kv.set(statusIndexKey(status), buckets.get(status) ?? [])),
  );

  return { scanned: ids.length, byStatus };
}
