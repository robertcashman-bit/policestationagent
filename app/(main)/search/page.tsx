import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BookOpen, FileText, HelpCircle, Newspaper } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { SearchForm } from '@/components/search/SearchForm';
import { searchStaticContent } from '@/lib/search/static-index';
import { searchQuestions } from '@/lib/search/query-questions';

export const metadata = {
  title: 'Search',
  description: 'Search PSR Train guides, blog posts, and practice questions.',
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

const typeIcons = {
  guide: BookOpen,
  blog: Newspaper,
  page: FileText,
};

export default async function SearchPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect('/auth?next=/search');

  const { q = '' } = await searchParams;
  const query = q.trim();
  const staticResults = query ? searchStaticContent(query) : [];
  const questionResults = query ? await searchQuestions(query) : [];

  return (
    <div className="space-y-8 animate-fade-in-up max-w-3xl">
      <div className="app-page-header">
        <p className="section-label mb-1.5">Training</p>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Search</h1>
        <p className="text-muted-foreground mt-1 text-[0.9375rem]">
          Find guides, articles, and practice questions across PSR Train.
        </p>
      </div>

      <SearchForm initialQuery={query} />

      {!query ? (
        <p className="text-sm text-muted-foreground">
          Enter at least two characters to search guides, blog posts, and question stems.
        </p>
      ) : (
        <div className="space-y-8">
          {staticResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Guides &amp; articles
              </h2>
              <ul className="space-y-2">
                {staticResults.map((item) => {
                  const Icon = typeIcons[item.type];
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="card-lift flex gap-3 rounded-xl border border-border border-l-[3px] border-l-transparent bg-card p-4 hover:border-primary/25 hover:border-l-[#D4AF37]"
                      >
                        <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground capitalize mt-0.5">{item.type}</p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.summary}</p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {questionResults.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Practice questions
              </h2>
              <ul className="space-y-2">
                {questionResults.map((q) => (
                  <li key={q.id}>
                    <Link
                      href={`/practice?search=${encodeURIComponent(query)}`}
                      className="card-lift flex gap-3 rounded-xl border border-border border-l-[3px] border-l-transparent bg-card p-4 hover:border-primary/25 hover:border-l-[#D4AF37]"
                    >
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-foreground line-clamp-2">{q.questionText}</p>
                        <p className="text-xs text-muted-foreground mt-1">{q.category}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {staticResults.length === 0 && questionResults.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;. Try different keywords or browse{' '}
              <Link href="/guides" className="text-primary hover:underline">
                guides
              </Link>{' '}
              and{' '}
              <Link href="/blog" className="text-primary hover:underline">
                blog posts
              </Link>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
