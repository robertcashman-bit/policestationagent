import type { PlannedBufferPost } from './types';

/**
 * URL/campaign dedup: a planned post is a duplicate if an already-scheduled
 * Buffer post (for the same channel) contains its dedup marker. This avoids
 * double-posting without needing a separate KV store — Buffer itself is the
 * source of truth for what is already queued.
 */
export function isAlreadyScheduled(
  planned: PlannedBufferPost,
  existingTextsByChannelId: Map<string, string[]>,
): boolean {
  const texts = existingTextsByChannelId.get(planned.channel.id) ?? [];
  return texts.some((t) => t.includes(planned.marker));
}

/** Partition planned posts into to-create vs skipped-duplicate. */
export function partitionPlanned(
  planned: PlannedBufferPost[],
  existingTextsByChannelId: Map<string, string[]>,
): { toCreate: PlannedBufferPost[]; skipped: PlannedBufferPost[] } {
  const toCreate: PlannedBufferPost[] = [];
  const skipped: PlannedBufferPost[] = [];
  // Track markers created within this run so two candidates for the same
  // slug+channel can never both be scheduled.
  const seen = new Set<string>();
  for (const p of planned) {
    const key = `${p.channel.id}::${p.marker}`;
    if (seen.has(key) || isAlreadyScheduled(p, existingTextsByChannelId)) {
      skipped.push(p);
      continue;
    }
    seen.add(key);
    toCreate.push(p);
  }
  return { toCreate, skipped };
}
