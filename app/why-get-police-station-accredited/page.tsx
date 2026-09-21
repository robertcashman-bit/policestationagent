import PageShell from "@/components/PageShell";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";
import { DEFAULT_OG_IMAGES, DEFAULT_TWITTER_IMAGES } from "@/lib/seo/page-metadata";
import { psrTrainHref } from "@/lib/psrtrain-promo";

const PATH = "/why-get-police-station-accredited";
const TITLE =
  "Why Get Police Station Accredited | PSRAS, PSQ & Duty Solicitor Paths";
const DESCRIPTION =
  "Plain-English reasons for paralegals, trainee solicitors and aspiring criminal defence lawyers to become police-station accredited — PSRAS/PSQ vs duty solicitor accreditation, Legal Aid limits, and realistic next steps.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `https://${SITE_DOMAIN}${PATH}`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `https://${SITE_DOMAIN}${PATH}`,
    siteName: "Police Station Agent",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [...DEFAULT_TWITTER_IMAGES],
  },
};

const sources: LegalSource[] = [
  {
    id: "sra-psras",
    label:
      "SRA — Police Station Representative Accreditation Scheme (PSRAS)",
    href: "https://www.sra.org.uk/solicitors/resources/specific-areas-of-practice/police-station-representative-accreditation-scheme/",
  },
  {
    id: "laa-register-2025",
    label: "Legal Aid Agency — Police Station Register Arrangements 2025 (PDF)",
    href: "https://assets.publishing.service.gov.uk/media/68dcf841ef1c2f72bc1e4c9f/Police_Station_Register_Arrangements_2025.pdf",
  },
  {
    id: "lawsociety-clas",
    label: "Law Society — Criminal Litigation Accreditation",
    href: "https://www.lawsociety.org.uk/career-advice/individual-accreditations/criminal-litigation-accreditation/",
  },
  {
    id: "lawsociety-clas-apply",
    label: "Law Society — Criminal Litigation Accreditation: how to apply",
    href: "https://www.lawsociety.org.uk/career-advice/individual-accreditations/criminal-litigation-accreditation/how-to-apply",
  },
  {
    id: "gov-arrest-advice",
    label: "GOV.UK — Legal advice at the police station",
    href: "https://www.gov.uk/arrested-your-rights/legal-advice-at-the-police-station",
  },
  {
    id: "pace-s58",
    label: "Police and Criminal Evidence Act 1984 s.58 (right to consult a solicitor)",
    href: "https://www.legislation.gov.uk/ukpga/1984/60/section/58",
  },
  {
    id: "scc-2025",
    label: "GOV.UK — Standard Crime Contract 2025",
    href: "https://www.gov.uk/government/publications/standard-crime-contract-2025",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is PSRAS the same as duty solicitor accreditation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. PSRAS (and the solicitor Police Station Qualification route) relates to competence to give police-station advice that can be claimed under Legal Aid frameworks. Duty solicitor rota membership for solicitors requires the Law Society Criminal Litigation Accreditation, which is a separate accreditation.",
      },
    },
    {
      "@type": "Question",
      name: "Do non-solicitors take the Police Station Qualification?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non-solicitors who want to advise at the police station under Legal Aid become accredited under the SRA Police Station Representative Accreditation Scheme (PSRAS) and must be registered on the Legal Aid Agency Police Station Register. Practising solicitors may complete PSRAS or the Police Station Qualification (PSQ) to claim Legal Aid payment for police-station advice.",
      },
    },
    {
      "@type": "Question",
      name: "Can a solicitor do own-client police-station work without PSRAS or PSQ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "According to the Legal Aid Agency Police Station Register Arrangements 2025, if a solicitor provides only own-client advice they do not need those extra qualifications for that own-client work; practising solicitors need PSRAS or the PSQ to claim Legal Aid payment for police-station advice (excluding own-client work as described in those Arrangements).",
      },
    },
  ],
};

const PSRTRAIN_ACCREDITATION_HREF = psrTrainHref(
  "why-accredited-guide",
  "/guides",
);

export default function WhyGetPoliceStationAccreditedPage() {
  return (
    <PageShell forceHidePhone>
      <JsonLd data={faqSchema} />

      <section className="hero-navy relative overflow-hidden py-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(212,175,55,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, rgba(30,58,95,0.5), transparent 50%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <p className="font-display text-sm md:text-base font-semibold tracking-wide text-accent-light mb-3">
            Police Station Agent
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Why get police station accredited?
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            A factual career guide for paralegals, trainee solicitors, newly qualified
            solicitors and career-changers considering police-station defence work — not an
            exam course.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#what-it-means" className="btn-gold min-h-[48px] px-6">
              What accreditation means
            </a>
            <Link
              href="/for-solicitors"
              className="btn-ghost-light min-h-[48px] px-6"
            >
              Agency cover for firms
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-14">
        <p className="text-muted-foreground leading-relaxed">
          Suspects have a right to consult a solicitor at the police station.
          <Ref n={6} /> Free independent advice is available under Legal Aid when someone is
          questioned there.
          <Ref n={5} /> The professionals who deliver that advice on a legally aided basis must
          meet the competence and registration rules summarised below. Rules change; always check
          the cited SRA, Law Society and Legal Aid Agency materials for the current position.
        </p>

        <section id="what-it-means" aria-labelledby="what-it-means-heading" className="scroll-mt-24">
          <h2
            id="what-it-means-heading"
            className="font-display text-2xl md:text-3xl font-bold text-primary mb-4"
          >
            What “police station accredited” means
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            People often use “police station accredited” as shorthand for more than one scheme.
            They are related but not the same.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-accent pl-5">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                PSRAS — Police Station Representative Accreditation Scheme
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The SRA describes PSRAS as a compulsory qualification for solicitors and
                non-solicitors who provide legal advice at the police station on a legally aided
                basis.
                <Ref n={1} /> Assessment has three parts: a written examination, a portfolio, and
                a Critical Incidents Test (CIT). Preparatory training is offered by providers but
                is not a compulsory part of the SRA process.
                <Ref n={1} />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Legal Aid Agency maintains the Police Station Register of probationary and
                accredited representatives. The Agency contracts with firms, not with accredited
                representatives as independent Legal Aid providers.
                <Ref n={2} />
              </p>
            </div>

            <div className="border-l-4 border-primary pl-5">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                PSQ — Police Station Qualification (solicitor route)
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Practising solicitors may complete PSRAS <em>or</em> the Police Station
                Qualification (PSQ) to claim Legal Aid payment for police-station advice.
                <Ref n={1} /> <Ref n={2} /> Under the Police Station Register Arrangements 2025,
                if a solicitor wishes to provide only own-client advice, they do not need those
                extra qualifications for that own-client work; Legal Aid-claimable police-station
                work is treated differently.
                <Ref n={2} />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For the Law Society Criminal Litigation Accreditation pathway, applicants must
                pass the PSQ unless they are already accredited under PSRAS, plus the Magistrates’
                Court Qualification (MCQ).
                <Ref n={4} />
              </p>
            </div>

            <div className="border-l-4 border-slate-400 pl-5">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Duty solicitor accreditation (Criminal Litigation Accreditation)
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The Law Society Criminal Litigation Accreditation is a separate quality standard.
                The Law Society states you must have that accreditation to be included on local
                duty solicitor rotas under the Criminal Defence Service Duty Solicitor Arrangements
                2001.
                <Ref n={3} /> Eligibility is limited to solicitors, barristers, and fellows or
                members of CILEX who can show the required knowledge, skills and experience.
                <Ref n={3} /> Do not confuse duty-rota membership with PSRAS/PSQ police-station
                competence alone.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Related reading:{" "}
            <Link href="/what-is-a-police-station-rep" className="text-primary underline">
              what a police station representative is
            </Link>
            {" · "}
            <Link href="/accreditedpolicerep" className="text-primary underline">
              Robert Cashman’s credentials
            </Link>
          </p>
        </section>

        <section aria-labelledby="why-heading">
          <h2
            id="why-heading"
            className="font-display text-2xl md:text-3xl font-bold text-primary mb-4"
          >
            Reasons to get accredited
          </h2>
          <ul className="space-y-4 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              <strong className="text-foreground">Who you can advise under Legal Aid frameworks.</strong>{" "}
              PSRAS exists so representatives advising clients held at a police station (or in
              analogous circumstances for which Legal Aid payment will be claimed) meet defined
              competence standards.
              <Ref n={1} /> Non-solicitors seeking to advise and assist suspects and claim LAA
              payment do so through accreditation and registration, not by informal attendance.
              <Ref n={1} /> <Ref n={2} />
            </li>
            <li>
              <strong className="text-foreground">Legal Aid station work for firms.</strong> Crime
              providers work under Legal Aid Agency crime-contract rules. Accreditation and
              register status are how firms lawfully staff much of their police-station Legal Aid
              attendance through representatives.
              <Ref n={2} /> <Ref n={7} />
            </li>
            <li>
              <strong className="text-foreground">Firm and agency demand.</strong> Criminal defence
              practices need people who can be deployed to custody and voluntary interviews within
              contract rules. Accreditation is the standard signal that you can do that work under
              supervision.
            </li>
            <li>
              <strong className="text-foreground">Professional standing.</strong> Completing the
              written exam (unless exempt), portfolio and CIT demonstrates assessed competence
              against SRA standards — useful whether you stay as a representative, progress as a
              trainee/NQ, or later pursue duty-solicitor accreditation as a solicitor.
              <Ref n={1} /> <Ref n={3} />
            </li>
          </ul>
        </section>

        <section aria-labelledby="if-not-heading">
          <h2
            id="if-not-heading"
            className="font-display text-2xl md:text-3xl font-bold text-primary mb-4"
          >
            What can happen if you don’t
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Stick to what the frameworks actually say — this is not a list of invented career
            disasters.
          </p>
          <ul className="space-y-4 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              Without the relevant qualification path and, for non-solicitor representatives,
              Police Station Register status, you are not in the position the LAA Arrangements
              describe for probationary or accredited representatives giving advice that is claimed
              under Legal Aid.
              <Ref n={2} />
            </li>
            <li>
              Practising solicitors who want to claim Legal Aid payment for police-station advice
              need PSRAS or the PSQ (own-client-only work is treated differently in the
              Arrangements).
              <Ref n={1} /> <Ref n={2} />
            </li>
            <li>
              Solicitors who want local duty-solicitor rota membership need the Law Society
              Criminal Litigation Accreditation — a further step beyond police-station competence
              alone.
              <Ref n={3} />
            </li>
            <li>
              Representatives must have a designated supervising solicitor; without ongoing
              supervision arrangements recognised under the Arrangements, register status cannot be
              maintained in the way the LAA describes.
              <Ref n={2} />
            </li>
          </ul>
        </section>

        <section aria-labelledby="upside-heading">
          <h2
            id="upside-heading"
            className="font-display text-2xl md:text-3xl font-bold text-primary mb-4"
          >
            Career upside (keep it realistic)
          </h2>
          <ul className="space-y-4 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              <strong className="text-foreground">Path into firm and agency work.</strong> Once
              accredited and registered, many people work as employed or instructed representatives
              for Standard Crime Contract firms. Firms — not freelancers acting alone as LAA
              contractors — hold the crime contracts.
              <Ref n={2} />
            </li>
            <li>
              <strong className="text-foreground">Custody experience.</strong> Police-station
              attendances build practical familiarity with PACE processes, disclosure at interview,
              and advice under pressure — experience trainees and NQs often need early in a
              criminal defence career.
            </li>
            <li>
              <strong className="text-foreground">Progression for trainees and NQs.</strong> For
              solicitors, police-station competence (PSRAS or PSQ) sits on the path toward Criminal
              Litigation Accreditation and, separately, duty-rota membership if that is your goal.
              <Ref n={3} /> <Ref n={4} /> Accreditation does not guarantee rota slots, salary, or
              freelance volume.
            </li>
            <li>
              <strong className="text-foreground">Kent / agency context.</strong> Practices that
              cover Kent custody and voluntary interviews often need reliable accredited cover.
              Police Station Agent provides agency attendance for instructing firms subject to
              availability, conflicts and formal acceptance of instructions — see{" "}
              <Link href="/for-solicitors" className="text-primary underline">
                cover for solicitors
              </Link>
              .
            </li>
          </ul>
        </section>

        <section aria-labelledby="stopping-heading">
          <h2
            id="stopping-heading"
            className="font-display text-2xl md:text-3xl font-bold text-primary mb-4"
          >
            What’s stopping you — honest responses
          </h2>
          <dl className="space-y-6">
            <div>
              <dt className="font-display text-lg font-bold text-foreground mb-1">
                Cost and time
              </dt>
              <dd className="text-muted-foreground leading-relaxed">
                Assessment organisation fees, any preparatory training you choose, and time away
                from paid work are real costs. The SRA does not prescribe how you prepare and does
                not authorise preparatory trainers; assessment is delivered by SRA-authorised
                assessment organisations.
                <Ref n={1} /> Budget for the full path (exam where required, portfolio cases, CIT),
                not just one sitting fee.
              </dd>
            </div>
            <div>
              <dt className="font-display text-lg font-bold text-foreground mb-1">
                Exam and CIT fear
              </dt>
              <dd className="text-muted-foreground leading-relaxed">
                The written examination and Critical Incidents Test are demanding by design. Some
                candidates are exempt from the written examination (for example solicitors,
                barristers, and certain LPC/BPTC and CILEX pathways listed in the Arrangements);{" "}
                <em>there are no exemptions from the portfolio or the CIT</em> under those
                Arrangements.
                <Ref n={2} /> Structured revision helps; no provider can honestly guarantee a pass.
              </dd>
            </div>
            <div>
              <dt className="font-display text-lg font-bold text-foreground mb-1">
                Finding a supervising solicitor and portfolio cases
              </dt>
              <dd className="text-muted-foreground leading-relaxed">
                You need a suitable supervising solicitor and access to real police-station cases
                for the portfolio stages described in the Arrangements.
                <Ref n={2} /> That usually means a relationship with a crime firm willing to
                supervise you. Start conversations with firms early; do not wait until after you
                book assessments.
              </dd>
            </div>
            <div>
              <dt className="font-display text-lg font-bold text-foreground mb-1">
                Probationary timescales
              </dt>
              <dd className="text-muted-foreground leading-relaxed">
                After Part A and the written exam (or exemption), candidates register as
                probationary representatives and must complete the remaining relevant tests within
                the timescales set out by the LAA Arrangements (including the 12-month probationary
                framework described there).
                <Ref n={2} /> Plan case volume and assessment dates together.
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="font-display text-2xl md:text-3xl font-bold text-primary mb-4"
          >
            Short FAQ
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Is PSRAS the same as duty solicitor accreditation?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No. PSRAS/PSQ address police-station advice competence for Legal Aid frameworks.
                Duty solicitor rota membership for solicitors requires Law Society Criminal
                Litigation Accreditation.
                <Ref n={1} /> <Ref n={3} />
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Do non-solicitors take the PSQ?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Non-solicitors follow the PSRAS route and LAA Police Station Register process.
                <Ref n={1} /> <Ref n={2} /> Solicitors may use PSRAS or PSQ for Legal Aid-claimable
                police-station advice.
                <Ref n={1} />
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Where does exam prep sit?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This page is motivation and framework facts only. For structured exam and CIT
                preparation, use a dedicated training provider such as{" "}
                <a
                  href={PSRTRAIN_ACCREDITATION_HREF}
                  className="text-primary underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  PSR Train
                </a>
                . Training is optional under the SRA scheme description; assessments are still
                required.
                <Ref n={1} />
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="next-heading"
          className="hero-navy rounded-[var(--radius-lg)] p-6 md:p-8"
        >
          <h2
            id="next-heading"
            className="font-display text-2xl font-bold text-white mb-3"
          >
            Sensible next steps
          </h2>
          <ul className="space-y-3 text-white/90 mb-6 list-disc pl-5">
            <li>
              Read the{" "}
              <a
                href={sources[0].href}
                className="text-accent-light underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                SRA PSRAS page
              </a>{" "}
              and the{" "}
              <a
                href={sources[1].href}
                className="text-accent-light underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Police Station Register Arrangements 2025
              </a>{" "}
              before booking anything.
            </li>
            <li>
              If you are preparing for assessments, use{" "}
              <a
                href={PSRTRAIN_ACCREDITATION_HREF}
                className="text-accent-light underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PSR Train
              </a>{" "}
              for exam-focused study — not this site.
            </li>
            <li>
              If you are a solicitor or firm needing Kent police-station agent cover, see{" "}
              <Link href="/for-solicitors" className="text-accent-light underline">
                agency cover for criminal defence firms
              </Link>
              . Attendance is subject to availability; Maidstone is voluntary interview attendance
              only; court work is arranged through Tuckers Solicitors LLP handover, not continuous
              solo court representation from this site.
            </li>
          </ul>
          <p className="text-sm text-white/70">
            Police Station Agent is an independent criminal defence service site operated in
            connection with Robert Cashman / Tuckers Solicitors LLP (SRA ID: 127795). It is not the
            police. Extended hours cover is offered — not a claim of 24/7 firm attendance.
          </p>
        </section>

        <LegalReferences sources={sources} heading="Sources" />
      </div>
    </PageShell>
  );
}
