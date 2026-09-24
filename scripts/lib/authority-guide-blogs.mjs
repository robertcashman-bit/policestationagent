/** Authority guide blog definitions — Kent companion posts linking to canonical guide pages. */
import { LEGAL_ACCURACY_DISCLAIMER_HTML } from "./legal-accuracy-disclaimer-html.mjs";

export const NOT_KENT =
  "<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>";

export const CTA = `<div class="advert-cta" style="background-color: #fef2f2; border: 2px solid #dc2626; border-radius: 12px; padding: 1.5rem; margin: 2rem 0;">
<h2 style="margin-top: 0; color: #991b1b; font-size: 1.25rem;">Need legal advice at a Kent police station?</h2>
<p style="margin: 0.75rem 0;">Call <strong>01732 247427</strong> for custody or a booked voluntary interview. If you cannot call, text <strong>07535 494446</strong>.</p>
<p style="margin: 0.75rem 0;">Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).</p>
<p style="margin: 0.75rem 0 0;"><a href="/contact">Contact Police Station Agent</a> · <a href="/start/in-custody">Someone in custody now</a></p>
</div>`;

export function buildBlogHtml({ intro, img, takeaways, sections, related, guideUrl, guideLabel, sourcesHtml }) {
  return `<div class="blog-content">
<h2>Introduction</h2>
${intro}
${NOT_KENT}

<figure class="blog-image">
  <img src="${img.path}" alt="${img.alt.replace(/"/g, "&quot;")}" loading="lazy" width="800" height="400" />
  <figcaption>${img.caption}</figcaption>
</figure>

<div class="key-takeaways" style="background-color: #e8f4fd; border-left: 4px solid #2563eb; padding: 1rem; margin: 1.25rem 0 1.5rem;">
  <h2 class="key-takeaways-heading">Key takeaways</h2>
  <ul style="margin-bottom: 0;">
${takeaways.map((t) => `    <li>${t}</li>`).join("\n")}
  </ul>
</div>

${sections}

<h2>Related guides</h2>
<ul>
  <li><a href="${guideUrl}">${guideLabel} (full guide)</a></li>
${related.map((r) => `  <li><a href="${r.href}">${r.label}</a></li>`).join("\n")}
</ul>

${CTA}

<h2>Conclusion</h2>
<p>This article is general information for people attending Kent police stations. For advice about your own case, speak to a qualified solicitor before interview.</p>

<h2>Sources</h2>
${sourcesHtml}
${LEGAL_ACCURACY_DISCLAIMER_HTML}
</div>`;
}

export const AUTHORITY_BLOGS = [
  {
    date: "2026-06-21",
    slug: "can-police-take-my-phone-kent",
    title: "Can Police Take My Phone at a Kent Police Station? Your Rights Explained",
    category: "Police Station Advice",
    primaryKeyword: "can police take my phone kent",
    secondaryKeywords: ["phone seizure PACE", "RIPA section 49 PIN", "police keep my phone", "voluntary interview phone"],
    metaTitle: "Can Police Take My Phone in Kent? — PACE & RIPA Guide",
    metaDescription: "When Kent police can seize your phone on arrest, PIN/password rules under RIPA s.49, how long they can keep it, and voluntary interview rights. General information with official sources.",
    guideUrl: "/can-police-take-my-phone",
    guideLabel: "Can police take my phone? — full UK guide",
    faq: [
      { q: "Can police take my phone when I'm arrested in Kent?", a: "Yes, in many cases. PACE search powers after arrest (s.32, s.54) and premises search powers (s.18, s.19) may allow seizure where there are reasonable grounds to believe the phone contains evidence." },
      { q: "Do I have to give police my phone PIN?", a: "Not automatically. Police may serve a formal RIPA section 49 notice requiring disclosure — refusal can be an offence under section 53. Always take legal advice first." },
      { q: "How long can police keep my phone?", a: "PACE section 22 allows retention so long as is necessary — forensic examination can take weeks or months. You may request return when no longer needed." },
      { q: "Can police take my phone at a voluntary interview?", a: "At a voluntary interview you are not under arrest, so PACE arrest search powers do not automatically apply. Ask what power is relied on and take legal advice before handing over your device." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>If you are arrested or invited for interview at a Kent police station, you may be asked to hand over your mobile phone — or find it has been seized from your bag or pocket. Phones are central to many investigations: messages, location data, photos and app activity are often compared with your account in interview.</p>
<p>This Kent-focused article summarises when police may take your phone, how that differs from examining its contents, and what RIPA section 49 means for PINs and passwords. For the full statutory guide, see our <a href="/can-police-take-my-phone">Can police take my phone?</a> page.</p>`,
        img,
        takeaways: [
          "<strong>Seizure and examination are different</strong> — police may take the device under PACE search powers but accessing encrypted data may need forensic work or a RIPA s.49 notice.",
          "On <strong>arrest</strong>, phones may be seized under PACE <strong>s.32</strong> (search after arrest), <strong>s.54</strong> (custody search), <strong>s.18</strong> (premises search) or <strong>s.19</strong> (general seizure during lawful search).",
          "You are <strong>not generally obliged</strong> to unlock your phone without a formal RIPA section 49 notice — take legal advice before complying.",
          "Retention must be <strong>no longer than necessary</strong> (PACE s.22); property should be returned on release unless needed as evidence (Code C).",
          "<strong>Free legal advice</strong> is available at Kent custody suites and voluntary interviews under PACE section 58.",
        ],
        sections: `<h2>When can police take your phone in Kent?</h2>
<p>Kent Police operate 24-hour custody suites including Medway, North Kent (Gravesend), Tonbridge and Canterbury, plus voluntary interview stations at Maidstone, Sevenoaks and elsewhere. The legal powers are the same across England and Wales — local context mainly affects where you are detained and how quickly a solicitor can attend.</p>
<h3>On arrest — search of your person</h3>
<p>PACE section 32 allows a constable who has arrested you elsewhere than at a police station to search you if they have reasonable grounds to believe you may conceal evidence. A phone may be seized if the officer reasonably believes it may contain evidence relevant to the investigation.</p>
<h3>At the police station</h3>
<p>Under PACE section 54, the custody officer may search you and seize property including a phone where there are reasonable grounds to believe it is evidence or could be used to interfere with the investigation.</p>
<h3>Voluntary interviews</h3>
<p>If you attend a voluntary interview under caution at Maidstone, Dartford or another Kent station, you are not under arrest. If officers ask for your phone, ask what statutory power they rely on and take legal advice before handing it over. See our <a href="/voluntary-police-interview">voluntary interview guide</a>.</p>

<h2>PINs, passwords and RIPA section 49</h2>
<p>There is no general common-law duty to help police unlock a device. However, under <strong>RIPA section 49</strong>, a formal notice may require disclosure of a key or password to protected information. Schedule 2 governs authorisation — for police, typically a superintendent or above. Knowingly failing to comply can be an offence under <strong>section 53</strong>. If you receive a section 49 notice, take urgent legal advice.</p>

<h2>How long can police keep your phone?</h2>
<p>PACE section 22 allows retention so long as is necessary in all the circumstances — forensic downloads often take weeks or months. Section 22(4) provides that if a photograph or copy would suffice, the original should not be retained. If you are released without charge, ask for your phone back in writing; disputes may be taken to the magistrates' court under the Police (Property) Act 1897.</p>

<h2>What a solicitor can do</h2>
<p>A duty solicitor or accredited representative can advise before you unlock a device, challenge inadequate disclosure before interview, and write to the investigating officer about return of property. Legal advice at the police station is free under Legal Aid for most interviews.</p>`,
        related: [
          { href: "/blog/how-digital-evidence-voluntary-police-interview", label: "Digital evidence in voluntary interviews" },
          { href: "/police-interview-rights", label: "Police interview rights" },
          { href: "/blog/kent-custody-after-arrest-process", label: "Kent custody after arrest" },
          { href: "/voluntary-police-interview", label: "Voluntary police interview guide" },
        ],
        guideUrl: "/can-police-take-my-phone",
        guideLabel: "Can police take my phone? — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/32" rel="noopener noreferrer">PACE 1984, section 32</a> — search after arrest</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/54" rel="noopener noreferrer">PACE 1984, section 54</a> — search of detained persons</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/19" rel="noopener noreferrer">PACE 1984, section 19</a> — general power of seizure</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/22" rel="noopener noreferrer">PACE 1984, section 22</a> — retention of seized property</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/2000/23/section/49" rel="noopener noreferrer">RIPA 2000, section 49</a> — disclosure notices</li>
  <li><a href="https://www.legislation.gov.uk/ukpga/2000/23/section/53" rel="noopener noreferrer">RIPA 2000, section 53</a> — failure to comply offence</li>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-21",
    slug: "police-bail-explained-kent",
    title: "Police Bail Explained for Kent: Conditions, Time Limits and Your Rights",
    category: "Police Station Advice",
    primaryKeyword: "police bail explained kent",
    secondaryKeywords: ["pre-charge bail", "PACE 47ZB", "bail conditions breach", "RUI vs bail"],
    metaTitle: "Police Bail in Kent — Conditions & Time Limits",
    metaDescription: "What police bail means after release from Kent custody, pre-charge time limits under PACE, conditions, breach and RUI. General information with official sources.",
    guideUrl: "/police-bail-explained",
    guideLabel: "Police bail explained — full UK guide",
    faq: [
      { q: "What is police bail?", a: "Police bail is release from custody with conditions and a return date while the investigation continues." },
      { q: "How long can police bail last?", a: "The initial applicable bail period is generally three months under PACE s.47ZB, with extensions possible under PACE and in some cases by the magistrates' court." },
      { q: "What is the difference between bail and RUI?", a: "Bail usually involves conditions and a return date. Released under investigation (RUI) is release without bail conditions." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>After arrest at a Kent custody suite, you may be released on <strong>police bail</strong> rather than charged or given no further action. Bail means the investigation continues and you must return to the police station on a set date, often with conditions such as not contacting witnesses or staying away from certain areas.</p>
<p>This article explains bail in plain English for Kent detainees. The full statutory guide is at <a href="/police-bail-explained">police bail explained</a>.</p>`,
        img,
        takeaways: [
          "Police bail is <strong>pre-charge release with conditions</strong> and a return date.",
          "The initial <strong>applicable bail period</strong> is generally <strong>three months</strong> (PACE s.47ZB), extendable under PACE and sometimes by court.",
          "Breaching bail conditions may lead to arrest under PACE s.46A.",
          "<strong>RUI</strong> (released under investigation) is different — typically no bail conditions.",
          "Always take legal advice before agreeing to conditions you may struggle to comply with.",
        ],
        sections: `<h2>What happens at Kent custody suites?</h2>
<p>After interview at Medway, Gravesend, Tonbridge or Canterbury, the custody officer decides whether to charge, release on bail, release under investigation, or take no further action. Bail decisions should be recorded on your custody record.</p>
<h2>Common bail conditions</h2>
<p>Conditions may include living at a specified address, reporting to a police station, not contacting named people, curfews, or exclusion zones. Conditions must be necessary and proportionate. A solicitor can argue against unreasonable conditions.</p>
<h2>Extensions and court oversight</h2>
<p>Extensions beyond the initial period are governed by PACE sections 47ZD, 47ZF and 47ZG. In some cases magistrates' court approval is required. See CPS bail guidance for the prosecution perspective.</p>
<h2>Bail vs RUI</h2>
<p>See our <a href="/blog/released-under-investigation-kent-plain-english">RUI in plain English</a> article and <a href="/released-under-investigation">RUI guide</a> for the difference.</p>`,
        related: [
          { href: "/blog/released-under-investigation-kent-plain-english", label: "Released under investigation — Kent" },
          { href: "/blog/no-further-action-after-police-interview-kent", label: "No further action after interview" },
          { href: "/custody-time-limits", label: "Custody time limits" },
        ],
        guideUrl: "/police-bail-explained",
        guideLabel: "Police bail explained — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/47ZB" rel="noopener noreferrer">PACE 1984, section 47ZB</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/46A" rel="noopener noreferrer">PACE 1984, section 46A</a></li>
  <li><a href="https://www.cps.gov.uk/prosecution-guidance/bail" rel="noopener noreferrer">CPS — Bail prosecution guidance</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-22",
    slug: "no-comment-interview-kent",
    title: "No Comment Interview at a Kent Police Station: When Silence Makes Sense",
    category: "Police Station Advice",
    primaryKeyword: "no comment interview kent",
    secondaryKeywords: ["right to silence", "CJPOA section 34", "adverse inference", "police interview"],
    metaTitle: "No Comment Interview Kent — Silence & Adverse Inference",
    metaDescription: "When to answer no comment in a Kent police interview, section 34 CJPOA adverse inferences, and why legal advice matters before you decide.",
    guideUrl: "/no-comment-interview",
    guideLabel: "No comment interview — full UK guide",
    faq: [
      { q: 'What does "no comment" mean?', a: "It means declining to answer a question in interview. You have the right to do so, but section 34 CJPOA 1994 may allow adverse inferences in some circumstances." },
      { q: "Can I be punished for no comment?", a: "Section 34 allows a court or jury to draw inferences that appear proper where you fail to mention facts later relied on in defence, if it was reasonable to mention them when questioned." },
      { q: "Should I go no comment in Kent?", a: "It depends on disclosure, the strength of evidence, and your solicitor's advice. Always get free legal advice under PACE section 58 before deciding." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>At a Kent police interview — whether in custody at Medway or Gravesend or at a voluntary station such as Maidstone — you may hear advice to answer <strong>"no comment"</strong> to questions. That is a tactical decision with serious consequences: silence can protect you, but section 34 of the Criminal Justice and Public Order Act 1994 may allow adverse inferences in some cases.</p>
<p>Read the full guide at <a href="/no-comment-interview">no comment interview</a>.</p>`,
        img,
        takeaways: [
          'You may answer <strong>"no comment"</strong> to any question — but silence is not always risk-free.',
          "<strong>Section 34 CJPOA 1994</strong> may allow adverse inferences if you later rely on facts you did not mention when questioned.",
          "Common reasons for no comment: <strong>inadequate disclosure</strong>, need to investigate, or solicitor advice.",
          "A <strong>prepared statement</strong> may be a middle ground — see our prepared statements guide.",
          "Free legal advice is available at Kent police stations under PACE section 58.",
        ],
        sections: `<h2>When might no comment be appropriate?</h2>
<p>Your solicitor may advise no comment when police have not disclosed enough about the allegation, when you need time to obtain evidence (CCTV, witnesses, phone records), or when questions are confusing or misleading. At Kent voluntary interviews, disclosure is often limited — legal advice before attendance is essential.</p>
<h2>Adverse inferences</h2>
<p>Section 34 CJPOA 1994 is complex. The court or jury may draw inferences that appear proper from failure to mention facts when questioned under caution, if it was reasonable to mention them. See our <a href="/adverse-inference">adverse inference guide</a>.</p>
<h2>Prepared statements as an alternative</h2>
<p>A prepared statement puts key facts on record while you answer no comment to further questions. Whether this reduces inference risk depends on the case. See <a href="/prepared-statements">prepared statements guide</a> and <a href="/blog/prepared-statements-kent">Kent prepared statements article</a>.</p>`,
        related: [
          { href: "/adverse-inference", label: "Adverse inference guide" },
          { href: "/prepared-statements", label: "Prepared statements" },
          { href: "/blog/how-digital-evidence-voluntary-police-interview", label: "Digital evidence in interviews" },
        ],
        guideUrl: "/no-comment-interview",
        guideLabel: "No comment interview — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1994/33/section/34" rel="noopener noreferrer">CJPOA 1994, section 34</a></li>
  <li><a href="https://www.cps.gov.uk/legal-guidance/adverse-inference" rel="noopener noreferrer">CPS — Adverse inference guidance</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/58" rel="noopener noreferrer">PACE 1984, section 58</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-22",
    slug: "prepared-statements-kent",
    title: "Prepared Statements in Kent Police Interviews: A Practical Guide",
    category: "Police Station Advice",
    primaryKeyword: "prepared statement police interview kent",
    secondaryKeywords: ["no comment prepared statement", "police interview strategy", "PACE interview"],
    metaTitle: "Prepared Statements — Kent Police Interview Guide",
    metaDescription: "How prepared statements work in Kent police interviews, when they may be used instead of full answers, and why solicitor advice is essential.",
    guideUrl: "/prepared-statements",
    guideLabel: "Prepared statements — full UK guide",
    faq: [
      { q: "What is a prepared statement?", a: "A written statement read at the start of interview that sets out your account, after which you may answer no comment to further questions." },
      { q: "Is a prepared statement better than no comment?", a: "It can be a middle ground, but whether it reduces adverse inference risk depends on the facts and what was reasonable to mention." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>A <strong>prepared statement</strong> is a written account read aloud at the start of a police interview. It can put your version of events on the record while you answer "no comment" to further questions — a strategy often used at Kent custody suites and voluntary interview stations.</p>
<p>Full guide: <a href="/prepared-statements">prepared statements</a>.</p>`,
        img,
        takeaways: [
          "A prepared statement is <strong>read at the start</strong> of interview and recorded.",
          "It may be combined with <strong>no comment</strong> answers to police questions.",
          "Content must be accurate — false statements can have serious consequences.",
          "Your solicitor drafts or approves the statement based on disclosure.",
          "See also <a href=\"/no-comment-interview\">no comment interview</a> and <a href=\"/adverse-inference\">adverse inference</a>.",
        ],
        sections: `<h2>When is a prepared statement used?</h2>
<p>Common scenarios include limited police disclosure, complex allegations where you need time to investigate, or cases where putting a concise account on record is tactically sensible. Your solicitor decides based on the evidence and section 34 CJPOA risks.</p>
<h2>Kent police station context</h2>
<p>Prepared statements are used in custody at Medway, Tonbridge, Gravesend and Canterbury, and at voluntary interviews across Kent. Attendance notes record the statement for the defence file.</p>`,
        related: [
          { href: "/no-comment-interview", label: "No comment interview" },
          { href: "/adverse-inference", label: "Adverse inference" },
          { href: "/blog/no-comment-interview-kent", label: "No comment in Kent" },
        ],
        guideUrl: "/prepared-statements",
        guideLabel: "Prepared statements — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1994/33/section/34" rel="noopener noreferrer">CJPOA 1994, section 34</a></li>
  <li><a href="https://www.cps.gov.uk/legal-guidance/adverse-inference" rel="noopener noreferrer">CPS — Adverse inference guidance</a></li>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-23",
    slug: "adverse-inference-kent",
    title: "Adverse Inference in Kent Police Interviews: What Silence Can Mean at Court",
    category: "Police Station Advice",
    primaryKeyword: "adverse inference police interview kent",
    secondaryKeywords: ["CJPOA section 34", "no comment consequences", "failure to mention facts"],
    metaTitle: "Adverse Inference Kent — Police Interview Guide",
    metaDescription: "How section 34 CJPOA adverse inferences may apply after a Kent police interview, and why legal advice before interview matters.",
    guideUrl: "/adverse-inference",
    guideLabel: "Adverse inference — full UK guide",
    faq: [
      { q: "What is an adverse inference?", a: "An inference a court or jury may draw under section 34 CJPOA 1994 from failure to mention facts when questioned under caution, where you later rely on those facts in defence." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>If you answered "no comment" at a Kent police station and later rely on facts in your defence at court, the prosecution may invite the jury to draw an <strong>adverse inference</strong> under section 34 of the Criminal Justice and Public Order Act 1994. Understanding this before interview helps you make an informed decision with your solicitor.</p>
<p>Full guide: <a href="/adverse-inference">adverse inference explained</a>.</p>`,
        img,
        takeaways: [
          "<strong>Section 34 CJPOA 1994</strong> governs inferences from failure to mention facts when questioned under caution.",
          "Inferences are <strong>not automatic</strong> — the court directs the jury and considers what was reasonable.",
          "A <strong>prepared statement</strong> may mention key facts while you stay silent on questions.",
          "Always get legal advice <strong>before</strong> interview at Kent custody or voluntary stations.",
        ],
        sections: `<h2>How section 34 works in practice</h2>
<p>The prosecution must satisfy the statutory conditions before a jury can be invited to draw inferences. CPS guidance on adverse inference explains the direction given to juries. Your solicitor assesses risk based on disclosure and your account.</p>
<h2>Link to no comment strategy</h2>
<p>See <a href="/blog/no-comment-interview-kent">no comment interview Kent</a> and <a href="/no-comment-interview">full no comment guide</a>.</p>`,
        related: [
          { href: "/no-comment-interview", label: "No comment interview" },
          { href: "/prepared-statements", label: "Prepared statements" },
        ],
        guideUrl: "/adverse-inference",
        guideLabel: "Adverse inference — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1994/33/section/34" rel="noopener noreferrer">CJPOA 1994, section 34</a></li>
  <li><a href="https://www.cps.gov.uk/legal-guidance/adverse-inference" rel="noopener noreferrer">CPS — Adverse inference guidance</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-23",
    slug: "custody-time-limits-kent",
    title: "How Long Can Police Hold You in Kent? Custody Time Limits Explained",
    category: "Police Station Advice",
    primaryKeyword: "custody time limits kent",
    secondaryKeywords: ["PACE detention", "24 hour custody", "superintendent extension", "warrant further detention"],
    metaTitle: "Custody Time Limits Kent — How Long Police Can Hold You",
    metaDescription: "PACE custody time limits after arrest at Kent police stations: 24 hours, extensions, and when you must be released or charged.",
    guideUrl: "/custody-time-limits",
    guideLabel: "Custody time limits — full UK guide",
    faq: [
      { q: "How long can police hold me without charge?", a: "Generally up to 24 hours from arrival at the police station, extendable to 36 hours by a superintendent in serious arrestable cases, and further by magistrates' court warrant in limited circumstances." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>After arrest in Kent, you will usually be taken to a custody suite such as Medway, North Kent (Gravesend), Tonbridge or Canterbury. PACE sets strict <strong>custody time limits</strong> on how long you can be detained without charge.</p>
<p>Full guide: <a href="/custody-time-limits">custody time limits</a>.</p>`,
        img,
        takeaways: [
          "Standard detention is generally <strong>24 hours</strong> from arrival at the station (PACE s.41).",
          "A <strong>superintendent</strong> may authorise extension to <strong>36 hours</strong> in serious arrestable cases (s.42).",
          "Further detention requires <strong>magistrates' court</strong> warrant (s.43–44) in limited circumstances.",
          "You have the right to <strong>free legal advice</strong> (PACE s.58) and to have someone informed (s.56).",
        ],
        sections: `<h2>What happens at Kent custody suites?</h2>
<p>The custody officer authorises detention and reviews it regularly. You should receive a written notice of your rights. Time spent in hospital or travelling may affect calculations — your solicitor monitors the clock.</p>
<h2>Release without charge</h2>
<p>At the end of the authorised period, you must be charged, bailed, released under investigation, or released without bail. See <a href="/blog/kent-custody-after-arrest-process">Kent custody after arrest</a>.</p>`,
        related: [
          { href: "/blog/kent-custody-after-arrest-process", label: "Kent custody after arrest" },
          { href: "/police-custody-rights", label: "Police custody rights" },
          { href: "/your-rights-in-custody", label: "Your rights in custody" },
        ],
        guideUrl: "/custody-time-limits",
        guideLabel: "Custody time limits — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/41" rel="noopener noreferrer">PACE 1984, section 41</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/42" rel="noopener noreferrer">PACE 1984, section 42</a></li>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-24",
    slug: "pace-code-c-kent-guide",
    title: "PACE Code C at Kent Police Stations: Your Rights in Custody",
    category: "Police Station Advice",
    primaryKeyword: "PACE Code C kent police station",
    secondaryKeywords: ["Code C rights", "custody rights", "police detention", "appropriate adult"],
    metaTitle: "PACE Code C Kent — Custody Rights Guide",
    metaDescription: "What PACE Code C means for detainees at Kent custody suites: rights, reviews, interviews, vulnerability and appropriate adults.",
    guideUrl: "/pace-code-c",
    guideLabel: "PACE Code C — full UK guide",
    faq: [
      { q: "What is PACE Code C?", a: "Code C is the statutory code of practice for detention, treatment and questioning of suspects in police custody under PACE." },
      { q: "Does Code C apply to voluntary interviews?", a: "Many Code C provisions apply to voluntary attendances for interview under caution, not only cell detention." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p><strong>PACE Code C</strong> sets out how suspects must be treated in police custody — from booking-in at Medway or Gravesend to interview, reviews and release. It applies across Kent and England and Wales.</p>
<p>Full guide: <a href="/pace-code-c">PACE Code C overview</a>. For unfitness to interview specifically, see <a href="/blog/unfitness-to-interview-pace-code-c-kent">unfitness to interview Kent</a>.</p>`,
        img,
        takeaways: [
          "Code C covers <strong>detention, treatment and questioning</strong> in custody.",
          "You have rights to <strong>legal advice</strong> (PACE s.58), rest, food and medical care.",
          "<strong>Vulnerable</strong> suspects and <strong>juveniles</strong> need an appropriate adult for interview (Code C para 11.15).",
          "The custody officer must <strong>review detention</strong> regularly (Code C para 3).",
        ],
        sections: `<h2>Key Code C themes for Kent detainees</h2>
<p>Booking-in, custody record, searches, samples, interviews and bail/RUI decisions all fall under Code C. Breaches may affect whether evidence is excluded under PACE s.78 — but exclusion is not automatic.</p>
<h2>Related topics</h2>
<p>See <a href="/blog/unfitness-to-interview-pace-code-c-kent">unfitness to interview</a>, <a href="/appropriate-adult">appropriate adults</a>, and <a href="/blog/appropriate-adult-kent">appropriate adult Kent article</a>.</p>`,
        related: [
          { href: "/blog/unfitness-to-interview-pace-code-c-kent", label: "Unfitness to interview" },
          { href: "/appropriate-adult", label: "Appropriate adult guide" },
          { href: "/resources/pace-rights-guide", label: "PACE rights guide" },
        ],
        guideUrl: "/pace-code-c",
        guideLabel: "PACE Code C — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/58" rel="noopener noreferrer">PACE 1984, section 58</a></li>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/section/76" rel="noopener noreferrer">PACE 1984, section 76</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-24",
    slug: "youth-custody-rights-kent",
    title: "Youth Custody Rights in Kent: Under 18 at a Police Station",
    category: "Police Station Advice",
    primaryKeyword: "youth custody rights kent",
    secondaryKeywords: ["under 18 police station", "appropriate adult juvenile", "PACE Code C youth"],
    metaTitle: "Youth Custody Rights Kent — Under 18 Guide",
    metaDescription: "Rights of under-18s detained at Kent police stations: appropriate adult, legal advice, interview safeguards under PACE Code C.",
    guideUrl: "/youth-custody-rights",
    guideLabel: "Youth custody rights — full UK guide",
    faq: [
      { q: "Does an under-18 need an appropriate adult?", a: "Yes — a juvenile must not be interviewed about an offence without an appropriate adult except in limited urgent circumstances (Code C para 11.15)." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>If someone under 18 is detained at a Kent police station, <strong>PACE Code C</strong> provides extra safeguards: an <strong>appropriate adult</strong>, additional welfare checks, and restrictions on interview without proper support.</p>
<p>Full guide: <a href="/youth-custody-rights">youth custody rights</a>.</p>`,
        img,
        takeaways: [
          "Juveniles must have an <strong>appropriate adult</strong> for interview in most cases.",
          "Parents or carers should be informed — see <a href=\"/blog/immediate-family-instruct-police-station-solicitor\">family instructing a solicitor</a>.",
          "Free legal advice is available under PACE section 58.",
          "Welfare and vulnerability reviews apply under Code C.",
        ],
        sections: `<h2>Kent custody suites and youth detention</h2>
<p>Medway, Gravesend, Tonbridge and Canterbury operate youth custody procedures. Voluntary interviews for under-18s also require appropriate adult presence in most cases.</p>`,
        related: [
          { href: "/appropriate-adult", label: "Appropriate adult guide" },
          { href: "/blog/appropriate-adult-kent", label: "Appropriate adult Kent" },
          { href: "/blog/immediate-family-instruct-police-station-solicitor", label: "Family arranging legal advice" },
        ],
        guideUrl: "/youth-custody-rights",
        guideLabel: "Youth custody rights — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a> — paragraphs 1.5, 11.15–11.20</li>
  <li><a href="https://www.cps.gov.uk/prosecution-guidance/mental-health-suspects-and-defendants" rel="noopener noreferrer">CPS — Vulnerable suspects guidance</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-25",
    slug: "appropriate-adult-kent",
    title: "Appropriate Adults at Kent Police Stations: Who They Are and When You Need One",
    category: "Police Station Advice",
    primaryKeyword: "appropriate adult kent police station",
    secondaryKeywords: ["vulnerable suspect", "PACE Code C 11.15", "juvenile interview"],
    metaTitle: "Appropriate Adult Kent — Police Station Guide",
    metaDescription: "When an appropriate adult is required at Kent police interviews for juveniles and vulnerable suspects under PACE Code C.",
    guideUrl: "/appropriate-adult",
    guideLabel: "Appropriate adult — full UK guide",
    faq: [
      { q: "Who can be an appropriate adult?", a: "Usually a parent, guardian, social worker, or other responsible adult who is not a police officer. They must not be a witness in the case." },
      { q: "What does an appropriate adult do?", a: "They advise the detainee, observe whether the interview is fair, and facilitate communication — Code C paragraphs 1.7A and 11.17." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>An <strong>appropriate adult</strong> supports juveniles and vulnerable suspects during police custody and interview. At Kent stations, failure to provide one when Code C requires it can affect the fairness of proceedings.</p>
<p>Full guide: <a href="/appropriate-adult">appropriate adult explained</a>.</p>`,
        img,
        takeaways: [
          "Required for <strong>juveniles</strong> and many <strong>vulnerable</strong> adults (Code C para 1.13(d)).",
          "Must be present for interview in most cases (para 11.15).",
          "Role includes advising, observing and facilitating communication.",
          "See also <a href=\"/blog/unfitness-to-interview-pace-code-c-kent\">unfitness to interview</a> and <a href=\"/vulnerable-adults-in-custody\">vulnerable adults</a>.",
        ],
        sections: `<h2>Vulnerability and fitness to interview</h2>
<p>Healthcare professionals advise on fitness; appropriate adults support communication. See <a href="/blog/unfitness-to-interview-pace-code-c-kent">unfitness to interview under Code C</a>.</p>`,
        related: [
          { href: "/youth-custody-rights", label: "Youth custody rights" },
          { href: "/vulnerable-adults-in-custody", label: "Vulnerable adults in custody" },
          { href: "/blog/unfitness-to-interview-pace-code-c-kent", label: "Unfitness to interview" },
        ],
        guideUrl: "/appropriate-adult",
        guideLabel: "Appropriate adult — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a></li>
  <li><a href="https://www.cps.gov.uk/prosecution-guidance/mental-health-suspects-and-defendants" rel="noopener noreferrer">CPS — Mental health suspects and defendants</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
  {
    date: "2026-06-25",
    slug: "dna-fingerprints-police-station-kent",
    title: "DNA and Fingerprints at Kent Police Stations: Your Rights",
    category: "Police Station Advice",
    primaryKeyword: "DNA fingerprints police station kent",
    secondaryKeywords: ["PACE samples", "biometric data", "police custody samples"],
    metaTitle: "DNA & Fingerprints Kent — Police Station Rights",
    metaDescription: "When Kent police can take DNA and fingerprints in custody, your rights under PACE and what happens to biometric data.",
    guideUrl: "/dna-fingerprints-police-station",
    guideLabel: "DNA & fingerprints — full UK guide",
    faq: [
      { q: "Can police take my DNA in custody?", a: "Non-intimate samples including mouth swabs may be taken without consent in certain circumstances under PACE with authorisation. Intimate samples have stricter rules." },
    ],
    build: (img) =>
      buildBlogHtml({
        intro: `<p>At Kent custody suites, police may seek <strong>fingerprints, photographs and DNA samples</strong> during detention. PACE and Code C set out when samples may be taken and what happens to biometric data.</p>
<p>Full guide: <a href="/dna-fingerprints-police-station">DNA and fingerprints at the police station</a>.</p>`,
        img,
        takeaways: [
          "PACE Part V governs <strong>samples, fingerprints and photographs</strong>.",
          "Different rules apply to <strong>intimate</strong> vs <strong>non-intimate</strong> samples.",
          "Data may be retained on national databases subject to deletion rules.",
          "Always take legal advice before consenting to procedures you do not understand.",
        ],
        sections: `<h2>What happens during booking-in?</h2>
<p>Fingerprinting and photographs are routine at many Kent custody suites. DNA mouth swabs require statutory authority in specified circumstances. Your solicitor can explain what is being requested and why.</p>
<p>See also <a href="/can-police-take-my-phone">phone seizure guide</a> for device examination — separate from biometric samples.</p>`,
        related: [
          { href: "/can-police-take-my-phone", label: "Can police take my phone?" },
          { href: "/blog/can-police-take-my-phone-kent", label: "Phone seizure Kent" },
          { href: "/police-custody-rights", label: "Police custody rights" },
        ],
        guideUrl: "/dna-fingerprints-police-station",
        guideLabel: "DNA & fingerprints — full UK guide",
        sourcesHtml: `<ul>
  <li><a href="https://www.legislation.gov.uk/ukpga/1984/60/part/V" rel="noopener noreferrer">PACE 1984, Part V — Samples etc.</a></li>
  <li><a href="https://www.gov.uk/government/publications/pace-code-c-2023/pace-code-c-2023-accessible" rel="noopener noreferrer">GOV.UK — PACE Code C 2023</a></li>
  <li><a href="https://www.sra.org.uk/consumers/register/organisation/?sraNumber=127795" rel="noopener noreferrer">SRA register — Tuckers Solicitors LLP (127795)</a></li>
</ul>`,
      }),
  },
];
