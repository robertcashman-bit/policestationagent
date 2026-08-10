import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { GUIDES } from '@/lib/guides/content';
import {
  LEGAL_ADVICE_ARTICLES,
  legalAdviceAuditText,
  legalAdvicePath,
} from '@/lib/legal-advice/content';
import { getAuditConfig } from './config';
import type { AuditUnit } from './types';
import { extractTextFromTsx } from './extract-text';
import { selectAuditBatch } from '@/lib/editorial-audit/rotation';

export { selectAuditBatch };

const MARKETING_PAGES: { id: string; path: string; url: string }[] = [
  { id: 'page:home', path: 'app/page.tsx', url: '/' },
  { id: 'page:pricing', path: 'app/pricing/page.tsx', url: '/pricing' },
  { id: 'page:training', path: 'app/training/page.tsx', url: '/training' },
  { id: 'page:features', path: 'app/features/page.tsx', url: '/features' },
  { id: 'page:guides-hub', path: 'app/guides/page.tsx', url: '/guides' },
  { id: 'page:faq', path: 'app/legal/faq/page.tsx', url: '/legal/faq' },
  { id: 'page:about', path: 'app/legal/about/page.tsx', url: '/legal/about' },
];

const LEGAL_ADVICE_PAGES: { id: string; path: string; url: string }[] = [
  {
    id: 'legal-advice:hub',
    path: 'app/legal-advice/page.tsx',
    url: '/legal-advice',
  },
  ...LEGAL_ADVICE_ARTICLES.map((article) => ({
    id: `legal-advice:${article.slug}`,
    path: `app/legal-advice/[categorySlug]/[slug]/page.tsx`,
    url: legalAdvicePath(article),
  })),
];

const LIVE_URLS = [
  '',
  '/pricing',
  '/training',
  '/features',
  '/guides',
  '/legal/faq',
  '/legal/contact',
  '/legal-advice',
  '/guides/what-is-psras',
  '/guides/how-to-become-a-police-station-representative',
  '/legal-advice/police-interviews/do-i-have-to-answer-police-questions',
];

function guideLlmEligible(): boolean {
  return getAuditConfig().llmOnKinds.has('guide');
}

function legalAdviceLlmEligible(): boolean {
  return getAuditConfig().llmOnKinds.has('legal-advice');
}

export function buildAllAuditUnits(): AuditUnit[] {
  const units: AuditUnit[] = [];

  for (const guide of GUIDES) {
    units.push({
      id: `guide:${guide.slug}:summary`,
      kind: 'guide-summary',
      label: `${guide.slug} — summary`,
      url: `/guides/${guide.slug}`,
      text: [guide.summary, guide.description].join('\n'),
      llmEligible: guideLlmEligible(),
    });

    guide.sections.forEach((section, i) => {
      const parts = [
        section.heading,
        ...(section.paragraphs ?? []),
        ...(section.bullets ?? []),
      ];
      units.push({
        id: `guide:${guide.slug}:section:${i}`,
        kind: 'guide-section',
        label: `${guide.slug} — ${section.heading}`,
        url: `/guides/${guide.slug}`,
        text: parts.join('\n'),
        llmEligible: guideLlmEligible(),
      });
    });

    guide.faqs.forEach((faq, i) => {
      units.push({
        id: `guide:${guide.slug}:faq:${i}`,
        kind: 'guide-faq',
        label: `${guide.slug} — FAQ: ${faq.question.slice(0, 40)}`,
        url: `/guides/${guide.slug}`,
        text: `${faq.question}\n${faq.answer}`,
        llmEligible: guideLlmEligible(),
      });
    });
  }

  for (const page of LEGAL_ADVICE_PAGES) {
    const article = LEGAL_ADVICE_ARTICLES.find((a) => legalAdvicePath(a) === page.url);
    units.push({
      id: page.id,
      kind: 'legal-advice',
      label: page.url,
      url: page.url,
      sourcePath: article ? undefined : page.path,
      text: article ? legalAdviceAuditText(article) : undefined,
      llmEligible: legalAdviceLlmEligible(),
    });
  }

  for (const page of MARKETING_PAGES) {
    units.push({
      id: page.id,
      kind: 'marketing-page',
      label: page.url,
      url: page.url,
      sourcePath: page.path,
      llmEligible: false,
    });
  }

  const { estimatedQuestionBatches } = getAuditConfig();
  for (let i = 0; i < estimatedQuestionBatches; i++) {
    units.push({
      id: `questions:batch:${i}`,
      kind: 'question-batch',
      label: `Questions batch ${i + 1}`,
      llmEligible: false,
      meta: { batchIndex: i },
    });
  }

  for (let i = 0; i < 12; i++) {
    units.push({
      id: `cit:index:${i}`,
      kind: 'cit-scenario',
      label: `CIT scenario slot ${i + 1}`,
      llmEligible: false,
      meta: { slotIndex: i },
    });
  }

  for (const urlPath of LIVE_URLS) {
    units.push({
      id: `live:${urlPath || '/'}`,
      kind: 'live-url',
      label: urlPath || '/',
      url: urlPath || '/',
      llmEligible: false,
    });
  }

  return units.sort((a, b) => a.id.localeCompare(b.id));
}

export function loadUnitText(unit: AuditUnit, root = process.cwd()): AuditUnit {
  if (unit.text) return unit;
  if (unit.sourcePath) {
    const full = join(root, unit.sourcePath);
    if (existsSync(full)) {
      return { ...unit, text: extractTextFromTsx(readFileSync(full, 'utf8')) };
    }
  }
  return unit;
}
