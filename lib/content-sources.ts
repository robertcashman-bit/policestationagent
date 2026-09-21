/**
 * Authoritative source links for PSA content pages the editorial audit scans.
 * Prefer CPS, legislation.gov.uk, gov.uk. Do not invent sources — map real slugs/paths only.
 */

export interface ContentSource {
  label: string;
  href: string;
}

const PACE = {
  label: 'PACE Codes of Practice (A–H)',
  href: 'https://www.gov.uk/guidance/police-and-criminal-evidence-act-1984-pace-codes-of-practice',
};
const PACE_ACT = {
  label: 'Police and Criminal Evidence Act 1984',
  href: 'https://www.legislation.gov.uk/ukpga/1984/60/contents',
};
const PACE_CODE_C = {
  label: 'PACE Code C (2023)',
  href: 'https://www.gov.uk/government/publications/pace-code-c-2023',
};
const CJPOA = {
  label: 'Criminal Justice and Public Order Act 1994',
  href: 'https://www.legislation.gov.uk/ukpga/1994/33/contents',
};
const SCC_2025 = {
  label: 'Standard Crime Contract 2025',
  href: 'https://www.gov.uk/government/publications/standard-crime-contract-2025',
};
const LAA_MANUAL = {
  label: 'LAA — Criminal Legal Aid Manual',
  href: 'https://www.gov.uk/guidance/criminal-legal-aid-manual',
};
const SI_2025_1251 = {
  label: 'Criminal Legal Aid (Remuneration) (Amendment) Regulations 2025 (SI 2025/1251)',
  href: 'https://www.legislation.gov.uk/uksi/2025/1251/made',
};
const CPS_ADVERSE = {
  label: 'CPS — Adverse inferences legal guidance',
  href: 'https://www.cps.gov.uk/legal-guidance/adverse-inferences',
};
const CPS_DISCLOSURE = {
  label: 'CPS — Disclosure Manual',
  href: 'https://www.cps.gov.uk/legal-guidance/disclosure-manual',
};
const AG_DISCLOSURE = {
  label: "Attorney General's Guidelines on Disclosure (2024)",
  href: 'https://www.gov.uk/government/publications/attorney-generals-guidelines-on-disclosure',
};
const CPIA = {
  label: 'Criminal Procedure and Investigations Act 1996',
  href: 'https://www.legislation.gov.uk/ukpga/1996/25/contents',
};
const PCSC_BAIL = {
  label: 'Police, Crime, Sentencing and Courts Act 2022, Sch. 4 (pre-charge bail)',
  href: 'https://www.legislation.gov.uk/ukpga/2022/32/schedule/4/enacted',
};
const PRECHARGE_BAIL = {
  label: 'Pre-charge bail statutory guidance',
  href: 'https://www.gov.uk/government/publications/pre-charge-bail-statutory-guidance/pre-charge-bail-statutory-guidance-accessible',
};
const FIND_LEGAL = {
  label: 'Find legal advice (justice.gov.uk)',
  href: 'https://find-legal-advice.justice.gov.uk/',
};
const LASPO = {
  label: 'Legal Aid, Sentencing and Punishment of Offenders Act 2012',
  href: 'https://www.legislation.gov.uk/ukpga/2012/10/contents',
};
const PSRAS = {
  label: 'Police station representatives and duty solicitors',
  href: 'https://www.gov.uk/guidance/police-station-representatives-and-duty-solicitors',
};
const SRA_PSRAS = {
  label: 'SRA — Police station representative accreditation scheme',
  href: 'https://www.sra.org.uk/solicitors/resources/specific-areas-of-practice/police-station-representative-accreditation-scheme/',
};

function dedupe(sources: ContentSource[]): ContentSource[] {
  const seen = new Set<string>();
  return sources.filter((s) => {
    if (seen.has(s.href)) return false;
    seen.add(s.href);
    return true;
  });
}

/** Real published /blog/[slug] posts with known primary authorities. */
const BLOG_SLUG: Record<string, ContentSource[]> = {
  'voluntary-police-interview-what-it-means-and-why-legal-advice-matters': [
    PACE,
    CJPOA,
    CPS_ADVERSE,
  ],
  'understanding-your-rights-during-a-police-interview-in-kent': [PACE_ACT, PACE_CODE_C, CJPOA],
  'understanding-your-rights-during-police-interview': [PACE_ACT, PACE_CODE_C, CJPOA],
  'what-happens-at-a-police-station-interview-in-kent': [PACE_CODE_C, PACE_ACT, CJPOA],
  'do-i-need-a-solicitor-at-a-police-station-interview': [PACE_ACT, FIND_LEGAL, LASPO],
  'what-is-police-station-representation': [PACE, PSRAS, SCC_2025],
  'what-is-a-police-station-rep': [PACE, PSRAS, SRA_PSRAS],
  'what-s-a-voluntary-police-interview': [PACE, CJPOA, CPS_ADVERSE],
  'police-station-representation': [PACE, PSRAS, SCC_2025],
  'the-police-caution-means-police-station-agent': [CJPOA, CPS_ADVERSE, PACE],
  'police-station-disclosure-by-police-station-agent': [CPIA, AG_DISCLOSURE, CPS_DISCLOSURE],
  'help-the-police-have-contacted-me': [PACE_ACT, CJPOA, FIND_LEGAL],
  'what-is-a-duty-solicitor': [PSRAS, SCC_2025, FIND_LEGAL],
  'have-to-attend-a-police-station': [PACE_ACT, PACE_CODE_C, CJPOA],
  'have-to-attend-a-police-station-part-2': [PACE_ACT, PACE_CODE_C, CJPOA],
  'i-think-i-may-be-arrested-by-the-police-what-should-i-do': [PACE_ACT, FIND_LEGAL, CJPOA],
  'voluntary-interview-at-swanley-police-station': [PACE, CJPOA, CPS_ADVERSE],
  'inside-a-voluntary-police-interview-what-to-expect-part-2': [PACE, CJPOA, CPS_ADVERSE],
  'voluntary-interview-no-further-action': [PCSC_BAIL, PRECHARGE_BAIL, CJPOA],
  'what-does-a-criminal-solicitor-do-part-one-police-station-representation-the-initial-job': [
    PACE,
    PSRAS,
    SCC_2025,
  ],
  'police-samples-after-arrest': [PACE_ACT, PACE_CODE_C],
  'police-samples-following-an-arrest': [PACE_ACT, PACE_CODE_C],
  'police-samples': [PACE_ACT, PACE_CODE_C],
  'understanding-breath-test-samples-police-stations-kent': [PACE_ACT, PACE_CODE_C],
};

const PAGE_PATH: Record<string, ContentSource[]> = {
  '/faq': [PACE, PSRAS, FIND_LEGAL],
  '/f-a-q': [PACE, PSRAS, FIND_LEGAL],
  '/freelegaladvice': [LASPO, SCC_2025, FIND_LEGAL, PACE_ACT],
  '/free-police-station-advice-kent': [LASPO, SCC_2025, FIND_LEGAL, PACE_ACT],
  '/fees': [LASPO, SCC_2025, LAA_MANUAL, FIND_LEGAL],
  '/servicerates': [SCC_2025, SI_2025_1251, LAA_MANUAL],
  '/attendanceterms': [SCC_2025, LAA_MANUAL],
  '/what-is-a-police-station-rep': [PACE, PSRAS, SRA_PSRAS],
  '/whatisapolicestationrep': [PACE, PSRAS, SRA_PSRAS],
  '/what-we-do': [PACE, PSRAS, SCC_2025],
  '/why-use-us': [PACE, PSRAS, FIND_LEGAL],
  '/about': [PSRAS, SRA_PSRAS],
  '/services': [PACE, PSRAS, SCC_2025],
  '/services/police-station-representation': [PACE, PSRAS, SCC_2025],
  '/services/pre-charge-advice': [PCSC_BAIL, PRECHARGE_BAIL, PACE],
  '/services/bail-applications': [PCSC_BAIL, PRECHARGE_BAIL],
  '/coverage': [PACE, FIND_LEGAL],
  '/for-solicitors': [SCC_2025, PSRAS],
  '/forsolicitors': [SCC_2025, PSRAS],
  '/for-clients': [PACE_ACT, FIND_LEGAL, LASPO],
  '/extendedhours': [PSRAS, SCC_2025],
  '/hours': [PSRAS, SCC_2025],
  '/court-representation': [SCC_2025, FIND_LEGAL],
  '/courtrepresentation': [SCC_2025, FIND_LEGAL],
  '/adverse-inference': [CJPOA, CPS_ADVERSE, PACE],
  '/voluntary-police-interview': [PACE, CJPOA, CPS_ADVERSE],
  '/voluntary-interviews': [PACE, CJPOA, CPS_ADVERSE],
  '/your-rights-in-custody': [PACE_ACT, PACE_CODE_C, CJPOA],
  '/police-custody-rights': [PACE_ACT, PACE_CODE_C, CJPOA],
  '/pace-code-c': [PACE_CODE_C, PACE_ACT],
  '/resources/pace-rights-guide': [PACE, PACE_ACT, PACE_CODE_C],
  '/custody-time-limits': [PACE_ACT, PACE_CODE_C],
  '/appropriate-adult': [PACE_CODE_C, PACE_ACT],
  '/no-comment-interview': [CJPOA, CPS_ADVERSE, PACE],
  '/prepared-statements': [CJPOA, CPS_ADVERSE, PACE],
  '/police-bail-explained': [PCSC_BAIL, PRECHARGE_BAIL],
  '/released-under-investigation': [PCSC_BAIL, PRECHARGE_BAIL],
  '/emergency-police-station-representation': [PACE_ACT, FIND_LEGAL, LASPO],
  '/importance-of-early-legal-advice': [PACE_ACT, FIND_LEGAL, LASPO],
  '/after-a-police-interview': [PCSC_BAIL, PRECHARGE_BAIL, CJPOA],
  '/arrested-what-to-do': [PACE_ACT, FIND_LEGAL, CJPOA],
  '/what-to-do-if-a-loved-one-is-arrested': [PACE_ACT, FIND_LEGAL, CJPOA],
  '/what-to-expect-at-a-police-interview-in-kent': [PACE_CODE_C, CJPOA, PACE_ACT],
  '/dna-fingerprints-police-station': [PACE_ACT, PACE_CODE_C],
  '/can-police-take-my-phone': [PACE_ACT, PACE],
  '/booking-in-procedure-in-kent': [PACE_CODE_C, PACE_ACT],
  '/youth-custody-rights': [PACE_CODE_C, PACE_ACT],
  '/vulnerable-adults-in-custody': [PACE_CODE_C, PACE_ACT],
  '/dscc-and-custody-record-support': [PACE_CODE_C, SCC_2025],
  '/accreditedpolicerep': [PSRAS, SRA_PSRAS],
};

const DEFAULT_CONTENT: ContentSource[] = [
  { label: 'legislation.gov.uk', href: 'https://www.legislation.gov.uk/' },
  PACE,
  { label: 'Legal Aid Agency', href: 'https://www.gov.uk/government/organisations/legal-aid-agency' },
  FIND_LEGAL,
];

export type ContentSourceContext =
  | { kind: 'wiki'; slug: string; category: string }
  | { kind: 'blog'; slug: string }
  | { kind: 'legal-update'; slug: string }
  | { kind: 'crawl'; slug: string }
  | { kind: 'page'; path: string };

/** True when the page has a dedicated slug/path map (not only defaults). */
export function hasSlugSpecificSources(ctx: ContentSourceContext): boolean {
  switch (ctx.kind) {
    case 'blog':
      return ctx.slug in BLOG_SLUG;
    case 'page':
      return ctx.path in PAGE_PATH;
    case 'wiki':
    case 'legal-update':
    case 'crawl':
      return false;
  }
}

export function getContentSources(
  ctx: ContentSourceContext,
  extra: ContentSource[] = [],
): ContentSource[] {
  let specific: ContentSource[] = [];
  switch (ctx.kind) {
    case 'blog':
      specific = BLOG_SLUG[ctx.slug] ?? [PACE, PSRAS, FIND_LEGAL];
      break;
    case 'page':
      specific = PAGE_PATH[ctx.path] ?? DEFAULT_CONTENT;
      break;
    case 'wiki':
    case 'legal-update':
    case 'crawl':
      specific = DEFAULT_CONTENT;
      break;
  }
  return dedupe([...specific, ...extra, ...DEFAULT_CONTENT]);
}
