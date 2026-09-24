#!/usr/bin/env node
/**
 * Generate SEO blog post templates — public-facing voice for Police Station Agent.
 * Note: does not overwrite existing files. Use apply-public-facing-blog-updates.mjs for full content.
 */
import fs from "fs";
import path from "path";

if (process.env.FORCE_REGEN !== "1") {
  console.log("Skipping generate-seo-blog-posts (set FORCE_REGEN=1 to overwrite).");
  process.exit(0);
}

const OUT = path.join(process.cwd(), "data", "blog-posts");

const NOT_KENT =
  "<p>Police Station Agent is a private defence website operated by Robert Cashman — <strong>NOT Kent Police</strong>. Legal services are delivered through Tuckers Solicitors LLP (SRA ID: 127795).</p>";

const posts = [
  {
    file: "2026-06-12-instructing-a-police-station-representative.json",
    slug: "arrange-solicitor-someone-in-custody",
    title: "How to Arrange a Solicitor When Someone Is in Custody",
    metaTitle: "How to Arrange a Solicitor When Someone Is in Custody",
    metaDescription:
      "How immediate family and detainees can arrange a police station solicitor in Kent — custody record numbers, DSCC references, and urgent contact.",
    primaryKeyword: "arrange solicitor someone in custody Kent",
    content: `<div class="blog-content"><h2>Introduction</h2><p>When someone is detained at a Kent police station, arranging a solicitor quickly can help protect their rights before interview.</p>${NOT_KENT}<h2>Asking from inside custody</h2><p>A detainee can tell the custody officer they want legal advice at any time. They may request <strong>Robert Cashman, Tuckers Duty Solicitor</strong>.</p><h2>Help from immediate family</h2><p>Parents, spouses, civil partners, children, and siblings may contact us when someone is in <strong>current</strong> custody. See <a href="/start/in-custody">someone in custody now</a>.</p><h2>Information that helps</h2><ul><li>Full name and date of birth</li><li>Police station and custody suite</li><li>Custody record number</li><li>DSCC reference if available</li></ul><p>Call <strong>01732 247427</strong> for urgent custody.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Can friends arrange a solicitor for someone in custody?",
        a: "No. Only immediate family may help arrange a solicitor, and the detainee must confirm they want legal advice.",
      },
    ],
  },
  {
    file: "2026-06-12-custody-record-number-dscc-reference.json",
    slug: "custody-record-number-dscc-reference",
    title: "Custody Record Numbers and DSCC References Explained for Families",
    metaTitle: "Custody Record Numbers Explained for Families",
    metaDescription:
      "Plain English explanation of custody record numbers and DSCC references for detainees and families in Kent.",
    primaryKeyword: "custody record number DSCC families",
    content: `<div class="blog-content"><h2>Introduction</h2><p>Custody record numbers and DSCC references help arrange the correct police station attendance.</p>${NOT_KENT}<h2>Custody record</h2><p>When someone is booked into police custody, the custody officer creates a custody record with a unique reference number.</p><h2>DSCC reference</h2><p>The Defence Solicitor Call Centre allocates references when duty solicitor advice is requested. You may ask for Robert Cashman, Tuckers Duty Solicitor.</p><p>See <a href="/dscc-and-custody-record-support">DSCC and custody record support</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Is the DSCC reference the same as the custody record number?",
        a: "No. They are separate references used for different purposes.",
      },
    ],
  },
  {
    file: "2026-06-12-when-to-instruct-police-station-agent.json",
    slug: "when-to-ask-for-solicitor-kent-police-station",
    title: "When to Ask for a Solicitor at a Kent Police Station",
    metaTitle: "When to Ask for a Solicitor at a Kent Police Station",
    metaDescription:
      "When to request free legal advice at a Kent police station — after arrest, voluntary interviews, and out-of-hours custody.",
    primaryKeyword: "when to ask for solicitor police station Kent",
    content: `<div class="blog-content"><h2>Introduction</h2><p>You are entitled to free legal advice at most Kent police station interviews.</p>${NOT_KENT}<h2>After arrest</h2><p>Ask for a solicitor as soon as you are arrested or told you will be interviewed under caution.</p><h2>Voluntary interviews</h2><p>Voluntary interviews carry the same legal risks as custody interviews. Free legal advice is available.</p><p>See <a href="/voluntary-police-interview">voluntary interview advice</a> and <a href="/start/in-custody">someone in custody now</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Is legal advice at the police station free?",
        a: "Yes — legal advice under the duty solicitor scheme is free for most people being interviewed.",
      },
    ],
  },
  {
    file: "2026-06-12-police-station-attendance-notes.json",
    slug: "police-station-attendance-notes",
    title: "What Your Solicitor Records After a Police Station Visit",
    metaTitle: "Police Station Attendance Notes Explained",
    metaDescription:
      "What solicitors record after a police station attendance — disclosure, advice, interview, and outcome explained for the public.",
    primaryKeyword: "police station attendance notes explained",
    content: `<div class="blog-content"><h2>Introduction</h2><p>After a police station attendance, your solicitor prepares written notes of what happened.</p>${NOT_KENT}<h2>What notes include</h2><ul><li>Disclosure received</li><li>Advice given in private consultation</li><li>Interview summary</li><li>Outcome and next steps</li></ul><p>See <a href="/released-under-investigation">RUI explained</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Are attendance notes shared with the police?",
        a: "No. Attendance notes are confidential between you and your solicitor.",
      },
    ],
  },
  {
    file: "2026-06-12-freelance-police-station-agents-for-solicitors.json",
    slug: "who-attends-police-station-legal-advice",
    title: "Who Attends When You Ask for Legal Advice at the Police Station",
    metaTitle: "Who Attends Police Station Legal Advice",
    metaDescription:
      "Duty solicitors and accredited representatives explained — who attends when you request legal advice at a Kent police station.",
    primaryKeyword: "who attends police station legal advice",
    content: `<div class="blog-content"><h2>Introduction</h2><p>When you ask for legal advice at a Kent police station, a duty solicitor or accredited representative attends on your behalf.</p>${NOT_KENT}<h2>Independence</h2><p>Your solicitor is independent of the police and bound by confidentiality.</p><p>See <a href="/your-rights-in-custody">your rights in custody</a>.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Is the duty solicitor free?",
        a: "Yes — legal advice at the police station is free for most people being interviewed.",
      },
    ],
  },
  {
    file: "2026-06-12-police-station-cover-firms-kent-medway.json",
    slug: "legal-advice-medway-custody-kent",
    title: "Legal Advice at Medway Custody in Kent",
    metaTitle: "Legal Advice at Medway Custody",
    metaDescription:
      "Free legal advice at Medway custody suite for arrests in Gillingham, Chatham and Rochester.",
    primaryKeyword: "legal advice Medway custody Kent",
    content: `<div class="blog-content"><h2>Introduction</h2><p>If you are detained at Medway custody suite, you are entitled to free legal advice at the police station.</p>${NOT_KENT}<h2>Medway custody</h2><p>Medway custody serves Gillingham, Chatham, Rochester and surrounding areas. See <a href="/police-station-rep-medway">Medway cover</a>.</p><p>Call <strong>01732 247427</strong> for urgent custody.</p><p><em>General information only.</em></p></div>`,
    faq: [
      {
        q: "Is legal advice free at Medway custody?",
        a: "Yes — legal advice under the duty solicitor scheme is free for most detainees being interviewed.",
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
    secondaryKeywords: ["Kent", "police station", "legal advice"],
    location: "Kent",
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    featuredImage: "/blog-images/blog-listing-3.png",
    featuredImageAlt: p.title,
    contentHtml: p.content,
    faq: p.faq,
    author: "Robert Cashman",
    status: "published",
  };
  fs.writeFileSync(path.join(OUT, p.file), JSON.stringify(doc, null, 2) + "\n");
  console.log(`Template reference: ${p.file}`);
}

console.log("Public-facing SEO blog templates updated.");
