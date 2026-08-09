import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhoProvidesLegalService from "@/components/WhoProvidesLegalService";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DOMAIN } from "@/config/site";
import {
  SEO_NOT_POLICE,
  SERVICE_SCOPE,
  CONTACT_GETTING_IN_TOUCH,
  CONTACT_PATHWAY_PROMPT,
  ADMIN_ENQUIRY_HEADING,
  ADMIN_ENQUIRY_INTRO,
  ADMIN_ENQUIRY_CAN,
  ADMIN_ENQUIRY_CANNOT,
  SCOPE_HELP_HREF,
} from "@/config/contact";
import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

export const metadata: Metadata = {
  title: "Contact | Choose Why You Are Enquiring | NOT the Police",
  description: `${SEO_NOT_POLICE} Choose voluntary interview, current custody or agency cover. Non-urgent written enquiry for administrative messages only. ${SERVICE_SCOPE}`,
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow" id="main-content" role="main">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-10">
          <header className="hero-navy rounded-xl text-white p-6 md:p-8 shadow-elevated">
            <p className="text-accent-light text-xs font-bold tracking-[0.14em] uppercase mb-2">
              Contact pathways
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 text-white">
              Getting in touch
            </h1>
            <p className="text-white/85 max-w-2xl mb-4">{CONTACT_GETTING_IN_TOUCH}</p>
            <p className="text-white/75 max-w-2xl text-sm md:text-base">{CONTACT_PATHWAY_PROMPT}</p>
            <p className="text-white/70 text-sm mt-4">
              Why we do this: see the{" "}
              <Link
                href={`${SCOPE_HELP_HREF}`}
                className="underline font-semibold text-accent-light hover:text-white"
              >
                FAQ
              </Link>
              .
            </p>
          </header>

          <AudiencePathSelector
            heading="Choose the reason for contacting us"
            subheading="Booked interview → request representation. Someone detained now → current custody check. Solicitor/firm → agency cover."
          />

          <PoliceSignposting showWrittenEnquiryHint />

          <section
            id="admin-enquiry"
            className="surface-card p-5 md:p-6 scroll-mt-24"
            aria-labelledby="admin-form-heading"
          >
            <h2
              id="admin-form-heading"
              className="font-display text-xl font-bold text-primary mb-2"
            >
              {ADMIN_ENQUIRY_HEADING}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">{ADMIN_ENQUIRY_INTRO}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4">
                <h3 className="text-sm font-bold text-emerald-950 mb-2">What this form can help with</h3>
                <ul className="text-sm text-emerald-950 space-y-1.5 list-disc pl-4">
                  {ADMIN_ENQUIRY_CAN.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50/80 p-4">
                <h3 className="text-sm font-bold text-red-950 mb-2">What we cannot do</h3>
                <ul className="text-sm text-red-950 space-y-1.5 list-disc pl-4">
                  {ADMIN_ENQUIRY_CANNOT.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <ContactForm
              heading="Send a non-urgent written enquiry"
              variant="admin"
            />
          </section>

          <WhoProvidesLegalService />
        </div>
      </main>
      <Footer />
    </div>
  );
}
