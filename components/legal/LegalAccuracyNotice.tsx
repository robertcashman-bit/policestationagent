import Link from "next/link";

type LegalAccuracyNoticeProps = {
  /** Box styling for article footers; plain text for sources sections */
  variant?: "box" | "text";
  className?: string;
  showReportLink?: boolean;
};

const REPORT_LINK = (
  <>
    If you believe something on this page is incorrect, please{" "}
    <Link href="/contact" className="text-blue-700 hover:underline font-medium">
      contact us
    </Link>{" "}
    and say you are reporting a content error.
  </>
);

export function LegalAccuracyNotice({
  variant = "text",
  className = "",
  showReportLink = true,
}: LegalAccuracyNoticeProps) {
  const body = (
    <>
      <strong className="font-semibold text-slate-800">General information only — not legal advice.</strong>{" "}
      While every care is taken to ensure what is stated is accurate and reflects current law and
      official guidance, errors may occur and the law changes. Do not rely on this page instead of
      advice from a qualified solicitor about your own situation. Legal services are provided
      through Tuckers Solicitors LLP (SRA ID: 127795) where applicable.
      {showReportLink ? <> {REPORT_LINK}</> : null}
    </>
  );

  if (variant === "box") {
    return (
      <aside
        aria-label="Legal accuracy notice"
        className={`bg-amber-50 border-l-4 border-amber-500 p-4 text-sm text-slate-700 rounded-r-lg ${className}`}
      >
        <p className="font-semibold text-slate-900 mb-2">Important notice</p>
        <p>{body}</p>
      </aside>
    );
  }

  return (
    <p className={`text-xs text-slate-500 ${className}`}>{body}</p>
  );
}

/** Plain-text tail for blog JSON Sources sections (HTML). */
export const LEGAL_ACCURACY_DISCLAIMER_HTML = `<p><em>General information only — not legal advice about any individual case. While every care is taken to keep information accurate, errors may occur and the law changes. Do not rely on this page instead of advice from a qualified solicitor. If you believe something is incorrect, <a href="/contact" rel="noopener noreferrer">contact us</a> to report a content error. Statutory references and Code C paragraphs are summarised for readability; refer to the official published versions linked above.</em></p>`;
