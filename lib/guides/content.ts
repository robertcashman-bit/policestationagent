import type { Guide } from './types';
import { guideHeroImage } from './hero-image';
import { GUIDES_BATCH_2 } from './content-batch-2';

const GUIDES_CORE: Guide[] = [
  {
    slug: 'what-is-psras',
    published: '2026-03-05',
    category: 'PSRAS',
    title: 'What is PSRAS? Police Station Rep Accreditation Explained',
    h1: 'What is the Police Station Representative Accreditation Scheme (PSRAS)?',
    description:
      'A clear guide to PSRAS in England and Wales — who it applies to, what accreditation involves, and how it fits with police station legal aid work.',
    keywords: [
      'PSRAS',
      'Police Station Representative Accreditation Scheme',
      'police station representative',
      'accreditation',
      'SRA',
      'legal aid',
    ],
    summary:
      'PSRAS is the accreditation framework for people who provide legally aided police station advice in England and Wales. It sets standards for knowledge, portfolio evidence, and assessment so representatives can work under appropriate supervision within a criminal defence firm.',
    readMinutes: 8,
    heroImage: guideHeroImage(
      'what-is-psras',
      'PSRAS accreditation explained — police station representative training guide',
    ),
    relatedSlugs: [
      'how-to-become-a-police-station-representative',
      'psras-portfolio-and-workbook',
      'police-station-representative-role',
    ],
    sections: [
      {
        heading: 'Why PSRAS exists',
        paragraphs: [
          'Police station representation is a regulated area of criminal legal aid work. Clients in custody need advisers who understand the Police and Criminal Evidence Act 1984 (PACE), Code C custody procedure, disclosure, and interview strategy. PSRAS exists to ensure that non-solicitors — and solicitors entering the field — meet consistent standards before they advise at the police station on a legally aided basis.',
          'The Solicitors Regulation Authority (SRA) describes PSRAS as a compulsory qualification for those providing police station legal advice under legal aid. In practice, candidates work through structured training, supervised practice, and formal assessments administered by authorised assessment organisations.',
        ],
      },
      {
        heading: 'Who PSRAS applies to',
        paragraphs: [
          'PSRAS is relevant if you want to become an accredited police station representative (sometimes called a police station agent or accredited rep) working for a criminal defence firm. It also forms part of the pathway for solicitors who need the police station qualification for legal aid work.',
        ],
        bullets: [
          'Non-solicitors seeking to represent clients at the police station under supervision',
          'Trainee solicitors and qualified solicitors who need the police station accreditation',
          'Firms ensuring fee earners meet SRA and Legal Aid Agency expectations',
        ],
      },
      {
        heading: 'What accreditation typically involves',
        paragraphs: [
          'The exact requirements are set by the assessment framework and your firm’s supervision structure, but most candidates encounter three broad elements: knowledge of the Police and Criminal Evidence Act 1984 and Codes of Practice, a portfolio or workbook evidencing supervised attendances, and written or scenario-based assessments including the Critical Incidents Test (CIT).',
        ],
        bullets: [
          'Structured learning on PACE 1984 Codes of Practice, custody, disclosure, and interviews',
          'Supervised attendances at police stations documented in a portfolio or workbook',
          'Multiple-choice and written assessments testing application of law and procedure',
          'Critical Incidents Test (CIT) — scenario-based decision making under time pressure',
        ],
      },
      {
        heading: 'PSRAS vs “being a rep” in everyday language',
        paragraphs: [
          'Colloquially, people say “police station rep” or “agent”. Accreditation is the formal scheme that underpins that role for legal aid purposes. Completing a training course — including online preparation — does not by itself make you accredited; you must complete the official assessment route and work within the supervision rules that apply to your status.',
        ],
      },
      {
        heading: 'How PSR Train helps (without replacing accreditation)',
        paragraphs: [
          'PSR Train is designed to support candidates preparing for PSRAS assessments: timed MCQs, module-based study, Code C–aligned content under the Police and Criminal Evidence Act 1984, and CIT-style scenarios. It complements — but does not replace — firm supervision, the official workbook, or assessments run by authorised providers.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is PSRAS the same as a law degree or LPC?',
        answer:
          'No. PSRAS is a specialist accreditation for police station work under legal aid. It is separate from general legal qualifications, though solicitors may also need to complete it for police station legal aid work.',
      },
      {
        question: 'Can I work at a police station without PSRAS?',
        answer:
          'You must work within the supervision and authorisation rules that apply to you and your firm. For legally aided police station advice, accreditation through PSRAS (or equivalent solicitor qualification routes) is required.',
      },
      {
        question: 'Who runs PSRAS assessments?',
        answer:
          'Assessments are delivered through authorised assessment organisations under the scheme framework. Your firm or training provider will direct you to the current process.',
      },
    ],
  },
  {
    slug: 'how-to-become-a-police-station-representative',
    published: '2026-03-20',
    category: 'Career',
    title: 'How to Become a Police Station Representative in England & Wales',
    h1: 'How to Become a Police Station Representative',
    description:
      'Step-by-step overview of becoming an accredited police station rep: prerequisites, finding a firm, supervision, PSRAS preparation, and portfolio work.',
    keywords: [
      'how to become a police station representative',
      'police station rep training',
      'PSRAS pathway',
      'criminal defence career',
      'accredited rep',
    ],
    summary:
      'Most candidates join a criminal defence firm as a trainee rep, study the Police and Criminal Evidence Act 1984 and Code C procedure, complete supervised custody attendances, build a portfolio, and pass PSRAS assessments — including MCQs and the Critical Incidents Test.',
    readMinutes: 10,
    heroImage: guideHeroImage(
      'how-to-become-a-police-station-representative',
      'How to become a police station representative — PSRAS career guide',
    ),
    relatedSlugs: ['what-is-psras', 'police-station-representative-role', 'psras-exam-preparation-tips'],
    sections: [
      {
        heading: 'Step 1: Understand the role',
        paragraphs: [
          'Before committing, understand what reps do: attend police stations (often unsocial hours), advise clients in custody, analyse disclosure, take instructions, advise on interview strategy, and attend interviews. The role suits people who can work under pressure, communicate clearly, and learn detailed procedure.',
        ],
      },
      {
        heading: 'Step 2: Find a firm and supervision',
        paragraphs: [
          'Accreditation is tied to supervised practice within a criminal defence organisation. Many candidates apply to firms advertising trainee rep roles or arrange training contracts with high-street crime practices or larger defence teams. Your supervising solicitor or accredited mentor will guide attendance logging and readiness for assessment.',
        ],
      },
      {
        heading: 'Step 3: Build PACE 1984 and Code C knowledge',
        paragraphs: [
          'Study the Police and Criminal Evidence Act 1984 and the Codes of Practice — especially Code C (detention and questioning) and Code D (identification). Learn custody timelines, rights of suspects, disclosure basics, bail, and interview advice including silence and adverse inference issues at an introductory level.',
        ],
        bullets: [
          'Code C — detention, caution, interviews, vulnerable suspects',
          'Code D — identification procedures',
          'Code E — audio recording of interviews (awareness)',
          'Custody clock, reviews, and bail/RUI/charge outcomes',
        ],
      },
      {
        heading: 'Step 4: Complete supervised attendances and portfolio',
        paragraphs: [
          'Your workbook or portfolio records real (redacted) attendances showing progression. Firms expect increasing independence over time while retaining sign-off. Document types of attendance: voluntary interview, custody, telephone advice, and different offence categories where possible.',
        ],
      },
      {
        heading: 'Step 5: Prepare for and sit PSRAS assessments',
        paragraphs: [
          'Candidates typically face MCQ papers, written exercises, and the CIT. Use PSR Train’s timed mock exams to simulate MCQ assessment conditions, and CIT-style scenarios for decision-making practice — use both alongside firm-led preparation.',
        ],
      },
      {
        heading: 'Step 6: Maintain competence after accreditation',
        paragraphs: [
          'Accreditation is not the end of learning. Reaccreditation, continuing competence, and firm audits apply. Many reps also use structured attendance notes (for example Custody Note) and directories such as PoliceStationRepUK to build their practice.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need a law degree to become a police station rep?',
        answer:
          'Not necessarily for the non-solicitor accredited rep route, but requirements depend on your pathway and firm. Solicitors follow a different entry route but still need police station accreditation for legal aid work.',
      },
      {
        question: 'How long does it take to become accredited?',
        answer:
          'Timelines vary by firm, attendance opportunities, and assessment sittings. Many candidates take twelve to twenty-four months from starting supervised practice to completing assessments, but this is indicative only.',
      },
      {
        question: 'Can I prepare online before joining a firm?',
        answer:
          'You can build knowledge early using modules, practice questions, and timed mock exams on PSR Train, but supervised attendances and official portfolio requirements need a firm environment.',
      },
    ],
  },
  {
    slug: 'police-station-representative-role',
    published: '2026-04-08',
    category: 'Career',
    title: 'What Does a Police Station Representative Do?',
    h1: 'What Does a Police Station Representative Do?',
    description:
      'Day-to-day duties of accredited police station reps — custody, client advice, disclosure, interviews, and working with defence firms in England and Wales.',
    keywords: [
      'police station representative role',
      'police station agent duties',
      'custody attendance',
      'PSR job',
      'criminal defence rep',
    ],
    summary:
      'A police station representative advises clients in police custody or at voluntary interviews, reviews disclosure, takes instructions, advises on interview strategy, and attends interviews — under the supervision of a criminal defence firm and within Code C rules under the Police and Criminal Evidence Act 1984.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'police-station-representative-role',
      'What a police station representative does — role and duties guide',
    ),
    relatedSlugs: ['what-is-psras', 'pace-code-c-guide', 'how-to-become-a-police-station-representative'],
    sections: [
      {
        heading: 'Core responsibilities',
        bullets: [
          'Travel to police stations when a firm receives an instruction',
          'Consult privately with the client in custody or at interview',
          'Review initial disclosure and identify further lines of enquiry',
          'Take instructions on the allegation and client’s account',
          'Advise on interview strategy (answer, no comment, prepared statement, etc.)',
          'Attend the police interview and note key points',
          'Advise on bail, release under investigation (RUI), charge, or NFA',
          'Report back to the firm with attendance notes for the file',
        ],
      },
      {
        heading: 'Working with firms and solicitors',
        paragraphs: [
          'Reps usually work for criminal defence firms or agencies on a rota or case-by-case basis. A duty solicitor or higher-grade supervisor may be contactable by phone. The rep is the firm’s representative on site but operates within firm protocols and LAA billing rules.',
        ],
      },
      {
        heading: 'PACE 1984 and professional boundaries',
        paragraphs: [
          'Reps must apply the Police and Criminal Evidence Act 1984 and Codes of Practice — not improvise. That includes Code C custody rights, appropriate adults for juveniles and vulnerable adults, interpreter needs, and medical assessments where relevant. Reps do not instruct clients to lie or obstruct investigation; they ensure rights are respected and advice is informed.',
        ],
      },
      {
        heading: 'Skills that matter in practice',
        bullets: [
          'Clear communication under time pressure',
          'Quick reading of disclosure and custody records',
          'Calm client care in stressful situations',
          'Accurate attendance notes for the firm file and billing',
          'Willingness to work evenings, nights, and weekends',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a police station rep the same as a duty solicitor?',
        answer:
          'Not always. A duty solicitor is a qualified solicitor on the duty rota. An accredited rep is a different role, working under supervision, though career paths may later include qualification as a solicitor.',
      },
      {
        question: 'Do reps only work in custody suites?',
        answer:
          'Most work involves custody suites and voluntary interview suites, plus telephone advice in some firms. The exact mix depends on the firm and contract.',
      },
      {
        question: 'What skills do firms look for in new reps?',
        answer:
          'Clear communication under pressure, reliable attendance notes, willingness to work unsocial hours, and growing familiarity with Code C under the Police and Criminal Evidence Act 1984.',
      },
    ],
  },
  {
    slug: 'pace-code-c-guide',
    published: '2026-04-22',
    category: 'PACE',
    title: 'PACE Code C Guide for Police Station Representatives',
    h1: 'PACE Code C: A Practical Guide for Police Station Representatives',
    description:
      'Key Code C topics for PSRAS candidates — detention, caution, interviews, vulnerable suspects, appropriate adults, and reviews. England and Wales.',
    keywords: ['PACE Code C', 'police station representative', 'custody', 'police interview', 'PSRAS', 'appropriate adult'],
    summary:
      'PACE Code C under the Police and Criminal Evidence Act 1984 governs detention, treatment, and questioning of suspects. Police station reps must know custody rights, the caution, interview rules, vulnerable suspect safeguards, and detention reviews — core PSRAS assessment territory.',
    readMinutes: 9,
    heroImage: guideHeroImage(
      'pace-code-c-guide',
      'PACE Code C practical guide for police station representatives',
    ),
    relatedSlugs: ['pace-codes-overview', 'critical-incidents-test-psras', 'psras-exam-preparation-tips'],
    sections: [
      {
        heading: 'What Code C covers',
        paragraphs: [
          'Code of Practice C sits under the Police and Criminal Evidence Act 1984. It applies when people are held at police stations for questioning or have attended voluntarily for interview under caution. Reps use Code C daily to check whether custody treatment and interview procedures are lawful.',
        ],
      },
      {
        heading: 'Detention and the custody clock',
        paragraphs: [
          'Ordinary detention without charge is limited — broadly twenty-four hours from the “relevant time” under PACE 1984 s.41, extendable in serious cases with superintendent authorisation and magistrates’ warrants for further periods. Reps monitor Code C reviews, custody records, and whether grounds for detention remain.',
        ],
        bullets: [
          'Relevant time and start of detention',
          'Periodic reviews by custody officer',
          'Rights to legal advice and private consultation',
          'Medical assessments and welfare checks',
        ],
      },
      {
        heading: 'The caution and interviews',
        paragraphs: [
          'The standard caution warns that silence may harm the defence if facts later relied on were not mentioned when questioned (Criminal Justice and Public Order Act 1994 s.34). Reps advise clients after reviewing disclosure — not before understanding the allegation. Code C sets rules on breaks, rest, and recording of interviews.',
        ],
      },
      {
        heading: 'Vulnerable suspects and appropriate adults',
        paragraphs: [
          'Juveniles and vulnerable adults require an appropriate adult in custody and interview unless exceptions apply under Code C. Reps must recognise vulnerability triggers — learning disability, mental health, inability to understand — and ensure safeguards are in place before advising on interview.',
        ],
      },
      {
        heading: 'Common assessment themes',
        paragraphs: [
          'PSRAS MCQs and CIT scenarios frequently test Code C timelines, interview legality, appropriate adult requirements, and whether a rep’s proposed action matches Code C and PACE 1984 priorities. Structured revision on Code C pays disproportionate dividends in mocks and the real assessments.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Code C law or guidance?',
        answer:
          'Code C is a statutory code of practice issued under the Police and Criminal Evidence Act 1984 (PACE 1984, s.67). Failure to comply can affect admissibility and the lawfulness of detention — reps need practical familiarity, not just overview knowledge.',
      },
      {
        question: 'Which Code C topics appear most in PSRAS prep?',
        answer:
          'Detention limits, reviews, caution and silence, vulnerable suspects, appropriate adults, and interview procedure are consistently high-yield topics.',
      },
      {
        question: 'Should reps read the full Code C text?',
        answer:
          'Yes — assessment answers and live attendances require practical familiarity with Code C issued under the Police and Criminal Evidence Act 1984, not outline summaries alone.',
      },
    ],
  },
  {
    slug: 'pace-codes-overview',
    published: '2026-05-06',
    category: 'PACE',
    title: 'PACE Codes of Practice Overview for PSR Candidates',
    h1: 'PACE Codes of Practice: Overview for PSRAS Candidates',
    description:
      'Summary of PACE Codes A–H for police station representative training — which codes matter most for custody work and PSRAS assessments.',
    keywords: ['PACE codes', 'PACE Code A', 'Code C', 'Code D', 'police station training', 'PSRAS'],
    summary:
      'PACE Codes A–H under the Police and Criminal Evidence Act 1984 set rules for stop and search, detention, identification, interviews, and more. For PSRAS, Code C (detention and questioning) and Code D (identification) are the highest priority, with awareness of others as scenarios require.',
    readMinutes: 6,
    heroImage: guideHeroImage(
      'pace-codes-overview',
      'PACE Codes of Practice overview for PSRAS candidates',
    ),
    relatedSlugs: ['pace-code-c-guide', 'what-is-psras'],
    sections: [
      {
        heading: 'The code map',
        bullets: [
          'Code A — stop and search (powers and safeguards)',
          'Code B — searching premises and seizing property',
          'Code C — detention, treatment, and questioning (priority for reps)',
          'Code D — identification procedures (VIPER, parades, etc.)',
          'Code E — audio recording of interviews',
          'Code F — visual recording with sound (where used)',
          'Code G — arrest powers (including necessity test awareness)',
          'Code H — detention of terrorism suspects (specialist)',
        ],
      },
      {
        heading: 'Priority for police station reps',
        paragraphs: [
          'Most custody attendances centre on Code C and Code D. Reps should read identification procedures in Code D when clients appear on VIPER or when identification is disputed. Awareness of Code E helps when advising on recorded interviews.',
        ],
      },
      {
        heading: 'Using codes in assessments',
        paragraphs: [
          'Examiners expect candidates to name the correct code, cite the practical issue (e.g. appropriate adult absent, identification not run properly), and prioritise the client’s immediate interests — exactly the skills CIT scenarios test.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need to memorise every Code?',
        answer:
          'Focus depth on Code C and Code D under the Police and Criminal Evidence Act 1984; maintain working awareness of others. Assessment preparation should emphasise high-frequency custody and interview issues.',
      },
      {
        question: 'Which Code is tested most in PSRAS?',
        answer:
          'Code C dominates MCQs and CIT scenarios; Code D identification issues appear regularly alongside Code C interview timing.',
      },
      {
        question: 'Where are the Codes published?',
        answer:
          'Codes of Practice are issued under PACE 1984 s.67 — use current Home Office versions when revising for assessments and live attendances.',
      },
    ],
  },
  {
    slug: 'critical-incidents-test-psras',
    published: '2026-05-22',
    category: 'Exams',
    title: 'Critical Incidents Test (CIT) — PSRAS Assessment Guide',
    h1: 'Critical Incidents Test (CIT): What PSRAS Candidates Should Know',
    description:
      'How the PSRAS Critical Incidents Test works, what CIT scenarios test, and how to prepare with scenario practice and timed decision-making.',
    keywords: [
      'Critical Incidents Test',
      'CIT PSRAS',
      'police station assessment',
      'scenario training',
      'PSRAS exam',
    ],
    summary:
      'The CIT presents realistic custody or interview scenarios and asks candidates to identify issues, prioritise actions, and justify decisions — often under time pressure. It tests application of PACE Code C and related procedure, not rote memorisation alone.',
    readMinutes: 8,
    heroImage: guideHeroImage(
      'critical-incidents-test-psras',
      'Critical Incidents Test PSRAS assessment guide',
    ),
    relatedSlugs: ['psras-exam-preparation-tips', 'pace-code-c-guide'],
    sections: [
      {
        heading: 'What the CIT tests',
        paragraphs: [
          'Unlike pure MCQs, CIT-style assessments require structured thinking: What has gone wrong? What is urgent? What would you do first as the rep on site? Candidates must balance client care, PACE Code C compliance, and firm reporting duties.',
        ],
      },
      {
        heading: 'Typical scenario themes',
        bullets: [
          'Missing appropriate adult or interpreter',
          'Insufficient disclosure before interview advice',
          'Client vulnerability not flagged by custody',
          'Identification procedure concerns',
          'Pressure to interview before legal advice',
          'Conflicts of interest or third-party involvement',
        ],
      },
      {
        heading: 'How to approach a CIT answer',
        paragraphs: [
          'Read the scenario twice. List PACE Code C issues (detention, interviews, vulnerable suspects). Prioritise client consultation and unlawful procedure challenges before peripheral points. State what you would tell the client in plain terms and what you would ask the custody officer or OIC. PSR Train’s Critical Incidents module mirrors this structure.',
        ],
      },
      {
        heading: 'Practice method',
        paragraphs: [
          'Use timed scenarios weekly. After each attempt, compare your decision trail to a model answer focusing on whether you spotted the same legal trigger. Repeated practice builds pattern recognition for assessment day.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the CIT the same on every assessment sitting?',
        answer:
          'Format is consistent (scenario-based decision making) but scenarios vary. Preparation should build transferable PACE Code C reasoning, not memorise single answers.',
      },
      {
        question: 'Does PSR Train include CIT practice?',
        answer:
          'Yes — the platform includes CIT-style critical incident scenarios designed for PSRAS preparation alongside timed MCQs.',
      },
      {
        question: 'How long should CIT answers be?',
        answer:
          'Use structured bullet prioritisation with brief justification — examiners mark issue-spotting and Code C reasoning, not essay length.',
      },
    ],
  },
  {
    slug: 'psras-portfolio-and-workbook',
    published: '2026-06-05',
    category: 'PSRAS',
    title: 'PSRAS Portfolio and Workbook Guide for Candidates',
    h1: 'PSRAS Portfolio and Workbook: What Candidates Need to Know',
    description:
      'How PSRAS portfolios and workbooks evidence supervised police station attendances, what firms look for, and how to document progression.',
    keywords: ['PSRAS portfolio', 'PSR workbook', 'supervised attendances', 'police station training record'],
    summary:
      'The portfolio or workbook records supervised custody and interview attendances, reflections, and sign-off by your firm. It demonstrates readiness for formal PSRAS assessments and safe practice development.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'psras-portfolio-and-workbook',
      'PSRAS portfolio and workbook guide for candidates',
    ),
    relatedSlugs: ['how-to-become-a-police-station-representative', 'what-is-psras'],
    sections: [
      {
        heading: 'Purpose of the portfolio',
        paragraphs: [
          'Assessors and firms need evidence that you have attended real cases across a range of situations — not only passed mock exams. The workbook tracks dates, station, offence type, supervision level, and learning points.',
        ],
      },
      {
        heading: 'What to document well',
        bullets: [
          'Type of attendance (custody, voluntary, telephone)',
          'Supervisor involvement and debrief',
          'PACE 1984 / Code C issues encountered (even if resolved)',
          'Interview advice given and outcome',
          'Reflection on what you would do differently',
        ],
      },
      {
        heading: 'Common mistakes',
        bullets: [
          'Thin descriptions without Code C or PACE 1984 analysis',
          'Missing supervisor sign-off',
          'Over-reliance on one offence type or station',
          'Confusing attendance notes with workbook reflections (they serve different purposes)',
        ],
      },
      {
        heading: 'Link to online preparation',
        paragraphs: [
          'Use PSR Train modules to pre-learn topics before attendances, then use real cases to deepen understanding. MCQ scores by topic can highlight which workbook reflections should focus on weak areas.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I complete a portfolio without a firm?',
        answer:
          'No — supervised attendances require firm instruction and sign-off. Online training supports knowledge; the workbook needs live practice.',
      },
      {
        question: 'How detailed should workbook entries be?',
        answer:
          'Include attendance type, Code C issues spotted, interview advice given, and supervisor debrief — not just a one-line summary.',
      },
      {
        question: 'Does the portfolio replace exams?',
        answer:
          'No — workbook evidence and formal PSRAS assessments (MCQs, CIT) are separate requirements in the accreditation route.',
      },
    ],
  },
  {
    slug: 'psras-exam-preparation-tips',
    published: '2026-06-18',
    category: 'Exams',
    title: 'PSRAS Exam Preparation Tips — MCQs, Written Papers & CIT',
    h1: 'How to Prepare for PSRAS Assessments and Mock Exams',
    description:
      'Practical PSRAS revision strategy: timed MCQs, PACE 1984 revision plans, CIT scenario drills, and mock exam routines for police station representative candidates.',
    keywords: [
      'PSRAS exam preparation',
      'police station rep mock exam',
      'PSRAS revision',
      'timed MCQ practice',
      'CIT preparation',
    ],
    summary:
      'Effective PSRAS preparation combines spaced Code C and PACE 1984 revision, timed MCQ practice, weekly CIT scenarios, and firm feedback on workbook attendances. Mock exams under time pressure reveal gaps better than passive reading.',
    readMinutes: 8,
    heroImage: guideHeroImage(
      'psras-exam-preparation-tips',
      'PSRAS exam preparation tips — MCQs, written papers and CIT',
    ),
    relatedSlugs: ['critical-incidents-test-psras', 'pace-code-c-guide', 'what-is-psras'],
    sections: [
      {
        heading: 'Build a revision plan by topic',
        paragraphs: [
          'Split the syllabus: Code C detention, Code D ID, disclosure, interview advice, bail outcomes, vulnerable suspects, and professional conduct. Allocate more time to weak topics identified from practice scores.',
        ],
      },
      {
        heading: 'Use timed MCQs every week',
        paragraphs: [
          'PSRAS MCQs are often time-pressured. Practise full sets on PSR Train with a timer — not just untimed browsing. Review wrong answers by Code C and Act 1984 reference, not only the correct letter.',
        ],
      },
      {
        heading: 'Add CIT scenarios to your routine',
        paragraphs: [
          'One or two CIT-style scenarios per week trains prioritisation. Verbalise your decision trail aloud — assessment day rewards clear structure.',
        ],
      },
      {
        heading: 'Mock exam conditions',
        bullets: [
          'Sit full mocks in one block with breaks as per real assessments',
          'No notes for first attempt; open-book review only after scoring',
          'Track accuracy by topic in a simple spreadsheet',
          'Revisit firm workbook attendances that match weak topics',
        ],
      },
      {
        heading: 'When to start PSR Train mock mode',
        paragraphs: [
          'Begin timed practice once baseline reading is complete — typically after initial Code C study. Early mocks set a benchmark; later mocks measure improvement.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many mock exams should I take before the real assessment?',
        answer:
          'There is no fixed number — focus on stable scores across all major topics and consistent CIT reasoning. Many candidates benefit from at least several full timed sessions in the final month.',
      },
      {
        question: 'Does PSR Train replace firm mock assessments?',
        answer:
          'No. Use firm feedback and official assessment organisation materials as primary. PSR Train supplements with extra question volume and scenarios.',
      },
      {
        question: 'When should I start timed MCQ practice?',
        answer:
          'After initial Code C reading — early mocks set a baseline; later mocks under exam conditions measure improvement before your assessment sitting.',
      },
    ],
  },
];

export const GUIDES: Guide[] = [...GUIDES_CORE, ...GUIDES_BATCH_2];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}

export function getGuidesByCategory(): Record<Guide['category'], Guide[]> {
  const map = { PSRAS: [], PACE: [], Career: [], Exams: [] } as Record<Guide['category'], Guide[]>;
  for (const g of GUIDES) map[g.category].push(g);
  return map;
}
