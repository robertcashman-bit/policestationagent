# PSRAS syllabus mapping

This document maps the SRA "Police station representative accreditation scheme — updated standards"
(updated 29 March 2023) to specific content modules, question groups, and CIT scenarios shipped
in the app. Tag IDs follow the form `U<unit>.AO<outcome>.<criterion>` and are stored in the
`syllabus_refs` column on `public.questions`, `public.content_modules`, and `public.cit_scenarios`.

The migration that introduces the columns and CIT bank: [supabase/migrations/0002_syllabus_alignment.sql](../supabase/migrations/0002_syllabus_alignment.sql).

A live coverage view is exposed as `public.v_syllabus_coverage` (questions/modules/scenarios per tag).

## How to read this document

- **Criterion** — the SRA criterion ID and a short label.
- **Modules** — `content_modules.title` strings tagged with this ID.
- **Questions** — handcrafted question file(s) that supply at least one tagged scenario MCQ.
- **CIT scenarios** — `cit_scenarios.slug` values tagged with this ID, where applicable.
- **Notes / gaps** — anything the app deliberately does not (and should not) replicate
  (e.g. oral negotiation, formal portfolio assessment).

The product is **training**, not the SRA assessment. Portfolio, two-hour written exam, and
formal CIT remain external. Where a criterion is purely behavioural (oral assertiveness,
listening, negotiation), this app teaches the **framework and decision points** and flags
the limit explicitly.

## Coverage matrix

### Part 1 — Underpinning knowledge

#### Unit 1 — Understanding the role of a police representative

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U1.AO1.A | Authority to act (s.58, third-party instruction) | "Introduction to the PSR Role"; "Responding to a request to attend" | `psr-questions-u1.mjs`, `psr-questions-u3.mjs` | `dscc-third-party` | Covers PACE s.58, Code C Annex B para 4 third-party instruction confirmation. |
| U1.AO1.B | Role of the solicitor/representative; ethics; immigration | "Introduction to the PSR Role"; "Professional Conduct for PSRs"; "Immigration implications at the police station" | `psr-questions-u1.mjs` | `immigration-status-disclosure` | Code C Note for Guidance 6D; SRA Principles. |
| U1.AO1.C | Client needs and vulnerabilities; distrust of state-funded lawyers | "Vulnerable Persons and Appropriate Adults"; "Vulnerability deep-dive" | `psr-questions-u1.mjs`, `psr-questions-u7.mjs` | `disengaged-aa`, `trafficking-indicators` | Includes neurodivergence, modern slavery, marginalisation, distrust. |
| U1.AO1.D | Inappropriate police behaviour and response | "Records and breach response"; "Confessions and Exclusion of Evidence" | `psr-questions-u1.mjs`, `psr-questions-u6.mjs` | `oppressive-interviewer` | Senior officer escalation, complaint, civil action, s.78. |
| U1.AO1.E | Ethical rules — duty, confidentiality, conflict | "Professional Conduct for PSRs" | `psr-questions-u1.mjs` | `co-suspect-message` | SRA Code; withdrawal without breach of confidence. |
| U1.AO1.F | Importance of accurate records | "Practical Procedures at the Police Station"; "Records and breach response" | `psr-questions-u1.mjs` | `custody-record-discrepancy` | Custody record endorsements; signed disclaimer if client goes against advice. |
| U1.AO2.A | Sequence of events (arrest → appeal) | "PACE 1984 - Overview and Structure"; "Practical Procedures at the Police Station" | `psr-questions-u1.mjs` | — | Charge/written charge/summons; allocation; legal aid. |
| U1.AO2.B | Legal terminology | "PACE 1984 - Overview and Structure" | `psr-questions-u1.mjs` | — | Arrest, detention, reasonable suspicion/force, burden, AR/MR, dishonesty, intent/recklessness/malice, knowing/believing. |
| U1.AO2.C | Modes of participation | "Common offences breadth" | `psr-questions-u1.mjs` | — | Principal, accessory, joint venture, attempt. |
| U1.AO2.D | Sanctions and out-of-court disposals | "Bail at the Police Station"; "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | `charging-push` | Sentence discount; OOC disposals statutory provisions. |
| U1.AO2.E | Youth-specific procedure | "Vulnerable Persons and Appropriate Adults"; "Vulnerability deep-dive" | `psr-questions-u7.mjs` | — | Youth definitions; modified PACE; venue and sentencing. |
| U1.AO3.A | Common offences elements | "Common offences breadth" | `psr-questions-u1.mjs` | — | Assault tiers; theft family; drugs categories; motor vehicle; public order; criminal damage; bladed/offensive. |
| U1.AO3.B | Determining elements of unfamiliar offences | "Common offences breadth" | `psr-questions-u1.mjs` | — | Statute access skills. |
| U1.AO3.C | Defences to common offences | "Common offences breadth" | `psr-questions-u1.mjs` | — | Self-defence; specific defences. |
| U1.AO4.A | Burdens and standards of proof | "Evidence rules at the station" | `psr-questions-u1.mjs` | — | Reverse burden cases. |
| U1.AO4.B | Hearsay, character, ID evidence | "Evidence rules at the station" | `psr-questions-u1.mjs` | — | Competence/compellability; relevance/admissibility; opinion; corroboration. |
| U1.AO4.C | Interview strategy and evidential consequences | "Police Interviews"; "Evidence rules at the station" | `psr-questions-u6.mjs` | `silence-pressure` | CJPOA ss.34, 36, 37; lying; confession; prepared statement. |
| U1.AO4.D | Legal professional privilege | "Professional Conduct for PSRs"; "Evidence rules at the station" | `psr-questions-u1.mjs` | `co-suspect-message` | LPP; circumstances LPP doesn't apply; waiver. |
| U1.AO4.E | Admissibility of confession / s.78 | "Confessions and Exclusion of Evidence" | `psr-questions-u6.mjs` | `oppressive-interviewer` | s.76, s.78, co-accused confessions. |
| U1.AO5.A | PACE/Codes status and relationship | "PACE 1984 - Overview and Structure"; "PACE Codes of Practice A-H" | `psr-questions-u1.mjs` | — | Primary/secondary; enforceability. |
| U1.AO5.B | Key PACE/Code provisions | "Rights of Detained Persons"; "Detention Time Limits and Reviews"; "Police Interviews"; "Identification Procedures - first description, photo-show, attending procedure"; "Foreign nationals, interpreters and translation" | `psr-questions-u1.mjs`, `psr-questions-u6.mjs`, `psr-questions-u8.mjs` | `id-procedure-objections` | Detention, reviews, custody record, search, samples, interviews, ID, charge, bail, foreign nationals, interpretation. |
| U1.AO5.C | Consequences of breach | "Records and breach response"; "Confessions and Exclusion of Evidence" | `psr-questions-u1.mjs` | `oppressive-interviewer` | Senior officer; record; representations; exclusion; complaint; civil action. |

### Part 2 — Underpinning skills

#### Unit 2 — Communication, negotiation, interviewing and advising skills

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U2.AO1 | Communicate effectively | "Communication and negotiation skills" | `psr-questions-u2.mjs` | `disengaged-aa` | Language, interpreter need, listening, assertiveness, diversity. **Oral assertiveness cannot be assessed via MCQ — CIT branching dialogues approximate it.** |
| U2.AO2 | Negotiate effectively | "Communication and negotiation skills" | `psr-questions-u2.mjs` | `charging-push`, `disclosure-refused` | Strategy/tactics; alternatives; record. |
| U2.AO3 | Elicit information from client | "Communication and negotiation skills"; "Consulting the client" | `psr-questions-u2.mjs`, `psr-questions-u5.mjs` | `intoxicated-client` | Trust/confidence; ethical issues; record. |

### Part 3 — Standards of performance

#### Unit 3 — Responding to a request to attend

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U3.AO1.A | Initial info from DSCC / third party / police / client | "Responding to a request to attend" | `psr-questions-u3.mjs` | `dscc-third-party` | DSCC reference number recorded. |
| U3.AO1.B | Authority and obligation to act | "Responding to a request to attend" | `psr-questions-u3.mjs` | `dscc-third-party` | 45-minute first contact; in-person mandatory absent exceptional circumstances. |
| U3.AO1.C | Initial vulnerability indicators | "Responding to a request to attend"; "Vulnerability deep-dive" | `psr-questions-u3.mjs`, `psr-questions-u7.mjs` | — | Age, mental disorder, language, immigration status. |
| U3.AO1.D | Record initial information | "Responding to a request to attend" | `psr-questions-u3.mjs` | — | DSCC ref; third-party relationship; first-contact time. |
| U3.AO2.A–E | Consult custody officer by phone | "Consulting officers at the police station" | `psr-questions-u3.mjs`, `psr-questions-u4.mjs` | `dscc-third-party` | Introduce self; confirm location/status; circumstances; investigation; speak to client. |
| U3.AO3.A–D | Consult client by phone | "Responding to a request to attend"; "Consulting the client" | `psr-questions-u5.mjs` | — | Confidentiality of call; advice on right to silence pre-arrival. |
| U3.AO4.A–D | Decide action and communicate | "Responding to a request to attend" | `psr-questions-u3.mjs` | `remote-vs-attend` | JIIP; competence; probationary indictable-only restriction. |

#### Unit 4 — Consulting officers at the police station

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U4.AO1.A | Identify self to custody officer | "Consulting officers at the police station" | `psr-questions-u4.mjs` | — | Recorded in custody record. |
| U4.AO1.B | Seek information about client/offence/investigation | "Consulting officers at the police station" | `psr-questions-u4.mjs` | `disclosure-refused` | Code C 3.4(b) materials essential to challenge arrest/detention. |
| U4.AO1.C | Inspect custody record | "Consulting officers at the police station"; "Records and breach response" | `psr-questions-u4.mjs` | `custody-record-discrepancy` | Code C 2.4 right to inspect. |
| U4.AO1.D | Confirm private consultation and interview attendance | "Consulting officers at the police station" | `psr-questions-u4.mjs` | — | s.58(1). |
| U4.AO1.E | Respond to refusal | "Consulting officers at the police station" | `psr-questions-u4.mjs` | `disclosure-refused` | Senior officer; complaint; record. |
| U4.AO2.A–E | Consult investigating officer | "Consulting officers at the police station" | `psr-questions-u4.mjs` | `disclosure-refused` | Code C 11.1A sufficient information for effective defence. |

#### Unit 5 — Consult with the client

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U5.AO1.A–B | Introduce self; build trust | "Consulting the client"; "Vulnerability deep-dive" | `psr-questions-u5.mjs` | `intoxicated-client` | Distrust of state-funded lawyers reassurance. |
| U5.AO1.C | Fitness for interview / particular needs | "Consulting the client"; "Vulnerable Persons and Appropriate Adults" | `psr-questions-u5.mjs`, `psr-questions-u7.mjs` | `intoxicated-client` | Code C 12.3. |
| U5.AO1.D | Concerns about arrest/detention | "Consulting the client" | `psr-questions-u5.mjs` | `oppressive-interviewer` | Mistreatment complaint pathways. |
| U5.AO2.A | Inform client about suspected offence | "Consulting the client" | `psr-questions-u5.mjs` | — | Strengths/weaknesses of police case. |
| U5.AO2.B | Take instructions | "Consulting the client" | `psr-questions-u5.mjs` | `co-suspect-message` | Significant statements/admissions. |
| U5.AO2.C | Ethical issues during instruction | "Professional Conduct for PSRs" | `psr-questions-u5.mjs` | `co-suspect-message` | Conflicts; client lying. |
| U5.AO2.D | Reasoned advice / interview strategy | "Police Interviews"; "Consulting the client" | `psr-questions-u5.mjs`, `psr-questions-u6.mjs` | `silence-pressure`, `prepared-statement` | Right to silence; sentence discount/diversion; prepared statement. |
| U5.AO2.E | Explain interview procedure and rep role | "Police Interviews"; "Consulting the client" | `psr-questions-u5.mjs` | — | Right to advice in private during interview. |

#### Unit 6 — Advising during interview

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U6.AO1.A | Opening statement and privilege risk | "Conduct during interview" | `psr-questions-u6.mjs` | `prepared-statement` | R v Bowden — avoid waiving privilege. |
| U6.AO1.B | Interview compliance with PACE/Codes | "Conduct during interview"; "Police Interviews" | `psr-questions-u6.mjs` | `oppressive-interviewer` | Recording, caution, rest periods, breaks. |
| U6.AO1.C | When interview should stop | "Conduct during interview" | `psr-questions-u6.mjs` | — | Code C 11.6. |
| U6.AO2.A | Role and objectives | "Conduct during interview" | `psr-questions-u6.mjs` | — | Vulnerable client protection. |
| U6.AO2.B | Advise without stopping interview | "Conduct during interview" | `psr-questions-u6.mjs` | — | Reminders; clarification. |
| U6.AO2.C | Stop the interview for private advice | "Conduct during interview" | `psr-questions-u6.mjs` | `silence-pressure` | s.58(1) at any time. |
| U6.AO2.D | Intervene against improper conduct | "Conduct during interview"; "Confessions and Exclusion of Evidence" | `psr-questions-u6.mjs` | `oppressive-interviewer` | Undermining silence; excluding rep. |
| U6.AO2.E | Make a record of interview | "Conduct during interview"; "Records and breach response" | `psr-questions-u6.mjs` | — | To support post-interview representations. |

#### Unit 7 — Vulnerability and particular needs

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U7.AO1.A | Identify vulnerability and PACE/Code provisions | "Vulnerable Persons and Appropriate Adults"; "Vulnerability deep-dive" | `psr-questions-u7.mjs` | `disengaged-aa`, `trafficking-indicators` | Includes neurodivergence and modern slavery. |
| U7.AO1.B | Police action in response | "Vulnerability deep-dive" | `psr-questions-u7.mjs` | `disengaged-aa` | AA suitability (Code C 1.7, Note 1B); separate interpreter for consult. |
| U7.AO1.C | Advise client on AA / interpreter role | "Vulnerability deep-dive"; "Foreign nationals, interpreters and translation" | `psr-questions-u7.mjs` | `interpreter-quality` | Confidentiality. |
| U7.AO2.A | AA / interpreter understands role | "Vulnerability deep-dive" | `psr-questions-u7.mjs` | `disengaged-aa` | AA is not merely an observer. |
| U7.AO2.B | AA / interpreter confidentiality | "Vulnerability deep-dive" | `psr-questions-u7.mjs` | `disengaged-aa` | LPP not destroyed by AA presence. |

#### Unit 8 — Identification procedures

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U8.AO1.A | First eyewitness description | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | `id-procedure-objections` | Code D 3.1. |
| U8.AO1.B | Photo-shows / visual images pre-procedure | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | `id-procedure-objections` | Code D 3.3, Annex E. |
| U8.AO1.C | Advantages/disadvantages and cooperation advice | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | — | Refusal consequences. |
| U8.AO1.D | When to request a procedure | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | — | Code D when ID procedure must be held. |
| U8.AO2.A | Procedure compliance with Code D | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | `id-procedure-objections` | Representations and response recorded. |
| U8.AO2.B | Advise client on participation | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | — | — |
| U8.AO2.C | Contemporaneous record | "Identification Procedures - first description, photo-show, attending procedure" | `psr-questions-u8.mjs` | — | — |

#### Unit 9 — Post-interview / post-identification

| Criterion | Topic | Modules | Questions | CIT | Notes |
|---|---|---|---|---|---|
| U9.AO1.A | Representations to charge or release | "Post-interview - charging and re-interview"; "Bail at the Police Station" | `psr-questions-u9.mjs` | `charging-push` | s.37(7); Director's Guidance; Code for Crown Prosecutors. |
| U9.AO1.B | No further interview without rep | "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | `re-interview` | Code C 16.5 exceptions; custody record endorsement. |
| U9.AO2.A | Charge decision representations | "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | `charging-push` | OOC disposals; NFA. |
| U9.AO2.B | Bail / release representations | "Bail at the Police Station"; "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | `rui-confusion` | s.38 conditions; pre-charge bail vs RUI. |
| U9.AO3.A | Explain decisions to client | "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | `rui-confusion` | Implications of charge / OOC / release. |
| U9.AO3.B | Explain likely course of events | "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | — | First court appearance. |
| U9.AO3.C | Court representation discussion | "Post-interview - charging and re-interview" | `psr-questions-u9.mjs` | — | Legal aid in court proceedings. |

## Out of scope for this app

These are part of the SRA scheme but cannot be replicated by a study app and are
documented here so users do not mistake training for accreditation:

- **Portfolio assessment** (Part A Stages 1 & 2 + Part B Stage 5) — supervised real cases.
- **Critical Incidents Test (live role-play)** — branching scenarios in `cit_scenarios`
  approximate the *content* but not the live oral assessment.
- **Two-hour written exam** — the SRA cap of <=20% MCQ marks differs from this app's
  drill-heavy MCQ format. Practice MCQs are training, not exam replication.
- **Oral negotiation, listening and assertiveness performance** — taught conceptually
  in "Communication and negotiation skills" but not assessed live.

## Re-running / freshness

When seeds change, regenerate the SQL:

```bash
npm run generate:questions-sql
```

This rebuilds three files in `scripts/`:

- `_generated_questions.sql` — `INSERT` statements for every question (~294 rows).
- `_generated_cit_scenarios.sql` — `INSERT … ON CONFLICT (slug) DO UPDATE` for every CIT scenario.
- `ALL_CONTENT_COMBINED.sql` — the splice that production seed pipelines apply.

Coverage health-check after seeding:

```sql
select * from public.v_syllabus_coverage order by total asc;
```

Any criterion ID returning zero rows is a gap; either add a question/module/scenario
tagged with that ID or update this document if the SRA syllabus has moved.

### Reseed workflow

The pipeline is split deliberately so each table behaves correctly in both
"fresh DB" and "existing DB" environments:

| Asset | Idempotency strategy | What you do if you want a clean reseed |
|---|---|---|
| `public.questions` (~294 rows from `psr-questions-hardened`) | Plain `INSERT`. Re-applying duplicates rows. | Run a scoped `DELETE` first, e.g. `DELETE FROM public.questions WHERE source_refs && ARRAY['SRA PSRAS Unit 6']` (or `TRUNCATE` on a brand-new DB), then re-apply `_generated_questions.sql`. |
| `public.content_modules` (PSR + syllabus modules) | `psr-syllabus-modules.sql` uses an explicit `UPDATE` for legacy rows + `INSERT … ON CONFLICT (title, category) DO UPDATE`. | Re-run as is — safe on fresh and existing DBs. |
| `public.cit_scenarios` | `INSERT … ON CONFLICT (slug) DO UPDATE`. | Re-run as is — safe on fresh and existing DBs. |
| `public.v_syllabus_coverage` view | `CREATE OR REPLACE VIEW`. | Re-run as is. |
| `syllabus_refs` columns + GIN indexes on `questions` and `content_modules` | `ADD COLUMN IF NOT EXISTS` + `CREATE INDEX IF NOT EXISTS`. | Re-run as is. |

In short: **everything outside `_generated_questions.sql` is idempotent**. The
question inserts are not, by design — production-like databases curate question
sets and we do not want re-running `npm run generate:questions-sql` to silently
duplicate rows. For a fresh database, scope a `TRUNCATE public.questions` to
the seeding step; for an existing database, decide explicitly whether to delete
old rows first.
