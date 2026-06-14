import Link from "next/link";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";

export function HomePriorityCoverage() {
  return (
    <section className="py-12 bg-white border-t border-slate-200" aria-labelledby="priority-coverage-heading">
      <div className="max-w-4xl mx-auto px-4">
        <h2 id="priority-coverage-heading" className="text-2xl md:text-3xl font-black text-slate-900 mb-3 text-center">
          Priority police station cover
        </h2>
        <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
          Extended-hours attendance at North Kent (Gravesend) and Tonbridge custody suites, plus
          voluntary interviews across Kent.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Link
            href="/police-station-rep-gravesend"
            className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 p-5 transition-colors"
          >
            <p className="font-bold text-slate-900">North Kent (Gravesend) custody</p>
            <p className="text-sm text-slate-600 mt-1">Thames Way, Northfleet — 24-hour custody</p>
          </Link>
          <Link
            href="/police-station-rep-tonbridge"
            className="rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 p-5 transition-colors"
          >
            <p className="font-bold text-slate-900">Tonbridge custody &amp; interviews</p>
            <p className="text-sm text-slate-600 mt-1">West Kent — custody and voluntary interviews</p>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <ConversionCTAGroup layout="stacked" className="max-w-md w-full" />
        </div>
        <p className="text-center text-sm text-slate-600">
          All Kent stations:{" "}
          <Link href="/locations" className="font-semibold text-blue-700 hover:underline">
            browse locations
          </Link>{" "}
          or{" "}
          <Link href="/police-stations" className="font-semibold text-blue-700 hover:underline">
            police station directory
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
