import type { AuditUnit } from '@/lib/editorial-audit/types';

export function selectAuditBatch(allUnits: AuditUnit[], cursor: number, batchSize: number): {
  batch: AuditUnit[];
  nextCursor: number;
} {
  if (allUnits.length === 0) return { batch: [], nextCursor: 0 };
  const batch: AuditUnit[] = [];
  for (let i = 0; i < batchSize; i++) {
    const idx = (cursor + i) % allUnits.length;
    batch.push(allUnits[idx]!);
  }
  return { batch, nextCursor: (cursor + batchSize) % allUnits.length };
}
