#!/usr/bin/env node
/**
 * Expand five June 2026 firm-facing posts that remain under ~900 words.
 */
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data/blog-posts");

const EXPANSIONS = {
  "2026-06-12-freelance-police-station-agents-for-solicitors.json": `
<h2>How freelance agents differ from duty solicitor schemes</h2>
<p>A <strong>freelance police station agent</strong> attends on behalf of an instructing firm — not under the public duty solicitor rota. The client still receives free advice if they qualify under Legal Aid at the police station, but the <em>instructing relationship</em> is between the firm and the agent. The agent does not replace the firm as the client's solicitor of record unless formally transferred.</p>
<p>Firms use freelance cover when their own duty rota cannot meet demand: overnight custody, simultaneous detainees, or geographic conflicts across Kent. The agent's role is attendance, consultation, interview support, and written notes — not long-term case ownership unless agreed.</p>

<h2>What firms should agree before first instruction</h2>
<ul>
<li><strong>Billing</strong> — Legal Aid rates vs private agreed fees; mileage and waiting time</li>
<li><strong>Note format</strong> — disclosure summary, advice, interview key points, outcome, bail conditions</li>
<li><strong>Communication</strong> — who receives the note (fee earner, admin, secure email)</li>
<li><strong>Escalation</strong> — when the agent should telephone the firm during attendance</li>
</ul>
<p>Clear expectations reduce repeat calls and protect the client file. See <a href="/for-solicitors">firm cover page</a> and <a href="/start/solicitors-agent-cover">send instructions</a>.</p>

<h2>Common mistakes when instructing freelance cover</h2>
<p>Thin briefs — station name only, no custody record number — delay attendance. Vague strategy ("just go and see what happens") leaves the agent without guidance on no comment, prepared statement, or further disclosure. Slow feedback after attendance makes handover harder for the fee earner advising on bail return or charging decisions.</p>
<p>Good instructing firms treat police station cover like any other delegated attendance: complete references, realistic timescales, and a named contact for urgent decisions.</p>`,

  "2026-06-12-instructing-a-police-station-representative.json": `
<h2>Minimum information for a usable instruction</h2>
<p>Custody staff need a client name and date of birth to locate the detainee. Your instruction should include:</p>
<ul>
<li>Full client name and date of birth</li>
<li>Police station and custody record number (if known)</li>
<li>DSCC reference where available</li>
<li>Offence summary or investigation type</li>
<li>Any vulnerability, language, or medical notes</li>
<li>Fee earner contact and billing reference</li>
</ul>
<p>Telephone <strong>01732 247427</strong> for urgent custody. For booked voluntary interviews, email or call with date, time, station, and allegation summary.</p>

<h2>Who can instruct on behalf of a firm</h2>
<p>Instructions must come from the criminal defence firm with conduct of the matter — a fee earner, accredited representative, or properly authorised admin under firm procedures. Immediate family cannot instruct on someone else's behalf unless the detainee confirms they want legal advice; friends cannot instruct at all. See our <a href="/faq#immediate-custody-only">scope FAQ</a>.</p>

<h2>After attendance — what the firm should receive</h2>
<p>Written notes should allow the fee earner to advise on next steps without reconstructing the station visit: disclosure received, private consultation summary, advice given, interview approach (answers, no comment, prepared statement), outcome (charge, bail, RUI, NFA), and any bail conditions or return dates. Agree delivery method and turnaround when establishing a cover relationship.</p>`,

  "2026-06-12-police-station-attendance-notes.json": `
<h2>Why attendance notes matter for case continuity</h2>
<p>The police station is often where the evidential picture first becomes clear. Fee earners who receive structured notes can advise on bail, charging response, and trial preparation without delay. Poor notes — or none — force repeat contact with custody, the client, or the agent to fill gaps.</p>
<p>Notes are also a professional record of advice given at a critical stage. They should reflect what was disclosed, what was advised, and what the client decided — not a transcript of every question and answer unless firm policy requires it.</p>

<h2>Suggested structure for handover notes</h2>
<ol>
<li>Attendance details — station, date, custody record, DSCC, instructing firm reference</li>
<li>Disclosure — offence, summary of evidence disclosed, further disclosure requests</li>
<li>Consultation — advice on caution, silence, prepared statement, bail</li>
<li>Interview — approach taken, key topics, significant answers or no comment</li>
<li>Outcome — charge, bail conditions, RUI, NFA, further dates</li>
<li>Next steps — officer contact, bail return, documents to obtain</li>
</ol>
<p>Firms may adapt this to their own template. The goal is consistency so any fee earner can pick up the file.</p>

<h2>Confidentiality and storage</h2>
<p>Attendance notes contain legally privileged material. They should be sent through secure firm channels — not personal email or informal messaging apps unless the firm's data policy explicitly allows it. Clients should not rely on verbal summaries alone after release from custody.</p>`,

  "2026-06-12-police-station-cover-firms-kent-medway.json": `
<h2>Medway custody in practice</h2>
<p>The <strong>Medway custody suite</strong> serves Gillingham, Chatham, Rochester, and the wider Medway area. Detainees arrested across mid-Kent may be routed there depending on cell availability and operational demand. Firms instructing cover for Medway matters should confirm the actual custody location with custody staff — not assume the nearest geographic police station.</p>
<p>Voluntary interviews may take place at local stations while custody is held at Medway. Instructions should state whether the attendance is custody or voluntary, date and time, and any special requirements.</p>

<h2>Building reliable Medway cover</h2>
<p>Single-name cover lists fail when that person is already in an interview or at another station. Firms benefit from a small panel of accredited representatives, clear escalation paths, and agreed note formats. Extended-hours cover across Kent — including regular Medway attendance — helps firms avoid gaps without maintaining a full overnight rota.</p>
<p>Robert Cashman attends through Tuckers Solicitors LLP across Kent custody suites, subject to availability. See <a href="/police-station-rep-medway">Medway rep page</a> and <a href="/coverage/areas/medway">Medway coverage</a>.</p>

<h2>Billing and Legal Aid at Medway</h2>
<p>Police station advice for the client is free under Legal Aid for most interviews. Firm-to-agent billing is separate — agree rates, mileage, and waiting time before first instruction. Keep billing references on the instruction to avoid delays in payment processing.</p>`,

  "2026-06-12-when-to-instruct-police-station-agent.json": `
<h2>Public clients — when to ask for a solicitor</h2>
<p>If you are detained or invited to a voluntary interview, ask for a solicitor <strong>before</strong> any interview under caution. Early advice helps you understand the allegation, your right to silence, and whether a prepared statement is appropriate. Legal advice at the police station is free for most people being interviewed — it is not means-tested in the way court Legal Aid is.</p>
<p>Call <strong>01732 247427</strong> or text <strong>07535 494446</strong>. Ask for <strong>Robert Cashman, Tuckers Duty Solicitor</strong>. Attendance is subject to availability.</p>

<h2>Firms — trigger points for instructing cover</h2>
<ul>
<li>Overnight or weekend custody when your rota has no available accredited rep</li>
<li>Two or more detainees requiring simultaneous attendance</li>
<li>Geographic conflict — your rep is at Canterbury while custody is at Medway</li>
<li>Fee earner conflict — the usual rep is counsel or in court</li>
<li>Overflow during busy periods without turning work away</li>
</ul>
<p>Instruct as early as possible once you know station, client details, and custody reference. Late instructions risk delayed attendance and weaker consultation time before interview.</p>

<h2>What happens after the agent attends</h2>
<p>The firm receives written notes and resumes conduct of the matter — bail return, charging decision, court representation. The agent's attendance is a delegated step, not a transfer of the case unless formally agreed. Agree note format and billing when establishing an ongoing cover relationship.</p>`,
};

let updated = 0;
for (const [file, block] of Object.entries(EXPANSIONS)) {
  const filePath = path.join(dir, file);
  const post = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const marker = '<div class="advert-cta"';
  if (!post.contentHtml.includes(marker)) {
    console.warn(`Skip ${file}: no advert marker`);
    continue;
  }
  if (post.contentHtml.includes("How freelance agents differ from duty solicitor")) continue;
  post.contentHtml = post.contentHtml.replace(marker, `${block.trim()}\n\n${marker}`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + "\n");
  console.log(`Expanded ${file}`);
  updated++;
}
console.log(`\nUpdated ${updated} post(s).`);
