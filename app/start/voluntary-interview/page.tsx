import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { SEO_NOT_POLICE, SERVICE_SCOPE, PHONE_DISPLAY } from "@/config/contact";

export const metadata: Metadata = {
  title: "Scheduled Voluntary Interview (VAI) | NOT the Police | Kent",
  description:
    `${SEO_NOT_POLICE} Legal advice before a scheduled voluntary interview at a Kent police station. ${SERVICE_SCOPE} Telephone ${PHONE_DISPLAY} or use the contact form.`,
  alternates: {
    canonical: "https://policestationagent.com/start/voluntary-interview",
  },
};

export default function VoluntaryInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Hero Section */}
            <section
              className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 rounded-xl mb-8"
              aria-labelledby="page-title"
            >
              <div className="max-w-3xl mx-auto text-center px-4">
                <h1 id="page-title" className="text-4xl md:text-5xl font-black mb-6 text-white">
                  Voluntary Interview (Caution + 3) — Do Not Attend Unrepresented
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Obtain legal advice before agreeing a date/time.
                </p>
              </div>
            </section>

            {/* Warning Section */}
            <section className="bg-red-50 border-2 border-red-200 rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600 flex-shrink-0 mt-1"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-red-900 mb-3">
                    Important: Do Not Attend Without Legal Advice
                  </h2>
                  <p className="text-red-800">
                    A voluntary interview is conducted under caution and carries the same legal
                    risks as an interview following arrest. Anything you say can be used in court.
                  </p>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">We Offer:</h2>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Contact officer for disclosure</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">Advise on evidence and strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600 flex-shrink-0 mt-0.5"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-lg">
                    Attend and represent (subject to availability)
                  </span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-slate-700">
                  <strong className="text-slate-900">Note:</strong> Legal Aid may be available
                  depending on circumstances.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-4">
              <p className="text-slate-700 max-w-2xl mx-auto text-sm">
                <strong>NOT the police.</strong> For a <strong>scheduled</strong> voluntary
                interview (date/time already agreed or proposed) — use the form or telephone. We do
                not provide general legal advice by phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full shadow-xl"
                >
                  Contact form (scheduled VAI)
                </Link>
                <a
                  href="tel:01732247427"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full shadow-xl"
                  title="Scheduled voluntary interview or custody only"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Telephone — custody / scheduled VAI
                </a>
              </div>
              <p className="text-slate-600 mt-4 text-lg font-semibold">{PHONE_DISPLAY}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
