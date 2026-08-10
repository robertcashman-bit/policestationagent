import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingHeader from '@/components/layout/MarketingHeader';
import Footer from '@/components/layout/Footer';
import { FreeAccessBanner } from '@/components/FreeAccessBanner';
import { PartnerHeroMention } from '@/components/PartnerHeroMention';
import { MarketingCtaBand, MarketingCtaButton } from '@/components/marketing/MarketingPageHero';
import { HeroProductPreview } from '@/components/marketing/HeroProductPreview';
import { TryQuestionWidget } from '@/components/marketing/TryQuestionWidget';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileCheck,
  Target,
  Scale,
  CheckCircle2,
  Award,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';

import { pageMetadata } from '@/lib/page-metadata';
import { getApprovedQuestionCount, formatQuestionCountStat } from '@/lib/question-count';
import { getLatestBlogPosts, getFeaturedGuides } from '@/lib/content-crosslinks';
import { appendUtm } from '@/lib/utm';

export const metadata = pageMetadata({
  title: { absolute: 'Police Station Representative Training | Prepare for PSRAS | PSR Train' },
  description:
    'Mock exams, assessment-style scenarios, and structured PSRAS preparation. PACE 1984 and Code C–aligned practice for Police Station Representative accreditation candidates in England and Wales.',
  path: '/',
  openGraph: {
    title: 'PSR Train — Police Station Representative Training',
    description: 'Prepare for PSRAS with confidence. Mock exams, scenarios, and PACE 1984 / Code C–aligned preparation.',
  },
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Police Station Representative Training',
  description:
    'Mock exams, scenario-based training, and structured preparation for the Police Station Representative Accreditation Scheme (PSRAS), aligned with PACE 1984 and Code C.',
  url: 'https://psrtrain.com',
  provider: { '@type': 'Organization', name: 'PSR Train', url: 'https://psrtrain.com' },
};

const statsBase = [
  { icon: BookOpen, value: '8+', label: 'Study modules' },
  { icon: Target, value: '290+', label: 'Practice questions', dynamic: true as const },
  { icon: Clock, value: 'Timed', label: 'Mock exams' },
  { icon: Users, value: 'England & Wales', label: 'PSRAS focused' },
];

const features = [
  {
    icon: FileCheck,
    title: 'Mock exams',
    desc: 'Timed assessments that mirror the pressure and style of real accreditation preparation.',
  },
  {
    icon: Target,
    title: 'Scenario-based training',
    desc: 'Custody and interview situations so you apply PACE Code C and custody procedure under realistic conditions.',
  },
  {
    icon: Scale,
    title: 'PACE Code C guidance',
    desc: 'Clear coverage of PACE Codes of Practice and practice points relevant to police station representation.',
  },
  {
    icon: Award,
    title: 'Exam strategy',
    desc: 'Learn what examiners expect — concise answers, priorities, and common pitfalls to avoid.',
  },
];

const steps = [
  { n: '1', title: 'Learn', sub: 'Structured modules', icon: BookOpen },
  { n: '2', title: 'Practice', sub: 'Mocks & scenarios', icon: ClipboardList },
  { n: '3', title: 'Prepare', sub: 'Ready for assessment', icon: Award },
];

const whyPoints = [
  'Real-world custody scenarios you can relate to',
  'Focused PSRAS preparation — every module counts',
  'Practical skills, not just textbook theory',
];

const faqs = [
  {
    q: 'Is PSR Train an official PSRAS provider?',
    a: 'No. PSR Train is independent preparation and practice — it helps you get ready, but accreditation itself is awarded by your assessment body. We align our content with the PSRAS syllabus, PACE 1984, and Code C.',
  },
  {
    q: 'Will it actually help me pass?',
    a: 'It is built around the assessment: timed mock exams under real conditions, CIT-style scenarios, and questions mapped to the PSRAS syllabus units, each with a worked explanation so you learn the reasoning, not just the answer.',
  },
  {
    q: 'What does it cost?',
    a: 'It is completely free while we are in testing, with no card required. We will introduce a paid subscription later — candidates who sign up now start training free straight away.',
  },
  {
    q: 'What is included?',
    a: 'Practice questions across every syllabus area, timed mock exams, critical-incident scenarios, learning modules, and progress tracking that shows your accuracy and weakest topics.',
  },
  {
    q: 'Who is it for?',
    a: 'Candidates preparing for Police Station Representative accreditation (PSRAS) in England and Wales — whether you are starting out or polishing up before assessment.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default async function HomePage() {
  const questionCount = await getApprovedQuestionCount();
  const questionStat = formatQuestionCountStat(questionCount);
  const stats = statsBase.map((s) =>
    'dynamic' in s && s.dynamic ? { ...s, value: questionStat } : s,
  );
  const latestBlog = getLatestBlogPosts(3);
  const featuredGuides = getFeaturedGuides(3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psrtrain.com';
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingHeader />
      <main id="main-content">
        {/* Hero — asymmetric, product-led */}
        <section className="relative overflow-hidden hero-premium">
          <div className="absolute inset-0 bg-dot-grid opacity-[0.25]" aria-hidden />

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-7 lg:px-8 lg:pb-24 lg:pt-7">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              {/* Left — copy */}
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <FreeAccessBanner />
                </div>
                <p className="section-label-primary justify-center lg:justify-start mb-3 animate-fade-in-up">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  PSRAS preparation platform
                </p>

                <h1 className="display-hero animate-fade-in-up delay-100 text-balance font-display text-[#0B3C5D]">
                  Walk into your assessment{' '}
                  <span className="text-gold-shimmer">already&nbsp;ready</span>
                </h1>

                <p className="animate-fade-in-up delay-200 mx-auto lg:mx-0 mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  Timed mock exams, CIT-style scenarios, and PACE 1984 / Code C–aligned questions —
                  the complete training platform for police station representative candidates.
                </p>

                <div className="animate-fade-in-up delay-300 mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start sm:gap-4">
                  <MarketingCtaButton href="/signup" testId="hero-cta-start-training">
                    Start training free
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </MarketingCtaButton>
                  <MarketingCtaButton href="/training" testId="hero-cta-view-modules" variant="outline">
                    View modules
                  </MarketingCtaButton>
                </div>
                <p className="animate-fade-in-up delay-400 mt-3 text-sm text-slate-500">
                  Free whilst we&apos;re testing — paid subscription later · No card required
                </p>
              </div>

              {/* Right — product preview */}
              <div className="animate-fade-in-up delay-200 lg:pl-4">
                <HeroProductPreview />
              </div>
            </div>

            {/* Stats strip */}
            <div className="reveal-stagger mt-14 grid grid-cols-2 gap-3 border-t border-slate-200/70 pt-10 sm:grid-cols-4 sm:gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <Icon className="mx-auto lg:mx-0 mb-2 h-5 w-5 text-[#9a7a24]" aria-hidden />
                  <p className="font-display text-2xl font-bold text-[#0B3C5D] sm:text-3xl">{value}</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center lg:justify-start">
              <PartnerHeroMention />
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y border-slate-200 bg-white py-6" aria-label="Trust indicators">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12">
              {[
                'Aligned with PACE 1984, Code C, and PSRAS',
                'Timed MCQs and CIT-style scenarios',
                'Built for candidates in England & Wales',
              ].map((text) => (
                <li key={text} className="flex items-center gap-3 text-sm font-semibold text-[#0B3C5D]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Try a question — experience the product before signing up */}
        <section
          className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24"
          aria-labelledby="try-heading"
        >
          <div className="deco-orb deco-orb-gold -left-16 top-10 h-64 w-64 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="section-label-primary justify-center mb-3">Try it now</p>
              <div className="section-bar-primary mx-auto mb-5" />
              <h2 id="try-heading" className="font-display text-3xl font-bold text-[#0B3C5D] sm:text-4xl">
                See how it works — answer one
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                A real exam-level question with a worked explanation. No sign-up, no card.
              </p>
            </div>
            <TryQuestionWidget questionStat={questionStat} />
          </div>
        </section>

        {/* Features — dark premium bento band */}
        <section
          className="relative overflow-hidden hero-pattern py-20 sm:py-24"
          id="features"
          aria-labelledby="features-heading"
        >
          <div className="deco-orb deco-orb-gold -right-16 top-0 h-72 w-72 opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <p className="section-label mb-3">Platform</p>
              <div className="gold-bar mb-5" />
              <h2 id="features-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
                Everything you need to prepare well
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Professional tools in one place — designed to help you progress with confidence.
              </p>
            </div>
            <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
              {features.map(({ icon: Icon, title, desc }, idx) => (
                <article
                  key={title}
                  className={`glass-card group rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.1] ${
                    idx === 0 ? 'lg:row-span-2 lg:flex lg:flex-col lg:justify-between' : ''
                  } ${idx === 3 ? 'lg:col-span-2' : ''}`}
                >
                  <div className="icon-tile-gradient mb-5 h-12 w-12 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className={`font-bold text-white ${idx === 0 ? 'text-xl' : 'text-lg'}`}>{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-slate-200 bg-white py-20 sm:py-24" aria-labelledby="how-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <p className="section-label-primary justify-center mb-3">Process</p>
              <div className="section-bar-primary mx-auto mb-5" />
              <h2 id="how-heading" className="font-display text-3xl font-bold text-[#0B3C5D] sm:text-4xl">
                How it works
              </h2>
            </div>
            <div className="relative">
              {/* Connector line behind steps (desktop) */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-8 hidden md:block"
                aria-hidden
              >
                <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              </div>
              <div className="reveal-stagger relative grid gap-10 md:grid-cols-3">
                {steps.map(({ n, title, sub, icon: Icon }) => (
                  <div key={n} className="text-center">
                    <div className="mx-auto flex flex-col items-center gap-4">
                      <div className="icon-tile-gradient relative h-16 w-16">
                        <Icon className="h-7 w-7" aria-hidden />
                        <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#D4AF37] text-xs font-bold text-[#0B3C5D] shadow-sm">
                          {n}
                        </span>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-900">{title}</p>
                        <p className="mt-1 text-sm text-slate-700">{sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24" aria-labelledby="why-heading">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 id="why-heading" className="font-display text-3xl font-bold text-[#0B3C5D] sm:text-4xl">
                Why candidates choose PSR Train
              </h2>
            </div>
            <ul className="reveal-stagger space-y-4">
              {whyPoints.map((text) => (
                <li
                  key={text}
                  className="card-lift flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:border-[#D4AF37]/40"
                >
                  <span className="icon-box-green h-10 w-10">
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-base font-semibold text-slate-800">{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <Link
                href="/guides"
                className="text-sm font-semibold text-[#0B3C5D] underline decoration-slate-300 underline-offset-4 hover:decoration-[#0B3C5D]"
              >
                Read our free PSR &amp; PSRAS guides →
              </Link>
            </p>
          </div>
        </section>

        {/* Latest content */}
        <section
          className="border-y border-slate-200 bg-white py-20 sm:py-24"
          aria-labelledby="content-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="section-label-primary justify-center mb-3">Resources</p>
              <div className="section-bar-primary mx-auto mb-5" />
              <h2 id="content-heading" className="font-display text-3xl font-bold text-[#0B3C5D] sm:text-4xl">
                Latest guides &amp; articles
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                Free PSRAS preparation reading — PACE, CIT, portfolio tips, and exam strategy.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-bold text-[#0B3C5D] mb-4 border-b border-slate-200 pb-2">
                  From the blog
                </h3>
                <ul className="space-y-4">
                  {latestBlog.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={appendUtm(`${siteUrl}/blog/${post.slug}`, {
                          source: 'psrtrain',
                          medium: 'web',
                          campaign: 'homepage_latest_blog',
                          content: post.slug,
                        })}
                        className="card-lift group block rounded-xl border border-slate-200 border-l-[3px] border-l-transparent bg-slate-50/50 p-4 hover:border-[#0B3C5D]/25 hover:border-l-[#D4AF37] hover:bg-white"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          {post.category}
                        </p>
                        <p className="font-semibold text-[#0B3C5D] group-hover:underline">{post.title}</p>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{post.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/blog"
                  className="inline-block mt-4 text-sm font-semibold text-[#0B3C5D] hover:underline"
                >
                  View all blog posts →
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B3C5D] mb-4 border-b border-slate-200 pb-2">
                  Popular guides
                </h3>
                <ul className="space-y-4">
                  {featuredGuides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={appendUtm(`${siteUrl}/guides/${guide.slug}`, {
                          source: 'psrtrain',
                          medium: 'web',
                          campaign: 'homepage_featured_guides',
                          content: guide.slug,
                        })}
                        className="card-lift group block rounded-xl border border-slate-200 border-l-[3px] border-l-transparent bg-slate-50/50 p-4 hover:border-[#0B3C5D]/25 hover:border-l-[#D4AF37] hover:bg-white"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                          {guide.category} · {guide.readMinutes} min
                        </p>
                        <p className="font-semibold text-[#0B3C5D] group-hover:underline">{guide.title}</p>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{guide.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/guides"
                  className="inline-block mt-4 text-sm font-semibold text-[#0B3C5D] hover:underline"
                >
                  Browse all guides →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — objection handling */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24" aria-labelledby="faq-heading">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="section-label-primary justify-center mb-3">Questions</p>
              <div className="section-bar-primary mx-auto mb-5" />
              <h2 id="faq-heading" className="font-display text-3xl font-bold text-[#0B3C5D] sm:text-4xl">
                Common questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-colors open:border-[#0B3C5D]/25 hover:border-[#D4AF37]/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#0B3C5D]">
                    {f.q}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[#0B3C5D] transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <MarketingCtaBand
          title="Lock in free access while we're testing"
          description="PSR Train is free now and moving to a paid subscription later. Create your account today and start preparing — no card required."
          href="/signup"
          buttonLabel="Begin training"
          testId="footer-cta-begin-training"
        />
      </main>
      <Footer />
    </div>
  );
}
