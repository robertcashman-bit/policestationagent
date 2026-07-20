import fs from "fs";
import path from "path";
import {
  CONFUSION_THRESHOLD,
  scorePageConfusion,
  type ConfusionFlag,
  type ConfusionResult,
} from "@/lib/seo/police-confusion-score";
import { runExternalConfusionChecks } from "@/lib/seo/external-confusion-monitors";
import { disambiguateStationHtml } from "@/lib/seo/disambiguate-station-html";
import { applySafeMetadataHeals } from "@/lib/seo/police-confusion-safe-heal";

const SNIPPET_FLAGS: ConfusionFlag[] = [
  "opening_starts_with_call",
  "phone_under_station_facts",
  "meta_call_near_station",
];

export interface PoliceConfusionHealthReport {
  generatedAt: string;
  summary: {
    pagesTested: number;
    averageScore: number;
    highRiskCount: number;
    falsePoliceIntent: number;
    falseTelephoneAssociation: number;
    schemaErrors: number;
    snippetProblems: number;
    actionsPerformed: string[];
    outstandingIssues: Array<{
      path: string;
      score: number;
      flags: string[];
      recommendations: string[];
    }>;
    trendSincePrevious: string;
    previousAverageScore: number | null;
    externalChecks: unknown;
  };
  pages: ConfusionResult[];
}

const STATIC_TARGETS = [
  "app/kent-police-stations/page.tsx",
  "app/police-stations/[slug]/page.tsx",
  "app/coverage/police-stations/page.tsx",
  "app/coverage/police-stations/[station-name]/page.tsx",
  "app/police-stations/page.tsx",
  "app/locations/page.tsx",
];

/** Discover station page sources + fixed hubs. */
export function discoverConfusionTargets(root = process.cwd()): string[] {
  const appDir = path.join(root, "app");
  const found = new Set<string>(STATIC_TARGETS);

  if (fs.existsSync(appDir)) {
    for (const entry of fs.readdirSync(appDir)) {
      if (
        entry.endsWith("-police-station") ||
        entry.endsWith("-psa-station")
      ) {
        const rel = `app/${entry}/page.tsx`;
        if (fs.existsSync(path.join(root, rel))) {
          found.add(rel);
        }
      }
    }
  }

  return [...found].sort();
}

function extractQuoted(src: string, key: string): string {
  const re = new RegExp(`${key}:\\s*[\`'\"]([\\s\\S]*?)[\`'\"]`, "i");
  const m = src.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim().slice(0, 500) : "";
}

function extractH1(src: string): string {
  const m = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return "";
  return m[1].replace(/\{[^}]+\}/g, "X").replace(/<[^>]+>/g, "").trim();
}

export async function runPoliceConfusionHealthCheck(): Promise<PoliceConfusionHealthReport> {
  const root = process.cwd();
  const reportDir = path.join(root, "data", "police-confusion-reports");
  fs.mkdirSync(reportDir, { recursive: true });

  let previous: PoliceConfusionHealthReport | null = null;
  const latestPath = path.join(reportDir, "latest.json");
  if (fs.existsSync(latestPath)) {
    try {
      previous = JSON.parse(fs.readFileSync(latestPath, "utf8")) as PoliceConfusionHealthReport;
    } catch {
      previous = null;
    }
  }

  // Heal metadata first so scores reflect post-heal titles/descriptions
  const healActions = applySafeMetadataHeals(root);

  const targets = discoverConfusionTargets(root);
  const pages: ConfusionResult[] = [];
  for (const rel of targets) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, "utf8");
    const healed = disambiguateStationHtml(src);
    pages.push(
      scorePageConfusion({
        path: `/${rel}`,
        title: extractQuoted(src, "title"),
        h1: extractH1(healed) || extractH1(src),
        metaDescription: extractQuoted(src, "description"),
        html: healed,
        jsonLd: src,
        bodyText: healed,
      }),
    );
  }

  const highRisk = pages.filter((p) => p.score >= CONFUSION_THRESHOLD);
  const avg =
    pages.length === 0
      ? 0
      : Math.round(pages.reduce((s, p) => s + p.score, 0) / pages.length);
  const prevAvg = previous?.summary?.averageScore ?? null;

  const externalChecks = await runExternalConfusionChecks();

  const snippetProblems = pages.filter((p) =>
    p.flags.some((f) => SNIPPET_FLAGS.includes(f)),
  ).length;

  const report: PoliceConfusionHealthReport = {
    generatedAt: new Date().toISOString(),
    summary: {
      pagesTested: pages.length,
      averageScore: avg,
      highRiskCount: highRisk.length,
      falsePoliceIntent: pages.filter((p) => p.flags.includes("police_intent_dominant")).length,
      falseTelephoneAssociation: pages.filter(
        (p) =>
          p.flags.includes("schema_telephone_on_station_address") ||
          p.flags.includes("phone_under_station_facts") ||
          p.flags.includes("meta_call_near_station"),
      ).length,
      schemaErrors: pages.filter((p) =>
        p.flags.includes("schema_telephone_on_station_address"),
      ).length,
      snippetProblems,
      actionsPerformed: [
        "Scored on-page police confusion signals",
        "Runtime scraped HTML disambiguation is active via normalizeScrapedHtml",
        `Audited ${targets.length} discovered station/hub targets`,
        ...healActions,
      ],
      outstandingIssues: highRisk.map((p) => ({
        path: p.path,
        score: p.score,
        flags: p.flags,
        recommendations: p.recommendations,
      })),
      trendSincePrevious:
        prevAvg === null
          ? "no-baseline"
          : avg < prevAvg
            ? "improved"
            : avg > prevAvg
              ? "worsened"
              : "unchanged",
      previousAverageScore: prevAvg,
      externalChecks,
    },
    pages,
  };

  fs.writeFileSync(latestPath, JSON.stringify(report, null, 2));
  const stamp = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(reportDir, `${stamp}.json`), JSON.stringify(report, null, 2));

  return report;
}
