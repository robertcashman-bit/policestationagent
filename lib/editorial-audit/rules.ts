import fs from 'fs';
import path from 'path';
import type { RedFlag } from './types';

type CaseEntry = {
  id: string;
  citations: string[];
  officialUrl?: string | null;
  verifiedHolding?: string;
  bailiiUrl?: string | null;
};

function loadVerifiedCases(): CaseEntry[] {
  try {
    const file = path.join(process.cwd(), 'data', 'legal-case-registry.json');
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8')) as CaseEntry[];
  } catch {
    return [];
  }
}

const VERIFIED_CASES = loadVerifiedCases();

export const RED_FLAG_RULES: Array<{
  code: string;
  severity: 'PROBLEM' | 'REVIEW';
  re: RegExp;
  message: string;
  skip?: RegExp;
}> = [
  {
    code: 'legacy-bail-28-days',
    severity: 'PROBLEM',
    re: /0-28 days.*(?:Initial bail|bail period)|28 days-3 months.*(?:First extension|Inspector)/i,
    message:
      'Legacy pre-2022 pre-charge bail limits — use PCSC Act 2022 ABP regime (3/6/9 months + magistrates’ court)',
  },
  {
    code: 'bail-act-2024',
    severity: 'PROBLEM',
    re: /Bail Act 2024/i,
    message: 'Non-existent "Bail Act 2024" — use PCSC Act 2022 Sch. 4',
  },
  {
    code: 'fee-181',
    severity: 'PROBLEM',
    re: /£181\b/,
    message: 'Superseded £181 police-station fee — use SI 2025/1251 harmonised rates',
  },
  {
    code: 'fee-219',
    severity: 'PROBLEM',
    re: /£219\b/,
    message: 'Superseded £219 police-station fee — use SI 2025/1251 harmonised rates',
  },
  {
    code: 'crm6-billing',
    severity: 'PROBLEM',
    re: /\bCRM6\b/,
    message: 'CRM6 is not the police-station billing form — use SaBC/INVC (+ CRM18 escape)',
  },
  {
    code: 'fee-320-no-date',
    severity: 'REVIEW',
    re: /£320/,
    skip: /22\s+Dec(?:ember)?\s+2025|SI 2025\/1251|from 22|December 2025|Dec 2025 onwards|harmonised fixed fee/i,
    message: '£320 fee figure without SI 2025/1251 / 22 Dec 2025 effective-date context',
  },
  {
    code: 'fee-650-escape-no-date',
    severity: 'REVIEW',
    re: /£650/,
    skip:
      /22\s+Dec(?:ember)?\s+2025|SI 2025\/1251|from 22|December 2025|indicative £450|provider timetable|CIT resit|assessment fee|PSRAS/i,
    message: '£650 escape-threshold figure without SI 2025/1251 / 22 Dec 2025 context',
  },
  {
    code: 'si-2025-no-date',
    severity: 'REVIEW',
    re: /SI 2025\/1251/,
    skip: /22\s+Dec(?:ember)?\s+2025|in force from 22/i,
    message: 'SI 2025/1251 cited without in-force date context',
  },
  // —— PSA locked public facts (scanner only; do not rewrite live copy from findings) ——
  {
    code: 'firm-phone-digits',
    severity: 'PROBLEM',
    re: /01732\s*247\s*427|01732247427|07535\s*494\s*446|07535494446|\+44\s*1732\s*247\s*427|\+44\s*7535\s*494\s*446|tel:\s*0?1732|tel:\s*0?7535|sms:\s*0?7535/i,
    message:
      'Firm telephone digits must not appear in indexable HTML — use contact pathways / QualifiedPhoneReveal only',
  },
  {
    code: 'claim-24-7',
    severity: 'PROBLEM',
    re: /\b24\s*\/\s*7\b|\b24-7\b|\btwenty[\s-]?four\s*hours?\b/i,
    skip: /not\s+24\s*\/\s*7|not\s+24-7|extended hours|not around the clock/i,
    message: 'Public hours are "extended hours", not 24/7',
  },
  {
    code: 'claim-35-years',
    severity: 'PROBLEM',
    re: /\b3[5-9]\+?\s*years?\b|\b(?:over|more than)\s+3[5-9]\s*years?\b|\b35\s*years?\s*plus\b/i,
    message: 'Experience claim must stay "30 years plus" / "30+" — not 35+',
  },
  {
    code: 'maidstone-custody-suite',
    severity: 'PROBLEM',
    re: /Maidstone[^.]{0,80}(?:custody suite|open custody|public custody)|(?:custody suite|public custody)[^.]{0,80}Maidstone/i,
    skip: /not a (?:public )?custody|custody closed|VAI|voluntary interview only|no longer (?:holds|takes) custody/i,
    message:
      'Maidstone is not a public custody suite (VAI / voluntary interviews only; custody closed)',
  },
  {
    code: 'we-are-the-police',
    severity: 'PROBLEM',
    re: /\bwe are (?:the )?police\b|\bpolice station agent is (?:a |the )?police\b|\bour officers\b/i,
    skip: /not the police|we are not (?:the )?police|independent of (?:the )?police/i,
    message: 'This practice is not the police — remove police-identity wording',
  },
  {
    code: 'continuous-court-representation',
    severity: 'REVIEW',
    re: /(?:we|our (?:firm|practice))[^.]{0,60}(?:represent|representation)[^.]{0,60}(?:throughout|all the way (?:through|to)|continuous(?:ly)?)[^.]{0,40}court/i,
    skip: /Tuckers|handover|refer(?:ral)? to|instruct(?:ed)? (?:a )?solicitor/i,
    message:
      'Court work is Tuckers handover, not continuous representation by this practice — verify wording',
  },
];

export const KNOWN_BAD_CITATIONS: Array<{ code: string; re: RegExp; message: string }> = [
  { code: 'citation-ath', re: /\bATH v R\b/i, message: 'Removed hallucinated ATH v R citation' },
  {
    code: 'citation-dobson-bwv',
    re: /R v Dobson.*BWV|BWV.*R v Dobson/i,
    message: 'Misattributed R v Dobson BWV citation',
  },
  {
    code: 'citation-dhesi',
    re: /ex parte Dhesi|Inland Revenue.*Dhesi/i,
    message: 'Removed unverifiable Dhesi citation',
  },
  {
    code: 'citation-ghosh',
    re: /\bR v Ghosh\b/i,
    message: 'Ghosh dishonesty test superseded by Ivey v Genting Casinos',
  },
];

const REGISTERED_NAMES = new Set(
  VERIFIED_CASES.flatMap((c) => c.citations.map((n) => n.toLowerCase())),
);

export function excerpt(text: string, index: number, len = 80): string {
  const start = Math.max(0, index - 30);
  return text.slice(start, start + len).replace(/\s+/g, ' ').trim();
}

function normalizeCaseName(name: string): string {
  return name
    .replace(/\*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\bex p\b/gi, 'ex parte')
    .trim()
    .toLowerCase();
}

function isRegisteredCase(rawName: string): boolean {
  const key = normalizeCaseName(rawName);
  if (REGISTERED_NAMES.has(key)) return true;
  return VERIFIED_CASES.some((c) =>
    c.citations.some((cit) => {
      const reg = cit.toLowerCase();
      return reg === key || reg.startsWith(key) || key.startsWith(reg);
    }),
  );
}

function findUnregisteredCaseCitations(text: string): RedFlag[] {
  const flags: RedFlag[] = [];
  const re =
    /\*?(R v [A-Z][a-zA-Z'.\-]+(?:\s+(?:and\s+)?[A-Za-z'.\-]+)*|R \(Bright\) v Central Criminal Court|DPP v [A-Z][a-zA-Z'.\-]+(?:\s+[A-Za-z'.\-]+)*)\*?\s*(\[[^\]]+\])?/gi;
  let m: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((m = re.exec(text)) !== null) {
    const rawName = m[1].replace(/\*/g, '').trim();
    const key = normalizeCaseName(rawName);
    if (seen.has(key)) continue;
    seen.add(key);
    if (isRegisteredCase(rawName)) continue;
    if (/R v Smith|R v Jones|R v Example/i.test(rawName)) continue;
    flags.push({
      severity: 'REVIEW',
      code: 'unregistered-case',
      message: `Case citation not in legal-case-registry: ${rawName}${m[2] ?? ''}`,
      excerpt: excerpt(text, m.index),
    });
  }
  return flags;
}

export function scanText(text: string): RedFlag[] {
  const flags: RedFlag[] = [];
  for (const rule of RED_FLAG_RULES) {
    const m = rule.re.exec(text);
    if (!m) continue;
    if (rule.skip?.test(text)) continue;
    flags.push({
      severity: rule.severity,
      code: rule.code,
      message: rule.message,
      excerpt: excerpt(text, m.index),
    });
  }
  for (const bad of KNOWN_BAD_CITATIONS) {
    const m = bad.re.exec(text);
    if (m) {
      flags.push({
        severity: 'PROBLEM',
        code: bad.code,
        message: bad.message,
        excerpt: excerpt(text, m.index),
      });
    }
  }
  flags.push(...findUnregisteredCaseCitations(text));
  return flags;
}
