/** Hero image slug → alt text and format for blog posts (used by tests and image generation). */
export const BLOG_IMAGE_MANIFEST: Record<
  string,
  { alt: string; format: 'jpg' | 'png'; scene: string }
> = {
  'first-week-psras-revision-plan': {
    alt: 'Police station representative studying PSRAS revision plan at a desk with legal textbooks',
    format: 'jpg',
    scene: 'A trainee police station representative studying at a desk with PACE Code C textbook, notebook, and laptop showing a revision timetable, warm office lighting, professional UK legal training setting, no text overlays',
  },
  'code-c-first-hour-custody-checklist': {
    alt: 'Police custody suite corridor with custody desk and Code C checklist clipboard',
    format: 'jpg',
    scene: 'Interior of a UK police custody suite reception area, custody desk, clipboard with checklist, neutral institutional lighting, professional documentary style, no readable text',
  },
  'cit-scenario-mistakes-to-avoid': {
    alt: 'PSRAS candidate practising Critical Incidents Test scenario with timer',
    format: 'png',
    scene: 'Legal training candidate at desk practising scenario-based assessment, sticky notes with priorities, timer on desk, focused expression, modern study room, illustration style, no text',
  },
  'psr-portfolio-while-employed': {
    alt: 'Trainee rep balancing day job and PSRAS portfolio workbook at kitchen table',
    format: 'jpg',
    scene: 'Professional balancing laptop from day job and PSRAS training workbook at home kitchen table early evening, tired but determined, realistic photography, UK setting',
  },
  'adverse-inference-interview-advice': {
    alt: 'Police station rep advising client on interview silence and adverse inference',
    format: 'jpg',
    scene: 'Police station consultation room, representative explaining interview options to client across table, serious but calm atmosphere, UK custody suite, no visible faces in detail',
  },
  'pace-code-d-identification-basics': {
    alt: 'Police identification procedure VIPER screen and Code D reference materials',
    format: 'jpg',
    scene: 'Police identification suite with monitor showing photo lineup procedure, legal folder labelled conceptually for ID procedure, professional training context, no readable text on screen',
  },
  'mock-exam-strategy-for-psras': {
    alt: 'Timed PSRAS mock exam on laptop with countdown timer',
    format: 'jpg',
    scene: 'Laptop showing multiple choice exam interface with visible timer, candidate hands on keyboard, exam conditions, clean desk, professional training environment',
  },
  'appropriate-adult-at-custody': {
    alt: 'Appropriate adult attending custody with young vulnerable suspect and rep',
    format: 'png',
    scene: 'Custody consultation room with appropriate adult, young person, and legal representative seated, supportive atmosphere, UK police station, illustration, diverse adults, no text',
  },
  'voluntary-interview-rep-guide': {
    alt: 'Police station representative attending voluntary interview under caution',
    format: 'jpg',
    scene: 'Police interview room prepared for voluntary attendance, empty chairs, recording equipment, representative arriving with file, documentary UK setting',
  },
  'disclosure-before-interview': {
    alt: 'Rep reviewing disclosure documents before police interview advice',
    format: 'jpg',
    scene: 'Legal representative reviewing disclosure papers and police reports in consultation room before interview, magnifying glass, highlighted pages, professional focus',
  },
  'bail-and-rui-police-station-outcomes': {
    alt: 'Custody release desk representing bail and released under investigation outcomes',
    format: 'jpg',
    scene: 'Police custody release area, exit door, clock on wall suggesting time in detention, representative with client leaving custody suite, hopeful mood, UK setting',
  },
  'youth-custody-rep-essentials': {
    alt: 'Youth custody considerations with appropriate adult and rep support',
    format: 'png',
    scene: 'Youth-friendly custody consultation space, appropriate adult and legal rep supporting teenager, calm colours, safeguarding focus, illustration style UK',
  },
  'timed-mcq-techniques-psras': {
    alt: 'Candidate practising timed MCQ techniques for PSRAS assessment',
    format: 'jpg',
    scene: 'Close-up of hands marking multiple choice answer sheet with timer, PACE revision notes beside, exam technique focus, sharp photography',
  },
  'psras-reaccreditation-explained': {
    alt: 'Accredited police station rep renewing PSRAS reaccreditation credentials',
    format: 'jpg',
    scene: 'Experienced legal professional updating accreditation folder and continuing competence records at office desk, certificates on wall blurred, career progression theme',
  },
  'finding-trainee-police-station-rep-jobs': {
    alt: 'Candidate searching for trainee police station representative vacancies',
    format: 'jpg',
    scene: 'Job seeker reviewing criminal defence firm vacancies on laptop, CV and cover letter for trainee rep role, modern home office, UK legal career',
  },
  'caution-and-silence-client-advice': {
    alt: 'Rep explaining police caution and silence rights to client in custody',
    format: 'jpg',
    scene: 'Consultation room, representative gesturing while explaining caution card concept to client, police station setting, educational moment, respectful tone',
  },
  'detention-reviews-under-code-c': {
    alt: 'Custody clock and detention review timeline under PACE Code C',
    format: 'png',
    scene: 'Custody suite wall clock and timeline diagram showing detention review intervals, institutional setting, Code C detention theme, clean infographic illustration without readable labels',
  },
  'ethics-and-conflicts-for-reps': {
    alt: 'Police station rep considering ethics and conflict of interest scenario',
    format: 'jpg',
    scene: 'Legal professional at desk weighing ethical dilemma with two file folders, scales of justice subtle in background, thoughtful expression, UK criminal defence office',
  },
  'telephone-advice-in-custody-cases': {
    alt: 'Rep providing telephone advice for police custody case from office',
    format: 'jpg',
    scene: 'Criminal defence representative on phone taking custody call at night, desk lamp, notepad with times and offence details, realistic late-shift work',
  },
  'six-week-psras-study-plan': {
    alt: 'Six week PSRAS study plan calendar with Code C and CIT milestones',
    format: 'jpg',
    scene: 'Wall calendar with six weeks marked, colour-coded study blocks for PACE Code C MCQs and CIT scenarios, desk with training materials, organised revision plan aesthetic',
  },
  'psras-exam-format-pass-mark-2026': {
    alt: 'PSRAS exam structure diagram with knowledge test, CIT and portfolio components',
    format: 'jpg',
    scene: 'Police station representative training materials on desk showing exam preparation notes, PACE Code C book, structured study plan, professional UK legal education setting',
  },
  'how-to-pass-critical-incidents-test': {
    alt: 'Candidate practising Critical Incidents Test scenario with structured notes',
    format: 'jpg',
    scene: 'Trainee police station rep at desk with scenario notes, four-step framework sticky notes, timer, calm focused study environment',
  },
  'free-psras-practice-questions': {
    alt: 'Timed PSRAS multiple choice practice questions on laptop screen',
    format: 'jpg',
    scene: 'Laptop showing multiple choice quiz interface, legal textbooks, candidate reviewing answers with Code C reference, training desk setup',
  },
};

export const EXPECTED_BLOG_POST_COUNT = 23;
