import Link from 'next/link';
import type { ReactNode } from 'react';

type MarketingPageHeroProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  variant?: 'light' | 'dark';
};

export function MarketingPageHero({
  label,
  title,
  description,
  children,
  variant = 'light',
}: MarketingPageHeroProps) {
  if (variant === 'dark') {
    return (
      <section className="relative overflow-hidden hero-pattern py-20 sm:py-24 lg:py-28">
        <div className="deco-orb deco-orb-gold -right-10 -top-10 h-72 w-72 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          {label && (
            <>
              <p className="section-label justify-center mb-3 animate-fade-in-up">{label}</p>
              <div className="gold-bar mx-auto mb-6" />
            </>
          )}
          <h1 className="animate-fade-in-up delay-100 font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 sm:text-xl">
              {description}
            </p>
          )}
          {children && <div className="animate-fade-in-up delay-300 mt-8">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden hero-bright border-b border-slate-200/80 py-16 sm:py-20 lg:py-24">
      <div className="deco-orb deco-orb-blue -left-20 -top-24 h-64 w-64" aria-hidden />
      <div className="deco-orb deco-orb-gold -right-16 top-0 h-72 w-72" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {label && (
          <>
            <p className="section-label-primary justify-center mb-3 animate-fade-in-up">{label}</p>
            <div className="section-bar-primary mx-auto mb-5" />
          </>
        )}
        <h1 className="animate-fade-in-up delay-100 font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight text-[#0B3C5D] sm:text-4xl lg:text-[3.25rem]">
          {title}
        </h1>
        {description && (
          <p className="animate-fade-in-up delay-200 mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
            {description}
          </p>
        )}
        {children && <div className="animate-fade-in-up delay-300 mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Primary CTA — gold on light backgrounds */
export function MarketingCtaButton({
  href,
  children,
  testId,
  variant = 'gold',
}: {
  href: string;
  children: ReactNode;
  testId?: string;
  variant?: 'gold' | 'outline' | 'outline-light';
}) {
  if (variant === 'outline') {
    return (
      <Link
        href={href}
        data-testid={testId}
        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0B3C5D] bg-white px-8 py-3.5 text-sm font-semibold text-[#0B3C5D] shadow-sm transition hover:bg-primary-50"
      >
        {children}
      </Link>
    );
  }

  if (variant === 'outline-light') {
    return (
      <Link
        href={href}
        data-testid={testId}
        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-white/15 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      data-testid={testId}
      className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-[#0B3C5D]"
    >
      {children}
    </Link>
  );
}

/** Bright call-to-action band with readable dark text */
export function MarketingCtaBand({
  title,
  description,
  href,
  buttonLabel,
  testId,
}: {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  testId?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-br from-[#e8f2f8] via-white to-[#fdf9ef] py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0B3C5D] via-[#D4AF37] to-[#0B3C5D]" aria-hidden />
      <div className="deco-orb deco-orb-gold left-1/2 top-0 h-64 w-64 -translate-x-1/2 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-[#0B3C5D] sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-slate-700">{description}</p>
        <div className="mt-8">
          <MarketingCtaButton href={href} testId={testId}>
            {buttonLabel}
          </MarketingCtaButton>
        </div>
      </div>
    </section>
  );
}
