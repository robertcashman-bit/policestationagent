import { Check, X, Timer, TrendingUp, ShieldCheck } from 'lucide-react';

/**
 * Decorative, authentic mockup of the practice question interface for the
 * homepage hero. Purely presentational — mirrors the real product UI so the
 * value proposition is shown, not just told.
 */
export function HeroProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden>
      {/* Glow behind the card */}
      <div className="deco-orb deco-orb-blue absolute -right-10 top-6 h-56 w-56 opacity-80" />
      <div className="deco-orb deco-orb-gold absolute -left-8 bottom-0 h-44 w-44 opacity-70" />

      {/* Main product card */}
      <div className="gradient-border glow-navy relative">
        <div className="rounded-[1.25rem] bg-white p-5 sm:p-6">
          {/* Window chrome */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B3C5D]">
                Practice
              </span>
              <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-[#0B3C5D]">
                PACE · Code C
              </span>
            </div>
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
              Advanced
            </span>
          </div>

          {/* Question stem */}
          <p className="mb-4 text-[0.95rem] font-semibold leading-snug text-slate-900">
            A detained person asks to speak to a solicitor before interview. Under PACE Code C, the
            custody officer should:
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 px-3.5 py-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[0.8rem] font-medium text-emerald-900">
                Allow consultation and delay the interview accordingly
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border-2 border-red-300 bg-red-50/70 px-3.5 py-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400 text-white">
                <X className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[0.8rem] font-medium text-red-900/80 line-through decoration-red-300">
                Proceed with the interview without delay
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50/60 px-3.5 py-2.5 opacity-60">
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-300" />
              <span className="text-[0.8rem] font-medium text-slate-500">
                Require the request in writing first
              </span>
            </div>
          </div>

          {/* Explanation flash */}
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3.5 py-2.5">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <p className="text-[0.7rem] leading-relaxed text-emerald-900/80">
              Correct. Code C §6 guarantees access to legal advice — the interview should not begin
              until consultation has taken place.
            </p>
          </div>
        </div>
      </div>

      {/* Floating accuracy chip */}
      <div className="float-slow absolute -left-3 -top-4 z-10 hidden rounded-2xl bg-white px-4 py-3 shadow-card-hover ring-1 ring-slate-100 sm:block">
        <div className="flex items-center gap-2.5">
          <span className="icon-tile-gradient h-8 w-8">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Accuracy</p>
            <p className="text-base font-bold leading-none text-[#0B3C5D]">86%</p>
          </div>
        </div>
      </div>

      {/* Floating mock-exam timer chip */}
      <div className="float-slower absolute -bottom-5 -right-3 z-10 hidden rounded-2xl bg-[#0B3C5D] px-4 py-3 glow-navy sm:block">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Timer className="h-4 w-4 text-[#e8c96a]" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Mock exam</p>
            <p className="text-base font-bold leading-none text-white">42:18</p>
          </div>
        </div>
      </div>
    </div>
  );
}
