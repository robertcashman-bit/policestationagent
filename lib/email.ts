import { Resend } from "resend";

export interface ContactFormNotificationPayload {
  name: string;
  contactNumber: string;
  email: string | null;
  requestType: string;
  clientName: string | null;
  clientDOB: string | null;
  policeStation: string;
  interviewDate: string;
  interviewTime: string;
  attendanceType: string;
  offenceSummary: string;
  supportNeeds: string | null;
}

function buildEmailBody(payload: ContactFormNotificationPayload): string {
  const lines: string[] = [
    "New contact form submission from Police Station Agent website.",
    "",
    "--- Requestor ---",
    `Name: ${payload.name}`,
    `Contact number: ${payload.contactNumber}`,
    `Email: ${payload.email ?? "(not provided)"}`,
    `Role / request type: ${payload.requestType}`,
    "",
    "--- Interview details ---",
    `Police station: ${payload.policeStation}`,
    `Date: ${payload.interviewDate}`,
    `Time: ${payload.interviewTime}`,
    `Attendance type: ${payload.attendanceType}`,
    "",
    "--- Brief details ---",
    payload.offenceSummary,
  ];

  if (payload.requestType === "client" && (payload.clientName || payload.clientDOB)) {
    lines.push("", "--- Client (solicitor/representative request) ---");
    if (payload.clientName) lines.push(`Client name: ${payload.clientName}`);
    if (payload.clientDOB) lines.push(`Client DOB: ${payload.clientDOB}`);
  }

  if (payload.supportNeeds?.trim()) {
    lines.push("", "--- Support / vulnerability ---", payload.supportNeeds.trim());
  }

  return lines.join("\n");
}

/**
 * Send a notification email to the site owner when a contact form is submitted.
 * Requires RESEND_API_KEY and CONTACT_FORM_TO_EMAIL. CONTACT_FROM_EMAIL is optional
 * (defaults to Resend onboarding address for testing).
 */
export async function sendContactFormNotification(
  payload: ContactFormNotificationPayload
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL?.trim();

  // NOTE: next.config.js removes console.log in production; warn/error remain.

  if (apiKey && toEmail) {
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() || "Police Station Agent <onboarding@resend.dev>";

    try {
      const resend = new Resend(apiKey);
      const body = buildEmailBody(payload);

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `Contact form: ${payload.name} – ${payload.policeStation} ${payload.interviewDate}`,
        text: body,
      });

      if (error) {
        console.error("[Contact email] Resend API error:", error.message, error);
        return { success: false, error: error.message };
      }

      const id = data?.id;
      if (id) return { success: true };
      return { success: false, error: "Email provider returned no id" };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[Contact email] Send failed:", message);
      return { success: false, error: message };
    }
  }

  const reason = apiKey ? "CONTACT_FORM_TO_EMAIL not set" : "RESEND_API_KEY not set";
  console.warn("[Contact email] Skipping send:", reason);
  return { success: false, error: reason };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function magicCodeFromEmail(): string {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    process.env.FIRM_OUTREACH_FROM_EMAIL?.trim() ||
    "Police Station Agent <onboarding@resend.dev>"
  );
}

/** Admin magic-code login email (6-digit OTP). */
export async function sendMagicCode(email: string, code: string): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    console.info("[Magic code — no RESEND_API_KEY]", { email });
    return false;
  }

  try {
    await client.emails.send({
      from: magicCodeFromEmail(),
      to: email,
      subject: `Your Police Station Agent admin code: ${code}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:20px">
          <h2 style="color:#0A2342;margin-bottom:8px">Your admin login code</h2>
          <p style="color:#475569;font-size:14px;margin-bottom:20px">
            Use this code to sign in to the Police Station Agent admin area. It expires in 10 minutes.
          </p>
          <div style="background:#f8fafc;border:2px solid #e2e8f0;border-radius:8px;padding:24px;text-align:center;margin-bottom:20px">
            <span style="font-family:monospace;font-size:32px;letter-spacing:0.3em;font-weight:bold;color:#0A2342">${escapeHtml(code)}</span>
          </div>
          <p style="color:#94a3b8;font-size:12px">
            If you didn&rsquo;t request this code, you can safely ignore this email.
          </p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("[Magic code email failed]", err);
    return false;
  }
}
