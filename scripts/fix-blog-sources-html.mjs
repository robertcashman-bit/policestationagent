#!/usr/bin/env node
/**
 * Fix malformed Sources sections where </ul> closes before trailing <li> items.
 */
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "data/blog-posts");
let fixed = 0;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const filePath = path.join(dir, file);
  const post = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const html = post.contentHtml;
  if (!html || !/<\/ul>\s*<li>/.test(html)) continue;

  const next = html.replace(
    /(<h2>Sources<\/h2>\s*<ul>[\s\S]*?)<\/ul>(\s*(?:<li>[\s\S]*?<\/li>\s*)+)(\s*<p>)/,
    (_, head, orphanItems, tail) => `${head}${orphanItems}</ul>${tail}`,
  );

  if (next === html) continue;
  post.contentHtml = next;
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + "\n");
  console.log(`Fixed ${file}`);
  fixed++;
}

console.log(`\nFixed ${fixed} post(s).`);
