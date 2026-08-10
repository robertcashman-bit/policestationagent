import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BarChart3,
  Target,
  AlertTriangle,
  Award,
  ArrowRight,
  BookOpen,
  Clock,
  FileCheck,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { getUserTrainingStats } from '@/lib/training-progress';
import { getDetailedTrainingProgress } from '@/lib/training-progress-details';

export const metadata = {
  title: 'Progress',
  description: 'Track your PSR training progress.',
};

export default async function ProgressPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth?next=/progress');

  const [stats, details] = await Promise.all([
    getUserTrainingStats(user.id),
    getDetailedTrainingProgress(user.id),
  ]);
  const hasData = stats.questionsAnswered > 0;

  const cards = [
    {
      label: 'Questions answered',
      value: String(stats.questionsAnswered),
      icon: Target,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      desc: 'Across all practice sessions',
    },
    {
      label: 'CIT scenarios completed',
      value: String(stats.citScenariosCompleted),
      icon: AlertTriangle,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      desc: 'Critical incident training sessions',
    },
    {
      label: 'Accuracy rate',
      value: stats.accuracyPct !== null ? `${stats.accuracyPct}%` : '—',
      icon: BarChart3,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      desc: 'Questions answered correctly',
    },
    {
      label: 'Certificates earned',
      value: String(details.certificatesEarned),
      icon: Award,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      desc: 'Training completion milestones',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="app-page-header">
        <p className="section-label mb-1.5">Your training</p>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Progress</h1>
        <p className="text-muted-foreground mt-1 text-[0.9375rem]">
          Track your accuracy, syllabus coverage, mock exams, and study activity.
        </p>
      </div>

      <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, iconBg, iconColor, desc }) => (
          <div key={label} className="app-stat-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="icon-tile-gradient w-10 h-10">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-muted-foreground font-medium leading-tight">{label}</p>
            </div>
            <p className="text-3xl font-bold text-foreground tracking-tight mb-0.5">{value}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {stats.weakSyllabusTag && stats.weakSyllabusAccuracy !== null && (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5">
          <h2 className="font-semibold text-foreground mb-1">Focus area</h2>
          <p className="text-sm text-muted-foreground mb-3">
            {stats.weakSyllabusTag} accuracy is {stats.weakSyllabusAccuracy}% — drill this syllabus
            unit next.
          </p>
          <Link
            href={`/practice?syllabus=${stats.weakSyllabusTag}&difficulty=advanced&preset=exam`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Practice {stats.weakSyllabusTag}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {details.syllabusUnits.length > 0 && (
        <div className="app-panel">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Syllabus breakdown</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Accuracy by syllabus unit from your practice answers.
            </p>
          </div>
          <div className="p-6 space-y-4">
            {details.syllabusUnits.map((unit) => (
              <div key={unit.unit}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-foreground">{unit.unit}</span>
                  <span className="text-muted-foreground">
                    {unit.accuracyPct != null ? `${unit.accuracyPct}%` : '—'} · {unit.total} answered
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${unit.accuracyPct ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="app-panel">
          <div className="px-6 py-5 border-b border-border flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <h2 className="font-semibold text-foreground">Recent activity</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Your last five practice answers.</p>
            </div>
          </div>
          <div className="p-6">
            {details.recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No practice activity yet.</p>
            ) : (
              <ul className="space-y-3">
                {details.recentActivity.map((row) => (
                  <li
                    key={row.timestamp}
                    className="flex items-center justify-between text-sm border-b border-border/60 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-muted-foreground">
                      {new Date(row.timestamp).toLocaleString('en-GB', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                    <span
                      className={
                        row.answeredCorrectly
                          ? 'text-emerald-600 font-medium'
                          : 'text-rose-600 font-medium'
                      }
                    >
                      {row.answeredCorrectly ? 'Correct' : 'Incorrect'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="app-panel">
          <div className="px-6 py-5 border-b border-border flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-muted-foreground" />
            <div>
              <h2 className="font-semibold text-foreground">Mock exam history</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Recent timed mock exam results.</p>
            </div>
          </div>
          <div className="p-6">
            {details.mockExamHistory.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-3">No completed mock exams yet.</p>
                <Link
                  href="/mock-exam"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Take a mock exam
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {details.mockExamHistory.map((exam) => (
                  <li
                    key={exam.id}
                    className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{exam.examName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(exam.completedAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {exam.percentage != null ? `${Math.round(exam.percentage)}%` : '—'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exam.score ?? 0}/{exam.totalQuestions}
                      </p>
                    </div>
                  </li>
                ))}
                <li>
                  <Link
                    href="/mock-exam"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Retake mock exam
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="app-panel">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="font-semibold text-foreground">Activity summary</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {hasData && stats.lastPracticeAt
              ? `Last practice: ${new Date(stats.lastPracticeAt).toLocaleDateString('en-GB', { dateStyle: 'medium' })}`
              : 'Complete modules and practice questions to build your record.'}
          </p>
        </div>
        <div className="p-6">
          {!hasData ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">No progress recorded yet</p>
              <p className="text-muted-foreground text-sm mb-5">
                Answer practice questions to populate your progress stats.
              </p>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
              >
                Start practice
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You have answered {stats.questionsAnswered} questions with {stats.accuracyPct}%
              accuracy.{' '}
              {details.certificatesEarned > 0 && (
                <>
                  You have earned {details.certificatesEarned} certificate
                  {details.certificatesEarned === 1 ? '' : 's'}.{' '}
                  <Link href="/certificates" className="text-primary font-medium hover:underline">
                    View certificates
                  </Link>
                  .{' '}
                </>
              )}
              Keep practising or try a{' '}
              <Link href="/mock-exam" className="text-primary font-medium hover:underline">
                timed mock exam
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      <div className="app-cta-strip flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-0.5">Keep building your record</h3>
          <p className="text-sm text-muted-foreground">
            Use exam prep mode for harder questions without instant feedback until the end.
          </p>
        </div>
        <Link
          href="/practice?preset=exam&difficulty=advanced"
          className="flex-shrink-0 inline-flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm gap-1.5"
        >
          Exam prep
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
