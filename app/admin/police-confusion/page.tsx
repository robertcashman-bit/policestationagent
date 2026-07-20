import fs from "fs";
import path from "path";
import { AdminGate } from "@/components/admin/AdminGate";
import { AdminShell } from "@/components/admin/AdminShell";
import type { Metadata } from "next";
import type { PoliceConfusionHealthReport } from "@/lib/seo/police-confusion-health";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Police confusion | Admin",
  description: "Daily Police Confusion Score reports and outstanding issues.",
  robots: { index: false, follow: false },
};

function loadLatestReport(): PoliceConfusionHealthReport | null {
  const latestPath = path.join(process.cwd(), "data", "police-confusion-reports", "latest.json");
  if (!fs.existsSync(latestPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(latestPath, "utf8")) as PoliceConfusionHealthReport;
  } catch {
    return null;
  }
}

export default function PoliceConfusionAdminPage() {
  const report = loadLatestReport();

  return (
    <AdminGate>
      {({ email }) => (
        <AdminShell
          active="police-confusion"
          adminEmail={email}
          title="Police confusion monitor"
          description="On-page Police Confusion Score — ensures search engines do not treat our telephone as Kent Police."
        >
          {!report ? (
            <p className="text-slate-600">
              No report yet. Run <code className="text-sm bg-slate-100 px-1 rounded">npm run seo:police-confusion</code>{" "}
              or wait for the daily cron at 02:00 UTC.
            </p>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Pages tested" value={String(report.summary.pagesTested)} />
                <Stat label="Average score" value={String(report.summary.averageScore)} />
                <Stat label="High risk" value={String(report.summary.highRiskCount)} />
                <Stat label="Trend" value={report.summary.trendSincePrevious} />
              </div>

              <p className="text-sm text-slate-500">
                Generated {new Date(report.generatedAt).toLocaleString("en-GB")} · Schema errors:{" "}
                {report.summary.schemaErrors} · False telephone association:{" "}
                {report.summary.falseTelephoneAssociation}
              </p>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Actions performed</h2>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {report.summary.actionsPerformed.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">Outstanding issues</h2>
                {report.summary.outstandingIssues.length === 0 ? (
                  <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg p-4">
                    No high-risk pages in the latest run.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {report.summary.outstandingIssues.map((issue) => (
                      <li
                        key={issue.path}
                        className="border border-amber-200 bg-amber-50 rounded-lg p-4 text-sm"
                      >
                        <p className="font-semibold text-slate-900">
                          Score {issue.score}: {issue.path}
                        </p>
                        <p className="text-slate-600 mt-1">Flags: {issue.flags.join(", ")}</p>
                        <ul className="mt-2 list-disc list-inside text-slate-700">
                          {issue.recommendations.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-3">External checks</h2>
                <pre className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-auto">
                  {JSON.stringify(report.summary.externalChecks, null, 2)}
                </pre>
              </section>
            </div>
          )}
        </AdminShell>
      )}
    </AdminGate>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
    </div>
  );
}
