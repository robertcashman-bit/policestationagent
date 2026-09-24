#!/usr/bin/env node
/**
 * Apply public-facing blog updates: May 2026 sparse posts, June firm rewrites, legacy cleanup.
 */
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog-posts");
const LEGACY_PATH = path.join(process.cwd(), "data", "blog-posts-full.json");

const NOT_KENT_POLICE =
  "<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>";

function figure(image, alt) {
  return `<figure class="blog-image">
  <img src="${image}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" width="800" height="400" />
  <figcaption>${alt}</figcaption>
</figure>`;
}

function takeaways(items) {
  const lis = items.map((i) => `<li>${i}</li>`).join("\n    ");
  return `<div class="key-takeaways" style="background-color: #e8f4fd; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.25rem 0 1.5rem;">
  <h2 style="margin-top: 0; color: #1e40af; font-size: 1.1rem;">Key takeaways</h2>
  <ul style="margin-bottom: 0;">${lis}</ul>
</div>`;
}

function cta() {
  return `<div class="advert-cta" style="background-color: #fef2f2; border: 2px solid #dc2626; border-radius: 12px; padding: 1.5rem; margin: 2rem 0;">
  <h2 style="margin-top: 0; color: #991b1b; font-size: 1.25rem;">Need legal advice at a Kent police station?</h2>
  <p style="margin: 0.75rem 0;">Call <strong>01732 247427</strong> for current custody or a booked voluntary interview. If you cannot call, text <strong>07535 494446</strong>.</p>
  <p style="margin: 0.75rem 0;">Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong> — the DSCC have our details. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).</p>
  <p style="margin: 0.75rem 0 0;"><a href="/contact">Contact Police Station Agent</a> · <a href="/start/in-custody">Someone in custody now</a> · <a href="/free-police-station-advice-kent">Free police station advice in Kent</a></p>
</div>`;
}

const BASE_SOURCES = `<h2>Sources</h2>
<ul>
  <li><a href="https://www.gov.uk/arrested-your-rights" rel="noopener noreferrer">GOV.UK — If you're arrested: your rights</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/58" rel="noopener noreferrer">PACE 1984, section 58</a> — right to legal advice</li>
  <li><a href="https://www.sra.org.uk/consumers/register/" rel="noopener noreferrer">SRA register — search for Tuckers Solicitors LLP (SRA ID 127795)</a></li>
</ul>`;

const DISCLAIMER =
  "<p><em>General information only — not legal advice about any individual case. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).</em></p>";

const CUSTODY_EXPAND = `<h2>Further information for detainees and family</h2>
<p>If you or someone you know faces police station attendance in Kent, remember that legal advice at the police station is free for most people being interviewed. You do not have to answer police questions without advice. A solicitor is independent of the police and bound by confidentiality.</p>
<p>Immediate family may help arrange a solicitor when someone is in current custody, subject to the detainee confirming they want legal advice. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>
<p>See <a href="/your-rights-in-custody">your rights in custody</a>, <a href="/start/in-custody">someone in custody now</a>, and <a href="/free-police-station-advice-kent">free police station advice in Kent</a>.</p>`;

function wrap(intro, image, alt, takeawaysItems, body, conclusion, extraSources = "") {
  return `<div class="blog-content">
<h2>Introduction</h2>
${intro}
${NOT_KENT_POLICE}

${figure(image, alt)}

${takeaways(takeawaysItems)}

${body}

${cta()}

<h2>Conclusion</h2>
${conclusion}

${BASE_SOURCES}
${extraSources}

${DISCLAIMER}
</div>`;
}

function updatePost(file, updates) {
  const filePath = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  Object.assign(post, updates);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + "\n");
  console.log(`✓ ${file}`);
}

// --- May 2026 sparse posts ---
updatePost("2026-05-30-rui-kent-plain-english.json", {
  metaTitle: "RUI in Kent | Plain English Guide for the Public",
  metaDescription:
    "What released under investigation means after a Kent police station visit — explained in plain English for detainees and families.",
  featuredImage: "/blog-images/blog-listing-5.png",
  featuredImageAlt: "Released under investigation explained in plain English",
  contentHtml: wrap(
    `<p>If you or someone you know has been <strong>released under investigation</strong> (RUI) after a Kent police station attendance, you may be unsure what happens next. This guide explains RUI in plain English — what it means, how it differs from police bail, and what you should do while the investigation continues.</p>`,
    "/blog-images/blog-listing-5.png",
    "Released under investigation explained in plain English",
    [
      "<strong>RUI</strong> means you have left the station while the police enquiry continues — it is not a finding of innocence or guilt.",
      "RUI is <strong>different from police bail</strong> — you may have fewer formal conditions, but the case is not closed.",
      "The police <strong>can still charge you later</strong> if they gather sufficient evidence.",
      "Keep your <strong>contact details updated</strong> and seek legal advice if contacted again.",
    ],
    `<h2>What does released under investigation mean?</h2>
<p><strong>Released under investigation</strong> (often called RUI) usually means the police have released a person from the station while their enquiry continues — without placing them on police bail with conditions. It is a procedural status, not a finding of innocence or guilt.</p>

<h2>How RUI differs from police bail</h2>
<p>Under police bail, a person is released subject to conditions (such as reporting requirements or contact restrictions) and a return date. RUI generally involves fewer formal conditions, but the investigation can still continue for months. The police may re-interview, request further evidence, or later charge the person.</p>
<p>See <a href="/police-bail-explained">police bail explained</a> for a comparison.</p>

<h2>What you should do after RUI</h2>
<ul>
<li>Keep your contact details updated with the police</li>
<li>Do not assume the matter is finished</li>
<li>Seek legal advice if you are contacted again or charged</li>
<li>Keep any paperwork given at the station</li>
<li>Note any dates or officer contact details you were given</li>
</ul>

<h2>Can the police charge you later after RUI?</h2>
<p>Yes. Release under investigation does not prevent a later charge if the police gather sufficient evidence. Time limits for certain offences may apply — that is case-specific and requires individual legal advice.</p>

<h2>RUI in Kent</h2>
<p>RUI is used at Kent custody suites including Medway, Maidstone, Canterbury, North Kent (Gravesend), and Tonbridge. Procedures follow national PACE guidance. For a full index of rights guides and station information, see our <a href="/kent-police-custody-resources">Kent custody resource hub</a>.</p>

<h2>Related guides</h2>
<p><a href="/released-under-investigation">Released under investigation — detailed guide</a> · <a href="/police-bail-explained">Police bail explained</a> · <a href="/after-a-police-interview">After a police interview</a></p>
${CUSTODY_EXPAND}`,
    `<p>RUI means the investigation continues after you leave the station. If the police contact you again, invite you for a further interview, or charge you, seek legal advice promptly. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>`,
    `  <li><a href="/released-under-investigation">RUI explained</a> (Police Station Agent)</li>
  <li><a href="/after-a-police-interview">After a police interview</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "Does RUI mean the case is closed?",
      a: "No. RUI means the investigation continues after release from the station. The police may still charge you later if they obtain sufficient evidence.",
    },
    {
      q: "Should I have a solicitor if I was released under investigation?",
      a: "You may benefit from legal advice if the police contact you again, invite you for a further interview, or charge you. Early advice can help you understand your position.",
    },
  ],
});

updatePost("2026-05-30-immediate-family-instruct-solicitor.json", {
  metaTitle: "Can Immediate Family Arrange a Solicitor? | Kent",
  metaDescription:
    "Who can help arrange a police station solicitor when someone is in Kent custody — immediate family rules, detainee consent, and what we cannot help with.",
  featuredImage: "/blog-images/blog-listing-6.png",
  featuredImageAlt: "Immediate family arranging police station legal advice",
  contentHtml: wrap(
    `<p>If someone you care about is in <strong>police custody right now</strong> at a Kent station, you may be able to help them get a solicitor — but the rules are strict. This guide explains who can help arrange advice, what consent is required, and what we cannot assist with.</p>`,
    "/blog-images/blog-listing-6.png",
    "Immediate family arranging police station legal advice",
    [
      "Only <strong>immediate family</strong> may help arrange a solicitor — parent, spouse, civil partner, child, or sibling.",
      "We act on <strong>current custody</strong> or a booked voluntary interview — not past arrests or general enquiries.",
      "The <strong>detainee must confirm</strong> they want legal advice when the police ask.",
      "Friends and extended family <strong>cannot instruct</strong> on someone else's behalf.",
    ],
    `<h2>Who can help arrange a police station solicitor?</h2>
<p>Under PACE Code C, a solicitor may take instructions from a third party in limited circumstances. In practice, we accept contact from <strong>immediate family</strong>: a parent, spouse or civil partner, child, or sibling of the detainee. Extended family, friends, colleagues, and neighbours cannot instruct on someone else's behalf — even if they are trying to help.</p>

<h2>Current custody only</h2>
<p>We act on <strong>immediate</strong> matters: someone who is in custody <em>now</em>, or a voluntary interview that is already scheduled. We do not help with arrests from yesterday, people who have already been released, or general "what happened to them" enquiries. Police cannot confirm whether someone is detained — that is a confidentiality rule, not something we can bypass.</p>

<h2>The detainee must confirm</h2>
<p>Even when immediate family contact us, the detainee must confirm they want the solicitor when the police put that question to them. We cannot act without that confirmation. Tell custody staff you want <strong>Tuckers Solicitors LLP</strong> and may request Robert Cashman as the attending solicitor.</p>

<h2>What to do if you are immediate family</h2>
<ol>
<li>Telephone <strong>01732 247427</strong> — do not rely on email for urgent custody.</li>
<li>Have the detainee's full name and, if known, which Kent station they are at.</li>
<li>Explain your relationship (parent, spouse, child, or sibling).</li>
<li>If known, pass on the custody record number or DSCC reference.</li>
</ol>
<p>See <a href="/what-to-do-if-a-loved-one-is-arrested">what to do if a loved one is arrested</a> and <a href="/start/in-custody">someone in custody now</a>.</p>

<h2>What we do not do</h2>
<ul>
<li>Status checks or welfare updates about someone in custody</li>
<li>Missing-person or tracing enquiries</li>
<li>Instructions from friends or non-immediate family</li>
<li>General legal advice by phone for past events</li>
</ul>
${CUSTODY_EXPAND}`,
    `<p>If you are immediate family and someone you love is in Kent custody now, call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
    `  <li><a href="/what-to-do-if-a-loved-one-is-arrested">If a loved one is arrested</a> (Police Station Agent)</li>
  <li><a href="/start/in-custody">Someone in custody now</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "Can a friend instruct a solicitor for someone in custody?",
      a: "No. Friends and non-immediate family cannot instruct on someone else's behalf. Immediate family (parent, spouse, child, or sibling) may contact us when someone is in current custody.",
    },
    {
      q: "Can I get an update on whether someone is in custody?",
      a: "No. Police do not confirm detention details to third parties, and we do not provide status updates. If they are in custody now, immediate family may help arrange a solicitor.",
    },
  ],
});

updatePost("2026-05-30-kent-custody-after-arrest.json", {
  metaTitle: "Kent Custody After Arrest | What Happens Next",
  metaDescription:
    "What typically happens after arrest at a Kent police station — booking in, legal advice, interview, and outcomes. Plain English guide for the public.",
  featuredImage: "/blog-images/blog-listing-2.png",
  featuredImageAlt: "Kent police custody process after arrest",
  contentHtml: wrap(
    `<p>After arrest in Kent, a person is usually taken to a police custody suite. This guide describes the typical stages — booking in, legal advice, interview, and possible outcomes — in plain English for detainees and their families.</p>`,
    "/blog-images/blog-listing-2.png",
    "Kent police custody process after arrest",
    [
      "After arrest you are usually <strong>booked into a custody suite</strong> and your rights under PACE should be explained.",
      "<strong>Free legal advice</strong> at the police station is available for most people being interviewed.",
      "Interviews are usually <strong>under caution and recorded</strong> — what you say may be used as evidence.",
      "Common outcomes include <strong>charge, RUI, police bail, or no further action</strong>.",
    ],
    `<h2>Arrival at the custody suite</h2>
<p>The detainee is booked in by the custody officer. Personal details are recorded, property may be seized, and rights under the Police and Criminal Evidence Act 1984 (PACE) should be explained. The detainee should be told they may receive free legal advice at the police station (<a href="https://www.gov.uk/arrested-your-rights">GOV.UK — arrested: your rights</a>).</p>
<p>A custody record is created. The custody officer decides whether detention is necessary and reviews should take place at prescribed intervals. See <a href="/custody-time-limits">custody time limits</a>.</p>

<h2>Legal advice before interview</h2>
<p>Most detainees are entitled to free legal advice. A duty solicitor or accredited representative may attend before any interview under caution. Early advice can help the detainee understand their rights, including the right to silence and the option of a prepared statement. See <a href="/pace-code-c">PACE Code C</a>, <a href="/no-comment-interview">no comment interviews</a>, and <a href="/your-rights-in-custody">your rights in custody</a>.</p>

<h2>The interview</h2>
<p>If the police intend to question the detainee, this is usually done under caution. The interview may be recorded on audio and video. The solicitor's role is to protect the detainee's rights and advise during the process — not to answer questions on their behalf.</p>

<h2>Possible outcomes</h2>
<p>After interview, common outcomes include:</p>
<ul>
<li><strong>Charge</strong> — the person may be charged and bailed or remanded to court</li>
<li><strong>Release under investigation (RUI)</strong> — released while enquiries continue (<a href="/released-under-investigation">RUI explained</a>)</li>
<li><strong>Police bail</strong> — release with conditions (<a href="/police-bail-explained">police bail explained</a>)</li>
<li><strong>No further action</strong> — the investigation may not proceed at this stage</li>
</ul>

<h2>Kent stations</h2>
<p>Custody suites across Kent include Medway, North Kent (Gravesend), Tonbridge, Maidstone, Canterbury, Folkestone, and others. See our <a href="/kent-police-custody-resources">Kent police custody resource hub</a> for station-specific information.</p>

<h2>If a loved one is arrested</h2>
<p>Immediate family may help arrange a solicitor when someone is in <strong>current</strong> custody. Friends cannot instruct on someone else's behalf. Read <a href="/what-to-do-if-a-loved-one-is-arrested">what to do if a loved one is arrested</a> and our <a href="/faq#immediate-custody-only">scope FAQ</a>.</p>
${CUSTODY_EXPAND}`,
    `<p>If you or someone you know has been arrested in Kent, ask for legal advice before any interview. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
    `  <li><a href="/pace-code-c">PACE Code C explained</a> (Police Station Agent)</li>
  <li><a href="/kent-police-custody-resources">Kent custody resource hub</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "How long can someone be kept in police custody?",
      a: "PACE sets time limits, typically up to 24 hours initially, with possible extensions in serious cases. See our custody time limits guide for an overview.",
    },
    {
      q: "Is legal advice at the police station free?",
      a: "Yes — legal advice at a police station under the duty solicitor scheme is free for most detainees being interviewed, regardless of income.",
    },
  ],
});

// --- June 2026 firm → public rewrites ---
updatePost("2026-06-12-police-station-attendance-notes.json", {
  title: "What Your Solicitor Records After a Police Station Visit",
  metaTitle: "Police Station Attendance Notes Explained | Public Guide",
  metaDescription:
    "What solicitors record after a police station attendance — disclosure, advice, interview summary, and outcome. Explained for detainees and families.",
  primaryKeyword: "police station attendance notes explained",
  featuredImage: "/blog-images/blog-listing-1.png",
  featuredImageAlt: "What your solicitor records after a police station visit",
  contentHtml: wrap(
    `<p>After a police station attendance, your solicitor prepares written notes of what happened — the allegation disclosed, advice given, interview summary, and outcome. This guide explains what those records contain, why they matter for your case, and how confidentiality applies.</p>`,
    "/blog-images/blog-listing-1.png",
    "What your solicitor records after a police station visit",
    [
      "Attendance notes record <strong>disclosure, advice, interview, and outcome</strong> from the police station stage.",
      "Notes are <strong>legally privileged</strong> — confidential between you and your solicitor.",
      "Good notes help your solicitor <strong>advise on next steps</strong> after the station visit.",
      "You can ask your solicitor to <strong>explain the outcome</strong> in plain English after attendance.",
    ],
    `<h2>Why attendance notes matter for you</h2>
<p>The police station stage is often the most important phase of a criminal investigation. Decisions made during interview — what was said, what was not said, what disclosure revealed — can shape charging decisions, bail conditions, and any future court proceedings. Written notes ensure an accurate record exists.</p>

<h2>What notes typically include</h2>
<ul>
<li><strong>Attendance details</strong> — station, date, type of attendance (custody or voluntary)</li>
<li><strong>Disclosure received</strong> — nature of allegation and evidence summary</li>
<li><strong>Advice given</strong> — interview strategy discussed in your private consultation</li>
<li><strong>Interview summary</strong> — significant questions and answers</li>
<li><strong>Outcome</strong> — charged, bailed, released under investigation, or no further action</li>
<li><strong>Bail conditions</strong> — if applicable, with dates and requirements</li>
<li><strong>Next steps</strong> — return dates, further interviews, documents needed</li>
</ul>

<h2>Your private consultation</h2>
<p>Before any interview, you meet your solicitor in private. This conversation is confidential and privileged. The police cannot overhear it. Your solicitor uses this consultation — and the notes taken — to advise you and to support any future work on your case.</p>
<p>See <a href="/pace-code-c">PACE Code C explained</a> for how disclosure and interview procedures work.</p>

<h2>Confidentiality</h2>
<p>Attendance notes contain legally privileged information. They belong to your solicitor's file and are confidential between you and your legal representative. They should not be shared with third parties without your consent.</p>

<h2>After the police station</h2>
<p>Your solicitor can explain what the outcome means — whether you were charged, released under investigation, bailed, or told no further action. See <a href="/released-under-investigation">RUI explained</a> and <a href="/police-bail-explained">police bail explained</a>.</p>
${CUSTODY_EXPAND}`,
    `<p>If you face a police station attendance in Kent, legal advice can help protect your rights before interview. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>`,
    `  <li><a href="/released-under-investigation">RUI explained</a> (Police Station Agent)</li>
  <li><a href="/police-bail-explained">Police bail explained</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "Can I see my solicitor's attendance notes?",
      a: "Your solicitor can explain what happened at the station and discuss the outcome with you. Notes are part of your legal file and subject to professional confidentiality.",
    },
    {
      q: "Are attendance notes shared with the police?",
      a: "No. Attendance notes are confidential between you and your solicitor. They are not provided to the police.",
    },
    {
      q: "Why does my solicitor take notes during interview?",
      a: "Notes help your solicitor advise you during the interview and create an accurate record for any future court proceedings or further police contact.",
    },
  ],
});

updatePost("2026-06-12-when-to-instruct-police-station-agent.json", {
  title: "When to Ask for a Solicitor at a Kent Police Station",
  slug: "when-to-ask-for-solicitor-kent-police-station",
  metaTitle: "When to Ask for a Solicitor at a Kent Police Station",
  metaDescription:
    "When to request free legal advice at a Kent police station — after arrest, before interview, voluntary interviews, and out-of-hours custody.",
  primaryKeyword: "when to ask for solicitor police station Kent",
  featuredImage: "/blog-images/blog-listing-7.png",
  featuredImageAlt: "When to ask for a solicitor at a Kent police station",
  contentHtml: wrap(
    `<p>You are entitled to free legal advice at most Kent police station interviews — whether you have been arrested or invited to a voluntary interview. This guide explains when to ask for a solicitor, why early advice matters, and how to request Robert Cashman through Tuckers Solicitors LLP.</p>`,
    "/blog-images/blog-listing-7.png",
    "When to ask for a solicitor at a Kent police station",
    [
      "Ask for a solicitor <strong>as soon as you are arrested</strong> or told you will be interviewed under caution.",
      "Legal advice is <strong>free for most interviews</strong> at the police station under the duty solicitor scheme.",
      "Voluntary interviews carry the <strong>same legal risks</strong> as custody interviews — advice is still available.",
      "Immediate family may <strong>help arrange a solicitor</strong> when someone is in current custody.",
    ],
    `<h2>After arrest</h2>
<p>When you are arrested and taken to a Kent custody suite, ask for a solicitor immediately. The custody officer should explain your right to free legal advice under PACE. You do not have to wait until interview — advice can be arranged before any questioning begins.</p>

<h2>Before any interview under caution</h2>
<p>Whether in custody or attending voluntarily, if the police intend to interview you under caution, you should have legal advice first. Your solicitor can review disclosure, explain your options, and attend the interview with you. See <a href="/voluntary-police-interview">voluntary police interview advice</a>.</p>

<h2>Voluntary interviews</h2>
<p>Police increasingly invite people to voluntary interviews instead of arresting them. These interviews are under caution and recorded. You are still entitled to free legal advice. Attending without a solicitor is a choice, but the legal risks are the same as a custody interview.</p>

<h2>Out of hours</h2>
<p>Arrests happen at any time. Duty solicitor cover operates outside office hours. Call <strong>01732 247427</strong> or ask custody staff to contact the Defence Solicitor Call Centre and request <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>

<h2>When family can help</h2>
<p>If a loved one is in current custody, immediate family (parent, spouse, child, or sibling) may contact us to help arrange a solicitor — subject to the detainee confirming they want advice. See <a href="/blog/immediate-family-instruct-police-station-solicitor">immediate family guidance</a>.</p>

<h2>Kent-wide attendance</h2>
<p>Robert Cashman attends custody suites and voluntary interviews across Kent — Medway, North Kent (Gravesend), Tonbridge, Maidstone, Canterbury and others — subject to availability. See <a href="/locations">all locations</a>.</p>
${CUSTODY_EXPAND}`,
    `<p>Do not wait until interview starts — ask for legal advice as early as possible. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>`,
    `  <li><a href="/voluntary-police-interview">Voluntary interview advice</a> (Police Station Agent)</li>
  <li><a href="/your-rights-in-custody">Your rights in custody</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "Is legal advice at the police station free?",
      a: "Yes — legal advice under the duty solicitor scheme is free for most people being interviewed at a police station, regardless of income.",
    },
    {
      q: "Can I ask for a specific solicitor?",
      a: "You may request a named duty solicitor where the scheme allows. Ask for Robert Cashman, Tuckers Duty Solicitor.",
    },
    {
      q: "Should I have a solicitor for a voluntary interview?",
      a: "Yes. Voluntary interviews are under caution and carry the same legal risks as custody interviews. Free legal advice is available for most interviewees.",
    },
  ],
});

updatePost("2026-06-12-freelance-police-station-agents-for-solicitors.json", {
  title: "Who Attends When You Ask for Legal Advice at the Police Station",
  slug: "who-attends-police-station-legal-advice",
  metaTitle: "Who Attends When You Ask for Legal Advice at the Police Station",
  metaDescription:
    "Duty solicitors, accredited representatives, and police station agents explained — who attends when you request legal advice at a Kent police station.",
  primaryKeyword: "who attends police station legal advice",
  featuredImage: "/blog-images/blog-listing-0.jpg",
  featuredImageAlt: "Who attends when you ask for legal advice at the police station",
  contentHtml: wrap(
    `<p>When you ask for legal advice at a Kent police station, a duty solicitor or accredited police station representative attends on your behalf. This guide explains who may attend, how they are independent of the police, and what they do during custody or a voluntary interview.</p>`,
    "/blog-images/blog-listing-0.jpg",
    "Who attends when you ask for legal advice at the police station",
    [
      "Legal advice at the police station is provided by a <strong>duty solicitor or accredited representative</strong>.",
      "Your adviser is <strong>independent of the police</strong> and bound by confidentiality.",
      "They can review <strong>disclosure, advise privately, and attend interview</strong> with you.",
      "Robert Cashman attends as a <strong>qualified solicitor</strong> through Tuckers Solicitors LLP.",
    ],
    `<h2>Duty solicitor scheme</h2>
<p>The duty solicitor scheme provides free legal advice at the police station for most people being interviewed. When you request a solicitor, the Defence Solicitor Call Centre (DSCC) or custody staff arranges attendance. You may request a specific duty solicitor where the scheme allows.</p>

<h2>What your adviser does</h2>
<p>Your solicitor or representative will:</p>
<ul>
<li>Confirm your identity with custody staff</li>
<li>Seek disclosure from the investigating officer</li>
<li>Meet you in private to discuss the allegation and your account</li>
<li>Advise on interview strategy — answering questions, no comment, or prepared statement</li>
<li>Attend the interview under caution with you</li>
<li>Explain the outcome and next steps</li>
</ul>

<h2>Independence from the police</h2>
<p>Your solicitor is not part of the police. They work for you (or the firm instructed on your behalf). Anything you say in your private consultation is confidential. The police cannot direct your solicitor or tell them what advice to give.</p>
<p>See <a href="/your-rights-in-custody">your rights in custody</a> and <a href="/pace-code-c">PACE Code C explained</a>.</p>

<h2>Qualified solicitor attendance</h2>
<p>Police station work may be undertaken by accredited representatives or qualified solicitors. Robert Cashman attends as a qualified solicitor through Tuckers Solicitors LLP (SRA ID: 127795), covering Kent custody suites and voluntary interviews.</p>

<h2>Kent-wide cover</h2>
<p>Attendance is available across Kent — Medway, North Kent (Gravesend), Tonbridge, Canterbury, Folkestone and other stations — subject to availability. See <a href="/locations">all locations</a> and <a href="/police-stations">police station directory</a>.</p>
${CUSTODY_EXPAND}`,
    `<p>If you need legal advice at a Kent police station, ask custody staff to contact a solicitor or call <strong>01732 247427</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>`,
    `  <li><a href="/your-rights-in-custody">Your rights in custody</a> (Police Station Agent)</li>
  <li><a href="/pace-code-c">PACE Code C explained</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "Is the duty solicitor free?",
      a: "Yes — legal advice at the police station under the duty solicitor scheme is free for most people being interviewed.",
    },
    {
      q: "Can the police stop me having a solicitor?",
      a: "In most cases you have a right to legal advice before interview under PACE. Your solicitor's role is to protect that right.",
    },
    {
      q: "Will the same solicitor represent me at court?",
      a: "Police station attendance and court representation are separate stages. Your police station solicitor can explain what may happen next and whether you need ongoing representation.",
    },
  ],
});

updatePost("2026-06-12-instructing-a-police-station-representative.json", {
  title: "How to Arrange a Solicitor When Someone Is in Custody",
  slug: "arrange-solicitor-someone-in-custody",
  metaTitle: "How to Arrange a Solicitor When Someone Is in Custody",
  metaDescription:
    "How immediate family and detainees can arrange a police station solicitor in Kent — what information helps, DSCC references, and custody record numbers.",
  primaryKeyword: "arrange solicitor someone in custody Kent",
  featuredImage: "/blog-images/blog-listing-1.png",
  featuredImageAlt: "How to arrange a solicitor when someone is in custody",
  contentHtml: wrap(
    `<p>When someone is detained at a Kent police station, arranging a solicitor quickly can help protect their rights before interview. This guide explains what information helps, who can make contact, and how the Defence Solicitor Call Centre process works.</p>`,
    "/blog-images/blog-listing-1.png",
    "How to arrange a solicitor when someone is in custody",
    [
      "The <strong>detainee can ask custody staff</strong> to contact a solicitor at any time.",
      "<strong>Immediate family</strong> may help arrange advice when someone is in current custody.",
      "Useful details include <strong>name, date of birth, station, and custody record number</strong>.",
      "Telephone <strong>01732 247427</strong> for urgent custody — do not rely on email.",
    ],
    `<h2>Asking from inside custody</h2>
<p>A detainee can tell the custody officer they want legal advice at any time. Custody staff should contact the Defence Solicitor Call Centre (DSCC) to arrange a duty solicitor. The detainee may request <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>

<h2>Help from immediate family</h2>
<p>Parents, spouses, civil partners, children, and siblings may contact us when someone is in <strong>current</strong> custody. Friends and extended family cannot instruct on someone else's behalf. The detainee must still confirm they want legal advice. See <a href="/blog/immediate-family-instruct-police-station-solicitor">immediate family rules</a>.</p>

<h2>Information that helps</h2>
<ul>
<li><strong>Full name and date of birth</strong> of the detainee</li>
<li><strong>Police station</strong> — confirm the custody suite (e.g. North Kent/Gravesend, Tonbridge, Medway)</li>
<li><strong>Custody record number</strong> — the detainee can ask the custody officer</li>
<li><strong>DSCC reference</strong> — if already allocated when you contact us</li>
</ul>
<p>Read <a href="/blog/custody-record-number-dscc-reference">custody record numbers and DSCC references explained</a> and <a href="/dscc-and-custody-record-support">DSCC support page</a>.</p>

<h2>Urgent contact</h2>
<p>For someone in custody now, telephone <strong>01732 247427</strong>. Text <strong>07535 494446</strong> only if you cannot call. See <a href="/start/in-custody">someone in custody now</a>.</p>

<h2>Voluntary interviews</h2>
<p>If you have a booked voluntary interview, you can still arrange free legal advice in advance. Early contact allows time to review disclosure. See <a href="/voluntary-police-interview">voluntary interview advice</a>.</p>
${CUSTODY_EXPAND}`,
    `<p>If someone is in Kent custody now, call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
    `  <li><a href="/dscc-and-custody-record-support">DSCC and custody record support</a> (Police Station Agent)</li>
  <li><a href="/start/in-custody">Someone in custody now</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "What is the minimum information needed?",
      a: "Client name, date of birth, and station. A custody record number or DSCC reference helps locate the detainee faster.",
    },
    {
      q: "Can I arrange a solicitor by email for urgent custody?",
      a: "No. Urgent custody requires telephone contact. Email may be used for scheduled voluntary interviews.",
    },
    {
      q: "Can friends arrange a solicitor for someone in custody?",
      a: "No. Only immediate family may help arrange a solicitor, and the detainee must confirm they want legal advice.",
    },
  ],
});

// custody-record - remove firm section, already mostly public
const custodyRecordPath = path.join(BLOG_DIR, "2026-06-12-custody-record-number-dscc-reference.json");
const custodyRecord = JSON.parse(fs.readFileSync(custodyRecordPath, "utf-8"));
custodyRecord.title = "Custody Record Numbers and DSCC References Explained for Families";
custodyRecord.metaTitle = "Custody Record Numbers Explained for Families";
custodyRecord.metaDescription =
  "Plain English explanation of custody record numbers and DSCC references for detainees and families arranging police station legal advice in Kent.";
custodyRecord.contentHtml = custodyRecord.contentHtml
  .replace(/<h2>7\) What firms should include in instructions<\/h2>[\s\S]*?<h2>7a\)/, "<h2>7a)")
  .replace(/<h2>9\) References at different Kent custody suites<\/h2>[\s\S]*?instructing North Kent cover<\/a> and /, "<h2>9) References at different Kent custody suites</h2>\n<p>Each Kent custody suite uses its own custody system instance. Always confirm which suite holds the detainee when passing a reference. See <a href=\"/police-stations\">")
  .replace(/Need police station cover in Kent\?/g, "Need legal advice at a Kent police station?")
  .replace(/<a href="\/for-solicitors">Cover for solicitors<\/a> · /g, "")
  .replace(/Further guidance for instructing firms[\s\S]*?attendance notes guide<\/a> for related guidance\.<\/p>/, CUSTODY_EXPAND);
fs.writeFileSync(custodyRecordPath, JSON.stringify(custodyRecord, null, 2) + "\n");
console.log("✓ 2026-06-12-custody-record-number-dscc-reference.json");

updatePost("2026-06-12-police-station-cover-firms-kent-medway.json", {
  title: "Legal Advice at Medway Custody in Kent",
  slug: "legal-advice-medway-custody-kent",
  metaTitle: "Legal Advice at Medway Custody | Kent Public Guide",
  metaDescription:
    "Free legal advice at Medway custody suite for arrests in Gillingham, Chatham and Rochester. What happens after arrest and how to request a solicitor.",
  primaryKeyword: "legal advice Medway custody Kent",
  featuredImage: "/blog-images/motoring-driving-police-station-featured.jpg",
  featuredImageAlt: "Legal advice at Medway custody suite in Kent",
  contentHtml: wrap(
    `<p>If you or someone you know is detained at Medway custody suite — serving Gillingham, Chatham, Rochester and the wider Medway area — you are entitled to free legal advice at the police station. This guide explains what happens after arrest and how to request Robert Cashman through Tuckers Solicitors LLP.</p>`,
    "/blog-images/motoring-driving-police-station-featured.jpg",
    "Legal advice at Medway custody suite in Kent",
    [
      "Medway custody serves <strong>Gillingham, Chatham, Rochester</strong> and surrounding areas.",
      "<strong>Free legal advice</strong> is available for most detainees being interviewed.",
      "Ask custody staff to contact a solicitor or call <strong>01732 247427</strong>.",
      "Robert Cashman attends <strong>across all Kent custody suites</strong>, including Medway.",
    ],
    `<h2>Medway custody suite</h2>
<p>Medway custody suite handles arrests from Gillingham, Chatham, Rochester and the Medway towns. When someone is booked in, the custody officer should explain PACE rights including the right to free legal advice. See <a href="/police-station-rep-medway">Medway cover page</a> and <a href="/coverage/areas/medway">Medway area hub</a>.</p>

<h2>What happens after arrest</h2>
<p>After arrest, the detainee is booked in, a custody record is created, and detention reviews should occur at prescribed intervals. Before any interview under caution, the detainee may request a duty solicitor. See <a href="/blog/kent-custody-after-arrest-process">Kent custody after arrest</a>.</p>

<h2>Your right to a solicitor</h2>
<p>PACE section 58 gives detainees the right to consult a solicitor privately. Your solicitor is independent of the police. See <a href="/your-rights-in-custody">your rights in custody</a> and <a href="/pace-code-c">PACE Code C</a>.</p>

<h2>Voluntary interviews in Medway</h2>
<p>Voluntary interviews under caution are also held at stations across Medway. You are entitled to free legal advice. See <a href="/voluntary-police-interview">voluntary interview advice</a>.</p>

<h2>Kent-wide attendance</h2>
<p>Robert Cashman attends custody suites and voluntary interviews across Kent — Medway, North Kent (Gravesend), Tonbridge, Canterbury and others — subject to availability. See <a href="/locations">all locations</a>.</p>
${CUSTODY_EXPAND}`,
    `<p>If you face Medway custody or a voluntary interview in the Medway area, ask for legal advice before answering police questions. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p>`,
    `  <li><a href="/police-station-rep-medway">Medway cover</a> (Police Station Agent)</li>
  <li><a href="/coverage/areas/medway">Medway area hub</a> (Police Station Agent)</li>`
  ),
  faq: [
    {
      q: "Is legal advice free at Medway custody?",
      a: "Yes — legal advice under the duty solicitor scheme is free for most detainees being interviewed at the police station.",
    },
    {
      q: "Can family help arrange a solicitor at Medway?",
      a: "Immediate family may contact us when someone is in current custody, subject to the detainee confirming they want legal advice.",
    },
    {
      q: "Do you only cover Medway?",
      a: "No. Robert Cashman attends across Kent, with regular attendance at Medway, North Kent (Gravesend), and Tonbridge among other stations.",
    },
  ],
});

// Polish public Gravesend and Tonbridge - fix CTA wording
for (const file of [
  "2026-06-12-north-kent-gravesend-custody-legal-advice.json",
  "2026-06-12-tonbridge-police-station-custody-and-interviews.json",
]) {
  const p = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(p, "utf-8"));
  post.contentHtml = post.contentHtml
    .replace(/Need police station cover in Kent\?/g, "Need legal advice at a Kent police station?")
    .replace(
      /<a href="\/contact">Contact Police Station Agent<\/a> · <a href="\/for-solicitors">Cover for solicitors<\/a>/g,
      '<a href="/contact">Contact Police Station Agent</a> · <a href="/start/in-custody">Someone in custody now</a>'
    );
  fs.writeFileSync(p, JSON.stringify(post, null, 2) + "\n");
  console.log(`✓ polished ${file}`);
}

// Unpublish firm duplicate posts (redirects added in next.config.js)
for (const file of [
  "2026-06-12-instructing-cover-north-kent-gravesend-custody.json",
  "2026-06-12-police-station-cover-west-kent-tonbridge-firms.json",
]) {
  const p = path.join(BLOG_DIR, file);
  const post = JSON.parse(fs.readFileSync(p, "utf-8"));
  post.status = "draft";
  fs.writeFileSync(p, JSON.stringify(post, null, 2) + "\n");
  console.log(`✓ unpublished ${file}`);
}

// --- Legacy cleanup ---
const legacy = JSON.parse(fs.readFileSync(LEGACY_PATH, "utf-8"));
const duplicateSlugs = new Set([
  "why-you-need-a-criminal-solicitor-in-the-police-station",
  "when-to-instruct-police-station-agent",
  "when-to-ask-for-solicitor-kent-police-station",
]);

let legacyChanges = 0;
for (const post of legacy) {
  let content = post.content || "";

  // Depublish duplicates of canonical posts
  if (duplicateSlugs.has(post.slug)) {
    post.published = 0;
    legacyChanges++;
    continue;
  }

  // Fix wix images
  if (/wixstatic\.com/i.test(content)) {
    content = content.replace(
      /<img[^>]*wixstatic\.com[^>]*>/gi,
      figure("/blog-images/violence-public-order-featured.jpg", "Police station legal advice")
    );
    legacyChanges++;
  }

  // Replace RepKent links
  if (/policestationrepkent/i.test(content)) {
    content = content.replace(/https?:\/\/(www\.)?policestationrepkent\.co\.uk[^\s<"]*/gi, "/contact");
    legacyChanges++;
  }

  // Add NOT Kent Police disclaimer if missing
  if (!/not kent police/i.test(content) && content.includes('class="blog-content"')) {
    content = content.replace(
      /(<div class="blog-content">)/i,
      `$1\n${NOT_KENT_POLICE}\n`
    );
    legacyChanges++;
  }

  // Fix firm CTA wording in legacy
  content = content.replace(/Need police station cover in Kent\?/g, "Need legal advice at a Kent police station?");

  post.content = content;
}

fs.writeFileSync(LEGACY_PATH, JSON.stringify(legacy, null, 2));
console.log(`✓ legacy cleanup (${legacyChanges} changes)`);

// Fix common assault inline figure
const assault = legacy.find((p) => p.slug?.includes("common-assault"));
if (assault && !/<figure[^>]*class="blog-image"/i.test(assault.content)) {
  assault.content = assault.content.replace(
    /<h2>What is Common Assault/,
    `${figure("/blog-images/violence-public-order-featured.jpg", "Common assault and police station procedure")}\n\n<h2>What is Common Assault`
  );
  fs.writeFileSync(LEGACY_PATH, JSON.stringify(legacy, null, 2));
  console.log("✓ common assault inline figure");
}

console.log("\nDone applying public-facing blog updates.");
