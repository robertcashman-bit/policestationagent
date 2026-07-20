import { NextResponse } from "next/server";
import { isCronAuthorized } from "@/lib/cron-auth";
import { runPoliceConfusionHealthCheck } from "@/lib/seo/police-confusion-health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/** Daily police-confusion health check (on-page scoring + optional external hooks). */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await runPoliceConfusionHealthCheck();
  return NextResponse.json({ ok: true, report });
}
