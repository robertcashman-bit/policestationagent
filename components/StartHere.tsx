import Link from "next/link";

export default function StartHere() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16" aria-labelledby="start-here-heading">
      <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg p-6 md:p-8">
        <h2 id="start-here-heading" className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
          Start Here
        </h2>
        <p className="text-slate-600 mb-6 text-sm md:text-base">
          Kent police stations only. <strong>NOT the police</strong> — independent duty solicitor.
          Custody and scheduled voluntary (VAI) interviews only; not general legal advice by phone.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/start/in-custody"
            className="group rounded-xl border-2 border-slate-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200 p-5 bg-white"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
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
                  className="text-red-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-red-700 transition-colors">
                  Has someone you know been arrested and taken to a police station?
                </h3>
                <p className="text-sm text-slate-600">Arrange representation on their behalf</p>
              </div>
            </div>
          </Link>

          <Link
            href="/start/voluntary-interview"
            className="group rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 p-5 bg-white"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
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
                  className="text-blue-600"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                  I've been asked to attend a voluntary interview
                </h3>
                <p className="text-sm text-slate-600">Get advice before your interview</p>
              </div>
            </div>
          </Link>

          <Link
            href="/start/solicitors-agent-cover"
            className="group rounded-xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 p-5 bg-white"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
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
                  className="text-amber-600"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                  I'm a solicitor needing police station attendance cover
                </h3>
                <p className="text-sm text-slate-600">B2B agent cover services</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
