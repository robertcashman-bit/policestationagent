import { Redis } from '@upstash/redis';

export interface CampaignQueueCounts {
  campaignId: string;
  total: number;
  byStatus: Record<string, number>;
}

/** Count prospect records per status for each campaign in shared KV. */
export async function getCampaignQueueCounts(
  redis: Redis,
): Promise<CampaignQueueCounts[]> {
  const ids = (await redis.get<string[]>('firmprospect:index')) ?? [];
  const byCampaign: Record<string, Record<string, number>> = {};

  for (let i = 0; i < ids.length; i += 100) {
    const keys = ids.slice(i, i + 100).map((id) => `firmprospect:${id}`);
    const batch = await redis.mget<( { campaignId?: string; status?: string } | null )[]>(...keys);
    for (const p of batch) {
      if (!p) continue;
      const c = p.campaignId || '(none)';
      const s = p.status || '(none)';
      (byCampaign[c] ??= {});
      byCampaign[c][s] = (byCampaign[c][s] || 0) + 1;
    }
  }

  return Object.entries(byCampaign)
    .map(([campaignId, byStatus]) => ({
      campaignId,
      total: Object.values(byStatus).reduce((sum, n) => sum + n, 0),
      byStatus,
    }))
    .sort((a, b) => b.total - a.total);
}

export function formatQueueCounts(
  counts: CampaignQueueCounts[],
  campaignLabels: Record<string, string>,
): string[] {
  const lines: string[] = ['', '=== Queue health (prospect status by campaign) ==='];
  for (const row of counts) {
    const label = campaignLabels[row.campaignId] ?? row.campaignId;
    lines.push(`\n${label} (${row.campaignId}): ${row.total} prospects`);
    for (const [status, n] of Object.entries(row.byStatus).sort((a, b) => b[1] - a[1])) {
      lines.push(`  ${status}: ${n}`);
    }
  }
  return lines;
}
