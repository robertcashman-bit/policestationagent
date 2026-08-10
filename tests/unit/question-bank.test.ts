import { describe, expect, test } from 'vitest';

describe('PSR question bank generator', () => {
  test('buildQuestionList returns 280-320 tagged scenario MCQs with complete metadata', async () => {
    const mod = await import('../../scripts/build-all-questions-sql.mjs');
    const qs = mod.buildQuestionList();

    expect(qs.length >= 280 && qs.length <= 320).toBeTruthy();

    const stems = new Set<string>();
    for (const q of qs) {
      expect(q.stem && q.stem.trim().length > 20).toBeTruthy();
      expect(q.category && q.category.trim()).toBeTruthy();
      expect(['beginner', 'intermediate', 'advanced'].includes(q.difficulty)).toBeTruthy();
      expect(['a', 'b', 'c', 'd'].includes(q.correct)).toBeTruthy();

      for (const letter of ['a', 'b', 'c', 'd'] as const) {
        const t = q[letter];
        expect(typeof t === 'string' && t.trim().length >= 8).toBeTruthy();
      }

      expect(q.explanation && q.explanation.trim().length >= 40).toBeTruthy();
      expect(Array.isArray(q.source_refs) && q.source_refs.length > 0).toBeTruthy();

      expect(Array.isArray(q.syllabus_refs) && q.syllabus_refs.length > 0).toBeTruthy();
      for (const ref of q.syllabus_refs) {
        expect(/^U[1-9]\.AO\d(\.[A-Z])?$/.test(ref)).toBeTruthy();
      }

      stems.add(q.stem.trim());
    }

    expect(stems.size).toBe(qs.length);
  });

  test('coverage manifest hits every named PSRAS unit', async () => {
    const mod = await import('../../scripts/build-all-questions-sql.mjs');
    const qs = mod.buildQuestionList();

    const seenUnits = new Set<string>();
    for (const q of qs) {
      for (const ref of q.syllabus_refs ?? []) {
        const m = /^(U[1-9])/.exec(ref);
        if (m) seenUnits.add(m[1]);
      }
    }

    const required = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9'];
    for (const unit of required) {
      expect(seenUnits.has(unit)).toBeTruthy();
    }
  });
});

describe('CIT scenario bank generator', () => {
  test('citScenarios returns >=10 tagged branching scenarios with valid graphs', async () => {
    const mod = await import('../../scripts/cit-scenarios.mjs');
    const all = mod.citScenarios();

    expect(all.length >= 10).toBeTruthy();

    const slugs = new Set<string>();
    for (const s of all) {
      expect(s.slug && /^[a-z0-9-]+$/.test(s.slug)).toBeTruthy();
      expect(!slugs.has(s.slug)).toBeTruthy();
      slugs.add(s.slug);

      expect(s.title && s.title.length > 5).toBeTruthy();
      expect(s.category && s.category.length > 2).toBeTruthy();
      expect(['beginner', 'intermediate', 'advanced'].includes(s.difficulty)).toBeTruthy();
      expect(s.setup && s.setup.length > 40).toBeTruthy();
      expect(Array.isArray(s.syllabus_refs) && s.syllabus_refs.length > 0).toBeTruthy();

      const branches = s.branches;
      expect(branches && branches.start && branches.nodes).toBeTruthy();
      expect(branches.nodes[branches.start]).toBeTruthy();

      // Every choice must point at a node that exists; every non-terminal node must have choices.
      let terminalCount = 0;
      for (const [id, node] of Object.entries(branches.nodes)) {
        if (node.terminal) {
          terminalCount += 1;
          expect(['good', 'mixed', 'bad'].includes(node.outcome ?? '')).toBeTruthy();
          continue;
        }
        expect(Array.isArray(node.choices) && node.choices.length >= 2).toBeTruthy();
        const choiceIds = new Set<string>();
        for (const c of node.choices ?? []) {
          expect(c.id && !choiceIds.has(c.id)).toBeTruthy();
          choiceIds.add(c.id);
          expect(branches.nodes[c.next]).toBeTruthy();
          expect(c.label && c.label.length > 5).toBeTruthy();
          expect(c.feedback && c.feedback.length > 10).toBeTruthy();
          expect(typeof c.score === 'number').toBeTruthy();
        }
      }
      expect(terminalCount >= 1).toBeTruthy();

      expect(Array.isArray(s.learning_points) && s.learning_points.length > 0).toBeTruthy();
      expect(Array.isArray(s.source_refs) && s.source_refs.length > 0).toBeTruthy();
    }
  });
});
