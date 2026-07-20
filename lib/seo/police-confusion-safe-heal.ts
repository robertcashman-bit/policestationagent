import fs from "fs";
import path from "path";
import { SEO_NOT_POLICE } from "@/config/contact";

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

  const appDir = path.join(root, "app");
  let solicitorTitleFixes = 0;
  let stationMetaFixes = 0;
  let stationTitleFixes = 0;

  if (fs.existsSync(appDir)) {
    for (const entry of fs.readdirSync(appDir)) {
      const pagePath = path.join(appDir, entry, "page.tsx");
      if (!fs.existsSync(pagePath)) continue;

      // Soften solicitor titles that end with "| Call 01732 247427"
      if (entry.endsWith("-solicitor")) {
        let src = fs.readFileSync(pagePath, "utf8");
        const before = src;
        src = src.replace(/\|\s*Call 01732 247427/g, "| Independent Criminal Defence");
        if (src !== before) {
          fs.writeFileSync(pagePath, src, "utf8");
          solicitorTitleFixes += 1;
        }
        continue;
      }

      if (!entry.endsWith("-police-station") && !entry.endsWith("-psa-station")) {
        continue;
      }

      let src = fs.readFileSync(pagePath, "utf8");
      const before = src;

      // Remove Call 01732 from station titles (same as solicitor pages)
      const titlePhoneBefore = src;
      src = src.replace(/\|\s*Call 01732 247427/g, "| Independent Criminal Defence");
      if (src !== titlePhoneBefore) {
        stationTitleFixes += 1;
      }

      // Soften titles that are bare police-entity without solicitor/information words
      src = src.replace(
        /title:\s*(["'`])((?:(?!\1).)*Police Station(?:(?!\1).)*)\1/gi,
        (full, quote: string, title: string) => {
          if (/solicitor|information|guide|independent|representation|rep\b/i.test(title)) {
            return full;
          }
          stationTitleFixes += 1;
          const healed = `${title.trim()} Information | Independent Criminal Defence Solicitors`;
          return `title: ${quote}${healed}${quote}`;
        },
      );

      // Rewrite descriptions that mention Call/01732 with custody/station framing
      src = src.replace(
        /description:\s*(["'`])((?:(?!\1)[\s\S])*?)\1/gi,
        (full, quote: string, desc: string) => {
          const hasPhone = /01732|Call Robert|Call 01732|\bcall now\b/i.test(desc);
          const hasStation =
            /custody|police station|police interview|arrested|gillingham|kent/i.test(desc);
          if (!hasPhone || !hasStation) return full;
          if (/NOT Kent Police|independent criminal defence/i.test(desc)) return full;

          stationMetaFixes += 1;
          const townMatch = entry.match(/^([a-z0-9-]+)-(?:police|psa)-station$/);
          const town = townMatch
            ? townMatch[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : "Kent";
          const healed = `${SEO_NOT_POLICE} Independent criminal defence solicitors for ${town} custody and booked voluntary interviews. FREE Legal Aid where eligible — not a police contact number.`;
          return `description: ${quote}${healed}${quote}`;
        },
      );

      // Also heal openGraph title/description when they mirror the bad patterns
      src = src.replace(
        /openGraph:\s*\{[\s\S]*?title:\s*(["'`])((?:(?!\1).)*Police Station(?:(?!\1).)*)\1/i,
        (block) =>
          block.replace(
            /title:\s*(["'`])((?:(?!\1).)*)\1/,
            (full, quote: string, title: string) => {
              if (/solicitor|information|guide|independent|representation|rep\b/i.test(title)) {
                return full;
              }
              return `title: ${quote}${title.trim()} Information | Independent Criminal Defence Solicitors${quote}`;
            },
          ),
      );

      if (src !== before) {
        fs.writeFileSync(pagePath, src, "utf8");
      }
    }
  }

  if (solicitorTitleFixes > 0) {
    actions.push(
      `Healed ${solicitorTitleFixes} solicitor page title(s): removed Call 01732 from titles`,
    );
  }
  if (stationTitleFixes > 0) {
    actions.push(
      `Healed ${stationTitleFixes} station page title(s): added Information / Independent framing`,
    );
  }
  if (stationMetaFixes > 0) {
    actions.push(
      `Healed ${stationMetaFixes} station meta description(s): removed Call 01732 / custody phone framing`,
    );
  }

  if (actions.length === 0) {
    actions.push("Safe auto-heal: no registered metadata repairs needed");
  }

  return actions;
}
