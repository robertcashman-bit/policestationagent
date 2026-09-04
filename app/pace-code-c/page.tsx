import PageShell from "@/components/PageShell";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";
import { PersistentKentVaCta } from "@/components/conversion/PersistentKentVaCta";

export const metadata: Metadata = {
  title: "PACE Code C: Your Rights in Police Detention Explained",
  description:
    "PACE Code C sets out your rights in police custody including legal advice, rest periods, meals and interviews. Understand what police must do and your protections.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/pace-code-c`,
  },
};

export default function PaceCodeCPage() {
  const sources: LegalSource[] = [
    {
      id: "pace-code-c-2023",
      label:
        "Home Office: PACE Code C (December 2023) – detention, treatment and questioning (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/6580543083ba38000de1b792/PACE+Code+C+2023.pdf",
    },
    {
      id: "pace-s78",
      label: "Police and Criminal Evidence Act 1984 (PACE) s.78 (exclusion of unfair evidence)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/78",
    },
    {
      id: "pace-code-e-2016",
      label: "Home Office: PACE Code E (2016) – audio recording of interviews (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/5a8092dbe5274a2e87dba95d/52344_00_Pace_Code_E_Accessible_v0.3.pdf",
    },
    {
      id: "pace-code-f-2013",
      label: "Home Office: PACE Code F (2013) – visual recording of interviews (PDF)",
      href: "https://assets.publishing.service.gov.uk/media/5a7d4e9740f0b60a7f1a9b6d/2013_PACE_Code_F.pdf",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is PACE Code C?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C is a Code of Practice under the Police and Criminal Evidence Act 1984. It sets out the rules police must follow when detaining and questioning suspects, including rights to legal advice, rest, meals, and fair treatment in custody.",
        },
      },
      {
        "@type": "Question",
        name: "What rights does PACE Code C give me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C gives you the right to: free legal advice, have someone informed of your arrest, see a copy of the Codes of Practice, regular meals and drinks, adequate rest periods, medical attention if needed, and an interpreter if required.",
        },
      },
      {
        "@type": "Question",
        name: "Can police break PACE Code C rules?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C is a statutory Code of Practice. If the way evidence was obtained is unfair, a court has a power to exclude it under section 78 of PACE 1984. If you think rules were not followed, raise it with your solicitor.",
        },
      },
      {
        "@type": "Question",
        name: "How often must I be given rest in custody?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C provides that (except in limited circumstances) a detainee must be allowed a continuous period of at least 8 hours for rest in any 24-hour period, and it also sets standards for meals and drinks in custody.",
        },
      },
      {
        "@type": "Question",
        name: "Can I see a copy of PACE Code C?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE Code C includes rules about access to the Codes. If you want to consult the Codes in custody, ask the custody officer and tell your solicitor.",
        },
      },
    ],
  };

  return (
    <PageShell forceHidePhone>

          <div className="max-w-4xl mx-auto px-4 pt-6 md:pt-8">
            <PersistentKentVaCta placement="gsc_pace" />
          </div>

      <JsonLd data={faqSchema} />

      <section className="hero-navy py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm mb-6 text-white/75">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/police-custody-rights" className="hover:text-white">
              Custody Rights
            </Link>
            <span className="mx-2">›</span>
            <span>PACE Code C</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
            PACE Code C: Your Rights in Police Custody
          </h1>
          <p className="text-xl text-white/90">
            The rules that protect you during detention and questioning
          </p>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-secondary border-l-4 border-accent p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> PACE Code C is a Code of Practice that sets out the
              rules police must follow when you're in custody. It covers your rights to{" "}
              <strong>legal advice</strong>,<strong>rest periods</strong>, <strong>meals</strong>,{" "}
              <strong>medical care</strong>, and
              <strong>fair treatment</strong> during interviews.
              <Ref n={1} /> If evidence is obtained unfairly, a court has a power to exclude it
              under section 78 PACE.
            </p>
            <p className="text-slate-700">
              In my experience, custody officers sometimes overlook Code C entitlements — having a
              solicitor present helps ensure reviews, rest periods and disclosure rights are respected.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>What Is PACE Code C?</h2>
            <p>
              PACE Code C is one of several Codes of Practice issued under the Police and Criminal
              Evidence Act 1984 (PACE). It specifically deals with{" "}
              <strong>
                the detention, treatment and questioning of persons by police officers
              </strong>
              .<Ref n={1} />
            </p>
            <p>
              Every custody suite in England and Wales must operate in accordance with Code C. It
              sets minimum standards for how you should be treated while in police detention and
              provides important protections against abuse of power.
            </p>
            <h2>Your Core Rights Under Code C</h2>

            <h3>1. Right to Free Legal Advice</h3>
            <p>
              You are entitled to free, independent legal advice at any time during your detention.
              This includes:
            </p>
            <ul>
              <li>A private consultation with a solicitor before interview</li>
              <li>A solicitor present during interview</li>
              <li>Further consultations as needed</li>
              <li>The duty solicitor if you don't have your own solicitor</li>
            </ul>
            <p>
              The custody officer must inform you of this right and record your decision. Delaying
              access to a solicitor is only permitted in limited, exceptional circumstances set out
              in the Codes.
              <Ref n={1} />
            </p>

            <h3>2. Right to Have Someone Informed</h3>
            <p>
              You have the right to have one person informed of your whereabouts. This can only be
              delayed in specific circumstances (serious arrestable offences where it might lead to
              interference with evidence or alerting other suspects).
            </p>

            <h3>3. Right to Consult the Codes of Practice</h3>
            <p>
              You can ask to see a copy of the Codes of Practice at any time. The custody officer
              should make this available.
            </p>

            <h2>Conditions of Detention</h2>
            <p>PACE Code C sets minimum standards for your physical conditions in custody:</p>

            <h3>Rest Periods</h3>
            <ul>
              <li>
                Except in limited circumstances, a continuous period of at least 8 hours for rest in
                any 24-hour period (Code C, para 12.2).
                <Ref n={1} />
              </li>
              <li>Rest should be uninterrupted unless required for the investigation</li>
            </ul>

            <h3>Meals and Refreshments</h3>
            <ul>
              <li>
                At least two light meals and one main meal should be offered in any 24-hour period
                (Code C, para 8.6).
                <Ref n={1} />
              </li>
              <li>
                Drinks should be provided at meal times and upon reasonable request between meals
                (Code C, para 8.6).
                <Ref n={1} />
              </li>
              <li>Dietary and religious requirements should be met</li>
            </ul>

            <h3>Cell Conditions</h3>
            <ul>
              <li>Cells must be adequately heated, cleaned and ventilated</li>
              <li>Access to toilet facilities</li>
              <li>Clean bedding if detained overnight</li>
              <li>Reasonable privacy during washing</li>
            </ul>

            <h3>Medical Care</h3>
            <ul>
              <li>Access to medical attention if you're unwell or injured</li>
              <li>Regular medication if required</li>
              <li>Healthcare professional assessment if needed</li>
            </ul>

            <h2>Interview Rules</h2>
            <p>Code C contains detailed rules about how interviews must be conducted:</p>
            <ul>
              <li>
                <strong>Caution:</strong> You must be cautioned before questioning
              </li>
              <li>
                <strong>Recording:</strong> audio/video recording is covered by PACE Codes E and F.
                <Ref n={3} /> <Ref n={4} />
              </li>
              <li>
                <strong>Breaks:</strong> short refreshment breaks shall be provided at approximately
                two-hour intervals (Code C, para 12.8).
                <Ref n={1} />
              </li>
              <li>
                <strong>Oppression:</strong> Interviewing officers must not use oppressive
                techniques
              </li>
              <li>
                <strong>Vulnerable persons:</strong> Additional protections apply (appropriate
                adult)
              </li>
            </ul>

            <h2>Special Categories</h2>
            <p>PACE Code C provides enhanced protections for:</p>
            <ul>
              <li>
                <strong>Under 18s:</strong> Must have an appropriate adult present
              </li>
              <li>
                <strong>Vulnerable adults:</strong> Mental health or learning difficulties require
                appropriate adult
              </li>
              <li>
                <strong>Non-English speakers:</strong> Right to an interpreter
              </li>
              <li>
                <strong>Hearing/speech impaired:</strong> Appropriate communication support
              </li>
            </ul>

            <h2>What Happens If Police Breach Code C?</h2>
            <p>PACE Code C breaches can have significant consequences:</p>
            <ul>
              <li>
                <strong>Evidence exclusion:</strong> if the way evidence was obtained is unfair, the
                court has a power to exclude it under PACE section 78.
                <Ref n={2} />
              </li>
              <li>
                <strong>Custody record:</strong> if you believe rules were not followed, tell your
                solicitor so it can be raised and recorded appropriately.
              </li>
            </ul>

            <h2>Practical Tips</h2>
            <ol>
              <li>
                <strong>Request a solicitor:</strong> This is your most important protection
              </li>
              <li>
                <strong>Ask about your rights:</strong> The custody officer should explain them
              </li>
              <li>
                <strong>Speak up:</strong> If conditions are unacceptable, tell your solicitor
              </li>
              <li>
                <strong>Keep track of time:</strong> Know when you arrived and when breaks are due
              </li>
              <li>
                <strong>Request meals:</strong> Don't miss designated mealtimes
              </li>
            </ol>
          </div>

          <div className="surface-card border-accent/40 p-6 my-8">
            <h3 className="font-display text-xl font-bold text-primary mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>PACE Code C sets out the rules for your treatment in custody</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>You have the right to free legal advice at any time</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>
                  Code C includes an 8-hour continuous rest rule, and sets standards for meals and
                  drinks in custody.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Special protections exist for young and vulnerable people</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Breaches can lead to evidence being excluded at trial</span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="surface-card p-6">
                <h3 className="font-bold text-lg text-primary mb-2">What is PACE Code C?</h3>
                <p className="text-muted-foreground">
                  PACE Code C is a Code of Practice under PACE 1984. It sets out the rules police
                  must follow when detaining and questioning suspects, including rights to legal
                  advice, rest, meals, and fair treatment.
                </p>
              </div>
              <div className="surface-card p-6">
                <h3 className="font-bold text-lg text-primary mb-2">
                  What rights does PACE Code C give me?
                </h3>
                <p className="text-muted-foreground">
                  PACE Code C gives you the right to: free legal advice, have someone informed, see
                  the Codes of Practice, regular meals and drinks, adequate rest, medical attention,
                  and an interpreter if required.
                </p>
              </div>
              <div className="surface-card p-6">
                <h3 className="font-bold text-lg text-primary mb-2">
                  Can police break PACE Code C rules?
                </h3>
                <p className="text-muted-foreground">
                  PACE Code C is a statutory Code of Practice. If the way evidence was obtained is
                  unfair, the court has a power to exclude it under section 78 of PACE 1984. If you
                  think rules were not followed, raise it with your solicitor.
                </p>
              </div>
              <div className="surface-card p-6">
                <h3 className="font-bold text-lg text-primary mb-2">
                  How often must I be given rest in custody?
                </h3>
                <p className="text-muted-foreground">
                  PACE Code C provides that (except in limited circumstances) a detainee must be
                  allowed a continuous period of at least 8 hours for rest in any 24-hour period,
                  and it also sets standards for meals and drinks in custody.
                </p>
              </div>
              <div className="surface-card p-6">
                <h3 className="font-bold text-lg text-primary mb-2">
                  Can I see a copy of PACE Code C?
                </h3>
                <p className="text-muted-foreground">
                  PACE Code C includes rules about access to the Codes. If you want to consult the
                  Codes in custody, ask the custody officer and tell your solicitor.
                </p>
              </div>
            </div>
          </div>

          <div className="hero-navy rounded-[var(--radius-lg)] p-8 my-12">
            <h3 className="font-display text-2xl font-bold mb-4 text-white">
              Know Your Rights in Custody
            </h3>
            <p className="text-white/85 mb-6">
              If you&apos;re in police custody, make sure your rights under PACE Code C are respected.
              Get legal advice as soon as possible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/current-custody" className="btn-gold">
                Current custody pathway
              </Link>
              <Link href="/contact" className="btn-ghost-light">
                Contact pathways
              </Link>
            </div>
          </div>

          <LegalReferences sources={sources} />

          <div className="border-t border-border pt-8 mt-8">
            <h3 className="text-lg font-bold text-primary mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/police-custody-rights"
                className="surface-card p-4 hover:border-accent transition-colors"
              >
                <span className="font-medium text-primary">Your Custody Rights →</span>
              </Link>
              <Link
                href="/custody-time-limits"
                className="surface-card p-4 hover:border-accent transition-colors"
              >
                <span className="font-medium text-primary">Custody Time Limits →</span>
              </Link>
              <Link
                href="/police-interview-rights"
                className="surface-card p-4 hover:border-accent transition-colors"
              >
                <span className="font-medium text-primary">Interview Rights →</span>
              </Link>
              <Link
                href="/appropriate-adult"
                className="surface-card p-4 hover:border-accent transition-colors"
              >
                <span className="font-medium text-primary">Appropriate Adults →</span>
              </Link>
            </div>
          </div>
      </article>
    </PageShell>
  );
}
