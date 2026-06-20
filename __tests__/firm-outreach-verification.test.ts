import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import {
  EXPECTED_CRON_ROUTES,
  checkBrochureExists,
  checkBrochureLoadsAsAttachment,
  checkBrochureMinSize,
  checkCronRouteFilesExist,
  checkListProspectsByRecordStatusExported,
  checkNationalDiscoveryScope,
  checkOutreachTemplates,
  checkRepairLoopRequiresReady,
  checkSendUsesRecordStatus,
  checkTestGlobIncludesOutreachSendApproved,
  checkVercelCronConfig,
  loadVercelJson,
  runRepoChecks,
  summarizeResults,
} from '@/lib/firm-outreach/verify-checks';
import { isCronAuthorized } from '@/lib/cron-auth';
import { outreachEnabled, outreachSendEnabled, outreachPaused, dailySendCap } from '@/lib/firm-outreach/constants';

describe('firm-outreach verify-checks (repo)', () => {
  it('passes all repo checks in this workspace', () => {
    const results = runRepoChecks();
    const summary = summarizeResults(results);
    if (summary.failed > 0) {
      console.error('Repo check failures:', summary.failures);
    }
    expect(summary.failed).toBe(0);
  });

  it('brochure exists and loads as attachment', () => {
    expect(checkBrochureExists().ok).toBe(true);
    expect(checkBrochureMinSize().ok).toBe(true);
    expect(checkBrochureLoadsAsAttachment().ok).toBe(true);
  });

  it('vercel.json is valid and lists expected cron routes', () => {
    expect(loadVercelJson().ok).toBe(true);
    const vercelRaw = require('fs').readFileSync(require('path').resolve('vercel.json'), 'utf8');
    const vercelJson = JSON.parse(vercelRaw.replace(/,\s*([}\]])/g, '$1'));
    const cronChecks = checkVercelCronConfig(vercelJson);
    expect(cronChecks.every((c) => c.ok)).toBe(true);
  });

  it('cron route files exist for every expected path', () => {
    const checks = checkCronRouteFilesExist();
    expect(checks.every((c) => c.ok)).toBe(true);
  });

  it('email templates render for all sequence steps', () => {
    const checks = checkOutreachTemplates();
    expect(checks.every((c) => c.ok)).toBe(true);
  });

  it('send path and discovery scope repo guards pass', () => {
    expect(checkSendUsesRecordStatus().ok).toBe(true);
    expect(checkListProspectsByRecordStatusExported().ok).toBe(true);
    expect(checkNationalDiscoveryScope().ok).toBe(true);
    expect(checkRepairLoopRequiresReady().ok).toBe(true);
    expect(checkTestGlobIncludesOutreachSendApproved().ok).toBe(true);
  });
});

describe('cron auth', () => {
  const prev = process.env.CRON_SECRET;

  afterEach(() => {
    process.env.CRON_SECRET = prev;
  });

  it('rejects requests without secret in production', () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    const req = new Request('http://localhost/api/cron/firm-outreach-pipeline/full');
    expect(isCronAuthorized(req)).toBe(false);
  });

  it('accepts Bearer authorization', () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    const req = new Request('http://localhost/api/cron/firm-outreach-pipeline/full', {
      headers: { Authorization: 'Bearer test-cron-secret' },
    });
    expect(isCronAuthorized(req)).toBe(true);
  });

  it('accepts x-cron-secret header', () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    const req = new Request('http://localhost/api/cron/firm-outreach-pipeline/full', {
      headers: { 'x-cron-secret': 'test-cron-secret' },
    });
    expect(isCronAuthorized(req)).toBe(true);
  });
});

describe('outreach env flags', () => {
  const envBackup = { ...process.env };

  afterEach(() => {
    process.env = { ...envBackup };
  });

  it('is enabled by default', () => {
    delete process.env.FIRM_OUTREACH_ENABLED;
    expect(outreachEnabled()).toBe(true);
  });

  it('respects FIRM_OUTREACH_ENABLED=false', () => {
    process.env.FIRM_OUTREACH_ENABLED = 'false';
    expect(outreachEnabled()).toBe(false);
  });

  it('send enabled unless explicitly disabled or paused', () => {
    delete process.env.FIRM_OUTREACH_SEND_ENABLED;
    delete process.env.FIRM_OUTREACH_PAUSED;
    expect(outreachSendEnabled()).toBe(true);
  });

  it('send disabled when FIRM_OUTREACH_SEND_ENABLED=false', () => {
    process.env.FIRM_OUTREACH_SEND_ENABLED = 'false';
    expect(outreachSendEnabled()).toBe(false);
  });

  it('paused when FIRM_OUTREACH_PAUSED=true', () => {
    process.env.FIRM_OUTREACH_PAUSED = 'true';
    expect(outreachPaused()).toBe(true);
    expect(outreachSendEnabled()).toBe(false);
  });

  it('daily cap defaults to 50', () => {
    delete process.env.FIRM_OUTREACH_DAILY_CAP;
    expect(dailySendCap()).toBe(50);
  });
});

describe('cron route handlers reject unauthenticated requests', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = 'route-test-secret';
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    vi.resetModules();
  });

  for (const [label, importPath] of [
    ['maintain', '@/app/api/cron/firm-outreach-pipeline/maintain/route'],
    ['full', '@/app/api/cron/firm-outreach-pipeline/full/route'],
    ['enrich', '@/app/api/cron/firm-outreach-enrich/route'],
    ['digest', '@/app/api/cron/firm-outreach-digest/route'],
    ['status', '@/app/api/cron/firm-outreach-status/route'],
    ['legacy send', '@/app/api/cron/firm-outreach-send/route'],
  ] as const) {
    it(`${label} returns 401 without cron secret`, async () => {
      vi.doMock('@/lib/firm-outreach/run-pipeline', () => ({
        runFirmOutreachPipeline: vi.fn(),
      }));
      vi.doMock('@/lib/firm-outreach/outreach/digest-email', () => ({
        sendDailyOutreachDigest: vi.fn(),
      }));
      vi.doMock('@/lib/firm-outreach/config-status', () => ({
        getOutreachConfigStatus: vi.fn(),
      }));
      vi.doMock('@/lib/firm-outreach/outreach/activity-report', () => ({
        buildOutreachActivityReport: vi.fn(),
      }));
      vi.doMock('@/lib/firm-outreach/pause-state', () => ({
        getOutreachPauseSummary: vi.fn(),
      }));
      vi.doMock('@/lib/kv', () => ({ getKV: () => null }));

      const { GET } = await import(importPath);
      const res = await GET(new Request('http://localhost/test'));
      expect(res.status).toBe(401);
    });
  }
});

describe('sendOutreachEmail dry-run and missing resend', () => {
  const prospect = {
    id: 'p1',
    firmKey: 'f1',
    firmName: 'Test Firm',
    prospectType: 'firm' as const,
    status: 'ready_to_send' as const,
    sequenceStep: 0,
    sources: ['test'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    email: 'test@examplefirm.co.uk',
  };

  afterEach(() => {
    vi.resetModules();
    delete process.env.FIRM_OUTREACH_DRY_RUN;
    delete process.env.RESEND_API_KEY;
  });

  it('dry-run does not require Resend', async () => {
    process.env.FIRM_OUTREACH_DRY_RUN = 'true';
    const { sendOutreachEmail } = await import('@/lib/firm-outreach/outreach/send');
    const result = await sendOutreachEmail({ prospect, step: 0 });
    expect(result.ok).toBe(true);
    expect(result.messageId).toBe('dry-run');
  });

  it('returns no_resend when API key missing', async () => {
    const { sendOutreachEmail } = await import('@/lib/firm-outreach/outreach/send');
    const result = await sendOutreachEmail({ prospect, step: 0 });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('no_resend');
  });

  it('returns no_email when prospect has no email', async () => {
    const { sendOutreachEmail } = await import('@/lib/firm-outreach/outreach/send');
    const result = await sendOutreachEmail({
      prospect: { ...prospect, email: undefined },
      step: 0,
    });
    expect(result.ok).toBe(false);
    expect(result.error).toBe('no_email');
  });
});

describe('resend webhook verification', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
    process.env.RESEND_WEBHOOK_SECRET = 'whsec_test';
    process.env.RESEND_API_KEY = 're_test';
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('rejects unsigned webhook payloads', async () => {
    const { POST } = await import('@/app/api/webhooks/resend/route');
    const res = await POST(
      new Request('http://localhost/api/webhooks/resend', {
        method: 'POST',
        body: '{}',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    expect(res.status).toBe(401);
  });
});

describe('admin firm-outreach API auth', () => {
  it('GET returns 401 without admin session', async () => {
    vi.doMock('@/lib/admin-auth', () => ({
      requireAdminApi: async () => ({ ok: false, status: 401, error: 'Unauthorized' }),
    }));
    const { GET } = await import('@/app/api/admin/firm-outreach/route');
    const res = await GET(new Request('http://localhost/api/admin/firm-outreach'));
    expect(res.status).toBe(401);
  });
});

describe('expected cron route list completeness', () => {
  it('includes all scheduled vercel crons', () => {
    const vercelRaw = require('fs').readFileSync(require('path').resolve('vercel.json'), 'utf8');
    const vercelJson = JSON.parse(vercelRaw.replace(/,\s*([}\]])/g, '$1'));
    const scheduled = new Set((vercelJson.crons ?? []).map((c: { path: string }) => c.path));
    for (const route of EXPECTED_CRON_ROUTES) {
      expect(scheduled.has(route)).toBe(true);
    }
  });
});
