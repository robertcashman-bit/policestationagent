import { expect, test } from 'vitest';
import {
  getAllLegalAdviceArticles,
  getAllLegalAdvicePaths,
  getLegalAdviceArticle,
  legalAdvicePath,
} from '../../lib/legal-advice/content.ts';
import { generateLlmsTxt } from '../../lib/llms/generate.ts';

test('legal advice registry has unique paths', () => {
  const paths = getAllLegalAdvicePaths();
  expect(new Set(paths).size).toBe(paths.length);
  expect(paths.length >= 4).toBeTruthy();
});

test('legal advice articles resolve by category + slug', () => {
  const article = getLegalAdviceArticle('police-interviews', 'do-i-have-to-answer-police-questions');
  expect(article).toBeTruthy();
  expect(legalAdvicePath(article!)).toBe('/legal-advice/police-interviews/do-i-have-to-answer-police-questions');
});

test('legal advice articles have FAQs', () => {
  for (const article of getAllLegalAdviceArticles()) {
    expect(article.faqs.length >= 3).toBeTruthy();
  }
});

test('llms.txt includes legal advice and blog', () => {
  const body = generateLlmsTxt();
  expect(body).toMatch(/legal advice/i);
  expect(body).toMatch(/\/blog\//);
  expect(body).toMatch(/llms-full\.txt/);
});
