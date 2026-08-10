import type { OutreachCapacity } from '../capacity';

export type WorkspaceHealthStatus =
  | 'HEALTHY'
  | 'DEGRADED'
  | 'FAILED'
  | 'NO_ELIGIBLE_LEADS'
  | 'LIMIT_REACHED';

/**
 * Classify workspace health for the daily outreach report.
 *
 * FAILED for “eligible but cannot send” only when the reported London day had
 * zero accepted provider sends AND a real outage reason (provider auth,
 * scheduler failure, capacity blocked). Do not FAILED when yesterday accepted > 0,
 * backlog remains after a successful batch, or worker status is expected skipped.
 */
export function classifyWorkspaceHealth(input: {
  capacity: OutreachCapacity;
  lastSchedulerOk: boolean;
  lastSchedulerAgeMs: number | null;
  outstandingFaults: string[];
  providerAuthOk: boolean;
  acceptedToday: number;
  temporaryFailures: number;
  pendingBacklog: number;
}): WorkspaceHealthStatus {
  if (!input.providerAuthOk || input.outstandingFaults.some((f) => f.includes('auth'))) {
    return 'FAILED';
  }

  const hardCapacityBlock =
    input.capacity.limitingFactor === 'sending_disabled' ||
    input.capacity.limitingFactor === 'dry_run';

  if (hardCapacityBlock) {
    return 'FAILED';
  }

  const realOutage =
    !input.lastSchedulerOk ||
    input.outstandingFaults.some(
      (f) =>
        f.includes('RESEND') ||
        f.toLowerCase().includes('auth') ||
        f.toLowerCase().includes('domain') ||
        f.includes('campaign send unhealthy'),
    );

  // Eligible leads with capacity but zero accepted sends + real outage → FAILED.
  // Do NOT treat "last worker > 45m before 07:00 report" as a standalone FAILED
  // when the reported day already had accepted provider sends.
  if (
    input.capacity.sendingEnabled &&
    !input.capacity.dryRun &&
    input.capacity.eligibleUnsent > 0 &&
    input.capacity.effectiveAvailableCapacity > 0 &&
    input.acceptedToday <= 0 &&
    realOutage
  ) {
    return 'FAILED';
  }

  if (
    input.capacity.limitingFactor === 'provider_daily_limit' ||
    input.capacity.limitingFactor === 'configured_daily_limit' ||
    input.capacity.limitingFactor === 'hourly_limit'
  ) {
    return 'LIMIT_REACHED';
  }

  if (
    input.capacity.limitingFactor === 'no_eligible_leads' ||
    (input.capacity.eligibleUnsent <= 0 &&
      input.capacity.pendingJobs + input.capacity.retryScheduledJobs <= 0 &&
      input.capacity.sendingEnabled)
  ) {
    return 'NO_ELIGIBLE_LEADS';
  }

  if (
    input.temporaryFailures > 0 ||
    input.pendingBacklog > 50 ||
    input.outstandingFaults.length > 0 ||
    !input.lastSchedulerOk ||
    (input.lastSchedulerAgeMs != null &&
      input.lastSchedulerAgeMs > 45 * 60_000 &&
      input.acceptedToday <= 0)
  ) {
    return 'DEGRADED';
  }

  return 'HEALTHY';
}
