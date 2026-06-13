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

const RESEND_ONBOARDING_FROM = "Police Station Agent <onboarding@resend.dev>";

/** Onboarding first so login works before custom domain is verified in Resend. */
function magicCodeFromCandidates(): string[] {
  const custom = [
    process.env.ADMIN_MAGIC_FROM_EMAIL?.trim(),
    process.env.CONTACT_FROM_EMAIL?.trim(),
  ].filter(Boolean) as string[];

  const preferCustom = process.env.RESEND_MAGIC_PREFER_CUSTOM === "true";
  const ordered = preferCustom
    ? [...custom, RESEND_ONBOARDING_FROM]
    : [RESEND_ONBOARDING_FROM, ...custom];

  return [...new Set(ordered)];
}

function buildMagicCodeHtml(code: string): string {
  return `
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
      `;
}

/** Admin magic-code login email (6-digit OTP). */
export async function sendMagicCode(
  email: string,
  code: string,
): Promise<{ success: boolean; error?: string }> {
  const client = getResendClient();
  if (!client) {
    console.warn("[Magic code — no RESEND_API_KEY]", { email });
    return { success: false, error: "RESEND_API_KEY not set" };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  if (!apiKey.startsWith("re_")) {
    console.warn("[Magic code — RESEND_API_KEY invalid format]", {
      prefix: apiKey.slice(0, 6),
      length: apiKey.length,
    });
    return {
      success: false,
      error:
        "RESEND_API_KEY on Vercel must be a Resend API key starting with re_ (see resend.com/api-keys)",
    };
  }

  try {
    const { error: keyError } = await client.domains.list();
    if (keyError) {
      console.warn("[Magic code — Resend API key rejected]", keyError.message);
      return {
        success: false,
        error: `Resend API key rejected: ${keyError.message}`,
      };
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn("[Magic code — Resend API key check failed]", msg);
    return { success: false, error: `Resend API key check failed: ${msg}` };
  }

  const subject = `Your Police Station Agent admin code: ${code}`;
  const html = buildMagicCodeHtml(code);
  const fromCandidates = magicCodeFromCandidates();
  let lastError = "Email send failed";

  for (let i = 0; i < fromCandidates.length; i++) {
    const from = fromCandidates[i];
    const isLast = i === fromCandidates.length - 1;
    try {
      const { data, error } = await client.emails.send({
        from,
        to: [email],
        subject,
        html,
      });

      if (error) {
        lastError = error.message;
        console.warn("[Magic code email] Resend error:", from, error.message);
        if (!isLast) continue;
        return { success: false, error: lastError };
      }

      if (data?.id) {
        if (i > 0) {
          console.info("[Magic code email] sent via fallback sender:", from);
        }
        return { success: true };
      }
      lastError = "Email provider returned no id";
      if (!isLast) continue;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error("[Magic code email failed]", from, lastError);
      if (!isLast) continue;
      return { success: false, error: lastError };
    }
  }

  console.error("[Magic code email failed] all senders exhausted:", lastError);
  return { success: false, error: lastError };
}

export function magicCodeSendErrorMessage(error?: string): string {
  if (!error) {
    return 'Could not send your login code by email. Try again shortly or contact support.';
  }
  if (error.includes('RESEND_API_KEY not set')) {
    return 'Admin login email is not configured. Add RESEND_API_KEY on the Vercel web44ai project.';
  }
  if (error.includes('starting with re_') || error.includes('invalid format')) {
    return 'Resend API key on Vercel is invalid. Set RESEND_API_KEY to a key from resend.com/api-keys (starts with re_).';
  }
  if (/api key|unauthorized|invalid.*key/i.test(error)) {
    return 'Resend rejected the API key on Vercel. Create a new key at resend.com/api-keys and update RESEND_API_KEY on web44ai.';
  }
  if (/only send testing emails|your own email/i.test(error)) {
    return 'Could not send the login code yet. Use robertdavidcashman@gmail.com or verify policestationagent.com in Resend.';
  }
  return 'Could not send your login code by email. Check spam, try again shortly, or verify Resend is configured on Vercel.';
}
