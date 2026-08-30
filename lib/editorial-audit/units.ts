import fs from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/blog-reader';
import { getPostBySlug as getSqlPostBySlug } from '@/lib/blog';
import { EDITORIAL_PAGE_PATHS, FEE_RIGHTS_PATHS, SERVICES_PATHS } from './constants';
import type { AuditUnit, ContentType } from './types';

const ROOT = process.cwd();

const LLM_ELIGIBLE_TYPES = new Set<ContentType>([
  'blog',
  'guide',
  'fee-rights',
  'services',
]);

function readText(filePath: string): string {
  const full = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
  if (!fs.existsSync(full)) return '';
  return fs.readFileSync(full, 'utf8');
}

export function splitMarkdownSections(markdown: string): Array<{ title: string; text: string }> {
  const parts = markdown.split(/^## /m);
  if (parts.length <= 1) {
    const trimmed = markdown.trim();
    return trimmed ? [{ title: '(whole page)', text: trimmed }] : [];
  }

  const preamble = parts[0]?.trim();
  const sections: Array<{ title: string; text: string }> = [];

  if (preamble) {
    sections.push({ title: '(introduction)', text: preamble });
  }

  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const nl = chunk.indexOf('\n');
    const title = nl >= 0 ? chunk.slice(0, nl).trim() : chunk.trim();
    const body = nl >= 0 ? chunk.slice(nl + 1).trim() : '';
    sections.push({ title: title || `(section ${i})`, text: body || title });
  }

  return sections.length > 0 ? sections : [{ title: '(whole page)', text: markdown.trim() }];
}

/** Strip tags lightly for rule scanning of HTML blog/page source. */
export function htmlToScanText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeUnit(
  contentType: ContentType,
  url: string,
  sourceFile: string,
  sectionIndex: number,
  sectionTitle: string,
  text: string,
): AuditUnit {
  return {
    id: `${contentType}:${url}:${sectionIndex}`,
    url,
    contentType,
    sourceFile,
    sectionTitle,
    sectionIndex,
    text,
    llmEligible: LLM_ELIGIBLE_TYPES.has(contentType),
  };
}

function pageCompliance(pagePath: string): { sourceFile: string } {
  const segment = pagePath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT, 'app', segment, 'page.tsx'),
    path.join(ROOT, 'app', segment, '[slug]', 'page.tsx'),
  ];
  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) {
    return { sourceFile: `app/${segment}/page.tsx (missing)` };
  }
  return { sourceFile: path.relative(ROOT, filePath) };
}

function blogBodyForSlug(slug: string, contentHtml: string | undefined): string {
  if (contentHtml?.trim()) return htmlToScanText(contentHtml);
  const sql = getSqlPostBySlug(slug);
  const raw = [sql?.content, sql?.excerpt].filter(Boolean).join('\n');
  return htmlToScanText(raw);
}

/** Build all section-level audit units, sorted for stable cursor rotation. */
export function buildAllUnits(): AuditUnit[] {
  const units: AuditUnit[] = [];

  for (const article of getAllPosts()) {
    const url = `/blog/${article.slug}`;
    const fullText = blogBodyForSlug(article.slug, article.contentHtml);
    if (!fullText) continue;
    const sections = splitMarkdownSections(fullText);
    sections.forEach((s, i) => {
      units.push(makeUnit('blog', url, 'lib/blog-reader.ts', i, s.title, s.text));
    });
  }

  for (const pagePath of EDITORIAL_PAGE_PATHS) {
    const compliance = pageCompliance(pagePath);
    const pageSrc = readText(compliance.sourceFile);
    const text = htmlToScanText(pageSrc) || pageSrc;
    let contentType: ContentType = 'guide';
    if (FEE_RIGHTS_PATHS.has(pagePath)) contentType = 'fee-rights';
    else if (SERVICES_PATHS.has(pagePath)) contentType = 'services';
    units.push(
      makeUnit(contentType, pagePath, compliance.sourceFile, 0, '(whole page)', text),
    );
  }

  return units.sort((a, b) => {
    const typeOrder = (t: ContentType) =>
      ({
        blog: 0,
        wiki: 1,
        'legal-update': 2,
        guide: 3,
        'fee-rights': 4,
        services: 5,
      })[t] ?? 9;
    const tc = typeOrder(a.contentType) - typeOrder(b.contentType);
    if (tc !== 0) return tc;
    const uc = a.url.localeCompare(b.url);
    if (uc !== 0) return uc;
    return a.sectionIndex - b.sectionIndex;
  });
}

/**
 * True when a public path is excluded from this audit (other pipelines cover them).
 * Blog posts stay in-scope even if the slug mentions a station name.
 * Editorial guides that happen to end in `-police-station` (e.g. DNA fingerprints) stay in-scope.
 */
export function isExcludedFromEditorialAudit(urlPath: string): boolean {
  const p = urlPath.toLowerCase().split('?')[0] ?? '';
  if (p.startsWith('/blog/')) return false;
  if ((EDITORIAL_PAGE_PATHS as readonly string[]).includes(p)) return false;

  if (p.includes('/coverage/police-stations/')) return true;
  if (/^\/[a-z0-9-]+-psa-station$/.test(p)) return true;
  if (/^\/police-station-agent-/.test(p)) return true;
  if (/^\/police-station-rep-/.test(p)) return true;
  // Geographic custody station landing pages only (not content guides already allowlisted above)
  if (/^\/[a-z0-9-]+-police-station$/.test(p)) return true;
  if (/^\/[a-z0-9-]+-solicitor$/.test(p)) return true;
  if (
    p.includes('helpusstation') ||
    p.includes('updatestation') ||
    p.includes('custody-number') ||
    p.includes('station-number')
  ) {
    return true;
  }
  return false;
}
