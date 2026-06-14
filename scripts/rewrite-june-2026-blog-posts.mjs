#!/usr/bin/env node
/**
 * Rewrite June 2026 SEO blog posts: comprehensive content, unique images, sources at bottom.
 */
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "data", "blog-posts");

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
  <h2 style="margin-top: 0; color: #991b1b; font-size: 1.25rem;">Need police station cover in Kent?</h2>
  <p style="margin: 0.75rem 0;">Call <strong>01732 247427</strong> for current custody or a booked voluntary interview. If you cannot call, text <strong>07535 494446</strong>.</p>
  <p style="margin: 0.75rem 0;">Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong> — the DSCC have our details. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).</p>
  <p style="margin: 0.75rem 0 0;"><a href="/contact">Contact Police Station Agent</a> · <a href="/for-solicitors">Cover for solicitors</a></p>
</div>`;
}

function sources(external, internal) {
  const ext = external
    .map(
      (e) =>
        `<li><a href="${e.url}" rel="noopener noreferrer">${e.label}</a>${e.note ? ` — ${e.note}` : ""}</li>`
    )
    .join("\n  ");
  const int = internal
    .map((e) => `<li><a href="${e.url}">${e.label}</a> (Police Station Agent)</li>`)
    .join("\n  ");
  return `<h2>Sources</h2>
<ul>
  ${ext}
  ${int}
</ul>`;
}

function wrap(intro, image, alt, takeawaysHtml, body, conclusion, sourceExternal, sourceInternal) {
  return `<div class="blog-content">
<h2>Introduction</h2>
${intro}

${figure(image, alt)}

${takeawaysHtml}

${body}

${cta()}

<h2>Conclusion</h2>
${conclusion}

${sources(sourceExternal, sourceInternal)}

<p><em>General information only — not legal advice about any individual case. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).</em></p>
</div>`;
}

const BASE_EXTERNAL = [
  {
    url: "https://www.gov.uk/arrested-your-rights",
    label: "GOV.UK — If you're arrested: your rights",
  },
  {
    url: "https://www.legislation.gov.uk/ukpga/1984/60/section/58",
    label: "PACE 1984, section 58",
    note: "right to legal advice",
  },
  {
    url: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795",
    label: "SRA register — Tuckers Solicitors LLP (127795)",
  },
];

const NOT_KENT_POLICE =
  "<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>";

const KENT_WIDE =
  "<p>Robert Cashman attends custody suites and voluntary interviews across Kent — Medway, Maidstone, Canterbury, Folkestone, Dover and others — subject to availability. North Kent (Gravesend) and Tonbridge are among the county's main 24-hour custody facilities and are areas of regular attendance.</p>";

const FIRM_EXPAND = `<h2>Further guidance for instructing firms</h2>
<p>Criminal defence firms operating across Kent face recurring demand for police station attendance at unpredictable times. Whether your firm is based in Medway, Dartford, Maidstone, Canterbury or elsewhere, the instruction process is the same: complete client details, correct station, custody record number, and DSCC reference where available. Telephone for urgent custody; email may suffice for scheduled voluntary interviews.</p>
<p>Robert Cashman attends through Tuckers Solicitors LLP (SRA ID: 127795). The instructing firm retains conduct throughout. After attendance, detailed notes are returned for the firm file. Attendance is subject to availability — not guaranteed within any fixed timeframe.</p>
<p>See <a href="/for-solicitors">police station cover for solicitors</a>, <a href="/blog/instructing-a-police-station-representative">instruction checklist</a>, and <a href="/blog/police-station-attendance-notes">attendance notes guide</a> for related guidance.</p>`;

const CUSTODY_EXPAND = `<h2>Further information for detainees and family</h2>
<p>If you or someone you know faces police station attendance in Kent, remember that legal advice at the police station is free for most people being interviewed. You do not have to answer police questions without advice. A solicitor is independent of the police and bound by confidentiality.</p>
<p>Immediate family may help arrange a solicitor when someone is in current custody, subject to the detainee confirming they want legal advice. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>
<p>See <a href="/your-rights-in-custody">your rights in custody</a>, <a href="/start/in-custody">someone in custody now</a>, and <a href="/free-police-station-advice-kent">free police station advice in Kent</a>.</p>`;

function wordCount(html) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

const posts = [
  // 1. north-kent-gravesend
  {
    file: "2026-06-12-north-kent-gravesend-custody-legal-advice.json",
    image: "/blog-images/blog-listing-3.png",
    imageAlt: "Legal advice at North Kent Gravesend custody suite",
    contentHtml: wrap(
      `<p>If someone is detained at the North Kent custody suite at Gravesend (Thames Way, Northfleet), they are entitled to free legal advice at the police station under the duty solicitor scheme. This guide explains what typically happens after arrest in north Kent, how immediate family can help arrange a solicitor, and how Robert Cashman attends through Tuckers Solicitors LLP across Kent — with regular attendance at North Kent custody among other stations.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-3.png",
      "Legal advice at North Kent Gravesend custody suite",
      takeaways([
        "<strong>Free legal advice</strong> at the police station is available for most detainees being interviewed — it is not means-tested at this stage.",
        "North Kent (Gravesend) custody at <strong>Thames Way, Northfleet DA11 8BD</strong> is a major 24-hour suite serving Gravesend, Dartford and wider north Kent.",
        "<strong>Immediate family</strong> may help arrange a solicitor when someone is in current custody, subject to the detainee confirming instruction.",
        "Robert Cashman provides extended-hours cover <strong>across all Kent custody suites</strong>, with regular attendance at North Kent and Tonbridge.",
      ]),
      `<h2>1) What is North Kent (Gravesend) custody?</h2>
<p>The North Kent custody suite is located at Thames Way, Northfleet (postcode DA11 8BD). It is one of Kent's main 24-hour custody facilities and often receives detainees from Gravesend, Dartford, Northfleet, Swanscombe and surrounding north Kent areas. Operational routing can vary — some arrests in north Kent may be taken to other suites depending on demand and capacity at the time.</p>
<p>Understanding which suite is holding a detainee matters when arranging legal advice. Custody staff can confirm the location. See our dedicated page: <a href="/police-station-rep-gravesend">police station cover — Gravesend &amp; North Kent</a> and the <a href="/coverage/areas/north-kent">North Kent area hub</a>.</p>

<h2>2) What happens after arrest in north Kent?</h2>
<p>After arrest, a person is usually taken to a custody suite. The custody officer should explain rights under the Police and Criminal Evidence Act 1984 (PACE), including the right to free legal advice. The detainee is booked in, property may be recorded and stored, and a custody record is created on the custody suite system. Reviews of detention should take place at prescribed intervals.</p>
<p>The custody officer decides whether detention is necessary and authorised. The detainee should be told the reason for arrest and the grounds for detention. Medical needs, vulnerability, and the right to have someone informed of the arrest should also be addressed. For a general overview of the custody process in Kent, see <a href="/blog/kent-custody-after-arrest-process">Kent custody after arrest</a> and our guide to <a href="/custody-time-limits">custody time limits</a>.</p>

<h2>3) Your right to a solicitor at the police station</h2>
<p>PACE 1984, section 58, gives detainees the right to consult a solicitor privately at the police station. Code C of the Codes of Practice sets out how that advice should be arranged. Legal advice at the police station under Legal Aid is free for most detainees being interviewed — it is not means-tested in the way court Legal Aid can be.</p>
<p>Your solicitor is independent of the police. Anything you say to them in private is confidential. They can advise you before any interview under caution, review disclosure, explain your options including no comment or a prepared statement, and remain with you during interview. You may request a specific duty solicitor where the scheme allows.</p>
<p>See <a href="/pace-code-c">PACE Code C explained</a> and <a href="/your-rights-in-custody">your rights in custody</a> for more detail on how these rights work in practice.</p>

<h2>4) How immediate family can help</h2>
<p>If a loved one is in <strong>current</strong> custody at a Kent station, immediate family (for example a parent, spouse, civil partner, child or sibling) may contact us to help arrange a solicitor. Friends, colleagues and extended family cannot instruct on someone else's behalf. We act on immediate matters only — not past arrests or general hypothetical advice.</p>
<p>Family members can pass on contact details and ask the detainee to request Robert Cashman, Tuckers Duty Solicitor, when speaking to custody staff or the Defence Solicitor Call Centre. The detainee must confirm they want legal advice. Read <a href="/start/in-custody">someone in custody now</a>, <a href="/what-to-do-if-a-loved-one-is-arrested">what to do if a loved one is arrested</a>, and <a href="/blog/immediate-family-instruct-solicitor-kent">immediate family instruction in Kent</a>.</p>

<h2>5) Disclosure and interview at North Kent custody</h2>
<p>Before interview, a solicitor will usually seek disclosure from the investigating officer — details of the allegation, what evidence the police rely on, and any significant circumstances. Disclosure may be limited at this stage, but it should be enough to enable proper advice. The solicitor's role is to protect your rights and advise on interview strategy, not to answer questions on your behalf.</p>
<p>Interviews at North Kent custody are typically recorded on audio and video. The recording creates a permanent record of everything said. What you say in interview can be played at court if the case proceeds. What you do not say may also be commented upon under certain circumstances. This is why early legal advice matters — decisions made in interview are difficult to undo later.</p>
<p>Your solicitor may advise you to answer questions, make no comment, or read a prepared statement. Each approach has strategic implications depending on the disclosure received and the strength of the evidence. There is no single correct answer for every case — advice is tailored to the individual circumstances.</p>

<h2>5a) Interview outcomes at North Kent</h2>
<p>After interview at North Kent custody, common outcomes include charge and bail to court, release under investigation while enquiries continue, release on police bail with conditions, or no further action at this stage. The custody officer and investigating officer decide the outcome based on the evidence and investigation needs.</p>
<p>Each outcome has different implications. Charge means a court date will be set. Release under investigation means the case is not closed but you are not on bail. Police bail may include conditions such as not contacting witnesses or not entering certain areas. Your solicitor can explain what each outcome means for you and what happens next.</p>

<h2>6) Voluntary interviews in north Kent</h2>
<p>Not every police contact involves custody. Voluntary interviews under caution may take place at local stations across north Kent — including Dartford, Gravesend and other locations. If you have a booked voluntary interview, you are still entitled to free legal advice. Attending without a solicitor is a choice, but the interview carries the same legal risks as a custody interview.</p>
<p>See <a href="/voluntary-police-interview">voluntary police interview advice</a> and <a href="/voluntary-police-interview-risks">risks of attending alone</a>.</p>

<h2>7) Common allegations at north Kent custody</h2>
<p>North Kent custody handles a wide range of allegations — from theft and assault to motoring matters, drug offences, and more serious indictable cases. The nature of the allegation affects disclosure, interview strategy, and likely outcome. Regardless of the offence type, the right to free legal advice at the police station applies to most detainees being interviewed.</p>
<p>See <a href="/offences-we-deal-with">offences at police station stage</a> for an overview of common allegation types and how the police station stage differs from court proceedings.</p>

<h2>8) Kent-wide cover — not just Gravesend</h2>
${KENT_WIDE}
<p>Browse <a href="/locations">all locations</a> or the <a href="/police-stations">police station directory</a> for station-specific information.</p>

<h2>9) How to contact Robert Cashman</h2>
<p>Call <strong>01732 247427</strong> for current custody or a booked voluntary interview. If you cannot call, text <strong>07535 494446</strong> with the detainee's name, date of birth, and station. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong> — the DSCC have our details. Attendance is subject to availability and should not be assumed until confirmed.</p>`,
      `<p>If someone you know is at North Kent custody, ask custody staff to contact a solicitor and request <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong> if you cannot call. Early legal advice at the police station can help protect rights before interview. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/police-station-rep-gravesend", label: "Gravesend & North Kent cover" },
        { url: "/start/in-custody", label: "Someone in custody now" },
        { url: "/pace-code-c", label: "PACE Code C explained" },
        { url: "/your-rights-in-custody", label: "Your rights in custody" },
      ]
    ),
    faq: [
      {
        q: "Is legal advice free at North Kent custody?",
        a: "Legal advice at the police station under the duty solicitor scheme is free for most detainees being interviewed. This is general information only.",
      },
      {
        q: "Can family instruct a solicitor at Gravesend custody?",
        a: "Immediate family may contact us to help arrange a solicitor when someone is in current custody, subject to the detainee confirming instruction.",
      },
      {
        q: "Do you only cover Gravesend?",
        a: "No. Robert Cashman attends custody suites and voluntary interviews across Kent, with regular attendance at North Kent (Gravesend) and Tonbridge among other stations.",
      },
      {
        q: "What should I do if I cannot reach the custody suite by phone?",
        a: "Text 07535 494446 with the detainee's name, date of birth, and station if known. Urgent matters should still be confirmed by telephone where possible.",
      },
    ],
  },

  // 2. tonbridge
  {
    file: "2026-06-12-tonbridge-police-station-custody-and-interviews.json",
    image: "/blog-images/blog-listing-4.png",
    imageAlt: "Tonbridge police station custody and voluntary interview advice",
    contentHtml: wrap(
      `<p>Tonbridge police station operates west Kent's main 24-hour custody suite and regularly hosts voluntary interviews under caution. If you or someone you know faces custody or a booked interview at Tonbridge, you are entitled to free legal advice at the police station. This guide explains the custody process, voluntary interview risks, and how Robert Cashman attends through Tuckers Solicitors LLP across Kent — with regular attendance at Tonbridge among other stations.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-4.png",
      "Tonbridge police station custody and voluntary interview advice",
      takeaways([
        "Tonbridge custody at <strong>1 Pembury Road, TN9 2HS</strong> is west Kent's primary 24-hour custody facility.",
        "Voluntary interviews at Tonbridge are <strong>under caution</strong> and carry the same legal risks as custody interviews.",
        "Legal advice at the police station is <strong>free for most detainees and interviewees</strong> under the duty solicitor scheme.",
        "Robert Cashman covers <strong>all Kent custody suites</strong> and voluntary interviews, with regular Tonbridge and Gravesend attendance.",
      ]),
      `<h2>1) Tonbridge police station and custody suite</h2>
<p>Tonbridge police station is located at 1 Pembury Road, Tonbridge (TN9 2HS). The custody suite operates 24 hours and serves west Kent including Tonbridge, Tunbridge Wells, Sevenoaks, and surrounding areas. Arrests from these towns may be routed to Tonbridge custody, though operational decisions can vary.</p>
<p>See <a href="/police-station-rep-tonbridge">police station cover — Tonbridge</a> and the <a href="/coverage/areas/west-kent">West Kent area hub</a> for station-specific information.</p>

<h2>2) What happens in Tonbridge custody after arrest?</h2>
<p>After arrest, the detainee is booked in by the custody officer. Rights under PACE should be explained, including the right to free legal advice. A custody record is created, property may be logged, and detention reviews should occur at prescribed intervals. The custody officer authorises continued detention where necessary.</p>
<p>The detainee may request a duty solicitor before any interview. Early advice helps the detainee understand options — including answering questions, making no comment, or providing a prepared statement. See <a href="/blog/kent-custody-after-arrest-process">Kent custody after arrest</a> and <a href="/custody-time-limits">custody time limits</a>.</p>

<h2>3) Your right to legal advice</h2>
<p>Section 58 of PACE 1984 establishes the right to consult a solicitor privately at the police station. Code C governs how advice is arranged in practice. The solicitor is independent of the police and bound by professional confidentiality. Legal advice at this stage is free for most people being interviewed.</p>
<p>At Tonbridge, duty solicitor contacts may be routed through the Defence Solicitor Call Centre. You can ask for Robert Cashman, Tuckers Duty Solicitor. See <a href="/pace-code-c">PACE Code C explained</a> and <a href="/your-rights-in-custody">your rights in custody</a>.</p>

<h2>4) Voluntary interviews at Tonbridge</h2>
<p>Police may invite someone to a voluntary interview at Tonbridge without arrest. These interviews are conducted under caution and anything said may be used as evidence. There is no obligation to attend without a solicitor, but if you attend, legal advice remains available free of charge for most interviewees.</p>
<p>Voluntary interviews are common for a range of allegations — from motoring matters to more serious offences. Disclosure before interview may be limited, which makes early legal advice particularly important. Read <a href="/voluntary-police-interview">voluntary police interview advice</a> and <a href="/voluntary-police-interview-risks">risks of attending alone</a>.</p>

<h2>5) Disclosure and interview strategy</h2>
<p>Before interview, a solicitor will seek disclosure — the nature of the allegation, evidence relied upon, and any significant circumstances. Even limited disclosure enables advice on whether to answer questions, make no comment, or provide a prepared statement. The solicitor attends the interview to protect your rights and advise during questioning.</p>
<p>Recorded interviews at Tonbridge create a permanent record. What is said can shape charging decisions, bail conditions, and any future trial. Taking advice before speaking to police is a practical step, not an admission of guilt.</p>
<p>Your solicitor may intervene during interview if questions are improper or if further disclosure is needed. They will take notes throughout to support any future court proceedings. After interview, they can explain the outcome and what to expect in the days and weeks ahead.</p>

<h2>5a) Young and vulnerable detainees at Tonbridge</h2>
<p>Where a detainee is under 18 or considered vulnerable, an appropriate adult must be present during custody procedures and interview. The solicitor works alongside the appropriate adult to ensure the detainee's rights are protected. Additional safeguards apply under PACE Code C for young and vulnerable people.</p>

<h2>6) Outcomes after interview</h2>
<p>Common outcomes include charge and bail, release under investigation, police bail with conditions, or no further action. Each carries different implications. A solicitor can explain what an outcome means and what steps may follow. See <a href="/released-under-investigation">RUI explained</a> and <a href="/police-bail-explained">police bail explained</a>.</p>

<h2>7) Family and urgent contact</h2>
<p>Immediate family may help arrange a solicitor when someone is in current custody at Tonbridge. Friends cannot instruct on another person's behalf. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. See <a href="/start/in-custody">someone in custody now</a> and <a href="/what-to-do-if-a-loved-one-is-arrested">what to do if a loved one is arrested</a>.</p>

<h2>8) Kent-wide attendance</h2>
${KENT_WIDE}
<p>Voluntary interviews are also held at Sevenoaks, Tunbridge Wells, Maidstone and other Kent stations. Browse <a href="/locations">all locations</a> and <a href="/police-stations">police station directory</a>.</p>

<h2>9) Contacting Robert Cashman for Tonbridge matters</h2>
<p>Call <strong>01732 247427</strong> for Tonbridge custody or a booked voluntary interview. Text <strong>07535 494446</strong> if you cannot call. Ask custody staff or the DSCC for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability — contact early where possible.</p>
${CUSTODY_EXPAND}`,
      `<p>Whether facing Tonbridge custody or a voluntary interview, request legal advice before answering police questions. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
        { url: "/voluntary-police-interview", label: "Voluntary interview advice" },
        { url: "/coverage/areas/west-kent", label: "West Kent area hub" },
        { url: "/your-rights-in-custody", label: "Your rights in custody" },
      ]
    ),
    faq: [
      {
        q: "Is Tonbridge a 24-hour custody suite?",
        a: "Yes. Tonbridge is west Kent's main 24-hour custody facility and also hosts voluntary interviews.",
      },
      {
        q: "Is legal advice free at a Tonbridge voluntary interview?",
        a: "Legal advice at the police station under the duty solicitor scheme is free for most people being interviewed. This is general information only.",
      },
      {
        q: "Can I choose a specific duty solicitor at Tonbridge?",
        a: "You may request a named duty solicitor where the scheme allows. Ask custody staff or the DSCC for Robert Cashman, Tuckers Duty Solicitor.",
      },
      {
        q: "Does cover extend beyond Tonbridge?",
        a: "Yes. Robert Cashman attends custody suites and voluntary interviews across Kent, with regular attendance at Tonbridge and North Kent (Gravesend).",
      },
    ],
  },

  // 3. instructing-cover-north-kent
  {
    file: "2026-06-12-instructing-cover-north-kent-gravesend-custody.json",
    image: "/blog-images/blog-listing-5.png",
    imageAlt: "Instructing police station cover at North Kent Gravesend custody",
    contentHtml: wrap(
      `<p>Criminal defence firms instructing police station cover at North Kent (Gravesend) custody need clear, complete instructions to arrange attendance efficiently. This guide sets out what to send, how the Thames Way custody suite operates, and how Robert Cashman attends through Tuckers Solicitors LLP for firm instructions across Kent — with regular attendance at North Kent custody.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-5.png",
      "Instructing police station cover at North Kent Gravesend custody",
      takeaways([
        "Telephone instruction is essential for <strong>urgent custody</strong> at North Kent (Gravesend).",
        "Include <strong>client identity, custody record number, and DSCC reference</strong> where available.",
        "North Kent custody is at <strong>Thames Way, Northfleet DA11 8BD</strong> — confirm the correct suite.",
        "Robert Cashman covers <strong>Kent-wide</strong> firm instructions, with regular Gravesend and Tonbridge attendance.",
      ]),
      `<h2>1) Why North Kent custody instructions need precision</h2>
<p>North Kent custody at Thames Way, Northfleet (DA11 8BD) is a high-volume 24-hour suite. Firms instructing cover here often do so at short notice, sometimes while the client is already in detention. Incomplete instructions — missing date of birth, wrong station name, or no custody record number — can delay locating the client and obtaining disclosure before interview.</p>
<p>Clear instructions help the attending representative identify the correct detainee, confirm detention details with custody staff, and begin disclosure discussions with the investigating officer promptly.</p>

<h2>2) The instruction checklist for Gravesend custody</h2>
<p>When instructing cover at North Kent custody, include as many of the following as possible:</p>
<ul>
<li><strong>Client full name and date of birth</strong></li>
<li><strong>Confirmation of North Kent (Gravesend) custody</strong> at Thames Way, Northfleet</li>
<li><strong>Custody record number</strong> from the custody suite system</li>
<li><strong>DSCC reference</strong> if allocated through the Defence Solicitor Call Centre</li>
<li><strong>Offence summary</strong> and any disclosure already received by your firm</li>
<li><strong>Interview status</strong> — imminent, in progress, or not yet scheduled</li>
<li><strong>Your firm name, fee earner, and callback number</strong></li>
<li><strong>Billing reference or matter number</strong> for attendance notes</li>
</ul>
<p>See <a href="/dscc-and-custody-record-support">DSCC and custody record support</a> and <a href="/start/solicitors-agent-cover">send police station instructions</a>.</p>

<h2>3) Urgent custody: telephone first</h2>
<p>For someone currently in custody at North Kent, telephone instruction is strongly preferred. Email and messaging are not suitable for immediate attendance arrangements. Provide a direct callback number and remain contactable while the representative travels to the suite.</p>
<p>If the DSCC has already allocated a matter, pass the DSCC reference immediately. If not, the custody record number alone may be enough for custody staff to locate the detainee.</p>

<h2>4) Understanding the custody record and DSCC reference</h2>
<p>The custody record number identifies the detention on the custody suite system. The DSCC reference links a duty solicitor instruction to the call centre process. They are separate references serving different purposes. Both should be included in firm instructions where available. Read <a href="/blog/custody-record-number-dscc-reference">custody record numbers and DSCC references explained</a>.</p>

<h2>5) What happens on attendance at North Kent</h2>
<p>The attending representative confirms client identity with custody staff, reviews the custody record, seeks disclosure from the investigating officer, advises the client privately, and attends any interview under caution. After attendance, detailed notes are sent to the instructing firm covering disclosure, advice, interview summary, and outcome.</p>
<p>Attendance times depend on location, demand, and availability — not fixed response guarantees. The representative travels to Thames Way, Northfleet, and begins work on arrival. Early instruction with complete details helps minimise delay before the representative reaches the client.</p>
<p>During the attendance, the representative acts on the instructing firm's instructions throughout. The firm retains conduct of the matter. The representative does not take over the client relationship — they are an extension of the firm's capacity for that attendance.</p>

<h2>5a) After attendance: notes and handover</h2>
<p>Following North Kent attendance, the instructing firm receives written notes. These should cover disclosure received, advice given, interview summary, outcome, bail conditions if applicable, and next steps. Good notes allow the firm fee earner to advise the client on what happens next without needing to reconstruct events from scratch.</p>
<p>See <a href="/blog/police-station-attendance-notes">police station attendance notes</a> for what firms should expect.</p>

<h2>6) Voluntary interviews in north Kent</h2>
<p>Not all firm instructions relate to custody. Voluntary interviews under caution are also held at stations across north Kent. For scheduled interviews, firms may instruct by telephone or email with interview date, time, station, and client details. See <a href="/voluntary-police-interview">voluntary interview advice</a>.</p>

<h2>7) Ongoing cover arrangements</h2>
<p>Firms may establish ongoing cover relationships for regular north Kent instructions. Agree note format, billing arrangements, and communication preferences in advance. See <a href="/for-solicitors">police station cover for solicitors</a> and <a href="/police-station-rep-gravesend">North Kent cover page</a>.</p>

<h2>8) Kent-wide firm cover</h2>
${KENT_WIDE}
<p>North Kent and Tonbridge are frequent instruction locations, but firms instruct cover across the county. Browse <a href="/coverage/areas/north-kent">North Kent area hub</a> and <a href="/locations">all locations</a>.</p>

<h2>9) Billing and Legal Aid considerations</h2>
<p>Firms instructing North Kent cover should confirm billing arrangements when giving instruction. Legal Aid matters require compliance with scheme requirements including accurate time recording and outcome codes. Private instructions may follow different billing arrangements agreed between the firm and the agent.</p>
<p>Include your firm's matter reference and billing contact in every instruction to ensure attendance notes and invoices are routed correctly.</p>

<h2>10) North Kent routing and operational variation</h2>
<p>Operational factors may affect which custody suite receives a north Kent arrest. A client arrested in Dartford may be processed at North Kent (Gravesend) custody, but routing is a police operational decision. When instructing, confirm the actual suite with your client, the custody suite, or the DSCC — do not assume from the arrest location alone.</p>
${FIRM_EXPAND}`,
      `<p>For urgent North Kent custody cover, telephone <strong>01732 247427</strong> with complete instructions. Text <strong>07535 494446</strong> only if you cannot call. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/police-station-rep-gravesend", label: "North Kent cover" },
        { url: "/dscc-and-custody-record-support", label: "DSCC and custody record support" },
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/start/solicitors-agent-cover", label: "Send police station instructions" },
      ]
    ),
    faq: [
      {
        q: "How do firms instruct urgent cover at Gravesend custody?",
        a: "Telephone for urgent custody matters. Include client details, station, custody record number and DSCC reference where available.",
      },
      {
        q: "What if we do not have the custody record number yet?",
        a: "Provide as much as you have. The representative can confirm details with custody staff on arrival at North Kent suite.",
      },
      {
        q: "Can we instruct by email for Gravesend custody?",
        a: "Email is not suitable for urgent custody. Use telephone for current detention. Email may be used for scheduled voluntary interviews.",
      },
      {
        q: "Do you only accept North Kent instructions?",
        a: "No. Firms instruct cover across Kent. North Kent and Tonbridge are among the stations of regular attendance.",
      },
    ],
  },

  // 4. west-kent-tonbridge-firms
  {
    file: "2026-06-12-police-station-cover-west-kent-tonbridge-firms.json",
    image: "/blog-images/blog-listing-6.png",
    imageAlt: "Police station cover for firms at Tonbridge and west Kent",
    contentHtml: wrap(
      `<p>Criminal defence firms across west Kent instruct police station cover at Tonbridge 24-hour custody and for voluntary interviews at Tonbridge, Sevenoaks, Tunbridge Wells and surrounding stations. This guide explains what firms should send when instructing, how Tonbridge custody operates, and how Robert Cashman attends through Tuckers Solicitors LLP across Kent.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-6.png",
      "Police station cover for firms at Tonbridge and west Kent",
      takeaways([
        "Tonbridge is west Kent's <strong>primary 24-hour custody suite</strong> at 1 Pembury Road, TN9 2HS.",
        "Voluntary interviews across west Kent require <strong>early instruction</strong> with date, time, and station.",
        "Complete instructions — client ID, custody record, DSCC reference — reduce delay.",
        "Robert Cashman provides <strong>Kent-wide firm cover</strong> with regular Tonbridge and Gravesend attendance.",
      ]),
      `<h2>1) Why west Kent firms instruct external cover</h2>
<p>Criminal defence firms in Sevenoaks, Tunbridge Wells, Maidstone and surrounding areas face recurring demand for police station attendance — often at short notice, outside office hours, or when in-house representatives are unavailable. Tonbridge custody handles arrests from across west Kent, and voluntary interviews are distributed among local stations.</p>
<p>Instructing an experienced police station agent allows firms to maintain client service without maintaining a full-time overnight rota. See <a href="/blog/freelance-police-station-agents-for-solicitors">why firms use freelance police station agents</a>.</p>

<h2>2) Tonbridge custody: what firms need to know</h2>
<p>Tonbridge police station at 1 Pembury Road (TN9 2HS) operates the main west Kent custody suite. When instructing custody cover, confirm the client is at Tonbridge custody (not merely attending for a voluntary interview in the front office). Include the custody record number and DSCC reference where allocated.</p>
<p>See <a href="/police-station-rep-tonbridge">Tonbridge cover page</a> and <a href="/coverage/areas/west-kent">West Kent area hub</a>.</p>

<h2>3) Instruction essentials for west Kent</h2>
<ul>
<li><strong>Client name and date of birth</strong></li>
<li><strong>Station and attendance type</strong> — custody or voluntary interview</li>
<li><strong>Custody record number</strong> for detention matters</li>
<li><strong>DSCC reference</strong> if applicable</li>
<li><strong>Interview date and time</strong> for voluntary attendances</li>
<li><strong>Allegation summary</strong> and known disclosure</li>
<li><strong>Firm contact details and matter reference</strong></li>
</ul>
<p>Read <a href="/blog/instructing-a-police-station-representative">what to send when instructing a representative</a> and <a href="/start/solicitors-agent-cover">send police station instructions</a>.</p>

<h2>4) Voluntary interviews across west Kent</h2>
<p>Voluntary interviews under caution are regularly scheduled at Tonbridge, Sevenoaks, Tunbridge Wells and other west Kent stations. These are not custody attendances but carry the same legal significance. Firms should instruct early to allow disclosure review and client conference time before interview.</p>
<p>Scheduled voluntary interviews may be instructed by telephone or email. Urgent custody matters require telephone contact. See <a href="/voluntary-police-interview">voluntary interview advice</a>.</p>

<h2>5) Out-of-hours and capacity cover</h2>
<p>West Kent firms commonly instruct cover when their own duty rota cannot meet demand — overnight custody, simultaneous attendances, or geographic conflicts. Robert Cashman provides extended-hours cover across Kent, subject to availability. See <a href="/blog/when-to-instruct-police-station-agent">when to instruct a police station agent</a>.</p>
<p>Peak demand often occurs on Friday and Saturday nights when multiple arrests coincide. A firm with one duty representative cannot attend two custody suites simultaneously. External cover allows the firm to accept both instructions and maintain service to both clients.</p>

<h2>5a) Conflict and overflow instructions</h2>
<p>Where a firm has a conflict of interest or simply lacks capacity, instructing external cover avoids turning clients away. Confirm that no conflict exists on the agent's side before instructing. Provide full client details and allegation summary so the agent can make an informed conflict check.</p>

<h2>6) Attendance notes and handover</h2>
<p>After attendance, the instructing firm receives notes covering disclosure received, advice given, interview summary, and outcome (charge, bail, RUI, NFA). Good notes allow seamless case handover. Agree note format and delivery expectations when establishing a cover relationship. See <a href="/blog/police-station-attendance-notes">attendance notes guide</a>.</p>

<h2>7) Legal Aid and private instructions</h2>
<p>Firms instruct agents for both Legal Aid and private client matters. Confirm billing arrangements and scheme requirements when instructing. The attending representative acts on the instructing firm's instruction throughout the attendance.</p>

<h2>8) Beyond west Kent</h2>
${KENT_WIDE}
<p>Firms with multi-area practices can instruct a single contact for Kent-wide cover. Browse <a href="/police-station-rep-sevenoaks">Sevenoaks</a>, <a href="/locations">all locations</a>, and <a href="/for-solicitors">firm instructions</a>.</p>

<h2>9) Establishing ongoing west Kent cover</h2>
<p>Firms with regular west Kent instructions benefit from an ongoing cover arrangement. Agree note format, billing method, communication channels, and escalation contacts in advance. This streamlines future instructions — a single telephone call with client details may be all that is needed for each new matter.</p>
<p>Contact <strong>01732 247427</strong> to discuss ongoing cover for your firm's west Kent practice.</p>

<h2>10) Sevenoaks, Tunbridge Wells and local stations</h2>
<p>West Kent voluntary interviews are not limited to Tonbridge. Sevenoaks, Tunbridge Wells, Maidstone and Swanley regularly host scheduled interviews under caution. When instructing cover, confirm the precise station — a client told to attend "Tonbridge police station" may mean the custody suite or the front office for a voluntary interview. Include the interview room or officer details if known.</p>

<h2>11) Motoring and other voluntary interviews in west Kent</h2>
<p>Motoring allegations — excess speed, careless driving, failing to provide driver details — are commonly dealt with by voluntary interview at west Kent stations. These interviews carry the same caution and recording as any other interview. Firms should instruct cover so the client receives advice before attending.</p>

<h2>12) Contact for west Kent firm cover</h2>
<p>Telephone <strong>01732 247427</strong> for urgent Tonbridge custody. Text <strong>07535 494446</strong> if you cannot call. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Provide complete instructions including custody record number and DSCC reference where available.</p>
${FIRM_EXPAND}`,
      `<p>For Tonbridge custody or west Kent voluntary interview cover, telephone <strong>01732 247427</strong> with full instructions. Text <strong>07535 494446</strong> if you cannot call. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/start/solicitors-agent-cover", label: "Send police station instructions" },
        { url: "/coverage/areas/west-kent", label: "West Kent area hub" },
      ]
    ),
    faq: [
      {
        q: "Do you cover both Tonbridge custody and voluntary interviews?",
        a: "Yes, subject to availability. Instruct with station, client details and interview or detention time.",
      },
      {
        q: "Which west Kent stations do you attend for voluntary interviews?",
        a: "Voluntary interviews are attended across west Kent including Tonbridge, Sevenoaks and Tunbridge Wells, subject to availability and instruction.",
      },
      {
        q: "How should firms instruct urgent Tonbridge custody?",
        a: "Telephone with client name, date of birth, custody record number, and DSCC reference where available.",
      },
      {
        q: "Can we establish an ongoing cover arrangement?",
        a: "Yes. Firms may set up recurring cover for west Kent matters. Agree communication and billing preferences in advance.",
      },
    ],
  },

  // 5. instructing-a-police-station-representative
  {
    file: "2026-06-12-instructing-a-police-station-representative.json",
    image: "/blog-images/blog-listing-1.png",
    imageAlt: "What to send when instructing a police station representative",
    contentHtml: wrap(
      `<p>When a criminal defence firm instructs a police station representative, the quality of the instruction directly affects how quickly attendance can be arranged and how effectively the client is advised. This guide sets out the essential details firms should send, how urgent custody differs from scheduled voluntary interviews, and how Robert Cashman attends through Tuckers Solicitors LLP across Kent.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-1.png",
      "What to send when instructing a police station representative",
      takeaways([
        "Send <strong>client identity, station, custody record, and DSCC reference</strong> as a minimum.",
        "<strong>Telephone instruction</strong> is required for urgent custody — not email.",
        "Voluntary interviews need <strong>date, time, station, and allegation summary</strong>.",
        "Detailed <strong>attendance notes</strong> should be agreed with your representative in advance.",
      ]),
      `<h2>1) Why clear instructions matter</h2>
<p>Criminal defence firms frequently need police station cover at short notice. A representative must identify the correct client, confirm detention or interview details with police, obtain disclosure, advise the client privately, attend interview, and report back with attendance notes. Each step depends on accurate initial instructions.</p>
<p>Missing information — particularly date of birth, custody record number, or wrong station — creates delay at a stage where interview may be imminent. Investing two minutes in a complete instruction saves significant time at the custody suite.</p>

<h2>2) Essential instruction details</h2>
<ul>
<li><strong>Client full name and date of birth</strong> — essential for custody staff to locate the detainee</li>
<li><strong>Police station</strong> — confirm exact station and whether custody suite or voluntary interview</li>
<li><strong>Custody record number</strong> — if the client is in detention</li>
<li><strong>DSCC reference</strong> — where allocated through the Defence Solicitor Call Centre</li>
<li><strong>Interview date and time</strong> — for voluntary attendances</li>
<li><strong>Allegation summary</strong> — offence type and brief facts if known</li>
<li><strong>Officer details</strong> — investigating officer name or collar number if available</li>
<li><strong>Bail or RUI status</strong> — if the client is attending voluntarily following earlier police contact</li>
<li><strong>Firm name, fee earner, and direct callback number</strong></li>
<li><strong>Matter or billing reference</strong></li>
</ul>

<h2>3) Urgent custody instructions</h2>
<p>When someone is in current custody, telephone instruction is strongly preferred. The instructing fee earner should remain contactable. Provide a custody record number if available — custody staff can locate the detainee from this alone in most cases. If the DSCC has allocated a reference, include it immediately.</p>
<p>Email is not appropriate for urgent custody attendance. See <a href="/contact">contact page</a>, <a href="/start/solicitors-agent-cover">send instructions</a>, and <a href="/dscc-and-custody-record-support">DSCC and custody record guide</a>.</p>

<h2>4) Scheduled voluntary interview instructions</h2>
<p>Voluntary interviews under caution may be instructed by telephone or email when not urgent. Include the interview date, time, station address, client contact details, and allegation summary. Early instruction allows disclosure review and client conference before attendance.</p>
<p>See <a href="/voluntary-police-interview">voluntary interview advice</a> and <a href="/blog/when-to-instruct-police-station-agent">when to instruct an agent</a>.</p>

<h2>5) What the representative does on attendance</h2>
<p>On arrival, the representative confirms identity with custody staff or the interviewing officer, reviews the custody record where applicable, seeks disclosure, advises the client in private, and attends any interview under caution. The representative acts on the instructing firm's instruction throughout — the firm retains conduct of the matter.</p>
<p>After attendance, written notes are provided covering disclosure, advice, interview content, and outcome. See <a href="/blog/police-station-attendance-notes">attendance notes guide</a>.</p>
<p>The representative may also liaise with the investigating officer about bail conditions, further interviews, or property returns. Any significant developments are recorded in the attendance notes for the firm's attention.</p>

<h2>5a) Private consultation before interview</h2>
<p>Before any interview, the representative meets the client in private. This consultation is confidential and privileged. The client can explain their account, ask questions, and receive advice on interview strategy. The police cannot overhear this consultation. Adequate time for private consultation is important — rushed advice may not reflect the full circumstances.</p>

<h2>6) Common instruction errors to avoid</h2>
<p>Firms sometimes instruct with only a client name, without date of birth or station confirmation. Others confuse voluntary interview stations with custody suite locations. Some fail to pass DSCC references allocated before firm instruction. Each of these adds delay.</p>
<p>Confirm whether the client is in custody or attending voluntarily. Confirm the correct Kent station — the county has multiple custody suites and dozens of interview locations.</p>

<h2>7) Establishing a cover relationship</h2>
<p>Firms with regular cover needs benefit from agreeing note format, billing method, communication channels, and escalation contacts in advance. This streamlines future instructions. See <a href="/for-solicitors">police station cover for solicitors</a>.</p>

<h2>8) Kent-wide instructions</h2>
${KENT_WIDE}
<p>Instructions are accepted for custody suites and voluntary interviews across the county. See <a href="/locations">all locations</a> and <a href="/police-stations">police station directory</a>.</p>

<h2>9) Template instruction for your firm</h2>
<p>Consider preparing an internal instruction template for fee earners covering all essential fields: client name, date of birth, station, custody or voluntary, custody record number, DSCC reference, interview time, allegation summary, firm matter number, and callback number. A consistent template reduces omissions and speeds up attendance arrangements across your firm's Kent practice.</p>

<h2>10) Follow-up after instruction</h2>
<p>Remain contactable after giving instruction. The representative may need to confirm details, obtain further disclosure, or update the firm on outcome. A direct callback number for the instructing fee earner — not a general firm reception line — speeds up communication during attendance.</p>

<h2>11) Multiple simultaneous instructions</h2>
<p>When instructing for more than one client at the same time, provide separate complete instructions for each matter. Do not combine multiple clients in a single instruction — each attendance requires its own client details, station, and references.</p>
${FIRM_EXPAND}`,
      `<p>Complete instructions help attendance be arranged efficiently. Telephone <strong>01732 247427</strong> for urgent custody. Text <strong>07535 494446</strong> if you cannot call. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/dscc-and-custody-record-support", label: "DSCC and custody record support" },
        { url: "/start/solicitors-agent-cover", label: "Send police station instructions" },
        { url: "/contact", label: "Contact" },
      ]
    ),
    faq: [
      {
        q: "What is the minimum information needed to instruct?",
        a: "Client name, date of birth, station, and whether custody or voluntary interview. Custody record number and DSCC reference should be included where available.",
      },
      {
        q: "What if I do not have the custody record number yet?",
        a: "Provide as much as you have. The representative can confirm details on arrival at the custody suite.",
      },
      {
        q: "Can I instruct by email for urgent custody?",
        a: "No. Urgent custody requires telephone instruction. Email may be used for scheduled voluntary interviews.",
      },
      {
        q: "Who retains conduct of the matter?",
        a: "The instructing firm retains conduct. The representative acts on the firm's instructions and provides attendance notes for the firm file.",
      },
    ],
  },

  // 6. custody-record-dscc
  {
    file: "2026-06-12-custody-record-number-dscc-reference.json",
    image: "/blog-images/blog-listing-2.png",
    imageAlt: "Custody record numbers and DSCC references explained",
    contentHtml: wrap(
      `<p>Custody record numbers and DSCC references are two distinct identifiers used when arranging police station attendance in Kent. Understanding the difference helps detainees, family members, and instructing firms communicate clearly with custody staff and the Defence Solicitor Call Centre. This guide explains both references in plain English.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-2.png",
      "Custody record numbers and DSCC references explained",
      takeaways([
        "The <strong>custody record number</strong> identifies detention on the custody suite system.",
        "The <strong>DSCC reference</strong> links a duty solicitor instruction to the call centre process.",
        "They are <strong>separate references</strong> — not interchangeable.",
        "Both help arrange attendance when provided to your solicitor or instructing firm.",
      ]),
      `<h2>1) Why these references matter</h2>
<p>When someone is detained at a Kent custody suite, multiple systems and people need to coordinate — custody staff, investigating officers, the Defence Solicitor Call Centre, and the attending solicitor. Reference numbers reduce confusion and help the right legal representative reach the right detainee at the right station.</p>
<p>Whether you are a detainee requesting advice, a family member helping from outside, or a firm instructing cover, knowing which reference to provide saves time.</p>

<h2>2) What is a custody record?</h2>
<p>When someone is booked into police custody, the custody officer creates a custody record. This is a formal document recording the detention — including the reason for arrest, grounds for detention, rights given, property logged, reviews of detention, medical needs, and contacts with legal representatives. The custody record number is the unique identifier for that detention on the custody suite computer system.</p>
<p>Custody staff can locate a detainee from the custody record number even if little other information is available. This makes it one of the most useful details when arranging attendance.</p>

<h2>3) What is a DSCC reference?</h2>
<p>The Defence Solicitor Call Centre (DSCC) handles many contacts between detainees and duty solicitor firms. When a detainee requests legal advice, custody staff or the detainee may contact the DSCC. The DSCC allocates the matter to a duty solicitor firm and may provide a DSCC reference number.</p>
<p>The DSCC reference links the instruction to the call centre's records. It helps the attending firm confirm the instruction and match it to the correct detainee and station. Robert Cashman is listed with the DSCC as Tuckers Duty Solicitor — you may request him by name.</p>

<h2>4) How the two references differ</h2>
<p>The custody record number belongs to the police custody system and identifies the detention itself. The DSCC reference belongs to the duty solicitor allocation process. A single detention may generate both references, but they serve different purposes and are not the same number.</p>
<p>Providing both when arranging attendance is ideal. If you have only one, the custody record number is often the most immediately useful for locating the detainee.</p>

<h2>5) How detainees can obtain references</h2>
<p>A detainee can ask the custody officer for the custody record number. They can also request legal advice through custody staff, who will contact the DSCC. The DSCC reference, if allocated, may be passed to the attending solicitor. Detainees may request a specific duty solicitor where the scheme allows.</p>
<p>See <a href="/your-rights-in-custody">your rights in custody</a> and <a href="/pace-code-c">PACE Code C explained</a>.</p>

<h2>6) How family members can help</h2>
<p>Immediate family cannot instruct a solicitor on a detainee's behalf, but they can encourage the detainee to request legal advice and pass on contact details for Robert Cashman, Tuckers Duty Solicitor. If the family learns the custody record number from the detainee during a permitted call, they can pass it to the solicitor when contacting us.</p>
<p>See <a href="/start/in-custody">someone in custody now</a> and <a href="/blog/immediate-family-instruct-solicitor-kent">immediate family instruction</a>.</p>

<h2>7) What firms should include in instructions</h2>
<p>Criminal defence firms instructing cover should include both references where available, along with client name, date of birth, and station. See <a href="/dscc-and-custody-record-support">DSCC and custody record support</a>, <a href="/blog/instructing-a-police-station-representative">instructing a representative</a>, and <a href="/start/solicitors-agent-cover">send instructions</a>.</p>
<p>When a firm receives a DSCC notification before the custody record number is known, the DSCC reference alone may be sufficient to begin arranging attendance. The representative can obtain the custody record number on arrival at the suite.</p>

<h2>7a) When references are unavailable</h2>
<p>Sometimes neither reference is available — for example, when a family member contacts us before the detainee has requested a solicitor. In these cases, client name, date of birth, and station may still be enough for custody staff to locate the detainee. Providing accurate information is more important than having a reference number.</p>

<h2>8) Practical tips</h2>
<p>Ask early — references are easier to obtain at the start of detention than after interview. Write them down accurately. Double-check station name (North Kent/Gravesend, Tonbridge, Medway, etc.) alongside the reference. If a reference is unavailable, client name, date of birth, and station may still be sufficient for custody staff to locate the detainee.</p>

<h2>9) References at different Kent custody suites</h2>
<p>Each Kent custody suite uses its own custody system instance. A custody record number from North Kent (Gravesend) is different from one at Tonbridge or Medway. Always confirm which suite holds the detainee when passing a reference. The DSCC reference is county-wide but should still be paired with the correct station name.</p>
<p>See <a href="/blog/instructing-cover-north-kent-gravesend-custody">instructing North Kent cover</a> and <a href="/police-stations">police station directory</a> for station-specific guidance.</p>

<h2>10) Keeping a record of references</h2>
<p>Detainees and family members should write down both references as soon as they are obtained. It is easy to forget or confuse numbers during a stressful detention. A note on a phone or piece of paper passed to the attending solicitor speeds up confirmation with custody staff on arrival.</p>
${CUSTODY_EXPAND}`,
      `<p>Keep custody record numbers and DSCC references to hand when contacting a solicitor. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/dscc-and-custody-record-support", label: "DSCC and custody record support" },
        { url: "/your-rights-in-custody", label: "Your rights in custody" },
        { url: "/start/in-custody", label: "Someone in custody now" },
        { url: "/pace-code-c", label: "PACE Code C explained" },
      ]
    ),
    faq: [
      {
        q: "Is the DSCC reference the same as the custody record number?",
        a: "No. They are separate references used for different purposes in the instruction and custody process.",
      },
      {
        q: "Can I attend without either reference?",
        a: "A solicitor can still attend using client name, date of birth, and station. References simply speed up locating the detainee.",
      },
      {
        q: "How do I get a custody record number?",
        a: "The detainee can ask the custody officer. Family may learn it during a permitted phone call from the detainee.",
      },
      {
        q: "Can I request a specific duty solicitor through the DSCC?",
        a: "You may request a named duty solicitor where the scheme allows. Ask for Robert Cashman, Tuckers Duty Solicitor.",
      },
    ],
  },

  // 7. when-to-instruct
  {
    file: "2026-06-12-when-to-instruct-police-station-agent.json",
    image: "/blog-images/blog-listing-7.png",
    imageAlt: "When should a solicitor instruct a police station agent",
    contentHtml: wrap(
      `<p>Criminal defence firms instruct freelance police station agents when they need attendance at a Kent custody suite or voluntary interview and no suitable in-house representative is available. This guide explains the common scenarios — out-of-hours custody, conflicts, capacity, and geographic coverage — and what firms should expect when instructing Robert Cashman through Tuckers Solicitors LLP.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-7.png",
      "When should a solicitor instruct a police station agent",
      takeaways([
        "Instruct when <strong>in-house cover is unavailable</strong> — out of hours, conflicts, or capacity.",
        "Agents attend both <strong>custody suites and voluntary interviews</strong> across Kent.",
        "Early instruction for voluntary interviews allows <strong>disclosure review time</strong>.",
        "Attendance is <strong>subject to availability</strong> — not guaranteed within fixed timescales.",
      ]),
      `<h2>1) The role of a police station agent</h2>
<p>A police station agent attends on behalf of an instructing criminal defence firm. The agent identifies the client, obtains disclosure, advises privately, attends interview under caution, and returns attendance notes to the firm. The instructing firm retains conduct of the matter throughout. The agent is an extension of the firm's capacity, not a replacement for its client relationship.</p>
<p>Robert Cashman attends as a qualified solicitor through Tuckers Solicitors LLP (SRA ID: 127795), covering Kent custody suites and voluntary interviews by firm instruction.</p>

<h2>2) Out-of-hours custody</h2>
<p>Arrests do not follow office hours. When a firm's duty rota cannot cover an overnight or weekend custody attendance, instructing an external agent maintains client service. Telephone instruction with client name, date of birth, station, and custody record number allows attendance to be arranged subject to availability.</p>
<p>North Kent (Gravesend) and Tonbridge are among Kent's main 24-hour custody suites and common out-of-hours instruction locations. See <a href="/police-station-rep-gravesend">Gravesend cover</a> and <a href="/police-station-rep-tonbridge">Tonbridge cover</a>.</p>

<h2>3) Voluntary interviews</h2>
<p>Police increasingly use voluntary interviews under caution instead of arrest. These may be scheduled days or weeks ahead at stations across Kent. Firms instruct agents when no in-house representative is free at the interview time, or when the station is outside the firm's usual geographic practice.</p>
<p>Early instruction is preferable — it allows disclosure review and client conference before the interview. See <a href="/voluntary-police-interview">voluntary interview advice</a>.</p>

<h2>4) Conflict of interest</h2>
<p>Where a firm cannot act due to conflict — perhaps because another client is involved, or a prior relationship prevents instruction — a separate firm or agent may be needed. Firms should instruct an independent representative and confirm no conflict exists on the agent's side.</p>

<h2>5) Capacity and simultaneous attendances</h2>
<p>When multiple clients are in custody simultaneously, or a custody attendance clashes with a court hearing, firms may instruct external cover for one or more attendances. Clear prioritisation and complete instructions for each matter help manage competing demands.</p>

<h2>6) Geographic coverage</h2>
<p>Kent has multiple custody suites and dozens of voluntary interview stations. A firm based in one town may not regularly attend stations at the other end of the county. Instructing a Kent-wide agent avoids maintaining representatives at every location. See <a href="/locations">all locations</a> and <a href="/coverage">coverage map</a>.</p>

<h2>7) What to expect after instruction</h2>
<p>After attendance, the firm receives notes covering disclosure, advice, interview summary, and outcome. The firm then takes over the matter for any bail return, charging decision response, or court proceedings. Agree note format and delivery expectations in advance. See <a href="/blog/police-station-attendance-notes">attendance notes guide</a> and <a href="/blog/instructing-a-police-station-representative">instruction checklist</a>.</p>
<p>The agent does not continue acting after the police station attendance unless the firm instructs further work. Court representation, bail variation applications, and charging decision representations remain the instructing firm's responsibility unless separately arranged.</p>

<h2>7a) Costs of instructing external cover</h2>
<p>Firms should agree fees or Legal Aid billing arrangements before or at the point of instruction. Ad hoc instructions may attract different rates from ongoing cover arrangements. Clear billing expectations avoid disputes after attendance.</p>

<h2>8) When not to instruct an agent</h2>
<p>If a qualified in-house representative is available and knows the client, in-house attendance may be preferable for continuity. Agents are most valuable when capacity, geography, or hours create a gap the firm cannot fill internally. Single instructions and ongoing cover arrangements are both available.</p>

<h2>9) How to instruct</h2>
<p>Telephone <strong>01732 247427</strong> for urgent custody. Include client details, station, custody record, and DSCC reference. See <a href="/for-solicitors">police station cover for solicitors</a> and <a href="/start/solicitors-agent-cover">send instructions</a>.</p>

<h2>10) Building a cover relationship</h2>
<p>Firms that instruct agents regularly benefit from establishing a relationship before the first urgent call. Discuss qualification level, geographic coverage, note format, billing, and communication preferences in a quiet moment — not during a 2am custody instruction. This preparation makes future instructions smoother and faster.</p>
<p>Robert Cashman attends across Kent through Tuckers Solicitors LLP, with regular attendance at North Kent (Gravesend) and Tonbridge among other stations.</p>

<h2>11) Evaluating agent performance</h2>
<p>After your first few instructions, review note quality, communication, and client feedback. A reliable agent should return consistent, detailed notes and be reachable during attendances. If the arrangement works well, add the agent to your firm's standard escalation procedure for out-of-hours and overflow cover across your Kent practice.</p>

<h2>12) Seasonal and event-related demand</h2>
<p>Kent police station demand fluctuates — summer events, bank holidays, and local festivals can increase arrest numbers across the county. Firms with fixed rotas may struggle during peak periods. Having an established agent contact before demand spikes means you can instruct quickly when multiple custody attendances arise simultaneously.</p>

<h2>13) First instruction checklist</h2>
<p>Before your first instruction to an external agent, confirm: qualification level, geographic coverage, note format, billing basis, and out-of-hours availability. A brief introductory call prevents misunderstandings during the first urgent custody attendance.</p>
${FIRM_EXPAND}`,
      `<p>Instruct a police station agent when your firm needs Kent attendance and in-house cover is unavailable. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/start/solicitors-agent-cover", label: "Send police station instructions" },
        { url: "/voluntary-police-interview", label: "Voluntary interview advice" },
        { url: "/locations", label: "All locations" },
      ]
    ),
    faq: [
      {
        q: "Can agents attend on Legal Aid matters?",
        a: "Yes. Firms commonly instruct agents for Legal Aid police station attendance subject to scheme requirements.",
      },
      {
        q: "When should I instruct for a voluntary interview?",
        a: "As early as possible once the interview is scheduled. This allows disclosure review and client conference time.",
      },
      {
        q: "Does the firm retain conduct?",
        a: "Yes. The instructing firm retains conduct. The agent acts on the firm's instructions and provides attendance notes.",
      },
      {
        q: "Is attendance guaranteed within a set time?",
        a: "No. Attendance is subject to availability, location, and demand. Telephone instruction with complete details helps arrange attendance efficiently.",
      },
    ],
  },

  // 8. attendance-notes
  {
    file: "2026-06-12-police-station-attendance-notes.json",
    image: "/blog-images/types-of-offences-police-station-featured.jpg",
    imageAlt: "Police station attendance notes for criminal defence firms",
    contentHtml: wrap(
      `<p>Police station attendance notes are the written record an instructing firm receives after a representative attends custody or a voluntary interview. Good notes allow seamless case handover — the fee earner can advise on next steps without needing to reconstruct what happened at the station. This guide explains what notes should contain and how firms can set expectations when instructing cover.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/types-of-offences-police-station-featured.jpg",
      "Police station attendance notes for criminal defence firms",
      takeaways([
        "Attendance notes let the <strong>instructing firm take over</strong> with an accurate picture of the station attendance.",
        "Good notes cover <strong>disclosure, advice, interview, and outcome</strong>.",
        "Firms should <strong>agree note format and delivery</strong> when establishing cover.",
        "Notes are essential for <strong>billing, audit, and future advice</strong> on the matter.",
      ]),
      `<h2>1) Why attendance notes matter</h2>
<p>The police station stage is often the most consequential phase of a criminal investigation. Decisions made during interview — what was said, what was not said, what disclosure revealed — shape charging decisions, bail conditions, and trial strategy. The instructing firm was not present. Attendance notes are how the representative communicates what occurred.</p>
<p>Without adequate notes, the firm must contact the client again to reconstruct events, may miss deadlines for bail variations or charging decisions, and lacks a proper record for Legal Aid billing or quality audit.</p>

<h2>2) What good attendance notes include</h2>
<ul>
<li><strong>Client details</strong> — name, date of birth, station, attendance type</li>
<li><strong>References</strong> — custody record number, DSCC reference, firm matter number</li>
<li><strong>Disclosure received</strong> — allegation, evidence summary, significant omissions</li>
<li><strong>Advice given</strong> — interview strategy, no comment, prepared statement, etc.</li>
<li><strong>Interview summary</strong> — key questions, significant answers, interventions made</li>
<li><strong>Outcome</strong> — charged, bailed, RUI, NFA, voluntary attendance concluded</li>
<li><strong>Bail conditions</strong> — if applicable, with dates and requirements</li>
<li><strong>Next steps</strong> — return dates, further interviews, documents needed</li>
<li><strong>Time recording</strong> — attendance times for billing purposes</li>
</ul>

<h2>3) Disclosure recording</h2>
<p>The disclosure section should record what the police disclosed before interview — the nature of the allegation, witness accounts described, CCTV or forensic evidence mentioned, and any significant gaps. This allows the firm to assess whether further disclosure requests are needed and informs any future trial preparation.</p>
<p>See <a href="/pace-code-c">PACE Code C explained</a> for the disclosure framework at police station stage.</p>

<h2>4) Advice and interview recording</h2>
<p>Notes should record the advice given — for example, whether the client was advised to answer questions, make no comment, or provide a prepared statement — and the client's decision. The interview summary should capture significant questions and answers without necessarily transcribing every word. Interventions by the representative during interview should be noted.</p>

<h2>5) Outcome and next steps</h2>
<p>The outcome section is critical for firm handover. Was the client charged? Released under investigation? Bailed with conditions? Told no further action at this stage? Each outcome requires different firm action. Bail conditions, return dates, and officer contact details should be recorded precisely.</p>
<p>See <a href="/released-under-investigation">RUI explained</a> and <a href="/police-bail-explained">police bail explained</a>.</p>

<h2>6) Setting expectations with your agent</h2>
<p>Firms benefit from agreeing note format, delivery method, and timeframe when establishing a cover relationship. Some firms require specific templates or case management system entries. Others need notes before the end of the working day. Agreeing this upfront avoids misunderstanding.</p>
<p>See <a href="/start/solicitors-agent-cover">send police station instructions</a> and <a href="/for-solicitors">cover for solicitors</a>.</p>

<h2>7) Notes and Legal Aid billing</h2>
<p>Attendance notes support Legal Aid billing and audit. Time records, outcome codes, and work done descriptions must align with scheme requirements. Representatives should record attendance and travel times accurately. Firms should confirm billing expectations when instructing.</p>
<p>Poor notes can delay billing and create audit queries. Notes that clearly record travel time, attendance time, waiting time, and work done help the firm bill correctly and respond to any Legal Aid Agency queries.</p>

<h2>7a) Redacted and client copies</h2>
<p>Firms sometimes need to provide redacted notes to clients or third parties. Agree whether the representative should prepare a client-friendly summary alongside the full attendance note. Some firms require both versions as standard.</p>

<h2>8) Quality and confidentiality</h2>
<p>Notes contain legally privileged information. They should be transmitted securely to the instructing firm — not left on unsecured voicemail or informal messaging. The content is confidential between the client, the firm, and the representative.</p>

<h2>9) Kent attendances</h2>
${KENT_WIDE}
<p>Notes are provided for all instructed attendances across the county. See <a href="/blog/instructing-a-police-station-representative">instruction checklist</a> and <a href="/locations">all locations</a>.</p>

<h2>10) Example note structure</h2>
<p>A typical attendance note might follow this structure: (1) attendance details and references, (2) disclosure summary, (3) private consultation summary, (4) advice given and client's decision, (5) interview summary with key questions and answers, (6) outcome and bail conditions, (7) next steps and officer contact, (8) time recording. Firms may adapt this structure to their own template requirements.</p>

<h2>11) Common note deficiencies to avoid</h2>
<p>Firms sometimes receive notes that omit key details — for example, the advice given but not the client's decision, or the outcome without bail conditions. When establishing cover, provide a template or checklist to the agent. This improves note consistency across multiple attendances and reduces the need for follow-up queries.</p>

<h2>12) Notes and case progression</h2>
<p>Attendance notes are the foundation for everything that follows — bail variation applications, charging decision representations, and trial preparation. A note that accurately records disclosure and interview content allows the firm fee earner to make informed decisions without re-interviewing the client about what happened at the station.</p>
${FIRM_EXPAND}`,
      `<p>When instructing cover, confirm your note requirements at the outset. Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/start/solicitors-agent-cover", label: "Send police station instructions" },
        { url: "/released-under-investigation", label: "RUI explained" },
        { url: "/police-bail-explained", label: "Police bail explained" },
      ]
    ),
    faq: [
      {
        q: "How quickly should notes be sent?",
        a: "This depends on firm requirements. Agree delivery expectations when establishing a cover relationship.",
      },
      {
        q: "What format should notes follow?",
        a: "Firms may specify their own template or case management format. Discuss this when first instructing cover.",
      },
      {
        q: "Do notes include enough detail for court preparation?",
        a: "Good notes record disclosure, advice, and interview summary at a level that allows the firm to advise on next steps. Full trial preparation may require further work.",
      },
      {
        q: "Are notes confidential?",
        a: "Yes. Attendance notes contain privileged information and should be transmitted securely to the instructing firm.",
      },
    ],
  },

  // 9. freelance-agents
  {
    file: "2026-06-12-freelance-police-station-agents-for-solicitors.json",
    image: "/blog-images/blog-listing-0.jpg",
    imageAlt: "Freelance police station agents for criminal defence firms",
    contentHtml: wrap(
      `<p>Criminal defence firms across Kent use freelance police station agents to maintain reliable custody and voluntary interview cover without staffing a full-time overnight rota. This guide explains why firms choose external agents, what to look for, and how Robert Cashman attends through Tuckers Solicitors LLP across Kent — including regular attendance at North Kent (Gravesend) and Tonbridge custody.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/blog-listing-0.jpg",
      "Freelance police station agents for criminal defence firms",
      takeaways([
        "Freelance agents give firms <strong>flexible capacity</strong> without permanent overnight staffing.",
        "Cover may be by <strong>accredited representative or qualified solicitor</strong> depending on the instruction.",
        "Local <strong>Kent custody knowledge</strong> reduces delay at the station.",
        "Detailed <strong>attendance notes</strong> enable seamless firm handover.",
      ]),
      `<h2>1) Why firms use freelance agents</h2>
<p>Criminal defence firms face unpredictable demand. A quiet Tuesday afternoon can be followed by three simultaneous custody attendances on a Saturday night. Maintaining enough in-house staff to cover every scenario — across every Kent station, at every hour — is expensive and inefficient. Freelance agents provide capacity when needed, without the cost of permanent overnight staffing.</p>
<p>Firms instruct agents for single attendances or establish ongoing cover relationships for regular overflow work.</p>

<h2>2) Extended hours without overnight rotas</h2>
<p>Most arrests occur outside conventional office hours. An in-house representative on a weekday duty rota may not be available at 2am on a Sunday. A freelance agent with extended-hours availability allows the firm to offer continuous service to clients and referral sources without each fee earner taking turns on an overnight rota.</p>
<p>Robert Cashman provides extended-hours cover across Kent, subject to availability. See <a href="/for-solicitors">police station cover for solicitors</a>.</p>

<h2>3) Qualified solicitor attendance</h2>
<p>Some matters benefit from attendance by a qualified solicitor rather than an accredited representative — complex allegations, vulnerable clients, or firm policy requirements. Robert Cashman attends as a qualified solicitor through Tuckers Solicitors LLP (SRA ID: 127795). Firms should confirm the level of cover they require when instructing.</p>

<h2>4) Geographic flexibility across Kent</h2>
<p>Kent spans a wide area with custody suites at Medway, North Kent (Gravesend), Tonbridge, Canterbury, Folkestone and more, plus voluntary interview stations in almost every town. A firm in one part of the county may not have representatives near a station at the other end. A Kent-wide agent avoids the firm maintaining presence at every location.</p>
<p>North Kent and Tonbridge are areas of regular attendance. See <a href="/police-station-rep-gravesend">Gravesend cover</a>, <a href="/police-station-rep-tonbridge">Tonbridge cover</a>, and <a href="/locations">all locations</a>.</p>

<h2>5) Managing peak demand</h2>
<p>When multiple clients are in custody simultaneously, or when a custody attendance coincides with a court commitment, firms instruct agents to handle overflow. Clear instructions for each matter and realistic prioritisation help manage competing demands. See <a href="/blog/when-to-instruct-police-station-agent">when to instruct an agent</a>.</p>

<h2>6) Attendance notes and handover</h2>
<p>A good agent returns detailed attendance notes — disclosure, advice, interview summary, outcome — so the firm can take over the matter immediately. This is the primary deliverable alongside the station attendance itself. See <a href="/blog/police-station-attendance-notes">attendance notes guide</a>.</p>
<p>Notes should be sent securely and promptly. Firms should not have to chase notes days after attendance. Agree delivery expectations when establishing a cover relationship.</p>

<h2>6a) Communication during attendance</h2>
<p>Firms appreciate updates during lengthy attendances — for example, when disclosure is received or when interview is about to begin. Agree communication preferences in advance. Some firms want a brief call after disclosure; others prefer a single note after attendance concludes.</p>

<h2>7) What to look for in an agent</h2>
<p>Firms should consider: extended-hours availability, Kent geographic knowledge, qualification level, note quality, communication responsiveness, and familiarity with Legal Aid billing requirements. A reliable agent becomes an extension of the firm's practice rather than an unknown quantity at each instruction.</p>

<h2>8) Single instructions and ongoing arrangements</h2>
<p>Some firms instruct ad hoc for individual matters. Others establish ongoing cover for regular overflow — agreeing billing, note format, and communication channels in advance. Both models work. See <a href="/start/solicitors-agent-cover">send instructions</a> and <a href="/blog/instructing-a-police-station-representative">instruction checklist</a>.</p>

<h2>9) Compliance and independence</h2>
<p>Agents act on the instructing firm's instruction. The firm retains conduct. The agent is independent of the police and bound by professional confidentiality and SRA standards. Police Station Agent is a private defence website — not Kent Police.</p>

<h2>10) Getting started with freelance cover</h2>
<p>If your firm has not used freelance agents before, start with a non-urgent voluntary interview instruction to test communication, note quality, and billing. Once satisfied, add the agent to your out-of-hours escalation list for custody matters. See <a href="/for-solicitors">police station cover for solicitors</a> and <a href="/contact">contact</a>.</p>
<p>Call <strong>01732 247427</strong> to discuss your firm's cover requirements. Text <strong>07535 494446</strong> if you cannot call.</p>

<h2>11) Freelance agents and firm reputation</h2>
<p>The agent attends on your firm's instruction. The client experiences the agent as an extension of your firm. Choosing a reliable, professional agent protects your firm's reputation at a critical stage of the criminal process. Detailed notes, punctual attendance, and clear communication with the client all reflect on the instructing firm.</p>

<h2>12) Accreditation and qualification</h2>
<p>Police station work may be undertaken by accredited police station representatives or qualified solicitors. Robert Cashman attends as a qualified solicitor through Tuckers Solicitors LLP. Firms requiring solicitor-level attendance for complex or high-profile matters should confirm qualification level when instructing any agent.</p>

<h2>13) Cost comparison with in-house rotas</h2>
<p>Maintaining an in-house overnight duty rota involves salary, training, and standby costs regardless of call volume. Freelance agents are instructed only when needed. For firms with moderate overnight demand, external cover is often more cost-effective than permanent staffing.</p>
${FIRM_EXPAND}`,
      `<p>If your firm needs freelance police station cover in Kent, telephone <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/police-station-rep-medway", label: "Medway cover" },
        { url: "/start/solicitors-agent-cover", label: "Send police station instructions" },
        { url: "/locations", label: "All locations" },
      ]
    ),
    faq: [
      {
        q: "Are freelance agents qualified solicitors?",
        a: "Cover may be by accredited representative or qualified solicitor depending on availability and the instruction. Robert Cashman attends as a qualified solicitor.",
      },
      {
        q: "Can we use an agent for a single instruction?",
        a: "Yes. Firms may instruct for individual matters or establish ongoing cover arrangements.",
      },
      {
        q: "Do agents cover voluntary interviews as well as custody?",
        a: "Yes. Agents attend both custody suites and voluntary interviews across Kent, subject to availability.",
      },
      {
        q: "How do we establish an ongoing cover relationship?",
        a: "Contact us to discuss your firm's requirements, billing, note format, and communication preferences.",
      },
    ],
  },

  // 10. kent-medway-firms
  {
    file: "2026-06-12-police-station-cover-firms-kent-medway.json",
    image: "/blog-images/motoring-driving-police-station-featured.jpg",
    imageAlt: "Police station cover for criminal defence firms in Kent and Medway",
    contentHtml: wrap(
      `<p>Criminal defence firms across Kent and Medway instruct police station agents for custody attendance and voluntary interviews when in-house cover is unavailable. This guide explains coverage across the county's main custody suites — including North Kent (Gravesend), Tonbridge, and Medway — and how firms can instruct Robert Cashman through Tuckers Solicitors LLP.</p>
${NOT_KENT_POLICE}`,
      "/blog-images/motoring-driving-police-station-featured.jpg",
      "Police station cover for criminal defence firms in Kent and Medway",
      takeaways([
        "Kent has several <strong>24-hour custody suites</strong> — Medway, North Kent (Gravesend), and Tonbridge among the main facilities.",
        "Voluntary interviews are held at <strong>stations across the county</strong>, not only custody suites.",
        "Firms instruct by telephone for <strong>urgent custody</strong> with client ID, custody record, and DSCC reference.",
        "Robert Cashman covers <strong>Kent-wide</strong> with regular Gravesend, Tonbridge, and Medway attendance.",
      ]),
      `<h2>1) Police station cover for Kent and Medway firms</h2>
<p>Criminal defence firms in Gillingham, Chatham, Rochester, Dartford, Maidstone, Canterbury and across the county need reliable police station attendance for clients in custody and at voluntary interviews. When in-house representatives are unavailable — through hours, capacity, conflict, or geography — instructing an external agent maintains client service.</p>
<p>Robert Cashman attends through Tuckers Solicitors LLP (SRA ID: 127795), covering Kent custody suites and voluntary interviews by firm instruction, subject to availability.</p>

<h2>2) Medway custody suite</h2>
<p>Medway custody suite serves Gillingham, Chatham, Rochester and the wider Medway area. Firms instructing Medway cover should include client name, date of birth, custody record number, and DSCC reference. Telephone for urgent custody. See <a href="/police-station-rep-medway">Medway cover page</a> and <a href="/coverage/areas/medway">Medway area hub</a>.</p>

<h2>3) North Kent (Gravesend) custody</h2>
<p>North Kent custody at Thames Way, Northfleet (DA11 8BD) covers Gravesend, Dartford, and north Kent. It is a high-volume 24-hour suite and a frequent instruction location. See <a href="/police-station-rep-gravesend">Gravesend cover</a> and <a href="/coverage/areas/north-kent">North Kent area hub</a>.</p>

<h2>4) Tonbridge and west Kent</h2>
<p>Tonbridge operates west Kent's main 24-hour custody suite. Voluntary interviews are also held at Sevenoaks, Tunbridge Wells and other west Kent stations. See <a href="/police-station-rep-tonbridge">Tonbridge cover</a> and <a href="/coverage/areas/west-kent">West Kent area hub</a>.</p>

<h2>5) Other Kent custody suites</h2>
<p>Canterbury, Folkestone, Maidstone, and other stations also host custody and voluntary interview activity. Operational routing means a client arrested in one area may be detained at another suite. Firms should confirm the actual station when instructing. See <a href="/police-stations">police station directory</a> and <a href="/kent-police-custody-resources">Kent custody resources</a>.</p>

<h2>6) Voluntary interviews across the county</h2>
<p>Voluntary interviews under caution are scheduled at stations throughout Kent and Medway — often with days or weeks of notice. Firms instruct agents when no in-house representative is available at the interview time. Early instruction allows disclosure review. See <a href="/voluntary-police-interview">voluntary interview advice</a>.</p>

<h2>7) How to instruct cover</h2>
<p>Telephone <strong>01732 247427</strong> for urgent custody. Include client details, station, custody record number, and DSCC reference. For scheduled voluntary interviews, telephone or email with date, time, and allegation summary. See <a href="/blog/instructing-a-police-station-representative">instruction checklist</a>, <a href="/start/solicitors-agent-cover">send instructions</a>, and <a href="/for-solicitors">firm cover page</a>.</p>

<h2>8) Attendance notes and billing</h2>
<p>After each attendance, the firm receives notes covering disclosure, advice, interview, and outcome. Agree note format and billing expectations when establishing a cover relationship. See <a href="/blog/police-station-attendance-notes">attendance notes guide</a>.</p>

<h2>9) Legal Aid and private matters</h2>
<p>Firms instruct for both Legal Aid and private client attendances. Confirm scheme requirements and billing arrangements when instructing. The attending representative acts on the firm's instruction throughout.</p>
<p>Legal Aid police station attendance has specific billing and quality requirements. Private instructions may follow hourly or fixed-fee arrangements agreed between the firm and the agent. Confirm the basis before instruction to avoid misunderstanding.</p>

<h2>10) Single firm contact for Kent-wide cover</h2>
${KENT_WIDE}
<p>One contact can cover instructions from Medway to Maidstone, Gravesend to Folkestone. Browse <a href="/locations">all locations</a> and <a href="/coverage">coverage map</a>.</p>

<h2>11) Medway and north Kent working together</h2>
<p>Firms covering both Medway and north Kent benefit from a single agent contact who attends both areas regularly. Arrests in Gillingham, Chatham, Gravesend, and Dartford may route to different custody suites depending on operational factors. A Kent-wide agent can follow the client to whichever suite holds them.</p>

<h2>12) Canterbury, Folkestone and east Kent</h2>
<p>East Kent firms in Canterbury, Folkestone, Dover and Ashford also instruct cover for local custody and voluntary interviews. While North Kent, Tonbridge and Medway are the busiest 24-hour suites, east Kent stations host regular voluntary interview activity. A single Kent-wide contact simplifies instructions for firms covering the whole county.</p>

<h2>13) Maidstone and mid-Kent</h2>
<p>Maidstone and mid-Kent stations regularly host voluntary interviews for clients across the county town and surrounding villages. Firms in Maidstone, Sevenoaks and Tunbridge Wells can instruct a single agent for the whole county rather than maintaining separate contacts for each area. Include station, interview time, and client details in every instruction.</p>

<h2>14) Getting started with Kent-wide cover</h2>
<p>Contact <strong>01732 247427</strong> to discuss your firm's Kent and Medway cover requirements. Whether you need ad hoc instructions or an ongoing arrangement, agree billing, note format, and communication preferences before the first urgent custody call.</p>

<h2>15) Summary for Kent and Medway firms</h2>
<p>Kent and Medway criminal defence firms instruct police station agents when in-house cover is unavailable. Telephone for urgent custody with client name, date of birth, station, custody record number, and DSCC reference. Robert Cashman attends across the county through Tuckers Solicitors LLP, with regular attendance at Medway, North Kent (Gravesend), and Tonbridge among other stations. Attendance is subject to availability.</p>
${FIRM_EXPAND}`,
      `<p>For Kent and Medway police station cover, telephone <strong>01732 247427</strong> with complete instructions. Text <strong>07535 494446</strong> if you cannot call. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>`,
      BASE_EXTERNAL,
      [
        { url: "/for-solicitors", label: "Cover for solicitors" },
        { url: "/police-station-rep-medway", label: "Medway cover" },
        { url: "/police-station-rep-gravesend", label: "Gravesend cover" },
        { url: "/police-station-rep-tonbridge", label: "Tonbridge cover" },
      ]
    ),
    faq: [
      {
        q: "Do you cover both Legal Aid and private clients?",
        a: "Firms instruct for both. Confirm billing and scheme requirements when instructing.",
      },
      {
        q: "Which custody suites do you attend most frequently?",
        a: "North Kent (Gravesend), Tonbridge, and Medway are among the main 24-hour suites and areas of regular attendance. Cover extends across Kent subject to availability.",
      },
      {
        q: "How do we instruct for Medway custody?",
        a: "Telephone with client name, date of birth, custody record number, and DSCC reference. Remain contactable while attendance is arranged.",
      },
      {
        q: "Can one agent cover our whole Kent practice?",
        a: "Yes. A single contact can accept instructions for custody and voluntary interviews across the county, subject to availability.",
      },
    ],
  },
];

console.log("Rewriting June 2026 blog posts...\n");

for (const post of posts) {
  const filePath = path.join(OUT, post.file);
  const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
  existing.contentHtml = post.contentHtml;
  existing.featuredImage = post.image;
  existing.featuredImageAlt = post.imageAlt;
  if (post.faq) existing.faq = post.faq;
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2) + "\n");
  const words = wordCount(post.contentHtml);
  console.log(`✓ ${post.file} — ~${words} words`);
}

console.log(`\nDone. Updated ${posts.length} files.`);
