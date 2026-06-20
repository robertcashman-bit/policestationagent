import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';

const REPAIR_SCRIPT = resolve('scripts/firm-outreach-repair-loop.mjs');
const HEALTH_SCRIPT = resolve('scripts/firm-outreach-health-loop.mjs');

describe('firm-outreach repair loop script', () => {
  const src = readFileSync(REPAIR_SCRIPT, 'utf8');

  it('exits non-zero unless ready_to_send > 0 and sendAllowed', () => {
    expect(src).toContain('ready > 0 && sendAllowed');
    expect(src).toContain('Repair OK');
    expect(src).toContain('process.exit(1)');
  });

  it('reports index drift from status endpoint when CRON_SECRET is set', () => {
    expect(src).toContain('indexHealth?.drifted');
    expect(src).toContain('firm-outreach-status');
  });
});

describe('firm-outreach health loop script', () => {
  const src = readFileSync(HEALTH_SCRIPT, 'utf8');

  it('runs repo verify then production HTTP verify in a retry loop', () => {
    expect(src).toContain('verify:firm-outreach');
    expect(src).toContain('firm-outreach-repair-loop.mjs');
    expect(src).toContain('FIRM_OUTREACH_HEALTH_ATTEMPTS');
  });
});
