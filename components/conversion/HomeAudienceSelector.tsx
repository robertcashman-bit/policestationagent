import Link from "next/link";

const AUDIENCE_OPTIONS = [
  {
    href: "/start/in-custody",
    title: "Someone is in custody now",
    description: "Immediate family — instruct while they are at a Kent police station",
    iconBg: "bg-red-100 group-hover:bg-red-200",
    iconColor: "text-red-600",
    borderHover: "hover:border-red-400 hover:bg-red-50",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    href: "/start/voluntary-interview",
    title: "Voluntary interview booked",
    description: "Get advice before a scheduled police interview under caution",
    iconBg: "bg-blue-100 group-hover:bg-blue-200",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-400 hover:bg-blue-50",
    icon: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    href: "/for-solicitors#firm-enquiry",
    title: "Law firm needing cover",
    description: "Instruct Kent police station attendance for your client",
    iconBg: "bg-amber-100 group-hover:bg-amber-200",
    iconColor: "text-amber-600",
    borderHover: "hover:border-amber-400 hover:bg-amber-50",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
] as const;

export function HomeAudienceSelector() {
  return (
    <section
      className="relative z-20 -mt-6 mx-auto max-w-5xl px-4 pb-2"
      aria-labelledby="audience-selector-heading"
    >
      <div className="rounded-2xl border-2 border-blue-200 bg-white shadow-xl p-5 md:p-6">
        <h2 id="audience-selector-heading" className="text-lg md:text-xl font-black text-slate-900 mb-1">
          Who are you?
        </h2>
        <p className="text-slate-600 text-sm mb-4">
          Kent police stations only. <strong>NOT the police</strong> — independent duty solicitor.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {AUDIENCE_OPTIONS.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className={`group rounded-xl border-2 border-slate-200 ${option.borderHover} transition-all duration-200 p-4 bg-white`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 ${option.iconBg} rounded-lg flex items-center justify-center transition-colors`}
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
                    className={option.iconColor}
                  >
                    {option.icon}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug group-hover:text-blue-800 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">{option.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
