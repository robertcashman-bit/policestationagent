import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('@/lib/editorial-audit/email', () => ({
  sendEditorialAuditDigestEmail: vi.fn(async () => true),
}));

const getDailyAuditBucket = vi.fn();
const markDailyAuditSent = vi.fn();
const shouldSendDailyAudit = vi.fn();
const dailyAuditDate = vi.fn(() => '2026-06-07');

vi.mock('@/lib/editorial-audit/daily-notify', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/editorial-audit/daily-notify')>();
  return {
    ...actual,
    getDailyAuditBucket: (...args: unknown[]) => getDailyAuditBucket(...args),
    markDailyAuditSent: (...args: unknown[]) => markDailyAuditSent(...args),
    shouldSendDailyAudit: (...args: unknown[]) => shouldSendDailyAudit(...args),
    dailyAuditDate: (...args: unknown[]) => dailyAuditDate(...args),
  };
});

import { resetAuditCursorForTests, selectAuditBatch } from '@/lib/editorial-audit/cursor';
import { proposedFixForCode } from '@/lib/editorial-audit/fixes';
import { notifyIfFindings } from '@/lib/editorial-audit/notify';
import { scanText } from '@/lib/editorial-audit/rules';
import { findingFingerprint, scanBatchFull, scanUnit } from '@/lib/editorial-audit/runner';
import { isExcludedFromEditorialAudit, splitMarkdownSections } from '@/lib/editorial-audit/units';
import { sendEditorialAuditDigestEmail } from '@/lib/editorial-audit/email';
import { shouldRunLlm } from '@/lib/editorial-audit/llm-check';
import {
  hasPaceStatutoryCite,
  LEGACY_PACE_SOURCING_SNIPPETS,
  paceSourcingViolation,
} from '@/lib/editorial-audit/pace-sourcing';
import { scanFeeRateClaims } from '@/lib/editorial-audit/fee-check';
import { contentSourceContextForUnit } from '@/lib/editorial-audit/sources-check';
import { hasSlugSpecificSources } from '@/lib/content-sources';
import { EDITORIAL_PAGE_PATHS, FEE_RIGHTS_PATHS } from '@/lib/editorial-audit/constants';
import { getAuditConfig } from '@/lib/editorial-audit/config';
import { POLICE_STATION_FIXED_FEE } from '@/lib/laa-rates';
import type { AuditFinding, AuditUnit } from '@/lib/editorial-audit/types';

function makeUnit(id: string, text = '', overrides: Partial<AuditUnit> = {}): AuditUnit {
  return {
    id,
    url: `/blog/${id}`,
    contentType: 'blog',
    sourceFile: 'lib/blog-reader.ts',
    sectionTitle: 'Test section',
    sectionIndex: 0,
    text,
    llmEligible: false,
    ...overrides,
  };
}

describe('editorial audit rules', () => {
  it('flags superseded £181 fee as PROBLEM with fix hint', () => {
    const flags = scanText('The fixed fee was £181 for attendance.');
    expect(flags.some((f) => f.code === 'fee-181' && f.severity === 'PROBLEM')).toBe(true);
    expect(proposedFixForCode('fee-181')).toMatch(/SI 2025\/1251/);
  });

  it('flags Bail Act 2024 as PROBLEM', () => {
    const flags = scanText('Under the Bail Act 2024, limits apply.');
    expect(flags.some((f) => f.code === 'bail-act-2024')).toBe(true);
  });

  it('allows registered case citations', () => {
    const flags = scanText('See R v Smith for an example only.');
    expect(flags.filter((f) => f.code === 'unregistered-case')).toHaveLength(0);
  });

  it('flags firm phone digits in copy', () => {
    const flags = scanText('Call 01732 247427 for help right away.');
    expect(flags.some((f) => f.code === 'firm-phone-digits' && f.severity === 'PROBLEM')).toBe(
      true,
    );
  });

  it('flags 24/7 hours claims', () => {
    const flags = scanText('We provide 24/7 police station cover across Kent.');
    expect(flags.some((f) => f.code === 'claim-24-7')).toBe(true);
  });

  it('flags 35+ years experience claims', () => {
    const flags = scanText('With 35 years plus experience in criminal defence.');
    expect(flags.some((f) => f.code === 'claim-35-years')).toBe(true);
  });

  it('flags Maidstone as public custody suite', () => {
    const flags = scanText(
      'Attend Maidstone custody suite for all Kent arrests and charging decisions.',
    );
    expect(flags.some((f) => f.code === 'maidstone-custody-suite')).toBe(true);
  });
});

describe('editorial audit fingerprints', () => {
  it('builds stable unitId:code fingerprints', () => {
    expect(findingFingerprint('blog:/blog/x:0', 'fee-181')).toBe('blog:/blog/x:0:fee-181');
  });

  it('scanUnit findings carry fingerprints', () => {
    const findings = scanUnit(makeUnit('fee-test', 'Police station fee was £181 last year.'));
    const hit = findings.find((f) => f.code === 'fee-181');
    expect(hit?.fingerprint).toBe(findingFingerprint(makeUnit('fee-test').id, 'fee-181'));
  });
});

describe('editorial audit section splitting', () => {
  it('splits markdown on ## headings', () => {
    const sections = splitMarkdownSections('Intro\n\n## First\n\nBody one\n\n## Second\n\nBody two');
    expect(sections).toHaveLength(3);
    expect(sections[1].title).toBe('First');
    expect(sections[2].title).toBe('Second');
  });
});

describe('editorial audit PSA path mapping', () => {
  it('uses lowercase public routes (not RepUK /Blog /Wiki)', () => {
    expect(EDITORIAL_PAGE_PATHS.every((p) => p === p.toLowerCase())).toBe(true);
    expect(EDITORIAL_PAGE_PATHS).toContain('/freelegaladvice');
    expect(EDITORIAL_PAGE_PATHS).toContain('/servicerates');
    expect(EDITORIAL_PAGE_PATHS).toContain('/services/police-station-representation');
    expect(EDITORIAL_PAGE_PATHS.some((p) => p.startsWith('/Blog'))).toBe(false);
    expect(EDITORIAL_PAGE_PATHS.some((p) => p.startsWith('/Wiki'))).toBe(false);
  });

  it('maps fee-rights paths for fees/servicerates/freelegaladvice', () => {
    expect(FEE_RIGHTS_PATHS.has('/fees')).toBe(true);
    expect(FEE_RIGHTS_PATHS.has('/servicerates')).toBe(true);
    expect(FEE_RIGHTS_PATHS.has('/freelegaladvice')).toBe(true);
  });

  it('maps blog units to /blog/ slug sources context', () => {
    const ctx = contentSourceContextForUnit(
      makeUnit('what-is-a-police-station-rep', 'x', {
        url: '/blog/what-is-a-police-station-rep',
      }),
    );
    expect(ctx).toEqual({ kind: 'blog', slug: 'what-is-a-police-station-rep' });
    expect(hasSlugSpecificSources(ctx!)).toBe(true);
  });

  it('maps guide pages to PAGE_PATH sources', () => {
    const ctx = contentSourceContextForUnit(
      makeUnit('guide', 'x', {
        url: '/freelegaladvice',
        contentType: 'fee-rights',
      }),
    );
    expect(ctx).toEqual({ kind: 'page', path: '/freelegaladvice' });
    expect(hasSlugSpecificSources(ctx!)).toBe(true);
  });

  it('excludes station / custody-number style paths from editorial corpus', () => {
    expect(isExcludedFromEditorialAudit('/maidstone-police-station')).toBe(true);
    expect(isExcludedFromEditorialAudit('/coverage/police-stations/medway')).toBe(true);
    expect(isExcludedFromEditorialAudit('/tonbridge-solicitor')).toBe(true);
    expect(isExcludedFromEditorialAudit('/freelegaladvice')).toBe(false);
    expect(isExcludedFromEditorialAudit('/blog/what-is-a-police-station-rep')).toBe(false);
  });

  it('defaults siteUrl and githubRepo to PSA', () => {
    const prevSite = process.env.NEXT_PUBLIC_SITE_URL;
    const prevRepo = process.env.GITHUB_REPO;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.GITHUB_REPO;
    const cfg = getAuditConfig();
    expect(cfg.siteUrl).toBe('https://www.policestationagent.com');
    expect(cfg.githubRepo).toBe('robertcashman-bit/policestationagent');
    if (prevSite !== undefined) process.env.NEXT_PUBLIC_SITE_URL = prevSite;
    if (prevRepo !== undefined) process.env.GITHUB_REPO = prevRepo;
  });
});

describe('editorial audit no phone digits introduced', () => {
  it('proposed fixes never embed firm telephone digits', () => {
    const firm = /01732|07535|247427|494446/;
    for (const fix of Object.values(
      // re-import via proposedFixForCode over known codes
      [
        'firm-phone-digits',
        'fee-181',
        'claim-24-7',
        'maidstone-custody-suite',
        'llm-fact-check',
        'missing-content-sources-map',
      ].map((c) => proposedFixForCode(c)),
    )) {
      expect(fix).not.toMatch(firm);
    }
  });

  it('scanUnit does not invent phone numbers in proposedFix', () => {
    const findings = scanUnit(makeUnit('phone', 'Call 01732 247427 now'));
    for (const f of findings) {
      expect(f.proposedFix).not.toMatch(/01732|07535/);
    }
  });
});

describe('editorial audit cursor rotation', () => {
  beforeEach(async () => {
    await resetAuditCursorForTests();
  });

  it('advances through units without repeating within a batch', async () => {
    const units = [makeUnit('a'), makeUnit('b'), makeUnit('c'), makeUnit('d'), makeUnit('e')];
    const first = await selectAuditBatch(units, 2);
    expect(first.batch).toHaveLength(2);
    expect(first.batch.map((u) => u.id)).toEqual(['a', 'b']);
    expect(new Set(first.batch.map((u) => u.id)).size).toBe(2);

    const second = await selectAuditBatch(units, 2);
    expect(second.batch.map((u) => u.id)).toEqual(['c', 'd']);
  });

  it('wraps cursor after reaching end of list', async () => {
    const units = [makeUnit('a'), makeUnit('b'), makeUnit('c')];
    await selectAuditBatch(units, 2);
    await selectAuditBatch(units, 2);
    await selectAuditBatch(units, 2);
    const fourth = await selectAuditBatch(units, 2);
    expect(fourth.batch[0].id).toBe('a');
  });
});

describe('editorial audit batch scan', () => {
  it('produces findings with proposed fix from scanUnit', () => {
    const findings = scanUnit(makeUnit('fee-test', 'Police station fee was £181 last year.'));
    expect(findings.some((f) => f.code === 'fee-181' && f.severity === 'PROBLEM')).toBe(true);
    expect(findings.find((f) => f.code === 'fee-181')?.proposedFix).toMatch(/SI 2025\/1251/);
  });
});

describe('editorial audit PACE sourcing', () => {
  it('flags legacy bare-PACE snippets', () => {
    for (const snippet of LEGACY_PACE_SOURCING_SNIPPETS) {
      expect(paceSourcingViolation(snippet.text)).toBe(true);
    }
  });

  it('passes when PACE and Codes of Practice are cited', () => {
    const text =
      'Reps must apply PACE and Codes of Practice — not improvise. That includes custody rights under Code C, appropriate adults for juveniles and vulnerable adults, interpreter needs, and medical assessments where relevant.';
    expect(hasPaceStatutoryCite(text)).toBe(true);
    expect(paceSourcingViolation(text)).toBe(false);
  });

  it('scanUnit emits pace-sourcing REVIEW for bare PACE copy', () => {
    const findings = scanUnit(
      makeUnit('pace', LEGACY_PACE_SOURCING_SNIPPETS[0].text, {
        contentType: 'guide',
        url: '/pace-code-c',
      }),
    );
    expect(findings.some((f) => f.code === 'pace-sourcing')).toBe(true);
  });
});

describe('editorial audit LAA fee vs canonical rates', () => {
  it('flags page copy that disagrees with lib/laa-rates police-station fixed fee', () => {
    const text =
      'Under the current LAA scheme the harmonised police station fixed fee is £250 for every attendance.';
    const flags = scanFeeRateClaims(text);
    expect(flags.some((f) => f.code === 'fee-rate-mismatch-police-station')).toBe(true);
    expect(POLICE_STATION_FIXED_FEE).toBe(320);
  });

  it('does not flag the canonical £320 harmonised fee', () => {
    const text =
      'The harmonised police station fixed fee is £320 from 22 December 2025 (SI 2025/1251).';
    expect(scanFeeRateClaims(text)).toHaveLength(0);
  });

  it('does not flag PSA agency standard attendance £160 as LAA fixed fee', () => {
    const text =
      'Standard Attendance Fee for legally aided agency cover is £160.00. Private client instructions are separate.';
    expect(scanFeeRateClaims(text)).toHaveLength(0);
  });

  it('scanUnit surfaces fee mismatch as PROBLEM', () => {
    const findings = scanUnit(
      makeUnit('rates-bad', 'The harmonised police station fixed fee is £200 for all schemes.', {
        contentType: 'fee-rights',
        url: '/fees',
        sourceFile: 'app/fees/page.tsx',
      }),
    );
    expect(findings.some((f) => f.code === 'fee-rate-mismatch-police-station')).toBe(true);
  });
});

describe('editorial audit shouldRunLlm', () => {
  const baseState = { llm_calls_this_month: 0, estimated_spend_usd: 0 };
  const flagged: AuditFinding[] = [
    {
      fingerprint: 'x:fee-181',
      unitId: 'x',
      url: '/blog/x',
      sectionTitle: 't',
      sourceFile: 'f',
      severity: 'PROBLEM',
      code: 'fee-181',
      reason: 'bad fee',
      proposedFix: 'fix',
    },
  ];

  it('returns false without OPENAI_API_KEY', () => {
    const prev = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    const unit = makeUnit('llm', 'text about fees', { llmEligible: true, contentType: 'guide' });
    expect(shouldRunLlm(unit, flagged, 0, baseState)).toBe(false);
    if (prev !== undefined) process.env.OPENAI_API_KEY = prev;
  });

  it('returns false when rules_flagged_only and no findings', () => {
    process.env.OPENAI_API_KEY = 'sk-test';
    const unit = makeUnit('llm', 'clean text', { llmEligible: true, contentType: 'guide' });
    expect(shouldRunLlm(unit, [], 0, baseState)).toBe(false);
  });

  it('returns true when key set, eligible, and rules flagged', () => {
    process.env.OPENAI_API_KEY = 'sk-test';
    const unit = makeUnit('llm', 'flagged text', { llmEligible: true, contentType: 'guide' });
    expect(shouldRunLlm(unit, flagged, 0, baseState)).toBe(true);
  });

  it('respects per-run call cap', () => {
    process.env.OPENAI_API_KEY = 'sk-test';
    const unit = makeUnit('llm', 'flagged text', { llmEligible: true, contentType: 'guide' });
    expect(shouldRunLlm(unit, flagged, 2, baseState)).toBe(false);
  });

  it('does not GPT-scan when content type is not llm-on (station-like exclusion)', () => {
    process.env.OPENAI_API_KEY = 'sk-test';
    const unit = makeUnit('station', 'flagged £181', {
      llmEligible: false,
      contentType: 'guide',
    });
    expect(shouldRunLlm(unit, flagged, 0, baseState)).toBe(false);
  });
});

describe('editorial audit live URL', () => {
  it('flags HTTP errors from live fetch', async () => {
    const fetchMock = vi.fn(async () => ({
      status: 500,
      text: async () => 'error',
    }));
    vi.stubGlobal('fetch', fetchMock);

    const result = await scanBatchFull([makeUnit('live', 'ok copy with no red flags here')], {
      siteUrl: 'https://example.test',
      skipLlm: true,
      llmState: { llm_calls_this_month: 0, estimated_spend_usd: 0 },
    });

    expect(result.liveUrlsChecked).toBe(1);
    expect(result.findings.some((f) => f.code === 'live-url-http-error')).toBe(true);
    vi.unstubAllGlobals();
  });
});

describe('editorial audit cron schedule', () => {
  it('schedules weekdays 06:00 UTC (07:00 BST) not Monday-only 17:00', async () => {
    const { readFileSync } = await import('fs');
    const vercel = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
      crons?: Array<{ path: string; schedule: string }>;
    };
    const editorial = (vercel.crons ?? []).filter((c) => c.path === '/api/cron/editorial-audit');
    expect(editorial).toHaveLength(1);
    expect(editorial[0].schedule).toBe('0 6 * * 1-5');
  });
});

describe('editorial audit daily notification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    shouldSendDailyAudit.mockReturnValue(true);
    getDailyAuditBucket.mockResolvedValue(null);
  });

  it('does not email when batch is clean (no all-clear)', async () => {
    const result = await notifyIfFindings([], 5);
    expect(result.emailed).toBe(false);
    expect(result.findingCount).toBe(0);
    expect(sendEditorialAuditDigestEmail).not.toHaveBeenCalled();
  });

  it('sends digest when findings exist and send window is open', async () => {
    const findings = scanUnit(makeUnit('x', 'Fee was £181'));
    const result = await notifyIfFindings(findings, 3);
    expect(result.emailed).toBe(true);
    expect(sendEditorialAuditDigestEmail).toHaveBeenCalledTimes(1);
    expect(markDailyAuditSent).toHaveBeenCalledWith('2026-06-07');
  });

  it('queues findings but waits outside send window', async () => {
    shouldSendDailyAudit.mockReturnValue(false);
    const findings = scanUnit(makeUnit('x', 'Fee was £181'));
    const result = await notifyIfFindings(findings, 3);
    expect(result.emailed).toBe(false);
    expect(result.pendingDailyDigest).toBe(true);
    expect(sendEditorialAuditDigestEmail).not.toHaveBeenCalled();
  });

  it('does not send a second email on the same day', async () => {
    getDailyAuditBucket.mockResolvedValue({
      date: '2026-06-07',
      findings: [],
      unitsScanned: 5,
      notifiedAt: '2026-06-07T19:00:00.000Z',
    });
    const findings = scanUnit(makeUnit('x', 'Fee was £181'));
    const result = await notifyIfFindings(findings, 3);
    expect(result.emailed).toBe(false);
    expect(sendEditorialAuditDigestEmail).not.toHaveBeenCalled();
  });
});
