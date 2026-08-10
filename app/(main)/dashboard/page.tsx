import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  FolderOpen,
  Award,
  ChevronRight,
  AlertTriangle,
  BarChart3,
  Target,
  Zap,
  Clock,
  FileCheck,
  Shield,
} from 'lucide-react';
import { FreeAccessBanner } from '@/components/FreeAccessBanner';
import { FirstVisitChecklist } from '@/components/dashboard/FirstVisitChecklist';
import { getUserTrainingStats } from '@/lib/training-progress';

export const metadata = {
  title: 'Dashboard',
  description: 'Your PSR Train training dashboard.',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth?next=/dashboard');

  const stats = await getUserTrainingStats(user.id);
  const hasPracticed = stats.questionsAnswered > 0;

  const firstName =
    user.email ? user.email.split('@')[0].replace(/[._]/g, ' ').split(' ')[0] : 'there';
  const capitalised = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const quickLinks = [
    {
      href: '/practice',
      icon: BookOpen,
      title: 'Practice Questions',
      desc: 'MCQ questions across all topics with instant feedback',
      badge: 'Most popular',
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      href: '/modules',
      icon: FolderOpen,
      title: 'Learning Modules',
      desc: 'Topic-based study materials organised by subject area',
      badge: null,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      href: '/critical-incidents',
      icon: AlertTriangle,
      title: 'Critical Incidents',
      desc: 'CIT-style scenario training with worked answers',
      badge: null,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      href: '/mock-exam',
      icon: FileCheck,
      title: 'Mock exam',
      desc: 'Timed 50-question assessment under exam conditions',
      badge: 'Exam prep',
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
    {
      href: '/progress',
      icon: BarChart3,
      title: 'My Progress',
      desc: 'Track your accuracy and study activity over time',
      badge: null,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  const hints = [
    {
      icon: Target,
      title: 'Start with practice',
      desc: 'Work through questions by category, or select "All" to test breadth across topics.',
    },
    {
      icon: BookOpen,
      title: 'Study modules first',
      desc: 'Each module covers a key subject area. Reading before practising improves retention.',
    },
    {
      icon: Zap,
      title: 'Use keyboard shortcuts',
      desc: 'In practice mode: 1–4 to select, Enter to submit, Enter again to advance.',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <FreeAccessBanner />

      {/* Page header */}
      <div className="app-page-header">
        <p className="section-label mb-1.5">Dashboard</p>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Welcome back, {capitalised}
        </h1>
        <p className="text-muted-foreground mt-1 text-[0.9375rem]">
          Continue your PSRAS preparation — pick up where you left off.
          {hasPracticed && stats.accuracyPct !== null && (
            <> You&apos;re at {stats.accuracyPct}% accuracy across {stats.questionsAnswered} questions.</>
          )}
        </p>
      </div>

      <FirstVisitChecklist
        hasPracticed={hasPracticed}
        hasMockExamAttempt={stats.hasMockExamAttempt}
      />

      {stats.weakSyllabusTag && (
        <div className="rounded-2xl border border-primary/20 bg-primary-50/40 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Suggested drill</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Focus on {stats.weakSyllabusTag} — your weakest syllabus unit so far.
            </p>
          </div>
          <Link
            href={`/practice?syllabus=${stats.weakSyllabusTag}&preset=exam`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline shrink-0"
          >
            Start drill
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Quick access */}
      <div>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
          Quick access
        </h2>
        <div className="reveal-stagger grid gap-3 sm:grid-cols-2">
          {quickLinks.map(({ href, icon: Icon, title, desc, badge }) => (
            <Link
              key={href}
              href={href}
              className="app-quick-link group"
            >
              <div className="icon-tile-gradient w-11 h-11">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground text-[0.9375rem] leading-tight">{title}</h3>
                  {badge && (
                    <span className="text-[10px] font-bold bg-gold/15 text-gold-600 px-2 py-0.5 rounded-full leading-none">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="app-panel p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="icon-tile-gradient w-7 h-7">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-semibold text-foreground text-[0.9375rem]">How to get the most from PSR Train</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {hints.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3">
              <div className="icon-tile-gradient w-8 h-8 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="app-cta-strip flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="icon-tile-gradient w-10 h-10 flex-shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-0.5">Ready to get started?</h3>
          <p className="text-sm text-muted-foreground">
            Jump into practice questions to test your current knowledge across PACE, custody, and disclosure.
          </p>
        </div>
        <Link
          href="/practice"
          className="flex-shrink-0 inline-flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md gap-1.5"
        >
          Start practice
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
