import { bootstrapOutreach } from './bootstrap-outreach';
import { requalifyAllProspects } from './requalify-prospects';
import { countProspectsByStatus } from './storage';

/** Requalify ready rows + run enrich batches (same steps as GitHub/Vercel kick). */
export async function runServerProductionKick() {
  const countsBefore = await countProspectsByStatus();
  const requalify = await requalifyAllProspects({
    verifyWebsites: false,
    readyOnly: true,
    mxCheckLimit: 50,
    maxElapsedMs: 240_000,
  });
  const countsAfterRequalify = await countProspectsByStatus();
  const enrich = await bootstrapOutreach({
    batches: 2,
    limit: 60,
    totalMaxElapsedMs: 240_000,
    maxElapsedMs: 110_000,
  });

  return {
    countsBefore,
    requalify,
    countsAfterRequalify,
    enrich,
    countsAfter: enrich.countsAfter,
  };
}
