import Link from "next/link";

const PROOF_ITEMS = [
  { value: "35+", label: "Years experience" },
  { value: "21,000+", label: "Clients helped" },
  { value: "100%", label: "Kent custody suites" },
  { value: "SRA 127795", label: "Tuckers Solicitors LLP" },
] as const;

export function HomeProofBar() {
  return (
    <section
      className="mx-auto max-w-5xl px-4 py-4"
      aria-label="Experience and credentials"
    >
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm px-4 py-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {PROOF_ITEMS.map((item) => (
            <div key={item.label}>
              <div className="text-xl md:text-2xl font-black text-blue-800">{item.value}</div>
              <div className="text-xs md:text-sm text-slate-600 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-700">
          Robert Cashman — accredited duty solicitor &amp; Higher Court Advocate via{" "}
          <strong>Tuckers Solicitors LLP</strong>.{" "}
          <Link href="/about" className="font-semibold text-blue-700 hover:underline">
            About Robert
          </Link>
          {" · "}
          <a href="#testimonials" className="font-semibold text-blue-700 hover:underline">
            Client testimonials
          </a>
        </p>
      </div>
    </section>
  );
}
