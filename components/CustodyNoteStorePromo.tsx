import {
  CUSTODYNOTE_DOWNLOAD_CTA,
  CUSTODYNOTE_DOWNLOAD_HREF,
  CUSTODYNOTE_FREE_LABEL,
  CUSTODYNOTE_MICROSOFT_STORE_CTA,
  CUSTODYNOTE_MICROSOFT_STORE_HREF,
  CUSTODYNOTE_STORE_WINDOWS_NOTE,
} from "@/lib/custodynote-promo";

type Variant = "chrome" | "strip" | "panel";

type Props = {
  /** chrome = header/nav badge; strip = slim band; panel = dedicated section */
  variant?: Variant;
  className?: string;
  /** Optional heading override for panel variant */
  headingId?: string;
};

/**
 * Custody Note Windows promo — Microsoft Store UK is primary; direct download is backup.
 * Never claims Mac is on the Store. Store listing is live.
 */
export function CustodyNoteStorePromo({
  variant = "panel",
  className = "",
  headingId = "custody-note-store-heading",
}: Props) {
  if (variant === "chrome") {
    return (
      <a
        href={CUSTODYNOTE_MICROSOFT_STORE_HREF}
        className={`inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1.5 text-[11px] font-bold leading-tight text-primary transition-colors hover:bg-accent/20 hover:text-primary-light sm:text-xs ${className}`}
        rel="noopener noreferrer"
        target="_blank"
        data-cn-store-cta="chrome"
        aria-label={`${CUSTODYNOTE_MICROSOFT_STORE_CTA} — Custody Note for Windows (UK)`}
      >
        <MicrosoftStoreGlyph className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span>{CUSTODYNOTE_MICROSOFT_STORE_CTA}</span>
      </a>
    );
  }

  if (variant === "strip") {
    return (
      <aside
        className={`border-b border-border bg-gradient-to-r from-primary/[0.06] via-accent/[0.08] to-primary/[0.06] ${className}`}
        aria-label="Custody Note for Windows"
        data-cn-store-promo="strip"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 lg:px-6">
          <p className="text-[0.7rem] leading-snug text-slate-700 sm:text-xs">
            <span className="font-semibold text-primary">Custody Note</span>
            {" — "}
            attendance notes for police station work.{" "}
            <span className="text-slate-600">{CUSTODYNOTE_FREE_LABEL}.</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <a
              href={CUSTODYNOTE_MICROSOFT_STORE_HREF}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-primary-light"
              rel="noopener noreferrer"
              target="_blank"
              data-cn-store-cta="strip"
            >
              <MicrosoftStoreGlyph className="h-3.5 w-3.5 shrink-0" />
              {CUSTODYNOTE_MICROSOFT_STORE_CTA}
            </a>
            <a
              href={CUSTODYNOTE_DOWNLOAD_HREF}
              className="text-[0.7rem] font-medium text-slate-600 underline-offset-2 hover:text-primary hover:underline sm:text-xs"
              rel="noopener noreferrer"
              target="_blank"
            >
              {CUSTODYNOTE_DOWNLOAD_CTA}
            </a>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <section
      className={`section-pad bg-[var(--cream)] ${className}`}
      aria-labelledby={headingId}
      data-cn-store-promo="panel"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary via-primary to-primary-light px-6 py-8 text-white shadow-elevated md:px-10 md:py-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 md:grid md:grid-cols-[1.35fr_0.9fr] md:items-center md:gap-10">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-light">
                Tool for police station work · Windows
              </p>
              <h2
                id={headingId}
                className="mt-2 font-display text-2xl font-bold text-white md:text-3xl"
              >
                Custody Note — live on Microsoft Store
              </h2>
              <p className="mt-3 max-w-measure text-sm leading-relaxed text-white/80 md:text-base">
                Structured attendance notes for custody and voluntary interviews.{" "}
                {CUSTODYNOTE_FREE_LABEL}. Windows installs from the UK Microsoft Store;
                Mac uses the backup download only.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 md:mt-0" data-nosnippet>
              <a
                href={CUSTODYNOTE_MICROSOFT_STORE_HREF}
                className="btn-gold inline-flex items-center justify-center gap-2"
                rel="noopener noreferrer"
                target="_blank"
                data-cn-store-cta="panel"
              >
                <MicrosoftStoreGlyph className="h-4 w-4 shrink-0" />
                {CUSTODYNOTE_MICROSOFT_STORE_CTA}
              </a>
              <a
                href={CUSTODYNOTE_DOWNLOAD_HREF}
                className="text-center text-sm font-medium text-white/70 underline-offset-2 transition-colors hover:text-accent-light hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {CUSTODYNOTE_DOWNLOAD_CTA}
              </a>
              <p className="text-center text-[0.7rem] leading-snug text-white/50">
                {CUSTODYNOTE_STORE_WINDOWS_NOTE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MicrosoftStoreGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 1.5h6.2v6.2H1V1.5zm7.8 0H15v6.2H8.8V1.5zM1 9.3h6.2V15.5H1V9.3zm7.8 0H15v6.2H8.8V9.3z" />
    </svg>
  );
}
