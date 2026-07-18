import Header from "@/components/Header";
import { normalizeScrapedHtml } from "@/lib/scraped-html";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import { ComprehensiveLegalServiceSchema } from "@/components/schema/ComprehensiveLegalServiceSchema";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { AuthorBio } from "@/components/E-E-A-T/AuthorBio";
import { RegulatoryReferences } from "@/components/E-E-A-T/RegulatoryReferences";
import { ServiceDisclaimer } from "@/components/E-E-A-T/ServiceDisclaimer";
import { InternalLinkHub } from "@/components/InternalLinkHub";
import { KentCoverCard } from "@/components/conversion/KentCoverCard";

export const metadata: Metadata = {
  title: "Police Station Agent Cover for Solicitors | Kent",
  description:
    "Police station agent cover for criminal defence firms in Kent. Freelance solicitor attendance, attendance notes, custody and voluntary interviews. NOT the police.",
  alternates: {
    canonical: "https://policestationagent.com/for-solicitors",
  },
  openGraph: {
    title: "Police Station Agent Cover for Solicitors | Kent",
    description:
      "Police station agent cover for criminal solicitor firms in Kent — attendance notes, Legal Aid and private client work.",
    type: "website",
    url: "https://policestationagent.com/for-solicitors",
    siteName: "Police Station Agent",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <ComprehensiveLegalServiceSchema
        serviceName="Police Station Rep for Solicitors"
        serviceDescription="Police station rep for solicitors is a professional agency service providing expert police station representation for criminal solicitor firms. This service provides qualified solicitor attendance, detailed attendance notes, and comprehensive coverage across Kent police stations."
        serviceType="Police Station Representation"
        areaServed="Kent"
        jurisdiction="England & Wales"
      />
      <PersonSchema />
      <Header />
      <main className="flex-grow relative" id="main-content" role="main" aria-live="polite">
        <div className="bg-slate-50 min-h-screen">
          <div
            className="prose prose-lg max-w-6xl mx-auto px-4 py-16"
            dangerouslySetInnerHTML={{
              __html: normalizeScrapedHtml(`<div class="fixed right-3 top-4 z-40 text-[10px] text-slate-400 select-none pointer-events-none bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-200/50" aria-hidden="true">v4.4.0 — 11/12/2025</div><div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16"><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase w-16 h-16 mx-auto text-blue-600 mb-4"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg><h1 class="text-4xl font-bold text-slate-900 mb-4">Police station agent cover for solicitors in Kent</h1><p class="text-xl text-slate-600">Reliable agent cover for criminal defence firms — custody and voluntary interviews across Kent</p></div><div class="mb-12"><div class="rounded-xl border text-slate-900 shadow mb-8 border-green-200 bg-green-50"><div class="p-6"><div class="flex items-start gap-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-8 h-8 text-green-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><div><h2 class="text-2xl font-bold text-slate-900 mb-2">Legal Aid Agency Work</h2><p class="text-slate-700 leading-relaxed">Professional agency representation for your legal aid clients across all Kent police stations. Comprehensive attendance notes and competitive fixed rates.</p></div></div></div></div><div class="grid md:grid-cols-2 gap-4"><div class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-slate-700 font-medium">Police Station In-Person Attendance for Suspect Interviews</span></div><div class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-slate-700 font-medium">Voluntary Interviews at Police Stations</span></div><div class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-slate-700 font-medium">Voluntary Interviews at Home</span></div><div class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-green-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-slate-700 font-medium">Attendances in Prison for Suspect Interviews</span></div></div></div><div class="mb-12"><div class="rounded-xl border text-slate-900 shadow mb-8 border-purple-200 bg-purple-50"><div class="p-6"><div class="flex items-start gap-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-8 h-8 text-purple-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><div><h2 class="text-2xl font-bold text-slate-900 mb-2">Private Client Work</h2><p class="text-slate-700 leading-relaxed">Enhanced agency services for your private clients. Where possible, they may be represented by Robert Cashman, subject to availability and conflicts. If Robert cannot attend, Tuckers Solicitors LLP will arrange an alternative suitably qualified representative, with attendance throughout.</p></div></div></div></div><div class="grid md:grid-cols-2 gap-4"><div class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-purple-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-purple-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-slate-700 font-medium">Private Client Work - Enhanced Senior Solicitor Service</span></div><div class="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-purple-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-5 h-5 text-purple-600 flex-shrink-0 mt-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><span class="text-slate-700 font-medium">Complex or High-Profile Cases Requiring Additional Attention</span></div></div></div><div class="grid md:grid-cols-3 gap-6 mb-12"><div class="rounded-xl border bg-white text-slate-900 shadow-lg"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold leading-none tracking-tight flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-6 h-6 text-blue-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>Extended Hours</div></div><div class="p-6 pt-0"><p class="text-slate-700">Available late into the evening and weekends to ensure your clients receive timely representation when they need it most.</p></div></div><div class="rounded-xl border bg-white text-slate-900 shadow-lg"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold leading-none tracking-tight flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-6 h-6 text-blue-600"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>Kent Coverage</div></div><div class="p-6 pt-0"><p class="text-slate-700">We cover all Kent police stations and can cover other areas by prior arrangement. We occasionally venture into London and other regions.</p></div></div><div class="rounded-xl border bg-white text-slate-900 shadow-lg"><div class="flex flex-col space-y-1.5 p-6"><div class="font-semibold leading-none tracking-tight flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase w-6 h-6 text-blue-600"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>Experienced Team</div></div><div class="p-6 pt-0"><p class="text-slate-700">Our agents are experienced legal aid or private client practitioners with extensive knowledge of police interview techniques.</p></div></div></div><div class="rounded-xl border text-slate-900 shadow mb-8 bg-gradient-to-r from-slate-100 to-blue-100"><div class="p-8"><h3 class="text-2xl font-bold text-slate-900 mb-4 text-center">Led by Robert Cashman</h3><div class="max-w-3xl mx-auto"><p class="text-slate-700 leading-relaxed mb-4">Most of our police station work is undertaken by Robert Cashman, an experienced criminal practitioner with over 25 years of experience.</p><p class="text-slate-700 leading-relaxed mb-4">Robert is a duty-accredited criminal solicitor in both police stations and all magistrates courts. He is also a Higher Court Advocate who can practice in the Crown Court.</p><p class="text-slate-700 leading-relaxed">With experience defending every imaginable case in police stations, magistrates courts, and Crown Court, Robert specializes in freelance police station representation.</p></div></div></div><div class="rounded-xl border text-slate-900 shadow mb-8 border-red-200 bg-red-50"><div class="p-6"><h3 class="text-xl font-bold text-red-900 mb-3">Services We Do Not Provide</h3><div class="bg-white p-4 rounded-lg border border-red-200"><p class="text-slate-700 leading-relaxed mb-2"><strong class="text-red-900">One-off Court Representation:</strong> We regret we cannot accept instructions for single court hearings.</p><p class="text-slate-600 text-sm leading-relaxed">The legal aid fee structure for one-off court attendances (typically £75 for Magistrates' Court with payment often delayed 3-6 months) makes it economically unviable to provide this service while maintaining the quality representation clients deserve. We focus exclusively on police station work where we can deliver exceptional value and immediate impact on case outcomes.</p></div></div></div><div class="rounded-xl border bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl"><div class="p-8"><h2 class="text-2xl font-bold mb-4 text-center">Ready to Work With Us?</h2><p class="text-blue-100 mb-6 leading-relaxed text-center max-w-3xl mx-auto">Contact us today to discuss how we can provide reliable, professional police station representation for your clients across Kent.</p><div class="flex flex-wrap justify-center gap-4"><a href="tel:01732247427" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 rounded-md px-8 bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-xl flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> Call 01732 247427</a><a class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 rounded-md px-8 bg-blue-800 text-white hover:bg-blue-900 border-2 border-white shadow-xl" href="https://policestationagent.com/contact">Get In Touch</a><a class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 rounded-md px-8 bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold shadow-xl" href="https://policestationagent.com/whyuseusasagents">Why Choose Us?</a></div></div></div></div></div>`),
            }}

          />
          {/* Firm enquiry form */}
          <section
            id="firm-enquiry"
            className="max-w-3xl mx-auto px-4 pb-16 scroll-mt-24"
            aria-labelledby="firm-enquiry-heading"
          >
            <div className="text-center mb-8">
              <h2 id="firm-enquiry-heading" className="text-3xl font-black text-slate-900">
                Instruct Kent police station cover
              </h2>
              <p className="text-slate-600 mt-2 max-w-xl mx-auto">
                For scheduled attendances and solicitor instructions. Someone in custody now? Call{" "}
                <a href="tel:01732247427" className="font-bold text-blue-700 hover:underline">
                  01732 247427
                </a>{" "}
                — do not use this form for urgent custody.
              </p>
            </div>
            <ContactForm
              defaultRole="solicitor"
              defaultAttendanceType="solicitor-instruction"
              heading="Firm enquiry — police station attendance"
            />
          </section>
          <KentCoverCard className="pb-16" />
          {/* Internal Linking Hub */}
          <InternalLinkHub
            title="Related Services and Information"
            links={[
              { href: "/offences-we-deal-with", text: "Offences We Deal With", description: "Types of offences we handle" },
              { href: "/services/police-station-representation", text: "Police Station Representation", description: "Main service page" },
              { href: "/coverage", text: "Coverage Areas", description: "Areas we cover" },
              { href: "/kent-police-stations", text: "Kent Police Stations", description: "All custody suites" },
              { href: "/fees", text: "Fee Information", description: "Competitive rates" },
            ]}
          />

          {/* E-E-A-T Signals */}
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <AuthorBio showFull={true} className="mb-8" />
            <RegulatoryReferences className="mb-8" />
            <ServiceDisclaimer
              whoNotFor={[
                "One-off court representation (we focus exclusively on police station work)",
              ]}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
