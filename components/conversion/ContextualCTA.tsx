import Link from "next/link";
import {
  PATH_AGENCY,
  PATH_CUSTODY,
  PATH_VOLUNTARY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";

type Variant = "voluntary" | "custody" | "agency";

type Props = {
  variant: Variant;
  className?: string;
  compact?: boolean;
};

const COPY: Record<
  Variant,
  { title: string; body: string; href: string; button: string; tone: string }
> = {
  voluntary: {
    title: "Booked for a voluntary interview?",
    body: "Request a free solicitor before you attend an interview under caution. Do not use this as a general legal advice line.",
    href: `${PATH_VOLUNTARY}#request`,
    button: "Request VA solicitor",
    tone: "border-border bg-secondary/70",
  },
  custody: {
    title: "Someone in custody now?",
    body: "Check whether we can help with current Kent police station detention. The solicitor telephone is only shown after qualification.",
    href: PATH_CUSTODY,
    button: "Check whether we can help",
    tone: "border-red-200 bg-red-50",
  },
  agency: {
    title: "Solicitor needing agent cover?",
    body: "Send professional police station attendance instructions for criminal defence firms.",
    href: PATH_AGENCY,
    button: "Request agency cover",
    tone: "border-accent/40 bg-accent/10",
  },
};

export function ContextualCTA({ variant, className = "", compact = false }: Props) {
  const c = COPY[variant];
  return (
    <aside
      className={`rounded-xl border-2 ${c.tone} p-4 md:p-5 ${className}`}
      aria-label={c.title}
    >
      <h2 className={`font-bold text-slate-900 ${compact ? "text-base" : "text-lg"} mb-1`}>
        {c.title}
      </h2>
      {!compact ? <p className="text-sm text-slate-700 mb-3">{c.body}</p> : null}
      <div className="flex flex-wrap gap-2">
        <Link
          href={c.href}
          className="btn-navy text-sm px-4 py-2"
        >
          {c.button}
        </Link>
        {variant === "voluntary" ? (
          <Link
            href={PATH_VOLUNTARY_LANDING}
            className="inline-flex items-center justify-center min-h-[44px] rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Voluntary interviews overview
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
