import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, rateLimitOk } from "@/lib/contact-guards";
import { isAllowedEnquiryOrigin } from "@/lib/enquiry/origin";
import { createEnquiryReference } from "@/lib/enquiry/reference";
import { parseMultipartUploads } from "@/lib/enquiry/uploads";
import { sendVoluntaryEnquiryEmails } from "@/lib/enquiry/email";

export const runtime = "nodejs";

const MAX_LEN = 2000;

function str(max = MAX_LEN) {
  return z.string().trim().max(max);
}

const VoluntarySchema = z.object({
  formMode: z.enum(["full", "short"]).optional().default("full"),
  enquiryType: z.enum(["booked", "no_date", "message", "no", "unsure"]),
  policeForce: str(200),
  policeStation: str(300),
  town: str(200),
  inKent: z.enum(["yes", "no", "unsure", ""]),
  interviewDate: str(40),
  interviewTime: str(40),
  officerName: str(200),
  officerRank: str(100),
  officerPhone: str(80),
  officerEmail: str(200),
  crimeReference: str(120),
  allegation: str(2000),
  receivedLetter: str(20),
  fullName: str(200).min(1),
  dateOfBirth: str(40),
  telephone: str(80).min(1),
  email: str(200),
  postcode: str(20),
  preferredContact: str(40),
  enquirerRole: str(40),
  otherSolicitor: str(20),
  otherSolicitorDetails: str(500),
  accurate: z.enum(["true"]),
  forthcoming: z.enum(["true"]),
  noRetainer: z.enum(["true"]),
  custodyRoute: z.enum(["true"]),
  notPolice: z.enum(["true"]),
  privacyConsent: z.enum(["true"]),
  company: str(200).optional(),
  utm_source: str(120).optional(),
  utm_medium: str(120).optional(),
  utm_campaign: str(120).optional(),
  landingPage: str(300).optional(),
  referrer: str(500).optional(),
});

function formString(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedEnquiryOrigin(request)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const rate = await rateLimitOk({
      ip: getClientIp(request),
      scope: "enquiry-voluntary",
      max: 5,
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
        reference: createEnquiryReference("VAI"),
        emailNotified: false,
      });
    }

    const parsed = VoluntarySchema.safeParse({
      formMode: formString(formData, "formMode") || "full",
      enquiryType: formString(formData, "enquiryType"),
      policeForce: formString(formData, "policeForce"),
      policeStation: formString(formData, "policeStation"),
      town: formString(formData, "town"),
      inKent: formString(formData, "inKent"),
      interviewDate: formString(formData, "interviewDate"),
      interviewTime: formString(formData, "interviewTime"),
      officerName: formString(formData, "officerName"),
      officerRank: formString(formData, "officerRank"),
      officerPhone: formString(formData, "officerPhone"),
      officerEmail: formString(formData, "officerEmail"),
      crimeReference: formString(formData, "crimeReference"),
      allegation: formString(formData, "allegation"),
      receivedLetter: formString(formData, "receivedLetter"),
      fullName: formString(formData, "fullName"),
      dateOfBirth: formString(formData, "dateOfBirth"),
      telephone: formString(formData, "telephone"),
      email: formString(formData, "email"),
      postcode: formString(formData, "postcode"),
      preferredContact: formString(formData, "preferredContact"),
      enquirerRole: formString(formData, "enquirerRole"),
      otherSolicitor: formString(formData, "otherSolicitor"),
      otherSolicitorDetails: formString(formData, "otherSolicitorDetails"),
      accurate: formString(formData, "accurate"),
      forthcoming: formString(formData, "forthcoming"),
      noRetainer: formString(formData, "noRetainer"),
      custodyRoute: formString(formData, "custodyRoute"),
      notPolice: formString(formData, "notPolice"),
      privacyConsent: formString(formData, "privacyConsent"),
      company: formString(formData, "company"),
      utm_source: formString(formData, "utm_source"),
      utm_medium: formString(formData, "utm_medium"),
      utm_campaign: formString(formData, "utm_campaign"),
      landingPage: formString(formData, "landingPage"),
      referrer: formString(formData, "referrer"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form fields and try again." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    if (data.enquiryType === "no") {
      return NextResponse.json(
        { error: "This form is only for police interview under caution enquiries." },
        { status: 400 },
      );
    }

    const isShort = data.formMode === "short";
    if (!isShort) {
      if (!data.policeStation.trim() || !data.allegation.trim() || !data.dateOfBirth.trim()) {
        return NextResponse.json(
          { error: "Please check the form fields and try again." },
          { status: 400 },
        );
      }
    } else if (!data.telephone.trim()) {
      return NextResponse.json(
        { error: "Please check the form fields and try again." },
        { status: 400 },
      );
    }

    const uploads = await parseMultipartUploads(formData, "files");
    if (uploads.error) {
      return NextResponse.json({ error: uploads.error }, { status: 400 });
    }

    const reference = createEnquiryReference("VAI");
    const ackEmail = data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? data.email : null;

    const businessBody = [
      `Voluntary interview enquiry ${reference}`,
      "",
      `Form mode: ${data.formMode || "full"}`,
      `Enquiry type: ${data.enquiryType}`,
      `Force: ${data.policeForce}`,
      `Station: ${data.policeStation || "Not yet known"}`,
      `Town: ${data.town}`,
      `In Kent: ${data.inKent}`,
      `Interview date: ${data.interviewDate}`,
      `Interview time: ${data.interviewTime}`,
      `Officer: ${data.officerName} (${data.officerRank})`,
      `Officer phone: ${data.officerPhone}`,
      `Officer email: ${data.officerEmail}`,
      `Crime reference: ${data.crimeReference}`,
      `Allegation: ${data.allegation}`,
      `Received letter/email: ${data.receivedLetter}`,
      "",
      `Client name: ${data.fullName}`,
      `DOB: ${data.dateOfBirth}`,
      `Telephone: ${data.telephone}`,
      `Email: ${data.email}`,
      `Postcode: ${data.postcode}`,
      `Preferred contact: ${data.preferredContact}`,
      `Enquirer role: ${data.enquirerRole}`,
      `Other solicitor: ${data.otherSolicitor} ${data.otherSolicitorDetails}`,
      "",
      `Landing: ${data.landingPage || ""}`,
      `Referrer: ${data.referrer || ""}`,
      `UTM: ${data.utm_source || ""} / ${data.utm_medium || ""} / ${data.utm_campaign || ""}`,
      `Attachments: ${uploads.attachments.length}`,
    ].join("\n");

    const emailResult = await sendVoluntaryEnquiryEmails({
      reference,
      businessBody,
      ackEmail,
      stationLabel: data.policeStation || "Not yet known",
      attachments: uploads.attachments,
    });

    return NextResponse.json({
      success: true,
      reference,
      emailNotified: emailResult.businessOk,
    });
  } catch (err) {
    console.error("[voluntary enquiry]", err);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
