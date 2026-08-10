/**
 * PSRAS-tagged scenario MCQs (SRA updated standards, 29 March 2023).
 * Stems are prefixed "Syllabus …" so they do not collide with filler templates.
 */
function q(stem, category, difficulty, opts) {
  return {
    stem,
    category,
    difficulty,
    a: opts.a,
    b: opts.b,
    c: opts.c,
    d: opts.d,
    correct: opts.correct,
    explanation: opts.explanation,
    source_refs: opts.source_refs,
    syllabus_refs: opts.syllabus_refs,
  };
}

/** @returns {ReturnType<typeof q>[]} */
export function syllabusQuestions() {
  const out = [];
  let n = 0;

  const add = (category, difficulty, syllabus_refs, stem, opts) => {
    n += 1;
    out.push(
      q(`Syllabus ${n}: ${stem}`, category, difficulty, {
        ...opts,
        syllabus_refs,
      }),
    );
  };

  // --- U3: responding to attend (12) ---
  const u3 = 'PSRAS Unit 3 — Request to attend';
  add(u3, 'intermediate', ['U3.AO1.A', 'U3.AO1.D'], 'DSCC gives you a client name, station and offence but no reference number. What do you record before accepting?', {
    a: 'Only the client name; reference numbers are optional.',
    b: 'Obtain and record the DSCC reference number, time of notification, time of acceptance, and time of first contact with the client.',
    c: 'Decline the case until police email a full brief.',
    d: 'Accept verbally and rely on memory.',
    correct: 'b',
    explanation:
      'SRA Unit 3 requires accurate records including DSCC reference and timing. Without a reference, tracing the referral later is harder and professional records suffer.',
    source_refs: ['SRA PSRAS Unit 3', 'DSCC contract requirements'],
  });
  add(u3, 'intermediate', ['U3.AO1.B'], 'A third party who is not a family member calls about a detained friend. What is your first risk assessment?', {
    a: 'Assume they have authority to instruct you.',
    b: 'Assess whether instructions arise from genuine concern for welfare and plan to confirm instructions with the detained person at the earliest opportunity.',
    c: 'Refuse all third-party referrals.',
    d: 'Ask police to confirm the third party is honest.',
    correct: 'b',
    explanation:
      'Third-party referrals need careful triage. DSCC/police referrals carry different default authority; third parties require confirmation with the client.',
    source_refs: ['SRA PSRAS Unit 3'],
  });
  add(u3, 'beginner', ['U3.AO1.B'], 'Police call you directly (not via DSCC) to attend. What minimum information do you seek?', {
    a: 'Only the client surname.',
    b: 'Location, whether arrested or volunteer, suspected offence(s), and why the request bypassed DSCC.',
    c: 'Nothing; attendance is mandatory regardless of detail.',
    d: 'The officer\'s home phone number.',
    correct: 'b',
    explanation:
      'Unit 3 lists different minimums per source. For police, you need location, status, offences, and reason DSCC was not used.',
    source_refs: ['SRA PSRAS Unit 3'],
  });
  add(u3, 'advanced', ['U3.AO4.C', 'U3.AO4.D'], 'You are competent but the case is indictable-only and you are probationary. What is correct?', {
    a: 'Attend anyway because DSCC sent you.',
    b: 'Recognise the prohibition on probationary representatives advising on indictable-only offences; arrange supervision or referral without delay.',
    c: 'Advise in writing only so it does not count.',
    d: 'Let the client self-represent while you observe.',
    correct: 'b',
    explanation:
      'Competence rules are strict. Probationary representatives must not provide advice on indictable-only offences; escalate per firm procedures.',
    source_refs: ['SRA PSRAS Unit 3 AO4'],
  });
  add(u3, 'intermediate', ['U3.AO2.A', 'U3.AO2.B'], 'You telephone custody before travelling. What must you identify?', {
    a: 'Only your mobile number.',
    b: 'Your identity, status, firm, and the fact/source of instructions; ask for the call to be noted on the custody record.',
    c: 'The officer\'s collar number only.',
    d: 'Nothing until you arrive in person.',
    correct: 'b',
    explanation:
      'Unit 3 outcome 2 requires the custody officer to be informed who you are, your status and firm, and the source of instructions, with a custody record note.',
    source_refs: ['SRA PSRAS Unit 3', 'Code C'],
  });
  add(u3, 'intermediate', ['U3.AO2.C'], 'Custody confirms arrest time, detention authorisation time, and that the client requested a solicitor 20 minutes ago. Why does this matter?', {
    a: 'It does not matter for advice.',
    b: 'It helps verify lawful detention timelines, reviews, and whether delay of legal advice is being considered lawfully.',
    c: 'It proves guilt.',
    d: 'It replaces the need to inspect the custody record later.',
    correct: 'b',
    explanation:
      'Initial telephone checks set up later challenges on detention, reviews, and access to advice.',
    source_refs: ['PACE s.40', 'PACE s.58'],
  });
  add(u3, 'advanced', ['U3.AO2.E', 'U1.AO5.C'], 'Custody refuses telephone access to the client before you travel. What is your first step?', {
    a: 'Hang up and drive faster.',
    b: 'Ask for the legal authority for refusal, record it, and consider escalation if access is unlawfully refused.',
    c: 'Tell the client to answer questions anyway.',
    d: 'Threaten the custody officer with IOPC in every case.',
    correct: 'b',
    explanation:
      'Refusals must be tested against PACE s.58 and Code C. Record representations and escalate where appropriate.',
    source_refs: ['PACE s.58', 'SRA PSRAS Unit 3'],
  });
  add(u3, 'intermediate', ['U3.AO3.A'], 'On the phone, the client sounds intoxicated but coherent. What initial advice is most important?', {
    a: 'Answer all police questions to speed release.',
    b: 'Advise on status, right to in-person advice, right to silence, and not to answer substantive interview questions before you arrive if police attempt interview.',
    c: 'Tell them to waive legal advice.',
    d: 'Promise they will be released in one hour.',
    correct: 'b',
    explanation:
      'Unit 3 outcome 3 requires initial advice including not answering interview questions before the representative arrives.',
    source_refs: ['SRA PSRAS Unit 3'],
  });
  add(u3, 'intermediate', ['U3.AO4.C'], 'The client insists you attend in person but DSCC rules and risk factors suggest telephone advice may suffice. What governs?', {
    a: 'Client wishes override DSCC attendance rules.',
    b: 'Balance DSCC mandatory attendance rules, JIIP, vulnerability, confidentiality of telephone advice, and risk assessment outcomes.',
    c: 'Telephone advice is not permitted here.',
    d: 'Only police decide remote vs in-person.',
    correct: 'b',
    explanation:
      'Attendance mode is multi-factor: contractual DSCC obligations, JIIP, vulnerability, and effective communication.',
    source_refs: ['SRA PSRAS Unit 3', 'JIIP'],
  });
  add(u3, 'beginner', ['U3.AO1.C'], 'The DSCC mention mentions the detainee may not speak English. What do you flag for arrival?', {
    a: 'Ignore until interview.',
    b: 'Flag interpreter/translation needs with custody and investigating officers early.',
    c: 'Use the AA as interpreter.',
    d: 'Ask family to translate in interview.',
    correct: 'b',
    explanation:
      'Early flags prevent rushed unfair interviews and align with Code C and Unit 7 expectations.',
    source_refs: ['Code C sect 13', 'SRA PSRAS Unit 3'],
  });
  add(u3, 'intermediate', ['U3.AO4.D'], 'You decide to attend in person and ETA is 50 minutes. What must you communicate?', {
    a: 'Nothing; custody already knows.',
    b: 'Inform custody of attendance decision and likely ETA for the record; tell the client the ETA and not to answer interview questions before you arrive.',
    c: 'Tell police to delay detention clock.',
    d: 'Promise the interview will not happen.',
    correct: 'b',
    explanation:
      'Unit 3 outcome 4 requires both custody and client to be informed and custody record to reflect the plan.',
    source_refs: ['SRA PSRAS Unit 3'],
  });
  add(u3, 'advanced', ['U3.AO1.C', 'U1.AO1.B'], 'The detainee mentions possible immigration enforcement if charged. At the initial call stage, what is appropriate?', {
    a: 'Give detailed immigration advice immediately.',
    b: 'Note the issue, flag referral to an immigration specialist after criminal instructions are clear, and avoid giving immigration advice outside competence.',
    c: 'Tell them immigration consequences do not follow arrest.',
    d: 'Advise them to lie about nationality.',
    correct: 'b',
    explanation:
      'Unit 1 requires considering immigration implications where relevant; station reps coordinate, not improvise immigration law.',
    source_refs: ['SRA PSRAS Unit 1', 'SRA PSRAS Unit 3'],
  });
  add(u3, 'intermediate', ['U3.AO1.A'], 'A client phones you directly from the station landline with an officer listening. What is the priority?', {
    a: 'Take full instructions immediately.',
    b: 'Assess confidentiality; advise on implications of lack of privacy before taking sensitive instructions.',
    c: 'Refuse to act.',
    d: 'Ask the officer to leave without recording the request.',
    correct: 'b',
    explanation:
      'Unit 3 outcome 3 requires assessing whether the conversation is confidential and advising the client accordingly.',
    source_refs: ['SRA PSRAS Unit 3'],
  });

  // --- U4: consulting officers (10) ---
  const u4 = 'PSRAS Unit 4 — Custody and investigation';
  add(u4, 'intermediate', ['U4.AO1.B'], 'You need material essential to challenge arrest or detention under Code C 3.4(b). The custody officer says "none exists". Best response?', {
    a: 'Accept that without more.',
    b: 'Ask what was considered, whether searches or CCTV exist, and record the answer; follow up with the investigating officer.',
    c: 'Demand immediate release.',
    d: 'Tell your client to escape.',
    correct: 'b',
    explanation:
      'Representatives probe superficial "none" answers and record for later review and s.78 arguments where appropriate.',
    source_refs: ['Code C para 3.4(b)', 'SRA PSRAS Unit 4'],
  });
  add(u4, 'intermediate', ['U4.AO1.C'], 'The custody record shows a gap between arrest time and booking time. What should you do?', {
    a: 'Ignore minor gaps.',
    b: 'Question the custody officer, record explanations, and consider implications for detention lawfulness and reviews.',
    c: 'Assume the clock starts at booking.',
    d: 'Rewrite the custody record yourself.',
    correct: 'b',
    explanation:
      'Unit 4 expects identification of unusual entries and questioning discrepancies.',
    source_refs: ['SRA PSRAS Unit 4'],
  });
  add(u4, 'beginner', ['U4.AO1.D'], 'Custody suggests you consult in the corridor within earshot of the desk. What do you insist on?', {
    a: 'Accept if it is quicker.',
    b: 'Private consultation as required by PACE s.58(1), suitably confidential.',
    c: 'Whisper only.',
    d: 'Use a police interview room without recording.',
    correct: 'b',
    explanation:
      'Meaningful private consultation is a baseline entitlement.',
    source_refs: ['PACE s.58(1)', 'SRA PSRAS Unit 4'],
  });
  add(u4, 'advanced', ['U4.AO2.B', 'U4.AO2.C'], 'The officer discloses CCTV stills but will not say what the interview will cover. What is your leverage point?', {
    a: 'There is no right to know interview purpose.',
    b: 'Code C 11.1A requires sufficient information for the client to understand the offence and why suspected; purpose and phased disclosure are relevant to fairness.',
    c: 'Threaten judicial review in every case.',
    d: 'Tell the client to confess to see the rest.',
    correct: 'b',
    explanation:
      'Disclosure and interview purpose shape advice; representatives press for fairness under Code C.',
    source_refs: ['Code C para 11.1A', 'SRA PSRAS Unit 4'],
  });
  add(u4, 'intermediate', ['U4.AO2.D'], 'The client is autistic; police say an AA is "not needed because a solicitor is present". What is wrong?', {
    a: 'A solicitor replaces an AA.',
    b: 'An AA is not interchangeable with legal representation; separate safeguards apply for vulnerable detainees.',
    c: 'Autism does not trigger AA requirements.',
    d: 'Only juveniles need AAs.',
    correct: 'b',
    explanation:
      'Unit 4 requires checking vulnerability arrangements; conflating roles risks unfair process.',
    source_refs: ['Code C', 'SRA PSRAS Unit 4'],
  });
  add(u4, 'advanced', ['U4.AO2.E'], 'The investigating officer refuses to disclose whether a co-suspect has been interviewed. What is proportionate?', {
    a: 'Abandon the case.',
    b: 'Ask whether others are arrested or sought; if refused, seek legal basis, record, and escalate if necessary.',
    c: 'Leak the question to the press.',
    d: 'Promise the client there are no co-suspects.',
    correct: 'b',
    explanation:
      'Unit 4 lists co-arrests as relevant; refusals need authority, record, escalation pathway.',
    source_refs: ['SRA PSRAS Unit 4'],
  });
  add(u4, 'intermediate', ['U4.AO1.B'], 'A prior interview occurred before your arrival. What do you request first?', {
    a: 'Oral summary only.',
    b: 'Authority for interview without you and a copy of the interview record.',
    c: 'Nothing if the client says it went fine.',
    d: 'Delete the prior interview.',
    correct: 'b',
    explanation:
      'Unit 4 requires establishing whether prior interviews happened and obtaining records.',
    source_refs: ['SRA PSRAS Unit 4'],
  });
  add(u4, 'intermediate', ['U4.AO1.E'], 'Custody refuses you a copy of the custody record. What is correct?', {
    a: 'You have no rights to a copy.',
    b: 'You have a right to inspect the full record; if a copy is refused, take comprehensive notes including officer responses.',
    c: 'Photograph the screen secretly.',
    d: 'Bribe the desk.',
    correct: 'b',
    explanation:
      'Inspection is a Code right; copying may be restricted but notes must be thorough.',
    source_refs: ['Code C para 2.4', 'SRA PSRAS Unit 4'],
  });
  add(u4, 'beginner', ['U4.AO2.A'], 'Meeting the investigating officer, what must you confirm about interviews?', {
    a: 'That you intend to be present at interviews.',
    b: 'That you will not attend interviews.',
    c: 'That police can interview without you if busy.',
    d: 'That you approve all questions in advance.',
    correct: 'a',
    explanation:
      'Unit 4 AO2A requires informing the officer you intend to be present at interviews.',
    source_refs: ['SRA PSRAS Unit 4'],
  });
  add(u4, 'advanced', ['U4.AO1.E', 'U1.AO5.C'], 'Custody refuses interview attendance citing "force policy". What is your stance?', {
    a: 'Accept force policy.',
    b: 'Challenge by reference to PACE/Code C rights to attend; record and escalate if refusal persists.',
    c: 'Withdraw.',
    d: 'Bribe the SIO.',
    correct: 'b',
    explanation:
      'Policy cannot lawfully remove statutory attendance rights for interviews.',
    source_refs: ['PACE', 'Code C', 'SRA PSRAS Unit 4'],
  });

  // --- U5: consulting client (10) ---
  const u5 = 'PSRAS Unit 5 — Client consultation';
  add(u5, 'intermediate', ['U5.AO1.B'], 'A young Black client says "you work for the police really". What is best practice?', {
    a: 'Dismiss the concern.',
    b: 'Give calm reassurance on independence, confidentiality, legal aid funding, and how you use information; invite questions.',
    c: 'Show your passport.',
    d: 'Ask police to reassure them.',
    correct: 'b',
    explanation:
      'SRA Unit 5 recognises distrust of state-funded lawyers; additional reassurance is part of gaining trust.',
    source_refs: ['SRA PSRAS Unit 5'],
  });
  add(u5, 'intermediate', ['U5.AO2.A'], 'The client does not understand "indictable" vs "summary". How do you explain?', {
    a: 'Use Latin maxims only.',
    b: 'Use plain language tied to likely court venue, seriousness, and what the police must prove, checking understanding as you go.',
    c: 'Tell them not to worry about it.',
    d: 'Read the charging standard verbatim.',
    correct: 'b',
    explanation:
      'Unit 5 requires explaining the suspected offence in terms the client understands.',
    source_refs: ['SRA PSRAS Unit 5'],
  });
  add(u5, 'advanced', ['U5.AO2.D'], 'Police case looks weak but client wants to "get it over with" by admitting. What is your focus?', {
    a: 'Encourage a quick admission.',
    b: 'Explore instructions, explain consequences of admissions, diversion and sentence discount frameworks, and ensure any admission is truly voluntary and informed.',
    c: 'Refuse to act if they admit guilt.',
    d: 'Promise a non-custodial sentence.',
    correct: 'b',
    explanation:
      'Unit 5 requires reasoned advice on strategy including advantages of admissions and risks.',
    source_refs: ['SRA PSRAS Unit 5', 'Code for Crown Prosecutors'],
  });
  add(u5, 'intermediate', ['U5.AO2.B'], 'The client mentions a significant statement to police. What must you do?', {
    a: 'Ignore it if embarrassing.',
    b: 'Clarify exactly what was said, when, to whom, and whether recorded; obtain disclosure where possible.',
    c: 'Tell them to deny it later.',
    d: 'Assume the officer lied.',
    correct: 'b',
    explanation:
      'Significant statements drive advice and s.34/78 issues; instructions must be accurate.',
    source_refs: ['Code C', 'SRA PSRAS Unit 5'],
  });
  add(u5, 'advanced', ['U5.AO2.C'], 'Instructions reveal a conflict with another firm client. What is the priority?', {
    a: 'Continue quietly.',
    b: 'Stop taking confidential instructions that breach conflict rules; escalate internally and consider withdrawal pathways that protect confidence.',
    c: 'Tell police the conflict.',
    d: 'Pick the richer client.',
    correct: 'b',
    explanation:
      'Unit 5 ethical issues include conflicts; SRA duties apply at the station.',
    source_refs: ['SRA Code of Conduct', 'SRA PSRAS Unit 5'],
  });
  add(u5, 'intermediate', ['U5.AO1.C'], 'Client is medicated for psychosis and seems tired. What is your first safeguarding step?', {
    a: 'Proceed to interview to avoid delay.',
    b: 'Assess fitness for interview and consider healthcare input before substantive interview.',
    c: 'Stop legal advice entirely.',
    d: 'Tell police to discharge.',
    correct: 'b',
    explanation:
      'Unit 5 links vulnerability to fitness for interview under Code C 12.3.',
    source_refs: ['Code C para 12.3', 'SRA PSRAS Unit 5'],
  });
  add(u5, 'beginner', ['U5.AO2.E'], 'Before interview, what should you explain about your role?', {
    a: 'That you will answer questions for them.',
    b: 'When you will intervene, how breaks work, and their right to private advice during interview.',
    c: 'That you work for the police.',
    d: 'That you decide guilt.',
    correct: 'b',
    explanation:
      'Unit 5 AO2E covers interview process and representative role.',
    source_refs: ['SRA PSRAS Unit 5'],
  });
  add(u5, 'intermediate', ['U5.AO1.D'], 'The client alleges rough handling at arrest. What is measured advice?', {
    a: 'Ignore unless there are bruises.',
    b: 'Take a careful account, advise on routes (custody challenge, interview record, complaint), and document for later admissibility.',
    c: 'Demand immediate charge of the officer.',
    d: 'Tell them to exaggerate.',
    correct: 'b',
    explanation:
      'Unit 5 requires addressing complaints about police conduct appropriately.',
    source_refs: ['SRA PSRAS Unit 5'],
  });
  add(u5, 'advanced', ['U5.AO2.D', 'U1.AO4.C'], 'Client asks whether a prepared statement "counts" as answering. What is accurate?', {
    a: 'It is ignored legally.',
    b: 'A prepared statement can set out a defence case; its interaction with later silence and adverse inferences is fact-specific under CJPOA.',
    c: 'It is the same as lying.',
    d: 'It waives privilege automatically.',
    correct: 'b',
    explanation:
      'Prepared statements are a recognised strategy; advice must be nuanced, not absolutist.',
    source_refs: ['CJPOA 1994', 'SRA PSRAS Unit 5'],
  });
  add(u5, 'intermediate', ['U5.AO1.A'], 'You have not yet confirmed duty vs own solicitor status. When must you?', {
    a: 'There is no need to confirm; it is irrelevant.',
    b: 'At the outset of consultation if not already confirmed.',
    c: 'Only at court.',
    d: 'Only if the client asks.',
    correct: 'b',
    explanation:
      'Unit 5 requires confirming duty vs own representation where not already given.',
    source_refs: ['SRA PSRAS Unit 5'],
  });

  // --- U6: interview conduct (10) ---
  const u6 = 'PSRAS Unit 6 — Interview';
  add(u6, 'advanced', ['U6.AO1.A', 'U1.AO4.D'], 'You consider an opening statement referencing detailed instructions about why the client will go no comment. Risk?', {
    a: 'No risk.',
    b: 'Risk of waiving legal professional privilege (R v Bowden); keep opening high-level without revealing privileged reasons for advice.',
    c: 'Privilege is waived automatically in interview.',
    d: 'Opening statements are banned.',
    correct: 'b',
    explanation:
      'Unit 6 highlights privilege waiver risks in openings; keep reasons for advice out of the police record.',
    source_refs: ['R v Bowden [1999] 1 WLR 823', 'SRA PSRAS Unit 6'],
  });
  add(u6, 'intermediate', ['U6.AO1.B'], 'The interview room is overheated and the client is visibly unwell. What do you press for?', {
    a: 'Continue; discomfort is normal.',
    b: 'Suspend interview for breaks / healthcare assessment as appropriate under Code C safeguards.',
    c: 'End representation.',
    d: 'Open a window onto the street.',
    correct: 'b',
    explanation:
      'Physical conditions and breaks are Code-regulated; representatives enforce fairness.',
    source_refs: ['Code C', 'SRA PSRAS Unit 6'],
  });
  add(u6, 'advanced', ['U6.AO2.D'], 'The officer says "no comment makes you look guilty to the jury". What intervention is appropriate?', {
    a: 'None; officers may persuade.',
    b: 'Intervene: mischaracterises the law and improperly pressures silence strategy; ask for correction on record.',
    c: 'Tell the client the officer is correct.',
    d: 'Laugh it off.',
    correct: 'b',
    explanation:
      'Unit 6 requires responding to attempts to undermine silence decisions.',
    source_refs: ['CJPOA 1994', 'SRA PSRAS Unit 6'],
  });
  add(u6, 'intermediate', ['U6.AO2.C'], 'Mid-interview your client begins answering after a no-comment plan. What is appropriate?', {
    a: 'Let them continue silently.',
    b: 'Seek a break for private advice to confirm whether this is a genuine change of strategy.',
    c: 'Shout "objection".',
    d: 'Leave the room.',
    correct: 'b',
    explanation:
      'Unit 6 allows stopping for private advice when the client struggles with a prior strategy.',
    source_refs: ['PACE s.58(1)', 'SRA PSRAS Unit 6'],
  });
  add(u6, 'intermediate', ['U6.AO2.B'], 'The client does not understand a long multi-part question. What may you do without stopping the interview?', {
    a: 'Answer for them.',
    b: 'Assist them to understand the question and answer clearly as intended.',
    c: 'Tell them to say nothing.',
    d: 'Object to every question.',
    correct: 'b',
    explanation:
      'Unit 6 permits limited assistance without undermining the interview process.',
    source_refs: ['SRA PSRAS Unit 6'],
  });
  add(u6, 'advanced', ['U6.AO1.C', 'U9.AO1.A'], 'The officer continues questioning after you believe Code C 11.6 threshold is met. What is your angle?', {
    a: 'It is lawful to continue regardless of the evidence.',
    b: 'Raise that interviewing should cease when sufficient evidence exists for a realistic prospect of conviction; ask for charge decision pathway and record.',
    c: 'Demand jury trial immediately.',
    d: 'Tell the client to flee.',
    correct: 'b',
    explanation:
      'Unit 6 links interview cessation to charge decision frameworks.',
    source_refs: ['Code C para 11.6', 'SRA PSRAS Unit 6'],
  });
  add(u6, 'intermediate', ['U6.AO2.E'], 'Why keep your own interview note?', {
    a: 'Courts disregard them.',
    b: 'To correct misattributed answers, ensure the client said what they intended, support post-interview advice, and charge/bail representations.',
    c: 'To sell to journalists.',
    d: 'To replace the official record.',
    correct: 'b',
    explanation:
      'Unit 6 AO2E lists purposes of a proper note.',
    source_refs: ['SRA PSRAS Unit 6'],
  });
  add(u6, 'advanced', ['U6.AO2.D'], 'The SIO suggests you step outside while they "clarify one detail". What do you do?', {
    a: 'Agree if quick.',
    b: 'Refuse improper exclusion; insist on legal authority on record; escalate if necessary.',
    c: 'Send the AA in your place.',
    d: 'Record nothing.',
    correct: 'b',
    explanation:
      'Attempts to exclude representatives require firm challenge and recording.',
    source_refs: ['SRA PSRAS Unit 6'],
  });
  add(u6, 'beginner', ['U6.AO2.A'], 'What is a core objective of the representative during interview?', {
    a: 'To prove police wrong about everything.',
    b: 'To ensure police fairness and protect the client from inappropriate pressure while keeping an accurate record.',
    c: 'To answer questions for the client.',
    d: 'To negotiate sentence in the room.',
    correct: 'b',
    explanation:
      'Unit 6 lists objectives centred on fairness, client wellbeing, and accurate recording.',
    source_refs: ['SRA PSRAS Unit 6'],
  });
  add(u6, 'intermediate', ['U6.AO1.B'], 'The caution was not re-cautioned after a break exceeding the permitted period. What issue arises?', {
    a: 'No issue arises.',
    b: 'Potential Code breach affecting fairness; seek appropriate remedial steps and record.',
    c: 'Automatic acquittal.',
    d: 'Client loses legal aid.',
    correct: 'b',
    explanation:
      'Cautioning and interview integrity are Code-regulated; remedial steps depend on facts.',
    source_refs: ['Code C', 'SRA PSRAS Unit 6'],
  });

  // --- U7: vulnerability / interpreter (8) ---
  const u7 = 'PSRAS Unit 7 — Vulnerability';
  add(u7, 'intermediate', ['U7.AO1.B'], 'Police arranged a neighbour as AA for a vulnerable adult. What do you check?', {
    a: 'Nothing if they are over 18.',
    b: 'Suitability under Code C 1.7 and Note 1B; independence and ability to support communication.',
    c: 'Any adult is fine.',
    d: 'Only parents qualify.',
    correct: 'b',
    explanation:
      'Unit 7 requires checking AA suitability, not mere box-ticking.',
    source_refs: ['Code C 1.7', 'SRA PSRAS Unit 7'],
  });
  add(u7, 'advanced', ['U7.AO2.B', 'U1.AO4.D'], 'You need an interpreter in consultation; police offer the same interpreter who will interpret the interview. What should you consider?', {
    a: 'Refuse any interpreter as a matter of routine.',
    b: 'Consider whether a separate interpreter is needed for confidential legal advice and impartiality.',
    c: 'Interpreters are police employees.',
    d: 'AA can interpret instead.',
    correct: 'b',
    explanation:
      'Unit 7 flags separate interpreters for consultation where appropriate.',
    source_refs: ['SRA PSRAS Unit 7', 'Code C sect 13'],
  });
  add(u7, 'intermediate', ['U7.AO1.A'], 'A client shows indicators of modern slavery control. What is your first station step?', {
    a: 'Ignore if they deny it.',
    b: 'Take careful instructions without pressuring admissions; consider specialist referral and how s.45 MSA may interact; record indicators.',
    c: 'Tell police they are trafficked without consent.',
    d: 'Promise immunity.',
    correct: 'b',
    explanation:
      'Trafficking indicators require sensitive triage and specialist pathways; avoid reckless disclosures.',
    source_refs: ['Modern Slavery Act 2015', 'SRA PSRAS Unit 7'],
  });
  add(u7, 'beginner', ['U7.AO1.C'], 'What should you explain to a juvenile about the AA?', {
    a: 'The AA is a police officer.',
    b: 'The AA supports communication, observes fairness, and is not the same as your lawyer; confidentiality still matters.',
    c: 'The AA decides guilt.',
    d: 'The AA can be sent home mid-interview without consent.',
    correct: 'b',
    explanation:
      'Unit 7 requires advising on AA role and confidentiality.',
    source_refs: ['SRA PSRAS Unit 7', 'Code C'],
  });
  add(u7, 'intermediate', ['U7.AO2.A'], 'The AA keeps interrupting your legal advice to give their own legal views. What do you do?', {
    a: 'Ignore it.',
    b: 'Re-establish roles: you give legal advice; AA facilitates communication and observes fairness; consider a different AA if unsuitable.',
    c: 'Let the AA take over.',
    d: 'Terminate police contact.',
    correct: 'b',
    explanation:
      'Role confusion undermines the client; representatives correct it firmly and respectfully.',
    source_refs: ['SRA PSRAS Unit 7'],
  });
  add(u7, 'advanced', ['U7.AO1.B'], 'Police refuse an interpreter for a deaf client claiming "lipreading is enough". What is your stance?', {
    a: 'Accept if the client lipreads well.',
    b: 'Press for qualified sign language or other appropriate communication support; record refusal and escalate if necessary.',
    c: 'Withdraw representation.',
    d: 'Use written notes only forever.',
    correct: 'b',
    explanation:
      'Effective communication is a fairness requirement, not a courtesy.',
    source_refs: ['Code C sect 13', 'SRA PSRAS Unit 7'],
  });
  add(u7, 'intermediate', ['U1.AO1.C'], 'A transgender client fears mistreatment in custody. What is appropriate?', {
    a: 'Tell them to hide identity.',
    b: 'Take instructions on risks, record concerns, seek appropriate safeguards and challenge discriminatory treatment.',
    c: 'Disclose their identity to media.',
    d: 'Ignore as irrelevant to criminal case.',
    correct: 'b',
    explanation:
      'SRA vulnerability list includes transgender people; station advocacy includes dignity safeguards.',
    source_refs: ['SRA PSRAS Unit 1', 'Equality Act 2010'],
  });
  add(u7, 'intermediate', ['U7.AO1.A'], 'Neurodivergent client requests breaks every 20 minutes. What is your approach?', {
    a: 'Refuse as disruptive.',
    b: 'Treat as a reasonable adjustment request; negotiate breaks with the officer consistent with Code C expectations.',
    c: 'Tell them to "tough it out".',
    d: 'Cancel the interview permanently.',
    correct: 'b',
    explanation:
      'Breaks and adjustments support reliable answers and fairness.',
    source_refs: ['Code C', 'SRA PSRAS Unit 7'],
  });

  // --- U8: identification (8) ---
  const u8 = 'PSRAS Unit 8 — Identification';
  add(u8, 'intermediate', ['U8.AO1.A'], 'Police refuse the first description record before a video ID. What is your first step?', {
    a: 'Proceed anyway.',
    b: 'Refer them to Code D 3.1; escalate to a senior officer; record the refusal.',
    c: 'Boycott all procedures.',
    d: 'Bribe the SIO.',
    correct: 'b',
    explanation:
      'Unit 8 requires requesting the first description and responding to refusal properly.',
    source_refs: ['Code D para 3.1', 'SRA PSRAS Unit 8'],
  });
  add(u8, 'advanced', ['U8.AO1.B'], 'An eyewitness was shown photographs before a formal procedure while your client\'s identity was known and available. What is the issue?', {
    a: 'No procedural concern arises.',
    b: 'Likely Code D breach; contamination risk; seek disclosure and consider representations on fairness and admissibility.',
    c: 'Irrelevant at trial.',
    d: 'Only matters for juveniles.',
    correct: 'b',
    explanation:
      'Code D restricts photo-shows where the suspect is known and available.',
    source_refs: ['Code D para 3.3', 'SRA PSRAS Unit 8'],
  });
  add(u8, 'intermediate', ['U8.AO1.C'], 'Police propose a group ID on the street. Your client fears safety. What factor is central to advice?', {
    a: 'Street ID is the preferred option here.',
    b: 'Weigh fairness, dignity, safety, and consequences of refusal vs cooperation under Code D routes.',
    c: 'Refuse every identification procedure.',
    d: 'Let police choose without advice.',
    correct: 'b',
    explanation:
      'Unit 8 requires analysing advantages/disadvantages and cooperation consequences.',
    source_refs: ['SRA PSRAS Unit 8', 'Code D'],
  });
  add(u8, 'intermediate', ['U8.AO1.D'], 'Identification is in issue but police will not hold a procedure. What may you consider?', {
    a: 'Nothing.',
    b: 'Whether Code D requires a procedure; make representations and record responses.',
    c: 'Kidnap a witness.',
    d: 'Forge an ID parade.',
    correct: 'b',
    explanation:
      'Unit 8 covers requesting procedures where appropriate.',
    source_refs: ['SRA PSRAS Unit 8'],
  });
  add(u8, 'beginner', ['U8.AO2.A'], 'At the ID suite, you notice eight foils look nothing like the first description. What do you do?', {
    a: 'Say nothing to avoid delay.',
    b: 'Make representations on fairness under Code D and record the response.',
    c: 'Tell your client to pick randomly.',
    d: 'Walk out without explanation.',
    correct: 'b',
    explanation:
      'Representatives safeguard fairness by recorded representations.',
    source_refs: ['Code D', 'SRA PSRAS Unit 8'],
  });
  add(u8, 'intermediate', ['U8.AO2.C'], 'Why make a contemporaneous note at an identification procedure?', {
    a: 'Courts ban notes.',
    b: 'To record process, representations, and responses for later admissibility and client instructions.',
    c: 'To post on social media.',
    d: 'To replace the officer\'s record.',
    correct: 'b',
    explanation:
      'Unit 8 AO2C expects accurate written records.',
    source_refs: ['SRA PSRAS Unit 8'],
  });
  add(u8, 'advanced', ['U8.AO2.B'], 'Your client wants to turn away from the screen during video ID. What is the advice focus?', {
    a: 'Refuse to let them turn away.',
    b: 'Explain how conduct may be interpreted and what refusal/cooperation consequences may be, while respecting dignity concerns.',
    c: 'Tell them to close eyes throughout.',
    d: 'Tell them to walk out mid-procedure without consequence.',
    correct: 'b',
    explanation:
      'Advice should help the client conduct themselves in their best interests while understanding consequences.',
    source_refs: ['SRA PSRAS Unit 8'],
  });
  add(u8, 'intermediate', ['U8.AO1.C'], 'Police threaten adverse inferences if your client refuses a video ID. What is measured?', {
    a: 'Such threats are lawful.',
    b: 'Assess whether the threat is a fair summary of law and process; challenge improper pressure; record.',
    c: 'Ignore all legal risks.',
    d: 'Promise no inferences ever.',
    correct: 'b',
    explanation:
      'Advice must be accurate; representatives challenge improper pressure tactics.',
    source_refs: ['Code D', 'CJPOA 1994', 'SRA PSRAS Unit 8'],
  });

  // --- U9: post-interview (8) ---
  const u9 = 'PSRAS Unit 9 — Post-interview';
  add(u9, 'intermediate', ['U9.AO1.B'], 'After interview without charge, what custody endorsement should you routinely seek?', {
    a: 'No endorsement is needed.',
    b: 'That you must be contacted before any further interview.',
    c: 'That police can interview freely.',
    d: 'That the client waives all rights.',
    correct: 'b',
    explanation:
      'Unit 9 requires protecting against further interviews in the representative\'s absence.',
    source_refs: ['SRA PSRAS Unit 9', 'Code C'],
  });
  add(u9, 'advanced', ['U9.AO1.A', 'U9.AO2.A'], 'Custody wants to charge ABH on thin evidence. What is your primary tool?', {
    a: 'Social media campaign.',
    b: 'Representations on evidential sufficiency / public interest / out-of-court disposals under PACE s.37(7) and CPS tests.',
    c: 'Bribe the custody officer.',
    d: 'Forge alibi evidence.',
    correct: 'b',
    explanation:
      'Charge decisions engage PACE and CPS frameworks; representations must be evidence-based and recorded.',
    source_refs: ['PACE s.37(7)', 'Code for Crown Prosecutors', 'Director\'s Guidance on Charging'],
  });
  add(u9, 'intermediate', ['U9.AO2.B'], 'Client is charged; you believe s.38 PACE bail presumption applies. What is your focus?', {
    a: 'Assume remand without analysis.',
    b: 'Identify whether any s.38 exception is realistically made out; make bail representations and conditions proposals.',
    c: 'Promise bail.',
    d: 'Tell them to abscond.',
    correct: 'b',
    explanation:
      'Post-charge release is the default unless s.38 grounds are satisfied.',
    source_refs: ['PACE s.38', 'SRA PSRAS Unit 9'],
  });
  add(u9, 'beginner', ['U9.AO3.A'], 'Client is charged and confused about next steps. What must you explain?', {
    a: 'Nothing; police will explain.',
    b: 'Charge meaning, first court appearance, likely timetable, and representation/legal aid for court.',
    c: 'That they are definitely going to prison.',
    d: 'That they have no appeal rights.',
    correct: 'b',
    explanation:
      'Unit 9 AO3A requires clear explanation of charge implications.',
    source_refs: ['SRA PSRAS Unit 9'],
  });
  add(u9, 'intermediate', ['U9.AO3.B'], 'Client is RUI after release. What must they understand?', {
    a: 'RUI means NFA.',
    b: 'Investigation may continue; re-contact may happen; they should seek you before any further interview.',
    c: 'Police cannot arrest again.',
    d: 'They can ignore all post.',
    correct: 'b',
    explanation:
      'Post-release advice prevents clients misunderstanding RUI.',
    source_refs: ['SRA PSRAS Unit 9'],
  });
  add(u9, 'advanced', ['U9.AO1.A'], 'Police want a further interview after charge under Code C 16.5 circumstances. What is your first check?', {
    a: 'Refuse outright.',
    b: 'Whether the statutory gateway is satisfied; seek custody endorsement to be contacted; advise client on rights.',
    c: 'Waive attendance.',
    d: 'Delete the charge.',
    correct: 'b',
    explanation:
      'Post-charge interviews are tightly circumscribed; representatives gatekeep lawfulness.',
    source_refs: ['Code C para 16.5', 'SRA PSRAS Unit 9'],
  });
  add(u9, 'intermediate', ['U9.AO2.A'], 'A conditional caution is offered for minor assault. What should you discuss with the client?', {
    a: 'Accept immediately.',
    b: 'Implications for criminal record, immigration, employment, and whether acceptance is genuinely in their interests.',
    c: 'Refuse every conditional caution offered.',
    d: 'Hide the caution from employers.',
    correct: 'b',
    explanation:
      'OOC disposals have serious consequences; advice must be informed.',
    source_refs: ['Code for Crown Prosecutors', 'SRA PSRAS Unit 9'],
  });
  add(u9, 'intermediate', ['U9.AO3.C'], 'Client charged asks if your firm will represent them at court. What is appropriate?', {
    a: 'Promise without instructions.',
    b: 'Explain right to representation and legal aid; take clear instructions on whether to accept instructions for court.',
    c: 'Refuse all court work.',
    d: 'Tell them to self-represent without discussion.',
    correct: 'b',
    explanation:
      'Unit 9 AO3C covers court representation instructions.',
    source_refs: ['SRA PSRAS Unit 9'],
  });

  // --- U2: communication / negotiation (8) ---
  const u2 = 'PSRAS Unit 2 — Communication';
  add(u2, 'intermediate', ['U2.AO1'], 'An officer speaks quickly in jargon during negotiation about disclosure. What is your technique?', {
    a: 'Match their speed with more jargon.',
    b: 'Ask them to slow down; restate their position in plain English; confirm agreement points in writing where possible.',
    c: 'Shout louder.',
    d: 'Refuse to negotiate.',
    correct: 'b',
    explanation:
      'Unit 2 expects precision and clarity; negotiation benefits from plain restatement.',
    source_refs: ['SRA PSRAS Unit 2'],
  });
  add(u2, 'advanced', ['U2.AO2'], 'You want more disclosure before interview. What is a strong negotiation move?', {
    a: 'Threaten the officer personally.',
    b: 'Identify the issue, cite Code C 11.1A fairness, propose a concrete disclosure step, record outcome.',
    c: 'Offer money.',
    d: 'Leak to press.',
    correct: 'b',
    explanation:
      'Effective negotiation identifies issues, cites law, proposes alternatives, records outcomes.',
    source_refs: ['SRA PSRAS Unit 2', 'Code C para 11.1A'],
  });
  add(u2, 'beginner', ['U2.AO3'], 'Your client rambles; you need instructions on one night. What elicitation technique fits?', {
    a: 'Interrupt every sentence.',
    b: 'Use a timeline scaffold ("from 6pm to midnight, hour by hour") and summarise back to check accuracy.',
    c: 'Fill in gaps with guesses.',
    d: 'Record only what helps the police.',
    correct: 'b',
    explanation:
      'Unit 2 expects structured elicitation and accurate recording.',
    source_refs: ['SRA PSRAS Unit 2'],
  });
  add(u2, 'intermediate', ['U2.AO1'], 'A client uses English idioms you do not think they fully understand. What should you do?', {
    a: 'Assume understanding.',
    b: 'Check understanding in simple language; consider interpreter even for "fluent" speakers where legal concepts matter.',
    c: 'Mock their English.',
    d: 'Speak only in idioms.',
    correct: 'b',
    explanation:
      'Unit 2 includes identifying interpreter need and language matched to recipient.',
    source_refs: ['SRA PSRAS Unit 2', 'Code C sect 13'],
  });
  add(u2, 'advanced', ['U2.AO2'], 'Police agree to a short adjournment for healthcare but then shorten it unilaterally. What do you do?', {
    a: 'Accept it.',
    b: 'Re-negotiate time; record the change; consider fairness representations if inadequate for fitness.',
    c: 'Start a fight.',
    d: 'Withdraw silently.',
    correct: 'b',
    explanation:
      'Negotiation includes recording outcomes and pushing back on unfair changes.',
    source_refs: ['SRA PSRAS Unit 2'],
  });
  add(u2, 'intermediate', ['U2.AO3'], 'An ethical issue arises: client wants you to misrecord advice. What is required?', {
    a: 'Comply to keep the client happy.',
    b: 'Refuse; maintain accurate records; explain professional duties; consider disclaimer if they proceed against advice.',
    c: 'Alter records secretly.',
    d: 'Blame the police.',
    correct: 'b',
    explanation:
      'Unit 2 and Unit 1 records duties require integrity in recording advice.',
    source_refs: ['SRA PSRAS Unit 2', 'SRA Principles'],
  });
  add(u2, 'beginner', ['U2.AO1'], 'Why does assertive tone matter when requesting an AA?', {
    a: 'It does not matter.',
    b: 'Clear, calm assertiveness helps secure statutory safeguards without alienating officers you still need to work with.',
    c: 'Only rudeness works.',
    d: 'Only flattery works.',
    correct: 'b',
    explanation:
      'Unit 2 includes speaking effectively and assertively while maintaining professionalism.',
    source_refs: ['SRA PSRAS Unit 2'],
  });
  add(u2, 'intermediate', ['U2.AO2'], 'You propose a break schedule in a long interview. What is the benefit to negotiation?', {
    a: 'There is no negotiation benefit.',
    b: 'It reduces oppressive pressure, supports reliability, and is easier for officers to accept than stopping entirely.',
    c: 'It waives all rights.',
    d: 'It proves guilt.',
    correct: 'b',
    explanation:
      'Alternative approaches (breaks) can unlock agreement where all-or-nothing demands fail.',
    source_refs: ['SRA PSRAS Unit 2', 'Code C'],
  });

  // --- U1: immigration + records + evidence breadth (15) ---
  const u1x = 'PSRAS Unit 1 — Knowledge';
  add(u1x, 'advanced', ['U1.AO1.B'], 'A non-British national asks whether a guilty plea at court could affect leave to remain. At the station, what is appropriate?', {
    a: 'Give definitive immigration advice without research.',
    b: 'Flag immigration risk, avoid definitive immigration law advice outside competence, and arrange specialist advice where needed.',
    c: 'Say immigration consequences do not follow criminal cases.',
    d: 'Tell them to lie about status.',
    correct: 'b',
    explanation:
      'Unit 1 requires considering immigration implications; station reps signpost, not improvise.',
    source_refs: ['SRA PSRAS Unit 1', 'Immigration Act 1971'],
  });
  add(u1x, 'intermediate', ['U1.AO5.B'], 'A foreign national asks for consulate notification. What is true?', {
    a: 'Police can delay it like legal advice.',
    b: 'Consular notification rights under Code C cannot be delayed; facilitate the client\'s choice.',
    c: 'Consulates are irrelevant.',
    d: 'Only US citizens have rights.',
    correct: 'b',
    explanation:
      'Code C sets out foreign national consular rights without delay.',
    source_refs: ['Code C sect 7', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO1.F'], 'Why keep a note of police partial disclosure refusals?', {
    a: 'Courts ignore notes.',
    b: 'It supports later s.78 arguments, complaints, and continuity for colleagues taking over.',
    c: 'It annoys judges.',
    d: 'It replaces disclosure.',
    correct: 'b',
    explanation:
      'Unit 1 AO1F emphasises accurate records including police information and advice.',
    source_refs: ['SRA PSRAS Unit 1', 'PACE s.78'],
  });
  add(u1x, 'beginner', ['U1.AO2.B'], 'What does "actus reus" mean in station advice terms?', {
    a: 'Mental element only.',
    b: 'The prohibited conduct / consequence elements the prosecution must prove, distinct from mens rea.',
    c: 'Sentence only.',
    d: 'Police opinion.',
    correct: 'b',
    explanation:
      'Unit 1 AO2B requires applying legal terms to scenarios.',
    source_refs: ['SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO3.A'], 'Which pair best describes assault occasioning actual bodily harm?', {
    a: 'Any push causing death.',
    b: 'Assault or battery causing more than transient or trifling injury (s.47 OAPA 1861).',
    c: 'A bruise does not count as ABH.',
    d: 'Only if a weapon is used.',
    correct: 'b',
    explanation:
      'Unit 1 AO3A lists ABH as a common offence; reps need practical element recall.',
    source_refs: ['OAPA 1861 s.47', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO3.A'], 'Handling stolen goods requires which mental element?', {
    a: 'Strict liability.',
    b: 'Dishonest possession/knowledge or belief that goods are stolen.',
    c: 'No mens rea.',
    d: 'Recklessness only as to weather.',
    correct: 'b',
    explanation:
      'Handling requires dishonesty and knowledge or belief of theft.',
    source_refs: ['Theft Act 1968 s.22', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'advanced', ['U1.AO4.B'], 'Police want to adduce your client\'s bad character in interview by "just chatting" about old convictions. What risk?', {
    a: 'No risk.',
    b: 'Risk of prejudicial admissions without proper gateway analysis; advise client and consider challenging improper questioning.',
    c: 'Bad character is freely admissible in interview.',
    d: 'Convictions are secret.',
    correct: 'b',
    explanation:
      'Unit 1 AO4B covers character rules; station reps prevent sloppy admissions.',
    source_refs: ['CJA 2003 s.101', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO4.A'], 'In Crown Court trial, who bears the legal burden of proving guilt?', {
    a: 'Defendant must prove innocence.',
    b: 'Prosecution, subject to specific statutory exceptions.',
    c: 'The trial judge.',
    d: 'The jury collectively.',
    correct: 'b',
    explanation:
      'Unit 1 AO4A tests burdens of proof relevant to interview advice.',
    source_refs: ['SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO4.E'], 'Why might you mention s.78 PACE to an officer refusing a break to a distressed client?', {
    a: 'It is irrelevant.',
    b: 'Unfair interview conduct may affect admissibility; breaks support reliability and fairness.',
    c: 'It automatically excludes all evidence.',
    d: 'It cancels the investigation.',
    correct: 'b',
    explanation:
      'Unit 1 AO4E links oppression/unfairness to remedies including exclusion.',
    source_refs: ['PACE s.78', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'beginner', ['U1.AO2.A'], 'Which court typically first deals with an adult charged with either-way offence?', {
    a: 'Crown Court deals with it first.',
    b: 'Magistrates\' court for first appearance; allocation follows.',
    c: 'High Court.',
    d: 'Coroner\'s court.',
    correct: 'b',
    explanation:
      'Unit 1 AO2A expects basic procedural sequence knowledge.',
    source_refs: ['SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO2.D'], 'A community resolution is offered. What should you flag?', {
    a: 'It erases all records magically.',
    b: 'It may still be recorded and can have practical consequences; take instructions before acceptance.',
    c: 'It is identical to NFA.',
    d: 'It requires a jury.',
    correct: 'b',
    explanation:
      'Unit 1 AO2D covers out-of-court disposals; advice must be realistic.',
    source_refs: ['SRA PSRAS Unit 1'],
  });
  add(u1x, 'advanced', ['U1.AO5.C'], 'A breach of Code C may produce which practical consequence?', {
    a: 'Automatic damages payment.',
    b: 'Potential exclusion of evidence, complaints, civil claims, and professional records for trial.',
    c: 'Nothing ever.',
    d: 'Immediate acquittal without trial.',
    correct: 'b',
    explanation:
      'Unit 1 AO5C lists consequences of breach; reps record for later use.',
    source_refs: ['PACE s.78', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO3.C'], 'Self-defence requires what core analysis?', {
    a: 'Defendant hated the victim.',
    b: 'Whether force was necessary and reasonable in the circumstances the defendant believed them to be.',
    c: 'Whether police like the defendant.',
    d: 'Whether the victim had insurance.',
    correct: 'b',
    explanation:
      'Unit 1 AO3C covers general defences such as self-defence.',
    source_refs: ['CJA 2003 s.76', 'SRA PSRAS Unit 1'],
  });
  add(u1x, 'intermediate', ['U1.AO4.D'], 'Which communication is most likely privileged?', {
    a: 'A text to a co-defendant arranging a story.',
    b: 'Confidential legal advice between representative and client for obtaining legal advice.',
    c: 'A Facebook post.',
    d: 'A shout across the custody desk.',
    correct: 'b',
    explanation:
      'Unit 1 AO4D tests LPP basics for station practice.',
    source_refs: ['SRA PSRAS Unit 1'],
  });
  add(u1x, 'advanced', ['U1.AO1.D'], 'An officer refuses your request to record a representation on the custody record. What next step fits?', {
    a: 'Give up.',
    b: 'Make the representation orally again, ask for authority for refusal, note it in your own records, and escalate if appropriate.',
    c: 'Forge the custody record.',
    d: 'Bribe the desk.',
    correct: 'b',
    explanation:
      'Unit 1 breach response includes recording and escalation pathways.',
    source_refs: ['SRA PSRAS Unit 1', 'Code C'],
  });

  return out;
}
