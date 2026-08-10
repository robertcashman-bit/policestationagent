/**
 * PSR Train - branching CIT scenarios.
 * The product approximates the *content* of the SRA PSRAS Critical Incidents Test
 * (live oral assessment). It does NOT replicate the live assessment — these are
 * branching MCQ-style decision trees with feedback, used as study aids only.
 *
 * Schema for each scenario:
 *   slug:          stable URL slug (used in /critical-incidents/[slug])
 *   title:         display title
 *   category:      bucketed display category
 *   difficulty:    'beginner' | 'intermediate' | 'advanced'
 *   syllabus_refs: array of U<unit>.AO<outcome>.<criterion> tags
 *   setup:         paragraph the learner reads before the first decision
 *   branches:      { start, nodes: { [id]: node } }
 *   learning_points: bulleted recap, shown at the end
 *   source_refs:   sources to cite at end of scenario
 *
 * Node shape:
 *   prompt:   text shown for this decision point (or terminal summary)
 *   choices?: array of { id, label, next, feedback, score }
 *   terminal? true on outcome nodes
 *   outcome?  'good' | 'mixed' | 'bad' (terminal only)
 *   summary?  closing summary text (terminal only)
 */

/** @typedef {{ id: string, label: string, next: string, feedback: string, score: number }} CitChoice */
/** @typedef {{ prompt: string, choices?: CitChoice[], terminal?: boolean, outcome?: 'good'|'mixed'|'bad', summary?: string }} CitNode */
/** @typedef {{
 *   slug: string, title: string, category: string,
 *   difficulty: 'beginner'|'intermediate'|'advanced',
 *   syllabus_refs: string[], setup: string,
 *   branches: { start: string, nodes: Record<string, CitNode> },
 *   learning_points: string[], source_refs: string[],
 * }} CitScenario */

/** @returns {CitScenario[]} */
export function citScenarios() {
  return [
    {
      slug: 'dscc-third-party',
      title: 'DSCC call from a third party',
      category: 'Unit 3 — Request to attend',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO1.A', 'U3.AO1.A', 'U3.AO1.B', 'U3.AO1.D', 'U3.AO2.A'],
      setup:
        'It is 02:14. The DSCC operator says "your firm is on the rota and a Mrs Khan called us — her son Ali is in custody at Walthamstow for s.18 GBH". They give you a station phone, no custody number, no DSCC reference, and ask you to confirm acceptance.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt:
              'Mrs Khan never spoke to her son. What do you record and confirm before treating this as an instruction to act?',
            choices: [
              {
                id: 'a',
                label: 'Accept and head straight to the station — speed is what matters.',
                next: 'badRecord',
                feedback:
                  'Going without authority risks acting without instruction; PSRAS expects authority to act and a recorded chain of how you got involved.',
                score: -1,
              },
              {
                id: 'b',
                label:
                  'Take the DSCC reference, time of notification, time of acceptance, the third-party relationship, and ask DSCC to obtain custody-officer confirmation that the suspect wants you.',
                next: 'n2',
                feedback:
                  'Code C Annex B para 4 expects confirmation that the suspect wants the named solicitor; you must record initial information completely.',
                score: 3,
              },
              {
                id: 'c',
                label:
                  'Refuse the case unless Mrs Khan calls back with the custody reference herself.',
                next: 'badRecord',
                feedback:
                  'Third-party calls are common; the answer is verification through DSCC/custody, not refusal.',
                score: -1,
              },
            ],
          },
          n2: {
            prompt:
              'You are now confirmed as Ali\'s representative. The custody officer says interview is "in 20 minutes". You are 50 minutes away.',
            choices: [
              {
                id: 'a',
                label:
                  'Authorise the interview to proceed without you and ask for a transcript afterwards.',
                next: 'badRush',
                feedback:
                  'You cannot authorise an interview to proceed without legal advice in your client\'s name; this fails U1.AO1.A and U6.AO2.A duties.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Tell custody you will attend; ask them to delay interview until you arrive and provide pre-arrival telephone advice in private to the suspect.',
                next: 'goodArrive',
                feedback:
                  'In-person attendance is mandatory absent exceptional circumstances; pre-arrival phone advice (right to silence, do not discuss the case with anyone) is part of U3.AO3.',
                score: 3,
              },
              {
                id: 'c',
                label:
                  'Refuse to attend because the case is indictable-only — only a duty solicitor can take it.',
                next: 'badRush',
                feedback:
                  'The probationary indictable-only restriction applies to JIIP/probationary reps; otherwise an accredited rep proceeds. Refusing is wrong without that fact.',
                score: -1,
              },
            ],
          },
          goodArrive: {
            terminal: true,
            outcome: 'good',
            prompt: 'You arrive at 03:08 with a complete record of how the case began.',
            summary:
              'You captured the DSCC reference, time of notification, time of acceptance, third-party relationship, custody confirmation, and gave appropriate pre-arrival advice. Interview was held until you arrived for a private consultation. PSRAS Unit 3 standards met.',
          },
          badRush: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Interview proceeds while you are still on the M11.',
            summary:
              'Allowing interview without your attendance, or refusing on a wrong understanding of probationary restrictions, fails Unit 3 standards on attendance and authority to act.',
          },
          badRecord: {
            terminal: true,
            outcome: 'bad',
            prompt: 'You arrive having recorded almost nothing about the request.',
            summary:
              'No DSCC reference and no third-party verification means you cannot evidence authority to act or initial information collection. U3.AO1.D recording standards failed.',
          },
        },
      },
      learning_points: [
        'Always record DSCC reference, time of notification, time of acceptance, and third-party relationship.',
        'A third-party call is a starting point; confirmation must come via DSCC/custody that the suspect wants you (Code C Annex B para 4).',
        'In-person attendance is mandatory absent exceptional circumstances; pre-arrival telephone advice is U3.AO3.',
      ],
      source_refs: ['Code C Annex B para 4', 'PACE s.58', 'SRA PSRAS Unit 3'],
    },
    {
      slug: 'immigration-status-disclosure',
      title: 'Immigration status surfaces in consultation',
      category: 'Unit 1 — Underpinning ethics',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO1.B', 'U1.AO1.E', 'U5.AO2.C'],
      setup:
        'Mid-consultation your client mentions, almost casually, that he overstayed a visa five years ago. You are advising on a simple shoplifting allegation. Police are unaware of the immigration position.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'What do you do with this information?',
            choices: [
              {
                id: 'a',
                label: 'Volunteer the immigration history to the custody officer.',
                next: 'badBreach',
                feedback:
                  'Volunteering privileged information without instructions breaches confidentiality; immigration matters can flow from a station disclosure.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Explain the privileged status of what your client tells you, the practical risk of immigration consequences (e.g. on charging or bail), and ask for instructions on whether to mention it.',
                next: 'n2',
                feedback:
                  'You must address Code C Note for Guidance 6D (immigration implications) and SRA confidentiality without making decisions for the client.',
                score: 3,
              },
              {
                id: 'c',
                label:
                  'Ignore it — immigration is irrelevant to a shoplifting interview.',
                next: 'badIgnore',
                feedback:
                  'Immigration status can affect bail, charging routes, identification document requests, and Schedule 7-style scrutiny; ignoring it fails U1.AO1.B.',
                score: -2,
              },
            ],
          },
          n2: {
            prompt:
              'Your client wants to plead guilty quickly to "get out of the station fastest". What is the right station response?',
            choices: [
              {
                id: 'a',
                label: 'Encourage the plea to minimise time in custody.',
                next: 'badCoerced',
                feedback:
                  'Quick admissions to escape custody are not informed decisions. Especially with possible immigration consequences, this is a serious U1.AO1.E breach.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Pause; explain that admissions or charge can have immigration consequences (potentially including referral to immigration enforcement), and that bail decisions and identity questions could surface immigration status separately. Take instructions on disclosure to the police.',
                next: 'goodEthics',
                feedback:
                  'This is exactly the U1.AO1.B / U1.AO1.E expectation: information, ethics, and informed decisions take priority over speed.',
                score: 3,
              },
            ],
          },
          goodEthics: {
            terminal: true,
            outcome: 'good',
            prompt: 'Your client makes an informed decision about how to proceed.',
            summary:
              'You navigated privilege, immigration awareness, and informed consent without making decisions for the client. PSRAS U1.AO1.B and U1.AO1.E standards met.',
          },
          badBreach: {
            terminal: true,
            outcome: 'bad',
            prompt: 'You volunteered privileged information.',
            summary:
              'You may face an SRA conduct issue and your client now faces parallel immigration scrutiny. Confidentiality and privilege are the absolute defaults.',
          },
          badIgnore: {
            terminal: true,
            outcome: 'bad',
            prompt: 'You proceeded without addressing immigration.',
            summary:
              'Failure to recognise immigration as a station issue is a recognised PSRAS gap; advice was incomplete.',
          },
          badCoerced: {
            terminal: true,
            outcome: 'bad',
            prompt: 'A plea was extracted to escape custody.',
            summary:
              'Speed-driven admissions without informed advice expose your client to significant collateral consequences. U1.AO1.E ethics breach.',
          },
        },
      },
      learning_points: [
        'Immigration status can affect bail, charging routes, and identity inquiries — recognise it at the station.',
        'Privilege is the default; do not volunteer client information without instructions.',
        'Speed of release is never a substitute for informed advice.',
      ],
      source_refs: ['Code C Note for Guidance 6D', 'SRA Principles', 'SRA PSRAS Unit 1'],
    },
    {
      slug: 'disengaged-aa',
      title: 'AA who keeps answering for the juvenile',
      category: 'Unit 7 — Vulnerability',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO1.C', 'U7.AO1.A', 'U7.AO1.B', 'U7.AO2.A', 'U7.AO2.B'],
      setup:
        'Your 15-year-old client has ADHD and a diagnosed learning difficulty. The appropriate adult is his uncle; the uncle keeps interjecting, completing answers, and at one point tells your client "tell them what they want, then we go home".',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'You are still in the consultation room before interview.',
            choices: [
              {
                id: 'a',
                label:
                  'Let the uncle continue — having any AA is what matters legally.',
                next: 'badProceed',
                feedback:
                  'Code C 1.7 and Note 1B require the AA to be capable of properly performing the role. An AA who substitutes the suspect\'s voice does not satisfy the role.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Pause; speak to the AA privately about role expectations (support and help communication, not answer); also reassess fitness for interview given the learning difficulty.',
                next: 'n2',
                feedback:
                  'This addresses U7.AO2.A (AA understands role) and U5.AO1.C (fitness for interview) at once.',
                score: 3,
              },
              {
                id: 'c',
                label: 'Ask the police to remove the AA and continue without one.',
                next: 'badNoAa',
                feedback:
                  'A juvenile is entitled to an AA. Removing without replacement is a breach of Code C; this is an escalation route, not a solution.',
                score: -2,
              },
            ],
          },
          n2: {
            prompt:
              'The uncle now wants to "pop out for a smoke during interview" because he is bored.',
            choices: [
              {
                id: 'a',
                label:
                  'Permit it — interview can carry on if the AA returns later.',
                next: 'badAbsence',
                feedback:
                  'Interview must not continue without the AA present; Code C 11.15 expectations protect juveniles. This breaches Unit 7.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Insist any break in AA presence pauses the interview; if the AA refuses, request a substitute (e.g. via youth offending service / standby AA).',
                next: 'goodProtect',
                feedback:
                  'You enforced AA presence and triggered the substitute pathway, both within U7.AO2.A and Code C expectations.',
                score: 3,
              },
            ],
          },
          goodProtect: {
            terminal: true,
            outcome: 'good',
            prompt: 'Interview proceeds with an effective AA.',
            summary:
              'You safeguarded role boundaries (AA supports, does not substitute), fitness, and continuity of presence. Unit 7 standards met.',
          },
          badProceed: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Interview proceeds with the AA answering for the juvenile.',
            summary:
              'Likely admissibility challenge under PACE s.78 and certain Unit 7 failures.',
          },
          badNoAa: {
            terminal: true,
            outcome: 'bad',
            prompt: 'The interview proceeds with no AA at all.',
            summary:
              'Serious Code C breach; you should have escalated to find a substitute, not removed the safeguard.',
          },
          badAbsence: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Interview continues during the AA\'s absence.',
            summary:
              'Continuing interviewing in AA absence breaches Code C 11.15 expectations.',
          },
        },
      },
      learning_points: [
        'The AA must be capable of supporting the suspect; substitution of voice undermines the role.',
        'Interview must not continue if the AA leaves — pause and seek a substitute.',
        'Vulnerability is layered with fitness for interview (U5.AO1.C) and the AA framework (U7.AO2.A).',
      ],
      source_refs: ['Code C 1.7 and Note 1B', 'Code C 11.15', 'SRA PSRAS Unit 7'],
    },
    {
      slug: 'oppressive-interviewer',
      title: 'Officer using oppression in interview',
      category: 'Unit 6 — Advising during interview',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO1.D', 'U1.AO4.E', 'U1.AO5.C', 'U6.AO1.B', 'U6.AO2.D', 'U5.AO1.D'],
      setup:
        'Mid-interview an officer raises his voice, repeats the question with increasing aggression, mocks your client, and at one point says "your kid will end up in care if you keep this up". Your client looks frightened. You have already cautioned the officer once on tone.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'What is your immediate intervention?',
            choices: [
              {
                id: 'a',
                label: 'Say nothing and let your client decide whether to keep answering.',
                next: 'badPassive',
                feedback:
                  'Passivity in the face of oppression breaches U6.AO2.D and risks admissibility under PACE s.76 / s.78.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Intervene on tape: identify the conduct, ask the officer to desist, request a break for private advice, and put the time and conduct on the record. If conduct continues, consider stopping the interview.',
                next: 'n2',
                feedback:
                  'A textbook U6.AO2.D intervention: name the conduct, on the record, and use s.58(1) breaks.',
                score: 3,
              },
              {
                id: 'c',
                label:
                  'Tell your client, on tape, that the officer is "out of order".',
                next: 'mixedTone',
                feedback:
                  'Slightly off — your role is to enforce fairness, not editorialise on tape; better to act formally and request a break.',
                score: 1,
              },
            ],
          },
          n2: {
            prompt:
              'In the consultation break, your client wants to keep going but is shaking. You suspect oppression has affected fitness.',
            choices: [
              {
                id: 'a',
                label:
                  'Resume interview as planned because the client is willing.',
                next: 'badResume',
                feedback:
                  'Willingness post-oppression does not equal fitness; Code C and s.76 admissibility risks remain.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Discuss strategy options (no comment, prepared statement, request a different officer, or healthcare assessment); raise representations to the inspector / superintendent and ensure custody record entries.',
                next: 'goodEscalate',
                feedback:
                  'Exactly the U1.AO1.D / U1.AO5.C breach response: senior officer, complaint pathway, contemporaneous record, possible exclusion later.',
                score: 3,
              },
            ],
          },
          goodEscalate: {
            terminal: true,
            outcome: 'good',
            prompt: 'You secure a different interviewing officer and a clear record.',
            summary:
              'You intervened, paused, escalated, and protected admissibility. Units 1 and 6 satisfied.',
          },
          badPassive: {
            terminal: true,
            outcome: 'bad',
            prompt: 'You did not intervene; the officer\'s conduct went unchallenged on tape.',
            summary:
              'Passivity in the face of oppression is a Unit 6 / Unit 1 failure with admissibility consequences.',
          },
          mixedTone: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'You editorialised but did not formalise the intervention.',
            summary:
              'Not enough — get the record right, ask for a break, and escalate; criticism on tape alone is weak protection.',
          },
          badResume: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Interview resumed without addressing oppression.',
            summary:
              'A future court may exclude under s.76/s.78; you accepted shaky willingness as fitness.',
          },
        },
      },
      learning_points: [
        'Name the conduct on the record; do not just sigh and continue.',
        'Use s.58(1) consultation breaks aggressively when the dynamic shifts.',
        'Escalate to senior officers and ensure custody record entries — PACE s.76/s.78 work begins at the station.',
      ],
      source_refs: ['PACE s.76 / s.78', 'Code C sect 11/12', 'SRA PSRAS Units 1 and 6'],
    },
    {
      slug: 'co-suspect-message',
      title: 'Client wants you to pass a note to a co-suspect',
      category: 'Unit 1 — Ethics',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO1.E', 'U1.AO4.D', 'U5.AO2.B', 'U5.AO2.C'],
      setup:
        'Your client folds a note in your interview pad and whispers: "Give this to Marko before his interview — make sure he says we were at the cinema until midnight." Marko is in the next consultation room with another solicitor from your firm.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'Your professional response is:',
            choices: [
              {
                id: 'a',
                label: 'Pass the note discreetly — your client instructed you.',
                next: 'badPass',
                feedback:
                  'You would be facilitating contamination of evidence and possibly perverting the course of justice. Privilege does not cover this.',
                score: -3,
              },
              {
                id: 'b',
                label:
                  'Refuse, explain why (privilege does not extend to facilitating crime, conflict of interest, integrity), and document the refusal; consider whether you can continue acting if the client insists.',
                next: 'n2',
                feedback:
                  'U1.AO1.E expects you to identify and manage ethical limits and conflicts.',
                score: 3,
              },
              {
                id: 'c',
                label: 'Tear up the note and continue acting as if nothing happened.',
                next: 'mixedDestroy',
                feedback:
                  'Tearing up evidence of a request itself raises questions; you should record refusal and reasons, not destroy evidence.',
                score: 0,
              },
            ],
          },
          n2: {
            prompt: 'Your client says "fine, just tell Marko the same thing verbally".',
            choices: [
              {
                id: 'a',
                label:
                  'Accept the alternative because verbal messages are not "documents".',
                next: 'badPass',
                feedback:
                  'Form does not change substance; the underlying instruction is still to coordinate accounts.',
                score: -3,
              },
              {
                id: 'b',
                label:
                  'Decline again; consider whether continued representation is sustainable; escalate to supervisor in your firm given the parallel client.',
                next: 'goodLine',
                feedback:
                  'Right answer: the issue is not the medium, it is what is being asked. Supervisor escalation matches U1.AO1.E.',
                score: 3,
              },
            ],
          },
          goodLine: {
            terminal: true,
            outcome: 'good',
            prompt: 'You held the line and escalated.',
            summary:
              'Privilege protects confidential legal advice — not coordinating accounts. Conflict was managed cleanly.',
          },
          badPass: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Information moved between suspects through you.',
            summary:
              'Likely SRA disciplinary, possible criminal exposure (perverting the course of justice). Severe Unit 1 failure.',
          },
          mixedDestroy: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'You destroyed the note.',
            summary:
              'Destruction of the note itself can be problematic; better to refuse and record the request and your refusal.',
          },
        },
      },
      learning_points: [
        'Privilege protects confidential legal advice; it is not a vehicle for coordination of accounts.',
        'Conflicts of interest within a firm are real and must be escalated.',
        'Form does not change substance — verbal messaging is the same problem as written.',
      ],
      source_refs: ['SRA Standards and Regulations', 'Code C Note 6G', 'SRA PSRAS Unit 1'],
    },
    {
      slug: 'silence-pressure',
      title: 'Officer pressuring against a no-comment strategy',
      category: 'Unit 6 — Advising during interview',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO4.C', 'U5.AO2.D', 'U6.AO2.C', 'U6.AO2.D'],
      setup:
        'Disclosure is a thin MG6 with no exhibits. After consultation your client elected no comment. Forty minutes into interview the officer says "the jury are going to think you are guilty — your solicitor is letting you down".',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'What is your intervention?',
            choices: [
              {
                id: 'a',
                label: 'Say nothing — officers can persuade, the client can decide.',
                next: 'badQuiet',
                feedback:
                  'Mischaracterising the law of silence is improper; you must intervene under U6.AO2.D.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Intervene: clarify on tape that adverse inferences are a contextual matter for any future Crown Court trial, not an automatic finding of guilt; ask for a break to discuss.',
                next: 'n2',
                feedback:
                  'You corrected the law in the moment without revealing privileged advice.',
                score: 3,
              },
            ],
          },
          n2: {
            prompt: 'In private, your client says "maybe I should just talk".',
            choices: [
              {
                id: 'a',
                label:
                  'Tell them to stick with no comment because that was the plan.',
                next: 'mixedRigid',
                feedback:
                  'Strategy is the client\'s; advice should be re-explained, not dictated.',
                score: 1,
              },
              {
                id: 'b',
                label:
                  'Re-explain the analysis: disclosure adequacy, fitness, fact reliance risk, prepared statement option; let the client choose with eyes open.',
                next: 'goodChoice',
                feedback:
                  'Right balance under U5.AO2.D — informed choice, options, no dictation.',
                score: 3,
              },
            ],
          },
          goodChoice: {
            terminal: true,
            outcome: 'good',
            prompt: 'Your client makes an informed decision.',
            summary:
              'You corrected the officer, used a private break, and respected client autonomy. Units 5 and 6 satisfied.',
          },
          badQuiet: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Silence interventions did not happen.',
            summary:
              'Mischaracterised inferences went uncorrected on tape; adverse inference law was misrepresented to the suspect under pressure.',
          },
          mixedRigid: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'You held the line rigidly without reanalysis.',
            summary:
              'Strategy must be revisited when the client wavers; otherwise you are dictating, not advising.',
          },
        },
      },
      learning_points: [
        'Adverse inference law is contextual — never a guarantee of guilt at trial.',
        'Use s.58(1) consultation breaks when the client wavers under pressure.',
        'Re-explain options; do not dictate strategy.',
      ],
      source_refs: ['CJPOA 1994 ss.34–38', 'Code C Annex C', 'SRA PSRAS Unit 6'],
    },
    {
      slug: 'prepared-statement',
      title: 'Force "policy" against prepared statements',
      category: 'Unit 6 — Advising during interview',
      difficulty: 'intermediate',
      syllabus_refs: ['U5.AO2.D', 'U6.AO1.A'],
      setup:
        'You decided with your client that a prepared statement followed by no comment is the safest interview strategy. The officer in disclosure says "we don\'t accept those in this force".',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'Your response is:',
            choices: [
              {
                id: 'a',
                label: 'Switch to live answers because the officer says no.',
                next: 'badConcede',
                feedback:
                  'Force "policy" cannot override the suspect\'s established right to provide a written account.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Reaffirm the strategy; place a written prepared statement on tape to control content and reduce privilege risk; brief no-comment thereafter.',
                next: 'n2',
                feedback:
                  'Correct under U6.AO1.A: a written prepared statement controls disclosure of the defence position without inviting Q&A.',
                score: 3,
              },
            ],
          },
          n2: {
            prompt:
              'During interview the officer keeps asking specific factual questions designed to draw your client beyond the statement.',
            choices: [
              {
                id: 'a',
                label: 'Let your client expand because they have the statement on tape.',
                next: 'mixedSlip',
                feedback:
                  'Expanding beyond the statement undermines the strategy; remind the client privately if needed.',
                score: 0,
              },
              {
                id: 'b',
                label:
                  'Remind the client, without stopping the interview, that their position is on the record and they may continue with no comment.',
                next: 'goodHold',
                feedback:
                  'Permitted under U6.AO2.B as long as you do not coach answers — short reminders.',
                score: 3,
              },
            ],
          },
          goodHold: {
            terminal: true,
            outcome: 'good',
            prompt: 'Strategy held; defence position on the record cleanly.',
            summary:
              'Prepared statement protected the defence case while limiting privilege exposure (R v Bowden context).',
          },
          badConcede: {
            terminal: true,
            outcome: 'bad',
            prompt: 'You changed strategy under pressure.',
            summary:
              'Force "policy" does not override your client\'s rights; conceding undermines U5.AO2.D advice.',
          },
          mixedSlip: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'Your client expanded beyond the statement and triggered Q&A risk.',
            summary:
              'Statement strategy is fragile if not reinforced; reminders without coaching are appropriate.',
          },
        },
      },
      learning_points: [
        'Prepared statements are a recognised strategy and force "policy" cannot override them.',
        'Privilege risk on opening statements (R v Bowden) is real — keep reasons for advice off the police record.',
        'Reminders that the client may continue with no comment are within U6.AO2.B.',
      ],
      source_refs: ['R v Bowden [1999] 1 WLR 823', 'Code C Note 12C', 'SRA PSRAS Unit 6'],
    },
    {
      slug: 'id-procedure-objections',
      title: 'Video ID procedure with disclosure gaps',
      category: 'Unit 8 — Identification',
      difficulty: 'intermediate',
      syllabus_refs: ['U1.AO5.B', 'U8.AO1.A', 'U8.AO1.B', 'U8.AO2.A'],
      setup:
        'Police propose a video identification procedure. The first description from the witness is "tall, white, dark hair". You have not been shown any photo-show records or the witness\'s first description in writing.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'Before participating, what do you require?',
            choices: [
              {
                id: 'a',
                label: 'Proceed — Code D is the police\'s job.',
                next: 'badProceed',
                feedback:
                  'Code D 3.1 expects representatives to verify the first description and any prior visual exposure of the witness; you cannot just trust the form.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Ask in writing for the first description, any photo-shows under Code D Annex E, the parade composition criteria, and a chance to make representations on similar appearance.',
                next: 'n2',
                feedback:
                  'A model U8.AO1.A / U8.AO2.A approach.',
                score: 3,
              },
            ],
          },
          n2: {
            prompt:
              'Police accept your written representations but want the procedure to start in 30 minutes. You have unresolved concerns about composition.',
            choices: [
              {
                id: 'a',
                label: 'Proceed and raise concerns at trial.',
                next: 'mixedLate',
                feedback:
                  'Concerns recorded contemporaneously are far stronger than retrospective ones.',
                score: 1,
              },
              {
                id: 'b',
                label:
                  'Decline to proceed until composition concerns are addressed; record objections and reasons in writing; ask the inspector to authorise a pause.',
                next: 'goodFairness',
                feedback:
                  'Procedural fairness now is far more powerful than complaining at trial — this is the U8.AO2.A standard.',
                score: 3,
              },
            ],
          },
          goodFairness: {
            terminal: true,
            outcome: 'good',
            prompt: 'You secured a fair procedure or a recorded objection.',
            summary:
              'You forced compliance with Code D in the moment, with written representations and a contemporaneous record.',
          },
          badProceed: {
            terminal: true,
            outcome: 'bad',
            prompt: 'You proceeded without verifying core safeguards.',
            summary:
              'Trial-stage challenges are weakened; Unit 8 expects active station representation.',
          },
          mixedLate: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'You proceeded but flagged concerns at trial only.',
            summary:
              'Better than nothing, but contemporaneous representation is the PSRAS expectation.',
          },
        },
      },
      learning_points: [
        'Always demand the first description and Code D Annex E records before participating.',
        'Make representations on composition in writing, before the procedure starts.',
        'Contemporaneous objections are far stronger than retrospective ones.',
      ],
      source_refs: ['PACE Code D 3.1', 'Code D Annex E', 'SRA PSRAS Unit 8'],
    },
    {
      slug: 'interpreter-quality',
      title: 'Interpreter who is paraphrasing',
      category: 'Unit 7 — Vulnerability and interpreters',
      difficulty: 'advanced',
      syllabus_refs: ['U7.AO1.B', 'U7.AO1.C', 'U7.AO2.B'],
      setup:
        'Your client speaks Tigrinya. The interpreter is summarising long police questions in two-word answers and back-translating your client\'s detailed responses as "yes" or "no". You spot it because your colleague speaks some Tigrinya.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'In consultation, what do you do?',
            choices: [
              {
                id: 'a',
                label: 'Continue and raise it later — the interpreter is a Code C resource.',
                next: 'badContinue',
                feedback:
                  'Inadequate interpretation goes to fairness now; raise it before more harm is done.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Pause; explain the issue to the custody officer and request a different qualified interpreter; record concerns; do not allow interview to proceed until communication is reliable.',
                next: 'n2',
                feedback:
                  'Code C sect 13 expects interpretation that is fit for purpose; U7.AO1.B / U7.AO1.C exactly this.',
                score: 3,
              },
            ],
          },
          n2: {
            prompt:
              'Custody insists "we have no other interpreter at this hour".',
            choices: [
              {
                id: 'a',
                label: 'Accept and proceed because waiting is impractical.',
                next: 'badAccept',
                feedback:
                  'Practicality does not override fairness; alternatives include phone interpretation or delay.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Insist on a phone interpretation service or delay the interview; document refusal if police press on.',
                next: 'goodHold',
                feedback:
                  'Right under U7.AO1.B; phone services exist 24/7 and are far better than a poor interpreter.',
                score: 3,
              },
            ],
          },
          goodHold: {
            terminal: true,
            outcome: 'good',
            prompt: 'A reliable interpreter is secured (live or by phone).',
            summary:
              'You protected fairness, communication, and reliability. Unit 7 standards met.',
          },
          badContinue: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Interview proceeded with a poor interpreter.',
            summary:
              'Likely admissibility and fairness issues; an entirely avoidable U7.AO1.B failure.',
          },
          badAccept: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Practicality won over fairness.',
            summary:
              'You let convenience override reliability of communication; U7.AO1.B failure.',
          },
        },
      },
      learning_points: [
        'Interpreter quality is a fairness issue — raise it in real time, not later.',
        'Phone interpretation services are an acceptable alternative when no qualified live interpreter is available.',
        'Document refusal contemporaneously if police press on with a substandard interpreter.',
      ],
      source_refs: ['Code C sect 13', 'Code C Annex M', 'SRA PSRAS Unit 7'],
    },
    {
      slug: 'charging-push',
      title: 'CPS rushing a charge decision overnight',
      category: 'Unit 9 — Post-interview / charging',
      difficulty: 'advanced',
      syllabus_refs: ['U1.AO2.D', 'U9.AO1.A', 'U9.AO2.A'],
      setup:
        'Interview ended at 03:40 with disclosure still incomplete. The custody officer says CPS Direct is "ready to authorise charge" for ABH on a domestic incident if you have nothing to add.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'You have minutes to make representations.',
            choices: [
              {
                id: 'a',
                label: 'Stay silent and let the system run.',
                next: 'badSilent',
                feedback:
                  'Silence at the charge stage is a Unit 9 failure; representations matter even if brief.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Make focused representations: incomplete disclosure, fitness for interview if relevant, OOC disposal options, evidential weakness, and request a written record of representations.',
                next: 'n2',
                feedback:
                  'Exactly U9.AO1.A and U9.AO2.A — short, structured, recorded.',
                score: 3,
              },
              {
                id: 'c',
                label: 'Threaten judicial review of the charging decision.',
                next: 'mixedBluster',
                feedback:
                  'Bluster does not move CPS; structured reasoned representations do.',
                score: 0,
              },
            ],
          },
          n2: {
            prompt: 'Charge is authorised. Police want to bail with conditions.',
            choices: [
              {
                id: 'a',
                label: 'Accept all conditions to get release.',
                next: 'badAcceptAll',
                feedback:
                  'Bail conditions must be necessary and proportionate; accepting all is a Unit 9 failure on bail representations.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Make targeted representations against onerous conditions (residence vs no contact vs curfew); ensure your client understands consequences of breach.',
                next: 'goodBail',
                feedback:
                  'U9.AO2.B / U9.AO3.A approach.',
                score: 3,
              },
            ],
          },
          goodBail: {
            terminal: true,
            outcome: 'good',
            prompt: 'Charge proceeds; conditions are proportionate; client understands them.',
            summary:
              'You used the time available, made structured representations on charge and bail, and protected the client through informed advice.',
          },
          badSilent: {
            terminal: true,
            outcome: 'bad',
            prompt: 'No representations made; charge authorised by default.',
            summary:
              'A Unit 9 failure: representation does not stop at interview.',
          },
          mixedBluster: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'You posted threats but no substance.',
            summary:
              'Posturing is not advocacy; structured representations are.',
          },
          badAcceptAll: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Onerous bail conditions accepted without challenge.',
            summary:
              'You did not test necessity / proportionality; client may breach unnecessarily.',
          },
        },
      },
      learning_points: [
        'Make structured charge representations even with minutes to spare.',
        'OOC disposals and evidential weakness are legitimate Unit 9 angles.',
        'Bail conditions must be tested for necessity and proportionality, not just signed.',
      ],
      source_refs: ['Code for Crown Prosecutors', 'PACE s.37(7), s.38', 'SRA PSRAS Unit 9'],
    },
    {
      slug: 'rui-confusion',
      title: 'RUI explained as "you are free"',
      category: 'Unit 9 — Post-interview',
      difficulty: 'beginner',
      syllabus_refs: ['U9.AO2.B', 'U9.AO3.A'],
      setup:
        'Your client is released under investigation after a serious sexual offence allegation. The officer says: "Off you go, you are free." Your client believes the case is over.',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'Outside custody, what do you explain?',
            choices: [
              {
                id: 'a',
                label: 'Confirm the case is over because there are no conditions.',
                next: 'badRelease',
                feedback:
                  'RUI does not mean NFA. Charging may still follow.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Explain RUI: investigations may continue, no automatic conditions but a charge decision can come later, possibly with bail conditions then; advise on contact pathways and not to discuss the allegation publicly or on social media.',
                next: 'goodExplain',
                feedback:
                  'Right under U9.AO2.B / U9.AO3.A.',
                score: 3,
              },
            ],
          },
          goodExplain: {
            terminal: true,
            outcome: 'good',
            prompt: 'Your client leaves with realistic expectations.',
            summary:
              'No false reassurance; client understands process and risks.',
          },
          badRelease: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Your client believes the case is over.',
            summary:
              'False reassurance is a Unit 9 failure with serious downstream consequences (e.g. social media posts, contact with witnesses).',
          },
        },
      },
      learning_points: [
        'RUI is not NFA; investigation continues.',
        'Advise on social media, witness contact, and document handling on release.',
        'Charge can follow RUI weeks or months later.',
      ],
      source_refs: ['College of Policing guidance on RUI', 'PACE s.30A context', 'SRA PSRAS Unit 9'],
    },
    {
      slug: 'intoxicated-client',
      title: 'Intoxicated client demanding to be interviewed now',
      category: 'Unit 5 — Consult with client',
      difficulty: 'intermediate',
      syllabus_refs: ['U2.AO3', 'U5.AO1.A', 'U5.AO1.B', 'U5.AO1.C'],
      setup:
        'Your client smells of alcohol, says he had "a few" and demands to interview now to "get this over with". Police agree because he is "talking fine".',
      branches: {
        start: 'n1',
        nodes: {
          n1: {
            prompt: 'Before any interview decision, what is your priority?',
            choices: [
              {
                id: 'a',
                label: 'Defer to client wishes; he is an adult.',
                next: 'badDefer',
                feedback:
                  'Code C 12.3 fitness for interview is independent of client wishes; intoxication can corrupt reliability and consent.',
                score: -2,
              },
              {
                id: 'b',
                label:
                  'Build rapport, address fitness for interview (Code C 12.3), request healthcare assessment if any doubt, and explain the risks of interviewing while intoxicated even if he feels fine.',
                next: 'n2',
                feedback:
                  'Right under U5.AO1.C and U2.AO3 — trust + accurate information.',
                score: 3,
              },
            ],
          },
          n2: {
            prompt:
              'He insists. Healthcare clears him as not requiring medical detention. He still slurs occasionally.',
            choices: [
              {
                id: 'a',
                label: 'Recommend going ahead because he was cleared medically.',
                next: 'mixedClear',
                feedback:
                  'Medical clearance is one input; reliability of answers is a separate consideration.',
                score: 1,
              },
              {
                id: 'b',
                label:
                  'Explain the analysis: fitness for interview is not the same as medical fitness; recommend a delay where possible; document any decision to proceed and reasons.',
                next: 'goodChoose',
                feedback:
                  'A correct U5.AO1.C / U5.AO2.D approach.',
                score: 3,
              },
            ],
          },
          goodChoose: {
            terminal: true,
            outcome: 'good',
            prompt: 'A documented decision is made with eyes open.',
            summary:
              'Trust is built, fitness is addressed independently of medical clearance, and decision is informed.',
          },
          badDefer: {
            terminal: true,
            outcome: 'bad',
            prompt: 'Interview proceeds purely on client wish.',
            summary:
              'Reliability and consent risks; PSRAS Unit 5 expects more than agreement.',
          },
          mixedClear: {
            terminal: true,
            outcome: 'mixed',
            prompt: 'You leaned on medical clearance alone.',
            summary:
              'Insufficient — fitness for interview is broader than medical detention thresholds.',
          },
        },
      },
      learning_points: [
        'Fitness for interview (Code C 12.3) is wider than medical fitness for detention.',
        'Trust-building is a Unit 5 expectation, not a soft skill.',
        'Document decisions to proceed when client insists despite advice.',
      ],
      source_refs: ['Code C 12.3', 'Code C sect 9', 'SRA PSRAS Unit 5'],
    },
  ];
}
