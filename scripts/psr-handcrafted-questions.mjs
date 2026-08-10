/**
 * Handcrafted scenario questions (judgement-led, PSR training standard).
 * Paired with templates in build-all-questions-sql.mjs to reach 189 inserts.
 */
export function handcraftedQuestions() {
  return [
    q(
      '03:20. Your client is drunk but coherent, accused of common assault. Disclosure is a short summary and a vague complainant account. They want to "explain what really happened" on tape. What is the most professional advice?',
      'PACE Code C - Interviews',
      'advanced',
      {
        a: 'Answer every question in full so the officer understands context.',
        b: 'Take clear instructions; explain adverse inference risk in the Crown Court if they later rely on a fact in defence that they could reasonably have mentioned in interview; then choose between controlled answers, a prepared statement, or no comment with eyes open to risk.',
        c: 'Refuse the interview completely because the client is intoxicated.',
        d: 'Adopt no comment in every case where disclosure is short.',
        correct: 'b',
        explanation:
          'This is not a memory test about CJPOA wording. At the station, a competent rep links instructions, disclosure adequacy, fitness to be interviewed, and adverse inference *risk* to strategy. None of the one-size-fits-all options (answer everything, or blanket no comment) is safe without analysis.',
        source_refs: ['CJPOA 1994 ss.34-38', 'Code C sect 12'],
        syllabus_refs: ['U1.AO4.C', 'U5.AO2.D', 'U6.AO1.A'],
      },
    ),
    q(
      'Your client is a juvenile with ADHD, medicated, but has not eaten all day. Officers want to interview now. The appropriate adult is present but disengaged. What is the best *immediate* action set?',
      'PACE Code C - Vulnerable Persons',
      'advanced',
      {
        a: 'Let the interview go ahead to avoid delay complaints.',
        b: 'Raise fitness for interview and effective participation; request breaks/food/health input as needed; ensure the AA understands their role; delay until communication can be meaningful.',
        c: 'Replace medication decisions yourself.',
        d: 'Ask officers to interview without an AA to reduce complexity.',
        correct: 'b',
        explanation:
          'The AA must be capable of assisting communication; vulnerability interacts with fitness for interview under Code C. Rushing interviews late at night with inadequate support risks unreliable answers and fairness challenges.',
        source_refs: ['Code C sect 11', 'Code C Note 12B'],
        syllabus_refs: ['U7.AO1.A', 'U7.AO2.A', 'U5.AO1.C'],
      },
    ),
    q(
      'Your adult client has anxiety and asks you to sit with them in person during consultations because telephone advice feels unsafe. The custody desk insists telephone-only advice is "policy". What do you assert?',
      'PACE Code C - Rights',
      'intermediate',
      {
        a: 'Accept policy because custody can run consultations however they like.',
        b: 'Private consultation with a solicitor under PACE is the baseline entitlement; unnecessary obstruction should be challenged and recorded.',
        c: 'Demand the custody officer personally supervise the consultation.',
        d: 'Tell your client to waive legal advice to speed custody processes.',
        correct: 'b',
        explanation:
          'PACE protects meaningful access to legal advice. Representatives resist blanket policies that prevent genuinely private consultation without justification.',
        source_refs: ['PACE s.58', 'Code C sect 6'],
        syllabus_refs: ['U4.AO1.D', 'U5.AO1.A'],
      },
    ),
    q(
      'The officer discloses a case summary that omits key timing details that your client says are exculpatory. The officer says "you will get the rest at court". What is your best station response?',
      'Evidence - Disclosure',
      'advanced',
      {
        a: 'Instruct your client to answer fully anyway.',
        b: 'Request further disclosure of material needed to give advice; record the limitations; and calibrate interview strategy to the information actually available, including whether a prepared statement sets out the defence case without unsafe Q&A.',
        c: 'Refuse to give any advice until full Crown Court disclosure arrives.',
        d: 'Advise a false alibi to force disclosure.',
        correct: 'b',
        explanation:
          'The station is not a trial, but advice must be informed. Reps ask for reasonable disclosure, document gaps, and avoid strategies that build a case on sand.',
        source_refs: ['Attorney General\'s Guidelines on Disclosure', 'Code C sect 12'],
        syllabus_refs: ['U4.AO1.B', 'U4.AO2.A', 'U5.AO2.A'],
      },
    ),
    q(
      'After a short consultation, your client hands you a folded note and whispers: "Give this to my co-accused in the next cell to read before their interview." What is your position?',
      'PACE Code C - Rights',
      'advanced',
      {
        a: 'You may pass a note if you redact names.',
        b: 'Refuse: you are not a messaging service between suspects; this risks contamination of evidence and can involve serious misconduct; keep your role within lawful advice.',
        c: 'Agree, but read the note aloud to both clients at once.',
        d: 'Email the note to the officer for approval.',
        correct: 'b',
        explanation:
          'Joint enterprise and interview integrity make "message passing" high risk. Professional conduct requires boundaries; privilege is not a smuggling channel.',
        source_refs: ['Code C Note 6G', 'SRA Standards and Regulations'],
        syllabus_refs: ['U1.AO1.E', 'U1.AO4.D'],
      },
    ),
    q(
      'Your client is fit to be interviewed but wants a prepared statement and then to answer questions. The officer says prepared statements "are not allowed" in that force. What is true in terms of your professional approach?',
      'PACE Code C - Interviews',
      'intermediate',
      {
        a: 'The officer is correct: prepared statements are not permitted under PACE.',
        b: 'A prepared statement is a legitimate format; you should assert your client\'s position and record any improper pressure; then take instructions on how to handle follow-up questions.',
        c: 'Insist the client must go no comment only.',
        d: 'Tell the client to read the statement quietly without giving it to police.',
        correct: 'b',
        explanation:
          'PACE and Code C do not abolish prepared statements. Reps stand up to informal "force policy" that conflicts with a suspect\'s established rights to provide a written account.',
        source_refs: ['Code C Note 12C', 'CJPOA 1994 s.34 context'],
        syllabus_refs: ['U5.AO2.D', 'U6.AO1.A'],
      },
    ),
    q(
      'An officer tells you: "We can get a warrant of further detention later, so the 24/36 hour point is not really a hard limit for you to worry about." How should you use this in client advice and custody decision challenges?',
      'PACE Code C - Detention',
      'intermediate',
      {
        a: 'Accept that further detention is routinely available on request.',
        b: 'Treat statutory maxima and review requirements as real: challenge unnecessary delay, ensure reviews are meaningful, and do not let informal comments replace legal limits.',
        c: 'Tell your client time limits do not matter in indictable cases.',
        d: 'Advise that magistrates grant warrants automatically.',
        correct: 'b',
        explanation:
          'Warrant applications are not automatic. Police station advice keeps custody officers to account on diligence and time rules, not office myth.',
        source_refs: ['PACE s.40-s.42', 'Code C para 15'],
        syllabus_refs: ['U1.AO5.B', 'U1.AO1.D'],
      },
    ),
    q(
      'Your client is charged with drug supply after a stop. Police want non-intimate samples using statutory powers. Your client fears "family DNA" being captured. What is the accurate practical advice framework?',
      'PACE Code C - Searches',
      'intermediate',
      {
        a: 'Refuse all sampling; consent is required for any sample.',
        b: 'Distinguish powers, authorisations, and safeguards; explain what is being taken, why, and the limits of use; record concerns; do not invent biometrics paranoia as law.',
        c: 'Agree the police can take any sample they want regardless of powers.',
        d: 'Tell your client to decline and physically resist.',
        correct: 'b',
        explanation:
          'Sampling is tightly regulated. Representatives explain lawful authority and channel objections properly rather than encouraging obstructive behaviour.',
        source_refs: ['PACE ss.61-65', 'Code C Annex I'],
        syllabus_refs: ['U1.AO5.B'],
      },
    ),
    q(
      'Your client has relevant previous convictions that police mention in interview strategy discussions with you. Your client asks whether they should "get them in first". What guidance fits station practice?',
      'Evidence - Character',
      'advanced',
      {
        a: 'Voluntarily disclose every prior conviction in interview.',
        b: 'Explain that bad character rules are trial-stage and context-specific; station admissions can have serious consequences; take instructions before volunteering prejudicial material.',
        c: 'Tell police every conviction whenever asked.',
        d: 'Deny convictions if asked because interviews are confidential.',
        correct: 'b',
        explanation:
          'Bad character gateways under CJA 2003 are not a licence for confession tourism in interview. Advice must protect against unnecessary self-harm.',
        source_refs: ['Criminal Justice Act 2003 ss.100-103'],
        syllabus_refs: ['U1.AO4.B', 'U5.AO2.D'],
      },
    ),
    q(
      'Your client is released under investigation after interview for serious allegations. They believe it means "no further action". What must you clarify?',
      'Bail',
      'beginner',
      {
        a: 'RUI means the investigation has ended.',
        b: 'RUI means investigations may continue; charging decisions may follow; obligations can still arise later and bail conditions may bite at charge.',
        c: 'RUI removes police powers permanently.',
        d: 'RUI is identical to being on court bail with curfew.',
        correct: 'b',
        explanation:
          'Trainees must not give false reassurance. RUI is not NFA and not identical to bail.',
        source_refs: ['College of Policing guidance context'],
        syllabus_refs: ['U9.AO2.B', 'U9.AO3.A'],
      },
    ),
    q(
      'During consultation, your client confesses to you privately to an offence not yet put by police. They ask you to "tell them enough to get bail". What is your professional line?',
      'Professional Conduct',
      'advanced',
      {
        a: 'Hints are fine if you avoid exact wording.',
        b: 'You cannot brief police with privileged instructions or orchestrate selective disclosure; continue lawful representation within ethical boundaries.',
        c: 'Provide anonymous intelligence to the officer.',
        d: 'Withdraw immediately without explaining limits.',
        correct: 'b',
        explanation:
          'Privilege and integrity constrain station advocacy. The scenario tests understanding that reps do not game investigations using confidential admissions.',
        source_refs: ['SRA Codes', 'Code C Note 6G'],
        syllabus_refs: ['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C'],
      },
    ),
    q(
      'The custody officer authorises delay to legal advice on indictable grounds. Your client is distressed and the grounds look thin. What should you do?',
      'PACE Code C - Rights',
      'advanced',
      {
        a: 'Accept superintendent authority without question.',
        b: 'Challenge proportionality, ensure written grounds and authorisation are recorded, remind custody of R v Samuel-type scrutiny, and keep a clear note for review.',
        c: 'Advise your client to waive advice.',
        d: 'Tell the custody officer you will report them to the IOPC immediately in every case.',
        correct: 'b',
        explanation:
          'Delay powers exist but are narrow and tightly supervised in practice. Representatives assert law, not drama.',
        source_refs: ['PACE s.58', 'R v Samuel [1988] QB 615'],
        syllabus_refs: ['U1.AO1.D', 'U1.AO5.C', 'U4.AO1.D'],
      },
    ),
    q(
      'Your client is deaf and requests a qualified interpreter for consultation and interview. Custody says a family member can interpret to save time. What is the correct insistence?',
      'PACE Code C - Vulnerable Persons',
      'intermediate',
      {
        a: 'Family interpreting is best because it is quicker.',
        b: 'Effective communication requires appropriately qualified interpretation for important exchanges; independence matters for reliability and fairness.',
        c: 'Written notes alone are adequate here.',
        d: 'Refuse interview forever.',
        correct: 'b',
        explanation:
          'Practical equality of arms matters. Representatives should resist amateur interpreting that risks oppression or misunderstanding.',
        source_refs: ['Code C sect 13', 'Equality Act 2010 context'],
        syllabus_refs: ['U7.AO1.B', 'U7.AO1.C'],
      },
    ),
    q(
      'Police propose charging GBH on thin injury evidence; your client admits pushing but says self-defence. Investigators want a "quick guilty plea conversation" pre-interview. What do you do?',
      'PACE Code C - Charging',
      'advanced',
      {
        a: 'Encourage a guilty plea to secure bail.',
        b: 'Resist coerced pleas; ensure your client understands charges and evidence; keep charging discussions informed and recorded; avoid you becoming an instrument of improper pressure.',
        c: 'Tell police your client will plead guilty on advice.',
        d: 'Promise a particular sentence outcome.',
        correct: 'b',
        explanation:
          'Station reps support informed decisions, not bargain justice in corridors.',
        source_refs: ['Code C sect 16'],
        syllabus_refs: ['U9.AO1.A', 'U9.AO2.A'],
      },
    ),
    q(
      'Your client wants silence because they fear retaliation. The officer says silence will "look terrible" at trial. What is accurate advice?',
      'PACE Code C - Interviews',
      'advanced',
      {
        a: 'Silence cannot be mentioned at trial.',
        b: 'Explain that adverse inferences may be sought in Crown Court proceedings depending on facts and reliance; fear alone does not remove legal frameworks but may inform disclosure requests and special measures discussions later—not invented station promises.',
        c: 'Promise silence will not be used against them.',
        d: 'Tell them juries do not hear about silence.',
        correct: 'b',
        explanation:
          'Trainees must avoid absolutes. CJPOA inferences are context-dependent; station advice is careful and honest.',
        source_refs: ['CJPOA 1994 s.34'],
        syllabus_refs: ['U6.AO2.D', 'U1.AO4.C'],
      },
    ),
    q(
      'A strip search is proposed on intelligence your client disputes. They agree because they are frightened. What protections should you emphasise?',
      'PACE Code C - Searches',
      'intermediate',
      {
        a: 'Fright removes the need for authority.',
        b: 'Authorisation, necessity, proportionality, dignity safeguards, and contemporaneous records matter; "consent" under pressure is not a blank cheque.',
        c: 'There are no safeguards for adults.',
        d: 'Insist on conducting the search yourself.',
        correct: 'b',
        explanation:
          'PACE Annex A / Code C Annex A set demanding standards; reps protect clients from cosmetic consent.',
        source_refs: ['PACE Annex B strip search powers', 'Code C Annex A'],
        syllabus_refs: ['U1.AO5.B'],
      },
    ),
    q(
      'Your client is interviewed as a volunteer under caution at the station. They think they can leave mid-interview without consequence. What should you correct?',
      'PACE Code C - Interviews',
      'beginner',
      {
        a: 'Volunteers can walk away at any time without any legal implications.',
        b: 'Voluntary interviews can still generate evidence used in proceedings; leaving may have investigative consequences; advice should cover status, caution effects, and risks.',
        c: 'Volunteers have no right to legal advice.',
        d: 'Volunteers cannot be recorded.',
        correct: 'b',
        explanation:
          'Representatives resist myths about "informal" interviews.',
        source_refs: ['Code C Note 11C'],
        syllabus_refs: ['U1.AO5.B', 'U6.AO1.B'],
      },
    ),
    q(
      'Officers request intimate samples under PACE powers after arrest for a qualifying offence. Your client refuses. What is your role?',
      'PACE Code C - Searches',
      'advanced',
      {
        a: 'Tell them to physically obstruct officers.',
        b: 'Clarify powers and consequences of refusal; record concerns; avoid counselling obstruction where lawful compulsion exists; ensure safeguards are met.',
        c: 'Advise refusing regardless of law because consent is king.',
        d: 'Offer DNA from a relative instead.',
        correct: 'b',
        explanation:
          'Intimate samples have strict statutory gateways; representatives navigate lawfully.',
        source_refs: ['PACE ss.62-63'],
        syllabus_refs: ['U1.AO5.B'],
      },
    ),
    q(
      'Your client says police threatened them before you arrived: "You will lose your kids if you don\'t admit it." What immediate actions align with good station practice?',
      'PACE Code C - Interviews',
      'advanced',
      {
        a: 'Ignore it and proceed to interview.',
        b: 'Take a careful note; raise oppression/reliability concerns; consider fitness for interview; request consultation breaks; ensure recording captures vulnerabilities; consider representations about admissibility routes.',
        c: 'Tell your client to confess so childcare is safe.',
        d: 'Promise you can stop admissibility later regardless of facts.',
        correct: 'b',
        explanation:
          'Oppressive conduct engages PACE s.76 thinking and professional safeguarding; reps document and resist.',
        source_refs: ['PACE s.76', 'Code C sect 12'],
        syllabus_refs: ['U6.AO2.D', 'U1.AO4.E', 'U1.AO1.D'],
      },
    ),
    q(
      'You discover your firm also represents a witness police want to call. Your detained client asks you to "share strategies". What is required?',
      'Professional Conduct',
      'advanced',
      {
        a: 'Share strategies discreetly because both are your firm\'s clients.',
        b: 'Identify and manage conflicts; you cannot harmonise defence with witness preparation if duties collide—escalate supervision and separation.',
        c: 'Withdraw silently.',
        d: 'Ask police which client should win.',
        correct: 'b',
        explanation:
          'Conflicts rules apply even under pressure; police station work is not exempt.',
        source_refs: ['SRA Code of Conduct for Solicitors'],
        syllabus_refs: ['U1.AO1.E', 'U5.AO2.C'],
      },
    ),
    q(
      'Your client wants to answer questions but speaks English as an additional language and is exhausted. The officer says an interpreter is unnecessary because they "sound fine". What do you press for?',
      'PACE Code C - Interviews',
      'intermediate',
      {
        a: 'Proceed because sounding fine equals understanding legal concepts.',
        b: 'Insist on interpretation where comprehension is in doubt for a fair interview; fatigue and language interact with reliability.',
        c: 'Use the custody officer as interpreter.',
        d: 'Tell your client to nod along.',
        correct: 'b',
        explanation:
          'Fair interview requires genuine comprehension, not confident impressions.',
        source_refs: ['Code C sect 13'],
        syllabus_refs: ['U7.AO1.B', 'U7.AO1.C'],
      },
    ),
    q(
      'Your client is detained for an indictable offence. Review paperwork is late but custody says "we are busy". What statutory benchmark should you anchor to?',
      'PACE Code C - Detention',
      'intermediate',
      {
        a: 'Reviews are optional when the suite is busy.',
        b: 'The first review must occur within six hours of detention being authorised, then subsequent reviews at not more than nine-hour intervals (subject to specific exceptions).',
        c: 'Reviews happen only at 24 hours.',
        d: 'Reviews are weekly.',
        correct: 'b',
        explanation:
          'This scenario tests practical recall of review intervals tied to station advocacy.',
        source_refs: ['PACE s.40(3)'],
        syllabus_refs: ['U1.AO5.B'],
      },
    ),
    q(
      'Police say they will bail your client with residential conditions if they admit possession in interview. Your client looks to you. What is your response?',
      'PACE Code C - Interviews',
      'advanced',
      {
        a: 'Accept the deal verbally to secure bail.',
        b: 'Reject improper bargaining; admissions must be voluntary and informed; bail decisions must follow lawful routes, not blackmail.',
        c: 'Tell your client to lie to get bail.',
        d: 'Promise bail if they stay silent.',
        correct: 'b',
        explanation:
          'Ethical representation rejects transactional admissions extracted by improper inducements.',
        source_refs: ['PACE s.76', 'Code C sect 12'],
        syllabus_refs: ['U6.AO2.D', 'U1.AO4.E'],
      },
    ),
    q(
      'Your client\'s phone was seized as evidence. They ask you to delete messages remotely after consultation. What is your answer?',
      'Professional Conduct',
      'advanced',
      {
        a: 'Yes, if you use secure deletion.',
        b: 'No: that risks destroying evidence and serious offending; your role is lawful advice, not spoliation.',
        c: 'Yes, if the phone is legally theirs.',
        d: 'Ask the officer to delete messages for them.',
        correct: 'b',
        explanation:
          'Trainees must recognise tipping-off / evidence destruction risks.',
        source_refs: ['Criminal Justice Act 1988 context', 'SRA Principles'],
        syllabus_refs: ['U1.AO1.E'],
      },
    ),
  ];
}

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
    syllabus_refs: opts.syllabus_refs || [],
  };
}
