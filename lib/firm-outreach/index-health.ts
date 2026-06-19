import { countProspectsByStatus, listAllProspectIds } from './storage';

export function sumIndexedProspectCounts(counts: Record<string, number>): number {
  return Object.values(counts).reduce((sum, n) => sum + (n ?? 0), 0);
}

export interface ProspectIndexHealth {
  masterIndexCount: number;
  indexedTotal: number;
  prospectCounts: Record<string, number>;
  /** True when prospects exist in KV but status index counts look broken. */
  drifted: boolean;
  warning?: string;
}

export function buildIndexDriftWarning(
  masterIndexCount: number,
  indexedTotal: number,
): string | undefined {
  if (masterIndexCount <= 0) return undefined;
  if (indexedTotal === 0) {
    return `${masterIndexCount} prospects in storage but status indexes are empty — run Rebuild indexes`;
  }
  if (indexedTotal < masterIndexCount * 0.5) {
    return `Status indexes look incomplete (${indexedTotal} indexed vs ${masterIndexCount} prospects) — run Rebuild indexes`;
  }
  return undefined;
}

export async function getProspectIndexHealth(): Promise<ProspectIndexHealth> {
  const [ids, prospectCounts] = await Promise.all([
    listAllProspectIds(),
    countProspectsByStatus(),
  ]);
  const masterIndexCount = ids.length;
  const indexedTotal = sumIndexedProspectCounts(prospectCounts);
  const warning = buildIndexDriftWarning(masterIndexCount, indexedTotal);
  return {
    masterIndexCount,
    indexedTotal,
    prospectCounts,
    drifted: Boolean(warning),
    warning,
  };
}
