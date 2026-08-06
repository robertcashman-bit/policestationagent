import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhoProvidesLegalService from "@/components/WhoProvidesLegalService";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { SEO_NOT_POLICE, SERVICE_SCOPE } from "@/config/contact";
import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

export const metadata: Metadata = {
  title: "Contact | Choose Why You Are Enquiring | NOT the Police",
  description: `${SEO_NOT_POLICE} Choose voluntary interview, current custody or agency cover. Administrative contact form for non-urgent matters only. ${SERVICE_SCOPE}`,
  alternates: {
    canonical: `https://${SITE_DOMAIN}/contact`,
  },
  openGraph: {
    title: "Contact | NOT THE POLICE — Choose Your Pathway",
    description: `${SEO_NOT_POLICE} Route to the right enquiry pathway. Not a police contact page.`,
    url: `https://${SITE_DOMAIN}/contact`,
    siteName: "Police Station Agent",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-10">
          <header className="rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-black mb-3">Contact</h1>
            <p className="text-blue-100 max-w-2xl">
              Choose the reason for contacting us. This is a private criminal defence solicitor
              website — not Kent Police. We cannot transfer calls to the police and do not provide
              free general legal advice by telephone.
            </p>
          </header>

          <AudiencePathSelector
            heading="Choose the reason for contacting us"
            subheading="Use the pathway that matches your situation. The solicitor telephone is not listed on this page."
          />

          <PoliceSignposting />

          <section
            className="rounded-xl border border-slate-200 bg-white p-5 md:p-6"
            aria-labelledby="admin-form-heading"
          >
            <h2 id="admin-form-heading" className="text-xl font-black text-slate-900 mb-2">
              Administrative contact form
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              For non-urgent administrative messages only. Not for emergencies, police enquiries,
              free general legal advice, or current custody (use the pathways above).
            </p>
            <ContactForm />
          </section>

          <WhoProvidesLegalService />
        </div>
      </main>
      <Footer />
    </div>
  );
}
