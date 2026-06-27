#!/usr/bin/env node
/**
 * Store Bing Webmaster API key on Vercel production + GitHub Actions (if permitted).
 *
 * Usage:
 *   BING_WEBMASTER_API_KEY=your-key node scripts/setup-bing-webmaster-key.mjs
 *
 * Get the key: bing.com/webmasters → Import from Google Search Console →
 * Settings → API access (sign in as robertdavidcashman@gmail.com).
 */
import { execSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const key = process.env.BING_WEBMASTER_API_KEY?.trim();

function run(cmd) {
  execSync(cmd, { stdio: "inherit", cwd: ROOT });
}

if (!key) {
  console.error("Set BING_WEBMASTER_API_KEY to your Bing Webmaster API key.");
  console.error("");
  console.error("1. https://www.bing.com/webmasters");
  console.error("2. Sign in: robertdavidcashman@gmail.com");
  console.error("3. Import from Google Search Console → policestationagent.com");
  console.error("4. Add policestationrepuk.org the same way");
  console.error("5. Settings → API access → copy key");
  console.error("");
  console.error("Then run:");
  console.error("  BING_WEBMASTER_API_KEY=... node scripts/setup-bing-webmaster-key.mjs");
  process.exit(1);
}

console.log("[bing] Setting BING_WEBMASTER_API_KEY on Vercel production…");
const token = execSync(
  "python3 -c \"import json;print(json.load(open('/Users/robertcashman/Library/Application Support/com.vercel.cli/auth.json'))['token'])\"",
  { encoding: "utf8", cwd: ROOT },
).trim();
const projectId = "prj_XvBhew2OZV8JYpI2dNHDTD6P05Ai";
const teamId = "team_wbvkpoLfvbg9qFwg5LqJLAjN";
const list = JSON.parse(
  execSync(
    `curl -s "https://api.vercel.com/v9/projects/${projectId}/env?teamId=${teamId}" -H "Authorization: Bearer ${token}"`,
    { encoding: "utf8", cwd: ROOT },
  ),
);
for (const env of list.envs || []) {
  if (env.key === "BING_WEBMASTER_API_KEY") {
    execSync(
      `curl -s -X DELETE "https://api.vercel.com/v9/projects/${projectId}/env/${env.id}?teamId=${teamId}" -H "Authorization: Bearer ${token}"`,
      { stdio: "pipe", cwd: ROOT },
    );
  }
}
// Use encrypted (not sensitive) — sensitive vars do not load via vercel env pull/run.
const body = JSON.stringify({
  key: "BING_WEBMASTER_API_KEY",
  value: key,
  type: "encrypted",
  target: ["production"],
});
execSync(
  `curl -s -X POST "https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}" ` +
    `-H "Authorization: Bearer ${token}" -H "Content-Type: application/json" ` +
    `-d ${JSON.stringify(body)}`,
  { stdio: "pipe", cwd: ROOT },
);
console.log("[bing] Vercel production env set (encrypted).");

console.log("[bing] Setting GitHub Actions secret (optional)…");
try {
  run(`gh secret set BING_WEBMASTER_API_KEY --body "${key}" --repo robertdavidcashman-droid/one`);
  console.log("[bing] GitHub secret set.");
} catch {
  console.log("[bing] GitHub secret skipped (no repo secret permission — Vercel production is enough for cron).");
}

console.log("[bing] Done. Next deploy will submit URLs to Bing for PSA + REPUK.");
console.log("[bing] Run now: npm run notify:search-engines");
