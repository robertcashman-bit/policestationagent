import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_ADDRESS = process.env.EMAIL_FROM || "Custody Note <noreply@custodynote.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://custodynote.com";

export async function sendTrialKeyEmail(
  email: string,
  licenceKey: string,
  expiresAt: string,
) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping trial key email to", email);
    return;
  }

  const expiryDate = new Date(expiresAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Your Custody Note trial licence key",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #0f172a; font-size: 24px;">Your Custody Note trial is ready</h1>
        <p style="color: #475569;">Here is your licence key. Enter it in the Custody Note desktop app to activate your 30-day free trial.</p>
        <div style="background: #f0f4ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
          <code style="font-size: 22px; letter-spacing: 2px; color: #0f172a; font-weight: bold;">${licenceKey}</code>
        </div>
        <p style="color: #475569; font-size: 14px;">Your trial expires on <strong>${expiryDate}</strong>. All features are unlocked during the trial.</p>
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 32px;">Getting started</h2>
        <ol style="color: #475569; font-size: 14px; line-height: 1.8;">
          <li><a href="${SITE_URL}/download" style="color: #3b82f6;">Download Custody Note</a> and install it.</li>
          <li>Open the app and enter the licence key above when prompted.</li>
          <li>Start recording your first attendance.</li>
        </ol>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">If you did not request this trial, you can ignore this email. &mdash; Custody Note</p>
      </div>
    `,
  });
}

export async function sendLicenceKeyEmail(
  email: string,
  licenceKey: string,
  cloudBackup: boolean,
) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping licence key email to", email);
    return;
  }

  const planName = cloudBackup
    ? "Standard + Cloud Backup"
    : "Standard";

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Your Custody Note licence key",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #0f172a; font-size: 24px;">Thank you for subscribing to Custody Note</h1>
        <p style="color: #475569;">Your <strong>${planName}</strong> subscription is now active. Here is your licence key:</p>
        <div style="background: #f0f4ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
          <code style="font-size: 22px; letter-spacing: 2px; color: #0f172a; font-weight: bold;">${licenceKey}</code>
        </div>
        ${
          cloudBackup
            ? '<p style="color: #475569; font-size: 14px;">Cloud Backup is included in your plan. Once you enter your licence key, automatic encrypted backups to AWS will begin.</p>'
            : ""
        }
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 32px;">Getting started</h2>
        <ol style="color: #475569; font-size: 14px; line-height: 1.8;">
          <li><a href="${SITE_URL}/download" style="color: #3b82f6;">Download Custody Note</a> if you haven't already.</li>
          <li>Open the app, go to Settings, and enter the licence key above.</li>
          <li>Start recording attendances. Your subscription is active immediately.</li>
        </ol>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
        <p style="color: #94a3b8; font-size: 12px;">Need help? Reply to this email or visit <a href="${SITE_URL}/support" style="color: #3b82f6;">our support page</a>. &mdash; Custody Note</p>
      </div>
    `,
  });
}
