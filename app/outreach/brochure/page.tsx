import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brochure preview | Police Station Agent",
  robots: { index: false, follow: false },
};

export default function BrochurePreviewPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900">Kent outreach brochure</h1>
        <p className="text-sm text-slate-600 mt-1 mb-4">
          2-page full-colour PDF · attached to first outreach emails
        </p>
        <p className="mb-6 flex flex-wrap gap-3 text-sm">
          <a
            href="/outreach/police-station-agent-kent-brochure.pdf"
            download
            className="inline-flex rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
          >
            Download PDF
          </a>
          <a
            href="/outreach/brochure-preview.png"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50"
          >
            Open PNG in new tab
          </a>
        </p>

        <div className="rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden mb-8">
          <iframe
            title="Brochure PDF preview"
            src="/outreach/police-station-agent-kent-brochure.pdf#view=FitH"
            className="w-full h-[80vh] min-h-[600px] border-0"
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-lg p-4">
          <p className="text-sm font-medium text-slate-700 mb-3">Full-page image preview</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/outreach/brochure-preview.png"
            alt="Police Station Agent Kent brochure"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}
