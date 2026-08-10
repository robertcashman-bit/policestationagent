import { COMPANY, FOOTER_LEGAL_ENTITY_TEXT, FOOTER_LEGAL_SHORT } from '@/lib/legalCopy';

/**
 * Central site metadata used in legal pages, footer, and marketing.
 * Update this file (not the pages) to change contact details or legal wording
 * in one place.
 */
export const SITE = {
  name: 'PSR Train',
  domain: 'psrtrain.com',
  url: 'https://psrtrain.com',
  contactEmail: 'robertdavidcashman@gmail.com',

  // Commercial/legal facts. Edit COMPANY in lib/legalCopy.ts when details change.
  legalOperator: COMPANY.legalName,
  legalOperatorNote: FOOTER_LEGAL_ENTITY_TEXT,
  footerLegalShort: FOOTER_LEGAL_SHORT,
  registeredOffice: COMPANY.registeredOffice,
  vatNumber: COMPANY.vatNumberDisplay,
  vatStatus: `Prices shown are in GBP. Where VAT applies, it is included in the price shown. VAT registration number: ${COMPANY.vatNumberDisplay}.`,
  governingLaw: 'the laws of England and Wales',
  jurisdiction: 'the courts of England and Wales',

  // Last update for legal pages. Keep ISO-like format for consistency.
  legalUpdated: '16 May 2026',

  // Useful external references.
  ico: 'https://ico.org.uk/make-a-complaint',

  // Third-party sub-processors referenced in the privacy policy.
  subprocessors: [
    { name: 'Supabase', purpose: 'authentication and database hosting' },
    { name: 'Vercel', purpose: 'application hosting and edge delivery' },
    { name: 'Resend', purpose: 'transactional email (contact form, account emails)' },
    { name: 'Lemon Squeezy', purpose: 'subscription billing and payment processing' },
  ],
} as const;
