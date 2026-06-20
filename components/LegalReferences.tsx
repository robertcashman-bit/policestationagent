import Link from "next/link";
import { LegalAccuracyNotice } from "@/components/legal/LegalAccuracyNotice";

export type LegalSource = {
  id: string;
  label: string;
  href: string;
};

export function Ref({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 align-super text-[0.8em]">
      <a href={`#source-${n}`} className="text-blue-700 hover:underline">
        [{n}]
      </a>
    </sup>
  );
}

export function LegalReferences({
  sources,
  heading = "Sources",
}: {
  sources: LegalSource[];
  heading?: string;
}) {
  if (!sources.length) return null;

  return (
    <section aria-label={heading} className="mt-10 pt-8 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-4">{heading}</h2>
      <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
        {sources.map((s, idx) => (
          <li key={s.id} id={`source-${idx + 1}`} className="break-words">
            <span className="font-medium">{s.label}</span>
            <span className="mx-2 text-slate-400">—</span>
            {s.href.startsWith("/") ? (
              <Link href={s.href} className="text-blue-700 hover:underline">
                {s.href}
              </Link>
            ) : (
              <a
                href={s.href}
                className="text-blue-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.href}
              </a>
            )}
          </li>
        ))}
      </ol>
      <LegalAccuracyNotice variant="text" className="mt-4" />
    </section>
  );
}
