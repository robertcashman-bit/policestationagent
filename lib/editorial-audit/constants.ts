/**
 * Editorial pages scanned by the rotating accuracy audit.
 * Lowercase public routes only (PSA, not RepUK /Blog /Wiki /LegalUpdates).
 * Station pages, firm profiles, and custody-number pages are excluded — other pipelines cover them.
 */
export const EDITORIAL_PAGE_PATHS = [
  '/faq',
  '/f-a-q',
  '/freelegaladvice',
  '/free-police-station-advice-kent',
  '/fees',
  '/servicerates',
  '/attendanceterms',
  '/what-is-a-police-station-rep',
  '/whatisapolicestationrep',
  '/what-we-do',
  '/why-use-us',
  '/about',
  '/services',
  '/services/police-station-representation',
  '/services/pre-charge-advice',
  '/services/bail-applications',
  '/coverage',
  '/for-solicitors',
  '/forsolicitors',
  '/for-clients',
  '/extendedhours',
  '/hours',
  '/court-representation',
  '/courtrepresentation',
  '/adverse-inference',
  '/voluntary-police-interview',
  '/voluntary-interviews',
  '/your-rights-in-custody',
  '/police-custody-rights',
  '/pace-code-c',
  '/resources/pace-rights-guide',
  '/custody-time-limits',
  '/appropriate-adult',
  '/no-comment-interview',
  '/prepared-statements',
  '/police-bail-explained',
  '/released-under-investigation',
  '/emergency-police-station-representation',
  '/importance-of-early-legal-advice',
  '/after-a-police-interview',
  '/arrested-what-to-do',
  '/what-to-do-if-a-loved-one-is-arrested',
  '/what-to-expect-at-a-police-interview-in-kent',
  '/dna-fingerprints-police-station',
  '/can-police-take-my-phone',
  '/booking-in-procedure-in-kent',
  '/youth-custody-rights',
  '/vulnerable-adults-in-custody',
  '/dscc-and-custody-record-support',
  '/accreditedpolicerep',
] as const;

export const FEE_RIGHTS_PATHS = new Set([
  '/fees',
  '/servicerates',
  '/freelegaladvice',
  '/free-police-station-advice-kent',
  '/attendanceterms',
]);

export const SERVICES_PATHS = new Set([
  '/services',
  '/services/police-station-representation',
  '/services/pre-charge-advice',
  '/services/bail-applications',
]);

export const AUDIT_LOG_PATH = 'audit/editorial-audit-runs.md';
