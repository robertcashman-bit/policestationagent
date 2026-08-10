import { describe, expect, test } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { selectAuditBatch } from '../../lib/editorial-audit/rotation.ts';
import { PROHIBITED_PATTERNS } from '../../lib/editorial-audit/prohibited.ts';
import {
  hasPaceStatutoryCite,
  LEGACY_PACE_SOURCING_SNIPPETS,
  paceSourcingViolation,
} from '../../lib/editorial-audit/pace-sourcing.ts';
import { scanUnitRules } from '../../lib/editorial-audit/rules.ts';
import { buildAllAuditUnits, loadUnitText } from '../../lib/editorial-audit/units.ts';
import { formatAuditDigestBody } from '../../lib/editorial-audit/digest-email.ts';
import { GUIDES } from '../../lib/guides/content.ts';
import type { AuditUnit } from '../../lib/editorial-audit/types.ts';

function mockExamProductTruthFail(text: string): boolean {
  return (
    /\bmock exams?\b/i.test(text) &&
    !existsSync(join(process.cwd(), 'app/(main)/mock-exam/page.tsx'))
  );
}

function paceSourcingReview(text: string): boolean {
  return paceSourcingViolation(text);
}

describe('editorial audit', () => {
  test('selectAuditBatch rotates', () => {
    const all = Array.from({ length: 20 }, (_, i) => ({
      id: `u:${i}`,
      kind: 'live-url' as const,
      label: String(i),
      llmEligible: false,
    }));
    const { batch, nextCursor } = selectAuditBatch(all, 0, 12);
    expect(batch.length).toBe(12);
    expect(nextCursor).toBe(12);
  });

  test('prohibited patterns include guaranteed pass', () => {
    expect(PROHIBITED_PATTERNS.some((p) => p.label === 'guaranteed pass')).toBeTruthy();
  });

  test('emailedToday logic', () => {
    function emailedToday(lastEmailAt: string | null): boolean {
      if (!lastEmailAt) return false;
      const last = new Date(lastEmailAt);
      const now = new Date();
      return (
        last.getUTCFullYear() === now.getUTCFullYear() &&
        last.getUTCMonth() === now.getUTCMonth() &&
        last.getUTCDate() === now.getUTCDate()
      );
    }
    expect(emailedToday(new Date().toISOString())).toBe(true);
    expect(emailedToday('2020-01-01T00:00:00.000Z')).toBe(false);
  });

  test('2026-06-10 audit batch units pass product-truth and PACE sourcing rules', () => {
    const career = GUIDES.find((g) => g.slug === 'how-to-become-a-police-station-representative');
    const cit = GUIDES.find((g) => g.slug === 'critical-incidents-test-psras');
    expect(career && cit).toBeTruthy();

    const units: AuditUnit[] = [
      {
        id: 'guide:how-to-become-a-police-station-representative:section:4',
        kind: 'guide-section',
        label: 'Step 5',
        url: '/guides/how-to-become-a-police-station-representative',
        text: [career!.sections[4].heading, ...(career!.sections[4].paragraphs ?? [])].join('\n'),
        llmEligible: false,
      },
      {
        id: 'guide:how-to-become-a-police-station-representative:faq:2',
        kind: 'guide-faq',
        label: 'FAQ online prep',
        url: '/guides/how-to-become-a-police-station-representative',
        text: `${career!.faqs[2].question}\n${career!.faqs[2].answer}`,
        llmEligible: false,
      },
      {
        id: 'guide:critical-incidents-test-psras:summary',
        kind: 'guide-summary',
        label: 'summary',
        url: '/guides/critical-incidents-test-psras',
        text: [cit!.summary, cit!.description].join('\n'),
        llmEligible: false,
      },
      {
        id: 'guide:critical-incidents-test-psras:section:0',
        kind: 'guide-section',
        label: 'What the CIT tests',
        url: '/guides/critical-incidents-test-psras',
        text: [cit!.sections[0].heading, ...(cit!.sections[0].paragraphs ?? [])].join('\n'),
        llmEligible: false,
      },
      {
        id: 'guide:critical-incidents-test-psras:section:2',
        kind: 'guide-section',
        label: 'How to approach a CIT answer',
        url: '/guides/critical-incidents-test-psras',
        text: [cit!.sections[2].heading, ...(cit!.sections[2].paragraphs ?? [])].join('\n'),
        llmEligible: false,
      },
      {
        id: 'guide:critical-incidents-test-psras:faq:0',
        kind: 'guide-faq',
        label: 'FAQ CIT same sitting',
        url: '/guides/critical-incidents-test-psras',
        text: `${cit!.faqs[0].question}\n${cit!.faqs[0].answer}`,
        llmEligible: false,
      },
    ];

    for (const unit of units) {
      expect(mockExamProductTruthFail(unit.text!)).toBe(false);
      expect(paceSourcingReview(unit.text!)).toBe(false);
    }
  });

  test('all guide audit units pass editorial sourcing rules', () => {
    const guideKinds = new Set(['guide-summary', 'guide-section', 'guide-faq']);
    const units = buildAllAuditUnits().filter((u) => guideKinds.has(u.kind));
    for (const unit of units) {
      const findings = scanUnitRules(unit);
      const blocked = findings.filter(
        (f) => f.category === 'sourcing' || (f.category === 'prohibited-copy' && f.severity === 'fail'),
      );
      expect(blocked.length).toBe(0);
    }
  });

  test('legacy bare-PACE guide copy fails sourcing (regression)', () => {
    for (const snippet of LEGACY_PACE_SOURCING_SNIPPETS) {
      expect(paceSourcingViolation(snippet.text)).toBe(true);
    }
  });

  test('PACE and Codes of Practice within proximity passes cite check', () => {
    const text =
      'Reps must apply PACE and Codes of Practice — not improvise. That includes custody rights under Code C, appropriate adults for juveniles and vulnerable adults, interpreter needs, and medical assessments where relevant.';
    expect(hasPaceStatutoryCite(text)).toBe(true);
    expect(paceSourcingViolation(text)).toBe(false);
  });

  test('reported guide slugs pass sourcing on every audit unit', () => {
    const slugs = [
      'police-station-representative-role',
      'psras-exam-preparation-tips',
      'psras-portfolio-and-workbook',
    ];
    for (const unit of buildAllAuditUnits()) {
      if (!slugs.some((s) => unit.id.includes(s))) continue;
      const blocked = scanUnitRules(unit).filter((f) => f.category === 'sourcing');
      expect(blocked.length).toBe(0);
    }
  });

  test('all legal-advice and marketing audit units pass sourcing rules', () => {
    const kinds = new Set(['legal-advice', 'marketing-page']);
    for (const unit of buildAllAuditUnits().filter((u) => kinds.has(u.kind))) {
      const loaded = loadUnitText(unit);
      const blocked = scanUnitRules(loaded).filter((f) => f.category === 'sourcing');
      expect(blocked.length).toBe(0);
    }
  });

  test('digest email lists approved and declined decisions with reasons', () => {
    const { subject, text } = formatAuditDigestBody({
      unitsChecked: 2,
      approvedUnits: ['Guide: What is PSRAS'],
      findings: [
        {
          severity: 'auto_fixed',
          category: 'mcq-sourcing',
          message: 'Question quarantined (status → pending)',
          location: 'question:abc',
        },
        {
          severity: 'review',
          category: 'cit-structure',
          message: 'Terminal node missing outcome',
          location: 'cit-demo',
        },
      ],
      llmCalls: 0,
      autoFixedDb: 1,
      cursorBefore: 0,
      cursorAfter: 12,
      totalUnits: 100,
      batchLabels: ['guides', 'mcq-batch-1'],
    });

    expect(subject).toMatch(/declined/i);
    expect(text).toContain('APPROVED (passed audit)');
    expect(text).toContain('Guide: What is PSRAS');
    expect(text).toContain('DECLINED (action taken or blocked)');
    expect(text).toContain('quarantined / removed from live content');
    expect(text).toContain('FLAGGED (needs your review');
    expect(text).toContain('manual review');
  });
});
