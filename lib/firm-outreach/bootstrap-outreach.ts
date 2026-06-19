import { runFirmEnrichment } from './enrichment/run-enrich';
import { isOutreachSendAllowed, setAdminPauseState, getOutreachPauseSummary } from './pause-state';
import { countProspectsByStatus } from './storage';

export interface BootstrapOutreachResult {
  unpaused: boolean;
  pauseBefore: Awaited<ReturnType<typeof getOutreachPauseSummary>>;
  pauseAfter: Awaited<ReturnType<typeof getOutreachPauseSummary>>;
  sendAllowed: boolean;
  countsBefore: Record<string, number>;
  countsAfter: Record<string, number>;
  batches: Awaited<ReturnType<typeof runFirmEnrichment>>[];
  totals: {
    processed: number;
    emailsFound: number;
    readyToSend: number;
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
  const countsBefore = await countProspectsByStatus();

  if (opts?.unpauseOnly) {
    const sendAllowed = await isOutreachSendAllowed();
    return {
      unpaused,
      pauseBefore,
      pauseAfter,
      sendAllowed,
      countsBefore,
      countsAfter: countsBefore,
      batches: [],
      totals: {
        processed: 0,
        emailsFound: 0,
        readyToSend: 0,
        noEmail: 0,
        errors: 0,
      },
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

  const countsAfter = await countProspectsByStatus();
  const sendAllowed = await isOutreachSendAllowed();

  const totals = batchResults.reduce(
    (acc, stats) => ({
      processed: acc.processed + stats.processed,
      emailsFound: acc.emailsFound + stats.emailsFound,
      readyToSend: acc.readyToSend + stats.readyToSend,
      noEmail: acc.noEmail + stats.noEmail,
      errors: acc.errors + stats.errors,
    }),
    { processed: 0, emailsFound: 0, readyToSend: 0, noEmail: 0, errors: 0 },
  );

  return {
    unpaused,
    pauseBefore,
    pauseAfter,
    sendAllowed,
    countsBefore,
    countsAfter,
    batches: batchResults,
    totals,
  };
}
