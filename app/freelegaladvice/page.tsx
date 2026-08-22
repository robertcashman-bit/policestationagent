import ScrapedHtmlPage from "@/components/ScrapedHtmlPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Legal Advice at the Police Station in Kent | Legal Aid",
  description:
    "Free legal advice at Kent police stations — no means test. Legal Aid covers representation for interviews under caution in custody or booked voluntarily. Call for a Kent solicitor.",
  keywords: undefined,
  alternates: {
    canonical: "https://policestationagent.com/freelegaladvice",
  },
  openGraph: {
    title: "Free Legal Advice at the Police Station in Kent | Legal Aid",
    description:
      "Free legal advice at Kent police stations — no means test. Legal Aid covers representation for interviews under caution in custody or booked voluntarily.",
    type: "website",
    url: "https://policestationagent.com/freelegaladvice",
  },
};

const PAGE_HTML = `<div class="fixed right-3 top-4 z-40 text-[10px] text-slate-400 select-none pointer-events-none bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-200/50" aria-hidden="true">v4.4.0 — 11/12/2025</div><div class="bg-slate-50 min-h-screen py-16"><div class="max-w-4xl mx-auto px-4"><div class="text-center mb-16"><h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6">Free legal advice at the police station in Kent</h1><p class="text-2xl text-slate-600 max-w-3xl mx-auto">Yes — it is free. Every suspect, regardless of income, is entitled to free independent legal advice at a Kent police interview under caution.</p></div><div class="grid md:grid-cols-2 gap-8 mb-12"><div class="rounded-xl border text-slate-900 bg-white border-t-4 border-green-500 shadow-lg"><div class="p-8"><h2 class="text-2xl font-bold mb-4 flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pound-sterling w-8 h-8 text-green-500"><path d="M18 7c0-5.333-8-5.333-8 0"></path><path d="M10 7v14"></path><path d="M6 21h12"></path><path d="M6 13h10"></path></svg> No Bill To You</h2><p class="text-slate-600 text-lg leading-relaxed">Our fees for police station attendance are paid directly by the Legal Aid Agency. You will never receive a bill from us for police station work.</p></div></div><div class="rounded-xl border text-slate-900 bg-white border-t-4 border-blue-500 shadow-lg"><div class="p-8"><h2 class="text-2xl font-bold mb-4 flex items-center gap-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big w-8 h-8 text-blue-500"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg> No Means Test</h2><p class="text-slate-600 text-lg leading-relaxed">Unlike court legal aid, police station advice is <strong>non-means tested</strong>. It doesn't matter if you are employed, unemployed, or a millionaire.</p></div></div></div><div class="bg-blue-900 text-white rounded-2xl p-8 md:p-12 text-center shadow-xl"><h2 class="text-3xl font-bold mb-6">Why go alone?</h2><p class="text-lg text-blue-100 mb-8">It costs you nothing — so there is no good reason to sit the interview without a solicitor.</p><div class="flex flex-col sm:flex-row gap-2 justify-center my-2" data-solicitor-contact="true" data-nosnippet>
<a href="/start/voluntary-interview#request" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-6 bg-blue-800 text-white hover:bg-blue-900">Request representation</a>
<a href="/current-custody" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-6 bg-red-700 text-white hover:bg-red-800">Current custody check</a>
<a href="/for-solicitors" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold shadow h-10 px-6 bg-amber-500 text-slate-900 hover:bg-amber-400">Agency cover</a>
</div></div><div class="mt-12 text-center"><p class="text-xs text-slate-400">Legal Basis: Advice and Assistance at the Police Station is funded by the Legal Aid Agency under the Standard Crime Contract.<br>Authority: Legal Aid, Sentencing and Punishment of Offenders Act 2012.</p></div></div></div>`;

export default function Page() {
  return <ScrapedHtmlPage html={PAGE_HTML} />;
}
