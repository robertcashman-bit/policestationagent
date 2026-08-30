/**
 * Canonical LAA police-station / magistrates rates for editorial audits.
 * Ported for fee-check against claims this site may make (Legal Aid free at
 * the police station; SI 2025/1251 harmonised rates). Do not invent figures.
 * Figures: SI 2025/1251 (in force 22 Dec 2025).
 */

export const LAA_SI_CITATION = 'SI 2025/1251';
export const LAA_SI_IN_FORCE = '22 December 2025';

/** Harmonised police-station fixed fee (all schemes), UFNs on/after 22 Dec 2025. */
export const POLICE_STATION_FIXED_FEE = 320;

/** Unified escape threshold — claim hourly rates above this profit-cost total. */
export const POLICE_STATION_ESCAPE_THRESHOLD = 650;

/** Superseded pre-harmonisation fixed fees (must not appear as current rates). */
export const SUPERSEDED_POLICE_STATION_FIXED_FEES = [181, 219] as const;

/** Sample magistrates Category 1A designated-area standard fees (SI 2025/1251). */
export const MAGISTRATES_CAT_1A = {
  lowerStandard: 314.62,
  higherStandard: 344.51,
  nonStandard: 596.84,
  undesignatedHigher: 596.89,
} as const;

/**
 * Agency attendance rates published on /servicerates (legally aided matters).
 * These are this practice's agency rates — not LAA fixed fees.
 */
export const PSA_AGENCY_STANDARD_ATTENDANCE_FEE = 160;
export const PSA_AGENCY_BAIL_TO_RETURN_FEE = 80;

export function formatGbp(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

export function formatGbpWhole(amount: number): string {
  return Number.isInteger(amount) ? `£${amount}` : formatGbp(amount);
}
