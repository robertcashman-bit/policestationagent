import { describe, expect, test } from 'vitest';
import { scanQuestionRules } from '../../lib/editorial-audit/rules.ts';

const WEAK = /\b(always|never|illegal|refuse completely)\b/i;

describe('weak distractor rule', () => {
  test('flags absolute language in options', () => {
    const findings = scanQuestionRules({
      id: 'x',
      question_text: 'When may detention be delayed?',
      explanation: 'A sufficiently long explanation that teaches the rule and its limits clearly.',
      source_refs: ['PACE 1984 s.56'],
      options: { A: 'Never', B: 'When a superintendent authorises it', C: 'Always', D: 'At will' },
    });
    expect(findings.some((f) => f.category === 'mcq-quality' && /weak distractor/i.test(f.message))).toBeTruthy();
  });

  test('passes clean plausible distractors', () => {
    const findings = scanQuestionRules({
      id: 'y',
      question_text: 'When may detention be delayed?',
      explanation: 'A sufficiently long explanation that teaches the rule and its limits clearly.',
      source_refs: ['PACE 1984 s.56'],
      options: {
        A: 'For any offence at the custody officer\'s discretion',
        B: 'For indictable offences where a superintendent authorises delay on specified grounds',
        C: 'Only for summary offences',
        D: 'On the investigating officer\'s request',
      },
    });
    expect(findings.filter((f) => /weak distractor/i.test(f.message)).length).toBe(0);
  });
});

describe('seed question bank distractor quality', () => {
  test('no generated question uses weak absolute distractor language in stem or options', async () => {
    const mod = await import('../../scripts/build-all-questions-sql.mjs');
    const qs = mod.buildQuestionList();
    const offenders: string[] = [];

    for (const q of qs) {
      const optionText = ['a', 'b', 'c', 'd']
        .map((k) => q[k])
        .filter((v) => typeof v === 'string')
        .join(' \u2022 ');
      if (WEAK.test(optionText) || WEAK.test(q.stem ?? '')) {
        offenders.push(q.stem);
      }
    }

    expect(offenders.length).toBe(0);
  });
});
