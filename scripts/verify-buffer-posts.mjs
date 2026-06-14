#!/usr/bin/env node
/**
 * Verify Buffer calendar URLs and OG images resolve on production.
 */
import fs from "fs";
import path from "path";

const bufferPath = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer", "buffer-posts.json");
const posts = JSON.parse(fs.readFileSync(bufferPath, "utf8"));

let failed = 0;
for (const item of posts) {
  try {
    const res = await fetch(item.url, { method: "HEAD", redirect: "follow" });
    const ok = res.status >= 200 && res.status < 400;
    const imgOk = item.image ? (await fetch(item.image, { method: "HEAD" })).ok : true;
    if (!ok || !imgOk) {
      console.error(`FAIL ${item.slug}: page=${res.status} image=${imgOk ? "ok" : "fail"} ${item.url}`);
      failed++;
    } else {
      console.log(`OK ${item.slug} (${res.status})`);
    }
  } catch (e) {
    console.error(`FAIL ${item.slug}: ${e.message}`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} buffer post(s) failed verification.`);
  process.exit(1);
}
console.log(`\nAll ${posts.length} buffer posts verified.`);
