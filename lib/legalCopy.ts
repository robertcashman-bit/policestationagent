/**
 * Central public-facing legal and compliance copy for PSR Train.
 * Import from here — do not duplicate strings on marketing or legal-advice pages.
 */

export const TRAINING_ONLY_DISCLAIMER =
  'Training guidance only. Completion does not confer PSRAS accreditation, authorisation, or any right to provide police station legal advice.';

export const NO_LEGAL_ADVICE_DISCLAIMER =
  'PSR Train is an online training platform. We do not provide legal advice or representation to members of the public.';

export const POLICE_STATION_HELP_TEXT =
  'If you are at a police station, ask the custody officer to arrange free, independent legal advice. You can ask for the duty solicitor or for your own solicitor. PSR Train does not provide legal advice or representation.';

export const POLICE_STATION_HELP_TEXT_SHORT =
  'At a police station, ask the custody officer for free, independent legal advice. You may ask for the duty solicitor or your own solicitor.';

export const PSRAS_ACCREDITATION_TEXT =
  'The Police Station Representative Accreditation Scheme (PSRAS) is the accreditation framework for individuals who provide legally aided police station advice. The SRA describes it as a compulsory qualification for solicitors and non-solicitors who provide legal advice at the police station on a legally aided basis.';

export const PSRAS_ACCREDITATION_TEXT_SHORT =
  'PSRAS is the accreditation framework for police station representatives. It applies to those who provide legally aided police station advice, including solicitors and non-solicitors where required.';

/** Registered operator of PSR Train (psrtrain.com). */
export const COMPANY = {
  legalName: 'DEFENCELEGALSERVICES LIMITED',
  registeredOffice:
    'Greenacre, London Road, West Kingsdown, Sevenoaks, TN15 6ER, United Kingdom',
  companyNumber: '09900871',
  vatNumber: 'GB267237387',
  vatNumberDisplay: 'GB 267 237 387',
} as const;

export const FOOTER_LEGAL_SHORT = `Operated by ${COMPANY.legalName}. Training guidance only — not legal advice.`;

export const FOOTER_LEGAL_ENTITY_TEXT = [
  `PSR Train is operated by ${COMPANY.legalName}, a company registered in England and Wales.`,
  COMPANY.companyNumber ? `Company number ${COMPANY.companyNumber}.` : null,
  `Registered office: ${COMPANY.registeredOffice}.`,
  `VAT registration number: ${COMPANY.vatNumberDisplay}.`,
  'Contact: robertdavidcashman@gmail.com.',
]
  .filter(Boolean)
  .join(' ');

export const LEGAL_ADVICE_HUB_TOP_DISCLAIMER =
  'This page provides general information for England and Wales only. It is not legal advice. If you are at a police station or have been asked to attend a police interview, ask for free, independent legal advice from a solicitor.';

export const LEGAL_ADVICE_INFORMATION_BASIS =
  'general information based on PACE, the PACE Codes of Practice, and related criminal procedure sources';

export const OWN_SOLICITOR_FREE_WORDING =
  'You may ask for your own solicitor. Police station legal advice is normally free where the solicitor provides advice under the police station legal aid scheme. Ask the solicitor or custody staff to confirm the position if there is any uncertainty.';

export const DUTY_SOLICITOR_AVAILABILITY_WORDING =
  'Availability and attendance times vary. The custody officer can arrange the duty solicitor, or you can ask for your own solicitor.';

export const VOLUNTARY_INTERVIEW_ARREST_WORDING =
  'The police may continue their investigation and may arrest you later if they have reasonable grounds to suspect an offence and consider arrest necessary under PACE.';

export const SOLICITOR_DELAY_INTERVIEW_WORDING =
  'If legal advice has been requested, the interview should not normally begin or continue until the person has had a reasonable opportunity to consult a solicitor. There are limited exceptions under PACE Code C, including urgent circumstances and solicitor delay, but these should be treated as exceptions and carefully recorded.';

export const CPD_REPLACEMENT_WORDING =
  'continuing competence obligations, supervision requirements, or formal accreditation requirements';

export const LEGAL_ADVICE_ARTICLE_DISCLAIMER_INTRO =
  'The information on this page is for general informational purposes only and does not constitute legal advice. Content is ' +
  LEGAL_ADVICE_INFORMATION_BASIS +
  '. You should not rely on it as a substitute for advice from a qualified solicitor about your specific situation.';
