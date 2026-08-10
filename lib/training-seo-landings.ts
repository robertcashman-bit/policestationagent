import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export type TrainingSeoLanding = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  faq: { q: string; a: string }[];
  bodyHtml: string;
  relatedLinks: { href: string; label: string }[];
};

const DISCLAIMER = `<p class="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-slate-300/90"><strong class="text-amber-200/90">Disclaimer:</strong> General training information for England and Wales police station representatives. Not legal advice on any case.</p>`;

export const TRAINING_SEO_LANDINGS: TrainingSeoLanding[] = [
  {
    slug: 'police-station-representative-training',
    title: 'Police Station Representative Training',
    metaTitle: 'Police Station Representative Training — PSRAS Prep',
    metaDescription:
      'Structured police station representative training for PSRAS candidates: PACE, interviews, MCQs and mock exams. England and Wales.',
    h1: 'Police Station Representative Training',
    lede:
      'Accredited police station work requires PSRAS qualification, PACE literacy, and interview skills. PSR Train supports candidates with modules, mock exams, and scenario practice.',
    faq: [
      {
        q: 'What training do police station reps need?',
        a: 'Candidates typically complete the Police Station Qualification (PSQ), portfolio assessments, and PSRAS accreditation through an SCC firm before freelancing.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<h2>What effective training covers</h2><ul><li>PACE Codes C–E and custody procedure</li><li>Interview advice, silence, and adverse inference</li><li>Disclosure review and client consultation</li><li>Timed MCQs and Critical Incidents Test-style scenarios</li></ul><p><a href="/training">Browse training modules</a> or <a href="/register">create a free account</a>.</p>`,
    relatedLinks: [
      { href: '/guides/how-to-become-a-police-station-representative', label: 'How to become a rep' },
      { href: '/training', label: 'Training modules' },
    ],
  },
  {
    slug: 'criminal-defence-training',
    title: 'Criminal Defence Training for Station Reps',
    metaTitle: 'Criminal Defence Training — Police Station Reps',
    metaDescription:
      'Criminal defence training resources for police station representatives preparing for PSRAS accreditation in England and Wales.',
    h1: 'Criminal Defence Training for Police Station Representatives',
    lede:
      'Police station representation sits at the front end of criminal defence. Training should connect PACE procedure, client care, and firm handover standards.',
    faq: [
      {
        q: 'Is this the same as the SQE?',
        a: 'No. The SQE qualifies solicitors. Police station representatives follow the PSRAS / PSQ route unless they are already qualified duty solicitors.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<h2>Core competencies</h2><ul><li>Custody attendance and welfare checks</li><li>Professional ethics and confidentiality</li><li>Structured attendance notes and firm handover</li></ul><p>See <a href="/guides">guides</a> and <a href="/blog">blog articles</a> for revision topics.</p>`,
    relatedLinks: [{ href: '/guides', label: 'Training guides' }],
  },
  {
    slug: 'voluntary-interview-training',
    title: 'Voluntary Interview Training',
    metaTitle: 'Voluntary Interview Training — Police Station Reps',
    metaDescription:
      'Training on voluntary police interviews for representatives: attendance, advice, and PACE context in England and Wales.',
    h1: 'Voluntary Interview Training for Representatives',
    lede:
      'Voluntary interviews require the same professional standards as custody attendances — with different PACE timing and attendance logistics.',
    faq: [
      {
        q: 'Does PACE Code C apply to voluntary interviews?',
        a: 'Voluntary interviews are governed by Code C where the suspect attends voluntarily. Reps should know attendance, consultation, and recording requirements.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<h2>Training focus</h2><ul><li>Pre-interview consultation without custody clock pressure</li><li>Advising on attendance vs no attendance</li><li>Recording instructions and outcome for the firm</li></ul>`,
    relatedLinks: [{ href: '/blog/voluntary-interview-rep-guide', label: 'Voluntary interview rep guide' }],
  },
  {
    slug: 'vulnerable-suspect-interview-training',
    title: 'Vulnerable Suspect Interview Training',
    metaTitle: 'Vulnerable Suspect Interview Training — PSRAS',
    metaDescription:
      'Training on vulnerable suspects at the police station: safeguards, appropriate adults, and interview strategy for representatives.',
    h1: 'Vulnerable Suspect Interview Training',
    lede:
      'Vulnerability affects interview fairness and admissibility. Representatives must recognise triggers, request safeguards, and document advice clearly.',
    faq: [
      {
        q: 'When is an appropriate adult required?',
        a: 'Code C sets age and vulnerability thresholds. Reps should confirm whether an AA is present and whether interview should proceed.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<h2>Key topics</h2><ul><li>Mental health, learning disability, and intoxication flags</li><li>Consultation time and firm escalation</li><li>Documenting vulnerability in attendance notes</li></ul>`,
    relatedLinks: [{ href: '/blog/appropriate-adult-at-custody', label: 'Appropriate adults at custody' }],
  },
  {
    slug: 'pace-interview-training',
    title: 'PACE Interview Training',
    metaTitle: 'PACE Interview Training — Police Station Reps',
    metaDescription:
      'PACE interview training for police station representatives: Code C, caution, consultation, and interview strategy.',
    h1: 'PACE Interview Training',
    lede:
      'Interview work is central to police station representation. Training should cover Code C procedure, the caution, and practical advice frameworks.',
    faq: [
      {
        q: 'Which PACE Code covers interviews?',
        a: 'Code C governs detention, treatment and questioning. Code E covers audio recording. Reps need both for accreditation exams.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<h2>Revision checklist</h2><ul><li>Caution wording and consultation rights</li><li>Breaks, reviews, and interview delays</li><li>Prepared statements and no-comment strategies</li></ul><p><a href="/blog/code-c-first-hour-custody-checklist">Code C first-hour checklist</a></p>`,
    relatedLinks: [{ href: '/blog', label: 'Blog — PACE topics' }],
  },
  {
    slug: 'no-comment-interview-training',
    title: 'No Comment Interview Training',
    metaTitle: 'No Comment Interview Training — Rep Advice',
    metaDescription:
      'Training on advising clients on no-comment interviews: silence, adverse inference, and PSRAS exam preparation.',
    h1: 'No Comment Interview Training',
    lede:
      'No-comment strategy is lawful when properly advised and recorded. Training covers client communication, adverse inference, and exam scenarios.',
    faq: [
      {
        q: 'When is no comment appropriate?',
        a: 'Depends on disclosure, instructions, and strategy agreed with the firm. Reps explain options — they do not decide the defence case alone.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<p>See <a href="/blog/caution-and-silence-client-advice">caution and silence client advice</a> and <a href="/blog/adverse-inference-interview-advice">adverse inference guidance</a>.</p>`,
    relatedLinks: [{ href: '/blog/caution-and-silence-client-advice', label: 'Caution and silence advice' }],
  },
  {
    slug: 'police-station-accreditation-support',
    title: 'Police Station Accreditation Support',
    metaTitle: 'Police Station Accreditation Support — PSRAS',
    metaDescription:
      'Support for police station accreditation (PSRAS): portfolio tips, mock exams, and revision for representatives in England and Wales.',
    h1: 'Police Station Accreditation Support',
    lede:
      'PSRAS accreditation combines knowledge units, portfolio evidence, and practical assessment. Structured revision reduces resit risk.',
    faq: [
      {
        q: 'What is PSRAS?',
        a: 'The Police Station Representatives Accreditation Scheme — the standard for accredited reps attending on behalf of criminal firms in England and Wales.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<ul><li><a href="/mock-exam">Mock exam practice</a></li><li><a href="/blog/psras-reaccreditation-explained">Reaccreditation explained</a></li><li><a href="/blog/six-week-psras-study-plan">Six-week study plan</a></li></ul>`,
    relatedLinks: [{ href: '/mock-exam', label: 'Mock exam' }],
  },
  {
    slug: 'sqe-criminal-practice-police-station-basics',
    title: 'SQE Criminal Practice — Police Station Basics',
    metaTitle: 'SQE Criminal Practice — Police Station Basics',
    metaDescription:
      'Police station basics for SQE criminal practice candidates: PACE overview, custody attendance, and representative roles.',
    h1: 'SQE Criminal Practice: Police Station Basics',
    lede:
      'SQE candidates benefit from understanding how police station work fits into criminal litigation — even if they are not training as accredited reps.',
    faq: [
      {
        q: 'Do solicitors need PSRAS accreditation?',
        a: 'Qualified solicitors may attend as duty solicitors. Separate PSRAS accreditation applies to accredited representatives working as agents.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<p>Connect SQE criminal practice revision with <a href="/guides">PSR Train guides</a> on PACE and custody procedure.</p>`,
    relatedLinks: [{ href: '/guides', label: 'Guides hub' }],
  },
  {
    slug: 'youth-suspect-interview-training',
    title: 'Youth Suspect Interview Training',
    metaTitle: 'Youth Suspect Interview Training — PSRAS',
    metaDescription:
      'Training on youth suspects at police stations: appropriate adults, Code C safeguards, and interview advice for representatives.',
    h1: 'Youth Suspect Interview Training',
    lede:
      'Youth custody requires strict Code C compliance. Representatives must confirm appropriate adult attendance and adapt consultation for the client\'s age.',
    faq: [
      {
        q: 'What age triggers youth safeguards?',
        a: 'Under 18s require an appropriate adult for most police station procedures. Reps should verify age and AA status on arrival.',
      },
    ],
    bodyHtml: `${DISCLAIMER}<p>Read <a href="/blog/youth-custody-rep-essentials">youth custody rep essentials</a> for revision.</p>`,
    relatedLinks: [{ href: '/blog/youth-custody-rep-essentials', label: 'Youth custody essentials' }],
  },
];

export function getTrainingSeoLanding(slug: string): TrainingSeoLanding | undefined {
  return TRAINING_SEO_LANDINGS.find((p) => p.slug === slug);
}

export function allTrainingSeoSlugs(): string[] {
  return TRAINING_SEO_LANDINGS.map((p) => p.slug);
}

export function trainingSeoMetadata(config: TrainingSeoLanding): Metadata {
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `${SITE.url}/${config.slug}` },
  };
}
