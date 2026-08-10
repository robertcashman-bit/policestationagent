import type { Guide } from './types';
import { guideHeroImage } from './hero-image';

/** Additional SEO guides — batch 2 (July–December 2026 publishing pace). */
export const GUIDES_BATCH_2: Guide[] = [
  {
    slug: 'pace-code-d-identification',
    published: '2026-07-08',
    category: 'PACE',
    title: 'PACE Code D: Identification Procedures for Police Station Reps',
    h1: 'PACE Code D — Identification Procedures Explained',
    description:
      'Guide to PACE Code D for police station representatives — VIPER, parades, fingerprints, and when identification evidence affects interview advice.',
    keywords: ['PACE Code D', 'identification procedure', 'VIPER', 'police station rep', 'PSRAS', 'parade'],
    summary:
      'Code D under the Police and Criminal Evidence Act 1984 governs identification procedures — live parades, video identification (VIPER), and fingerprints. Reps must spot defective ID before advising on interview.',
    readMinutes: 8,
    heroImage: guideHeroImage(
      'pace-code-d-identification',
      'PACE Code D identification procedures — guide for police station representatives',
    ),
    relatedSlugs: ['pace-code-c-guide', 'pace-codes-overview', 'disclosure-at-police-station'],
    sections: [
      {
        heading: 'Why Code D matters at the police station',
        paragraphs: [
          'Many custody cases turn on whether the client was correctly identified. Code D sets when and how police must run identification procedures. If ID is weak or procedurally flawed, that shapes disclosure review and interview strategy under Code C.',
        ],
      },
      {
        heading: 'Common Code D procedures',
        bullets: [
          'Video identification (VIPER) — witness compares suspect to similar images',
          'Identification parades — live or via video link in some forces',
          'Group identification — informal viewing (strict Code D rules apply)',
          'Fingerprints and samples — separate statutory powers but linked to ID disputes',
        ],
      },
      {
        heading: 'Rep actions when identification is disputed',
        paragraphs: [
          'Check custody records and disclosure for what ID steps have been taken. Ask whether the client denies involvement, denies presence, or accepts presence but disputes role — each affects whether Code D was required and whether further ID should be run before interview.',
        ],
      },
      {
        heading: 'PSRAS assessment focus',
        paragraphs: [
          'MCQs and CIT scenarios often combine Code C interview timing with Code D defects — for example interviewing before required ID, or proceeding without an appropriate adult during ID procedures for juveniles.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Must police always run VIPER before interview?',
        answer:
          'Not in every case — it depends on whether identification is in issue and what steps are reasonably practicable. Reps should know when Code D requires action and challenge premature interviews.',
      },
      {
        question: 'Is Code D part of PSRAS training?',
        answer:
          'Yes. Code D sits alongside Code C as high-priority revision for police station representative assessments.',
      },
      {
        question: 'What if the client has already been picked out informally?',
        answer:
          'Informal or street identification may trigger Code D safeguards. Document what happened and whether subsequent procedures cured or compounded the defect.',
      },
    ],
  },
  {
    slug: 'pace-code-e-interviews',
    published: '2026-07-22',
    category: 'PACE',
    title: 'PACE Code E: Recorded Interviews — Rep Guide',
    h1: 'PACE Code E and Recorded Police Interviews',
    description:
      'How PACE Code E governs audio recording of interviews — rep checklist for recording failures, breaks, and PSRAS exam scenarios in England and Wales.',
    keywords: ['PACE Code E', 'recorded interview', 'police interview', 'PSRAS', 'Code C', 'police station rep'],
    summary:
      'Code E under the Police and Criminal Evidence Act 1984 sets standards for audio recording of interviews. Reps rely on Code E with Code C to check breaks, recording integrity, and whether interview evidence may be challenged.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'pace-code-e-interviews',
      'PACE Code E recorded police interviews — guide for PSRAS candidates',
    ),
    relatedSlugs: ['pace-code-c-guide', 'pace-codes-overview', 'critical-incidents-test-psras'],
    sections: [
      {
        heading: 'Relationship between Code C and Code E',
        paragraphs: [
          'Code C governs detention and questioning; Code E governs how interviews are recorded. In practice reps treat them together — unlawful detention under Code C may taint an interview even if Code E recording rules were followed.',
        ],
      },
      {
        heading: 'What Code E requires in outline',
        bullets: [
          'Recording equipment tested and sealed where required',
          'Time checks and break records on the recording',
          'Copies and access rules for defence',
          'Special rules for certain vulnerable suspects',
        ],
      },
      {
        heading: 'Practical rep checks before and during interview',
        paragraphs: [
          'Confirm the interview is recorded when it should be. Note start time, breaks, and any interruptions. If recording fails mid-interview, Code E and Code C may require the interview to stop or restart — flag issues to the custody officer and your firm.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are all interviews audio recorded?',
        answer:
          'Most contested interviews in custody are recorded under Code E, but exceptions exist. Reps should verify recording status before advising the client to answer questions.',
      },
      {
        question: 'Does Code E appear in PSRAS MCQs?',
        answer:
          'Yes, often linked to Code C scenarios about breaks, fatigue, and procedural fairness during recorded interviews.',
      },
      {
        question: 'Can bad recording alone exclude evidence?',
        answer:
          'Depends on seriousness and context — reps identify issues for solicitors to argue; assessment answers should prioritise client protection and proper procedure first.',
      },
    ],
  },
  {
    slug: 'pace-detention-reviews-s40',
    published: '2026-08-05',
    category: 'PACE',
    title: 'PACE Detention Reviews and s.40 — Police Station Rep Guide',
    h1: 'Detention Reviews under PACE and Code C',
    description:
      'How PACE 1984 s.40 and Code C detention reviews work — custody clock, authorisation, and what reps should check during PSRAS training and live attendances.',
    keywords: ['PACE s.40', 'detention review', 'custody clock', 'Code C', 'PSRAS', 'police station representative'],
    summary:
      'PACE 1984 s.40 requires periodic detention reviews by the custody officer. Code C expands how reviews are documented. Reps monitor whether continued detention remains authorised as the custody clock runs.',
    readMinutes: 8,
    heroImage: guideHeroImage(
      'pace-detention-reviews-s40',
      'PACE detention reviews and custody clock — police station rep guide',
    ),
    relatedSlugs: ['pace-code-c-guide', 'bail-and-rui-police-station', 'youth-custody-police-station'],
    sections: [
      {
        heading: 'Statutory framework',
        paragraphs: [
          'The Police and Criminal Evidence Act 1984 limits how long suspects may be detained without charge. Section 40 requires reviews at prescribed intervals; Code C sets operational detail on records and consultation rights.',
        ],
      },
      {
        heading: 'What reps check on the custody record',
        bullets: [
          'Relevant time and authorised detention period',
          'Review times and custody officer signatures',
          'Grounds for detention still recorded',
          'Whether legal advice delayed or permitted',
        ],
      },
      {
        heading: 'Link to interview advice',
        paragraphs: [
          'If detention is unlawful or reviews are missing, that may affect whether interview should proceed. CIT scenarios often test whether the rep prioritises challenging detention before tactical interview points.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How often must s.40 reviews happen?',
        answer:
          'Intervals depend on how long the client has been detained — check Code C and the custody record for the precise schedule in your scenario or attendance.',
      },
      {
        question: 'Can reps demand release at review?',
        answer:
          'Reps can argue grounds for detention are insufficient and ask the custody officer to release or bail — final decisions rest with the custody officer subject to PACE 1984 s.41 and Code C powers.',
      },
      {
        question: 'Is this a high-yield PSRAS topic?',
        answer:
          'Yes — detention limits and reviews appear frequently in MCQs and CIT-style assessments alongside appropriate adult and disclosure issues.',
      },
    ],
  },
  {
    slug: 'appropriate-adults-guide',
    published: '2026-08-20',
    category: 'PACE',
    title: 'Appropriate Adults in Custody — PACE Code C Guide',
    h1: 'Appropriate Adults: PACE Code C Safeguards',
    description:
      'When juveniles and vulnerable adults need an appropriate adult under Code C — rep duties, PSRAS scenarios, and assessment traps for police station reps.',
    keywords: ['appropriate adult', 'PACE Code C', 'vulnerable suspect', 'juvenile custody', 'PSRAS', 'police station rep'],
    summary:
      'Code C under the Police and Criminal Evidence Act 1984 requires appropriate adults for juveniles and vulnerable adults in custody and interview. Reps must ensure the safeguard is in place before giving interview advice.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'appropriate-adults-guide',
      'Appropriate adults in police custody under PACE Code C',
    ),
    relatedSlugs: ['pace-code-c-guide', 'youth-custody-police-station', 'critical-incidents-test-psras'],
    sections: [
      {
        heading: 'Who needs an appropriate adult',
        paragraphs: [
          'Juveniles (under 18) generally require an appropriate adult. Vulnerable adults — including those who may not understand significance of questions or procedures — also trigger Code C safeguards. Reps assess vulnerability from custody records, presentation, and firm instructions.',
        ],
      },
      {
        heading: 'Role of the appropriate adult',
        bullets: [
          'Support the detainee (not legal adviser)',
          'Facilitate communication with police',
          'Present at interview unless exceptions apply',
          'Not a substitute for legal advice under Code C',
        ],
      },
      {
        heading: 'Rep priorities when AA is absent',
        paragraphs: [
          'Do not proceed to substantive interview advice until Code C is complied with. Contact the firm, request an appropriate adult, and document custody failures — a staple CIT prioritisation issue.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can interview start before the appropriate adult arrives?',
        answer:
          'Generally no for juveniles — Code C sets strict requirements. Assessment answers should prioritise stopping unlawful interview plans.',
      },
      {
        question: 'Who can be an appropriate adult?',
        answer:
          'Code C lists categories — often parent, guardian, social worker, or other approved person. Not the solicitor or rep acting as legal adviser.',
      },
      {
        question: 'Does PSR Train cover appropriate adult scenarios?',
        answer:
          'Yes — CIT-style modules include missing appropriate adult and vulnerability recognition practice.',
      },
    ],
  },
  {
    slug: 'bail-and-rui-police-station',
    published: '2026-09-04',
    category: 'PACE',
    title: 'Bail and Release Under Investigation — Rep Guide',
    h1: 'Bail, RUI, and Outcomes After Police Station Attendance',
    description:
      'Guide for reps on bail conditions, release under investigation (RUI), charge, and NFA — PACE 1984 outcomes and firm reporting after custody attendance.',
    keywords: ['police bail', 'RUI', 'release under investigation', 'PACE', 'police station rep', 'custody outcome'],
    summary:
      'After custody, clients may be bailed, released under investigation, charged, or released without charge. Reps advise on immediate interview strategy under Code C and report likely outcomes to the instructing firm.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'bail-and-rui-police-station',
      'Police bail and release under investigation — police station representative guide',
    ),
    relatedSlugs: ['pace-code-c-guide', 'police-station-representative-role', 'disclosure-at-police-station'],
    sections: [
      {
        heading: 'Outcomes reps encounter',
        bullets: [
          'Release without charge (NFA)',
          'Release under investigation (RUI)',
          'Police bail with or without conditions',
          'Charge and remand or court bail',
        ],
      },
      {
        heading: 'PACE 1984 and Code C context',
        paragraphs: [
          'Detention must remain authorised under the Police and Criminal Evidence Act 1984 until a lawful outcome is recorded. Reps note bail conditions proposed, curfew, reporting requirements, and geographic restrictions — the client needs plain-language advice before leaving the station.',
        ],
      },
      {
        heading: 'Reporting to the firm',
        paragraphs: [
          'Attendance notes should record outcome, conditions, next dates, and disclosure still outstanding. Firms use this for continuing advice and billing under legal aid rules.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is RUI the same as bail?',
        answer:
          'No — RUI is release without bail conditions in many cases, though investigation continues. Clients still need clear advice on contact with police and preserving their account.',
      },
      {
        question: 'Can reps negotiate bail conditions?',
        answer:
          'Reps can make representations to custody or OIC within their role; significant condition disputes may need solicitor involvement.',
      },
      {
        question: 'Do PSRAS exams test bail outcomes?',
        answer:
          'Yes — MCQs and scenarios often include whether the rep has addressed immediate client welfare and firm reporting, not only interview tactics.',
      },
    ],
  },
  {
    slug: 'youth-custody-police-station',
    published: '2026-09-18',
    category: 'PACE',
    title: 'Youth Custody and PACE Code C — Rep Guide',
    h1: 'Representing Juveniles in Police Custody',
    description:
      'Extra safeguards for juveniles under PACE Code C — appropriate adults, detention limits, and interview advice for accredited police station representatives.',
    keywords: ['youth custody', 'juvenile suspect', 'PACE Code C', 'appropriate adult', 'PSRAS', 'police station rep'],
    summary:
      'Juveniles in custody receive enhanced Code C safeguards under the Police and Criminal Evidence Act 1984 — appropriate adults, notification duties, and careful interview management. Reps must know these before advising.',
    readMinutes: 8,
    heroImage: guideHeroImage(
      'youth-custody-police-station',
      'Youth custody and PACE Code C — guide for police station representatives',
    ),
    relatedSlugs: ['appropriate-adults-guide', 'pace-code-c-guide', 'how-to-become-a-police-station-representative'],
    sections: [
      {
        heading: 'Additional safeguards for juveniles',
        paragraphs: [
          'Code C treats those under 18 differently — appropriate adult presence, parental notification in many cases, and heightened scrutiny of detention authorisation. Reps read custody records for age verification and compliance.',
        ],
      },
      {
        heading: 'Interview advice for young clients',
        paragraphs: [
          'Communication must be age-appropriate. Reps ensure the client understands the caution (linked to Criminal Justice and Public Order Act 1994 s.34 concepts) and interview process before strategy is fixed.',
        ],
      },
      {
        heading: 'Assessment and portfolio value',
        paragraphs: [
          'Documenting youth attendances in your PSRAS workbook demonstrates range. CIT scenarios frequently use missing appropriate adult or unlawful juvenile interview timing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a juvenile be interviewed without a lawyer?',
        answer:
          'Legal advice rights under Code C still apply — juveniles should have access to legal representation and appropriate adult safeguards; never assume waivers are valid without checking Code C.',
      },
      {
        question: 'Are detention limits different for juveniles?',
        answer:
          'Code C and PACE 1984 include specific protections — reps should check the custody clock and authorisation on the record rather than rely on memory.',
      },
      {
        question: 'Where can I practice youth scenarios?',
        answer:
          'PSR Train CIT modules and firm-supervised attendances build pattern recognition for juvenile custody issues.',
      },
    ],
  },
  {
    slug: 'disclosure-at-police-station',
    published: '2026-10-06',
    category: 'PACE',
    title: 'Initial Disclosure at the Police Station — Rep Guide',
    h1: 'Disclosure Before Interview Advice',
    description:
      'How police station reps review initial disclosure under PACE and Code C — sufficient information to advise, further disclosure requests, and PSRAS exam themes.',
    keywords: ['disclosure', 'police station', 'Code C', 'interview advice', 'PSRAS', 'police station representative'],
    summary:
      'Reps need sufficient disclosure to advise on interview under Code C. The Police and Criminal Evidence Act 1984 framework expects clients to understand the nature of the allegation before the caution is relied on in interview.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'disclosure-at-police-station',
      'Initial disclosure at the police station — PSRAS rep guide',
    ),
    relatedSlugs: ['pace-code-c-guide', 'pace-code-d-identification', 'critical-incidents-test-psras'],
    sections: [
      {
        heading: 'Minimum disclosure for advice',
        paragraphs: [
          'Before advising on no comment, prepared statement, or answer, reps need enough detail about the allegation and evidence. Code C and professional standards require meaningful consultation — advising blind is unsafe.',
        ],
      },
      {
        heading: 'Requesting further disclosure',
        paragraphs: [
          'Reps press the OIC or custody for additional material within reason — witness summaries, CCTV existence, forensic timelines. Document requests and responses for the firm file.',
        ],
      },
      {
        heading: 'CIT and MCQ patterns',
        bullets: [
          'Interview scheduled before adequate disclosure',
          'Client asked to decide strategy without knowing allegation',
          'Conflict between client account and initial disclosure',
          'Pressure to proceed before rep has reviewed custody record',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much disclosure must police provide?',
        answer:
          'Enough for legal advice at the police station — exact content varies by case type and stage. Reps challenge insufficiency before interview under Code C principles.',
      },
      {
        question: 'Is disclosure the same as full case papers?',
        answer:
          'No — initial disclosure is limited. Full disclosure comes later in the investigation or proceedings; reps manage client expectations accordingly.',
      },
      {
        question: 'Does PSR Train cover disclosure scenarios?',
        answer:
          'Yes — MCQs and CIT modules include insufficient disclosure and timing issues tied to Code C.',
      },
    ],
  },
  {
    slug: 'psras-mcq-exam-format',
    published: '2026-10-22',
    category: 'PSRAS',
    title: 'PSRAS MCQ Exam Format — What Candidates Should Expect',
    h1: 'PSRAS Multiple Choice Assessments Explained',
    description:
      'Overview of PSRAS MCQ papers — topics, timing, PACE 1984 and Code C weighting, and how timed practice on PSR Train supports police station rep accreditation.',
    keywords: ['PSRAS MCQ', 'police station exam', 'multiple choice', 'PSRAS assessment', 'timed practice', 'Code C'],
    summary:
      'PSRAS multiple-choice papers test PACE 1984, Code C, Code D, and professional conduct under time pressure. Timed MCQ practice builds speed and accuracy before authorised assessment sittings.',
    readMinutes: 6,
    heroImage: guideHeroImage(
      'psras-mcq-exam-format',
      'PSRAS multiple choice exam format — police station representative guide',
    ),
    relatedSlugs: ['psras-exam-preparation-tips', 'what-is-psras', 'pace-code-c-guide'],
    sections: [
      {
        heading: 'What MCQs test',
        paragraphs: [
          'Questions typically probe Code C detention, interview procedure, identification under Code D, and ethical boundaries — application rather than abstract memorisation alone.',
        ],
      },
      {
        heading: 'Timing and exam technique',
        bullets: [
          'Work to a steady pace — flag and return to hard questions',
          'Eliminate obviously wrong distractors',
          'Watch for Code-specific triggers in the stem',
          'Review wrong answers by Code C and Police and Criminal Evidence Act 1984 references',
        ],
      },
      {
        heading: 'Using PSR Train for MCQs',
        paragraphs: [
          'Timed mock sets simulate assessment pressure. Track weak topics and revisit Code C guides before the next mock — spaced repetition beats cramming.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many MCQ papers are there?',
        answer:
          'The authorised assessment route sets the current paper structure — confirm with your firm and assessment organisation for the sitting you are entered for.',
      },
      {
        question: 'Can I use PSR Train instead of official materials?',
        answer:
          'PSR Train supplements official preparation — it does not replace authorised assessment organisation resources or firm supervision.',
      },
      {
        question: 'Which Code appears most in MCQs?',
        answer:
          'Code C dominates; Code D and professional conduct topics are also frequent in PSRAS-style questions.',
      },
    ],
  },
  {
    slug: 'psras-workbook-sign-off',
    published: '2026-11-05',
    category: 'PSRAS',
    title: 'PSRAS Workbook Sign-Off — Firm Expectations Guide',
    h1: 'Getting Your PSRAS Workbook Signed Off',
    description:
      'What firms look for before PSRAS workbook sign-off — supervised attendances, PACE 1984 and Code C analysis, and progression evidence.',
    keywords: ['PSRAS workbook', 'portfolio sign-off', 'supervised attendances', 'police station training', 'accreditation'],
    summary:
      'Workbook sign-off confirms supervised attendances meet PSRAS standards — including PACE 1984 and Code C analysis in reflections. Firms sign when candidates show safe, progressing practice.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'psras-workbook-sign-off',
      'PSRAS workbook sign-off — supervised attendance guide',
    ),
    relatedSlugs: ['psras-portfolio-and-workbook', 'how-to-become-a-police-station-representative', 'what-is-psras'],
    sections: [
      {
        heading: 'What supervisors assess',
        bullets: [
          'Range of attendance types and offence categories',
          'Quality of PACE / Code C issue spotting in reflections',
          'Communication with clients and police',
          'Timely firm reporting and attendance notes',
        ],
      },
      {
        heading: 'Before asking for sign-off',
        paragraphs: [
          'Complete required attendances with documented learning points. Weak reflections that omit Code C issues delay sign-off — tie each attendance to procedure learned under the Police and Criminal Evidence Act 1984.',
        ],
      },
      {
        heading: 'Link to formal assessments',
        paragraphs: [
          'Sign-off is separate from MCQ and CIT sittings but firms rarely enter candidates until workbook standards are met. Treat workbook and exams as parallel tracks.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many attendances are required?',
        answer:
          'The official framework and your firm set the number — check current PSRAS requirements with your supervisor rather than relying on informal targets alone.',
      },
      {
        question: 'Can online training replace attendances?',
        answer:
          'No — PSR Train builds knowledge, but workbook attendances must be real supervised cases with firm sign-off.',
      },
      {
        question: 'What if sign-off is delayed?',
        answer:
          'Ask for specific feedback, improve reflections with Code C references, and seek varied attendance types to demonstrate progression.',
      },
    ],
  },
  {
    slug: 'finding-trainee-rep-roles',
    published: '2026-11-20',
    category: 'Career',
    title: 'Finding Trainee Police Station Rep Roles in England & Wales',
    h1: 'How to Find Trainee Police Station Representative Jobs',
    description:
      'Where to find trainee police station rep roles — criminal defence firms, agencies, and directories — plus PSRAS pathway tips for new candidates seeking supervision.',
    keywords: [
      'trainee police station rep',
      'police station rep jobs',
      'criminal defence careers',
      'PSRAS training',
      'police station representative vacancy',
    ],
    summary:
      'Trainee police station representative roles are advertised by criminal defence firms and agencies. Candidates need firm supervision for PSRAS workbook attendances — online study alone cannot replace a training contract.',
    readMinutes: 6,
    heroImage: guideHeroImage(
      'finding-trainee-rep-roles',
      'Finding trainee police station representative roles in England and Wales',
    ),
    relatedSlugs: ['how-to-become-a-police-station-representative', 'what-is-psras', 'freelance-vs-employed-police-station-rep'],
    sections: [
      {
        heading: 'Where firms advertise',
        bullets: [
          'Crime defence firm websites and LinkedIn',
          'Legal recruitment boards',
          'Rep agencies covering police station rotas',
          'Networking at local Law Society crime groups',
        ],
      },
      {
        heading: 'What to say when applying',
        paragraphs: [
          'Show early PSRAS preparation — PACE 1984 and Code C study on PSR Train, willingness for unsocial hours, and understanding that accreditation requires supervised attendances. Firms hire trainees who reduce their training burden.',
        ],
      },
      {
        heading: 'Directories and cover work',
        paragraphs: [
          'After accreditation, directories such as PoliceStationRepUK help firms find cover — useful context even while you are still seeking a trainee role.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I get a trainee role without experience?',
        answer:
          'Some firms take raw trainees; others want prior legal admin or paralegal experience. Early PSRAS knowledge from structured study strengthens applications.',
      },
      {
        question: 'Are agency roles valid for PSRAS?',
        answer:
          'Supervision must meet PSRAS and firm requirements — confirm the agency arrangement provides proper workbook sign-off and mentor access.',
      },
      {
        question: 'Should I mention PSR Train on my CV?',
        answer:
          'Yes — timed MCQs and Code C modules show serious preparation, provided you clarify PSR Train does not confer accreditation.',
      },
    ],
  },
  {
    slug: 'freelance-vs-employed-police-station-rep',
    published: '2026-12-04',
    category: 'Career',
    title: 'Freelance vs Employed Police Station Rep — Career Guide',
    h1: 'Freelance or Employed: Police Station Representative Careers',
    description:
      'Compare freelance and employed police station rep models — income, supervision, PSRAS reaccreditation, and how reps build practice in England and Wales.',
    keywords: [
      'freelance police station rep',
      'employed police station representative',
      'police station agent',
      'PSRAS career',
      'criminal defence freelance',
    ],
    summary:
      'Police station representatives may work as employees or freelance agents for multiple firms. Both routes require PSRAS accreditation and continuing competence under SRA and Legal Aid Agency expectations.',
    readMinutes: 7,
    heroImage: guideHeroImage(
      'freelance-vs-employed-police-station-rep',
      'Freelance versus employed police station representative careers',
    ),
    relatedSlugs: ['police-station-representative-role', 'finding-trainee-rep-roles', 'how-to-become-a-police-station-representative'],
    sections: [
      {
        heading: 'Employed trainee and rep roles',
        paragraphs: [
          'Employment offers stable supervision, salaried training, and clearer workbook sign-off. Hours may still include nights and weekends tied to firm custody contracts.',
        ],
      },
      {
        heading: 'Freelance and agency work',
        paragraphs: [
          'Freelance reps accept instructions from multiple firms, often paid per attendance. They need strong attendance notes, professional indemnity arrangements, and visibility on directories for repeat work.',
        ],
      },
      {
        heading: 'PSRAS and continuing standards',
        paragraphs: [
          'Both models require valid accreditation and adherence to Code C standards on every attendance. Reaccreditation and firm audits apply regardless of employment status.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which pays more — freelance or employed?',
        answer:
          'Freelance income varies with volume and rates; employment offers predictable pay while training. Compare net income after tax, travel, and insurance.',
      },
      {
        question: 'Can I freelance immediately after accreditation?',
        answer:
          'Some reps do; others build experience employed first. Firms must be willing to instruct you and satisfy LAA and supervision rules.',
      },
      {
        question: 'How do firms find freelance reps?',
        answer:
          'Directories, WhatsApp rotas, and personal networks — maintaining an accurate directory profile helps firms discover cover quickly.',
      },
    ],
  },
  {
    slug: 'cit-time-management-tips',
    published: '2026-12-18',
    category: 'Exams',
    title: 'CIT Time Management — PSRAS Critical Incidents Test Tips',
    h1: 'Time Management for the PSRAS Critical Incidents Test',
    description:
      'How to manage time in PSRAS CIT assessments — prioritisation under pressure, Code C checklist, and scenario practice on PSR Train for police station reps.',
    keywords: ['CIT time management', 'Critical Incidents Test', 'PSRAS exam tips', 'Code C', 'scenario exam', 'PSRAS'],
    summary:
      'The PSRAS Critical Incidents Test rewards structured prioritisation under time limits — usually Code C issues first, client consultation next, then firm reporting. Practice timed scenarios weekly on PSR Train.',
    readMinutes: 6,
    heroImage: guideHeroImage(
      'cit-time-management-tips',
      'CIT time management tips for PSRAS Critical Incidents Test',
    ),
    relatedSlugs: ['critical-incidents-test-psras', 'psras-exam-preparation-tips', 'pace-code-c-guide'],
    sections: [
      {
        heading: 'First two minutes of a CIT scenario',
        paragraphs: [
          'Skim for Code C red flags — missing appropriate adult, unlawful detention under PACE 1984, insufficient disclosure, identification defects under Code D. List issues before drafting your answer structure.',
        ],
      },
      {
        heading: 'Prioritisation order that examiners expect',
        bullets: [
          'Client welfare and consultation',
          'Unlawful procedure / Code C breach',
          'Identification and disclosure gaps',
          'Interview strategy (only once basics are safe)',
          'Firm update and attendance note',
        ],
      },
      {
        heading: 'Building speed with practice',
        paragraphs: [
          'Use PSR Train CIT modules with a timer. Compare your order of points to model answers — speed comes from recognising recurring Code C patterns, not rushing prose.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I write full essays in the CIT?',
        answer:
          'Use clear bullet prioritisation and short justification — examiners mark structure and legal triggers, not essay length.',
      },
      {
        question: 'What if I run out of time?',
        answer:
          'State top two priorities first in practice so partial credit is possible — never leave a scenario blank.',
      },
      {
        question: 'How many timed CITs per week?',
        answer:
          'One to two timed scenarios weekly in the final two months before assessment is a common effective routine alongside MCQ practice.',
      },
    ],
  },
];
