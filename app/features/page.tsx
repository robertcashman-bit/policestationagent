import type { Metadata } from 'next';
import Link from 'next/link';
import MarketingHeader from '@/components/layout/MarketingHeader';
import Footer from '@/components/layout/Footer';
import { BookOpen, FolderOpen, BarChart3, Award, FileCheck } from 'lucide-react';
import { PartnerToolsLines } from '@/components/PartnerToolsLines';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Features',
  description: 'Practice questions, modules, progress tracking, and structured tools to support PSRAS preparation.',
  path: '/features',
});

export default function FeaturesPage() {
  const features = [
    { icon: BookOpen, title: 'Practice questions', desc: 'A full bank of MCQs aligned to PSRAS and PACE Code C, with unlimited attempts. Timed mode and by-topic practice.' },
    { icon: FolderOpen, title: 'Learning modules', desc: 'Structured modules on custody, disclosure, rights, and interview practice.' },
    { icon: FileCheck, title: 'Critical incidents', desc: 'Scenario-based practice for the CIT. Identify issues and make decisions.' },
    { icon: BarChart3, title: 'Progress tracking', desc: 'Track your scores, weak areas, and improvement over time.' },
    { icon: Award, title: 'Certificates', desc: 'Completion certificates for modules and milestones (training evidence only — not PSRAS accreditation).' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MarketingHeader />
      <main id="main-content" className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Structured tools to support your PSRAS preparation</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Practice questions, modules, scenarios, and progress tracking in one platform.
            </p>
            <PartnerToolsLines />
          </div>
        </section>

        <section className="py-12 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-semibold text-foreground text-lg">{title}</h2>
                  <p className="mt-2 text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-white font-semibold hover:bg-primary-700"
            >
              Start training
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
