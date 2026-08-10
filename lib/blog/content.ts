import type { BlogPost } from './types';
import { blogHeroImage } from './hero-image';
import { BLOG_POSTS_BATCH_2 } from './content-batch-2';
import { BLOG_POSTS_BATCH_3 } from './content-batch-3';

const BLOG_POSTS_CORE: BlogPost[] = [
  {
    slug: 'first-week-psras-revision-plan',
    published: '2026-06-01',
    category: 'PSRAS Prep',
    title: 'Your First Week of PSRAS Revision: A Practical Plan',
    h1: 'How to Structure Your First Week of PSRAS Revision',
    description:
      'A day-by-day PSRAS revision plan for new police station representative candidates — Code C basics, timed MCQs, and how to avoid common early mistakes.',
    keywords: [
      'PSRAS revision plan',
      'police station rep study',
      'PACE Code C revision',
      'PSRAS exam preparation',
    ],
    summary:
      'Starting PSRAS preparation can feel overwhelming. This first-week plan gives police station representative candidates a realistic structure: baseline reading, timed practice, and firm-aligned goals without pretending one size fits every firm pathway.',
    readMinutes: 9,
    heroImage: blogHeroImage(
      'first-week-psras-revision-plan',
      'Police station representative studying PSRAS revision plan at a desk',
    ),
    relatedSlugs: [
      'code-c-first-hour-custody-checklist',
      'cit-scenario-mistakes-to-avoid',
      'psr-portfolio-while-employed',
    ],
    sections: [
      {
        heading: 'Day 1–2: Map the syllabus before you memorise detail',
        paragraphs: [
          'Before opening a question bank, spend two sessions understanding what PSRAS actually tests. Read your firm’s assessment guidance alongside the SRA syllabus outline for police station representatives. Note the split between underpinning knowledge (PACE, ethics, vulnerability) and skills units (consultation, interview attendance, post-interview decisions).',
          'Create a simple spreadsheet with syllabus tags — U1.AO5.B for key Code provisions, U5 for client consultation, U6 for interview advice, and so on. You are not trying to master everything in week one; you are building a map so later revision has a destination.',
          'If you are still waiting for supervised attendances, use this period for reading only. Firms expect portfolio evidence from live cases, but nobody benefits from starting timed mocks before you can explain what Code C governs in plain English.',
        ],
      },
      {
        heading: 'Day 3–4: Code C foundations and one untimed topic quiz',
        paragraphs: [
          'Days three and four should focus on PACE Code C at an introductory level: detention authorisation, custody clock awareness, the caution, interview breaks, and vulnerable suspect safeguards including appropriate adults. Read the official Code C text in short chunks rather than attempting to absorb the full document in one sitting.',
          'After each chunk, write three sentences in your own words explaining what a rep would check on arrival. This mirrors how CIT scenarios reward structured thinking — not quote-recitation, but practical triggers such as “Has an appropriate adult been considered for this 16-year-old?” or “Was private consultation offered before interview advice?”',
          'Complete one untimed topic quiz on PSR Train or your firm’s materials. Review wrong answers by Code reference, not only by correct letter. If you miss a question on detention reviews, re-read Code C paragraph 15.1 onwards rather than immediately retaking the same quiz.',
        ],
      },
      {
        heading: 'Day 5: First timed MCQ set under soft conditions',
        paragraphs: [
          'On day five, sit a short timed set — twenty questions is enough for week one. Use a kitchen timer or PSR Train’s mock exam mode, but allow yourself a single open-book lookup if stuck. The goal is to feel time pressure without treating the score as a verdict on your career prospects.',
          'Log accuracy by category. Most candidates discover early gaps in identification procedure (Code D awareness) or adverse inference basics. That is useful data for week two, not a reason to panic.',
        ],
        bullets: [
          'Note time per question — PSRAS MCQs are often brisk',
          'Flag any question where you guessed; revisit the explanation',
          'Share your topic weak list with your supervisor if your firm welcomes it',
        ],
      },
      {
        heading: 'Day 6–7: One CIT-style scenario and a firm check-in',
        paragraphs: [
          'End the week with one Critical Incidents-style scenario. Read it twice, list Code C issues, prioritise client consultation, and say your decision trail aloud. PSR Train’s Critical Incidents module is designed for this pattern even though the live SRA CIT is an oral role-play.',
          'Book a fifteen-minute check-in with your supervising solicitor or mentor if possible. Bring your syllabus map, quiz weak topics, and one question from the scenario you found ambiguous. Firms differ on readiness timelines; early alignment prevents studying in isolation from how your practice actually prepares candidates.',
          'Week one is about rhythm, not perfection. Candidates who build a sustainable weekly routine — reading, timed MCQs, one scenario, portfolio reflection when attendances exist — outperform those who cram intensively and then stop for three weeks. PSR Train supplements firm-led preparation; it does not replace supervision, portfolio sign-off, or official assessment organisation materials.',
        ],
      },
    ],
  },
  {
    slug: 'code-c-first-hour-custody-checklist',
    published: '2026-06-03',
    category: 'PACE',
    title: 'Code C in the First Hour: A Custody Rep Checklist',
    h1: 'What to Check in Your First Hour at Custody (PACE Code C)',
    description:
      'A practical PACE Code C checklist for police station representatives arriving at custody — detention, consultation, vulnerability, and interview timing in the first sixty minutes.',
    keywords: [
      'PACE Code C checklist',
      'custody attendance',
      'police station representative',
      'detention reviews',
      'appropriate adult',
    ],
    summary:
      'The first hour at a custody suite sets the tone for the entire attendance. This checklist walks through Code C priorities for accredited reps and trainees: lawful detention, access to the client, vulnerability flags, and whether interview planning is premature.',
    readMinutes: 10,
    heroImage: blogHeroImage(
      'code-c-first-hour-custody-checklist',
      'Police custody suite — PACE Code C checklist for station representatives',
    ),
    relatedSlugs: [
      'first-week-psras-revision-plan',
      'cit-scenario-mistakes-to-avoid',
      'psr-portfolio-while-employed',
    ],
    sections: [
      {
        heading: 'Arrival: authority, disclosure, and the custody record',
        paragraphs: [
          'Confirm your authority to act and who instructed the firm. Read the custody record before seeing the client — not instead of seeing the client, but so your consultation is informed. Code C requires proper recording of detention decisions; reps use the custody record to verify times, grounds, and review schedules.',
          'Check whether detention has been authorised appropriately and whether the custody clock aligns with what custody staff tell you verbally. Discrepancies between the record and oral briefing are common CIT triggers in assessment scenarios and real life.',
          'Request sufficient disclosure to advise on interview strategy. You may not receive everything in hour one, but you should know the offence, circumstance of arrest, and whether the client has been interviewed before on this investigation.',
        ],
      },
      {
        heading: 'Vulnerability and appropriate adults',
        paragraphs: [
          'Code C and related guidance place significant weight on vulnerable suspects — juveniles, those with mental disorders or learning disabilities, and others needing appropriate support. Ask explicitly whether an appropriate adult is required, present, and briefed on their role. Do not assume custody has flagged everything correctly.',
          'If language barriers exist, confirm interpreter arrangements before substantive consultation on interview tactics. Assessment scenarios often embed a failure to offer private consultation or to delay interview until support is in place.',
          'Document your enquiries in attendance notes even when police confirm compliance. Portfolio assessors and firms look for evidence that you actively checked Code C safeguards rather than passively accepting “everything is fine.”',
        ],
      },
      {
        heading: 'Private consultation and interview pressure',
        paragraphs: [
          'Private consultation with your client is a cornerstone of effective representation. In the first hour, resist pressure to advise in corridors or with officers present unless emergency circumstances genuinely require it — and know what those circumstances are under Code C and professional conduct rules.',
          'Clients often arrive anxious and willing to “get it over with.” Your job includes explaining what interview means, what silence protections involve at an introductory level, and why rushing into an interview before you have adequate disclosure may harm their position.',
          'If officers push for early interview, note times and reasons given. Representations about delay may become relevant later; even when they are rejected, the record shows you performed the rep role diligently.',
        ],
      },
      {
        heading: 'First-hour priorities vs peripheral issues',
        paragraphs: [
          'Not every Code C breach appears in the first hour, but prioritisation matters for PSRAS assessments and practice. Client welfare and lawful procedure come before peripheral arguments about bail conditions you cannot yet influence or speculative abuse of process applications without factual foundation.',
          'Trainees sometimes list every imaginable PACE issue without saying what they would do first on site. Supervisors want to see triage: consult the client, secure private advice, challenge unlawful procedure if present, then engage the OIC on disclosure and interview timing.',
          'Use this checklist as a mental model for CIT practice on PSR Train and for real attendances. Pair it with timed MCQs on Code C timelines and one scenario weekly — repetition builds the pattern recognition that hour-one chaos otherwise obscures.',
        ],
        bullets: [
          'Custody record times vs oral briefing',
          'Appropriate adult / interpreter need',
          'Private consultation before interview advice',
          'Disclosure sufficient to advise on strategy',
          'Detention review schedule noted',
        ],
      },
    ],
  },
  {
    slug: 'cit-scenario-mistakes-to-avoid',
    published: '2026-06-05',
    category: 'CIT',
    title: 'Five CIT Scenario Mistakes That Cost Candidates Marks',
    h1: 'Five Critical Incidents Test Mistakes PSRAS Candidates Should Avoid',
    description:
      'Common Critical Incidents Test errors in PSRAS preparation — poor prioritisation, ignoring Code C triggers, and weak client communication in scenario answers.',
    keywords: [
      'Critical Incidents Test',
      'CIT mistakes',
      'PSRAS assessment',
      'police station scenario training',
    ],
    summary:
      'The Critical Incidents Test rewards structured decision-making under pressure. These five mistakes appear repeatedly in trainee answers — in firm mocks and in PSR Train scenario practice — and each has a straightforward fix rooted in PACE Code C priorities.',
    readMinutes: 8,
    heroImage: blogHeroImage(
      'cit-scenario-mistakes-to-avoid',
      'PSRAS candidate preparing for Critical Incidents Test scenario practice',
      'png',
    ),
    relatedSlugs: [
      'first-week-psras-revision-plan',
      'code-c-first-hour-custody-checklist',
      'psr-portfolio-while-employed',
    ],
    sections: [
      {
        heading: 'Mistake 1: Answering before you prioritise',
        paragraphs: [
          'Candidates often jump to “I would tell the client to stay silent” before identifying what has gone wrong in the scenario. Examiners and scenario rubrics look for triage: What is urgent? What is unlawful? What affects client welfare immediately?',
          'Fix: Read twice, bullet Code C issues, number them by urgency, then draft your answer. Verbalising this order in firm mocks helps on assessment day when adrenaline speeds you up.',
        ],
      },
      {
        heading: 'Mistake 2: Ignoring vulnerability triggers',
        paragraphs: [
          'Scenarios frequently embed juveniles, learning disabilities, or inappropriate adults missing from the room. Missing these triggers suggests you are not reading for Code C compliance — only for dramatic interview conflict.',
          'Fix: Scan every scenario for age, mental health hints, language needs, and whether custody flagged vulnerability. State what you would ask the custody officer if information is ambiguous.',
        ],
      },
      {
        heading: 'Mistake 3: Technical language without client advice',
        paragraphs: [
          'Listing PACE paragraphs without plain-language client advice scores poorly. The rep role requires communication skills units as well as knowledge units.',
          'Fix: After each legal point, add one sentence you would say to the client — calm, accurate, and free of jargon where possible. PSR Train scenario feedback often marks this separately from issue-spotting.',
        ],
      },
      {
        heading: 'Mistake 4: Peripheral points before consultation',
        paragraphs: [
          'Complaining about bail conditions or long-term disclosure disputes while the client has not had private consultation is a common ordering error.',
          'Fix: Consult first unless an emergency truly prevents it. Challenge unlawful interview plans before debating secondary evidential points.',
        ],
      },
      {
        heading: 'Mistake 5: No firm reporting or escalation',
        paragraphs: [
          'CIT scenarios sometimes expect you to note when you would escalate to your supervising solicitor — conflicts of interest, serious disclosure failures, or ethical limits on advice.',
          'Fix: End answers with “I would update the firm with X and seek supervisor input on Y.” This mirrors professional practice and completes the decision trail assessors want.',
          'Practice one scenario per week on PSR Train with a timer. Compare your structure to model answers focusing on whether you spotted the same legal triggers, not whether your wording matches verbatim. Transferable Code C reasoning beats memorised scripts.',
        ],
      },
    ],
  },
  {
    slug: 'psr-portfolio-while-employed',
    published: '2026-06-08',
    category: 'Career',
    title: 'Building a PSR Portfolio While Working Full Time',
    h1: 'How to Build Your PSRAS Portfolio While Working Full Time',
    description:
      'Practical tips for trainee police station representatives balancing full-time employment with supervised attendances, workbook reflections, and PSRAS assessment preparation.',
    keywords: [
      'PSRAS portfolio',
      'trainee police station rep',
      'supervised attendances',
      'workbook reflections',
    ],
    summary:
      'Many PSRAS candidates join firms while still employed elsewhere. Balancing unsocial custody hours, workbook quality, and exam preparation is demanding but manageable with firm communication, structured online revision, and realistic weekly goals.',
    readMinutes: 9,
    heroImage: blogHeroImage(
      'psr-portfolio-while-employed',
      'Trainee police station representative balancing work and PSRAS portfolio',
    ),
    relatedSlugs: [
      'first-week-psras-revision-plan',
      'code-c-first-hour-custody-checklist',
      'cit-scenario-mistakes-to-avoid',
    ],
    sections: [
      {
        heading: 'Be honest with your firm about availability',
        paragraphs: [
          'Firms roster custody cover based on availability. If you cannot attend overnight sessions until you leave your current job, say so early. Some practices can phase training; others need immediate cover — better to align expectations before joining than to miss calls repeatedly.',
          'Supervised attendances are not optional extras. Portfolio evidence from real cases demonstrates readiness in ways mock exams alone cannot. Protect at least two to three attendance windows per week once your firm confirms typical call patterns.',
        ],
      },
      {
        heading: 'Workbook quality over quantity',
        paragraphs: [
          'Busy candidates sometimes rush workbook entries with thin narratives. Assessors prefer fewer attendances with strong Code C analysis over many pages describing “attended custody, advised client, left.”',
          'After each attendance, note one PACE issue, one advice decision, and one reflection question. Link weak topics to PSR Train module scores — if identification questions fail repeatedly, reflect on Code D issues from your next ID-related attendance.',
        ],
      },
      {
        heading: 'Online prep in small blocks',
        paragraphs: [
          'Full-time workers rarely have two-hour study blocks daily. Use twenty-minute sessions: ten timed MCQs, one CIT scenario branch, or one Code C paragraph with three bullet notes. PSR Train’s mobile-friendly practice suits commutes and lunch breaks better than attempting weekly cram sessions.',
          'Timed mock exams on PSR Train fit best at weekends when you can simulate assessment conditions. Do not defer all revision until annual leave — consistency beats intensity for PSRAS knowledge retention.',
        ],
      },
      {
        heading: 'Protect sleep and supervision time',
        paragraphs: [
          'Custody work is exhausting. Candidates who burn out before assessments underperform in CIT role-play and written papers alike. Build decompression time after night attendances before you attempt serious revision.',
          'Use supervisor debriefs actively. Fifteen focused minutes after an attendance saves hours of guessing whether your interview advice matched firm standards. Full-time employment makes debriefs easy to skip — treat them as part of the portfolio, not an optional extra.',
          'Balancing employment and accreditation is a marathon common in criminal defence. Firms have seen it before; communicate, document well, and use structured online tools to keep exam preparation moving between attendances.',
        ],
      },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [...BLOG_POSTS_CORE, ...BLOG_POSTS_BATCH_2, ...BLOG_POSTS_BATCH_3];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getBlogPostsByCategory(): Record<BlogPost['category'], BlogPost[]> {
  const map = {
    'PSRAS Prep': [],
    PACE: [],
    CIT: [],
    Career: [],
  } as Record<BlogPost['category'], BlogPost[]>;
  for (const post of BLOG_POSTS) map[post.category].push(post);
  return map;
}

export function getRelatedBlogPosts(slug: string): BlogPost[] {
  const post = getBlogPost(slug);
  if (!post) return [];
  return post.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter((p): p is BlogPost => Boolean(p));
}
