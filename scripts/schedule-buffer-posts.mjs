#!/usr/bin/env node
/**
 * Schedule Buffer posts from buffer-posts.json using Buffer API v1.
 * Requires BUFFER_ACCESS_TOKEN and BUFFER_PROFILE_ID env vars.
 * Usage: node scripts/schedule-buffer-posts.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";

const dryRun = process.argv.includes("--dry-run");
const token = process.env.BUFFER_ACCESS_TOKEN?.trim();
const profileId = process.env.BUFFER_PROFILE_ID?.trim() || "69d26c06031bfa423cd0c50d";

const bufferPath = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer", "buffer-posts.json");
const posts = JSON.parse(fs.readFileSync(bufferPath, "utf8"));

if (!token) {
  console.log("BUFFER_ACCESS_TOKEN not set. Calendar files generated for manual upload:");
  console.log("  seo-growth-police-station-agent/buffer/buffer-posts.csv");
  console.log("  seo-growth-police-station-agent/buffer/buffer-posts.json");
  console.log(`\n${posts.length} posts ready. Upload at https://publish.buffer.com`);
  process.exit(0);
}

const results = { scheduledAt: new Date().toISOString(), posts: [] };

for (const item of posts) {
  const text = `${item.text}\n\n${item.hashtags}`;
  const body = new URLSearchParams({
    access_token: token,
    profile_ids: profileId,
    text,
    scheduled_at: `${item.date}T08:30:00Z`,
    shorten: "false",
  });

  if (dryRun) {
    console.log(`[dry-run] Would schedule ${item.date}: ${item.slug}`);
    continue;
  }

  const res = await fetch("https://api.bufferapp.com/1/updates/create.json", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    console.error(`Failed ${item.slug}:`, data);
    process.exit(1);
  }
  results.posts.push({
    id: data.updates?.[0]?.id || data.id,
    dueAt: data.updates?.[0]?.due_at || `${item.date}T08:30:00.000Z`,
    url: item.url,
    slug: item.slug,
  });
  console.log(`Scheduled ${item.date}: ${item.slug}`);
}

if (!dryRun) {
  const outPath = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer", "buffer-scheduled-results.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote ${results.posts.length} scheduled posts to buffer-scheduled-results.json`);
}
