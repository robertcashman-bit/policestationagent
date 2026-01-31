import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { sendContactFormNotification } from "@/lib/email";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest): string | null {
  // Vercel / proxies commonly set one of these.
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null;
  const realIp = request.headers.get("x-real-ip");
  return realIp?.trim() || null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body?.name ?? "").trim();
    const contactNumber = String(body?.contactNumber ?? "").trim();
    const emailRaw = String(body?.email ?? "").trim();
    const email = emailRaw === "" ? null : emailRaw;
    const role = String(body?.role ?? "").trim();
    const requestTypeLegacy = String(body?.requestType ?? "").trim();
    const requestType =
      requestTypeLegacy === "self" || requestTypeLegacy === "client"
        ? requestTypeLegacy
        : role === "solicitor" || role === "representative"
          ? "client"
          : role === "family"
            ? "self"
            : requestTypeLegacy || "self";
    const clientName = String(body?.clientName ?? "").trim();
    const clientDOB = String(body?.clientDOB ?? "").trim();
    const policeStation = String(body?.policeStation ?? "").trim();
    const interviewDate = String(body?.interviewDate ?? "").trim();
    const interviewTime = String(body?.interviewTime ?? "").trim();
    const attendanceType = String(body?.attendanceType ?? "").trim();
    const briefDetails = String(body?.briefDetails ?? "").trim();
    const offenceSummaryLegacy = String(body?.offenceSummary ?? "").trim();
    const offenceSummary = briefDetails || offenceSummaryLegacy;
    const contactWindow = String(body?.contactWindow ?? "").trim();
    const contactWindowTime = String(body?.contactWindowTime ?? "").trim();
    const supportNeeds = String(body?.supportNeeds ?? "").trim();
    const consent = Boolean(body?.consent);

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!contactNumber) {
      return NextResponse.json({ error: "Contact number is required" }, { status: 400 });
    }
    if (email !== null && !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (!policeStation) {
      return NextResponse.json({ error: "Police station is required" }, { status: 400 });
    }
    if (!interviewDate) {
      return NextResponse.json({ error: "Interview date is required" }, { status: 400 });
    }
    if (!interviewTime) {
      return NextResponse.json({ error: "Interview time is required" }, { status: 400 });
    }
    if (!attendanceType) {
      return NextResponse.json({ error: "Attendance type is required" }, { status: 400 });
    }
    if (!offenceSummary) {
      return NextResponse.json({ error: "Brief details are required" }, { status: 400 });
    }
    if (requestType === "client" && (!clientName || !clientDOB)) {
      return NextResponse.json(
        { error: "Client name and date of birth are required when requesting for a client" },
        { status: 400 }
      );
    }
    if (contactWindow === "specify" && !contactWindowTime) {
      return NextResponse.json({ error: "Please specify a contact time" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: "Consent is required" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent");
    const ipAddress = getClientIp(request);

    db.prepare(
      `
        INSERT INTO contact_messages (
          name,
          contact_number,
          email,
          request_type,
          client_name,
          client_dob,
          police_station,
          interview_date,
          interview_time,
          attendance_type,
          offence_summary,
          contact_window,
          contact_window_time,
          support_needs,
          consent,
          user_agent,
          ip_address
        ) VALUES (
          @name,
          @contact_number,
          @email,
          @request_type,
          @client_name,
          @client_dob,
          @police_station,
          @interview_date,
          @interview_time,
          @attendance_type,
          @offence_summary,
          @contact_window,
          @contact_window_time,
          @support_needs,
          @consent,
          @user_agent,
          @ip_address
        )
      `
    ).run({
      name,
      contact_number: contactNumber,
      email: email ?? null,
      request_type: requestType,
      client_name: clientName || null,
      client_dob: clientDOB || null,
      police_station: policeStation,
      interview_date: interviewDate,
      interview_time: interviewTime,
      attendance_type: attendanceType,
      offence_summary: offenceSummary,
      contact_window: contactWindow,
      contact_window_time: contactWindowTime || null,
      support_needs: supportNeeds || null,
      consent: consent ? 1 : 0,
      user_agent: userAgent,
      ip_address: ipAddress,
    });

    // Notify site owner by email if Resend is configured (do not fail request on email failure)
    try {
      console.log("[Contact API] Attempting to send notification email");
      const emailResult = await sendContactFormNotification({
        name,
        contactNumber,
        email,
        requestType,
        clientName: clientName || null,
        clientDOB: clientDOB || null,
        policeStation,
        interviewDate,
        interviewTime,
        attendanceType,
        offenceSummary,
        supportNeeds: supportNeeds || null,
      });
      if (emailResult.success) {
        console.log("[Contact API] Notification email sent successfully");
      } else {
        console.warn("[Contact API] Notification email skipped or failed:", emailResult.error);
      }
    } catch (emailErr) {
      console.warn("[Contact API] Notification email error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 });
  }
}
