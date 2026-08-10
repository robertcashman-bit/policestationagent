import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { findUnknownCaseCitations } from './case-law-registry';
import { paceSourcingViolation } from './pace-sourcing';
import { PROHIBITED_PATTERNS } from './prohibited';
import type { AuditFinding, AuditUnit } from './types';

const WEAK_DISTRACTOR = /\b(always|never|illegal|refuse completely)\b/i;

export function scanTextRules(text: string, unit: AuditUnit): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const location = unit.url ?? unit.sourcePath ?? unit.id;

  for (const { pattern, label } of PROHIBITED_PATTERNS) {
    if (pattern.test(text)) {
      findings.push({
        severity: 'fail',
        category: 'prohibited-copy',
        message: `Prohibited phrase: ${label}`,
        location,
      });
    }
  }

  if (/\bmock exams?\b/i.test(text) && !existsSync(join(process.cwd(), 'app/(main)/mock-exam/page.tsx'))) {
    findings.push({
      severity: 'fail',
      category: 'product-truth',
      message: 'Copy mentions mock exams but /mock-exam route does not exist',
      location,
    });
  }

  if (/500\+/.test(text)) {
    findings.push({
      severity: 'review',
      category: 'product-truth',
      message: 'Copy claims "500+" questions — verify count matches live database',
      location,
    });
  }

  for (const citation of findUnknownCaseCitations(text)) {
    findings.push({
      severity: 'review',
      category: 'case-law',
      message: `Unregistered case citation: ${citation}`,
      location,
    });
  }

  if (paceSourcingViolation(text)) {
    findings.push({
      severity: 'review',
      category: 'sourcing',
      message: 'References PACE without a specific Code section or statutory cite',
      location,
    });
  }

  return findings;
}

export function scanQuestionRules(question: {
  id: string;
  question_text: string;
  explanation: string | null;
  source_refs: string[] | null;
  options: unknown;
}): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const loc = `question:${question.id}`;

  if (!question.source_refs?.length) {
    findings.push({
      severity: 'fail',
      category: 'mcq-sourcing',
      message: 'Question missing source_refs',
      location: loc,
      metadata: { questionId: question.id },
    });
  }

  if (!question.explanation || question.explanation.trim().length < 40) {
    findings.push({
      severity: 'review',
      category: 'mcq-quality',
      message: 'Explanation missing or too short',
      location: loc,
      metadata: { questionId: question.id },
    });
  }

  const opts = JSON.stringify(question.options ?? {});
  if (WEAK_DISTRACTOR.test(opts) || WEAK_DISTRACTOR.test(question.question_text)) {
    findings.push({
      severity: 'review',
      category: 'mcq-quality',
      message: 'Weak distractor language (always/never/illegal)',
      location: loc,
      metadata: { questionId: question.id },
    });
  }

  return findings;
}

export function scanUnitRules(unit: AuditUnit): AuditFinding[] {
  if (unit.text) return scanTextRules(unit.text, unit);
  return [];
}

export function hasRuleFlags(findings: AuditFinding[]): boolean {
  return findings.some((f) => f.severity === 'fail' || f.severity === 'review');
}
