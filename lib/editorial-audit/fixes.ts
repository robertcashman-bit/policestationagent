/** Actionable fix guidance keyed by red-flag code (digest metadata only). */
export const PROPOSED_FIXES: Record<string, string> = {
  'legacy-bail-28-days':
    'Replace 0–28 day / 28-day–3-month bail tables with the PCSC Act 2022 authorised bail period limits (initial 3 months, extensions to 6/9 months, magistrates’ court thereafter).',
  'bail-act-2024':
    'Remove references to "Bail Act 2024" and cite Police, Crime, Sentencing and Courts Act 2022 Schedule 4 (pre-charge bail).',
  'fee-181':
    'Replace £181 with the harmonised police-station fixed fee from SI 2025/1251 (in force 22 Dec 2025) and cite the SI.',
  'fee-219':
    'Replace £219 with the harmonised police-station fixed fee from SI 2025/1251 (in force 22 Dec 2025) and cite the SI.',
  'crm6-billing':
    'Replace CRM6 with SaBC/INVC for police-station claims; mention CRM18 only for escape-fee applications.',
  'fee-320-no-date':
    'Add "from 22 December 2025" and cite SI 2025/1251 alongside the £320 harmonised fixed fee.',
  'fee-650-escape-no-date':
    'Add SI 2025/1251 / 22 Dec 2025 context when citing the £650 escape threshold.',
  'si-2025-no-date':
    'State that SI 2025/1251 is in force from 22 December 2025 when citing the regulations.',
  'firm-phone-digits':
    'Remove firm telephone digits from indexable HTML; keep contact pathways and client-only QualifiedPhoneReveal.',
  'claim-24-7':
    'Replace 24/7 wording with "extended hours".',
  'claim-35-years':
    'Use "30 years plus" / "30+" experience wording — not 35+.',
  'maidstone-custody-suite':
    'State Maidstone is VAI / voluntary interviews only; custody suite closed — not a public custody suite.',
  'we-are-the-police':
    'Clarify this is independent defence representation — not the police.',
  'continuous-court-representation':
    'Clarify court work is via Tuckers handover, not continuous representation by this practice.',
  'citation-ath': 'Remove ATH v R — unverifiable citation.',
  'citation-dobson-bwv': 'Remove or correct the R v Dobson BWV attribution.',
  'citation-dhesi': 'Remove the Dhesi citation or replace with a verifiable authority.',
  'citation-ghosh': 'Replace R v Ghosh with Ivey v Genting Casinos [2017] UKSC 67 for dishonesty.',
  'unregistered-case':
    'Add the case to data/legal-case-registry.json after verifying the citation, or remove/replace with a registered authority.',
  'pace-sourcing':
    'Add a statutory or Code cite (e.g. PACE 1984, Code C, s.56) when referring to PACE in substantive copy.',
  'missing-content-sources-map':
    'Add a dedicated PAGE_PATH / BLOG_SLUG entry in lib/content-sources.ts for this slug/path.',
  'fee-rate-mismatch-police-station':
    'Align the police-station fixed fee with lib/laa-rates.ts (POLICE_STATION_FIXED_FEE / SI 2025/1251).',
  'fee-rate-mismatch-escape':
    'Align the escape threshold with lib/laa-rates.ts (POLICE_STATION_ESCAPE_THRESHOLD / SI 2025/1251).',
  'fee-rate-mismatch-magistrates-1a':
    'Align Magistrates Category 1A figures with MAGISTRATES_CAT_1A in lib/laa-rates.ts.',
  'fee-rate-mismatch-181':
    'Replace £181 with the harmonised £320 fixed fee from lib/laa-rates.ts / SI 2025/1251.',
  'fee-rate-mismatch-219':
    'Replace £219 with the harmonised £320 fixed fee from lib/laa-rates.ts / SI 2025/1251.',
  'live-url-http-error':
    'Investigate the live URL HTTP error and restore a healthy public page response.',
  'live-url-missing-title':
    'Ensure the public page renders a non-empty <title> tag.',
  'live-url-fetch-failed':
    'Investigate why the live URL fetch failed (DNS, timeout, or TLS).',
  'llm-fact-check':
    'Review the LLM-flagged claim against primary sources; apply the suggested fix only if verified (manual — not auto-applied).',
  'llm-unparseable':
    'Re-run the audit or inspect the LLM response; treat as a review item.',
  'llm-check-failed':
    'Check OPENAI_API_KEY / quota; rules and source findings still stand without the LLM pass.',
};

export function proposedFixForCode(code: string): string {
  return (
    PROPOSED_FIXES[code] ??
    'Review the flagged excerpt against current legislation, PACE Codes, and SI 2025/1251 / LAA sources.'
  );
}
