import Link from "next/link";

/**
 * "Download our Kent cover card" — a savable vCard.
 * Do not publish firm tel/SMS digits here: Google was quoting this copy as the
 * homepage SERP description and feeding police/solicitor misdials.
 */
export function KentCoverCard({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="kent-cover-card-heading"
      className={`max-w-3xl mx-auto px-4 ${className}`}
      data-nosnippet
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2
            id="kent-cover-card-heading"
            className="text-xl md:text-2xl font-black text-slate-900"
          >
            Save our Kent cover card
          </h2>
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            Independent criminal defence solicitor for custody or a booked voluntary interview —
            not Kent Police. Telephone and SMS are on the{" "}
            <Link href="/contact" className="font-semibold underline text-blue-800">
              Contact
            </Link>{" "}
            page.
          </p>
        </div>
        <a
          href="/kent-police-station-cover-card.vcf"
          download="police-station-agent-kent.vcf"
          data-event="save_cover_card"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 shadow shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Download cover card
        </a>
      </div>
    </section>
  );
}

export default KentCoverCard;
