export type ProhibitedPattern = { pattern: RegExp; label: string };

export const PROHIBITED_PATTERNS: ProhibitedPattern[] = [
  { pattern: /0300\s*300\s*3877/i, label: '0300 300 3877' },
  { pattern: /call the DSCC/i, label: 'call the DSCC' },
  { pattern: /call the Defence Solicitor Call Centre/i, label: 'call the Defence Solicitor Call Centre' },
  { pattern: /Pass PSRAS with Confidence/i, label: 'Pass PSRAS with Confidence' },
  { pattern: /PSRAS-ready/i, label: 'PSRAS-ready' },
  { pattern: /guaranteed pass/i, label: 'guaranteed pass' },
  { pattern: /comprehensive, accurate/i, label: 'comprehensive, accurate' },
  { pattern: /accurate, up-to-date/i, label: 'accurate, up-to-date' },
  { pattern: /full company details are available on request/i, label: 'full company details are available on request' },
  { pattern: /typically within 36 hours/i, label: 'typically within 36 hours' },
  { pattern: /warrant for your arrest/i, label: 'warrant for your arrest' },
];
