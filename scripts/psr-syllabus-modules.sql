-- =====================================================
-- PSR Train - PSRAS syllabus alignment: modules
-- Idempotent: tags existing modules with syllabus_refs and
-- adds new modules covering SRA gaps. Apply after migration
-- 0002_syllabus_alignment.sql.
-- =====================================================

-- 0. Ensure (title, category) is unique so ON CONFLICT works.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'content_modules_title_category_unique'
  ) THEN
    ALTER TABLE public.content_modules
      ADD CONSTRAINT content_modules_title_category_unique UNIQUE (title, category);
  END IF;
END $$;

-- =====================================================
-- 1. Tag existing modules with SRA criterion IDs
-- =====================================================

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO1.A','U1.AO1.B','U1.AO1.E']
 WHERE title = 'Introduction to the Police Station Representative Role';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO2.A','U1.AO2.B','U1.AO5.A','U1.AO5.B']
 WHERE title = 'PACE 1984 - Overview and Structure';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO5.A','U1.AO5.B','U1.AO5.C']
 WHERE title = 'PACE Codes of Practice A-H';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO5.B','U4.AO1.D','U5.AO1.A']
 WHERE title = 'Rights of Detained Persons';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO4.C','U1.AO5.B','U6.AO1.B','U6.AO2.A','U6.AO2.B']
 WHERE title = 'Police Interviews';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO1.C','U1.AO5.B','U7.AO1.A','U7.AO1.B','U7.AO2.A','U7.AO2.B']
 WHERE title = 'Vulnerable Persons and Appropriate Adults';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO5.B','U4.AO1.C']
 WHERE title = 'Detention Time Limits and Reviews';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO5.B','U8.AO1.A','U8.AO1.B','U8.AO1.C','U8.AO1.D','U8.AO2.A','U8.AO2.B','U8.AO2.C']
 WHERE title = 'Identification Procedures';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO1.D','U1.AO4.E','U1.AO5.C']
 WHERE title = 'Confessions and Exclusion of Evidence';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO5.B','U9.AO2.B']
 WHERE title = 'Bail at the Police Station';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO1.B','U1.AO1.E','U1.AO4.D','U5.AO2.C']
 WHERE title = 'Professional Conduct for PSRs';

UPDATE public.content_modules
   SET syllabus_refs = ARRAY['U1.AO1.F','U3.AO1.D','U4.AO1.A','U4.AO1.C']
 WHERE title = 'Practical Procedures at the Police Station';

-- =====================================================
-- 2. New modules - filling SRA gaps
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Responding to a request to attend',
  '# Responding to a request to attend

The first 30 minutes after a request often shape the rest of the case. The SRA Unit 3 standards expect a clear, recorded, structured response.

## 1. Sources of the request

- **DSCC** - the most common route. Note the DSCC reference number and accept that this is sufficient authority to act, subject to confirmation by the client.
- **Third party** - assess whether instructions arise from genuine concern for the client. Confirm with the client at the earliest opportunity. Record the relationship to the client.
- **Police** - rare. Ask why the request is not via DSCC. Get name and location, status (arrest or volunteer), and offences.
- **Client direct** - confirm location, arrest status, circumstances and offences.

## 2. Initial information to obtain

| Source | Minimum information |
|---|---|
| DSCC | name, location, offence(s), reference number |
| Third party | relationship to client, arrest circumstances, location |
| Police | location, arrest/volunteer, offence(s), reason DSCC bypassed |
| Client | arrest status, location, reasons and circumstances |

## 3. Authority and obligation to act

- DSCC referrals require **first contact within 45 minutes** of notification.
- In the absence of exceptional circumstances, **attendance in person is mandatory** for: advising and attending all police interviews where the client has been arrested in connection with an offence; identification parades, group identification and confrontations; and where the client complains of serious police maltreatment.
- Probationary representatives may not advise on indictable-only offences.

## 4. Initial vulnerability triage

Even before attending, listen for indicators:
- Age (child or older person)
- Mental disorder or vulnerability
- Inability to speak or understand English
- Immigration status
- Trafficking / modern slavery indicators (controlled movement, no documents, threats)
- Intoxication or withdrawal
- Distrust of state-funded lawyers (note - reassure on independence)

## 5. Telephone consultation with the client

- Introduce yourself and firm; state whether duty or own solicitor/representative.
- Confirm understanding of the right to consult a solicitor free of charge.
- Assess whether the call is confidential (officer present?) and advise the client about the implications.
- Make a preliminary fitness assessment.
- Provide initial advice: status, right to consult in person, right to silence, and **importantly**: do not answer questions if interviewed before you arrive.

## 6. Decide and communicate

- Assess your competence (seriousness, vulnerabilities, your experience).
- Decide on remote vs in-person attendance, having regard to JIIP, vulnerability, intoxication, confidentiality and client wishes.
- Inform the custody officer of your decision and likely arrival time; ask for it to be recorded.
- Tell the client your ETA and remind them not to answer questions before you arrive.

## 7. Records to keep

- Time of first DSCC notification, time of acceptance and time of first contact.
- DSCC reference; third-party relationship.
- Custody officer requests / endorsements.
- Decisions about competence, attendance and rationale.

## Sources

- SRA PSRAS standards Unit 3 (29 March 2023)
- DSCC service requirements (45-minute first contact; in-person mandatory absent exceptional circumstances)
- PACE 1984 s.58
- Joint Interim Interview Protocol (JIIP)
- PACE Code C, Annex B para. 4 (third-party instruction confirmation)',
  'Procedures',
  13,
  ARRAY['U1.AO1.A','U3.AO1.A','U3.AO1.B','U3.AO1.C','U3.AO1.D','U3.AO2.A','U3.AO2.B','U3.AO2.C','U3.AO2.D','U3.AO2.E','U3.AO3.A','U3.AO3.B','U3.AO3.C','U3.AO3.D','U3.AO4.A','U3.AO4.B','U3.AO4.C','U3.AO4.D']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Consulting officers at the police station',
  '# Consulting officers at the police station

You consult with two distinct officers: the **custody officer** and the **investigating officer**. Their roles, powers and the information they hold are different. So is your approach.

## Consulting the custody officer

### Identify and ensure record
- Name, status (solicitor / representative / probationary), firm.
- Confirm your name and firm are recorded in the custody record.

### Information to obtain
- Whether the client has been interviewed prior to your attendance, the authority for it, and a copy of the interview record.
- Whether documents or materials essential to challenging the lawfulness of arrest or detention exist (Code C 3.4(b)) - and copies.
- Risk assessment outcomes and any action taken.

### Inspect the custody record (Code C 2.4)
- Right to inspect the **full** custody record provided this does not interfere with the custody officer''s duties.
- Compare with information already obtained; question discrepancies.
- Check property records.
- Check vulnerability indicators not previously disclosed.
- Identify late or deleted entries; question them.
- Take a copy or full notes including officer responses.

### Confirm consultation and interview rights
- Private consultation with the client (PACE s.58(1)).
- Presence at any police interview (whether arrested or volunteer).

### If the custody officer refuses
1. Ask what the legal authority for refusal is.
2. Direct attention to the relevant PACE / Code provisions.
3. Refer to a senior officer if refusal persists.
4. Consider a formal complaint.
5. Record all representations and responses.

## Consulting the investigating officer

### Identify and confirm intentions
- Identity, status, firm; ensure recorded.
- Confirm intention to be present at interviews.

### Information to obtain (Code C 11.1A)
The client and lawyer must be given sufficient information to understand the nature of the suspected offence and why the client is suspected of it. Push for:
- Circumstances of arrest.
- The evidence the police have, including investigative procedure outputs.
- Investigative procedures planned (searches, ID procedures).
- Any admissions, significant statements or significant silences.
- Other arrests or persons sought.
- Any information that has not been disclosed.

### Purpose of the interview
- What the officer intends to cover.
- Whether multiple interviews are planned (phased disclosure).
- Whether the officer will seek comments on documents or investigative materials.
- The officer''s attitude to diversion from prosecution where appropriate.

### Vulnerability arrangements
- Confirm what arrangements have been made (AA, interpreter, healthcare) and whether they are adequate.

### If the investigating officer refuses
- Ask for legal authority.
- Refer to senior officer; consider complaint.
- Record everything.

## Practical record template

```
Officer: [name, rank, role]
Time: [HH:MM]
Information obtained: [bullets]
Refusals / partial disclosure: [text]
Representations made: [text]
Officer response: [text]
```

## Sources

- SRA PSRAS Unit 4 (29 March 2023)
- PACE 1984 s.58(1)
- PACE Code C paras 2.4, 3.4(b), 11.1A
- PACE Code H para 2.5',
  'Procedures',
  14,
  ARRAY['U4.AO1.A','U4.AO1.B','U4.AO1.C','U4.AO1.D','U4.AO1.E','U4.AO2.A','U4.AO2.B','U4.AO2.C','U4.AO2.D','U4.AO2.E']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Consulting the client',
  '# Consulting the client

A structured client consultation does several things at once: builds trust, assesses fitness, takes instructions, applies the law, and converts all of that into a practical interview strategy.

## 1. Introduction and trust

- State your identity, status and firm.
- Confirm whether duty or own solicitor / representative.
- Confirm legal aid cover.
- Confirm confidentiality and that nothing the client says will go to the police without consent.
- Acknowledge the client''s perspective. Some clients - especially young people from minority ethnic communities - may distrust state-funded lawyers. Reassure on independence and confidentiality directly.

## 2. Immediate needs

Ask about:
- Medication
- Food / water / sleep
- Children or other dependants
- Health, mental state, intoxication

These can drive custody officer requests immediately.

## 3. Fitness for interview (Code C 12.3)

Explore whether the client:
- Understands questions and consequences.
- Can communicate effectively.
- Is affected by intoxication, mental state, illness, fatigue.

If unfit, request medical review and / or delay of interview, and record the basis.

## 4. Concerns about arrest / detention

- How were they arrested?
- Any complaints about police conduct?
- If mistreatment is alleged, decide with the client whether to raise with the custody officer, raise in interview, or pursue a formal complaint.

## 5. Inform the client about the suspected offence

- What you know from the police.
- What the prosecution would have to prove.
- Strengths and weaknesses of the police case (so far as known).
- Other evidence the police may seek.

## 6. Take instructions

- The client''s account of arrest / attendance.
- The client''s account of the relevant facts.
- Significant statements or admissions to police.
- Background and circumstances relevant to the offence and to interview strategy.

## 7. Ethical issues

Identify and act on:
- **Conflict of interest** (e.g. another client involved).
- **Client lying about identity or facts** - cannot be assisted to deceive police; advise carefully.
- Duty of confidentiality vs duty to the court / not to mislead.

If a conflict cannot be managed, withdraw without breaching confidence.

## 8. Reasoned advice on interview strategy

Consider together:
- Strength of the police case.
- Whether the client has a defence.
- Right to silence and **CJPOA 1994 ss.34, 36, 37 adverse inference risk**.
- Sentence discount and diversion possibilities.
- Whether to: answer questions, remain silent, or submit a prepared statement (with controlled answers or no comment thereafter).

## 9. Explain the interview process

- Who will be present.
- Likely tactics (phased disclosure, repetitive questions, silence, confrontation).
- How long it may last; how it is recorded.
- How the client should conduct themselves.
- Your role and the points at which you will intervene or pause.

## Sources

- SRA PSRAS Unit 5 (29 March 2023)
- PACE 1984 s.58
- PACE Code C paras 6, 11, 12.3
- CJPOA 1994 ss.34, 36, 37
- Code for Crown Prosecutors (sentence discount and diversion)',
  'Procedures',
  15,
  ARRAY['U5.AO1.A','U5.AO1.B','U5.AO1.C','U5.AO1.D','U5.AO2.A','U5.AO2.B','U5.AO2.C','U5.AO2.D','U5.AO2.E']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Conduct during interview',
  '# Conduct during interview

The interview is the part of the process where representative behaviour is most visible and most consequential.

## Opening statement (or not)

Consider it where:
- The interviewing officer is unfamiliar.
- An AA or interpreter is present.
- The client has a vulnerability that risks misinterpretation.

It may include: your role; what disclosure you have; what the officer says is the purpose of interview; whether the client will answer questions or submit a prepared statement; the circumstances of intervention.

**Watch privilege**: do not explain the **reasons** for your advice. *R v Bowden [1999]* warns that doing so can waive privilege.

## Compliance with PACE / Codes

Press for compliance and intervene if any of the following slip:
- **Recording** of the interview (Code E).
- The **caution** is given correctly and explained on request.
- The right people are present (and inappropriate persons are not).
- Physical conditions of the room (heating, ventilation, lighting).
- **Breaks and rest periods**: at recognised meal times; at least 15 minutes every two hours; an 8-hour rest period in any 24 hours.

## When the interview must stop (Code C 11.6)

Interviewing must cease when the officer is satisfied all relevant questions have been put, has accounted for other available evidence, and reasonably believes there is sufficient evidence for a realistic prospect of conviction for the offence under interview.

## Your objectives

1. **Police act fairly** at all times.
2. **Client does their best** in interview - whether or not they answer.
3. **Protect the client** from inappropriate pressure, especially if vulnerable.
4. **Accurate record** is kept (yours and theirs).

## Advise without stopping the interview

- Remind the client of a previously agreed strategy (e.g. no comment).
- Help them understand a question.
- Ensure their answer captured what they meant.

## Stop the interview when needed

s.58(1) entitles the client to legal advice in private at any time. Pause for advice if:
- The client is distressed or confused.
- The client is breaking from a strategy.
- The interviewer is acting improperly or unlawfully.

## Intervene against improper conduct

Intervene firmly and on the record where you see:
- Breach of PACE or Codes.
- Improper / unfair questioning (multiple questions in one, oppressive tone).
- Attempts to undermine the client''s right to silence (e.g. "your silence will look terrible at trial" - inaccurate and improper as a station tactic).
- Attempts to undermine or exclude you.

If excluded, ask for the legal basis on tape; refer to a senior officer; record and consider complaint and admissibility consequences (s.78).

## Make a record

Keep a contemporaneous note that lets you:
- Correct an officer who attributes a statement to the client they did not make.
- Confirm the client said all they wanted to say.
- Advise after the interview / before any subsequent interview.
- Support representations on charge or bail.

## Sources

- SRA PSRAS Unit 6 (29 March 2023)
- PACE 1984 ss.58(1), 76, 78
- PACE Code C paras 11.1A, 11.6, 12.8
- PACE Code E (recording)
- *R v Bowden* [1999] 1 WLR 823',
  'Interviews',
  16,
  ARRAY['U6.AO1.A','U6.AO1.B','U6.AO1.C','U6.AO2.A','U6.AO2.B','U6.AO2.C','U6.AO2.D','U6.AO2.E']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Vulnerability deep-dive',
  '# Vulnerability deep-dive

Building on the existing "Vulnerable Persons" module, this module aligns with the SRA Unit 1 AO1.C and Unit 7 standards. Vulnerability is far broader than juveniles and people with mental disorder.

## Identifying vulnerability where it is not obvious

Vulnerability indicators include:
- **Age**: under 18 or older adults less able to navigate the process.
- **Mental disorder or mental vulnerability** (Code C 1.4): person who, because of mental state or capacity, may not understand questions or the significance of answers.
- **Neurodivergence**: ASD, ADHD, dyslexia, dyspraxia, Tourette''s.
- **Sensory and physical disability**: deaf, blind, visually impaired, mobility impaired, speech impediment.
- **Communication**: cannot speak or understand English; English as additional language.
- **Substance use**: alcohol, drugs, withdrawal.
- **Trafficking, modern slavery and exploitation** indicators.
- **Marginalisation**: housing instability, poverty, looked-after status.
- **Sexual orientation, gender identity** considerations.
- **Distrust of state-funded lawyers** - frequently reported by young clients from minority ethnic communities.

## Working with vulnerability indicators

Test, do not assume. Ask open questions; test understanding; observe the client; cross-check with the custody officer and any third party.

## When the police have not acted

Where police have not arranged the AA, interpreter or healthcare assessment that is required:
- Make the request explicit, on the record.
- Refer to senior officer.
- Consider a complaint.
- Record everything for later admissibility / fairness arguments.

## Appropriate Adult (AA)

The AA is **not** simply an observer (Code C 11.17). They must:
- Advise the person being interviewed.
- Observe whether the interview is fair.
- Facilitate communication.

Suitability is governed by Code C 1.7 and Note for Guidance 1B. A parent who cannot effectively support their child is not suitable.

LPP is **not** destroyed by the AA''s presence in a lawyer-client consultation. Ask the AA to keep matters confidential.

## Interpreters

The interpreter''s role is accurate and impartial communication between client, AA (if present), interviewing officer and lawyer. Consider whether you need a **separate** interpreter for the consultation, particularly where the police interpreter has worked closely with the officer.

## Trafficking and modern slavery

Watch for: controlled movement, lack of documents, dependence on a third party for accommodation, fear of certain individuals, recent arrival, debt bondage indicators.

The Modern Slavery Act 2015 s.45 statutory defence may apply. Refer for specialist advice; do not bind the client to admissions before full instructions.

## Distrust of state-funded lawyers

Reassure directly:
- You are independent of the police.
- You are paid via legal aid but are not a state employee.
- Confidentiality is real and protected by privilege.
- You will explain anything the client does not understand and will pause for them at any time.

## Sources

- SRA PSRAS standards Units 1 and 7
- PACE Code C paras 1.4, 1.7, 11.15, 11.17
- Modern Slavery Act 2015 s.45
- Equality Act 2010
- *R v Aspinall* [1999] 2 Cr App R 115
- *R v Everett* [1988] Crim LR 826',
  'Vulnerable Persons',
  17,
  ARRAY['U1.AO1.C','U7.AO1.A','U7.AO1.B','U7.AO1.C','U7.AO2.A','U7.AO2.B']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Immigration implications at the police station',
  '# Immigration implications at the police station

Immigration consequences can outweigh the criminal outcome. The SRA Unit 1 AO1.B expects representatives to *consider* (not advise on) immigration implications and to refer the client appropriately.

## When immigration matters

- Foreign nationals (regardless of length of UK residence).
- People with leave to remain (work, student, family, settled status).
- Refugees and people seeking asylum.
- People without leave to remain.
- People with prior criminal convictions where deportation thresholds are at issue.

## Why it matters at interview

A criminal conviction or even an admission can trigger:
- **Automatic deportation** under the UK Borders Act 2007 s.32 (custodial sentence of 12+ months).
- **Discretionary deportation** under the conducive-to-the-public-good test.
- **Cancellation of leave**.
- Refusal of future applications (asylum, settlement, citizenship).
- **Detention by immigration enforcement** at the conclusion of the criminal process.

## Foreign-national specific PACE rights

- Right to communicate with their consulate (Code C s.7) - cannot be delayed for any reason; consulate may be informed if requested.
- Right to a translation of essential documents and information about rights.
- Right to an interpreter for any matter where this is required to understand the procedure (Code C s.13).

## What to do at the station

1. Identify status sensitively. Some clients fear the lawyer is reporting them.
2. Confirm consulate notification entitlement and ask the client whether they wish it activated.
3. Check that interpreter arrangements are adequate and independent.
4. **Caveat advice**: the criminal outcome interacts with immigration risk; do not promise outcomes.
5. **Refer** to immigration / specialist colleagues for substantive advice; do not freelance.
6. Avoid admissions before specialist advice where deportation is plausibly engaged.

## Particular cautions

- **Out-of-court disposals** are not free of immigration risk. A caution is a recordable disposal that can be disclosed.
- Trafficking and modern slavery may give rise to a Modern Slavery Act 2015 s.45 defence; this also has immigration consequences and overlaps with NRM referrals.
- Records of arrest can affect future applications even without conviction.

## Out of scope

This app provides a framework for *station decision-making*. It is not immigration advice and does not replace OISC- or SRA-regulated immigration practitioners.

## Sources

- UK Borders Act 2007 s.32
- Immigration Act 1971
- Nationality and Borders Act 2022
- PACE Code C paras 7 and 13
- Modern Slavery Act 2015 s.45
- SRA PSRAS Unit 1 AO1.B (29 March 2023)',
  'Procedures',
  18,
  ARRAY['U1.AO1.B','U3.AO1.C','U5.AO1.C']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Foreign nationals, interpreters and translation',
  '# Foreign nationals, interpreters and translation

Effective communication is a precondition of a fair interview. Sounding fluent is not the same as being fluent.

## Code C section 13 - core entitlements

The detained person is entitled to:
- An interpreter wherever this is required for the procedure to be conducted fairly.
- Translation of essential documents (e.g. notice of rights, custody record entries, written statements).
- Note that interpretation should be by a person who is not an investigating officer.

## Choosing the right interpreter

- **Independence** of the police interpreter matters.
- For a consultation, consider whether you need a **separate** interpreter from the one used in interview.
- Family members or AAs are not interpreters; using them risks miscommunication and conflict.

## When fluent-sounding is not enough

- Legal terms (caution, adverse inference, prepared statement) are often beyond conversational fluency.
- Stress, fatigue, intoxication or vulnerability can sharply reduce comprehension.
- Test understanding by asking the client to explain their rights back to you in their own words.

## Practical actions

- Confirm interpreter qualifications and language match (including dialect).
- Insist that interview pace allows accurate consecutive interpretation.
- Ensure the caution is interpreted and explained where needed.
- Record any interpretation issues and remediation steps.
- Preserve translated documents; require translation of any document the client is asked to sign.

## Consulate notification

Foreign nationals are entitled to communicate with their consulate. The right cannot be delayed under any circumstances. The consulate may be told of detention and visit if the client agrees.

## Where there is a refusal

- Ask for the legal authority on the record.
- Refer to a senior officer; consider a complaint.
- Record and consider admissibility / fairness consequences.

## Sources

- PACE Code C section 13
- PACE Code C section 7 (foreign nationals and consulate notification)
- Vienna Convention on Consular Relations 1963 art. 36
- SRA PSRAS Unit 1 AO5.B and Unit 7',
  'Procedures',
  19,
  ARRAY['U1.AO5.B','U7.AO1.B','U7.AO1.C','U7.AO2.A','U7.AO2.B']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Communication and negotiation skills',
  '# Communication and negotiation skills

The SRA Part 2 (Unit 2) outcomes are behavioural and ultimately assessed orally. This module gives a *framework* and worked dialogues. The app cannot replicate live negotiation or active listening; the live skills are practised in the formal CIT and on supervised cases.

## Communication

### Language matched to the recipient
- Lay client: short sentences, no Latin, no acronyms.
- Officer: precise legal references, calm tone.
- AA / interpreter: explain role and confidentiality clearly.

### Active listening
- Allow silence after a question.
- Reflect back what you heard.
- Note what the client *almost* said.

### Interpreter need
- Test comprehension, not fluency.
- Use Teach Back (ask the client to explain back).

### Diversity-aware practice
- Assume nothing about culture, religion, gender or sexuality.
- Be alert to power asymmetry and distrust of state-funded lawyers.

## Negotiation

### Identify the issue precisely
"More disclosure" is not an issue. "Disclosure of the time, location and witness account so I can advise on identification" is.

### Strengths and weaknesses on each side
- Yours: legal authority, ability to refuse interview, ability to make formal complaint.
- Officer''s: time pressure, charging deadlines, custody review pressure.

### The other side''s strategy and tactics
- Phased disclosure to confront mid-interview.
- Building rapport with the client to circumvent advice.
- Pressing for charge to bypass further consultation.

### Generate alternatives
- Prepared statement *plus* selective answers.
- Defer interview pending healthcare or AA reassessment.
- Off-tape pre-interview discussion to surface disclosure scope.

### Record the negotiation outcome
- What was asked.
- What was conceded.
- What was refused and why.
- Any escalation.

## Eliciting information from the client

- Open questions first; closed questions only to confirm.
- Trust-building precedes facts.
- Use timeline mapping ("walk me through that day from when you woke up").
- Watch for ethical issues during instructions.
- Record what was elicited and what advice was given.

## Worked example dialogues

Worked dialogues are included in the practice question bank, particularly under U2 tags, and are central to the CIT scenario bank.

## Out of scope

This is not the formal CIT. The formal CIT is a live role-play assessing oral skills.

## Sources

- SRA PSRAS Unit 2 (29 March 2023)
- PSRAS Critical Incidents Test (assessment guidelines)',
  'Skills',
  20,
  ARRAY['U2.AO1','U2.AO2','U2.AO3']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Common offences breadth',
  '# Common offences breadth

Unit 1 AO3 expects practical knowledge of the *elements* of common offences and the ability to find the elements of unfamiliar offences from statute. This is reference material for use during station consultations.

## Assault

| Offence | Section / Act | Key elements |
|---|---|---|
| Common assault / battery | Criminal Justice Act 1988 s.39 | Apprehension or application of unlawful force; intent or recklessness. |
| ABH | Offences Against the Person Act 1861 s.47 | Common assault + actual bodily harm (more than transient or trifling). |
| Wounding / GBH | OAPA 1861 s.20 | Wounding or really serious harm; intent or recklessness as to *some* harm. |
| Wounding / GBH with intent | OAPA 1861 s.18 | s.20 act + intent to cause GBH (or intent to resist/prevent lawful arrest). |
| Assault on emergency worker | Assaults on Emergency Workers Act 2018 / s.39 / s.47 etc. | Common assault on emergency worker in execution of duty (aggravation). |

## Offences of dishonesty

| Offence | Statute | Key elements |
|---|---|---|
| Theft | Theft Act 1968 s.1 | Dishonest appropriation of property belonging to another with intent to permanently deprive. |
| Robbery | TA 1968 s.8 | Theft with force or threat of force immediately before or at the time. |
| Burglary | TA 1968 s.9 | Trespassory entry as a building / part of a building with relevant intent (or commission of an ulterior offence inside). |
| Aggravated burglary | TA 1968 s.10 | Burglary while in possession of firearm, imitation firearm, weapon of offence or explosive. |
| Handling | TA 1968 s.22 | Dishonestly receiving / undertaking / assisting in the retention etc of stolen goods knowing or believing them stolen. |
| Fraud (false rep / failing to disclose / abuse of position) | Fraud Act 2006 ss.2-4 | Dishonest false representation / failing to disclose info under legal duty / abuse of position; intent to gain or cause loss. |

## Drugs

- Misuse of Drugs Act 1971 categorises drugs as Class A, B and C.
- **Possession** s.5(2): knowing custody / control of a controlled drug.
- **Possession with intent to supply** s.5(3): possession + intent to supply.
- **Supply** s.4: supplying or offering to supply.
- **Production / cultivation** s.4(2) / s.6: production of a controlled drug / cultivation of cannabis.

## Motor vehicle offences

- Taking without consent (TWOC) - Theft Act 1968 s.12.
- Aggravated vehicle taking - s.12A.
- Allowing to be carried - s.12(1).
- Driving while disqualified - Road Traffic Act 1988 s.103.
- Driving without insurance - RTA 1988 s.143.
- Dangerous driving - RTA 1988 s.2.
- Driving under the influence - RTA 1988 s.4 (drink/drugs); s.5 (over the prescribed limit).

## Public order

- Affray - Public Order Act 1986 s.3.
- Threatening, abusive or insulting words / behaviour with intent (s.4) or causing harassment, alarm or distress (intentional / reckless) - s.4A and s.5.

## Criminal damage

- Criminal Damage Act 1971 s.1 - destroy or damage property belonging to another, intent or recklessness; aggravated forms (endangering life).

## Possessing offensive weapons / bladed articles

- Prevention of Crime Act 1953 s.1 - offensive weapon in public place.
- Criminal Justice Act 1988 s.139 - bladed or sharply-pointed article in public place.
- Statutory defences: lawful authority, reasonable excuse, religious reasons, work, education etc.

## Modes of participation

- Principal: actually commits the offence.
- Accessory: aid, abet, counsel or procure.
- Joint venture: parties acting together with foresight of the offending.
- Attempt: act more than merely preparatory with intent (Criminal Attempts Act 1981).

## When the offence is unfamiliar

- Use the live statute (legislation.gov.uk).
- Practitioner texts (Blackstone''s, Archbold).
- Identify *actus reus*, *mens rea*, defences, mode of trial, sentencing.
- Apply the elements to the client''s account.

## Defences relevant to common offences

- General: self-defence, prevention of crime, mistake of fact, duress (limited).
- Specific: e.g. lawful authority / reasonable excuse for weapons.
- Modern Slavery Act 2015 s.45 (limited offences).

## Sources

- SRA PSRAS Unit 1 AO3
- Theft Act 1968; OAPA 1861; Fraud Act 2006; MDA 1971; RTA 1988; POA 1986; CDA 1971; CAA 1981; PoCA 1953; CJA 1988
- Modern Slavery Act 2015 s.45',
  'Criminal Law',
  21,
  ARRAY['U1.AO2.C','U1.AO3.A','U1.AO3.B','U1.AO3.C']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Evidence rules at the station',
  '# Evidence rules at the station

Unit 1 AO4 expects a *practical* understanding of evidence rules in the context of station advice - that is, evidence as it shapes interview strategy, not as a trial-stage exposition.

## Burdens and standards

- **Legal burden**: who must prove what; default is the prosecution.
- **Evidential burden**: who must put a defence in play.
- **Standard**: prosecution beyond reasonable doubt; defence (where applicable) on the balance of probabilities.
- **Reverse burdens**: certain offences (some firearms, MDA 1971 s.28 statutory defences, drink-driving "special reasons") shift the legal burden to the defence on the balance of probabilities. Read carefully before advising.

## Hearsay and exceptions

- The general rule excludes out-of-court statements adduced as evidence of their truth.
- Exceptions: business documents, statements of complainants, dying declarations, statutory provisions (Criminal Justice Act 2003 ss.114-118).
- Implication for station advice: a complainant''s out-of-court statement may not come in at trial; do not over-react in interview.

## Character

- Bad character is admissible only via gateways (CJA 2003 s.101): defendant''s bad character / propensity / important explanatory evidence / important matter in issue / etc.
- Adducing your client''s **good** character at interview is rarely the right place; preserve good character for trial.

## Identification evidence

- *Turnbull* warning territory: ID evidence requires careful direction in court.
- Code D procedural compliance can decide admissibility.
- ID strategy at the station turns on Code D procedure choice and witness contamination prior to procedure.

## Confessions (PACE s.76)

- Mandatory exclusion if obtained by oppression or in circumstances likely to render unreliable.
- Discretionary exclusion via s.78 unfairness.
- Co-accused confessions are admissible against the maker; against another only if the maker testifies and is cross-examined.

## s.78 unfairness

A flexible safeguard. Triggers include: significant breach of PACE / Codes; oppression short of s.76; ID procedure failures; AA / interpreter failures; entrapment in some forms.

## Interview strategy and evidential consequences

| Strategy | What it costs / saves |
|---|---|
| Full answers | Risk of damaging admissions; allows evidence of denial. |
| Selective silence | Risk of CJPOA 1994 s.34 inferences. |
| Failure to account for object/substance/mark / presence | Risk of s.36 / s.37 inferences. |
| Lying | Trial-stage credibility hit; may amount to perverting course of justice. |
| Confession | Admissible subject to s.76 / s.78. |
| Prepared statement | Sets out defence case; reduces s.34 inferences if reasonably relied on; subsequent no-comment is generally consistent. |

## Legal professional privilege

- Covers communications between lawyer (or representative) and client made for the purpose of giving / obtaining legal advice.
- The presence of an AA or interpreter does not destroy LPP.
- LPP **does not** apply to communications made to further crime or fraud (the iniquity exception).
- Privilege can be waived expressly or by inadvertent reference to the reasons for advice (R v Bowden).

## Sources

- PACE 1984 ss.76, 78
- Criminal Justice Act 2003 ss.98-113
- CJPOA 1994 ss.34, 36, 37
- *R v Turnbull* [1977] QB 224
- *R v Bowden* [1999] 1 WLR 823
- *R v Hanson* [2005] 1 WLR 3169',
  'Evidence',
  22,
  ARRAY['U1.AO4.A','U1.AO4.B','U1.AO4.C','U1.AO4.D','U1.AO4.E','U1.AO5.B']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Records and breach response',
  '# Records and breach response

Unit 1 AO1.D and AO1.F expect representatives to recognise breaches and know what to do about them. The standard is *not* to demand legal remedies; it is to ensure the breach is recorded, escalated and ultimately admissible.

## Why records matter

- They are the only contemporaneous evidence of what happened.
- They underpin admissibility arguments (s.78), s.76 challenges, complaints and civil action.
- They allow another solicitor or representative to take over without losing context.

## What to record

- Information obtained from the police (including who, when, what was refused).
- Instructions from the client (including significant statements / silences).
- Action taken (calls, requests, custody record endorsements).
- Advice given to the client.
- Any signed disclaimer if the client goes against advice.

## Custody record endorsements

Things to ask the custody officer to endorse:
- Your arrival and identity.
- Refusals (disclosure, attendance, private consultation).
- Concerns about fitness for interview.
- Requests for AA, interpreter, healthcare.
- Post-interview: that you must be contacted before any further interview.

## Levels of escalation when something goes wrong

1. **Raise on the record** with the officer responsible.
2. **Refer to a senior officer** (custody officer to inspector / inspector to superintendent etc.).
3. **Make a formal complaint** under the Police (Complaints and Misconduct) Regulations.
4. **Civil action** for unlawful detention, assault, breach of Article 5 / 8 ECHR.
5. **Raise admissibility** under s.78 / s.76 in the criminal proceedings.

## Specific breaches to look for

- Refusal of / inadequate disclosure (Code C 11.1A).
- Inadequate facility for private consultation (s.58).
- Oppressive or unfair interrogation technique.
- Breach of caution / break / rest period rules.
- Failure to call AA / interpreter where required.
- Unauthorised delay of legal advice (s.58(8)).

## Practical templates

```
TIME [HH:MM] - [event]
OFFICER: [name, rank]
REQUEST / OBSERVATION: [what was said]
RESPONSE: [what was done]
REPRESENTATION: [what I asked to be recorded]
```

## What you should not do

- Do not threaten complaints to win small points.
- Do not make complaints without instructions where the client may bear consequences.
- Do not promise admissibility outcomes.

## Sources

- SRA PSRAS Unit 1 AO1.D and AO1.F
- PACE 1984 ss.58, 76, 78
- PACE Code C paras 2.4, 11.1A
- Police (Complaints and Misconduct) Regulations 2020',
  'Procedures',
  23,
  ARRAY['U1.AO1.D','U1.AO1.F','U1.AO5.C','U4.AO1.E','U4.AO2.E']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Post-interview - charging and re-interview',
  '# Post-interview - charging and re-interview

Unit 9 expects representatives to act decisively at the end of interview: prevent improper further questioning, make appropriate representations on charge / release, and explain decisions to the client.

## Stop further questioning without you

- If a charge decision has not been made and the investigation continues, ask the custody officer to endorse the custody record that you must be contacted in advance of any further interview.
- If a charge decision has been made, the client cannot be further interviewed in respect of that offence except in the circumstances in Code C para 16.5 - and you must still be contacted in advance.
- Advise the client that they have a continuing right to a solicitor and should ask for you before any further interview.

## Representations on charge

- Decision to charge sits with the custody officer / police; for some offences the CPS decides under the **Director''s Guidance on Charging** and the **Code for Crown Prosecutors** (full code and threshold tests).
- s.37(7) PACE sets out what the custody officer may do where there is sufficient evidence to charge: charge / refer to CPS / release without charge etc.
- Where appropriate, make representations:
  - That the evidential test is not met.
  - That the public interest test is not met.
  - That an out-of-court disposal would be more appropriate (caution, conditional caution, community resolution where eligible).
  - That further investigation is needed before charge.

## Representations on bail / release

- Pre-charge:
  - Bail or release without bail (RUI).
  - Bail conditions: necessity and proportionality (Bail Act 1976 s.3A; Policing and Crime Act 2017 amendments).
  - Initial pre-charge bail period; extensions by superintendent / magistrates.
- Post-charge:
  - Release pending court appearance unless one or more s.38 PACE conditions are met (failure to surrender, harm to others, interference with administration of justice, custody for the person''s own protection, where the person is a juvenile).
  - Bail conditions; consider electronic monitoring, residence, exclusion zones.

## Out-of-court disposals

- Caution (simple or conditional).
- Community resolution.
- Fixed penalty notices (e.g. PND).
- Drugs warning.
- These are recordable and have implications: future criminal record, immigration consequences, enhanced DBS disclosure for some roles, employment.

## Explain decisions to the client

- What the charge means and likely first hearing date.
- If RUI / pre-charge bail: that the investigation continues; what to do if police re-contact.
- If bailed post-charge: conditions, consequences of breach.
- If on a disposal: the practical implications.
- The right to legal aid in court proceedings; whether the firm will represent.

## Subsequent attendance for client

- Confirm the next steps in writing, even briefly.
- Provide a contact route to the firm.
- Advise to bring all paperwork to the first court appearance.

## Sources

- SRA PSRAS Unit 9 (29 March 2023)
- PACE 1984 ss.37(7), 38
- Bail Act 1976
- Policing and Crime Act 2017 (pre-charge bail reform)
- Code for Crown Prosecutors
- Director''s Guidance on Charging (currently 6th edition / as amended)
- PACE Code C para 16.5',
  'Procedures',
  24,
  ARRAY['U9.AO1.A','U9.AO1.B','U9.AO2.A','U9.AO2.B','U9.AO3.A','U9.AO3.B','U9.AO3.C']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

INSERT INTO public.content_modules (title, content, category, order_index, syllabus_refs)
VALUES (
  'Identification procedures - first description, photo-show, attending procedure',
  '# Identification procedures - first description, photo-show, attending procedure

Unit 8 expects a working command of Code D and the practical advice points at each stage. This module focuses on what a representative does at the station; the existing "Identification Procedures" module covers the procedures themselves.

## First eyewitness description

- The police *must* make a record of the description of the suspect as first given by the eyewitness (Code D 3.1).
- A copy must be given to the client or representative *before* any identification procedure is conducted.
- Ask for the copy. If refused, refer to Code D and a senior officer.

## Photo-shows and visual images before procedure

- If the client''s identity is **known and they are available**, an eyewitness must **not** be shown photographs or other visual images.
- If the client''s identity is **not known**, photographs / visual images can be shown subject to Code D para 3.3 and Annex E (controls on the procedure).
- Ask whether any photo-show or visual image has been used. Assess Code D compliance. Record the question, the answer and any representations.

## Choice of identification procedure

- Video identification (preferred default).
- Identification parade (live).
- Group identification.
- Confrontation by an eyewitness (last resort).

Advise the client on **advantages and disadvantages** of each, and on **whether to cooperate**:
- Refusal can lead to a less favourable procedure (group ID or confrontation).
- Cooperation under Code D conditions is often the safer path - subject to specific facts (e.g. distinctive features may make a video parade composition unfair).

## When identification is an issue but no procedure is proposed

- If the police are not proposing a procedure and identification is genuinely in issue, consider asking for one.
- Code D explains when an ID procedure must be held.
- Make representations and record refusals.

## During the procedure

- Check parade composition / video set composition fairness.
- Check the witness has not seen the suspect post-arrest.
- Note the order, witness behaviour, and any officer remarks.
- Make and record representations.

## After the procedure

- Take a contemporaneous record.
- Discuss with the client what happened and any concerns.
- Preserve representations for any later s.78 application.

## Sources

- SRA PSRAS Unit 8 (29 March 2023)
- PACE Code D paras 3.1, 3.3, Annex A-F
- *R v Turnbull* [1977] QB 224
- *R v Forbes* [2001] 1 AC 473',
  'Procedures',
  25,
  ARRAY['U8.AO1.A','U8.AO1.B','U8.AO1.C','U8.AO1.D','U8.AO2.A','U8.AO2.B','U8.AO2.C']
)
ON CONFLICT (title, category) DO UPDATE SET
  content = EXCLUDED.content,
  syllabus_refs = EXCLUDED.syllabus_refs,
  updated_at = NOW();

-- =====================================================
-- 3. Re-anchor order_index by created_at after additions
-- =====================================================

UPDATE public.content_modules
   SET order_index = ranked.rn
  FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
      FROM public.content_modules
  ) ranked
 WHERE public.content_modules.id = ranked.id;

-- =====================================================
-- Verification
-- =====================================================

-- SELECT title, category, order_index, syllabus_refs
--   FROM public.content_modules
--  ORDER BY order_index;
