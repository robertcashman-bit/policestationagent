import {
  countProspectsByStatusFromIndexes,
  getProspectStatusSnapshot,
  type ProspectStatusSnapshot,
} from './storage';

export function sumIndexedProspectCounts(counts: Record<string, number>): number {
  return Object.values(counts).reduce((sum, n) => sum + (n ?? 0), 0);
}

export interface ProspectIndexHealth {
  masterIndexCount: number;
  indexedTotal: number;
  recordTotal: number;
  prospectCounts: Record<string, number>;
  /** True when status index bucket counts diverge from stored record counts. */
  drifted: boolean;
  warning?: string;
}

export function buildIndexDriftWarning(
  recordTotal: number,
  indexedTotal: number,
): string | undefined {
  if (recordTotal <= 0) return undefined;
  if (indexedTotal === 0) {
    return `${recordTotal} active prospects in storage but status indexes are empty — run Rebuild indexes`;
  }
  if (indexedTotal < recordTotal * 0.5) {
    return `Status indexes look incomplete (${indexedTotal} indexed vs ${recordTotal} active records) — run Rebuild indexes`;
  }
  return undefined;
}

export interface ProspectIndexHealthInput {
  prospectCounts: Record<string, number>;
  masterIndexCount: number;
  indexCounts?: Record<string, number>;
}

export function buildProspectIndexHealth(input: ProspectIndexHealthInput): ProspectIndexHealth {
  const recordTotal = sumIndexedProspectCounts(input.prospectCounts);
  const indexCounts = input.indexCounts ?? {};
  const indexedTotal = sumIndexedProspectCounts(indexCounts);
  const warning = buildIndexDriftWarning(recordTotal, indexedTotal);
  return {
    masterIndexCount: input.masterIndexCount,
    indexedTotal,
    recordTotal,
    prospectCounts: input.prospectCounts,
    drifted: Boolean(warning),
    warning,
  };
}

export async function getProspectIndexHealth(
  snapshot?: Pick<ProspectStatusSnapshot, 'counts' | 'masterIndexCount'>,
): Promise<ProspectIndexHealth> {
  const resolved = snapshot ?? (await getProspectStatusSnapshot());
  const indexCounts = await countProspectsByStatusFromIndexes();
  return buildProspectIndexHealth({
    prospectCounts: resolved.counts,
    masterIndexCount: resolved.masterIndexCount,
    indexCounts,
  });
}
