import {
  CUSTODY_PHONE_CTA,
  HEADER_STRAPLINE,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/config/contact";

/** Server-rendered top strip — no client JS required. */
export default function HeaderTopStrip() {
  return (
    <div className="bg-blue-900 text-white text-xs sm:text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-center sm:text-left">{HEADER_STRAPLINE}</div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
            title="For someone in custody or a scheduled voluntary interview only"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call: {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}

export { CUSTODY_PHONE_CTA, PHONE_DISPLAY, PHONE_TEL };
