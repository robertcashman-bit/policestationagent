#!/usr/bin/env node
import fs from "fs";
import path from "path";

const OUT = path.join(process.cwd(), "data", "blog-posts");

const posts = [
  {
    file: "2026-06-12-instructing-a-police-station-representative.json",
    slug: "instructing-a-police-station-representative",
    title: "What to Send When Instructing a Police Station Representative",
    metaTitle: "Instructing a Police Station Representative | Kent",
    metaDescription:
      "What criminal defence firms should send when instructing police station cover: client details, custody record, DSCC reference, and interview information.",
    primaryKeyword: "instructing police station representative",
    content: `<div class="blog-content"><h2>In brief</h2><p>When instructing a police station representative, send client identity, station, custody record number, DSCC reference if available, interview time, allegation summary, and your firm contact details. Complete instructions help attendance be arranged promptly.</p><h2>Why clear instructions matter</h2><p>Criminal defence firms often need freelance police station cover at short notice. A representative must identify the correct client, locate the detention or interview, obtain disclosure, advise the client, and report back with attendance notes. Missing information causes delay.</p><h2>Essential details</h2><ul><li><strong>Client name and date of birth</strong></li><li><strong>Police station</strong> and whether custody or voluntary interview</li><li><strong>Custody record number</strong> if in detention</li><li><strong>DSCC reference</strong> where allocated</li><li><strong>Interview date and time</strong> for voluntary attendances</li><li><strong>Allegation summary</strong> and offence type if known</li><li><strong>Officer details</strong> if available</li><li><strong>Bail or RUI status</strong> if relevant</li><li><strong>Firm name and callback number</strong></li></ul><h2>Urgent custody</h2><p>For someone currently in custody, telephone instruction is preferred. Email is not suitable for immediate attendance. See our <a href="/contact">contact page</a> and <a href="/dscc-and-custody-record-support">DSCC and custody record guide</a>.</p><h2>Kent coverage</h2><p>We cover Kent custody suites including Medway, Gravesend, Canterbury and Folkestone, and voluntary interviews across Kent stations. See <a href="/for-solicitors">police station cover for solicitors</a>.</p><p><em>General information only. Not legal advice on a specific case.</em></p></div>`,
    faq: [
      {
        q: "Can I instruct by WhatsApp?",
        a: "Firms often send initial details by WhatsApp text, but urgent custody should be confirmed by telephone.",
      },
      {
        q: "What if I do not have the custody record number yet?",
        a: "Provide as much as you have; the representative can confirm details on arrival at the custody suite.",
      },
    ],
  },
  {
    file: "2026-06-12-custody-record-number-dscc-reference.json",
    slug: "custody-record-number-dscc-reference",
    title: "Custody Record Numbers and DSCC References Explained",
    metaTitle: "Custody Record Number and DSCC Reference",
    metaDescription:
      "Plain English explanation of custody record numbers and DSCC references when arranging police station representation in Kent.",
    primaryKeyword: "custody record number DSCC",
    content: `<div class="blog-content"><h2>In brief</h2><p>A custody record number identifies a person's detention on the custody suite system. A DSCC reference links a duty solicitor instruction to the Defence Solicitor Call Centre process. Both help arrange the correct police station attendance.</p><h2>Custody record</h2><p>When someone is booked into police custody, the custody officer creates a custody record. This records the detention, rights, reviews, and contacts with legal representatives. The reference number is used on the custody suite system.</p><h2>DSCC reference</h2><p>The Defence Solicitor Call Centre (DSCC) handles many duty solicitor contacts. When a reference is allocated, it helps match the instruction to the attendance. Firms instructing cover should include this where available.</p><h2>Practical tips for firms</h2><p>Ask your client, the custody suite, or the DSCC for references as early as possible. Include them in instructions to your police station agent. Read our page on <a href="/dscc-and-custody-record-support">DSCC and custody record support</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Is the DSCC reference the same as the custody record number?",
        a: "No. They are separate references used for different purposes in the instruction and custody process.",
      },
    ],
  },
  {
    file: "2026-06-12-when-to-instruct-police-station-agent.json",
    slug: "when-to-instruct-police-station-agent",
    title: "When Should a Solicitor Instruct a Police Station Agent?",
    metaTitle: "When to Instruct a Police Station Agent",
    metaDescription:
      "When criminal defence firms should instruct a freelance police station agent: custody, voluntary interviews, conflicts, and out-of-hours cover in Kent.",
    primaryKeyword: "when to instruct police station agent",
    content: `<div class="blog-content"><h2>In brief</h2><p>Instruct a police station agent when your firm needs attendance at a Kent custody suite or voluntary interview and no suitable in-house representative is available — including out of hours, for conflicts, or when volume exceeds capacity.</p><h2>Common scenarios</h2><ul><li><strong>Out-of-hours custody</strong> when your duty team is unavailable</li><li><strong>Voluntary interviews</strong> at stations across Kent</li><li><strong>Conflict of interest</strong> where your firm cannot act</li><li><strong>Capacity</strong> when multiple attendances clash</li><li><strong>Geographic coverage</strong> for stations your firm does not regularly attend</li></ul><h2>What to expect</h2><p>A qualified representative attends, advises the client, conducts the interview, and provides attendance notes for your file. See <a href="/for-solicitors">police station cover for solicitors</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Can agents attend on Legal Aid matters?",
        a: "Yes. Firms commonly instruct agents for Legal Aid police station attendance subject to scheme requirements.",
      },
    ],
  },
  {
    file: "2026-06-12-police-station-attendance-notes.json",
    slug: "police-station-attendance-notes",
    title: "Police Station Attendance Notes: Why They Matter for Firms",
    metaTitle: "Police Station Attendance Notes for Solicitors",
    metaDescription:
      "Why detailed police station attendance notes matter for criminal defence firms instructing freelance cover in Kent.",
    primaryKeyword: "police station attendance notes",
    content: `<div class="blog-content"><h2>In brief</h2><p>Attendance notes record disclosure, advice given, the interview, and outcome at the police station. They allow the instructing firm to take over the case with an accurate picture of what occurred.</p><h2>What good notes include</h2><ul><li>Client details and stage of investigation</li><li>Disclosure received and advice on interview strategy</li><li>Interview summary and significant answers</li><li>Outcome: charge, bail, RUI, NFA</li><li>Next steps and bail conditions if applicable</li></ul><h2>For instructing firms</h2><p>When instructing cover, confirm your firm's note format and deadline. See <a href="/start/solicitors-agent-cover">send police station instructions</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "How quickly should notes be sent?",
        a: "This depends on firm requirements; agree expectations when establishing a cover relationship.",
      },
    ],
  },
  {
    file: "2026-06-12-freelance-police-station-agents-for-solicitors.json",
    slug: "freelance-police-station-agents-for-solicitors",
    title: "Why Criminal Defence Firms Use Freelance Police Station Agents",
    metaTitle: "Freelance Police Station Agents for Solicitors",
    metaDescription:
      "Why Kent criminal defence firms use freelance police station agents for custody and voluntary interview cover.",
    primaryKeyword: "freelance police station agents",
    content: `<div class="blog-content"><h2>In brief</h2><p>Firms use freelance police station agents to provide reliable attendance when in-house staff are unavailable, to manage peak demand, and to cover stations across Kent without maintaining a full-time rota.</p><h2>Benefits for firms</h2><ul><li>Extended hours coverage without overnight staffing costs</li><li>Qualified solicitor attendance on complex matters</li><li>Flexibility for single instructions or ongoing arrangements</li><li>Detailed attendance notes for seamless handover</li></ul><h2>Kent focus</h2><p>Local knowledge of Kent custody suites and interview practices can reduce delay and improve client experience. See <a href="/police-station-rep-medway">Medway cover</a> and <a href="/for-solicitors">firm instructions</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Are freelance agents qualified solicitors?",
        a: "Cover may be provided by accredited representatives or qualified solicitors depending on availability and the instruction.",
      },
    ],
  },
  {
    file: "2026-06-12-police-station-cover-firms-kent-medway.json",
    slug: "police-station-cover-criminal-defence-firms-kent-medway",
    title: "Police Station Cover for Criminal Defence Firms in Kent and Medway",
    metaTitle: "Police Station Cover Kent and Medway Firms",
    metaDescription:
      "Police station agent cover for criminal defence firms across Kent and Medway — custody, voluntary interviews, and attendance notes.",
    primaryKeyword: "police station cover Kent Medway firms",
    content: `<div class="blog-content"><h2>In brief</h2><p>Criminal defence firms in Kent and Medway instruct police station agents for custody attendance at suites such as Medway and North Kent (Gravesend), and for voluntary interviews across the county.</p><h2>Medway and north Kent</h2><p>Medway custody suite serves Gillingham, Chatham and Rochester. North Kent custody at Gravesend covers Dartford and north Kent arrests. See <a href="/police-station-rep-medway">Medway cover</a> and <a href="/coverage/areas/medway">Medway area hub</a>.</p><h2>West and mid Kent</h2><p>Voluntary interviews are common at Sevenoaks, Tonbridge, Tunbridge Wells, Maidstone and Swanley. We provide cover by instruction. See local pages for <a href="/police-station-rep-sevenoaks">Sevenoaks</a> and <a href="/police-station-rep-maidstone">Maidstone</a>.</p><h2>Instructing cover</h2><p>Telephone for urgent custody. Include client details, station, custody record and DSCC reference. <a href="/for-solicitors">Police station cover for solicitors</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Do you cover both Legal Aid and private clients?",
        a: "Firms instruct for both; confirm billing and scheme requirements when instructing.",
      },
    ],
  },
];

for (const p of posts) {
  const doc = {
    id: p.file.replace(".json", ""),
    title: p.title,
    slug: p.slug,
    date: "2026-06-12",
    category: "Police Station Advice",
    primaryKeyword: p.primaryKeyword,
    secondaryKeywords: ["Kent", "police station", "solicitors"],
    location: "Kent",
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    featuredImage: "/blog-images/domestic-allegations-police-stage-featured.jpg",
    featuredImageAlt: "Police station legal advice Kent",
    contentHtml: p.content,
    faq: p.faq,
    author: "Robert Cashman",
    status: "published",
  };
  fs.writeFileSync(path.join(OUT, p.file), JSON.stringify(doc, null, 2) + "\n");
  console.log("Wrote", p.file);
}
