import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimitOk } from "@/lib/contact-guards";
import { isAllowedEnquiryOrigin } from "@/lib/enquiry/origin";
import { createEnquiryReference } from "@/lib/enquiry/reference";
import { parseMultipartUploads } from "@/lib/enquiry/uploads";
import { sendAgencyEnquiryEmails } from "@/lib/enquiry/email";

export const runtime = "nodejs";

const MAX_LEN = 2000;
function str(max = MAX_LEN) {
  return z.string().trim().max(max);
}

const AgencySchema = z.object({
  firmName: str(300).min(1),
  instructerName: str(200).min(1),
  workEmail: z.string().trim().email().max(200),
  directPhone: str(80).min(1),
  office: str(200),
  laaCode: str(80),
  purchaseOrder: str(120),
  clientName: str(200).min(1),
  clientDob: str(40),
  policeStation: str(300).min(1),
  custodySuite: str(200),
  custodyRecord: str(120),
  dsccReference: str(120),
  allegedOffence: str(2000).min(1),
  arrestStatus: str(40),
  interviewDate: str(40),
  interviewTime: str(40),
  officerName: str(200),
  officerPhone: str(80),
  officerEmail: str(200),
  disclosureSummary: str(2000),
  interpreter: str(20),
  appropriateAdult: str(20),
  conflictInfo: str(1000),
  urgency: str(40),
  scope: str(1000),
  writtenReport: str(20),
  billingContact: str(200),
  rateStatus: str(40),
  authority: z.enum(["true"]),
  conflicts: z.enum(["true"]),
  pendingAcceptance: z.enum(["true"]),
  funding: z.enum(["true"]),
  ratesReviewed: z.enum(["true"]),
  company: str(200).optional(),
  utm_source: str(120).optional(),
  utm_medium: str(120).optional(),
  utm_campaign: str(120).optional(),
  landingPage: str(300).optional(),
});

function formString(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

function clientInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "N/A";
  return parts
    .map((p) => p[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 4);
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedEnquiryOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const rate = await rateLimitOk({
      ip: getClientIp(request),
      scope: "enquiry-agency",
      max: 8,
      windowMs: 60_000,
    });
    if (!rate.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const formData = await request.formData();
    const honeypot = formString(formData, "company").trim();
    if (honeypot) {
      return NextResponse.json({
        success: true,
        reference: createEnquiryReference("AGY"),
        emailNotified: false,
      });
    }

    const raw: Record<string, string> = {};
    for (const key of [
      "firmName",
      "instructerName",
      "workEmail",
      "directPhone",
      "office",
      "laaCode",
      "purchaseOrder",
      "clientName",
      "clientDob",
      "policeStation",
      "custodySuite",
      "custodyRecord",
      "dsccReference",
      "allegedOffence",
      "arrestStatus",
      "interviewDate",
      "interviewTime",
      "officerName",
      "officerPhone",
      "officerEmail",
      "disclosureSummary",
      "interpreter",
      "appropriateAdult",
      "conflictInfo",
      "urgency",
      "scope",
      "writtenReport",
      "billingContact",
      "rateStatus",
      "authority",
      "conflicts",
      "pendingAcceptance",
      "funding",
      "ratesReviewed",
      "company",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "landingPage",
    ]) {
      raw[key] = formString(formData, key);
    }

    const parsed = AgencySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form fields and try again." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const uploads = await parseMultipartUploads(formData, "files");
    if (uploads.error) {
      return NextResponse.json({ error: uploads.error }, { status: 400 });
    }

    const reference = createEnquiryReference("AGY");
    const initials = clientInitials(data.clientName);
    const proposedTime = [data.interviewDate, data.interviewTime].filter(Boolean).join(" ");

    const businessBody = [
      `Agency instructions ${reference}`,
      "",
      `Firm: ${data.firmName}`,
      `Instructer: ${data.instructerName}`,
      `Email: ${data.workEmail}`,
      `Phone: ${data.directPhone}`,
      `Office: ${data.office}`,
      `LAA code: ${data.laaCode}`,
      `PO / ref: ${data.purchaseOrder}`,
      "",
      `Client: ${data.clientName}`,
      `DOB: ${data.clientDob}`,
      `Station: ${data.policeStation}`,
      `Custody suite: ${data.custodySuite}`,
      `Custody record: ${data.custodyRecord}`,
      `DSCC: ${data.dsccReference}`,
      `Offence: ${data.allegedOffence}`,
      `Status: ${data.arrestStatus}`,
      `Attendance: ${proposedTime}`,
      `Officer: ${data.officerName} / ${data.officerPhone} / ${data.officerEmail}`,
      `Disclosure: ${data.disclosureSummary}`,
      `Interpreter: ${data.interpreter}`,
      `Appropriate adult: ${data.appropriateAdult}`,
      `Conflicts: ${data.conflictInfo}`,
      `Urgency: ${data.urgency}`,
      `Scope: ${data.scope}`,
      `Written report: ${data.writtenReport}`,
      `Billing: ${data.billingContact}`,
      `Rate status: ${data.rateStatus}`,
      "",
      `Landing: ${data.landingPage || ""}`,
      `UTM: ${data.utm_source || ""} / ${data.utm_medium || ""} / ${data.utm_campaign || ""}`,
      `Attachments: ${uploads.attachments.length}`,
    ].join("\n");

    const emailResult = await sendAgencyEnquiryEmails({
      reference,
      businessBody,
      ackEmail: data.workEmail,
      clientInitials: initials,
      station: data.policeStation,
      proposedTime,
      attachments: uploads.attachments,
    });

    return NextResponse.json({
      success: true,
      reference,
      emailNotified: emailResult.businessOk,
    });
  } catch (err) {
    console.error("[agency enquiry]", err);
    return NextResponse.json({ error: "Failed to submit agency instructions" }, { status: 500 });
  }
}
