import { cronEnrichBatchSize, enrichMaxElapsedMs } from './constants';
import { runFirmEnrichment } from './enrichment/run-enrich';
import { requalifyAllProspects } from './requalify-prospects';
import { countProspectsByStatus } from './storage';

/** Requalify ready rows + run two enrich batches (matches GitHub production-kick script). */
export async function runServerProductionKick() {
  const countsBefore = await countProspectsByStatus();
  const requalify = await requalifyAllProspects({
    verifyWebsites: false,
    readyOnly: true,
    mxCheckLimit: 0,
    maxElapsedMs: 60_000,
  });
  const countsAfterRequalify = await countProspectsByStatus();

  const limit = cronEnrichBatchSize();
  const maxMs = enrichMaxElapsedMs();
  const batch1 = await runFirmEnrichment({ limit, maxElapsedMs: maxMs });
  const batch2 = await runFirmEnrichment({ limit, maxElapsedMs: maxMs });

  return {
    countsBefore,
    requalify,
    countsAfterRequalify,
    batches: [batch1, batch2],
    countsAfter: await countProspectsByStatus(),
  };
}
