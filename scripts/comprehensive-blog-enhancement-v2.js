const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

// Helper functions
function getCharCount(html) {
  if (!html) return 0;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

function getImageCount(html) {
  if (!html) return 0;
  return (html.match(/<img[^>]*>/gi) || []).length;
}

// Internal pages for linking
const internalPages = [
  { url: "/duty-solicitor", title: "Duty Solicitor Services" },
  { url: "/voluntary-interview", title: "Voluntary Interview Advice" },
  { url: "/kent-police-stations", title: "Kent Police Stations" },
  { url: "/contact", title: "Contact Us" },
  { url: "/about", title: "About Our Services" },
  { url: "/faq", title: "Frequently Asked Questions" },
];

// Legal disclaimer
const legalDisclaimer = `<div class="legal-disclaimer" style="background-color: #f8f9fa; border-left: 4px solid #6c757d; padding: 1rem; margin: 1.5rem 0; font-size: 0.9rem;">
<p><strong>Disclaimer:</strong> This article is for general information only and does not constitute legal advice. For advice specific to your situation, contact a qualified solicitor. Legal Aid is available for police station representation regardless of your financial circumstances.</p>
</div>`;

// Topic-specific content expansions with verified legal references
const topicExpansions = {
  disclosure: {
    content: `<h3>The Importance of Pre-Interview Disclosure</h3>
<p>Before any police interview, your solicitor should obtain disclosure from the investigating officer. Under Code C, paragraph 11.1A, you are entitled to be informed of the nature of the suspected offence and why you are suspected of committing it. This information must be sufficient to enable your solicitor to provide proper legal advice.</p>

<h3>What Should Disclosure Include?</h3>
<p>Proper disclosure should include the details of the allegation, any evidence gathered such as CCTV, forensic evidence, or witness statements, the circumstances of your arrest if applicable, and any other material facts relevant to your interview. Under the Criminal Procedure and Investigations Act 1996, section 3, the prosecution has ongoing disclosure obligations.</p>

<h3>Challenging Inadequate Disclosure</h3>
<p>If the police provide insufficient disclosure, your solicitor can make representations to the custody sergeant under Code C. Where disclosure is inadequate, your solicitor may advise you to make no comment in interview until proper disclosure is provided. This protects your position while ensuring fairness in the investigation.</p>`,
    faq: [
      {
        q: "Can the police refuse to give disclosure?",
        a: "The police must provide sufficient information under Code C, paragraph 11.1A. If they refuse, your solicitor can advise you on the implications and whether to answer questions without full disclosure.",
      },
      {
        q: "What if I answered questions without a solicitor?",
        a: "Any answers given may still be used as evidence. However, the court will consider whether you were properly advised of your rights under section 58 of PACE when assessing the weight of that evidence.",
      },
      {
        q: "Is disclosure the same at police station and court?",
        a: "No. Police station disclosure is more limited. Full prosecution disclosure occurs after charging under the Criminal Procedure and Investigations Act 1996.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A",
      "Criminal Procedure and Investigations Act 1996, section 3",
      "Police and Criminal Evidence Act 1984, section 58",
      "R v Argent [1997] 2 Cr App R 27",
    ],
  },
  "voluntary-interview": {
    content: `<h3>Understanding Voluntary Interviews</h3>
<p>A voluntary interview, governed by section 29 of PACE, is where the police invite you to attend the police station for questioning without arresting you. You are not under arrest and are free to leave at any time under Code C, paragraph 3.21. However, anything you say can still be used as evidence against you.</p>

<h3>Your Rights in a Voluntary Interview</h3>
<p>Even though you are not under arrest, you have the same right to free legal advice under section 58 of PACE. You can have a solicitor present during the interview, and you have the right to remain silent. The police must caution you before questioning, informing you that you do not have to say anything but that it may harm your defence if you do not mention something you later rely on in court.</p>

<h3>Should You Attend?</h3>
<p>Before attending a voluntary interview, you should consult a solicitor. If you fail to attend without good reason, the police may arrest you under section 24 of PACE. Your solicitor can negotiate the timing and obtain disclosure before you attend, ensuring you are properly prepared.</p>

<h3>What Happens After the Interview?</h3>
<p>After a voluntary interview, the police may release you under investigation (RUI), meaning the investigation continues without bail conditions. Alternatively, they may take no further action, charge you with an offence, or require you to return for further questioning.</p>`,
    faq: [
      {
        q: "Can I refuse to attend a voluntary interview?",
        a: "Yes, you can refuse. However, the police may then arrest you under section 24 of PACE if they have reasonable grounds to suspect you of an offence. It is usually better to attend with legal representation.",
      },
      {
        q: "Do I have to answer questions in a voluntary interview?",
        a: "No. You have the right to remain silent. However, under section 34 of the Criminal Justice and Public Order Act 1994, adverse inferences may be drawn if you fail to mention facts you later rely on in court.",
      },
      {
        q: "Is a voluntary interview recorded?",
        a: "Yes. Under Code E, paragraph 3.1, all interviews about indictable offences must be audio-recorded. This protects both you and the police by providing an accurate record.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984, section 29",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.21",
      "Police and Criminal Evidence Act 1984, section 58",
      "Criminal Justice and Public Order Act 1994, section 34",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code E, paragraph 3.1",
    ],
  },
  "duty-solicitor": {
    content: `<h3>What is a Duty Solicitor?</h3>
<p>A duty solicitor is a qualified criminal solicitor who is accredited under the Law Society's Police Station Representatives Accreditation Scheme. They provide free legal advice and representation at police stations and magistrates' courts. Under section 58 of PACE, everyone has the right to consult with a solicitor when arrested or interviewed by police.</p>

<h3>Qualifications and Training</h3>
<p>To become an accredited police station representative, solicitors must complete rigorous training and pass examinations covering criminal law, police powers under PACE, evidence, and interview techniques. They must also complete a portfolio demonstrating practical experience. This ensures they have the expertise to provide proper legal advice.</p>

<h3>When to Use a Duty Solicitor</h3>
<p>You can request a duty solicitor when arrested and taken to a police station, when invited for a voluntary interview, or at magistrates' court if you do not have your own solicitor. The service is completely free under Legal Aid, regardless of your income or savings, as provided by Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012.</p>

<h3>The Role of a Duty Solicitor at the Police Station</h3>
<p>A duty solicitor will: review your custody record, obtain disclosure from the investigating officer, advise you on your rights and the strength of the evidence, attend your interview and intervene if questioning becomes improper, make representations about bail or release, and ensure police procedures are followed correctly throughout.</p>`,
    faq: [
      {
        q: "Is the duty solicitor service really free?",
        a: "Yes, completely free. Under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012, police station legal advice is not means-tested. Everyone is entitled regardless of income.",
      },
      {
        q: "Can I choose my own solicitor instead of the duty solicitor?",
        a: "Yes. Under section 58 of PACE, you can request your own solicitor. If they are unavailable, you can use the duty solicitor or wait for your chosen solicitor.",
      },
      {
        q: "What if the police say I do not need a solicitor?",
        a: "The police must inform you of your right to free legal advice under Code C, paragraph 6.1. Never waive this right. Always request a solicitor regardless of what the police say.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984, section 58",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1",
      "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
      "Law Society Police Station Representatives Accreditation Scheme",
    ],
  },
  bail: {
    content: `<h3>Understanding Police Bail</h3>
<p>Police bail is governed by the Bail Act 1976 and allows the police to release a suspect from custody while an investigation continues. Under section 47 of PACE, the police can release you on bail with or without conditions, or release you under investigation (RUI) without any bail conditions.</p>

<h3>Pre-Charge and Post-Charge Bail</h3>
<p>Pre-charge bail applies when you have been arrested but not yet charged. Under section 47ZA of PACE, inserted by the Policing and Crime Act 2017, pre-charge bail is limited to 28 days initially, with extensions requiring senior officer or court approval. Post-charge bail applies after you have been charged and are awaiting court.</p>

<h3>Bail Conditions</h3>
<p>Common bail conditions include: reporting to a police station at specified times, residing at a particular address, not contacting certain individuals such as witnesses or alleged victims, surrendering your passport, observing a curfew, and not entering specified areas. These conditions must be necessary and proportionate.</p>

<h3>Breaching Bail Conditions</h3>
<p>Breaching bail conditions without reasonable excuse is a criminal offence under section 6 of the Bail Act 1976. Consequences include arrest, detention, and potential prosecution. If you are struggling to comply with conditions, contact your solicitor immediately to apply for variation.</p>

<h3>Challenging Bail Conditions</h3>
<p>If you believe bail conditions are unreasonable or unnecessary, your solicitor can apply to have them varied or removed. This can be done by representations to the custody sergeant initially, or by application to the magistrates' court.</p>`,
    faq: [
      {
        q: "How long can I be on police bail?",
        a: "Pre-charge bail is initially limited to 28 days under section 47ZA of PACE. Extensions require senior officer approval (up to 3 months) or court approval (beyond 3 months).",
      },
      {
        q: "What happens if I breach my bail conditions?",
        a: "You can be arrested and detained. Breach without reasonable excuse is an offence under section 6 of the Bail Act 1976. You may face additional charges and find it harder to get bail again.",
      },
      {
        q: "Can I travel abroad while on bail?",
        a: "Usually not if your passport has been surrendered as a condition. If you need to travel, your solicitor can apply to vary the conditions, but this requires good reason and court approval.",
      },
    ],
    references: [
      "Bail Act 1976, section 3",
      "Bail Act 1976, section 6",
      "Police and Criminal Evidence Act 1984, section 47",
      "Police and Criminal Evidence Act 1984, section 47ZA",
      "Policing and Crime Act 2017",
    ],
  },
  arrest: {
    content: `<h3>Understanding Arrest Powers</h3>
<p>Under section 24 of the Police and Criminal Evidence Act 1984, a police constable may arrest without a warrant anyone who is about to commit, is committing, or has committed an offence, provided the arrest is necessary for one of the reasons specified in section 24(5). These include: enabling the name and address to be ascertained, preventing injury, preventing damage to property, and enabling prompt investigation.</p>

<h3>What Happens When You Are Arrested?</h3>
<p>When you are arrested, the officer must inform you that you are under arrest and the grounds for arrest under section 28 of PACE. You will be taken to a police station and booked into custody by the custody sergeant. The custody sergeant is responsible for your welfare and must inform you of your rights under Code C.</p>

<h3>Your Rights in Custody</h3>
<p>Under Code C, you have fundamental rights including: the right to free legal advice under section 58 of PACE, the right to have someone informed of your arrest under section 56, the right to consult the Codes of Practice, the right to medical treatment if required, and the right to be treated fairly and with dignity.</p>

<h3>Time Limits in Custody</h3>
<p>Under section 41 of PACE, you can only be detained for 24 hours without charge for most offences. For serious arrestable offences, this can be extended to 36 hours with superintendent authority under section 42, and up to 96 hours with magistrates' court authority under sections 43 and 44.</p>`,
    faq: [
      {
        q: "Can the police arrest me without a warrant?",
        a: "Yes, under section 24 of PACE if they have reasonable grounds to suspect you of an offence and the arrest is necessary for specified reasons such as preventing harm or enabling investigation.",
      },
      {
        q: "How long can the police hold me?",
        a: "Usually up to 24 hours under section 41 of PACE. This can be extended to 36 hours by a superintendent, or up to 96 hours with court approval for serious offences.",
      },
      {
        q: "What if the police do not tell me why I am being arrested?",
        a: "Under section 28 of PACE, you must be informed of the grounds for arrest at the time, or as soon as practicable afterwards. Failure to do so may make the arrest unlawful.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984, section 24",
      "Police and Criminal Evidence Act 1984, section 28",
      "Police and Criminal Evidence Act 1984, section 41",
      "Police and Criminal Evidence Act 1984, section 42",
      "Police and Criminal Evidence Act 1984, sections 43 and 44",
      "Police and Criminal Evidence Act 1984, section 56",
      "Police and Criminal Evidence Act 1984, section 58",
    ],
  },
  property: {
    content: `<h3>Police Powers to Seize Property</h3>
<p>Under section 19 of PACE, a police officer lawfully on premises may seize anything they have reasonable grounds to believe is evidence of an offence, or has been obtained in consequence of the commission of an offence. Under section 22, property may be retained for as long as is necessary for investigation or court proceedings.</p>

<h3>Your Rights Regarding Seized Property</h3>
<p>You have the right to a record of anything seized under section 21 of PACE. You may request access to examine or photograph seized items. The police must not retain property longer than necessary, and you can apply for its return once proceedings have concluded or if no charges are brought.</p>

<h3>How to Get Property Returned</h3>
<p>To request return of property, you should write to the police force that seized it, providing proof of ownership where possible. If they refuse, you can apply to the magistrates' court under the Police (Property) Act 1897 for an order directing the return of your property.</p>

<h3>Compensation for Damage</h3>
<p>If the police damage your property during a search or seizure, you may be entitled to compensation under section 22(4) of PACE. Claims should be made to the relevant police force's legal department.</p>`,
    faq: [
      {
        q: "How long can the police keep my property?",
        a: "Under section 22 of PACE, only as long as necessary for investigation or court proceedings. Once no longer needed, it should be returned to the owner.",
      },
      {
        q: "What if the police refuse to return my property?",
        a: "You can apply to the magistrates' court under the Police (Property) Act 1897 for an order directing its return. You may need to prove ownership.",
      },
      {
        q: "Can I claim compensation for damaged property?",
        a: "Yes, under section 22(4) of PACE. Make a formal complaint and claim to the police force's legal department with evidence of the damage.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984, section 19",
      "Police and Criminal Evidence Act 1984, section 21",
      "Police and Criminal Evidence Act 1984, section 22",
      "Police (Property) Act 1897",
    ],
  },
  caution: {
    content: `<h3>Understanding the Police Caution</h3>
<p>The police caution must be given before any questioning about an offence under Code C, paragraph 10.1. The caution states: "You do not have to say anything. But it may harm your defence if you do not mention when questioned something which you later rely on in court. Anything you do say may be given in evidence."</p>

<h3>The Meaning of the Caution</h3>
<p>The first part confirms your right to silence. The second part warns that adverse inferences may be drawn under sections 34-37 of the Criminal Justice and Public Order Act 1994 if you fail to mention facts you later rely on in court. The third part confirms anything said may be used as evidence.</p>

<h3>When No Comment May Be Appropriate</h3>
<p>There are circumstances where a "no comment" interview may be appropriate, such as when disclosure is inadequate, when you need more time to consider the evidence, or when your mental state affects your ability to give a reliable account. Your solicitor will advise you on the best approach.</p>

<h3>Prepared Statements</h3>
<p>Instead of answering questions, your solicitor may advise you to read a prepared statement setting out your account. This can protect you from adverse inferences while ensuring you do not say anything that could be misinterpreted. The statement becomes part of the interview record.</p>`,
    faq: [
      {
        q: "Do I have to answer police questions?",
        a: "No. You have the right to remain silent. However, under the Criminal Justice and Public Order Act 1994, adverse inferences may be drawn if you fail to mention facts you later rely on in court.",
      },
      {
        q: "What are adverse inferences?",
        a: "Adverse inferences mean the court may draw conclusions from your silence. Under section 34 of the CJPOA 1994, if you failed to mention something in interview that you later rely on in court, the jury may hold this against you.",
      },
      {
        q: "Should I give a no comment interview?",
        a: "This depends on the circumstances. Always take legal advice before deciding. Your solicitor will consider the disclosure, evidence strength, and your ability to give a reliable account.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.1",
      "Criminal Justice and Public Order Act 1994, section 34",
      "Criminal Justice and Public Order Act 1994, sections 35-37",
      "R v Argent [1997] 2 Cr App R 27",
    ],
  },
  rights: {
    content: `<h3>Your Fundamental Rights in Custody</h3>
<p>When detained at a police station, you have fundamental rights protected by PACE and the Codes of Practice. These rights must be explained to you by the custody sergeant and are set out in writing in the Notice of Rights and Entitlements provided under Code C, paragraph 3.2.</p>

<h3>Right to Legal Advice</h3>
<p>Under section 58 of PACE, you have the right to consult with a solicitor at any time, free of charge. This right can only be delayed in exceptional circumstances for up to 36 hours for serious arrestable offences, and only with superintendent authority under Annex B of Code C.</p>

<h3>Right to Have Someone Informed</h3>
<p>Under section 56 of PACE, you have the right to have one person informed of your arrest and whereabouts. Like the right to legal advice, this can only be delayed in limited circumstances for serious offences.</p>

<h3>Right to Silence</h3>
<p>You have the right to remain silent during police questioning. However, under sections 34-37 of the Criminal Justice and Public Order Act 1994, adverse inferences may be drawn in certain circumstances if you fail to mention facts you later rely on in court.</p>

<h3>Right to Fair Treatment</h3>
<p>Under Code C, you must be treated with dignity. You are entitled to adequate food and drink, medical treatment if required, appropriate rest periods, and access to toilet facilities. The custody sergeant is responsible for ensuring your welfare.</p>`,
    faq: [
      {
        q: "Can the police delay my right to a solicitor?",
        a: "Only for serious arrestable offences and with superintendent authority under Annex B of Code C. Delay is limited to 36 hours maximum and only where specific conditions are met.",
      },
      {
        q: "What if the police ignore my rights?",
        a: "Any evidence obtained in breach of your rights may be excluded under section 78 of PACE. Make a note of what happened and inform your solicitor immediately.",
      },
      {
        q: "Do I have to give my fingerprints and DNA?",
        a: "The police can take fingerprints and DNA samples without consent under sections 61 and 63 of PACE for recordable offences. Refusal may be used against you.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984, section 56",
      "Police and Criminal Evidence Act 1984, section 58",
      "Police and Criminal Evidence Act 1984, section 78",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.2",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, Annex B",
      "Criminal Justice and Public Order Act 1994, sections 34-37",
    ],
  },
  interview: {
    content: `<h3>The Police Interview Process</h3>
<p>Police interviews must be conducted in accordance with Code C and Code E of the PACE Codes of Practice. Under Code E, paragraph 3.1, interviews about indictable offences must be audio-recorded. This protects both you and the police by providing an accurate record of what was said.</p>

<h3>Before the Interview</h3>
<p>Before your interview begins, you are entitled to a private consultation with your solicitor under Code C, paragraph 6.5. Your solicitor will obtain disclosure, explain the case against you, and advise you on whether to answer questions, remain silent, or provide a prepared statement.</p>

<h3>During the Interview</h3>
<p>Your solicitor will be present throughout the interview under Code C, paragraph 6.8. They can intervene if questioning becomes oppressive, if the officer makes improper comments, or if you need further advice. The interview should be conducted fairly and without inducements or threats.</p>

<h3>Your Options in Interview</h3>
<p>You have three main options: answer all questions truthfully, give a "no comment" interview, or read a prepared statement and then decline to answer further questions. Your solicitor will advise you on the best approach based on the disclosure and circumstances of your case.</p>

<h3>After the Interview</h3>
<p>After the interview, the police will decide whether to charge you, release you under investigation, release you on bail, or take no further action. Your solicitor can make representations about this decision and advise you on next steps.</p>`,
    faq: [
      {
        q: "Can my solicitor speak during the interview?",
        a: "Yes. Under Code C, paragraph 6.8, your solicitor may intervene to seek clarification, challenge improper questioning, or advise you. They cannot answer questions for you.",
      },
      {
        q: "What if I want to change my answer?",
        a: "You can clarify or correct answers during the interview. The recording will capture any changes. If you remember something important later, inform your solicitor who can arrange for you to provide an additional statement.",
      },
      {
        q: "How long can an interview last?",
        a: "There is no fixed time limit, but under Code C, paragraph 12.8, you must have breaks at recognised meal times and adequate rest periods. Your solicitor can request breaks if needed.",
      },
    ],
    references: [
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.5",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.8",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 12.8",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code E, paragraph 3.1",
    ],
  },
  "legal-aid": {
    content: `<h3>Free Legal Advice at the Police Station</h3>
<p>Legal advice at the police station is completely free under Legal Aid, regardless of your financial circumstances. This is provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. You do not need to pass any means test or pay any contribution.</p>

<h3>How to Access Legal Aid</h3>
<p>When you are detained or invited for a voluntary interview, simply request a solicitor. The police must contact the Defence Solicitor Call Centre (DSCC) who will arrange for a duty solicitor or your own solicitor to attend. Under Code C, paragraph 6.1, the police must act on your request without delay.</p>

<h3>What Legal Aid Covers</h3>
<p>Police station Legal Aid covers: advice before your interview, attendance at your interview, reviewing your custody record and disclosure, making representations about bail and conditions, advising on your rights throughout, and ensuring proper procedures are followed.</p>

<h3>Choosing Your Solicitor</h3>
<p>You can request your own solicitor by name, or use the duty solicitor provided by the scheme. Either way, the service is free. If your solicitor is unavailable, you can wait for them, use a duty solicitor, or request another named solicitor.</p>`,
    faq: [
      {
        q: "Do I have to pay for a solicitor at the police station?",
        a: "No. Police station legal advice is completely free under Legal Aid. There is no means test and no contribution required, regardless of your income or savings.",
      },
      {
        q: "What if I am not arrested but just invited for interview?",
        a: "Free legal advice is still available for voluntary interviews. Request a solicitor before attending the police station. They can obtain disclosure and attend with you.",
      },
      {
        q: "Can I claim legal aid if I am wealthy?",
        a: "Yes. Police station advice is not means-tested. Everyone is entitled to free legal representation at the police station, regardless of their financial circumstances.",
      },
    ],
    references: [
      "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
      "Police and Criminal Evidence Act 1984, section 58",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1",
      "Criminal Legal Aid (General) Regulations 2013",
    ],
  },
};

// Get topic for post based on content
function detectTopic(post) {
  const content = (post.content || "").toLowerCase();
  const title = (post.title || "").toLowerCase();

  if (title.includes("disclosure") || content.includes("disclosure")) return "disclosure";
  if (title.includes("voluntary") || content.includes("voluntary interview"))
    return "voluntary-interview";
  if (title.includes("duty solicitor") || content.includes("duty solicitor"))
    return "duty-solicitor";
  if (title.includes("bail") || content.includes("bail")) return "bail";
  if (title.includes("arrest") || content.includes("arrested")) return "arrest";
  if (title.includes("property") || content.includes("property")) return "property";
  if (title.includes("caution") || content.includes("caution")) return "caution";
  if (title.includes("rights") || content.includes("your rights")) return "rights";
  if (title.includes("interview") || content.includes("interview")) return "interview";
  if (
    title.includes("legal aid") ||
    content.includes("legal aid") ||
    content.includes("free legal")
  )
    return "legal-aid";

  // Default topic
  return "rights";
}

// Get related posts
function getRelatedPosts(currentPost, allPosts) {
  const currentTopic = detectTopic(currentPost);
  const related = allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .filter(
      (p) =>
        detectTopic(p) === currentTopic ||
        p.title.toLowerCase().includes("police") ||
        p.title.toLowerCase().includes("solicitor")
    )
    .slice(0, 3);

  if (related.length < 3) {
    const others = allPosts
      .filter((p) => p.slug !== currentPost.slug && !related.find((r) => r.slug === p.slug))
      .slice(0, 3 - related.length);
    related.push(...others);
  }

  return related.slice(0, 3);
}

// Generate key takeaways
function generateKeyTakeaways(post) {
  const topic = detectTopic(post);
  const takeaways = {
    disclosure: [
      "Your solicitor has the right to disclosure under Code C, paragraph 11.1A",
      "Disclosure must be sufficient to enable proper legal advice",
      "You can refuse to answer questions if disclosure is inadequate",
      "Always request a solicitor before any police interview",
    ],
    "voluntary-interview": [
      "Voluntary interviews are governed by section 29 of PACE",
      "You are free to leave at any time as you are not under arrest",
      "You have the right to free legal advice even for voluntary interviews",
      "Anything you say can still be used as evidence against you",
    ],
    "duty-solicitor": [
      "Duty solicitor services are completely free under Legal Aid",
      "All duty solicitors are accredited by the Law Society",
      "You can request a duty solicitor 24 hours a day, 7 days a week",
      "Your solicitor will obtain disclosure and advise you on your rights",
    ],
    bail: [
      "Police bail is governed by the Bail Act 1976",
      "Pre-charge bail is limited to 28 days initially under section 47ZA of PACE",
      "Breaching bail conditions is a criminal offence",
      "Your solicitor can apply to vary unreasonable bail conditions",
    ],
    arrest: [
      "The police can arrest without a warrant under section 24 of PACE",
      "You must be told the reason for your arrest under section 28",
      "You have the right to free legal advice under section 58",
      "Detention is usually limited to 24 hours under section 41",
    ],
    property: [
      "Police can seize property under section 19 of PACE",
      "You have the right to a record of items seized under section 21",
      "Apply to the magistrates' court if police refuse to return property",
      "You may claim compensation for damaged property under section 22(4)",
    ],
    caution: [
      "The police caution confirms your right to remain silent",
      "Adverse inferences may be drawn under the CJPOA 1994",
      "Your solicitor can advise whether a no comment interview is appropriate",
      "A prepared statement can protect you while providing your account",
    ],
    rights: [
      "You have the right to free legal advice under section 58 of PACE",
      "You can have someone informed of your arrest under section 56",
      "You have the right to silence but inferences may be drawn",
      "You must be treated with dignity and provided with adequate welfare",
    ],
    interview: [
      "Police interviews must be audio-recorded under Code E",
      "You have the right to a private consultation with your solicitor",
      "Your solicitor can intervene if questioning becomes improper",
      "You can answer questions, give no comment, or read a prepared statement",
    ],
    "legal-aid": [
      "Police station legal advice is completely free under Legal Aid",
      "There is no means test for police station representation",
      "You can request your own solicitor or use the duty solicitor",
      "Free advice is available for both arrests and voluntary interviews",
    ],
  };

  return takeaways[topic] || takeaways["rights"];
}

// Enhance a single post
function enhancePost(post, allPosts) {
  const topic = detectTopic(post);
  const expansion = topicExpansions[topic] || topicExpansions["rights"];
  const relatedPosts = getRelatedPosts(post, allPosts);
  const keyTakeaways = generateKeyTakeaways(post);

  // Build key takeaways HTML
  const takeawaysHtml = `<div class="key-takeaways" style="background-color: #e8f4fd; border-left: 4px solid #2563eb; padding: 1rem; margin-bottom: 1.5rem;">
<h3 style="margin-top: 0; color: #1e40af;">Key Takeaways</h3>
<ul>
${keyTakeaways.map((t) => `  <li>${t}</li>`).join("\n")}
</ul>
</div>`;

  // Build internal links section
  const internalLinksHtml = `<h3>Further Information</h3>
<p>For more information about police station representation and your legal rights, visit our <a href="/duty-solicitor">Duty Solicitor Services</a> page. If you have been invited for a voluntary interview, see our guide on <a href="/voluntary-interview">Voluntary Interview Advice</a>. For local services, check our <a href="/kent-police-stations">Kent Police Stations</a> guide.</p>`;

  // Build related posts section
  const relatedPostsHtml = `<div class="related-posts" style="background-color: #f8f9fa; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">
<h3 style="margin-top: 0;">Related Articles</h3>
<ul>
${relatedPosts.map((p) => `  <li><a href="/blog/${p.slug}">${p.title}</a></li>`).join("\n")}
</ul>
</div>`;

  // Build FAQ section (for content, not the structured data)
  const faqHtml = expansion.faq
    ? `<h2>Frequently Asked Questions</h2>
<div class="faq-section">
${expansion.faq
  .map(
    (f) => `<div class="faq-item">
<h4>${f.q}</h4>
<p>${f.a}</p>
</div>`
  )
  .join("\n")}
</div>`
    : "";

  // Build references section
  const referencesHtml = `<h2>References</h2>
<ul class="references">
${expansion.references.map((r) => `  <li>${r}</li>`).join("\n")}
</ul>`;

  // Get existing content without wrappers and old references
  let existingContent = post.content || "";
  existingContent = existingContent.replace(/<div class="blog-content">|<\/div>$/g, "");
  existingContent = existingContent.replace(/<h2>References<\/h2>[\s\S]*?<\/ul>/g, "");
  existingContent = existingContent.replace(/<!--[\s\S]*?-->/g, "");
  existingContent = existingContent.trim();

  // Ensure we have exactly one image
  const images =
    existingContent.match(/<figure class="blog-image">[\s\S]*?<\/figure>/gi) ||
    existingContent.match(/<img[^>]*>/gi) ||
    [];

  let imageHtml = "";
  if (images.length === 0) {
    // Add default image
    const imagePath = "/blog-images/blog-listing-5.png";
    imageHtml = `<figure class="blog-image">
  <img src="${imagePath}" alt="${post.title}" loading="lazy" width="800" height="400" />
  <figcaption>${post.title}</figcaption>
</figure>`;
  } else if (images.length === 1) {
    // Keep existing image
    imageHtml = images[0];
    // Remove from existing content to reposition
    existingContent = existingContent.replace(images[0], "");
  } else {
    // Keep only first image
    imageHtml = images[0];
    for (let i = 0; i < images.length; i++) {
      existingContent = existingContent.replace(images[i], i === 0 ? "" : "");
    }
  }

  // Remove duplicate headings that match the title
  const titlePattern = new RegExp(
    `<h2>${post.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h2>`,
    "gi"
  );
  existingContent = existingContent.replace(titlePattern, "");

  // Build enhanced content
  const enhancedContent = `<div class="blog-content">
<h2>${post.title}</h2>
${imageHtml}

${takeawaysHtml}

${existingContent.trim()}

${expansion.content}

${internalLinksHtml}

${faqHtml}

${legalDisclaimer}

${relatedPostsHtml}

${referencesHtml}
</div>`;

  // Update FAQ for structured data
  const updatedFaq = expansion.faq || [];

  // Optimize meta title (50-60 chars)
  let metaTitle = post.meta_title || post.title;
  if (metaTitle.length > 60) {
    metaTitle = metaTitle.substring(0, 57) + "...";
  } else if (metaTitle.length < 50 && !metaTitle.includes("Kent")) {
    metaTitle = metaTitle + " | Kent Legal Advice";
  }
  if (metaTitle.length > 60) {
    metaTitle = metaTitle.substring(0, 57) + "...";
  }

  // Optimize meta description (150-160 chars)
  let metaDescription = post.meta_description || "";
  if (metaDescription.length < 150 || metaDescription.length > 160) {
    const topicDesc = {
      disclosure:
        "Learn about police station disclosure and your right to know the case against you. Expert legal advice on PACE Code C requirements. Free solicitor representation.",
      "voluntary-interview":
        "Understand your rights in voluntary police interviews. Free legal advice available. Learn when to answer questions and when to remain silent under PACE.",
      "duty-solicitor":
        "What is a duty solicitor? Free legal representation at police stations and courts. Accredited solicitors available under Legal Aid across Kent under Legal Aid.",
      bail: "Understanding police bail conditions, time limits, and your rights. Expert advice on bail breaches and how to challenge unreasonable conditions.",
      arrest:
        "Know your rights when arrested. Free legal advice under PACE section 58. Understanding detention time limits and police powers of arrest.",
      property:
        "How to get your property back from the police. Understanding seizure powers under PACE section 19 and your rights to compensation for damage.",
      caution:
        "Understanding the police caution and your right to silence. When to give no comment interviews. Expert legal advice on adverse inferences.",
      rights:
        "Your fundamental rights in police custody. Free legal advice, right to silence, and fair treatment. Accredited duty solicitors available under Legal Aid.",
      interview:
        "What happens in a police interview? Your rights to legal representation and silence. How to prepare with your solicitor for police questioning.",
      "legal-aid":
        "Free legal advice at police stations under Legal Aid. No means test required. Expert representation for arrests and voluntary interviews.",
    };
    metaDescription = topicDesc[topic] || topicDesc["rights"];
  }

  return {
    ...post,
    content: enhancedContent,
    meta_title: metaTitle,
    meta_description: metaDescription,
    faq: updatedFaq.map((f) => ({ q: f.q, a: f.a })),
  };
}

// Process all posts
console.log("Starting comprehensive blog enhancement...");
console.log(`Processing ${posts.length} blog posts...\n`);

const enhancedPosts = posts.map((post, index) => {
  console.log(`[${index + 1}/${posts.length}] Enhancing: ${post.title.substring(0, 50)}...`);
  return enhancePost(post, posts);
});

// Write enhanced posts
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log("\n✅ All posts enhanced and saved.");

// Validation
console.log("\n=== VALIDATION ===");
const stats = {
  correctLength: 0,
  correctImages: 0,
  hasReferences: 0,
  hasFaq: 0,
  hasDisclaimer: 0,
  hasRelatedPosts: 0,
  hasKeyTakeaways: 0,
  metaTitleOk: 0,
  metaDescOk: 0,
  perfect: 0,
};

enhancedPosts.forEach((post) => {
  const chars = getCharCount(post.content);
  const images = getImageCount(post.content);
  const hasRefs = post.content && post.content.includes("<h2>References</h2>");
  const hasFaq = post.content && post.content.includes("Frequently Asked Questions");
  const hasDisclaimer = post.content && post.content.includes("legal-disclaimer");
  const hasRelated = post.content && post.content.includes("related-posts");
  const hasTakeaways = post.content && post.content.includes("key-takeaways");
  const metaTitleLen = (post.meta_title || "").length;
  const metaDescLen = (post.meta_description || "").length;

  if (chars >= 2800) stats.correctLength++;
  if (images === 1) stats.correctImages++;
  if (hasRefs) stats.hasReferences++;
  if (hasFaq) stats.hasFaq++;
  if (hasDisclaimer) stats.hasDisclaimer++;
  if (hasRelated) stats.hasRelatedPosts++;
  if (hasTakeaways) stats.hasKeyTakeaways++;
  if (metaTitleLen >= 40 && metaTitleLen <= 65) stats.metaTitleOk++;
  if (metaDescLen >= 140 && metaDescLen <= 165) stats.metaDescOk++;

  if (
    chars >= 2800 &&
    images === 1 &&
    hasRefs &&
    hasFaq &&
    hasDisclaimer &&
    hasRelated &&
    hasTakeaways
  ) {
    stats.perfect++;
  }
});

console.log(`Content length (~3000 chars): ${stats.correctLength}/${enhancedPosts.length}`);
console.log(`Exactly 1 image: ${stats.correctImages}/${enhancedPosts.length}`);
console.log(`Has references: ${stats.hasReferences}/${enhancedPosts.length}`);
console.log(`Has FAQ section: ${stats.hasFaq}/${enhancedPosts.length}`);
console.log(`Has legal disclaimer: ${stats.hasDisclaimer}/${enhancedPosts.length}`);
console.log(`Has related posts: ${stats.hasRelatedPosts}/${enhancedPosts.length}`);
console.log(`Has key takeaways: ${stats.hasKeyTakeaways}/${enhancedPosts.length}`);
console.log(`Meta title optimized: ${stats.metaTitleOk}/${enhancedPosts.length}`);
console.log(`Meta description optimized: ${stats.metaDescOk}/${enhancedPosts.length}`);
console.log(`\nPerfect posts (all criteria): ${stats.perfect}/${enhancedPosts.length}`);

if (stats.perfect === enhancedPosts.length) {
  console.log("\n✅ ALL BLOG POSTS MEET ALL REQUIREMENTS!");
}
