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
  CONTACT_PUBLIC_ROUTE,
  CONTACT_SOLICITOR_ROUTE,
  CONTACT_RESPONSE_EXPECTATION,
  ADMIN_ENQUIRY_HEADING,
  ADMIN_ENQUIRY_INTRO,
  ADMIN_ENQUIRY_CAN,
  ADMIN_ENQUIRY_CANNOT,
  SCOPE_HELP_HREF,
  WHY_PHONE_NOT_EVERYWHERE_FAQ,
} from "@/config/contact";
import { AudiencePathSelector } from "@/components/conversion/AudiencePathSelector";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo/page-metadata";

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
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | NOT THE POLICE — Choose Your Pathway",
    description: `${SEO_NOT_POLICE} Route to the right enquiry pathway. Not a police contact page.`,
    images: [...DEFAULT_TWITTER_IMAGES],
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
            <p className="text-white max-w-2xl mb-3 leading-relaxed">
              {SEO_NOT_POLICE} {CONTACT_PATHWAY_PROMPT}
            </p>
            <p className="text-white/90 text-sm">
              Scope and FAQ:{" "}
              <Link
                href={`${SCOPE_HELP_HREF}`}
                className="underline font-semibold text-accent-light hover:text-white"
              >
                what we can and cannot help with
              </Link>
              .
            </p>
          </header>

          <AudiencePathSelector
            heading="Choose the reason for contacting us"
            subheading="Booked interview → request representation. Someone detained now → current custody check. Solicitor/firm → agency cover."
          />

          <section
            className="grid gap-4 md:grid-cols-2"
            aria-label="Who should contact us and how"
          >
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold text-primary">
                Public &amp; family
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {CONTACT_PUBLIC_ROUTE}
              </p>
            </div>
            <div className="rounded-xl border border-accent/40 bg-accent/5 p-5">
              <h2 className="font-display text-lg font-bold text-primary">
                Solicitors &amp; firms
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {CONTACT_SOLICITOR_ROUTE}
              </p>
            </div>
          </section>

          <p
            className="rounded-lg border border-border-subtle bg-secondary/60 px-4 py-3 text-sm leading-relaxed text-slate-700"
            role="note"
          >
            {CONTACT_RESPONSE_EXPECTATION}
          </p>

          <section
            className="rounded-xl border border-border bg-card p-5 md:p-6"
            aria-labelledby="why-no-public-number"
          >
            <h2
              id="why-no-public-number"
              className="font-display text-lg font-bold text-primary mb-2"
            >
              {WHY_PHONE_NOT_EVERYWHERE_FAQ.question}
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 mb-3">
              {CONTACT_GETTING_IN_TOUCH}
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              {WHY_PHONE_NOT_EVERYWHERE_FAQ.answer}
            </p>
          </section>

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
