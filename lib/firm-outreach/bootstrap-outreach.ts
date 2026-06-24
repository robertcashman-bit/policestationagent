import { runFirmEnrichment } from './enrichment/run-enrich';
import { reindexProspectStatuses } from './reindex-prospects';
import { isOutreachSendAllowed, setAdminPauseState, getOutreachPauseSummary } from './pause-state';
import { countProspectsByStatus } from './storage';

export interface BootstrapOutreachResult {
  unpaused: boolean;
  pauseBefore: Awaited<ReturnType<typeof getOutreachPauseSummary>>;
  pauseAfter: Awaited<ReturnType<typeof getOutreachPauseSummary>>;
  sendAllowed: boolean;
  countsBefore: Record<string, number>;
  countsAfter: Record<string, number>;
  reindex?: Awaited<ReturnType<typeof reindexProspectStatuses>>;
  batches: Awaited<ReturnType<typeof runFirmEnrichment>>[];
  totals: {
    processed: number;
    emailsFound: number;
    readyToSend: number;
    persistedReady: number;
    noEmail: number;
    errors: number;
  };
}

export async function bootstrapOutreach(opts?: {
  batches?: number;
  limit?: number;
  maxElapsedMs?: number;
  /** Total wall-clock budget for all batches (cron / serverless safety). */
  totalMaxElapsedMs?: number;
  /** Only clear admin pause and return counts — no enrichment. */
  unpauseOnly?: boolean;
  /** Rebuild status indexes from prospect records before enrich. */
  reindex?: boolean;
  /** Reindex only — skip enrich batches. */
  reindexOnly?: boolean;
}): Promise<BootstrapOutreachResult> {
  const batches = opts?.batches ?? 2;
  const limit = opts?.limit ?? 25;
  const maxElapsedMs = opts?.maxElapsedMs ?? 55_000;
  const deadline = Date.now() + (opts?.totalMaxElapsedMs ?? 110_000);

  const pauseBefore = await getOutreachPauseSummary();
  let unpaused = false;

  if (pauseBefore.effectivePaused && !pauseBefore.envPaused) {
    await setAdminPauseState(false);
    unpaused = true;
  }

  const pauseAfter = await getOutreachPauseSummary();
  let countsBefore = await countProspectsByStatus();
  let reindexResult: Awaited<ReturnType<typeof reindexProspectStatuses>> | undefined;

  if (opts?.reindex || opts?.reindexOnly) {
    reindexResult = await reindexProspectStatuses();
    countsBefore = await countProspectsByStatus();
  }

  const emptyTotals = {
    processed: 0,
    emailsFound: 0,
    readyToSend: 0,
    persistedReady: 0,
    noEmail: 0,
    errors: 0,
  };

  if (opts?.unpauseOnly || opts?.reindexOnly) {
    const sendAllowed = await isOutreachSendAllowed();
    const countsAfter = await countProspectsByStatus();
    return {
      unpaused,
      pauseBefore,
      pauseAfter,
      sendAllowed,
      countsBefore,
      countsAfter,
      reindex: reindexResult,
      batches: [],
      totals: emptyTotals,
    };
  }

  const batchResults: Awaited<ReturnType<typeof runFirmEnrichment>>[] = [];

  for (let i = 0; i < batches; i++) {
    if (Date.now() >= deadline) break;
    const remaining = deadline - Date.now();
    const stats = await runFirmEnrichment({
      limit,
      maxElapsedMs: Math.min(maxElapsedMs, remaining),
    });
    batchResults.push(stats);
    if (stats.processed === 0) break;
  }

  const totals = batchResults.reduce(
    (acc, stats) => ({
      processed: acc.processed + stats.processed,
      emailsFound: acc.emailsFound + stats.emailsFound,
      readyToSend: acc.readyToSend + stats.readyToSend,
      persistedReady: acc.persistedReady + (stats.persistedReady ?? 0),
      noEmail: acc.noEmail + stats.noEmail,
      errors: acc.errors + stats.errors,
    }),
    { processed: 0, emailsFound: 0, readyToSend: 0, persistedReady: 0, noEmail: 0, errors: 0 },
  );

  let countsAfter = await countProspectsByStatus();

  const sendAllowed = await isOutreachSendAllowed();

  return {
    unpaused,
    pauseBefore,
    pauseAfter,
    sendAllowed,
    countsBefore,
    countsAfter,
    reindex: reindexResult,
    batches: batchResults,
    totals,
  };
}
