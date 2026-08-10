import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type FilePatch = { path: string; content: string; reason: string };

export function collectSafeFixPatches(questionCount?: number): FilePatch[] {
  const patches: FilePatch[] = [];
  const root = process.cwd();

  const homePath = 'app/page.tsx';
  const homeFull = join(root, homePath);
  if (existsSync(homeFull)) {
    let content = readFileSync(homeFull, 'utf8');
    if (content.includes("'500+'") && questionCount != null && questionCount < 500) {
      const replacement = questionCount >= 280 ? `'${questionCount}+'` : `'290+'`;
      content = content.replace(/'500\+'/g, replacement);
      patches.push({
        path: homePath,
        content,
        reason: `Homepage claimed 500+ but database has ~${questionCount} questions`,
      });
    }
  }

  const mockExamMissing = !existsSync(join(root, 'app/(main)/mock-exam/page.tsx'));
  if (mockExamMissing) {
    const faqPath = 'app/legal/faq/page.tsx';
    const faqFull = join(root, faqPath);
    if (existsSync(faqFull)) {
      let content = readFileSync(faqFull, 'utf8');
      if (/\bmock exams\b/i.test(content)) {
        content = content.replace(/\bmock exams\b/gi, 'practice questions');
        patches.push({
          path: faqPath,
          content,
          reason: 'FAQ mentioned mock exams but route does not exist',
        });
      }
    }
  }

  return patches;
}
