import fs from "fs";
import path from "path";

/**
 * Safe auto-heal: only rewrite known dangerous metadata/schema patterns
 * in registered source files. Never rewrites long scraped HTML bodies.
 */
export function applySafeMetadataHeals(root = process.cwd()): string[] {
  const actions: string[] = [];

  const slugPath = path.join(root, "app/police-stations/[slug]/page.tsx");
  if (fs.existsSync(slugPath)) {
    const src = fs.readFileSync(slugPath, "utf8");
    if (
      /"@type":\s*"LocalBusiness"/.test(src) &&
      /telephone:\s*"\+441732247427"/.test(src) &&
      /streetAddress/.test(src)
    ) {
      actions.push(
        "ALERT: LocalBusiness+telephone+streetAddress detected on /police-stations/[slug] — manual fix required",
      );
    }
    if (/Located at[^`]*Call 01732/.test(src)) {
      actions.push(
        "ALERT: meta description still concatenates station address + Call 01732 on [slug] page",
      );
    }
  }

  const legacyPath = path.join(root, "legacy/stationPage.tsx");
  if (fs.existsSync(legacyPath)) {
    const src = fs.readFileSync(legacyPath, "utf8");
    if (/LocalBusiness/.test(src) && /telephone/.test(src) && /streetAddress/.test(src)) {
      actions.push(
        "ALERT: legacy/stationPage.tsx still binds telephone to station address",
      );
    }
  }

  // Soften solicitor titles that end with "| Call 01732 247427" → legal-intent framing
  const appDir = path.join(root, "app");
  let solicitorTitleFixes = 0;
  if (fs.existsSync(appDir)) {
    for (const entry of fs.readdirSync(appDir)) {
      if (!entry.endsWith("-solicitor")) continue;
      const pagePath = path.join(appDir, entry, "page.tsx");
      if (!fs.existsSync(pagePath)) continue;
      let src = fs.readFileSync(pagePath, "utf8");
      const before = src;
      src = src.replace(
        /\|\s*Call 01732 247427/g,
        "| Independent Criminal Defence",
      );
      if (src !== before) {
        fs.writeFileSync(pagePath, src, "utf8");
        solicitorTitleFixes += 1;
      }
    }
  }
  if (solicitorTitleFixes > 0) {
    actions.push(
      `Healed ${solicitorTitleFixes} solicitor page title(s): removed Call 01732 from titles`,
    );
  }

  if (actions.length === 0) {
    actions.push("Safe auto-heal: no registered metadata repairs needed");
  }

  return actions;
}
