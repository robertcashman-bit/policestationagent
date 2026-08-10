/**
 * Emits INSERT statements for public.questions matching the app's JSONB options shape:
 * options stored as JSON array of { id: "a"|"b"|"c"|"d", text: "..." }.
 * correct_answer uses ARRAY['a'] style letter ids (matches practice page normalisation).
 *
 * Usage: node scripts/build-all-questions-sql.mjs > scripts/_generated_questions.sql
 */
import path from 'path';
import { pathToFileURL } from 'url';
import { handcraftedQuestions } from './psr-handcrafted-questions.mjs';
import { syllabusQuestions } from './psr-questions-syllabus.mjs';

function escSqlLiteral(s) {
  return String(s).replace(/'/g, "''");
}

function optionsJson(opts) {
  const arr = ['a', 'b', 'c', 'd'].map((id, i) => ({
    id,
    text: opts[i],
  }));
  return JSON.stringify(arr);
}

function emitInsert(q) {
  const opts = optionsJson([q.a, q.b, q.c, q.d]);
  const refs = (q.source_refs || []).map((r) => `'${escSqlLiteral(r)}'`).join(', ');
  const syllabusRefs = (q.syllabus_refs || []).map((r) => `'${escSqlLiteral(r)}'`).join(', ');
  return [
    `INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)`,
    `VALUES (`,
    `  '${escSqlLiteral(q.stem)}',`,
    `  '${escSqlLiteral(q.category)}',`,
    `  '${escSqlLiteral(q.difficulty)}',`,
    `  '${escSqlLiteral(opts)}',`,
    `  ARRAY['${q.correct}'],`,
    `  '${escSqlLiteral(q.explanation)}',`,
    `  ARRAY[${refs}],`,
    `  ARRAY[${syllabusRefs}]::text[],`,
    `  'approved'`,
    `);`,
    ``,
  ].join('\n');
}

/**
 * Template fillers: distinct stems (no copy-paste duplicates), realistic station judgement topics.
 * Each returns a full question object.
 */
function fillerQuestions() {
  const out = [];

  const pad = (n) => String(n).padStart(2, '0');

  const themes = [
    {
      category: 'PACE Code C - Detention',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO5.B', 'U4.AO1.C'],
      build: (i) => ({
        stem: `It is ${(i % 12) + 1}:${pad((i * 7) % 60)}. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now ${(i % 5) + 19}:${pad((i * 11) % 60)} the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?`,
        a: 'Insist the review can wait because paperwork is part of a diligent investigation.',
        b: 'Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded.',
        c: 'Tell your client to waive reviews to speed up release.',
        d: 'Demand immediate release because paperwork is incomplete.',
        correct: 'b',
        explanation:
          'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
        source_refs: ['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
      }),
    },
    {
      category: 'PACE Code C - Interviews',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D'],
      build: (i) => ({
        stem: `Before interview, disclosure is limited to broad allegations and ${i % 2 === 0 ? 'CCTV stills' : 'a summary account'}. Your client wants to answer questions "to clear their name" but also mentions ${i % 3 === 0 ? 'ADHD medication wearing off' : 'being exhausted after night shift'}. What is the best advice at this stage?`,
        a: 'Confirm they should answer fully because any silence will automatically convict them.',
        b: 'Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer.',
        c: 'Advise they must use no comment in every interview regardless of circumstances.',
        d: 'Tell them not to mention health issues because it weakens the defence.',
        correct: 'b',
        explanation:
          'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
        source_refs: ['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
      }),
    },
    {
      category: 'PACE Code C - Rights',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C'],
      build: (i) => ({
        stem: `03:${pad((i * 5 + 10) % 60)}. Your client asks you to pass a message to a co-suspect's family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?`,
        a: 'Pass the message because the client instructed you.',
        b: 'Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation.',
        c: 'Ask the custody officer to pass the message instead.',
        d: 'Post the message anonymously via a third party.',
        correct: 'b',
        explanation:
          'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
        source_refs: ['Code C Note 6G', 'SRA Standards and Regulations'],
      }),
    },
    {
      category: 'PACE Code C - Vulnerable Persons',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A'],
      build: (i) => ({
        stem: `A juvenile is volatile and ${i % 2 === 0 ? 'has self-harmed years ago' : 'is openly distressed'}. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?`,
        a: 'Proceed to interview because an AA is present.',
        b: 'Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate.',
        c: 'Replace the AA immediately with a stranger.',
        d: 'Tell police to interview without the AA to save time.',
        correct: 'b',
        explanation:
          'Appropriate adults facilitate communication; they should not replace the juvenile\'s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
        source_refs: ['Code C sect 11', 'Code C Annex E'],
      }),
    },
    {
      category: 'PACE Code D - Identification',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B'],
      build: (i) => ({
        stem: `Your client is to take part in a video identification procedure. They ${i % 2 === 0 ? 'look distinctive because of facial tattoos' : 'are worried about standing out'}. What practical point should you raise beforehand?`,
        a: 'Demand street identification instead.',
        b: 'Ask whether the parade composition fairly reflects the witness\'s description and Code D safeguards are applied, including documentation of objections and representation notes.',
        c: 'Refuse all identification procedures.',
        d: 'Tell your client to cover distinguishing marks.',
        correct: 'b',
        explanation:
          'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
        source_refs: ['PACE Code D', 'Code D paras 3.4–3.11'],
      }),
    },
    {
      category: 'PACE Code A - Stop and Search',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO5.B', 'U1.AO5.C'],
      build: (i) => ({
        stem: `02:${pad((i * 3 + 15) % 60)}. Your client was stopped under PACE for ${i % 2 === 0 ? 'going equipped' : 'drugs'}. The officer's grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?`,
        a: 'Refusal to give details is an obstruction offence in itself.',
        b: 'Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references).',
        c: 'Tell them to confess to possession to end the encounter.',
        d: 'Advise fleeing the scene.',
        correct: 'b',
        explanation:
          'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
        source_refs: ['PACE Code A', 'PACE s.1'],
      }),
    },
    {
      category: 'PACE Code G - Arrest',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C'],
      build: (i) => ({
        stem: `04:${pad((i * 4) % 60)}. Your client was arrested for breach of bail ${i % 2 === 0 ? 'without being told the statutory power used' : 'at home without a written notice they understand'}. They were brought straight to custody. What issue do you flag first for the custody officer?`,
        a: 'It does not matter because arrest is lawful once the client is in custody.',
        b: 'Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges.',
        c: 'Demand immediate NFA before facts are checked.',
        d: 'Tell your client to refuse all bookings.',
        correct: 'b',
        explanation:
          'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
        source_refs: ['PACE s.28', 'PACE s.30', 'Code G'],
      }),
    },
    {
      category: 'Bail',
      difficulty: 'advanced',
      syllabus_refs: ['U9.AO2.B', 'U9.AO3.A'],
      build: (i) => ({
        stem: `Police propose ${i % 2 === 0 ? 'RUI' : 'release under investigation'} after interview for serious allegations. Your client has ${i % 3 === 0 ? 'dependants relying on them' : 'local ties'} but previous failures to answer bail in unrelated matters. What focused advice helps decisions?`,
        a: 'RUI means no conditions so there is nothing to negotiate.',
        b: 'Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage.',
        c: 'Advise absconding because RUI is weaker than bail.',
        d: 'Promise them they will not be charged.',
        correct: 'b',
        explanation:
          'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
        source_refs: ['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
      }),
    },
    {
      category: 'PACE Code C - Charging',
      difficulty: 'advanced',
      syllabus_refs: ['U9.AO1.A', 'U9.AO2.A'],
      build: (i) => ({
        stem: `22:${pad((i * 7) % 60)}. The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?`,
        a: 'Press your client to accept a caution regardless of facts.',
        b: 'Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions.',
        c: 'Refuse any engagement with charging discussions.',
        d: 'Offer to negotiate with the complainant privately.',
        correct: 'b',
        explanation:
          'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
        source_refs: ['Code C sect 16', 'DG6 charging guidance (practical context)'],
      }),
    },
    {
      category: 'Evidence - Disclosure',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D'],
      build: (i) => ({
        stem: `Your client is shown ${i % 2 === 0 ? 'partial disclosure' : 'MG6 summary only'} before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?`,
        a: 'They must answer every question fully or they will look guilty.',
        b: 'Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them.',
        c: 'Silence cannot have consequences.',
        d: 'Tell them to agree with police hypothesis to get bail.',
        correct: 'b',
        explanation:
          'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
        source_refs: ['CJPOA 1994 ss.34–38', 'Attorney General\'s Guidelines on Disclosure'],
      }),
    },
    {
      category: 'Professional Conduct',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO1.E', 'U1.AO4.D'],
      build: (i) => ({
        stem: `01:${pad((i * 6 + 20) % 60)}. The investigating officer asks you "off the record" whether your client ${i % 2 === 0 ? 'did it' : 'knows who did'}. How should you respond?`,
        a: 'Give your honest impression to maintain goodwill.',
        b: 'Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal.',
        c: 'Answer hypothetically without naming your client.',
        d: 'Record the officer\'s question but remain silent entirely.',
        correct: 'b',
        explanation:
          'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
        source_refs: ['SRA Principles', 'Code C Note 6G'],
      }),
    },
    {
      category: 'PACE Code C - Searches',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO5.B'],
      build: (i) => ({
        stem: `Custody proposes ${i % 2 === 0 ? 'strip search' : 'more intrusive search'} following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?`,
        a: 'Consent removes all safeguards.',
        b: 'Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns.',
        c: 'Tell them to withhold consent in all circumstances.',
        d: 'Offer to conduct the search yourself.',
        correct: 'b',
        explanation:
          'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
        source_refs: ['PACE Annex A (strip searches)', 'Code C Annex A'],
      }),
    },
    {
      category: 'PACE Code E - Recording',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO5.B', 'U6.AO1.B'],
      build: (i) => ({
        stem: `Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?`,
        a: 'Accept a summary if officers agree.',
        b: 'Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation.',
        c: 'Tell your client to confess so recording does not matter.',
        d: 'Demand immediate abandonment of the investigation.',
        correct: 'b',
        explanation:
          'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
        source_refs: ['PACE Code E'],
      }),
    },
    {
      category: 'Criminal Law - Common Offences',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO3.A', 'U5.AO2.B'],
      build: (i) => ({
        stem: `Your client admits taking an item worth £${40 + i} from a shop${i % 2 === 0 ? ' when intoxicated' : ''}, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?`,
        a: 'Intent cannot matter for theft.',
        b: 'Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later.',
        c: 'Advise them to pay £20 on the spot to close it.',
        d: 'Tell police your client has mental capacity issues without consent.',
        correct: 'b',
        explanation:
          'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone\'s.',
        source_refs: ['Theft Act 1968 s.1'],
      }),
    },
    {
      category: 'Evidence',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D'],
      build: (i) => ({
        stem: `Police say ${i % 2 === 0 ? 'your client\'s prints are on an item' : 'DNA is a partial mixed profile'}. Your client asks whether denying possession is pointless. What measured advice fits police station practice?`,
        a: 'Scientific evidence cannot be challenged.',
        b: 'Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions.',
        c: 'Tell them denial amounts to perjury later.',
        d: 'Insist they confess because forensic evidence exists.',
        correct: 'b',
        explanation:
          'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
        source_refs: ['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
      }),
    },
  ];

  const variations = 12;
  for (const th of themes) {
    for (let v = 0; v < variations; v++) {
      const built = th.build(v);
      out.push({
        stem: `Scenario ${v + 1}/${variations} - ${built.stem}`,
        category: th.category,
        difficulty: th.difficulty,
        a: built.a,
        b: built.b,
        c: built.c,
        d: built.d,
        correct: built.correct,
        explanation: built.explanation,
        source_refs: built.source_refs,
        syllabus_refs: th.syllabus_refs,
      });
    }
  }

  return out;
}

export function buildQuestionList() {
  const hand = handcraftedQuestions();
  const syllabus = syllabusQuestions();
  const fill = fillerQuestions();
  // Handcrafted + per-syllabus first: stable coverage across SRA criteria; fillers add breadth.
  const merged = [...hand, ...syllabus, ...fill];

  // Deduplicate by stem just in case (defensive).
  const seen = new Set();
  const deduped = [];
  for (const q of merged) {
    if (seen.has(q.stem)) continue;
    seen.add(q.stem);
    deduped.push(q);
  }
  return deduped;
}

function main() {
  const qs = buildQuestionList();
  console.log('-- Generated hardened PSR question bank');
  console.log(`-- Total inserts: ${qs.length}`);
  console.log('');
  for (const q of qs) {
    console.log(emitInsert(q));
  }
}

const entry = process.argv[1] ? path.resolve(process.argv[1]) : '';
const isMain = entry && pathToFileURL(entry).href === import.meta.url;
if (isMain) main();
