import Link from "next/link";

export function AuthorBox() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5 my-8 not-prose">
      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Author</p>
      <p className="font-bold text-slate-900">Robert Cashman</p>
      <p className="text-sm text-slate-700 mt-2">
        Robert Cashman is a duty-accredited criminal solicitor with extensive police station
        experience across Kent. Legal services are provided through Tuckers Solicitors LLP where
        applicable.
      </p>
      <Link href="/about" className="text-sm font-semibold text-blue-700 hover:underline mt-2 inline-block">
        About Robert Cashman →
      </Link>
    </aside>
  );
}
