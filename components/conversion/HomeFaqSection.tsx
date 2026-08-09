import Link from "next/link";
import { FaqAnswerBody } from "@/components/FaqAnswerBody";

export type HomeFaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: HomeFaqItem[];
};

export function HomeFaqSection({ items }: Props) {
  return (
    <section
      className="section-pad bg-[var(--paper)] border-t border-border-subtle"
      aria-labelledby="kent-faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="section-eyebrow text-center">Common questions</p>
        <h2
          id="kent-faq-heading"
          className="mt-2 text-center font-display text-3xl font-bold text-primary md:text-4xl"
        >
          Frequently Asked Questions About Police Station Representation in Kent
        </h2>

        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              name="home-faq"
              className="group rounded-xl border border-border bg-card shadow-sm open:border-accent/40 open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-base font-bold text-primary md:text-lg">
                  {item.question}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 shrink-0 text-accent-dark transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="border-t border-border-subtle px-5 pb-5 pt-4 md:px-6 md:pb-6">
                <div className="prose prose-sm max-w-none text-foreground/85 prose-a:text-primary">
                  <FaqAnswerBody answer={item.answer} />
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-primary/15 bg-secondary/60 p-5 md:p-6">
          <h3 className="font-display text-lg font-bold text-primary">
            Want to learn more about police station interviews?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            Read our comprehensive guide:{" "}
            <Link
              href="/police-station-interviews-kent-rights"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Police Station Interviews in Kent: Your Rights and What to Expect
            </Link>{" "}
            — covering your rights under PACE 1984, what happens during interview, and the role of a
            solicitor.
          </p>
        </div>
      </div>
    </section>
  );
}
