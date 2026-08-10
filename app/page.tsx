import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import BlogCarousel from "@/components/BlogCarousel";
import type { Metadata } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { FAQPage } from "@/components/StructuredData";
import { getPostSummaries } from "@/lib/blog-reader";

import { HomeHeroCover } from "@/components/conversion/HomeHeroCover";
import { HomePathwaySection } from "@/components/conversion/HomePathwaySection";
import { HomeProofBar } from "@/components/conversion/HomeProofBar";
import { HomeFirmSection } from "@/components/conversion/HomeFirmSection";
import { HomePriorityCoverage } from "@/components/conversion/HomePriorityCoverage";
import { HomeServicesSection } from "@/components/conversion/HomeServicesSection";
import { HomeCallProcess } from "@/components/conversion/HomeCallProcess";
import { HomeGuidesBrowser } from "@/components/conversion/HomeGuidesBrowser";
import { HomeCourtJourney } from "@/components/conversion/HomeCourtJourney";
import { HomeAuthorityBio } from "@/components/conversion/HomeAuthorityBio";
import { HomeFaqSection } from "@/components/conversion/HomeFaqSection";
import { KentCoverCard } from "@/components/conversion/KentCoverCard";
import { StandardPaceSources } from "@/components/legal/StandardPaceSources";

export const metadata: Metadata = {
  title: "Police Station Solicitor Kent | Voluntary Interviews & Agency Cover",
  description:
    "Independent criminal defence solicitor for current Kent police custody and forthcoming voluntary interviews, plus police station agency cover for defence firms. Not the police.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/`,
  },
  openGraph: {
    title: "Police Station Solicitor Kent | Voluntary Interviews & Agency Cover",
    description:
      "Independent criminal defence solicitor for current Kent police custody and forthcoming voluntary interviews, plus police station agency cover for defence firms. Not the police.",
    url: `https://${SITE_DOMAIN}/`,
    siteName: "Police Station Agent",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const faqItems = [
  {
    question: "Is police station legal advice free in Kent?",
    answer:
      "Yes. Everyone arrested or invited for a voluntary interview in Kent is entitled to free legal advice at the police station. This is a statutory right under PACE 1984 and is not means-tested. Legal Aid covers the cost of a duty solicitor attending the police station.",
  },
  {
    question: "How quickly can a duty solicitor attend in Kent?",
    answer:
      "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
  },
  {
    question: "Which police stations do you cover in Kent?",
    answer:
      "We cover all Kent custody suites including Medway (Gillingham), Maidstone, North Kent (Gravesend), Canterbury, Tonbridge, Folkestone, Ashford, Sittingbourne, Margate, Dover, Sevenoaks, and Tunbridge Wells.",
  },
  {
    question: "Are police station solicitors independent of the police?",
    answer:
      "Yes, absolutely. Your solicitor is completely independent of the police and works only for YOU. We are not employed by, paid by, or connected to the police in any way. Legal Aid funds your representation, not the police. Everything you discuss with your solicitor is confidential and cannot be shared with the police without your consent.",
  },
  {
    question: "What is the difference between a qualified solicitor and a police station rep?",
    answer:
      "A qualified solicitor is a fully trained legal professional who has completed the Legal Practice Course and training contract. A police station rep (accredited representative) is a non-solicitor who has passed the Police Station Qualification. Robert Cashman is a qualified solicitor with 35+ years experience — not just an accredited representative — providing expert independent legal advice at all Kent police stations.",
  },
  {
    question:
      "What is the difference between an accredited rep, a criminal solicitor, a duty solicitor, and a higher court advocate?",
    answer:
      "Understanding the different legal roles helps you know what qualifications your representative has:\n\nAccredited Rep (Accredited Police Station Representative): A non-solicitor who has passed the Police Station Qualification (PSQ) to attend police stations on behalf of a solicitor's firm. They can provide legal advice and representation at police stations but are not qualified solicitors.\n\nCriminal Solicitor: A fully qualified solicitor who has completed the Legal Practice Course and training contract, admitted to practice criminal law. They can represent clients at police stations, magistrates' courts, and provide legal advice throughout the criminal process.\n\nDuty Solicitor: A qualified solicitor who is accredited by the Law Society and on the Legal Aid duty rota. They can provide free legal advice at both police stations and magistrates' courts under Legal Aid. A duty solicitor must be a qualified solicitor (not just an accredited rep).\n\nHigher Court Advocate: A solicitor who has obtained additional qualifications to appear in the Crown Court, representing clients in serious criminal matters including jury trials, sentencing hearings, and complex legal arguments. This is an advanced qualification beyond standard solicitor status.\n\nRobert Cashman is all four: He is an accredited police station representative, a qualified criminal solicitor, an accredited duty solicitor (for both police stations and courts), and a Higher Court Advocate with 5 years' experience appearing in Crown Court. This comprehensive qualification means he can represent you from the police station through to Crown Court if needed.",
  },
];

export default function Page() {
  const latestPosts = getPostSummaries().slice(0, 12);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-clip">
      <FAQPage items={faqItems} />
      <Header />
      <main className="flex-grow relative overflow-x-clip" id="main-content" role="main" aria-live="polite">
        <HomeHeroCover />
        <HomePathwaySection />
        <HomeProofBar />
        <div id="testimonials">
          <TestimonialCarousel />
        </div>
        <HomeCallProcess />
        <HomeGuidesBrowser />
        <BlogCarousel initialPosts={latestPosts} maxPosts={12} />
        <KentCoverCard className="py-10" />
        <HomeFirmSection />
        <HomePriorityCoverage />
        <HomeServicesSection />
        <HomeCourtJourney />
        <HomeAuthorityBio />
        <HomeFaqSection items={faqItems} />
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <StandardPaceSources />
        </div>
      </main>
      <Footer />
    </div>
  );
}
