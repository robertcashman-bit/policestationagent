-- =====================================================
-- PSR ACADEMY - COMPLETE DATABASE CONTENT
-- 
-- This file contains ALL questions and content modules
-- 
-- TO APPLY:
-- 1. Copy this entire file
-- 2. Go to: https://supabase.com/dashboard/project/cvsawjrtgmsmadtrfwfa/sql
-- 3. Paste and click "Run"
-- 
-- Generated: 2025-12-29T20:16:05.725Z
-- =====================================================

-- =====================================================
-- FILE: psr-content-modules.sql
-- =====================================================

-- =====================================================
-- PSR ACADEMY - COMPREHENSIVE LEARNING MODULES
-- Based on Police Station Representative Scheme Requirements
-- 
-- All content is referenced to specific legislation,
-- PACE Codes of Practice, and established case law.
-- =====================================================

-- =====================================================
-- MODULE 1: Introduction to the PSR Role
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Introduction to the Police Station Representative Role',
  '# Introduction to the Police Station Representative Role

## What is a Police Station Representative?

A Police Station Representative (PSR) is a non-solicitor accredited representative who provides legal advice and assistance to suspects detained at police stations. PSRs work under the supervision of duty solicitors and solicitors'' firms that hold criminal legal aid contracts.

## Legal Framework

The PSR scheme operates under:
- **Police and Criminal Evidence Act 1984 (PACE)** - The primary legislation governing police powers and suspects'' rights
- **PACE Codes of Practice A-H** - Detailed guidance on implementing PACE
- **Legal Aid Agency (LAA) Contracts** - Requirements for legal aid funded advice
- **SRA Standards and Regulations** - Professional conduct standards

## Key Responsibilities

As a PSR, your core duties include:

### 1. Protecting Client Rights
- Ensuring the client is aware of their rights under PACE
- Monitoring that detention is lawful and properly authorised
- Challenging any breaches of the Codes of Practice

### 2. Providing Legal Advice
- Advising on the right to silence and potential adverse inferences
- Explaining police procedures and what to expect
- Advising on bail applications and conditions

### 3. Attending Interviews
- Being present during police interviews
- Intervening where questions are improper or oppressive
- Taking notes for the defence file

### 4. Advocacy
- Making representations at custody reviews
- Advocating for appropriate bail decisions
- Representing vulnerable clients'' interests

## Sources
- PACE 1984
- SRA Standards and Regulations 2019
- Legal Aid Agency 2018 Standard Crime Contract',
  'Introduction',
  1
);

-- =====================================================
-- MODULE 2: PACE Overview
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'PACE 1984 - Overview and Structure',
  '# Police and Criminal Evidence Act 1984 (PACE)

## Overview

The Police and Criminal Evidence Act 1984 is the cornerstone of police powers and suspects'' rights in England and Wales. It replaced a patchwork of common law powers and statutes with a comprehensive code.

## Structure of PACE

PACE is divided into 11 parts:

### Part I: Powers to Stop and Search (ss.1-7)
- Powers to stop and search persons and vehicles
- Safeguards and recording requirements

### Part II: Powers of Entry, Search and Seizure (ss.8-22)
- Search warrants
- Entry for arrest
- Seizure of evidence

### Part III: Arrest (ss.24-33)
- Arrest without warrant (s.24)
- Information to be given on arrest (s.28)
- Voluntary attendance (s.29)

### Part IV: Detention (ss.34-52)
- Custody officers and their duties
- Detention limits and reviews
- Conditions of detention

### Part V: Questioning and Treatment of Persons (ss.53-65A)
- Searches of detained persons
- Rights of detained persons
- Fingerprints and samples

### Part VI: Codes of Practice (ss.66-67)
- Home Secretary powers to issue codes
- Legal status of the codes

### Part VII: Documentary Evidence
- Provisions relating to documentary evidence

### Part VIII: Evidence in Criminal Proceedings (ss.76-82)
- Confessions (s.76)
- Exclusion of unfair evidence (s.78)

## Key Principles

1. **Balance of Powers and Rights**: PACE balances effective policing with protection of individual rights
2. **Accountability**: All decisions must be recorded and justified
3. **Safeguards**: Multiple procedural safeguards protect suspects
4. **Review**: Detention must be regularly reviewed

## Sources
- Police and Criminal Evidence Act 1984
- R v Samuel [1988] QB 615
- R v Fulling [1987] QB 426',
  'PACE Legislation',
  2
);

-- =====================================================
-- MODULE 3: PACE Codes of Practice
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'PACE Codes of Practice A-H',
  '# PACE Codes of Practice

## Legal Status of the Codes

The PACE Codes of Practice are issued under ss.66-67 of PACE. While breach of a Code is not automatically unlawful, evidence may be excluded under s.78 if a breach makes it unfair to admit the evidence.

## Code A: Stop and Search

**Key Requirements:**
- Reasonable grounds for suspicion required (para 2.2)
- GOWISELY procedure must be followed (para 3.8-3.9)
- Records must be made (para 4.1)

**Reasonable Suspicion:**
Cannot be based solely on appearance, previous convictions, or stereotypes.

## Code B: Search of Premises

**Types of Search:**
- With consent
- Under warrant (s.8 PACE)
- Entry for arrest (s.17 PACE)
- After arrest (s.18 and s.32 PACE)

**Key Safeguards:**
- Notice of powers and rights must be given
- Searches must be conducted at reasonable hours
- Only reasonable force may be used

## Code C: Detention, Treatment and Questioning

The most important code for PSRs. Key areas:
- Rights of detained persons (para 3)
- Conditions of detention (para 8)
- Treatment of vulnerable persons (para 3.15-3.20)
- Interviews (para 11-12)
- Reviews of detention (para 15)
- Charging (para 16)

## Code D: Identification

**Methods of Identification:**
1. Video identification (preferred method)
2. Identification parade
3. Group identification
4. Confrontation

**Key Requirements:**
- Minimum 9 images/persons in parade
- Witness viewing must be recorded
- First description must be recorded

## Code E: Audio Recording of Interviews

- Mandatory for indictable/either-way offences
- Two recordings: master (sealed) and working copy
- Suspect may challenge master tape authenticity

## Code F: Visual Recording of Interviews

- Optional visual recording with audio
- Similar procedures to Code E

## Code G: Arrest

- Necessity criteria must be satisfied (para 2.4-2.9)
- Information to be given on arrest (para 3.3)
- Use of reasonable force only

## Code H: Terrorism

- Modified procedures for terrorism suspects
- Extended detention periods (up to 14 days)
- Special provisions for reviews

## Sources
- PACE Codes of Practice (Current Revision)
- Home Office Circulars',
  'PACE Codes',
  3
);

-- =====================================================
-- MODULE 4: Rights of Detained Persons
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Rights of Detained Persons',
  '# Rights of Detained Persons

## The Three Fundamental Rights

Under PACE and Code C, every detained person has three fundamental rights:

### 1. Right to Have Someone Informed (s.56 PACE)

**The Right:**
The detained person may have one friend, relative, or other person who is likely to take an interest in their welfare told they have been arrested and where they are detained.

**Delay:**
Can only be delayed for indictable offences where a superintendent authorises it on grounds in Annex B:
- Would lead to interference with evidence
- Would lead to alerting other suspects
- Would hinder recovery of property

**Maximum Delay:** 36 hours

### 2. Right to Legal Advice (s.58 PACE)

**The Right:**
The right to consult privately with a solicitor at any time, free of charge.

**Key Points:**
- Advice must be independent
- Consultation must be in private
- Available 24 hours via Defence Solicitor Call Centre
- Cannot be interviewed until advice received (with limited exceptions)

**Delay:**
Extremely limited circumstances under Annex B (indictable offences only). Following R v Samuel [1988], this power is interpreted very narrowly.

### 3. Right to Consult Codes of Practice

**The Right:**
The detained person has the right to consult the PACE Codes of Practice at any time.

## Additional Rights

### Right to be Informed of Rights (Code C para 3.1-3.2)
All rights must be explained clearly and the person must sign the custody record acknowledging they understand.

### Right to Information About the Offence
The person must be told the nature of the offence and why arrest was necessary.

### Right to Medical Treatment (Code C para 9)
If a person appears ill, is injured, mentally disordered, or otherwise in need of clinical attention, appropriate healthcare must be provided.

### Right to Adequate Food and Drink (Code C para 8.6)
At least two light meals and one main meal in any 24-hour period, plus drinks at reasonable intervals.

### Right to Rest (Code C para 12.2)
A continuous period of 8 hours rest in any 24-hour period.

## Waiver of Rights

A person may waive their rights, but:
- The waiver must be voluntary
- Must be properly recorded
- Can be withdrawn at any time
- Solicitor must be contacted if suspect changes their mind

## Vulnerable Persons

Additional protections apply to:
- Juveniles (under 18)
- Mentally disordered or vulnerable persons
- Those who cannot speak/understand English

These persons require an appropriate adult.

## Sources
- PACE 1984 ss.56, 58
- Code C paras 3, 6, 8, 9
- R v Samuel [1988] QB 615',
  'Rights',
  4
);

-- =====================================================
-- MODULE 5: Interviews
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Police Interviews',
  '# Police Interviews

## Definition of Interview

Under Code C para 11.1A, an interview is:
> "The questioning of a person regarding their involvement or suspected involvement in a criminal offence or offences."

## The Caution

Before any interview, the suspect must be cautioned (Code C para 10.5):

> "You do not have to say anything. But it may harm your defence if you do not mention when questioned something which you later rely on in court. Anything you do say may be given in evidence."

### Understanding the Caution
The caution reflects ss.34-37 Criminal Justice and Public Order Act 1994:
- Right to silence remains
- But adverse inferences may be drawn if facts relied on at trial were not mentioned during questioning

## Interview Procedure

### Before Interview
1. Check custody record for compliance with PACE
2. Private consultation with client
3. Advise on rights and options (silence, prepared statement, full answers)
4. Check client fitness for interview

### During Interview
1. Solicitor/PSR may intervene to:
   - Seek clarification
   - Challenge improper questions
   - Give advice
   - Object to oppressive questioning

2. The solicitor can only be excluded if their conduct prevents proper questioning (para 6.9)

### Interview Conditions
- Adequate heating, lighting, ventilation
- Breaks at approximately 2-hour intervals
- Breaks at recognised meal times
- 8 hours continuous rest in any 24-hour period

## Special Warnings (ss.36-37 CJPOA 1994)

### Section 36 Warning
Given when explaining objects, substances, or marks found on the suspect that the officer believes require explanation.

### Section 37 Warning
Given when explaining presence at a particular place at or about the time the offence was committed.

**For inferences to be drawn:**
1. Special warning must be given
2. Suspect must be allowed opportunity for legal advice
3. Warning must explain consequences of silence

## Role of the Solicitor/PSR

Your role is to protect and advance your client''s legal rights (Code C Note 6D):
- Not to answer questions on behalf of the client
- Not to provide information to the police
- To advise on legal matters
- To intervene where appropriate
- To take notes for the defence

## Advising on Silence

Consider:
- Strength of evidence disclosed
- Client''s instructions
- Whether client can provide coherent account
- Risk of adverse inferences vs risk of damaging admissions
- Option of prepared statement

## Sources
- PACE Code C paras 10-12
- CJPOA 1994 ss.34-37
- R v Condron [1997] 1 WLR 827
- R v Hoare and Pierce [2004] EWCA Crim 784',
  'Interviews',
  5
);

-- =====================================================
-- MODULE 6: Vulnerable Persons
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Vulnerable Persons and Appropriate Adults',
  '# Vulnerable Persons and Appropriate Adults

## Who is Vulnerable?

Under Code C, special protection is required for:

### 1. Juveniles (Code C para 1.5)
Persons who appear to be under 18 years of age.

### 2. Mentally Disordered Persons (Code C para 1.4)
Any person who, because of their mental state or capacity, may not understand:
- The significance of questions put to them
- The significance of their answers

### 3. Mentally Vulnerable Persons
Persons with learning disabilities or mental health conditions affecting their understanding.

**Key Point:** If there is ANY suspicion of vulnerability, the person must be treated as vulnerable.

## The Appropriate Adult

### Role of the Appropriate Adult
1. **Support** the vulnerable person
2. **Observe** whether the interview is conducted fairly
3. **Facilitate communication** with the detained person
4. **Advise** the vulnerable person
5. **Assist** with understanding procedures

### Who Can Act as Appropriate Adult?

**For Juveniles (Code C para 1.7(a)):**
1. Parent or guardian (or local authority if in care)
2. Social worker
3. Other responsible adult aged 18+ (not police employee)

**For Mentally Vulnerable Adults (Code C para 1.7(b)):**
1. Relative, guardian, or carer
2. Someone with experience of mental health issues
3. Another responsible adult

### Who CANNOT be an Appropriate Adult?
- The victim or witness
- Someone suspected of involvement in the offence
- Police officers or police employees
- A solicitor acting in a professional capacity (different role)

## When is an Appropriate Adult Required?

1. When informing of rights (para 3.15)
2. During interviews (para 11.15)
3. During identification procedures
4. When taking fingerprints/samples
5. During any significant procedure

## Conduct of Interviews with Vulnerable Persons

**Additional Safeguards:**
- Interview should be conducted carefully and in simple language
- Leading questions should be avoided
- The appropriate adult should be present throughout
- Regular breaks should be offered
- Special care with confession evidence

## Fitness for Interview

The custody officer must assess whether a detained person is fit for interview. Consider:
- Physical health
- Mental state
- Effects of drugs/alcohol
- Need for rest

A healthcare professional should assess if there is doubt.

## Sources
- PACE Code C paras 1.4-1.7, 3.15, 11.15
- Mental Health Act 1983
- R v Aspinall [1999] 2 Cr App R 115
- R v Everett [1988] Crim LR 826',
  'Vulnerable Persons',
  6
);

-- =====================================================
-- MODULE 7: Detention Time Limits
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Detention Time Limits and Reviews',
  '# Detention Time Limits and Reviews

## The Detention Clock

The detention clock starts when a person arrives at the first police station, or 24 hours after arrest if not taken to a station.

## Time Limits Summary

| Period | Authority Required | Offence Type |
|--------|-------------------|--------------|
| 0-24 hours | Custody officer | Any |
| 24-36 hours | Superintendent | Indictable only |
| 36-96 hours | Magistrates'' warrant | Indictable only |

## Initial Detention (0-24 hours)

**Authorisation:**
The custody officer must authorise detention under s.37 PACE if:
1. There is sufficient evidence to charge, OR
2. Detention without charge is necessary to:
   - Secure or preserve evidence, OR
   - Obtain evidence by questioning

## Extended Detention (24-36 hours)

**s.42 PACE - Superintendent''s Authorisation**

Requirements:
- Indictable offence only
- Superintendent or above has reasonable grounds to believe:
  - Detention is necessary to secure/preserve evidence or obtain by questioning
  - The offence is indictable
  - Investigation is being conducted diligently and expeditiously

**Procedure:**
- Detainee must be informed
- Entitled to make representations (personally or through solicitor)
- Decision and grounds must be recorded

## Warrant of Further Detention (36-96 hours)

**s.43-44 PACE - Magistrates'' Court**

Application to magistrates'' court if:
- Continued detention necessary for same grounds
- Investigation being conducted diligently and expeditiously
- Indictable offence

**Maximum Extensions:**
- Initial warrant: up to 36 hours (max 72 hours total)
- Further extension: up to 24 hours more (max 96 hours total)

**Detainee Rights:**
- Must be informed of application
- Entitled to be present at hearing
- Entitled to legal representation

## Reviews of Detention

### First Review
- Not later than 6 hours after detention authorised

### Subsequent Reviews
- At intervals of not more than 9 hours

### Review Officer
- Before charge: Inspector or above
- After charge: Custody officer

### Purpose of Review
To ensure:
- Detention continues to be necessary
- Investigation is progressing
- Rights are being respected

### Representations
The detainee or their solicitor may make representations at reviews.

## Relevant Time

The "relevant time" from which the detention clock runs is:
- Arrival at first police station, OR
- 24 hours after arrest (if not taken to station)

Special rules apply for:
- Arrests in another police area
- Voluntary attendees who are then arrested
- Hospital detention

## Sources
- PACE 1984 ss.37-46
- Code C paras 15.1-15.3',
  'Detention',
  7
);

-- =====================================================
-- MODULE 8: Identification Procedures
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Identification Procedures',
  '# Identification Procedures (Code D)

## When is Identification Required?

Under Code D para 3.12, if:
1. A witness has identified a suspect, OR
2. A witness thinks they can identify the suspect, OR
3. There is a reasonable chance of identification

...a formal identification procedure should normally be held.

## Types of Identification Procedure

### 1. Video Identification (Preferred Method)

**Procedure:**
- Witness views moving images of suspect + at least 8 others
- Images must be of persons resembling suspect
- Witness views images in any order they choose
- Witness must not be told of any previous identifications

**Advantages:**
- Convenient and quick
- No requirement to assemble live participants
- Can be shown to multiple witnesses

### 2. Identification Parade

**Procedure:**
- Suspect + at least 8 similar persons stand in line
- Witness views the parade
- Suspect chooses position in line

### 3. Group Identification

**Procedure:**
- Suspect placed in informal group
- Witness observes group
- Used when parade not practicable

### 4. Confrontation

**Last Resort Only:**
- Direct confrontation between witness and suspect
- Only when other procedures not practicable

## Key Safeguards

### Before the Procedure
- Suspect must be informed of purpose
- Entitled to legal advice
- Entitled to have solicitor present
- Can object to images/participants

### First Description
The first description given by a witness must be recorded before any identification procedure.

### Multiple Witnesses
Each witness must be kept separate and not discuss the case.

## Documentation

All identification procedures must be:
- Video recorded where possible
- Documented in writing
- Signed by relevant parties

## Suspect''s Rights

1. Right to legal advice before procedure
2. Right to have solicitor/representative present
3. Right to object to images/participants
4. Right to be informed of result

## Evidence Issues

Identification evidence is often unreliable. Key cases:
- **R v Turnbull [1977]**: Guidelines on directing juries on identification evidence
- Quality of identification depends on:
  - Length of observation
  - Distance
  - Lighting conditions
  - Prior knowledge of suspect
  - Time elapsed

## Sources
- PACE Code D paras 3.1-3.37
- Code D Annexes A-E
- R v Turnbull [1977] QB 224',
  'Identification',
  8
);

-- =====================================================
-- MODULE 9: Confessions and Evidence
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Confessions and Exclusion of Evidence',
  '# Confessions and Exclusion of Evidence

## Confessions under s.76 PACE

### Definition
Under s.82(1) PACE, a confession includes:
> "Any statement wholly or partly adverse to the person who made it, whether made to a person in authority or not and whether made in words or otherwise."

### Grounds for Exclusion (s.76(2))

**Mandatory Exclusion if:**

#### (a) Oppression
Confession obtained by oppression must be excluded.

**Oppression includes:** torture, inhuman or degrading treatment, and the use or threat of violence.

Case: **R v Fulling [1987]** - Oppression requires conscious wrongdoing or improper purpose.

#### (b) Unreliability
Confession must be excluded if obtained in consequence of anything said or done which was likely to render it unreliable.

**Examples:**
- Inducements or promises
- Denial of rights
- Failure to caution
- Improper questioning techniques

Case: **R v Harvey [1988]** - Lies told to vulnerable suspect made confession unreliable.

### Burden of Proof
Once raised, the prosecution must prove beyond reasonable doubt that the confession was not obtained by oppression or in unreliable circumstances.

## s.78 PACE - Discretionary Exclusion

### The Test
The court may refuse to admit evidence if:
> "...it appears to the court that, having regard to all the circumstances, including the circumstances in which the evidence was obtained, the admission of the evidence would have such an adverse effect on the fairness of the proceedings that the court ought not to admit it."

### Factors Considered
- Significance of the breach
- Whether breach was deliberate or inadvertent
- Whether bad faith involved
- Availability of evidence from other sources
- Reliability of the evidence
- Impact of the breach on the suspect

### Examples of Exclusion
- Denial of legal advice (R v Samuel)
- Breach of caution requirements
- Failure to provide appropriate adult
- Oppressive interviewing
- Significant breach of Codes of Practice

## s.78 and Breach of Codes

A breach of the Codes does not automatically lead to exclusion, but:
- Significant and substantial breaches often result in exclusion
- Particularly breaches relating to interviews and confessions
- Courts consider the nature and extent of the breach

## Role of the PSR

1. **Monitor compliance** with PACE and Codes
2. **Document breaches** contemporaneously
3. **Challenge** improper procedures during the interview
4. **Advise client** on implications of breaches
5. **Prepare** for exclusion applications at trial

## Sources
- PACE 1984 ss.76, 78, 82
- R v Fulling [1987] QB 426
- R v Samuel [1988] QB 615
- R v Mason [1988] 1 WLR 139
- R v Keenan [1990] 2 QB 54',
  'Evidence',
  9
);

-- =====================================================
-- MODULE 10: Bail
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Bail at the Police Station',
  '# Bail at the Police Station

## Presumption of Bail

Under s.4 Bail Act 1976, there is a general right to bail. This applies:
- Before charge (police bail)
- After charge (police bail or court bail)

## Police Bail Decisions

### Before Charge
Under s.37 PACE, the custody officer may:
1. Release without bail (no further action)
2. Release on bail (bail with or without conditions)
3. Continue detention

### After Charge
Under s.38 PACE, the custody officer must release on bail unless:
- Name/address cannot be ascertained
- Reasonable grounds to believe wrong details given
- Detention necessary to prevent:
  - Failure to appear
  - Interference with evidence/witnesses
  - Injury to any person
  - Damage to property
  - Further offences
  - Obstruction of justice

## Grounds for Refusing Bail (Schedule 1)

**Indictable Offences:**
- Substantial grounds for believing defendant would:
  - Fail to surrender
  - Commit offences on bail
  - Interfere with witnesses/obstruct justice
- For defendant''s own protection
- Already on bail for another offence

**Summary Offences:**
More limited grounds apply.

## Bail Conditions

### Types of Conditions
1. **Residence** - Live at specified address
2. **Curfew** - Be at address between specified hours
3. **Reporting** - Report to police station at specified times
4. **Non-contact** - No contact with named persons
5. **Exclusion zones** - Not to enter specified areas
6. **Surrender of passport** - Prevents flight abroad
7. **Surety/security** - Money lodged as guarantee

### Imposing Conditions
Conditions may only be imposed if they appear necessary to:
- Secure surrender to custody
- Prevent offending on bail
- Prevent interference with witnesses
- Prevent obstruction of justice
- For the defendant''s protection

## Role of PSR in Bail

1. **Make representations** to custody officer
2. **Propose conditions** as alternative to custody
3. **Challenge** grounds for refusal
4. **Provide** reliable sureties
5. **Prepare** for magistrates'' court if bail refused

## Failure to Answer Bail

Under s.6 Bail Act 1976:
- Criminal offence to fail to surrender without reasonable cause
- Maximum penalty: 3 months (magistrates) or 12 months (Crown Court)
- Bail may be revoked

## Sources
- Bail Act 1976
- PACE 1984 ss.37-38, 47
- Code C para 16
- Legal Aid, Sentencing and Punishment of Offenders Act 2012',
  'Bail',
  10
);

-- =====================================================
-- MODULE 11: Professional Conduct
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Professional Conduct for PSRs',
  '# Professional Conduct for Police Station Representatives

## Regulatory Framework

PSRs work under the supervision of solicitors regulated by the Solicitors Regulation Authority (SRA). Key regulatory documents:
- SRA Principles 2019
- SRA Code of Conduct for Solicitors
- Legal Aid Agency Standard Crime Contract

## SRA Principles

1. **Uphold the rule of law and proper administration of justice**
2. **Act with integrity**
3. **Act in the best interests of each client**
4. **Provide a proper standard of service**
5. **Act in a way that promotes confidence in the profession**
6. **Maintain trust and cooperation with regulators**
7. **Comply with legal and regulatory obligations**

## Client Confidentiality

### The Duty
All communications with clients are confidential and protected by legal professional privilege.

### Exceptions
Confidentiality may be broken only if:
- Client consents
- Disclosure required by law
- To prevent a crime likely to cause serious physical harm

### Privilege
**Legal advice privilege:** Communications for giving/receiving legal advice
**Litigation privilege:** Communications for litigation purposes

## Conflict of Interest

### When Conflicts Arise
- Representing co-defendants with conflicting interests
- Personal interest conflicting with client''s interests
- Acting for prosecution and defence

### Managing Conflicts
- Identify potential conflicts early
- Decline to act if conflict cannot be managed
- Maintain separate representation for co-defendants

## Duties to the Court

Even when representing clients, PSRs must:
- Never mislead the court
- Not assert a positive case known to be false
- Disclose relevant law (even if unfavourable)
- Not help clients give false evidence

## Handling Confessions

If a client confesses to you:
1. **Maintain confidentiality** - you cannot disclose
2. **Cannot put forward positive case of innocence**
3. **Can put prosecution to proof**
4. **Can cross-examine on evidence**
5. **Cannot suggest another person committed the crime**

## Professional Standards in Police Station

1. **Arrive promptly** when called
2. **Prepare thoroughly** - review custody record
3. **Maintain independence** from police
4. **Document everything** contemporaneously
5. **Communicate clearly** with client
6. **Follow up** appropriately

## Complaints and Discipline

Complaints about PSRs may be made to:
- The supervising solicitor
- The SRA
- The Legal Aid Agency
- The Legal Ombudsman

## Sources
- SRA Principles 2019
- SRA Code of Conduct for Solicitors 2019
- Legal Aid Agency Standard Crime Contract
- R v Ensor [2009] EWCA Crim 2519',
  'Professional Conduct',
  11
);

-- =====================================================
-- MODULE 12: Practical Procedures
-- =====================================================

INSERT INTO public.content_modules (title, content, category, order_index)
VALUES (
  'Practical Procedures at the Police Station',
  '# Practical Procedures at the Police Station

## Before Arrival

1. **Note the call details:** Time, station, client name, offence, arresting officer
2. **Check for conflicts:** Previous representations, co-defendants
3. **Prepare materials:** Notebook, PACE Act, Codes, blank forms

## On Arrival

### 1. Sign the Custody Record
- Your arrival time must be recorded
- Check the custody record for:
  - Time of arrest
  - Time of arrival at station
  - Grounds for detention
  - Rights given
  - Any requests made
  - Healthcare issues
  - Appropriate adult requirements

### 2. Speak to the Custody Officer
- Confirm the alleged offence(s)
- Establish the stage of investigation
- Find out what evidence exists (disclosure)
- Ask about identification procedures
- Confirm client''s fitness for interview

### 3. Speak to the Investigating Officer
- Request disclosure of evidence
- Understand the nature of the case
- Find out what questions will be asked
- Establish timeline for interview

## Disclosure

**You are entitled to know:**
- The nature of the offence
- The reason arrest was necessary
- Evidence to be put to the client

**You may not get:**
- Full witness statements
- All evidence
- Prosecution strategy

## Private Consultation

### Essential Steps
1. Introduce yourself and confirm instructions
2. Explain your role
3. Explain client''s rights
4. Explain the caution and adverse inferences
5. Take client''s account
6. Assess credibility and consistency
7. Advise on options:
   - Answer questions
   - No comment
   - Prepared statement

### Advice Points
- Strengths and weaknesses of prosecution case
- Risks of each approach
- Likely consequences of different strategies
- Bail prospects

## During Interview

### Your Role
1. Listen carefully to all questions
2. Take contemporaneous notes
3. Monitor for:
   - Oppressive questioning
   - Leading questions
   - Misrepresentation of evidence
   - Fatigue/distress
4. Intervene appropriately
5. Request breaks if needed

### When to Intervene
- To seek clarification
- To challenge improper questions
- To object to oppressive tactics
- To give advice to client
- To highlight Code breaches

## After Interview

1. **Review the tapes/summary** with client
2. **Discuss next steps**
3. **Make representations on:**
   - Charge/no charge
   - Bail/custody
   - Conditions
4. **Confirm follow-up** arrangements
5. **Complete file notes** immediately

## Sources
- Code C
- Legal Aid Agency Standard Crime Contract
- Law Society Practice Notes',
  'Procedures',
  12
);

-- Update order indexes
UPDATE public.content_modules SET order_index = (
  SELECT ROW_NUMBER() OVER (ORDER BY created_at) FROM public.content_modules m2 WHERE m2.id = content_modules.id
);

-- =====================================================
-- FILE: psr-syllabus-modules (handcrafted - SRA PSRAS alignment)
-- Source: scripts/psr-syllabus-modules.sql
-- Idempotent (UPDATE existing + INSERT ... ON CONFLICT DO UPDATE).
-- =====================================================

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
- Right to inspect the **full** custody record provided this does not interfere with the custody officer\'s duties.
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
- The officer\'s attitude to diversion from prosecution where appropriate.

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
- Acknowledge the client\'s perspective. Some clients - especially young people from minority ethnic communities - may distrust state-funded lawyers. Reassure on independence and confidentiality directly.

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

- The client\'s account of arrest / attendance.
- The client\'s account of the relevant facts.
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
- Attempts to undermine the client\'s right to silence (e.g. "your silence will look terrible at trial" - inaccurate and improper as a station tactic).
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
- **Neurodivergence**: ASD, ADHD, dyslexia, dyspraxia, Tourette\'s.
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

LPP is **not** destroyed by the AA\'s presence in a lawyer-client consultation. Ask the AA to keep matters confidential.

## Interpreters

The interpreter\'s role is accurate and impartial communication between client, AA (if present), interviewing officer and lawyer. Consider whether you need a **separate** interpreter for the consultation, particularly where the police interpreter has worked closely with the officer.

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
- Officer\'s: time pressure, charging deadlines, custody review pressure.

### The other side\'s strategy and tactics
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
- Practitioner texts (Blackstone\'s, Archbold).
- Identify *actus reus*, *mens rea*, defences, mode of trial, sentencing.
- Apply the elements to the client\'s account.

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
- Implication for station advice: a complainant\'s out-of-court statement may not come in at trial; do not over-react in interview.

## Character

- Bad character is admissible only via gateways (CJA 2003 s.101): defendant\'s bad character / propensity / important explanatory evidence / important matter in issue / etc.
- Adducing your client\'s **good** character at interview is rarely the right place; preserve good character for trial.

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

- Decision to charge sits with the custody officer / police; for some offences the CPS decides under the **Director\'s Guidance on Charging** and the **Code for Crown Prosecutors** (full code and threshold tests).
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
  - Release pending court appearance unless one or more s.38 PACE conditions are met (failure to surrender, harm to others, interference with administration of justice, custody for the person\'s own protection, where the person is a juvenile).
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
- Director\'s Guidance on Charging (currently 6th edition / as amended)
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

- If the client\'s identity is **known and they are available**, an eyewitness must **not** be shown photographs or other visual images.
- If the client\'s identity is **not known**, photographs / visual images can be shown subject to Code D para 3.3 and Annex E (controls on the procedure).
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


-- =====================================================
-- FILE: psr-questions-hardened (generated - rebuild: npm run generate:questions-sql)
-- Source: scripts/build-all-questions-sql.mjs + scripts/psr-handcrafted-questions.mjs
-- Re-applying these INSERTs duplicates rows unless you remove existing questions first
-- (e.g. scoped DELETE for training env, or TRUNCATE on a fresh database).
-- =====================================================

-- Generated hardened PSR question bank
-- Total inserts: 294

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  '03:20. Your client is drunk but coherent, accused of common assault. Disclosure is a short summary and a vague complainant account. They want to "explain what really happened" on tape. What is the most professional advice?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Answer every question in full so the officer understands context."},{"id":"b","text":"Take clear instructions; explain adverse inference risk in the Crown Court if they later rely on a fact in defence that they could reasonably have mentioned in interview; then choose between controlled answers, a prepared statement, or no comment with eyes open to risk."},{"id":"c","text":"Refuse the interview completely because the client is intoxicated."},{"id":"d","text":"Adopt no comment in every case where disclosure is short."}]',
  ARRAY['b'],
  'This is not a memory test about CJPOA wording. At the station, a competent rep links instructions, disclosure adequacy, fitness to be interviewed, and adverse inference *risk* to strategy. None of the one-size-fits-all options (always answer, always no comment) is safe without analysis.',
  ARRAY['CJPOA 1994 ss.34-38', 'Code C sect 12'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is a juvenile with ADHD, medicated, but has not eaten all day. Officers want to interview now. The appropriate adult is present but disengaged. What is the best *immediate* action set?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Let the interview go ahead to avoid delay complaints."},{"id":"b","text":"Raise fitness for interview and effective participation; request breaks/food/health input as needed; ensure the AA understands their role; delay until communication can be meaningful."},{"id":"c","text":"Replace medication decisions yourself."},{"id":"d","text":"Ask officers to interview without an AA to reduce complexity."}]',
  ARRAY['b'],
  'The AA must be capable of assisting communication; vulnerability interacts with fitness for interview under Code C. Rushing interviews late at night with inadequate support risks unreliable answers and fairness challenges.',
  ARRAY['Code C sect 11', 'Code C Note 12B'],
  ARRAY['U7.AO1.A', 'U7.AO2.A', 'U5.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your adult client has anxiety and asks you to sit with them in person during consultations because telephone advice feels unsafe. The custody desk insists telephone-only advice is "policy". What do you assert?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Accept policy because custody can run consultations however they like."},{"id":"b","text":"Private consultation with a solicitor under PACE is the baseline entitlement; unnecessary obstruction should be challenged and recorded."},{"id":"c","text":"Demand the custody officer personally supervise the consultation."},{"id":"d","text":"Tell your client to waive legal advice to speed custody processes."}]',
  ARRAY['b'],
  'PACE protects meaningful access to legal advice. Representatives resist blanket policies that prevent genuinely private consultation without justification.',
  ARRAY['PACE s.58', 'Code C sect 6'],
  ARRAY['U4.AO1.D', 'U5.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'The officer discloses a case summary that omits key timing details that your client says are exculpatory. The officer says "you will get the rest at court". What is your best station response?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"Instruct your client to answer fully anyway."},{"id":"b","text":"Request further disclosure of material needed to give advice; record the limitations; and calibrate interview strategy to the information actually available, including whether a prepared statement sets out the defence case without unsafe Q&A."},{"id":"c","text":"Refuse to give any advice until full Crown Court disclosure arrives."},{"id":"d","text":"Advise a false alibi to force disclosure."}]',
  ARRAY['b'],
  'The station is not a trial, but advice must be informed. Reps ask for reasonable disclosure, document gaps, and avoid strategies that build a case on sand.',
  ARRAY['Attorney General''s Guidelines on Disclosure', 'Code C sect 12'],
  ARRAY['U4.AO1.B', 'U4.AO2.A', 'U5.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'After a short consultation, your client hands you a folded note and whispers: "Give this to my co-accused in the next cell to read before their interview." What is your position?',
  'PACE Code C - Rights',
  'advanced',
  '[{"id":"a","text":"You may pass a note if you redact names."},{"id":"b","text":"Refuse: you are not a messaging service between suspects; this risks contamination of evidence and can involve serious misconduct; keep your role within lawful advice."},{"id":"c","text":"Agree, but read the note aloud to both clients at once."},{"id":"d","text":"Email the note to the officer for approval."}]',
  ARRAY['b'],
  'Joint enterprise and interview integrity make "message passing" high risk. Professional conduct requires boundaries; privilege is not a smuggling channel.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is fit to be interviewed but wants a prepared statement and then to answer questions. The officer says prepared statements "are not allowed" in that force. What is true in terms of your professional approach?',
  'PACE Code C - Interviews',
  'intermediate',
  '[{"id":"a","text":"The officer is correct: prepared statements are never permitted under PACE."},{"id":"b","text":"A prepared statement is a legitimate format; you should assert your client''s position and record any improper pressure; then take instructions on how to handle follow-up questions."},{"id":"c","text":"Insist the client must go no comment only."},{"id":"d","text":"Tell the client to read the statement quietly without giving it to police."}]',
  ARRAY['b'],
  'PACE and Code C do not abolish prepared statements. Reps stand up to informal "force policy" that conflicts with a suspect''s established rights to provide a written account.',
  ARRAY['Code C Note 12C', 'CJPOA 1994 s.34 context'],
  ARRAY['U5.AO2.D', 'U6.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'An officer tells you: "We can get a warrant of further detention later, so the 24/36 hour point is not really a hard limit for you to worry about." How should you use this in client advice and custody decision challenges?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Accept that further detention is always available on request."},{"id":"b","text":"Treat statutory maxima and review requirements as real: challenge unnecessary delay, ensure reviews are meaningful, and do not let informal comments replace legal limits."},{"id":"c","text":"Tell your client time limits do not matter in indictable cases."},{"id":"d","text":"Advise that magistrates always grant warrants automatically."}]',
  ARRAY['b'],
  'Warrant applications are not automatic. Police station advice keeps custody officers to account on diligence and time rules, not office myth.',
  ARRAY['PACE s.40-s.42', 'Code C para 15'],
  ARRAY['U1.AO5.B', 'U1.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is charged with drug supply after a stop. Police want non-intimate samples using statutory powers. Your client fears "family DNA" being captured. What is the accurate practical advice framework?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Refuse all sampling; consent is always required."},{"id":"b","text":"Distinguish powers, authorisations, and safeguards; explain what is being taken, why, and the limits of use; record concerns; do not invent biometrics paranoia as law."},{"id":"c","text":"Agree the police can take any sample they want regardless of powers."},{"id":"d","text":"Tell your client to decline and physically resist."}]',
  ARRAY['b'],
  'Sampling is tightly regulated. Representatives explain lawful authority and channel objections properly rather than encouraging obstructive behaviour.',
  ARRAY['PACE ss.61-65', 'Code C Annex I'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client has relevant previous convictions that police mention in interview strategy discussions with you. Your client asks whether they should "get them in first". What guidance fits station practice?',
  'Evidence - Character',
  'advanced',
  '[{"id":"a","text":"Always disclose every prior conviction in interview voluntarily."},{"id":"b","text":"Explain that bad character rules are trial-stage and context-specific; station admissions can have serious consequences; take instructions before volunteering prejudicial material."},{"id":"c","text":"Tell police every conviction whenever asked."},{"id":"d","text":"Deny convictions if asked because interviews are confidential."}]',
  ARRAY['b'],
  'Bad character gateways under CJA 2003 are not a licence for confession tourism in interview. Advice must protect against unnecessary self-harm.',
  ARRAY['Criminal Justice Act 2003 ss.100-103'],
  ARRAY['U1.AO4.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is released under investigation after interview for serious allegations. They believe it means "no further action". What must you clarify?',
  'Bail',
  'beginner',
  '[{"id":"a","text":"RUI means the investigation has ended."},{"id":"b","text":"RUI means investigations may continue; charging decisions may follow; obligations can still arise later and bail conditions may bite at charge."},{"id":"c","text":"RUI removes police powers permanently."},{"id":"d","text":"RUI is identical to being on court bail with curfew."}]',
  ARRAY['b'],
  'Trainees must not give false reassurance. RUI is not NFA and not identical to bail.',
  ARRAY['College of Policing guidance context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'During consultation, your client confesses to you privately to an offence not yet put by police. They ask you to "tell them enough to get bail". What is your professional line?',
  'Professional Conduct',
  'advanced',
  '[{"id":"a","text":"Hints are fine if you avoid exact wording."},{"id":"b","text":"You cannot brief police with privileged instructions or orchestrate selective disclosure; continue lawful representation within ethical boundaries."},{"id":"c","text":"Provide anonymous intelligence to the officer."},{"id":"d","text":"Withdraw immediately without explaining limits."}]',
  ARRAY['b'],
  'Privilege and integrity constrain station advocacy. The scenario tests understanding that reps do not game investigations using confidential admissions.',
  ARRAY['SRA Codes', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'The custody officer authorises delay to legal advice on indictable grounds. Your client is distressed and the grounds look thin. What should you do?',
  'PACE Code C - Rights',
  'advanced',
  '[{"id":"a","text":"Accept superintendent authority without question."},{"id":"b","text":"Challenge proportionality, ensure written grounds and authorisation are recorded, remind custody of R v Samuel-type scrutiny, and keep a clear note for review."},{"id":"c","text":"Advise your client to waive advice."},{"id":"d","text":"Tell the custody officer you will report them to the IOPC immediately in every case."}]',
  ARRAY['b'],
  'Delay powers exist but are narrow and tightly supervised in practice. Representatives assert law, not drama.',
  ARRAY['PACE s.58', 'R v Samuel [1988] QB 615'],
  ARRAY['U1.AO1.D', 'U1.AO5.C', 'U4.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is deaf and requests a qualified interpreter for consultation and interview. Custody says a family member can interpret to save time. What is the correct insistence?',
  'PACE Code C - Vulnerable Persons',
  'intermediate',
  '[{"id":"a","text":"Family interpreting is best because it is quicker."},{"id":"b","text":"Effective communication requires appropriately qualified interpretation for important exchanges; independence matters for reliability and fairness."},{"id":"c","text":"Written notes alone are always adequate."},{"id":"d","text":"Refuse interview forever."}]',
  ARRAY['b'],
  'Practical equality of arms matters. Representatives should resist amateur interpreting that risks oppression or misunderstanding.',
  ARRAY['Code C sect 13', 'Equality Act 2010 context'],
  ARRAY['U7.AO1.B', 'U7.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Police propose charging GBH on thin injury evidence; your client admits pushing but says self-defence. Investigators want a "quick guilty plea conversation" pre-interview. What do you do?',
  'PACE Code C - Charging',
  'advanced',
  '[{"id":"a","text":"Encourage a guilty plea to secure bail."},{"id":"b","text":"Resist coerced pleas; ensure your client understands charges and evidence; keep charging discussions informed and recorded; avoid you becoming an instrument of improper pressure."},{"id":"c","text":"Tell police your client will plead guilty on advice."},{"id":"d","text":"Promise a particular sentence outcome."}]',
  ARRAY['b'],
  'Station reps support informed decisions, not bargain justice in corridors.',
  ARRAY['Code C sect 16'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client wants silence because they fear retaliation. The officer says silence will "look terrible" at trial. What is accurate advice?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Silence can never be mentioned at trial."},{"id":"b","text":"Explain that adverse inferences may be sought in Crown Court proceedings depending on facts and reliance; fear alone does not remove legal frameworks but may inform disclosure requests and special measures discussions later—not invented station promises."},{"id":"c","text":"Promise silence can never be used against them."},{"id":"d","text":"Tell them juries never hear silence."}]',
  ARRAY['b'],
  'Trainees must avoid absolutes. CJPOA inferences are context-dependent; station advice is careful and honest.',
  ARRAY['CJPOA 1994 s.34'],
  ARRAY['U6.AO2.D', 'U1.AO4.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'A strip search is proposed on intelligence your client disputes. They agree because they are frightened. What protections should you emphasise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Fright removes the need for authority."},{"id":"b","text":"Authorisation, necessity, proportionality, dignity safeguards, and contemporaneous records matter; \"consent\" under pressure is not a blank cheque."},{"id":"c","text":"There are no safeguards for adults."},{"id":"d","text":"Insist on conducting the search yourself."}]',
  ARRAY['b'],
  'PACE Annex A / Code C Annex A set demanding standards; reps protect clients from cosmetic consent.',
  ARRAY['PACE Annex B strip search powers', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is interviewed as a volunteer under caution at the station. They think they can leave mid-interview without consequence. What should you correct?',
  'PACE Code C - Interviews',
  'beginner',
  '[{"id":"a","text":"Volunteers can walk away at any time without any legal implications."},{"id":"b","text":"Voluntary interviews can still generate evidence used in proceedings; leaving may have investigative consequences; advice should cover status, caution effects, and risks."},{"id":"c","text":"Volunteers have no right to legal advice."},{"id":"d","text":"Volunteers cannot be recorded."}]',
  ARRAY['b'],
  'Representatives resist myths about "informal" interviews.',
  ARRAY['Code C Note 11C'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Officers request intimate samples under PACE powers after arrest for a qualifying offence. Your client refuses. What is your role?',
  'PACE Code C - Searches',
  'advanced',
  '[{"id":"a","text":"Tell them to physically obstruct officers."},{"id":"b","text":"Clarify powers and consequences of refusal; record concerns; avoid counselling obstruction where lawful compulsion exists; ensure safeguards are met."},{"id":"c","text":"Advise refusing regardless of law because consent is king."},{"id":"d","text":"Offer DNA from a relative instead."}]',
  ARRAY['b'],
  'Intimate samples have strict statutory gateways; representatives navigate lawfully.',
  ARRAY['PACE ss.62-63'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client says police threatened them before you arrived: "You will lose your kids if you don''t admit it." What immediate actions align with good station practice?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Ignore it and proceed to interview."},{"id":"b","text":"Take a careful note; raise oppression/reliability concerns; consider fitness for interview; request consultation breaks; ensure recording captures vulnerabilities; consider representations about admissibility routes."},{"id":"c","text":"Tell your client to confess so childcare is safe."},{"id":"d","text":"Promise you can stop admissibility later regardless of facts."}]',
  ARRAY['b'],
  'Oppressive conduct engages PACE s.76 thinking and professional safeguarding; reps document and resist.',
  ARRAY['PACE s.76', 'Code C sect 12'],
  ARRAY['U6.AO2.D', 'U1.AO4.E', 'U1.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'You discover your firm also represents a witness police want to call. Your detained client asks you to "share strategies". What is required?',
  'Professional Conduct',
  'advanced',
  '[{"id":"a","text":"Share strategies discreetly because both are your firm''s clients."},{"id":"b","text":"Identify and manage conflicts; you cannot harmonise defence with witness preparation if duties collide—escalate supervision and separation."},{"id":"c","text":"Withdraw silently."},{"id":"d","text":"Ask police which client should win."}]',
  ARRAY['b'],
  'Conflicts rules apply even under pressure; police station work is not exempt.',
  ARRAY['SRA Code of Conduct for Solicitors'],
  ARRAY['U1.AO1.E', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client wants to answer questions but speaks English as an additional language and is exhausted. The officer says an interpreter is unnecessary because they "sound fine". What do you press for?',
  'PACE Code C - Interviews',
  'intermediate',
  '[{"id":"a","text":"Proceed because sounding fine equals understanding legal concepts."},{"id":"b","text":"Insist on interpretation where comprehension is in doubt for a fair interview; fatigue and language interact with reliability."},{"id":"c","text":"Use the custody officer as interpreter."},{"id":"d","text":"Tell your client to nod along."}]',
  ARRAY['b'],
  'Fair interview requires genuine comprehension, not confident impressions.',
  ARRAY['Code C sect 13'],
  ARRAY['U7.AO1.B', 'U7.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client is detained for an indictable offence. Review paperwork is late but custody says "we are busy". What statutory benchmark should you anchor to?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Reviews are optional when the suite is busy."},{"id":"b","text":"The first review must occur within six hours of detention being authorised, then subsequent reviews at not more than nine-hour intervals (subject to specific exceptions)."},{"id":"c","text":"Reviews happen only at 24 hours."},{"id":"d","text":"Reviews are weekly."}]',
  ARRAY['b'],
  'This scenario tests practical recall of review intervals tied to station advocacy.',
  ARRAY['PACE s.40(3)'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Police say they will bail your client with residential conditions if they admit possession in interview. Your client looks to you. What is your response?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Accept the deal verbally to secure bail."},{"id":"b","text":"Reject improper bargaining; admissions must be voluntary and informed; bail decisions must follow lawful routes, not blackmail."},{"id":"c","text":"Tell your client to lie to get bail."},{"id":"d","text":"Promise bail if they stay silent."}]',
  ARRAY['b'],
  'Ethical representation rejects transactional admissions extracted by improper inducements.',
  ARRAY['PACE s.76', 'Code C sect 12'],
  ARRAY['U6.AO2.D', 'U1.AO4.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Your client''s phone was seized as evidence. They ask you to delete messages remotely after consultation. What is your answer?',
  'Professional Conduct',
  'advanced',
  '[{"id":"a","text":"Yes, if you use secure deletion."},{"id":"b","text":"No: that risks destroying evidence and serious offending; your role is lawful advice, not spoliation."},{"id":"c","text":"Yes, if the phone is legally theirs."},{"id":"d","text":"Ask the officer to delete messages for them."}]',
  ARRAY['b'],
  'Trainees must recognise tipping-off / evidence destruction risks.',
  ARRAY['Criminal Justice Act 1988 context', 'SRA Principles'],
  ARRAY['U1.AO1.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 1: DSCC gives you a client name, station and offence but no reference number. What do you record before accepting?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Only the client name; reference numbers are optional."},{"id":"b","text":"Obtain and record the DSCC reference number, time of notification, time of acceptance, and time of first contact with the client."},{"id":"c","text":"Decline the case until police email a full brief."},{"id":"d","text":"Accept verbally and rely on memory."}]',
  ARRAY['b'],
  'SRA Unit 3 requires accurate records including DSCC reference and timing. Without a reference, tracing the referral later is harder and professional records suffer.',
  ARRAY['SRA PSRAS Unit 3', 'DSCC contract requirements'],
  ARRAY['U3.AO1.A', 'U3.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 2: A third party who is not a family member calls about a detained friend. What is your first risk assessment?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Assume they have authority to instruct you."},{"id":"b","text":"Assess whether instructions arise from genuine concern for welfare and plan to confirm instructions with the detained person at the earliest opportunity."},{"id":"c","text":"Refuse all third-party referrals."},{"id":"d","text":"Ask police to confirm the third party is honest."}]',
  ARRAY['b'],
  'Third-party referrals need careful triage. DSCC/police referrals carry different default authority; third parties require confirmation with the client.',
  ARRAY['SRA PSRAS Unit 3'],
  ARRAY['U3.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 3: Police call you directly (not via DSCC) to attend. What minimum information do you seek?',
  'PSRAS Unit 3 — Request to attend',
  'beginner',
  '[{"id":"a","text":"Only the client surname."},{"id":"b","text":"Location, whether arrested or volunteer, suspected offence(s), and why the request bypassed DSCC."},{"id":"c","text":"Nothing; attendance is always mandatory."},{"id":"d","text":"The officer''s home phone number."}]',
  ARRAY['b'],
  'Unit 3 lists different minimums per source. For police, you need location, status, offences, and reason DSCC was not used.',
  ARRAY['SRA PSRAS Unit 3'],
  ARRAY['U3.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 4: You are competent but the case is indictable-only and you are probationary. What is correct?',
  'PSRAS Unit 3 — Request to attend',
  'advanced',
  '[{"id":"a","text":"Attend anyway because DSCC sent you."},{"id":"b","text":"Recognise the prohibition on probationary representatives advising on indictable-only offences; arrange supervision or referral without delay."},{"id":"c","text":"Advise in writing only so it does not count."},{"id":"d","text":"Let the client self-represent while you observe."}]',
  ARRAY['b'],
  'Competence rules are strict. Probationary representatives must not provide advice on indictable-only offences; escalate per firm procedures.',
  ARRAY['SRA PSRAS Unit 3 AO4'],
  ARRAY['U3.AO4.C', 'U3.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 5: You telephone custody before travelling. What must you identify?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Only your mobile number."},{"id":"b","text":"Your identity, status, firm, and the fact/source of instructions; ask for the call to be noted on the custody record."},{"id":"c","text":"The officer''s collar number only."},{"id":"d","text":"Nothing until you arrive in person."}]',
  ARRAY['b'],
  'Unit 3 outcome 2 requires the custody officer to be informed who you are, your status and firm, and the source of instructions, with a custody record note.',
  ARRAY['SRA PSRAS Unit 3', 'Code C'],
  ARRAY['U3.AO2.A', 'U3.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 6: Custody confirms arrest time, detention authorisation time, and that the client requested a solicitor 20 minutes ago. Why does this matter?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"It does not matter for advice."},{"id":"b","text":"It helps verify lawful detention timelines, reviews, and whether delay of legal advice is being considered lawfully."},{"id":"c","text":"It proves guilt."},{"id":"d","text":"It replaces the need to inspect the custody record later."}]',
  ARRAY['b'],
  'Initial telephone checks set up later challenges on detention, reviews, and access to advice.',
  ARRAY['PACE s.40', 'PACE s.58'],
  ARRAY['U3.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 7: Custody refuses telephone access to the client before you travel. What is your first step?',
  'PSRAS Unit 3 — Request to attend',
  'advanced',
  '[{"id":"a","text":"Hang up and drive faster."},{"id":"b","text":"Ask for the legal authority for refusal, record it, and consider escalation if access is unlawfully refused."},{"id":"c","text":"Tell the client to answer questions anyway."},{"id":"d","text":"Threaten the custody officer with IOPC in every case."}]',
  ARRAY['b'],
  'Refusals must be tested against PACE s.58 and Code C. Record representations and escalate where appropriate.',
  ARRAY['PACE s.58', 'SRA PSRAS Unit 3'],
  ARRAY['U3.AO2.E', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 8: On the phone, the client sounds intoxicated but coherent. What initial advice is most important?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Answer all police questions to speed release."},{"id":"b","text":"Advise on status, right to in-person advice, right to silence, and not to answer substantive interview questions before you arrive if police attempt interview."},{"id":"c","text":"Tell them to waive legal advice."},{"id":"d","text":"Promise they will be released in one hour."}]',
  ARRAY['b'],
  'Unit 3 outcome 3 requires initial advice including not answering interview questions before the representative arrives.',
  ARRAY['SRA PSRAS Unit 3'],
  ARRAY['U3.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 9: The client insists you attend in person but DSCC rules and risk factors suggest telephone advice may suffice. What governs?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Client wishes always override DSCC."},{"id":"b","text":"Balance DSCC mandatory attendance rules, JIIP, vulnerability, confidentiality of telephone advice, and risk assessment outcomes."},{"id":"c","text":"Telephone advice is never allowed."},{"id":"d","text":"Only police decide remote vs in-person."}]',
  ARRAY['b'],
  'Attendance mode is multi-factor: contractual DSCC obligations, JIIP, vulnerability, and effective communication.',
  ARRAY['SRA PSRAS Unit 3', 'JIIP'],
  ARRAY['U3.AO4.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 10: The DSCC mention mentions the detainee may not speak English. What do you flag for arrival?',
  'PSRAS Unit 3 — Request to attend',
  'beginner',
  '[{"id":"a","text":"Ignore until interview."},{"id":"b","text":"Flag interpreter/translation needs with custody and investigating officers early."},{"id":"c","text":"Use the AA as interpreter."},{"id":"d","text":"Ask family to translate in interview."}]',
  ARRAY['b'],
  'Early flags prevent rushed unfair interviews and align with Code C and Unit 7 expectations.',
  ARRAY['Code C sect 13', 'SRA PSRAS Unit 3'],
  ARRAY['U3.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 11: You decide to attend in person and ETA is 50 minutes. What must you communicate?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Nothing; custody already knows."},{"id":"b","text":"Inform custody of attendance decision and likely ETA for the record; tell the client the ETA and not to answer interview questions before you arrive."},{"id":"c","text":"Tell police to delay detention clock."},{"id":"d","text":"Promise the interview will not happen."}]',
  ARRAY['b'],
  'Unit 3 outcome 4 requires both custody and client to be informed and custody record to reflect the plan.',
  ARRAY['SRA PSRAS Unit 3'],
  ARRAY['U3.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 12: The detainee mentions possible immigration enforcement if charged. At the initial call stage, what is appropriate?',
  'PSRAS Unit 3 — Request to attend',
  'advanced',
  '[{"id":"a","text":"Give detailed immigration advice immediately."},{"id":"b","text":"Note the issue, flag referral to an immigration specialist after criminal instructions are clear, and avoid giving immigration advice outside competence."},{"id":"c","text":"Tell them immigration never follows arrest."},{"id":"d","text":"Advise them to lie about nationality."}]',
  ARRAY['b'],
  'Unit 1 requires considering immigration implications where relevant; station reps coordinate, not improvise immigration law.',
  ARRAY['SRA PSRAS Unit 1', 'SRA PSRAS Unit 3'],
  ARRAY['U3.AO1.C', 'U1.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 13: A client phones you directly from the station landline with an officer listening. What is the priority?',
  'PSRAS Unit 3 — Request to attend',
  'intermediate',
  '[{"id":"a","text":"Take full instructions immediately."},{"id":"b","text":"Assess confidentiality; advise on implications of lack of privacy before taking sensitive instructions."},{"id":"c","text":"Refuse to act."},{"id":"d","text":"Ask the officer to leave without recording the request."}]',
  ARRAY['b'],
  'Unit 3 outcome 3 requires assessing whether the conversation is confidential and advising the client accordingly.',
  ARRAY['SRA PSRAS Unit 3'],
  ARRAY['U3.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 14: You need material essential to challenge arrest or detention under Code C 3.4(b). The custody officer says "none exists". Best response?',
  'PSRAS Unit 4 — Custody and investigation',
  'intermediate',
  '[{"id":"a","text":"Accept that without more."},{"id":"b","text":"Ask what was considered, whether searches or CCTV exist, and record the answer; follow up with the investigating officer."},{"id":"c","text":"Demand immediate release."},{"id":"d","text":"Tell your client to escape."}]',
  ARRAY['b'],
  'Representatives probe superficial "none" answers and record for later review and s.78 arguments where appropriate.',
  ARRAY['Code C para 3.4(b)', 'SRA PSRAS Unit 4'],
  ARRAY['U4.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 15: The custody record shows a gap between arrest time and booking time. What should you do?',
  'PSRAS Unit 4 — Custody and investigation',
  'intermediate',
  '[{"id":"a","text":"Ignore minor gaps."},{"id":"b","text":"Question the custody officer, record explanations, and consider implications for detention lawfulness and reviews."},{"id":"c","text":"Assume the clock starts at booking."},{"id":"d","text":"Rewrite the custody record yourself."}]',
  ARRAY['b'],
  'Unit 4 expects identification of unusual entries and questioning discrepancies.',
  ARRAY['SRA PSRAS Unit 4'],
  ARRAY['U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 16: Custody suggests you consult in the corridor within earshot of the desk. What do you insist on?',
  'PSRAS Unit 4 — Custody and investigation',
  'beginner',
  '[{"id":"a","text":"Accept if it is quicker."},{"id":"b","text":"Private consultation as required by PACE s.58(1), suitably confidential."},{"id":"c","text":"Whisper only."},{"id":"d","text":"Use a police interview room without recording."}]',
  ARRAY['b'],
  'Meaningful private consultation is a baseline entitlement.',
  ARRAY['PACE s.58(1)', 'SRA PSRAS Unit 4'],
  ARRAY['U4.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 17: The officer discloses CCTV stills but will not say what the interview will cover. What is your leverage point?',
  'PSRAS Unit 4 — Custody and investigation',
  'advanced',
  '[{"id":"a","text":"There is no right to know interview purpose."},{"id":"b","text":"Code C 11.1A requires sufficient information for the client to understand the offence and why suspected; purpose and phased disclosure are relevant to fairness."},{"id":"c","text":"Threaten judicial review in every case."},{"id":"d","text":"Tell the client to confess to see the rest."}]',
  ARRAY['b'],
  'Disclosure and interview purpose shape advice; representatives press for fairness under Code C.',
  ARRAY['Code C para 11.1A', 'SRA PSRAS Unit 4'],
  ARRAY['U4.AO2.B', 'U4.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 18: The client is autistic; police say an AA is "not needed because a solicitor is present". What is wrong?',
  'PSRAS Unit 4 — Custody and investigation',
  'intermediate',
  '[{"id":"a","text":"A solicitor replaces an AA."},{"id":"b","text":"An AA is not interchangeable with legal representation; separate safeguards apply for vulnerable detainees."},{"id":"c","text":"Autism never triggers AA requirements."},{"id":"d","text":"Only juveniles need AAs."}]',
  ARRAY['b'],
  'Unit 4 requires checking vulnerability arrangements; conflating roles risks unfair process.',
  ARRAY['Code C', 'SRA PSRAS Unit 4'],
  ARRAY['U4.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 19: The investigating officer refuses to disclose whether a co-suspect has been interviewed. What is proportionate?',
  'PSRAS Unit 4 — Custody and investigation',
  'advanced',
  '[{"id":"a","text":"Abandon the case."},{"id":"b","text":"Ask whether others are arrested or sought; if refused, seek legal basis, record, and escalate if necessary."},{"id":"c","text":"Leak the question to the press."},{"id":"d","text":"Promise the client there are no co-suspects."}]',
  ARRAY['b'],
  'Unit 4 lists co-arrests as relevant; refusals need authority, record, escalation pathway.',
  ARRAY['SRA PSRAS Unit 4'],
  ARRAY['U4.AO2.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 20: A prior interview occurred before your arrival. What do you request first?',
  'PSRAS Unit 4 — Custody and investigation',
  'intermediate',
  '[{"id":"a","text":"Oral summary only."},{"id":"b","text":"Authority for interview without you and a copy of the interview record."},{"id":"c","text":"Nothing if the client says it went fine."},{"id":"d","text":"Delete the prior interview."}]',
  ARRAY['b'],
  'Unit 4 requires establishing whether prior interviews happened and obtaining records.',
  ARRAY['SRA PSRAS Unit 4'],
  ARRAY['U4.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 21: Custody refuses you a copy of the custody record. What is correct?',
  'PSRAS Unit 4 — Custody and investigation',
  'intermediate',
  '[{"id":"a","text":"You have no rights to a copy."},{"id":"b","text":"You have a right to inspect the full record; if a copy is refused, take comprehensive notes including officer responses."},{"id":"c","text":"Photograph the screen secretly."},{"id":"d","text":"Bribe the desk."}]',
  ARRAY['b'],
  'Inspection is a Code right; copying may be restricted but notes must be thorough.',
  ARRAY['Code C para 2.4', 'SRA PSRAS Unit 4'],
  ARRAY['U4.AO1.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 22: Meeting the investigating officer, what must you confirm about interviews?',
  'PSRAS Unit 4 — Custody and investigation',
  'beginner',
  '[{"id":"a","text":"That you intend to be present at interviews."},{"id":"b","text":"That you will not attend interviews."},{"id":"c","text":"That police can interview without you if busy."},{"id":"d","text":"That you approve all questions in advance."}]',
  ARRAY['a'],
  'Unit 4 AO2A requires informing the officer you intend to be present at interviews.',
  ARRAY['SRA PSRAS Unit 4'],
  ARRAY['U4.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 23: Custody refuses interview attendance citing "force policy". What is your stance?',
  'PSRAS Unit 4 — Custody and investigation',
  'advanced',
  '[{"id":"a","text":"Accept force policy."},{"id":"b","text":"Challenge by reference to PACE/Code C rights to attend; record and escalate if refusal persists."},{"id":"c","text":"Withdraw."},{"id":"d","text":"Bribe the SIO."}]',
  ARRAY['b'],
  'Policy cannot lawfully remove statutory attendance rights for interviews.',
  ARRAY['PACE', 'Code C', 'SRA PSRAS Unit 4'],
  ARRAY['U4.AO1.E', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 24: A young Black client says "you work for the police really". What is best practice?',
  'PSRAS Unit 5 — Client consultation',
  'intermediate',
  '[{"id":"a","text":"Dismiss the concern."},{"id":"b","text":"Give calm reassurance on independence, confidentiality, legal aid funding, and how you use information; invite questions."},{"id":"c","text":"Show your passport."},{"id":"d","text":"Ask police to reassure them."}]',
  ARRAY['b'],
  'SRA Unit 5 recognises distrust of state-funded lawyers; additional reassurance is part of gaining trust.',
  ARRAY['SRA PSRAS Unit 5'],
  ARRAY['U5.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 25: The client does not understand "indictable" vs "summary". How do you explain?',
  'PSRAS Unit 5 — Client consultation',
  'intermediate',
  '[{"id":"a","text":"Use Latin maxims only."},{"id":"b","text":"Use plain language tied to likely court venue, seriousness, and what the police must prove, checking understanding as you go."},{"id":"c","text":"Tell them not to worry about it."},{"id":"d","text":"Read the charging standard verbatim."}]',
  ARRAY['b'],
  'Unit 5 requires explaining the suspected offence in terms the client understands.',
  ARRAY['SRA PSRAS Unit 5'],
  ARRAY['U5.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 26: Police case looks weak but client wants to "get it over with" by admitting. What is your focus?',
  'PSRAS Unit 5 — Client consultation',
  'advanced',
  '[{"id":"a","text":"Encourage a quick admission."},{"id":"b","text":"Explore instructions, explain consequences of admissions, diversion and sentence discount frameworks, and ensure any admission is truly voluntary and informed."},{"id":"c","text":"Refuse to act if they admit guilt."},{"id":"d","text":"Promise a non-custodial sentence."}]',
  ARRAY['b'],
  'Unit 5 requires reasoned advice on strategy including advantages of admissions and risks.',
  ARRAY['SRA PSRAS Unit 5', 'Code for Crown Prosecutors'],
  ARRAY['U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 27: The client mentions a significant statement to police. What must you do?',
  'PSRAS Unit 5 — Client consultation',
  'intermediate',
  '[{"id":"a","text":"Ignore it if embarrassing."},{"id":"b","text":"Clarify exactly what was said, when, to whom, and whether recorded; obtain disclosure where possible."},{"id":"c","text":"Tell them to deny it later."},{"id":"d","text":"Assume the officer lied."}]',
  ARRAY['b'],
  'Significant statements drive advice and s.34/78 issues; instructions must be accurate.',
  ARRAY['Code C', 'SRA PSRAS Unit 5'],
  ARRAY['U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 28: Instructions reveal a conflict with another firm client. What is the priority?',
  'PSRAS Unit 5 — Client consultation',
  'advanced',
  '[{"id":"a","text":"Continue quietly."},{"id":"b","text":"Stop taking confidential instructions that breach conflict rules; escalate internally and consider withdrawal pathways that protect confidence."},{"id":"c","text":"Tell police the conflict."},{"id":"d","text":"Pick the richer client."}]',
  ARRAY['b'],
  'Unit 5 ethical issues include conflicts; SRA duties apply at the station.',
  ARRAY['SRA Code of Conduct', 'SRA PSRAS Unit 5'],
  ARRAY['U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 29: Client is medicated for psychosis and seems tired. What is your first safeguarding step?',
  'PSRAS Unit 5 — Client consultation',
  'intermediate',
  '[{"id":"a","text":"Proceed to interview to avoid delay."},{"id":"b","text":"Assess fitness for interview and consider healthcare input before substantive interview."},{"id":"c","text":"Stop legal advice entirely."},{"id":"d","text":"Tell police to discharge."}]',
  ARRAY['b'],
  'Unit 5 links vulnerability to fitness for interview under Code C 12.3.',
  ARRAY['Code C para 12.3', 'SRA PSRAS Unit 5'],
  ARRAY['U5.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 30: Before interview, what should you explain about your role?',
  'PSRAS Unit 5 — Client consultation',
  'beginner',
  '[{"id":"a","text":"That you will answer questions for them."},{"id":"b","text":"When you will intervene, how breaks work, and their right to private advice during interview."},{"id":"c","text":"That you work for the police."},{"id":"d","text":"That you decide guilt."}]',
  ARRAY['b'],
  'Unit 5 AO2E covers interview process and representative role.',
  ARRAY['SRA PSRAS Unit 5'],
  ARRAY['U5.AO2.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 31: The client alleges rough handling at arrest. What is measured advice?',
  'PSRAS Unit 5 — Client consultation',
  'intermediate',
  '[{"id":"a","text":"Ignore unless there are bruises."},{"id":"b","text":"Take a careful account, advise on routes (custody challenge, interview record, complaint), and document for later admissibility."},{"id":"c","text":"Demand immediate charge of the officer."},{"id":"d","text":"Tell them to exaggerate."}]',
  ARRAY['b'],
  'Unit 5 requires addressing complaints about police conduct appropriately.',
  ARRAY['SRA PSRAS Unit 5'],
  ARRAY['U5.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 32: Client asks whether a prepared statement "counts" as answering. What is accurate?',
  'PSRAS Unit 5 — Client consultation',
  'advanced',
  '[{"id":"a","text":"It is ignored legally."},{"id":"b","text":"A prepared statement can set out a defence case; its interaction with later silence and adverse inferences is fact-specific under CJPOA."},{"id":"c","text":"It is the same as lying."},{"id":"d","text":"It waives privilege automatically."}]',
  ARRAY['b'],
  'Prepared statements are a recognised strategy; advice must be nuanced, not absolutist.',
  ARRAY['CJPOA 1994', 'SRA PSRAS Unit 5'],
  ARRAY['U5.AO2.D', 'U1.AO4.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 33: You have not yet confirmed duty vs own solicitor status. When must you?',
  'PSRAS Unit 5 — Client consultation',
  'intermediate',
  '[{"id":"a","text":"Never; it is irrelevant."},{"id":"b","text":"At the outset of consultation if not already confirmed."},{"id":"c","text":"Only at court."},{"id":"d","text":"Only if the client asks."}]',
  ARRAY['b'],
  'Unit 5 requires confirming duty vs own representation where not already given.',
  ARRAY['SRA PSRAS Unit 5'],
  ARRAY['U5.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 34: You consider an opening statement referencing detailed instructions about why the client will go no comment. Risk?',
  'PSRAS Unit 6 — Interview',
  'advanced',
  '[{"id":"a","text":"No risk."},{"id":"b","text":"Risk of waiving legal professional privilege (R v Bowden); keep opening high-level without revealing privileged reasons for advice."},{"id":"c","text":"Privilege is waived automatically in interview."},{"id":"d","text":"Opening statements are banned."}]',
  ARRAY['b'],
  'Unit 6 highlights privilege waiver risks in openings; keep reasons for advice out of the police record.',
  ARRAY['R v Bowden [1999] 1 WLR 823', 'SRA PSRAS Unit 6'],
  ARRAY['U6.AO1.A', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 35: The interview room is overheated and the client is visibly unwell. What do you press for?',
  'PSRAS Unit 6 — Interview',
  'intermediate',
  '[{"id":"a","text":"Continue; discomfort is normal."},{"id":"b","text":"Suspend interview for breaks / healthcare assessment as appropriate under Code C safeguards."},{"id":"c","text":"End representation."},{"id":"d","text":"Open a window onto the street."}]',
  ARRAY['b'],
  'Physical conditions and breaks are Code-regulated; representatives enforce fairness.',
  ARRAY['Code C', 'SRA PSRAS Unit 6'],
  ARRAY['U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 36: The officer says "no comment makes you look guilty to the jury". What intervention is appropriate?',
  'PSRAS Unit 6 — Interview',
  'advanced',
  '[{"id":"a","text":"None; officers may persuade."},{"id":"b","text":"Intervene: mischaracterises the law and improperly pressures silence strategy; ask for correction on record."},{"id":"c","text":"Tell the client the officer is correct."},{"id":"d","text":"Laugh it off."}]',
  ARRAY['b'],
  'Unit 6 requires responding to attempts to undermine silence decisions.',
  ARRAY['CJPOA 1994', 'SRA PSRAS Unit 6'],
  ARRAY['U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 37: Mid-interview your client begins answering after a no-comment plan. What is appropriate?',
  'PSRAS Unit 6 — Interview',
  'intermediate',
  '[{"id":"a","text":"Let them continue silently."},{"id":"b","text":"Seek a break for private advice to confirm whether this is a genuine change of strategy."},{"id":"c","text":"Shout \"objection\"."},{"id":"d","text":"Leave the room."}]',
  ARRAY['b'],
  'Unit 6 allows stopping for private advice when the client struggles with a prior strategy.',
  ARRAY['PACE s.58(1)', 'SRA PSRAS Unit 6'],
  ARRAY['U6.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 38: The client does not understand a long multi-part question. What may you do without stopping the interview?',
  'PSRAS Unit 6 — Interview',
  'intermediate',
  '[{"id":"a","text":"Answer for them."},{"id":"b","text":"Assist them to understand the question and answer clearly as intended."},{"id":"c","text":"Tell them to say nothing."},{"id":"d","text":"Object to every question."}]',
  ARRAY['b'],
  'Unit 6 permits limited assistance without undermining the interview process.',
  ARRAY['SRA PSRAS Unit 6'],
  ARRAY['U6.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 39: The officer continues questioning after you believe Code C 11.6 threshold is met. What is your angle?',
  'PSRAS Unit 6 — Interview',
  'advanced',
  '[{"id":"a","text":"It is always lawful to continue."},{"id":"b","text":"Raise that interviewing should cease when sufficient evidence exists for a realistic prospect of conviction; ask for charge decision pathway and record."},{"id":"c","text":"Demand jury trial immediately."},{"id":"d","text":"Tell the client to flee."}]',
  ARRAY['b'],
  'Unit 6 links interview cessation to charge decision frameworks.',
  ARRAY['Code C para 11.6', 'SRA PSRAS Unit 6'],
  ARRAY['U6.AO1.C', 'U9.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 40: Why keep your own interview note?',
  'PSRAS Unit 6 — Interview',
  'intermediate',
  '[{"id":"a","text":"Courts never use them."},{"id":"b","text":"To correct misattributed answers, ensure the client said what they intended, support post-interview advice, and charge/bail representations."},{"id":"c","text":"To sell to journalists."},{"id":"d","text":"To replace the official record."}]',
  ARRAY['b'],
  'Unit 6 AO2E lists purposes of a proper note.',
  ARRAY['SRA PSRAS Unit 6'],
  ARRAY['U6.AO2.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 41: The SIO suggests you step outside while they "clarify one detail". What do you do?',
  'PSRAS Unit 6 — Interview',
  'advanced',
  '[{"id":"a","text":"Agree if quick."},{"id":"b","text":"Refuse improper exclusion; insist on legal authority on record; escalate if necessary."},{"id":"c","text":"Send the AA in your place."},{"id":"d","text":"Record nothing."}]',
  ARRAY['b'],
  'Attempts to exclude representatives require firm challenge and recording.',
  ARRAY['SRA PSRAS Unit 6'],
  ARRAY['U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 42: What is a core objective of the representative during interview?',
  'PSRAS Unit 6 — Interview',
  'beginner',
  '[{"id":"a","text":"To prove police wrong about everything."},{"id":"b","text":"To ensure police fairness and protect the client from inappropriate pressure while keeping an accurate record."},{"id":"c","text":"To answer questions for the client."},{"id":"d","text":"To negotiate sentence in the room."}]',
  ARRAY['b'],
  'Unit 6 lists objectives centred on fairness, client wellbeing, and accurate recording.',
  ARRAY['SRA PSRAS Unit 6'],
  ARRAY['U6.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 43: The caution was not re-cautioned after a break exceeding the permitted period. What issue arises?',
  'PSRAS Unit 6 — Interview',
  'intermediate',
  '[{"id":"a","text":"No issue arises."},{"id":"b","text":"Potential Code breach affecting fairness; seek appropriate remedial steps and record."},{"id":"c","text":"Automatic acquittal."},{"id":"d","text":"Client loses legal aid."}]',
  ARRAY['b'],
  'Cautioning and interview integrity are Code-regulated; remedial steps depend on facts.',
  ARRAY['Code C', 'SRA PSRAS Unit 6'],
  ARRAY['U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 44: Police arranged a neighbour as AA for a vulnerable adult. What do you check?',
  'PSRAS Unit 7 — Vulnerability',
  'intermediate',
  '[{"id":"a","text":"Nothing if they are over 18."},{"id":"b","text":"Suitability under Code C 1.7 and Note 1B; independence and ability to support communication."},{"id":"c","text":"Any adult is fine."},{"id":"d","text":"Only parents qualify."}]',
  ARRAY['b'],
  'Unit 7 requires checking AA suitability, not mere box-ticking.',
  ARRAY['Code C 1.7', 'SRA PSRAS Unit 7'],
  ARRAY['U7.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 45: You need an interpreter in consultation; police offer the same interpreter who will interpret the interview. What should you consider?',
  'PSRAS Unit 7 — Vulnerability',
  'advanced',
  '[{"id":"a","text":"Always refuse any interpreter."},{"id":"b","text":"Consider whether a separate interpreter is needed for confidential legal advice and impartiality."},{"id":"c","text":"Interpreters are always police employees."},{"id":"d","text":"AA can interpret instead."}]',
  ARRAY['b'],
  'Unit 7 flags separate interpreters for consultation where appropriate.',
  ARRAY['SRA PSRAS Unit 7', 'Code C sect 13'],
  ARRAY['U7.AO2.B', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 46: A client shows indicators of modern slavery control. What is your first station step?',
  'PSRAS Unit 7 — Vulnerability',
  'intermediate',
  '[{"id":"a","text":"Ignore if they deny it."},{"id":"b","text":"Take careful instructions without pressuring admissions; consider specialist referral and how s.45 MSA may interact; record indicators."},{"id":"c","text":"Tell police they are trafficked without consent."},{"id":"d","text":"Promise immunity."}]',
  ARRAY['b'],
  'Trafficking indicators require sensitive triage and specialist pathways; avoid reckless disclosures.',
  ARRAY['Modern Slavery Act 2015', 'SRA PSRAS Unit 7'],
  ARRAY['U7.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 47: What should you explain to a juvenile about the AA?',
  'PSRAS Unit 7 — Vulnerability',
  'beginner',
  '[{"id":"a","text":"The AA is a police officer."},{"id":"b","text":"The AA supports communication, observes fairness, and is not the same as your lawyer; confidentiality still matters."},{"id":"c","text":"The AA decides guilt."},{"id":"d","text":"The AA can be sent home mid-interview without consent."}]',
  ARRAY['b'],
  'Unit 7 requires advising on AA role and confidentiality.',
  ARRAY['SRA PSRAS Unit 7', 'Code C'],
  ARRAY['U7.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 48: The AA keeps interrupting your legal advice to give their own legal views. What do you do?',
  'PSRAS Unit 7 — Vulnerability',
  'intermediate',
  '[{"id":"a","text":"Ignore it."},{"id":"b","text":"Re-establish roles: you give legal advice; AA facilitates communication and observes fairness; consider a different AA if unsuitable."},{"id":"c","text":"Let the AA take over."},{"id":"d","text":"Terminate police contact."}]',
  ARRAY['b'],
  'Role confusion undermines the client; representatives correct it firmly and respectfully.',
  ARRAY['SRA PSRAS Unit 7'],
  ARRAY['U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 49: Police refuse an interpreter for a deaf client claiming "lipreading is enough". What is your stance?',
  'PSRAS Unit 7 — Vulnerability',
  'advanced',
  '[{"id":"a","text":"Accept if the client lipreads well."},{"id":"b","text":"Press for qualified sign language or other appropriate communication support; record refusal and escalate if necessary."},{"id":"c","text":"Withdraw representation."},{"id":"d","text":"Use written notes only forever."}]',
  ARRAY['b'],
  'Effective communication is a fairness requirement, not a courtesy.',
  ARRAY['Code C sect 13', 'SRA PSRAS Unit 7'],
  ARRAY['U7.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 50: A transgender client fears mistreatment in custody. What is appropriate?',
  'PSRAS Unit 7 — Vulnerability',
  'intermediate',
  '[{"id":"a","text":"Tell them to hide identity."},{"id":"b","text":"Take instructions on risks, record concerns, seek appropriate safeguards and challenge discriminatory treatment."},{"id":"c","text":"Disclose their identity to media."},{"id":"d","text":"Ignore as irrelevant to criminal case."}]',
  ARRAY['b'],
  'SRA vulnerability list includes transgender people; station advocacy includes dignity safeguards.',
  ARRAY['SRA PSRAS Unit 1', 'Equality Act 2010'],
  ARRAY['U1.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 51: Neurodivergent client requests breaks every 20 minutes. What is your approach?',
  'PSRAS Unit 7 — Vulnerability',
  'intermediate',
  '[{"id":"a","text":"Refuse as disruptive."},{"id":"b","text":"Treat as a reasonable adjustment request; negotiate breaks with the officer consistent with Code C expectations."},{"id":"c","text":"Tell them to \"tough it out\"."},{"id":"d","text":"Cancel the interview permanently."}]',
  ARRAY['b'],
  'Breaks and adjustments support reliable answers and fairness.',
  ARRAY['Code C', 'SRA PSRAS Unit 7'],
  ARRAY['U7.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 52: Police refuse the first description record before a video ID. What is your first step?',
  'PSRAS Unit 8 — Identification',
  'intermediate',
  '[{"id":"a","text":"Proceed anyway."},{"id":"b","text":"Refer them to Code D 3.1; escalate to a senior officer; record the refusal."},{"id":"c","text":"Boycott all procedures."},{"id":"d","text":"Bribe the SIO."}]',
  ARRAY['b'],
  'Unit 8 requires requesting the first description and responding to refusal properly.',
  ARRAY['Code D para 3.1', 'SRA PSRAS Unit 8'],
  ARRAY['U8.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 53: An eyewitness was shown photographs before a formal procedure while your client''s identity was known and available. What is the issue?',
  'PSRAS Unit 8 — Identification',
  'advanced',
  '[{"id":"a","text":"Always lawful."},{"id":"b","text":"Likely Code D breach; contamination risk; seek disclosure and consider representations on fairness and admissibility."},{"id":"c","text":"Never matters at trial."},{"id":"d","text":"Only matters for juveniles."}]',
  ARRAY['b'],
  'Code D restricts photo-shows where the suspect is known and available.',
  ARRAY['Code D para 3.3', 'SRA PSRAS Unit 8'],
  ARRAY['U8.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 54: Police propose a group ID on the street. Your client fears safety. What factor is central to advice?',
  'PSRAS Unit 8 — Identification',
  'intermediate',
  '[{"id":"a","text":"Street ID is always best."},{"id":"b","text":"Weigh fairness, dignity, safety, and consequences of refusal vs cooperation under Code D routes."},{"id":"c","text":"Refuse all IDs always."},{"id":"d","text":"Let police choose without advice."}]',
  ARRAY['b'],
  'Unit 8 requires analysing advantages/disadvantages and cooperation consequences.',
  ARRAY['SRA PSRAS Unit 8', 'Code D'],
  ARRAY['U8.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 55: Identification is in issue but police will not hold a procedure. What may you consider?',
  'PSRAS Unit 8 — Identification',
  'intermediate',
  '[{"id":"a","text":"Nothing."},{"id":"b","text":"Whether Code D requires a procedure; make representations and record responses."},{"id":"c","text":"Kidnap a witness."},{"id":"d","text":"Forge an ID parade."}]',
  ARRAY['b'],
  'Unit 8 covers requesting procedures where appropriate.',
  ARRAY['SRA PSRAS Unit 8'],
  ARRAY['U8.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 56: At the ID suite, you notice eight foils look nothing like the first description. What do you do?',
  'PSRAS Unit 8 — Identification',
  'beginner',
  '[{"id":"a","text":"Say nothing to avoid delay."},{"id":"b","text":"Make representations on fairness under Code D and record the response."},{"id":"c","text":"Tell your client to pick randomly."},{"id":"d","text":"Walk out without explanation."}]',
  ARRAY['b'],
  'Representatives safeguard fairness by recorded representations.',
  ARRAY['Code D', 'SRA PSRAS Unit 8'],
  ARRAY['U8.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 57: Why make a contemporaneous note at an identification procedure?',
  'PSRAS Unit 8 — Identification',
  'intermediate',
  '[{"id":"a","text":"Courts ban notes."},{"id":"b","text":"To record process, representations, and responses for later admissibility and client instructions."},{"id":"c","text":"To post on social media."},{"id":"d","text":"To replace the officer''s record."}]',
  ARRAY['b'],
  'Unit 8 AO2C expects accurate written records.',
  ARRAY['SRA PSRAS Unit 8'],
  ARRAY['U8.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 58: Your client wants to turn away from the screen during video ID. What is the advice focus?',
  'PSRAS Unit 8 — Identification',
  'advanced',
  '[{"id":"a","text":"Always refuse to let them turn."},{"id":"b","text":"Explain how conduct may be interpreted and what refusal/cooperation consequences may be, while respecting dignity concerns."},{"id":"c","text":"Tell them to close eyes throughout."},{"id":"d","text":"Tell them to walk out mid-procedure without consequence."}]',
  ARRAY['b'],
  'Advice should help the client conduct themselves in their best interests while understanding consequences.',
  ARRAY['SRA PSRAS Unit 8'],
  ARRAY['U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 59: Police threaten adverse inferences if your client refuses a video ID. What is measured?',
  'PSRAS Unit 8 — Identification',
  'intermediate',
  '[{"id":"a","text":"Threats are always lawful."},{"id":"b","text":"Assess whether the threat is a fair summary of law and process; challenge improper pressure; record."},{"id":"c","text":"Ignore all legal risks."},{"id":"d","text":"Promise no inferences ever."}]',
  ARRAY['b'],
  'Advice must be accurate; representatives challenge improper pressure tactics.',
  ARRAY['Code D', 'CJPOA 1994', 'SRA PSRAS Unit 8'],
  ARRAY['U8.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 60: After interview without charge, what custody endorsement should you routinely seek?',
  'PSRAS Unit 9 — Post-interview',
  'intermediate',
  '[{"id":"a","text":"No endorsement is needed."},{"id":"b","text":"That you must be contacted before any further interview."},{"id":"c","text":"That police can interview freely."},{"id":"d","text":"That the client waives all rights."}]',
  ARRAY['b'],
  'Unit 9 requires protecting against further interviews in the representative''s absence.',
  ARRAY['SRA PSRAS Unit 9', 'Code C'],
  ARRAY['U9.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 61: Custody wants to charge ABH on thin evidence. What is your primary tool?',
  'PSRAS Unit 9 — Post-interview',
  'advanced',
  '[{"id":"a","text":"Social media campaign."},{"id":"b","text":"Representations on evidential sufficiency / public interest / out-of-court disposals under PACE s.37(7) and CPS tests."},{"id":"c","text":"Bribe the custody officer."},{"id":"d","text":"Forge alibi evidence."}]',
  ARRAY['b'],
  'Charge decisions engage PACE and CPS frameworks; representations must be evidence-based and recorded.',
  ARRAY['PACE s.37(7)', 'Code for Crown Prosecutors', 'Director''s Guidance on Charging'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 62: Client is charged; you believe s.38 PACE bail presumption applies. What is your focus?',
  'PSRAS Unit 9 — Post-interview',
  'intermediate',
  '[{"id":"a","text":"Assume remand without analysis."},{"id":"b","text":"Identify whether any s.38 exception is realistically made out; make bail representations and conditions proposals."},{"id":"c","text":"Promise bail."},{"id":"d","text":"Tell them to abscond."}]',
  ARRAY['b'],
  'Post-charge release is the default unless s.38 grounds are satisfied.',
  ARRAY['PACE s.38', 'SRA PSRAS Unit 9'],
  ARRAY['U9.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 63: Client is charged and confused about next steps. What must you explain?',
  'PSRAS Unit 9 — Post-interview',
  'beginner',
  '[{"id":"a","text":"Nothing; police will explain."},{"id":"b","text":"Charge meaning, first court appearance, likely timetable, and representation/legal aid for court."},{"id":"c","text":"That they are definitely going to prison."},{"id":"d","text":"That they have no appeal rights."}]',
  ARRAY['b'],
  'Unit 9 AO3A requires clear explanation of charge implications.',
  ARRAY['SRA PSRAS Unit 9'],
  ARRAY['U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 64: Client is RUI after release. What must they understand?',
  'PSRAS Unit 9 — Post-interview',
  'intermediate',
  '[{"id":"a","text":"RUI means NFA."},{"id":"b","text":"Investigation may continue; re-contact may happen; they should seek you before any further interview."},{"id":"c","text":"Police cannot arrest again."},{"id":"d","text":"They can ignore all post."}]',
  ARRAY['b'],
  'Post-release advice prevents clients misunderstanding RUI.',
  ARRAY['SRA PSRAS Unit 9'],
  ARRAY['U9.AO3.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 65: Police want a further interview after charge under Code C 16.5 circumstances. What is your first check?',
  'PSRAS Unit 9 — Post-interview',
  'advanced',
  '[{"id":"a","text":"Always refuse."},{"id":"b","text":"Whether the statutory gateway is satisfied; seek custody endorsement to be contacted; advise client on rights."},{"id":"c","text":"Waive attendance."},{"id":"d","text":"Delete the charge."}]',
  ARRAY['b'],
  'Post-charge interviews are tightly circumscribed; representatives gatekeep lawfulness.',
  ARRAY['Code C para 16.5', 'SRA PSRAS Unit 9'],
  ARRAY['U9.AO1.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 66: A conditional caution is offered for minor assault. What should you discuss with the client?',
  'PSRAS Unit 9 — Post-interview',
  'intermediate',
  '[{"id":"a","text":"Accept immediately."},{"id":"b","text":"Implications for criminal record, immigration, employment, and whether acceptance is genuinely in their interests."},{"id":"c","text":"Refuse all cautions always."},{"id":"d","text":"Hide the caution from employers."}]',
  ARRAY['b'],
  'OOC disposals have serious consequences; advice must be informed.',
  ARRAY['Code for Crown Prosecutors', 'SRA PSRAS Unit 9'],
  ARRAY['U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 67: Client charged asks if your firm will represent them at court. What is appropriate?',
  'PSRAS Unit 9 — Post-interview',
  'intermediate',
  '[{"id":"a","text":"Promise without instructions."},{"id":"b","text":"Explain right to representation and legal aid; take clear instructions on whether to accept instructions for court."},{"id":"c","text":"Refuse all court work."},{"id":"d","text":"Tell them to self-represent without discussion."}]',
  ARRAY['b'],
  'Unit 9 AO3C covers court representation instructions.',
  ARRAY['SRA PSRAS Unit 9'],
  ARRAY['U9.AO3.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 68: An officer speaks quickly in jargon during negotiation about disclosure. What is your technique?',
  'PSRAS Unit 2 — Communication',
  'intermediate',
  '[{"id":"a","text":"Match their speed with more jargon."},{"id":"b","text":"Ask them to slow down; restate their position in plain English; confirm agreement points in writing where possible."},{"id":"c","text":"Shout louder."},{"id":"d","text":"Refuse to negotiate."}]',
  ARRAY['b'],
  'Unit 2 expects precision and clarity; negotiation benefits from plain restatement.',
  ARRAY['SRA PSRAS Unit 2'],
  ARRAY['U2.AO1']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 69: You want more disclosure before interview. What is a strong negotiation move?',
  'PSRAS Unit 2 — Communication',
  'advanced',
  '[{"id":"a","text":"Threaten the officer personally."},{"id":"b","text":"Identify the issue, cite Code C 11.1A fairness, propose a concrete disclosure step, record outcome."},{"id":"c","text":"Offer money."},{"id":"d","text":"Leak to press."}]',
  ARRAY['b'],
  'Effective negotiation identifies issues, cites law, proposes alternatives, records outcomes.',
  ARRAY['SRA PSRAS Unit 2', 'Code C para 11.1A'],
  ARRAY['U2.AO2']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 70: Your client rambles; you need instructions on one night. What elicitation technique fits?',
  'PSRAS Unit 2 — Communication',
  'beginner',
  '[{"id":"a","text":"Interrupt every sentence."},{"id":"b","text":"Use a timeline scaffold (\"from 6pm to midnight, hour by hour\") and summarise back to check accuracy."},{"id":"c","text":"Fill in gaps with guesses."},{"id":"d","text":"Record only what helps the police."}]',
  ARRAY['b'],
  'Unit 2 expects structured elicitation and accurate recording.',
  ARRAY['SRA PSRAS Unit 2'],
  ARRAY['U2.AO3']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 71: A client uses English idioms you do not think they fully understand. What should you do?',
  'PSRAS Unit 2 — Communication',
  'intermediate',
  '[{"id":"a","text":"Assume understanding."},{"id":"b","text":"Check understanding in simple language; consider interpreter even for \"fluent\" speakers where legal concepts matter."},{"id":"c","text":"Mock their English."},{"id":"d","text":"Speak only in idioms."}]',
  ARRAY['b'],
  'Unit 2 includes identifying interpreter need and language matched to recipient.',
  ARRAY['SRA PSRAS Unit 2', 'Code C sect 13'],
  ARRAY['U2.AO1']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 72: Police agree to a short adjournment for healthcare but then shorten it unilaterally. What do you do?',
  'PSRAS Unit 2 — Communication',
  'advanced',
  '[{"id":"a","text":"Accept it."},{"id":"b","text":"Re-negotiate time; record the change; consider fairness representations if inadequate for fitness."},{"id":"c","text":"Start a fight."},{"id":"d","text":"Withdraw silently."}]',
  ARRAY['b'],
  'Negotiation includes recording outcomes and pushing back on unfair changes.',
  ARRAY['SRA PSRAS Unit 2'],
  ARRAY['U2.AO2']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 73: An ethical issue arises: client wants you to misrecord advice. What is required?',
  'PSRAS Unit 2 — Communication',
  'intermediate',
  '[{"id":"a","text":"Comply to keep the client happy."},{"id":"b","text":"Refuse; maintain accurate records; explain professional duties; consider disclaimer if they proceed against advice."},{"id":"c","text":"Alter records secretly."},{"id":"d","text":"Blame the police."}]',
  ARRAY['b'],
  'Unit 2 and Unit 1 records duties require integrity in recording advice.',
  ARRAY['SRA PSRAS Unit 2', 'SRA Principles'],
  ARRAY['U2.AO3']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 74: Why does assertive tone matter when requesting an AA?',
  'PSRAS Unit 2 — Communication',
  'beginner',
  '[{"id":"a","text":"It does not matter."},{"id":"b","text":"Clear, calm assertiveness helps secure statutory safeguards without alienating officers you still need to work with."},{"id":"c","text":"Only rudeness works."},{"id":"d","text":"Only flattery works."}]',
  ARRAY['b'],
  'Unit 2 includes speaking effectively and assertively while maintaining professionalism.',
  ARRAY['SRA PSRAS Unit 2'],
  ARRAY['U2.AO1']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 75: You propose a break schedule in a long interview. What is the benefit to negotiation?',
  'PSRAS Unit 2 — Communication',
  'intermediate',
  '[{"id":"a","text":"There is no negotiation benefit."},{"id":"b","text":"It reduces oppressive pressure, supports reliability, and is easier for officers to accept than stopping entirely."},{"id":"c","text":"It waives all rights."},{"id":"d","text":"It proves guilt."}]',
  ARRAY['b'],
  'Alternative approaches (breaks) can unlock agreement where all-or-nothing demands fail.',
  ARRAY['SRA PSRAS Unit 2', 'Code C'],
  ARRAY['U2.AO2']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 76: A non-British national asks whether a guilty plea at court could affect leave to remain. At the station, what is appropriate?',
  'PSRAS Unit 1 — Knowledge',
  'advanced',
  '[{"id":"a","text":"Give definitive immigration advice without research."},{"id":"b","text":"Flag immigration risk, avoid definitive immigration law advice outside competence, and arrange specialist advice where needed."},{"id":"c","text":"Say immigration never follows criminal cases."},{"id":"d","text":"Tell them to lie about status."}]',
  ARRAY['b'],
  'Unit 1 requires considering immigration implications; station reps signpost, not improvise.',
  ARRAY['SRA PSRAS Unit 1', 'Immigration Act 1971'],
  ARRAY['U1.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 77: A foreign national asks for consulate notification. What is true?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"Police can delay it like legal advice."},{"id":"b","text":"Consular notification rights under Code C cannot be delayed; facilitate the client''s choice."},{"id":"c","text":"Consulates are irrelevant."},{"id":"d","text":"Only US citizens have rights."}]',
  ARRAY['b'],
  'Code C sets out foreign national consular rights without delay.',
  ARRAY['Code C sect 7', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 78: Why keep a note of police partial disclosure refusals?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"Courts ignore notes."},{"id":"b","text":"It supports later s.78 arguments, complaints, and continuity for colleagues taking over."},{"id":"c","text":"It annoys judges."},{"id":"d","text":"It replaces disclosure."}]',
  ARRAY['b'],
  'Unit 1 AO1F emphasises accurate records including police information and advice.',
  ARRAY['SRA PSRAS Unit 1', 'PACE s.78'],
  ARRAY['U1.AO1.F']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 79: What does "actus reus" mean in station advice terms?',
  'PSRAS Unit 1 — Knowledge',
  'beginner',
  '[{"id":"a","text":"Mental element only."},{"id":"b","text":"The prohibited conduct / consequence elements the prosecution must prove, distinct from mens rea."},{"id":"c","text":"Sentence only."},{"id":"d","text":"Police opinion."}]',
  ARRAY['b'],
  'Unit 1 AO2B requires applying legal terms to scenarios.',
  ARRAY['SRA PSRAS Unit 1'],
  ARRAY['U1.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 80: Which pair best describes assault occasioning actual bodily harm?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"Any push causing death."},{"id":"b","text":"Assault or battery causing more than transient or trifling injury (s.47 OAPA 1861)."},{"id":"c","text":"Only a bruise never counts."},{"id":"d","text":"Only if a weapon is used."}]',
  ARRAY['b'],
  'Unit 1 AO3A lists ABH as a common offence; reps need practical element recall.',
  ARRAY['OAPA 1861 s.47', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 81: Handling stolen goods requires which mental element?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"Strict liability."},{"id":"b","text":"Dishonest possession/knowledge or belief that goods are stolen."},{"id":"c","text":"No mens rea."},{"id":"d","text":"Recklessness only as to weather."}]',
  ARRAY['b'],
  'Handling requires dishonesty and knowledge or belief of theft.',
  ARRAY['Theft Act 1968 s.22', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 82: Police want to adduce your client''s bad character in interview by "just chatting" about old convictions. What risk?',
  'PSRAS Unit 1 — Knowledge',
  'advanced',
  '[{"id":"a","text":"No risk."},{"id":"b","text":"Risk of prejudicial admissions without proper gateway analysis; advise client and consider challenging improper questioning."},{"id":"c","text":"Bad character is always admissible in interview."},{"id":"d","text":"Convictions are secret."}]',
  ARRAY['b'],
  'Unit 1 AO4B covers character rules; station reps prevent sloppy admissions.',
  ARRAY['CJA 2003 s.101', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO4.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 83: In Crown Court trial, who bears the legal burden of proving guilt?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"Defendant must prove innocence."},{"id":"b","text":"Prosecution, subject to specific statutory exceptions."},{"id":"c","text":"The trial judge."},{"id":"d","text":"The jury collectively."}]',
  ARRAY['b'],
  'Unit 1 AO4A tests burdens of proof relevant to interview advice.',
  ARRAY['SRA PSRAS Unit 1'],
  ARRAY['U1.AO4.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 84: Why might you mention s.78 PACE to an officer refusing a break to a distressed client?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"It is irrelevant."},{"id":"b","text":"Unfair interview conduct may affect admissibility; breaks support reliability and fairness."},{"id":"c","text":"It automatically excludes all evidence."},{"id":"d","text":"It cancels the investigation."}]',
  ARRAY['b'],
  'Unit 1 AO4E links oppression/unfairness to remedies including exclusion.',
  ARRAY['PACE s.78', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO4.E']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 85: Which court typically first deals with an adult charged with either-way offence?',
  'PSRAS Unit 1 — Knowledge',
  'beginner',
  '[{"id":"a","text":"Crown Court always first."},{"id":"b","text":"Magistrates'' court for first appearance; allocation follows."},{"id":"c","text":"High Court."},{"id":"d","text":"Coroner''s court."}]',
  ARRAY['b'],
  'Unit 1 AO2A expects basic procedural sequence knowledge.',
  ARRAY['SRA PSRAS Unit 1'],
  ARRAY['U1.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 86: A community resolution is offered. What should you flag?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"It erases all records magically."},{"id":"b","text":"It may still be recorded and can have practical consequences; take instructions before acceptance."},{"id":"c","text":"It is identical to NFA."},{"id":"d","text":"It requires a jury."}]',
  ARRAY['b'],
  'Unit 1 AO2D covers out-of-court disposals; advice must be realistic.',
  ARRAY['SRA PSRAS Unit 1'],
  ARRAY['U1.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 87: A breach of Code C may produce which practical consequence?',
  'PSRAS Unit 1 — Knowledge',
  'advanced',
  '[{"id":"a","text":"Automatic damages payment."},{"id":"b","text":"Potential exclusion of evidence, complaints, civil claims, and professional records for trial."},{"id":"c","text":"Nothing ever."},{"id":"d","text":"Immediate acquittal without trial."}]',
  ARRAY['b'],
  'Unit 1 AO5C lists consequences of breach; reps record for later use.',
  ARRAY['PACE s.78', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 88: Self-defence requires what core analysis?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"Defendant hated the victim."},{"id":"b","text":"Whether force was necessary and reasonable in the circumstances the defendant believed them to be."},{"id":"c","text":"Whether police like the defendant."},{"id":"d","text":"Whether the victim had insurance."}]',
  ARRAY['b'],
  'Unit 1 AO3C covers general defences such as self-defence.',
  ARRAY['CJA 2003 s.76', 'SRA PSRAS Unit 1'],
  ARRAY['U1.AO3.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 89: Which communication is most likely privileged?',
  'PSRAS Unit 1 — Knowledge',
  'intermediate',
  '[{"id":"a","text":"A text to a co-defendant arranging a story."},{"id":"b","text":"Confidential legal advice between representative and client for obtaining legal advice."},{"id":"c","text":"A Facebook post."},{"id":"d","text":"A shout across the custody desk."}]',
  ARRAY['b'],
  'Unit 1 AO4D tests LPP basics for station practice.',
  ARRAY['SRA PSRAS Unit 1'],
  ARRAY['U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Syllabus 90: An officer refuses your request to record a representation on the custody record. What next step fits?',
  'PSRAS Unit 1 — Knowledge',
  'advanced',
  '[{"id":"a","text":"Give up."},{"id":"b","text":"Make the representation orally again, ask for authority for refusal, note it in your own records, and escalate if appropriate."},{"id":"c","text":"Forge the custody record."},{"id":"d","text":"Bribe the desk."}]',
  ARRAY['b'],
  'Unit 1 breach response includes recording and escalation pathways.',
  ARRAY['SRA PSRAS Unit 1', 'Code C'],
  ARRAY['U1.AO1.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - It is 1:00. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 19:00 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - It is 2:07. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 20:11 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - It is 3:14. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 21:22 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - It is 4:21. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 22:33 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - It is 5:28. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 23:44 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - It is 6:35. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 19:55 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - It is 7:42. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 20:06 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - It is 8:49. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 21:17 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - It is 9:56. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 22:28 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - It is 10:03. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 23:39 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - It is 11:10. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 19:50 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - It is 12:17. Your client is in detention for an indictable offence. The custody record shows detention was authorised at 14:10 and it is now 20:01 the same day. The investigating officer wants to delay the first review to finish paperwork. What is your best immediate point?',
  'PACE Code C - Detention',
  'intermediate',
  '[{"id":"a","text":"Insist the review can wait because paperwork is part of a diligent investigation."},{"id":"b","text":"Remind the custody officer that the first review must be carried out within the statutory period from when detention was authorised, and unnecessary delay should be challenged and recorded."},{"id":"c","text":"Tell your client to waive reviews to speed up release."},{"id":"d","text":"Demand immediate release because paperwork is incomplete."}]',
  ARRAY['b'],
  'PACE s.40(3) requires the first review not later than six hours after detention was authorised (subject to specific exceptions). A representative should challenge avoidable delay, ensure review occurs, and ensure the custody record reflects concerns. This is about lawful detention management, not finishing convenience paperwork.',
  ARRAY['PACE 1984 s.40(3)(a)', 'Code C para 15.1'],
  ARRAY['U1.AO5.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Before interview, disclosure is limited to broad allegations and CCTV stills. Your client wants to answer questions "to clear their name" but also mentions ADHD medication wearing off. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Before interview, disclosure is limited to broad allegations and a summary account. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Before interview, disclosure is limited to broad allegations and CCTV stills. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Before interview, disclosure is limited to broad allegations and a summary account. Your client wants to answer questions "to clear their name" but also mentions ADHD medication wearing off. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Before interview, disclosure is limited to broad allegations and CCTV stills. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Before interview, disclosure is limited to broad allegations and a summary account. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Before interview, disclosure is limited to broad allegations and CCTV stills. Your client wants to answer questions "to clear their name" but also mentions ADHD medication wearing off. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Before interview, disclosure is limited to broad allegations and a summary account. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Before interview, disclosure is limited to broad allegations and CCTV stills. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Before interview, disclosure is limited to broad allegations and a summary account. Your client wants to answer questions "to clear their name" but also mentions ADHD medication wearing off. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Before interview, disclosure is limited to broad allegations and CCTV stills. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Before interview, disclosure is limited to broad allegations and a summary account. Your client wants to answer questions "to clear their name" but also mentions being exhausted after night shift. What is the best advice at this stage?',
  'PACE Code C - Interviews',
  'advanced',
  '[{"id":"a","text":"Confirm they should answer fully because any silence will automatically convict them."},{"id":"b","text":"Explain that interview strategy depends on instructions, disclosure adequacy, risk of adverse inferences, and whether they are fit for interview; consider requesting further disclosure, a break plan, and whether a prepared statement or controlled answers are safer."},{"id":"c","text":"Advise they must use no comment in every interview regardless of circumstances."},{"id":"d","text":"Tell them not to mention health issues because it weakens the defence."}]',
  ARRAY['b'],
  'A competent rep triages fitness for interview (Code C), disclosure fairness, and CJPOA 1994 adverse inference risk in the Crown Court context. "Looking guilty" is not a legal test; the advice must be tailored. Silence is not automatic, and answering without instructions can damage the defence.',
  ARRAY['Code C sect 12', 'Code C Note 12B', 'CJPOA 1994 ss.34–38'],
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Your client asks you to pass a message to a co-suspect''s family member about "what to say in interview". You suspect it could contaminate evidence. What should you do?',
  'PACE Code C - Rights',
  'intermediate',
  '[{"id":"a","text":"Pass the message because the client instructed you."},{"id":"b","text":"Refuse and explain legal professional privilege does not extend to facilitating interference with evidence or perverting the course of justice; keep advice within lawful representation."},{"id":"c","text":"Ask the custody officer to pass the message instead."},{"id":"d","text":"Post the message anonymously via a third party."}]',
  ARRAY['b'],
  'Representatives must not assist schemes that could corrupt evidence. Privilege protects confidential legal advice; it is not a licence to coordinate accounts in ways that risk offending or compromising an investigation. Record your advice and keep instructions lawful.',
  ARRAY['Code C Note 6G', 'SRA Standards and Regulations'],
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - A juvenile is volatile and has self-harmed years ago. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - A juvenile is volatile and is openly distressed. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - A juvenile is volatile and has self-harmed years ago. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - A juvenile is volatile and is openly distressed. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - A juvenile is volatile and has self-harmed years ago. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - A juvenile is volatile and is openly distressed. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - A juvenile is volatile and has self-harmed years ago. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - A juvenile is volatile and is openly distressed. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - A juvenile is volatile and has self-harmed years ago. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - A juvenile is volatile and is openly distressed. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - A juvenile is volatile and has self-harmed years ago. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - A juvenile is volatile and is openly distressed. The AA is a parent who keeps answering for them in consultation. Interview is scheduled imminently. What is your priority?',
  'PACE Code C - Vulnerable Persons',
  'advanced',
  '[{"id":"a","text":"Proceed to interview because an AA is present."},{"id":"b","text":"Address fitness to be interviewed / fitness for interview with the custody officer, ensure AA understands their role (support not substitution), consider requesting healthcare input, and pause interview until the juvenile can effectively participate."},{"id":"c","text":"Replace the AA immediately with a stranger."},{"id":"d","text":"Tell police to interview without the AA to save time."}]',
  ARRAY['b'],
  'Appropriate adults facilitate communication; they should not replace the juvenile''s voice. If participation is compromised by distress or capacity concerns, Code C expectations around healthcare assessment and breaks matter. Representatives advocate for fair process, not speed.',
  ARRAY['Code C sect 11', 'Code C Annex E'],
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Your client is to take part in a video identification procedure. They look distinctive because of facial tattoos. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Your client is to take part in a video identification procedure. They are worried about standing out. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Your client is to take part in a video identification procedure. They look distinctive because of facial tattoos. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Your client is to take part in a video identification procedure. They are worried about standing out. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Your client is to take part in a video identification procedure. They look distinctive because of facial tattoos. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Your client is to take part in a video identification procedure. They are worried about standing out. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Your client is to take part in a video identification procedure. They look distinctive because of facial tattoos. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Your client is to take part in a video identification procedure. They are worried about standing out. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Your client is to take part in a video identification procedure. They look distinctive because of facial tattoos. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Your client is to take part in a video identification procedure. They are worried about standing out. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Your client is to take part in a video identification procedure. They look distinctive because of facial tattoos. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Your client is to take part in a video identification procedure. They are worried about standing out. What practical point should you raise beforehand?',
  'PACE Code D - Identification',
  'intermediate',
  '[{"id":"a","text":"Demand street identification instead."},{"id":"b","text":"Ask whether the parade composition fairly reflects the witness''s description and Code D safeguards are applied, including documentation of objections and representation notes."},{"id":"c","text":"Refuse all identification procedures."},{"id":"d","text":"Tell your client to cover distinguishing marks."}]',
  ARRAY['b'],
  'Code D sets expectations for fair identification procedures. Representatives ensure compliance, note objections, and ensure your client understands the process. The answer is not refusing lawful procedures by default, but ensuring fairness and record-keeping.',
  ARRAY['PACE Code D', 'Code D paras 3.4–3.11'],
  ARRAY['U1.AO5.B', 'U8.AO2.A', 'U8.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Your client was stopped under PACE for going equipped. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Your client was stopped under PACE for drugs. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Your client was stopped under PACE for going equipped. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Your client was stopped under PACE for drugs. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Your client was stopped under PACE for going equipped. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Your client was stopped under PACE for drugs. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Your client was stopped under PACE for going equipped. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Your client was stopped under PACE for drugs. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Your client was stopped under PACE for going equipped. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Your client was stopped under PACE for drugs. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Your client was stopped under PACE for going equipped. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Your client was stopped under PACE for drugs. The officer''s grounds note "looked nervous in a high-crime area". Your client wants to complain and refuses to give details. What is the sound station-focused advice?',
  'PACE Code A - Stop and Search',
  'intermediate',
  '[{"id":"a","text":"Refusal to give details is always an obstruction offence."},{"id":"b","text":"Explain lawfully required identification/stop obligations where applicable, but challenge weak grounds via complaint / representation and preserve evidence (body-worn video references)."},{"id":"c","text":"Tell them to confess to possession to end the encounter."},{"id":"d","text":"Advise fleeing the scene."}]',
  ARRAY['b'],
  'Stop powers require lawful grounds under Code A; "nervousness" alone may be insufficient. Representatives separate sensible compliance with lawful demands from strategic challenge afterwards. Practical station advice protects the client without inventing offences.',
  ARRAY['PACE Code A', 'PACE s.1'],
  ARRAY['U1.AO5.B', 'U1.AO5.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Your client was arrested for breach of bail without being told the statutory power used. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Your client was arrested for breach of bail at home without a written notice they understand. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Your client was arrested for breach of bail without being told the statutory power used. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Your client was arrested for breach of bail at home without a written notice they understand. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Your client was arrested for breach of bail without being told the statutory power used. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Your client was arrested for breach of bail at home without a written notice they understand. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Your client was arrested for breach of bail without being told the statutory power used. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Your client was arrested for breach of bail at home without a written notice they understand. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Your client was arrested for breach of bail without being told the statutory power used. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Your client was arrested for breach of bail at home without a written notice they understand. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Your client was arrested for breach of bail without being told the statutory power used. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Your client was arrested for breach of bail at home without a written notice they understand. They were brought straight to custody. What issue do you flag first for the custody officer?',
  'PACE Code G - Arrest',
  'intermediate',
  '[{"id":"a","text":"It does not matter because arrest is always lawful once in custody."},{"id":"b","text":"Arrest necessity and information requirements under PACE must be satisfied and recorded; deficiencies should be raised for the custody record and may affect subsequent challenges."},{"id":"c","text":"Demand immediate NFA before facts are checked."},{"id":"d","text":"Tell your client to refuse all bookings."}]',
  ARRAY['b'],
  'PACE sets requirements around arrest powers and information. Custody reps ensure breaches are recorded and challenge unlawful detention routes. This is operational advocacy, not abstract law.',
  ARRAY['PACE s.28', 'PACE s.30', 'Code G'],
  ARRAY['U1.AO5.B', 'U4.AO1.B', 'U4.AO1.C']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Police propose RUI after interview for serious allegations. Your client has dependants relying on them but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Police propose release under investigation after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Police propose RUI after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Police propose release under investigation after interview for serious allegations. Your client has dependants relying on them but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Police propose RUI after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Police propose release under investigation after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Police propose RUI after interview for serious allegations. Your client has dependants relying on them but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Police propose release under investigation after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Police propose RUI after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Police propose release under investigation after interview for serious allegations. Your client has dependants relying on them but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Police propose RUI after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Police propose release under investigation after interview for serious allegations. Your client has local ties but previous failures to answer bail in unrelated matters. What focused advice helps decisions?',
  'Bail',
  'advanced',
  '[{"id":"a","text":"RUI means no conditions so there is nothing to negotiate."},{"id":"b","text":"Clarify release status, implications for bail if charged later, compliance expectations, and ensure your client understands obligations and risks of breaching any conditions if imposed at charge stage."},{"id":"c","text":"Advise absconding because RUI is weaker than bail."},{"id":"d","text":"Promise them they will never be charged."}]',
  ARRAY['b'],
  'Station reps explain practical consequences of release routes and future bail risks. RUI is not "no consequences"; charging decisions may follow. Advice must be cautious and fact-specific.',
  ARRAY['Bail Act 1976', 'CJA 2003 Sch. 12 context'],
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - The officer hints they want a charging decision overnight for a domestic ABH. Disclosure is still incomplete and your client is distressed. What is your professional stance?',
  'PACE Code C - Charging',
  'intermediate',
  '[{"id":"a","text":"Press your client to accept a caution regardless of facts."},{"id":"b","text":"Ensure fitness and representations on disclosure completeness are recorded; remind police/CPS paths require fair review material and your client should not be rushed into uninformed decisions."},{"id":"c","text":"Refuse any engagement with charging discussions."},{"id":"d","text":"Offer to negotiate with the complainant privately."}]',
  ARRAY['b'],
  'Representatives ensure decisions are informed. You are not there to shortcut fairness for convenience. Record concerns where charging is pursued on thin material.',
  ARRAY['Code C sect 16', 'DG6 charging guidance (practical context)'],
  ARRAY['U9.AO1.A', 'U9.AO2.A']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Your client is shown partial disclosure before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Your client is shown MG6 summary only before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Your client is shown partial disclosure before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Your client is shown MG6 summary only before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Your client is shown partial disclosure before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Your client is shown MG6 summary only before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Your client is shown partial disclosure before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Your client is shown MG6 summary only before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Your client is shown partial disclosure before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Your client is shown MG6 summary only before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Your client is shown partial disclosure before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Your client is shown MG6 summary only before interview on a sexual offence allegation. They ask whether answering creates proof problems. What is the key teaching point?',
  'Evidence - Disclosure',
  'advanced',
  '[{"id":"a","text":"They must answer every question fully or they will look guilty."},{"id":"b","text":"Explain how adverse inferences may arise in Crown Court proceedings depending on reliance on facts later asserted in defence, and why instructions + disclosure gaps drive whether no comment, limited answers, or a prepared statement best protects them."},{"id":"c","text":"Silence can never have consequences."},{"id":"d","text":"Tell them to agree with police hypothesis to get bail."}]',
  ARRAY['b'],
  'Disclosure limitations plus CJPOA inference framework mean station advice is strategic and ethical. Representatives avoid definitive trial predictions but explain realistic risks and processes.',
  ARRAY['CJPOA 1994 ss.34–38', 'Attorney General''s Guidelines on Disclosure'],
  ARRAY['U1.AO4.C', 'U4.AO2.B', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - The investigating officer asks you "off the record" whether your client did it. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - The investigating officer asks you "off the record" whether your client knows who did. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - The investigating officer asks you "off the record" whether your client did it. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - The investigating officer asks you "off the record" whether your client knows who did. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - The investigating officer asks you "off the record" whether your client did it. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - The investigating officer asks you "off the record" whether your client knows who did. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - The investigating officer asks you "off the record" whether your client did it. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - The investigating officer asks you "off the record" whether your client knows who did. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - The investigating officer asks you "off the record" whether your client did it. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - The investigating officer asks you "off the record" whether your client knows who did. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - The investigating officer asks you "off the record" whether your client did it. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - The investigating officer asks you "off the record" whether your client knows who did. How should you respond?',
  'Professional Conduct',
  'intermediate',
  '[{"id":"a","text":"Give your honest impression to maintain goodwill."},{"id":"b","text":"Politely refuse to discuss instructions or evidence outside proper disclosure channels; confidentiality is not waived because the tone is informal."},{"id":"c","text":"Answer hypothetically without naming your client."},{"id":"d","text":"Record the officer''s question but remain silent entirely."}]',
  ARRAY['b'],
  'Professional boundaries matter. Informal fishing can prejudice clients. Representatives engage through lawful routes and recorded disclosure, not corridor gossip.',
  ARRAY['SRA Principles', 'Code C Note 6G'],
  ARRAY['U1.AO1.E', 'U1.AO4.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Custody proposes strip search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Custody proposes more intrusive search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Custody proposes strip search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Custody proposes more intrusive search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Custody proposes strip search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Custody proposes more intrusive search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Custody proposes strip search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Custody proposes more intrusive search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Custody proposes strip search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Custody proposes more intrusive search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Custody proposes strip search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Custody proposes more intrusive search following intelligence your client disputes. Your client consents "to get it over with". What should you document and advise?',
  'PACE Code C - Searches',
  'intermediate',
  '[{"id":"a","text":"Consent removes all safeguards."},{"id":"b","text":"Ensure statutory safeguards and proportionality are respected; consent must be genuine and informed; challenge unlawful searches and record contemporaneous concerns."},{"id":"c","text":"Tell them never to consent."},{"id":"d","text":"Offer to conduct the search yourself."}]',
  ARRAY['b'],
  'PACE and Code C govern custody searches. Representatives ensure necessity and authority are satisfied and protect dignity where coercion or fatigue might contaminate "consent".',
  ARRAY['PACE Annex A (strip searches)', 'Code C Annex A'],
  ARRAY['U1.AO5.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Interview recording fails mid-interview and officers propose summarising the missed portion manually. Your client is anxious about twisting words. What do you press for?',
  'PACE Code E - Recording',
  'beginner',
  '[{"id":"a","text":"Accept a summary if officers agree."},{"id":"b","text":"Insist on compliant recording continuity under Code E expectations; significant content should not disappear into disputed summaries without remediation."},{"id":"c","text":"Tell your client to confess so recording does not matter."},{"id":"d","text":"Demand immediate abandonment of the investigation."}]',
  ARRAY['b'],
  'Tape integrity matters for disputes about significant statements and oppression issues. Representatives advocate for reliable records.',
  ARRAY['PACE Code E'],
  ARRAY['U1.AO5.B', 'U6.AO1.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Your client admits taking an item worth £40 from a shop when intoxicated, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Your client admits taking an item worth £41 from a shop, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Your client admits taking an item worth £42 from a shop when intoxicated, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Your client admits taking an item worth £43 from a shop, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Your client admits taking an item worth £44 from a shop when intoxicated, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Your client admits taking an item worth £45 from a shop, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Your client admits taking an item worth £46 from a shop when intoxicated, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Your client admits taking an item worth £47 from a shop, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Your client admits taking an item worth £48 from a shop when intoxicated, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Your client admits taking an item worth £49 from a shop, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Your client admits taking an item worth £50 from a shop when intoxicated, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Your client admits taking an item worth £51 from a shop, says they intended to pay later, and police treat it as theft. What practical station point is most useful before interview?',
  'Criminal Law - Common Offences',
  'intermediate',
  '[{"id":"a","text":"Intent cannot matter for theft."},{"id":"b","text":"Clarify the facts needed for dishonesty/intention discussion with your client privately, then decide how to approach answers without rushing admissions that could bind them later."},{"id":"c","text":"Advise them to pay £20 on the spot to close it."},{"id":"d","text":"Tell police your client has mental capacity issues without consent."}]',
  ARRAY['b'],
  'Station reps avoid turning messy facts into premature admissions. Theft turns on dishonesty; intoxication has nuanced effects. Advice is careful fact-development, not lecturing on Blackstone''s.',
  ARRAY['Theft Act 1968 s.1'],
  ARRAY['U1.AO3.A', 'U5.AO2.B']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 1/12 - Police say your client''s prints are on an item. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 2/12 - Police say DNA is a partial mixed profile. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 3/12 - Police say your client''s prints are on an item. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 4/12 - Police say DNA is a partial mixed profile. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 5/12 - Police say your client''s prints are on an item. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 6/12 - Police say DNA is a partial mixed profile. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 7/12 - Police say your client''s prints are on an item. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 8/12 - Police say DNA is a partial mixed profile. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 9/12 - Police say your client''s prints are on an item. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 10/12 - Police say DNA is a partial mixed profile. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 11/12 - Police say your client''s prints are on an item. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);

INSERT INTO public.questions (question_text, category, difficulty, options, correct_answer, explanation, source_refs, syllabus_refs, status)
VALUES (
  'Scenario 12/12 - Police say DNA is a partial mixed profile. Your client asks whether denying possession is pointless. What measured advice fits police station practice?',
  'Evidence',
  'advanced',
  '[{"id":"a","text":"Scientific evidence cannot be challenged."},{"id":"b","text":"Explain strengths/limits of forensic evidence, routes for disclosure of methodology, and why instructions drive interview strategy; avoid definitive trial predictions."},{"id":"c","text":"Tell them denial is always perjury later."},{"id":"d","text":"Insist they confess because forensic evidence exists."}]',
  ARRAY['b'],
  'Forensic evidence varies in weight; representatives resist panic confessions and ensure clients understand issues are trial-stage as well as investigative.',
  ARRAY['Criminal Procedure and Investigations Act 1996 (disclosure context)'],
  ARRAY['U1.AO4.B', 'U1.AO4.C', 'U5.AO2.D']::text[],
  'approved'
);


-- =====================================================
-- FILE: cit-scenarios-seed (generated - rebuild: npm run generate:questions-sql)
-- Source: scripts/build-cit-scenarios-sql.mjs + scripts/cit-scenarios.mjs
-- Idempotent: ON CONFLICT (slug) DO UPDATE.
-- =====================================================

-- Generated CIT scenario seed
-- Total scenarios: 12

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'dscc-third-party',
  'DSCC call from a third party',
  'Unit 3 — Request to attend',
  'intermediate',
  ARRAY['U1.AO1.A', 'U3.AO1.A', 'U3.AO1.B', 'U3.AO1.D', 'U3.AO2.A']::text[],
  'It is 02:14. The DSCC operator says "your firm is on the rota and a Mrs Khan called us — her son Ali is in custody at Walthamstow for s.18 GBH". They give you a station phone, no custody number, no DSCC reference, and ask you to confirm acceptance.',
  '{"start":"n1","nodes":{"n1":{"prompt":"Mrs Khan never spoke to her son. What do you record and confirm before treating this as an instruction to act?","choices":[{"id":"a","label":"Accept and head straight to the station — speed is what matters.","next":"badRecord","feedback":"Going without authority risks acting without instruction; PSRAS expects authority to act and a recorded chain of how you got involved.","score":-1},{"id":"b","label":"Take the DSCC reference, time of notification, time of acceptance, the third-party relationship, and ask DSCC to obtain custody-officer confirmation that the suspect wants you.","next":"n2","feedback":"Code C Annex B para 4 expects confirmation that the suspect wants the named solicitor; you must record initial information completely.","score":3},{"id":"c","label":"Refuse the case unless Mrs Khan calls back with the custody reference herself.","next":"badRecord","feedback":"Third-party calls are common; the answer is verification through DSCC/custody, not refusal.","score":-1}]},"n2":{"prompt":"You are now confirmed as Ali''s representative. The custody officer says interview is \"in 20 minutes\". You are 50 minutes away.","choices":[{"id":"a","label":"Authorise the interview to proceed without you and ask for a transcript afterwards.","next":"badRush","feedback":"You cannot authorise an interview to proceed without legal advice in your client''s name; this fails U1.AO1.A and U6.AO2.A duties.","score":-2},{"id":"b","label":"Tell custody you will attend; ask them to delay interview until you arrive and provide pre-arrival telephone advice in private to the suspect.","next":"goodArrive","feedback":"In-person attendance is mandatory absent exceptional circumstances; pre-arrival phone advice (right to silence, do not discuss the case with anyone) is part of U3.AO3.","score":3},{"id":"c","label":"Refuse to attend because the case is indictable-only — only a duty solicitor can take it.","next":"badRush","feedback":"The probationary indictable-only restriction applies to JIIP/probationary reps; otherwise an accredited rep proceeds. Refusing is wrong without that fact.","score":-1}]},"goodArrive":{"terminal":true,"outcome":"good","prompt":"You arrive at 03:08 with a complete record of how the case began.","summary":"You captured the DSCC reference, time of notification, time of acceptance, third-party relationship, custody confirmation, and gave appropriate pre-arrival advice. Interview was held until you arrived for a private consultation. PSRAS Unit 3 standards met."},"badRush":{"terminal":true,"outcome":"bad","prompt":"Interview proceeds while you are still on the M11.","summary":"Allowing interview without your attendance, or refusing on a wrong understanding of probationary restrictions, fails Unit 3 standards on attendance and authority to act."},"badRecord":{"terminal":true,"outcome":"bad","prompt":"You arrive having recorded almost nothing about the request.","summary":"No DSCC reference and no third-party verification means you cannot evidence authority to act or initial information collection. U3.AO1.D recording standards failed."}}}'::jsonb,
  ARRAY['Always record DSCC reference, time of notification, time of acceptance, and third-party relationship.', 'A third-party call is a starting point; confirmation must come via DSCC/custody that the suspect wants you (Code C Annex B para 4).', 'In-person attendance is mandatory absent exceptional circumstances; pre-arrival telephone advice is U3.AO3.']::text[],
  ARRAY['Code C Annex B para 4', 'PACE s.58', 'SRA PSRAS Unit 3']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'immigration-status-disclosure',
  'Immigration status surfaces in consultation',
  'Unit 1 — Underpinning ethics',
  'advanced',
  ARRAY['U1.AO1.B', 'U1.AO1.E', 'U5.AO2.C']::text[],
  'Mid-consultation your client mentions, almost casually, that he overstayed a visa five years ago. You are advising on a simple shoplifting allegation. Police are unaware of the immigration position.',
  '{"start":"n1","nodes":{"n1":{"prompt":"What do you do with this information?","choices":[{"id":"a","label":"Volunteer the immigration history to the custody officer.","next":"badBreach","feedback":"Volunteering privileged information without instructions breaches confidentiality; immigration matters can flow from a station disclosure.","score":-2},{"id":"b","label":"Explain the privileged status of what your client tells you, the practical risk of immigration consequences (e.g. on charging or bail), and ask for instructions on whether to mention it.","next":"n2","feedback":"You must address Code C Note for Guidance 6D (immigration implications) and SRA confidentiality without making decisions for the client.","score":3},{"id":"c","label":"Ignore it — immigration is irrelevant to a shoplifting interview.","next":"badIgnore","feedback":"Immigration status can affect bail, charging routes, identification document requests, and Schedule 7-style scrutiny; ignoring it fails U1.AO1.B.","score":-2}]},"n2":{"prompt":"Your client wants to plead guilty quickly to \"get out of the station fastest\". What is the right station response?","choices":[{"id":"a","label":"Encourage the plea to minimise time in custody.","next":"badCoerced","feedback":"Quick admissions to escape custody are not informed decisions. Especially with possible immigration consequences, this is a serious U1.AO1.E breach.","score":-2},{"id":"b","label":"Pause; explain that admissions or charge can have immigration consequences (potentially including referral to immigration enforcement), and that bail decisions and identity questions could surface immigration status separately. Take instructions on disclosure to the police.","next":"goodEthics","feedback":"This is exactly the U1.AO1.B / U1.AO1.E expectation: information, ethics, and informed decisions take priority over speed.","score":3}]},"goodEthics":{"terminal":true,"outcome":"good","prompt":"Your client makes an informed decision about how to proceed.","summary":"You navigated privilege, immigration awareness, and informed consent without making decisions for the client. PSRAS U1.AO1.B and U1.AO1.E standards met."},"badBreach":{"terminal":true,"outcome":"bad","prompt":"You volunteered privileged information.","summary":"You may face an SRA conduct issue and your client now faces parallel immigration scrutiny. Confidentiality and privilege are the absolute defaults."},"badIgnore":{"terminal":true,"outcome":"bad","prompt":"You proceeded without addressing immigration.","summary":"Failure to recognise immigration as a station issue is a recognised PSRAS gap; advice was incomplete."},"badCoerced":{"terminal":true,"outcome":"bad","prompt":"A plea was extracted to escape custody.","summary":"Speed-driven admissions without informed advice expose your client to significant collateral consequences. U1.AO1.E ethics breach."}}}'::jsonb,
  ARRAY['Immigration status can affect bail, charging routes, and identity inquiries — recognise it at the station.', 'Privilege is the default; do not volunteer client information without instructions.', 'Speed of release is never a substitute for informed advice.']::text[],
  ARRAY['Code C Note for Guidance 6D', 'SRA Principles', 'SRA PSRAS Unit 1']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'disengaged-aa',
  'AA who keeps answering for the juvenile',
  'Unit 7 — Vulnerability',
  'intermediate',
  ARRAY['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A', 'U7.AO2.B']::text[],
  'Your 15-year-old client has ADHD and a diagnosed learning difficulty. The appropriate adult is his uncle; the uncle keeps interjecting, completing answers, and at one point tells your client "tell them what they want, then we go home".',
  '{"start":"n1","nodes":{"n1":{"prompt":"You are still in the consultation room before interview.","choices":[{"id":"a","label":"Let the uncle continue — having any AA is what matters legally.","next":"badProceed","feedback":"Code C 1.7 and Note 1B require the AA to be capable of properly performing the role. An AA who substitutes the suspect''s voice does not satisfy the role.","score":-2},{"id":"b","label":"Pause; speak to the AA privately about role expectations (support and help communication, not answer); also reassess fitness for interview given the learning difficulty.","next":"n2","feedback":"This addresses U7.AO2.A (AA understands role) and U5.AO1.C (fitness for interview) at once.","score":3},{"id":"c","label":"Ask the police to remove the AA and continue without one.","next":"badNoAa","feedback":"A juvenile is entitled to an AA. Removing without replacement is a breach of Code C; this is an escalation route, not a solution.","score":-2}]},"n2":{"prompt":"The uncle now wants to \"pop out for a smoke during interview\" because he is bored.","choices":[{"id":"a","label":"Permit it — interview can carry on if the AA returns later.","next":"badAbsence","feedback":"Interview must not continue without the AA present; Code C 11.15 expectations protect juveniles. This breaches Unit 7.","score":-2},{"id":"b","label":"Insist any break in AA presence pauses the interview; if the AA refuses, request a substitute (e.g. via youth offending service / standby AA).","next":"goodProtect","feedback":"You enforced AA presence and triggered the substitute pathway, both within U7.AO2.A and Code C expectations.","score":3}]},"goodProtect":{"terminal":true,"outcome":"good","prompt":"Interview proceeds with an effective AA.","summary":"You safeguarded role boundaries (AA supports, does not substitute), fitness, and continuity of presence. Unit 7 standards met."},"badProceed":{"terminal":true,"outcome":"bad","prompt":"Interview proceeds with the AA answering for the juvenile.","summary":"Likely admissibility challenge under PACE s.78 and certain Unit 7 failures."},"badNoAa":{"terminal":true,"outcome":"bad","prompt":"The interview proceeds with no AA at all.","summary":"Serious Code C breach; you should have escalated to find a substitute, not removed the safeguard."},"badAbsence":{"terminal":true,"outcome":"bad","prompt":"Interview continues during the AA''s absence.","summary":"Continuing interviewing in AA absence breaches Code C 11.15 expectations."}}}'::jsonb,
  ARRAY['The AA must be capable of supporting the suspect; substitution of voice undermines the role.', 'Interview must not continue if the AA leaves — pause and seek a substitute.', 'Vulnerability is layered with fitness for interview (U5.AO1.C) and the AA framework (U7.AO2.A).']::text[],
  ARRAY['Code C 1.7 and Note 1B', 'Code C 11.15', 'SRA PSRAS Unit 7']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'oppressive-interviewer',
  'Officer using oppression in interview',
  'Unit 6 — Advising during interview',
  'advanced',
  ARRAY['U1.AO1.D', 'U1.AO4.E', 'U1.AO5.C', 'U6.AO1.B', 'U6.AO2.D', 'U5.AO1.D']::text[],
  'Mid-interview an officer raises his voice, repeats the question with increasing aggression, mocks your client, and at one point says "your kid will end up in care if you keep this up". Your client looks frightened. You have already cautioned the officer once on tone.',
  '{"start":"n1","nodes":{"n1":{"prompt":"What is your immediate intervention?","choices":[{"id":"a","label":"Say nothing and let your client decide whether to keep answering.","next":"badPassive","feedback":"Passivity in the face of oppression breaches U6.AO2.D and risks admissibility under PACE s.76 / s.78.","score":-2},{"id":"b","label":"Intervene on tape: identify the conduct, ask the officer to desist, request a break for private advice, and put the time and conduct on the record. If conduct continues, consider stopping the interview.","next":"n2","feedback":"A textbook U6.AO2.D intervention: name the conduct, on the record, and use s.58(1) breaks.","score":3},{"id":"c","label":"Tell your client, on tape, that the officer is \"out of order\".","next":"mixedTone","feedback":"Slightly off — your role is to enforce fairness, not editorialise on tape; better to act formally and request a break.","score":1}]},"n2":{"prompt":"In the consultation break, your client wants to keep going but is shaking. You suspect oppression has affected fitness.","choices":[{"id":"a","label":"Resume interview as planned because the client is willing.","next":"badResume","feedback":"Willingness post-oppression does not equal fitness; Code C and s.76 admissibility risks remain.","score":-2},{"id":"b","label":"Discuss strategy options (no comment, prepared statement, request a different officer, or healthcare assessment); raise representations to the inspector / superintendent and ensure custody record entries.","next":"goodEscalate","feedback":"Exactly the U1.AO1.D / U1.AO5.C breach response: senior officer, complaint pathway, contemporaneous record, possible exclusion later.","score":3}]},"goodEscalate":{"terminal":true,"outcome":"good","prompt":"You secure a different interviewing officer and a clear record.","summary":"You intervened, paused, escalated, and protected admissibility. Units 1 and 6 satisfied."},"badPassive":{"terminal":true,"outcome":"bad","prompt":"You did not intervene; the officer''s conduct went unchallenged on tape.","summary":"Passivity in the face of oppression is a Unit 6 / Unit 1 failure with admissibility consequences."},"mixedTone":{"terminal":true,"outcome":"mixed","prompt":"You editorialised but did not formalise the intervention.","summary":"Not enough — get the record right, ask for a break, and escalate; criticism on tape alone is weak protection."},"badResume":{"terminal":true,"outcome":"bad","prompt":"Interview resumed without addressing oppression.","summary":"A future court may exclude under s.76/s.78; you accepted shaky willingness as fitness."}}}'::jsonb,
  ARRAY['Name the conduct on the record; do not just sigh and continue.', 'Use s.58(1) consultation breaks aggressively when the dynamic shifts.', 'Escalate to senior officers and ensure custody record entries — PACE s.76/s.78 work begins at the station.']::text[],
  ARRAY['PACE s.76 / s.78', 'Code C sect 11/12', 'SRA PSRAS Units 1 and 6']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'co-suspect-message',
  'Client wants you to pass a note to a co-suspect',
  'Unit 1 — Ethics',
  'advanced',
  ARRAY['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.B', 'U5.AO2.C']::text[],
  'Your client folds a note in your interview pad and whispers: "Give this to Marko before his interview — make sure he says we were at the cinema until midnight." Marko is in the next consultation room with another solicitor from your firm.',
  '{"start":"n1","nodes":{"n1":{"prompt":"Your professional response is:","choices":[{"id":"a","label":"Pass the note discreetly — your client instructed you.","next":"badPass","feedback":"You would be facilitating contamination of evidence and possibly perverting the course of justice. Privilege does not cover this.","score":-3},{"id":"b","label":"Refuse, explain why (privilege does not extend to facilitating crime, conflict of interest, integrity), and document the refusal; consider whether you can continue acting if the client insists.","next":"n2","feedback":"U1.AO1.E expects you to identify and manage ethical limits and conflicts.","score":3},{"id":"c","label":"Tear up the note and continue acting as if nothing happened.","next":"mixedDestroy","feedback":"Tearing up evidence of a request itself raises questions; you should record refusal and reasons, not destroy evidence.","score":0}]},"n2":{"prompt":"Your client says \"fine, just tell Marko the same thing verbally\".","choices":[{"id":"a","label":"Accept the alternative because verbal messages are not \"documents\".","next":"badPass","feedback":"Form does not change substance; the underlying instruction is still to coordinate accounts.","score":-3},{"id":"b","label":"Decline again; consider whether continued representation is sustainable; escalate to supervisor in your firm given the parallel client.","next":"goodLine","feedback":"Right answer: the issue is not the medium, it is what is being asked. Supervisor escalation matches U1.AO1.E.","score":3}]},"goodLine":{"terminal":true,"outcome":"good","prompt":"You held the line and escalated.","summary":"Privilege protects confidential legal advice — not coordinating accounts. Conflict was managed cleanly."},"badPass":{"terminal":true,"outcome":"bad","prompt":"Information moved between suspects through you.","summary":"Likely SRA disciplinary, possible criminal exposure (perverting the course of justice). Severe Unit 1 failure."},"mixedDestroy":{"terminal":true,"outcome":"mixed","prompt":"You destroyed the note.","summary":"Destruction of the note itself can be problematic; better to refuse and record the request and your refusal."}}}'::jsonb,
  ARRAY['Privilege protects confidential legal advice; it is not a vehicle for coordination of accounts.', 'Conflicts of interest within a firm are real and must be escalated.', 'Form does not change substance — verbal messaging is the same problem as written.']::text[],
  ARRAY['SRA Standards and Regulations', 'Code C Note 6G', 'SRA PSRAS Unit 1']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'silence-pressure',
  'Officer pressuring against a no-comment strategy',
  'Unit 6 — Advising during interview',
  'intermediate',
  ARRAY['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.C', 'U6.AO2.D']::text[],
  'Disclosure is a thin MG6 with no exhibits. After consultation your client elected no comment. Forty minutes into interview the officer says "the jury are going to think you are guilty — your solicitor is letting you down".',
  '{"start":"n1","nodes":{"n1":{"prompt":"What is your intervention?","choices":[{"id":"a","label":"Say nothing — officers can persuade, the client can decide.","next":"badQuiet","feedback":"Mischaracterising the law of silence is improper; you must intervene under U6.AO2.D.","score":-2},{"id":"b","label":"Intervene: clarify on tape that adverse inferences are a contextual matter for any future Crown Court trial, not an automatic finding of guilt; ask for a break to discuss.","next":"n2","feedback":"You corrected the law in the moment without revealing privileged advice.","score":3}]},"n2":{"prompt":"In private, your client says \"maybe I should just talk\".","choices":[{"id":"a","label":"Tell them to stick with no comment because that was the plan.","next":"mixedRigid","feedback":"Strategy is the client''s; advice should be re-explained, not dictated.","score":1},{"id":"b","label":"Re-explain the analysis: disclosure adequacy, fitness, fact reliance risk, prepared statement option; let the client choose with eyes open.","next":"goodChoice","feedback":"Right balance under U5.AO2.D — informed choice, options, no dictation.","score":3}]},"goodChoice":{"terminal":true,"outcome":"good","prompt":"Your client makes an informed decision.","summary":"You corrected the officer, used a private break, and respected client autonomy. Units 5 and 6 satisfied."},"badQuiet":{"terminal":true,"outcome":"bad","prompt":"Silence interventions did not happen.","summary":"Mischaracterised inferences went uncorrected on tape; adverse inference law was misrepresented to the suspect under pressure."},"mixedRigid":{"terminal":true,"outcome":"mixed","prompt":"You held the line rigidly without reanalysis.","summary":"Strategy must be revisited when the client wavers; otherwise you are dictating, not advising."}}}'::jsonb,
  ARRAY['Adverse inference law is contextual — never a guarantee of guilt at trial.', 'Use s.58(1) consultation breaks when the client wavers under pressure.', 'Re-explain options; do not dictate strategy.']::text[],
  ARRAY['CJPOA 1994 ss.34–38', 'Code C Annex C', 'SRA PSRAS Unit 6']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'prepared-statement',
  'Force "policy" against prepared statements',
  'Unit 6 — Advising during interview',
  'intermediate',
  ARRAY['U5.AO2.D', 'U6.AO1.A']::text[],
  'You decided with your client that a prepared statement followed by no comment is the safest interview strategy. The officer in disclosure says "we don''t accept those in this force".',
  '{"start":"n1","nodes":{"n1":{"prompt":"Your response is:","choices":[{"id":"a","label":"Switch to live answers because the officer says no.","next":"badConcede","feedback":"Force \"policy\" cannot override the suspect''s established right to provide a written account.","score":-2},{"id":"b","label":"Reaffirm the strategy; place a written prepared statement on tape to control content and reduce privilege risk; brief no-comment thereafter.","next":"n2","feedback":"Correct under U6.AO1.A: a written prepared statement controls disclosure of the defence position without inviting Q&A.","score":3}]},"n2":{"prompt":"During interview the officer keeps asking specific factual questions designed to draw your client beyond the statement.","choices":[{"id":"a","label":"Let your client expand because they have the statement on tape.","next":"mixedSlip","feedback":"Expanding beyond the statement undermines the strategy; remind the client privately if needed.","score":0},{"id":"b","label":"Remind the client, without stopping the interview, that their position is on the record and they may continue with no comment.","next":"goodHold","feedback":"Permitted under U6.AO2.B as long as you do not coach answers — short reminders.","score":3}]},"goodHold":{"terminal":true,"outcome":"good","prompt":"Strategy held; defence position on the record cleanly.","summary":"Prepared statement protected the defence case while limiting privilege exposure (R v Bowden context)."},"badConcede":{"terminal":true,"outcome":"bad","prompt":"You changed strategy under pressure.","summary":"Force \"policy\" does not override your client''s rights; conceding undermines U5.AO2.D advice."},"mixedSlip":{"terminal":true,"outcome":"mixed","prompt":"Your client expanded beyond the statement and triggered Q&A risk.","summary":"Statement strategy is fragile if not reinforced; reminders without coaching are appropriate."}}}'::jsonb,
  ARRAY['Prepared statements are a recognised strategy and force "policy" cannot override them.', 'Privilege risk on opening statements (R v Bowden) is real — keep reasons for advice off the police record.', 'Reminders that the client may continue with no comment are within U6.AO2.B.']::text[],
  ARRAY['R v Bowden [1999] 1 WLR 823', 'Code C Note 12C', 'SRA PSRAS Unit 6']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'id-procedure-objections',
  'Video ID procedure with disclosure gaps',
  'Unit 8 — Identification',
  'intermediate',
  ARRAY['U1.AO5.B', 'U8.AO1.A', 'U8.AO1.B', 'U8.AO2.A']::text[],
  'Police propose a video identification procedure. The first description from the witness is "tall, white, dark hair". You have not been shown any photo-show records or the witness''s first description in writing.',
  '{"start":"n1","nodes":{"n1":{"prompt":"Before participating, what do you require?","choices":[{"id":"a","label":"Proceed — Code D is the police''s job.","next":"badProceed","feedback":"Code D 3.1 expects representatives to verify the first description and any prior visual exposure of the witness; you cannot just trust the form.","score":-2},{"id":"b","label":"Ask in writing for the first description, any photo-shows under Code D Annex E, the parade composition criteria, and a chance to make representations on similar appearance.","next":"n2","feedback":"A model U8.AO1.A / U8.AO2.A approach.","score":3}]},"n2":{"prompt":"Police accept your written representations but want the procedure to start in 30 minutes. You have unresolved concerns about composition.","choices":[{"id":"a","label":"Proceed and raise concerns at trial.","next":"mixedLate","feedback":"Concerns recorded contemporaneously are far stronger than retrospective ones.","score":1},{"id":"b","label":"Decline to proceed until composition concerns are addressed; record objections and reasons in writing; ask the inspector to authorise a pause.","next":"goodFairness","feedback":"Procedural fairness now is far more powerful than complaining at trial — this is the U8.AO2.A standard.","score":3}]},"goodFairness":{"terminal":true,"outcome":"good","prompt":"You secured a fair procedure or a recorded objection.","summary":"You forced compliance with Code D in the moment, with written representations and a contemporaneous record."},"badProceed":{"terminal":true,"outcome":"bad","prompt":"You proceeded without verifying core safeguards.","summary":"Trial-stage challenges are weakened; Unit 8 expects active station representation."},"mixedLate":{"terminal":true,"outcome":"mixed","prompt":"You proceeded but flagged concerns at trial only.","summary":"Better than nothing, but contemporaneous representation is the PSRAS expectation."}}}'::jsonb,
  ARRAY['Always demand the first description and Code D Annex E records before participating.', 'Make representations on composition in writing, before the procedure starts.', 'Contemporaneous objections are far stronger than retrospective ones.']::text[],
  ARRAY['PACE Code D 3.1', 'Code D Annex E', 'SRA PSRAS Unit 8']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'interpreter-quality',
  'Interpreter who is paraphrasing',
  'Unit 7 — Vulnerability and interpreters',
  'advanced',
  ARRAY['U7.AO1.B', 'U7.AO1.C', 'U7.AO2.B']::text[],
  'Your client speaks Tigrinya. The interpreter is summarising long police questions in two-word answers and back-translating your client''s detailed responses as "yes" or "no". You spot it because your colleague speaks some Tigrinya.',
  '{"start":"n1","nodes":{"n1":{"prompt":"In consultation, what do you do?","choices":[{"id":"a","label":"Continue and raise it later — the interpreter is a Code C resource.","next":"badContinue","feedback":"Inadequate interpretation goes to fairness now; raise it before more harm is done.","score":-2},{"id":"b","label":"Pause; explain the issue to the custody officer and request a different qualified interpreter; record concerns; do not allow interview to proceed until communication is reliable.","next":"n2","feedback":"Code C sect 13 expects interpretation that is fit for purpose; U7.AO1.B / U7.AO1.C exactly this.","score":3}]},"n2":{"prompt":"Custody insists \"we have no other interpreter at this hour\".","choices":[{"id":"a","label":"Accept and proceed because waiting is impractical.","next":"badAccept","feedback":"Practicality does not override fairness; alternatives include phone interpretation or delay.","score":-2},{"id":"b","label":"Insist on a phone interpretation service or delay the interview; document refusal if police press on.","next":"goodHold","feedback":"Right under U7.AO1.B; phone services exist 24/7 and are far better than a poor interpreter.","score":3}]},"goodHold":{"terminal":true,"outcome":"good","prompt":"A reliable interpreter is secured (live or by phone).","summary":"You protected fairness, communication, and reliability. Unit 7 standards met."},"badContinue":{"terminal":true,"outcome":"bad","prompt":"Interview proceeded with a poor interpreter.","summary":"Likely admissibility and fairness issues; an entirely avoidable U7.AO1.B failure."},"badAccept":{"terminal":true,"outcome":"bad","prompt":"Practicality won over fairness.","summary":"You let convenience override reliability of communication; U7.AO1.B failure."}}}'::jsonb,
  ARRAY['Interpreter quality is a fairness issue — raise it in real time, not later.', 'Phone interpretation services are an acceptable alternative when no qualified live interpreter is available.', 'Document refusal contemporaneously if police press on with a substandard interpreter.']::text[],
  ARRAY['Code C sect 13', 'Code C Annex M', 'SRA PSRAS Unit 7']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'charging-push',
  'CPS rushing a charge decision overnight',
  'Unit 9 — Post-interview / charging',
  'advanced',
  ARRAY['U1.AO2.D', 'U9.AO1.A', 'U9.AO2.A']::text[],
  'Interview ended at 03:40 with disclosure still incomplete. The custody officer says CPS Direct is "ready to authorise charge" for ABH on a domestic incident if you have nothing to add.',
  '{"start":"n1","nodes":{"n1":{"prompt":"You have minutes to make representations.","choices":[{"id":"a","label":"Stay silent and let the system run.","next":"badSilent","feedback":"Silence at the charge stage is a Unit 9 failure; representations matter even if brief.","score":-2},{"id":"b","label":"Make focused representations: incomplete disclosure, fitness for interview if relevant, OOC disposal options, evidential weakness, and request a written record of representations.","next":"n2","feedback":"Exactly U9.AO1.A and U9.AO2.A — short, structured, recorded.","score":3},{"id":"c","label":"Threaten judicial review of the charging decision.","next":"mixedBluster","feedback":"Bluster does not move CPS; structured reasoned representations do.","score":0}]},"n2":{"prompt":"Charge is authorised. Police want to bail with conditions.","choices":[{"id":"a","label":"Accept all conditions to get release.","next":"badAcceptAll","feedback":"Bail conditions must be necessary and proportionate; accepting all is a Unit 9 failure on bail representations.","score":-2},{"id":"b","label":"Make targeted representations against onerous conditions (residence vs no contact vs curfew); ensure your client understands consequences of breach.","next":"goodBail","feedback":"U9.AO2.B / U9.AO3.A approach.","score":3}]},"goodBail":{"terminal":true,"outcome":"good","prompt":"Charge proceeds; conditions are proportionate; client understands them.","summary":"You used the time available, made structured representations on charge and bail, and protected the client through informed advice."},"badSilent":{"terminal":true,"outcome":"bad","prompt":"No representations made; charge authorised by default.","summary":"A Unit 9 failure: representation does not stop at interview."},"mixedBluster":{"terminal":true,"outcome":"mixed","prompt":"You posted threats but no substance.","summary":"Posturing is not advocacy; structured representations are."},"badAcceptAll":{"terminal":true,"outcome":"bad","prompt":"Onerous bail conditions accepted without challenge.","summary":"You did not test necessity / proportionality; client may breach unnecessarily."}}}'::jsonb,
  ARRAY['Make structured charge representations even with minutes to spare.', 'OOC disposals and evidential weakness are legitimate Unit 9 angles.', 'Bail conditions must be tested for necessity and proportionality, not just signed.']::text[],
  ARRAY['Code for Crown Prosecutors', 'PACE s.37(7), s.38', 'SRA PSRAS Unit 9']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'rui-confusion',
  'RUI explained as "you are free"',
  'Unit 9 — Post-interview',
  'beginner',
  ARRAY['U9.AO2.B', 'U9.AO3.A']::text[],
  'Your client is released under investigation after a serious sexual offence allegation. The officer says: "Off you go, you are free." Your client believes the case is over.',
  '{"start":"n1","nodes":{"n1":{"prompt":"Outside custody, what do you explain?","choices":[{"id":"a","label":"Confirm the case is over because there are no conditions.","next":"badRelease","feedback":"RUI does not mean NFA. Charging may still follow.","score":-2},{"id":"b","label":"Explain RUI: investigations may continue, no automatic conditions but a charge decision can come later, possibly with bail conditions then; advise on contact pathways and not to discuss the allegation publicly or on social media.","next":"goodExplain","feedback":"Right under U9.AO2.B / U9.AO3.A.","score":3}]},"goodExplain":{"terminal":true,"outcome":"good","prompt":"Your client leaves with realistic expectations.","summary":"No false reassurance; client understands process and risks."},"badRelease":{"terminal":true,"outcome":"bad","prompt":"Your client believes the case is over.","summary":"False reassurance is a Unit 9 failure with serious downstream consequences (e.g. social media posts, contact with witnesses)."}}}'::jsonb,
  ARRAY['RUI is not NFA; investigation continues.', 'Advise on social media, witness contact, and document handling on release.', 'Charge can follow RUI weeks or months later.']::text[],
  ARRAY['College of Policing guidance on RUI', 'PACE s.30A context', 'SRA PSRAS Unit 9']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)
VALUES (
  'intoxicated-client',
  'Intoxicated client demanding to be interviewed now',
  'Unit 5 — Consult with client',
  'intermediate',
  ARRAY['U2.AO3', 'U5.AO1.A', 'U5.AO1.B', 'U5.AO1.C']::text[],
  'Your client smells of alcohol, says he had "a few" and demands to interview now to "get this over with". Police agree because he is "talking fine".',
  '{"start":"n1","nodes":{"n1":{"prompt":"Before any interview decision, what is your priority?","choices":[{"id":"a","label":"Defer to client wishes; he is an adult.","next":"badDefer","feedback":"Code C 12.3 fitness for interview is independent of client wishes; intoxication can corrupt reliability and consent.","score":-2},{"id":"b","label":"Build rapport, address fitness for interview (Code C 12.3), request healthcare assessment if any doubt, and explain the risks of interviewing while intoxicated even if he feels fine.","next":"n2","feedback":"Right under U5.AO1.C and U2.AO3 — trust + accurate information.","score":3}]},"n2":{"prompt":"He insists. Healthcare clears him as not requiring medical detention. He still slurs occasionally.","choices":[{"id":"a","label":"Recommend going ahead because he was cleared medically.","next":"mixedClear","feedback":"Medical clearance is one input; reliability of answers is a separate consideration.","score":1},{"id":"b","label":"Explain the analysis: fitness for interview is not the same as medical fitness; recommend a delay where possible; document any decision to proceed and reasons.","next":"goodChoose","feedback":"A correct U5.AO1.C / U5.AO2.D approach.","score":3}]},"goodChoose":{"terminal":true,"outcome":"good","prompt":"A documented decision is made with eyes open.","summary":"Trust is built, fitness is addressed independently of medical clearance, and decision is informed."},"badDefer":{"terminal":true,"outcome":"bad","prompt":"Interview proceeds purely on client wish.","summary":"Reliability and consent risks; PSRAS Unit 5 expects more than agreement."},"mixedClear":{"terminal":true,"outcome":"mixed","prompt":"You leaned on medical clearance alone.","summary":"Insufficient — fitness for interview is broader than medical detention thresholds."}}}'::jsonb,
  ARRAY['Fitness for interview (Code C 12.3) is wider than medical fitness for detention.', 'Trust-building is a Unit 5 expectation, not a soft skill.', 'Document decisions to proceed when client insists despite advice.']::text[],
  ARRAY['Code C 12.3', 'Code C sect 9', 'SRA PSRAS Unit 5']::text[],
  'approved'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  difficulty = EXCLUDED.difficulty,
  syllabus_refs = EXCLUDED.syllabus_refs,
  setup = EXCLUDED.setup,
  branches = EXCLUDED.branches,
  learning_points = EXCLUDED.learning_points,
  source_refs = EXCLUDED.source_refs,
  status = EXCLUDED.status,
  updated_at = now();

-- VERIFICATION QUERIES
-- =====================================================

-- Run these after applying to verify:

SELECT COUNT(*) as total_questions FROM public.questions WHERE status = 'approved';
SELECT COUNT(*) as total_modules FROM public.content_modules;
SELECT category, COUNT(*) as count FROM public.questions WHERE status = 'approved' GROUP BY category ORDER BY count DESC;

-- =====================================================
-- END OF COMBINED FILE
-- =====================================================
