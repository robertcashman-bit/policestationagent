#!/usr/bin/env node
/**
 * GBP weekly post template — copy into Google Business Profile or Buffer GBP channel.
 * Usage: node scripts/gbp-weekly-post.mjs [--week=N]
 */
const WEEKS = [
  {
    title: "Free police station advice in Kent",
    body: "Arrested or invited for a voluntary interview in Kent? Legal advice at the police station is free under Legal Aid for most interviews under caution. Ask for Robert Cashman, Tuckers Duty Solicitor. Call 01732 247427.",
    link: "https://www.policestationagent.com/free-police-station-advice-kent?utm_source=gbp&utm_medium=organic&utm_campaign=weekly_post",
    button: "Learn more",
  },
  {
    title: "Kent police station reps hub",
    body: "Police station representation across Kent — regular attendance at Gravesend, Tonbridge, Medway and voluntary interviews county-wide. NOT Kent Police — independent duty solicitor via Tuckers Solicitors LLP.",
    link: "https://www.policestationagent.com/kent-police-station-reps?utm_source=gbp&utm_medium=organic&utm_campaign=weekly_post",
    button: "View coverage",
  },
  {
    title: "Voluntary interview? Get advice first",
    body: "A voluntary police interview is under caution — not an informal chat. Speak to a solicitor before you attend. Free Legal Aid advice for most interviews in Kent.",
    link: "https://www.policestationagent.com/voluntary-police-interview?utm_source=gbp&utm_medium=organic&utm_campaign=weekly_post",
    button: "Read guide",
  },
  {
    title: "Agent cover for criminal defence firms",
    body: "Kent criminal defence firms — reliable police station attendance, DSCC custody record support, and attendance notes. Instruct Robert Cashman for agent cover.",
    link: "https://www.policestationagent.com/for-solicitors?utm_source=gbp&utm_medium=organic&utm_campaign=weekly_post",
    button: "For solicitors",
  },
];

const weekArg = process.argv.find((a) => a.startsWith("--week="));
const week = weekArg ? Number(weekArg.split("=")[1]) : Math.floor(Date.now() / (7 * 86_400_000)) % WEEKS.length;
const post = WEEKS[week] ?? WEEKS[0];

console.log("=== GBP weekly post template ===\n");
console.log(`Week rotation index: ${week}\n`);
console.log("Post text (paste into GBP — no URL in body; use Learn more button):\n");
console.log(post.body);
console.log("\nLearn more URL:");
console.log(post.link);
console.log("\nButton label:", post.button);
console.log("\nImage: /images/buffer/gbp/policestationagent-default.jpg (square, hosted on site)");
console.log("\nAfter publishing, set GOOGLE_BUSINESS_PROFILE_URL in Vercel for schema sameAs.");
