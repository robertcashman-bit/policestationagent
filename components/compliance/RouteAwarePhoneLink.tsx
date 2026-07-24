"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PHONE_DISPLAY, PHONE_TEL, SOLICITOR_TEL_ARIA } from "@/config/contact";
import { isPoliceContactIntentPath } from "@/lib/seo/station-contact-routes";

type Props = {
  variant: "header-strip" | "header-button" | "footer" | "sticky";
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
  /** When true, never publish tel digits (station pages SSR-safe). */
  forceHideDigits?: boolean;
};

/**
 * On station / police-contact-intent routes: no telephone digits — link to /contact
 * where do/don't scope is stated. Elsewhere: normal tel: CTA.
 */
export default function RouteAwarePhoneLink({
  variant,
  className,
  ariaLabel,
  children,
  forceHideDigits = false,
}: Props) {
  const pathname = usePathname();
  const hideDigits = forceHideDigits || isPoliceContactIntentPath(pathname);
  // Never publish firm digits in aria when hiding — parents sometimes pass PHONE_DISPLAY.
  const safeAria =
    ariaLabel && !/01732|07535|247427|494446/i.test(ariaLabel)
      ? ariaLabel
      : undefined;
  const telAria = ariaLabel || SOLICITOR_TEL_ARIA;

  if (hideDigits) {
    if (variant === "sticky") {
      return (
        <Link
          href="/contact"
          data-event="contact_click"
          className={
            className ||
            "flex flex-col items-center justify-center gap-0.5 py-2.5 text-red-700"
          }
          aria-label={
            safeAria || "Instruct criminal solicitor — see what we do and don't do"
          }
        >
          <span className="text-[11px] font-bold uppercase tracking-wide">Solicitor</span>
          <span className="text-sm font-black leading-none">Contact</span>
        </Link>
      );
    }

    if (variant === "footer") {
      return (
        <Link
          href="/contact"
          className={
            className ||
            "flex items-center gap-1.5 text-white hover:text-blue-300 font-medium"
          }
          title="Criminal solicitor contact — not a police number"
        >
          Instruct solicitor (Contact)
        </Link>
      );
    }

    if (variant === "header-strip") {
      return (
        <Link
          href="/contact"
          className={
            className ||
            "inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
          }
          title="Criminal solicitor — see what we do and don't do"
        >
          Instruct solicitor
        </Link>
      );
    }

    return (
      <Link
        href="/contact"
        className={
          className ||
          "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-extrabold min-h-[44px] h-11 px-3 sm:px-4 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md"
        }
        aria-label={safeAria || "Instruct criminal solicitor — Contact page"}
      >
        <span className="sm:hidden">Contact</span>
        <span className="hidden sm:inline font-black">Instruct solicitor</span>
      </Link>
    );
  }

  // Do not accept digit-bearing children from parents on show-digit routes only.
  if (children) {
    return (
      <a href={`tel:${PHONE_TEL}`} className={className} aria-label={telAria}>
        {children}
      </a>
    );
  }

  if (variant === "sticky") {
    return (
      <a
        href={`tel:${PHONE_TEL}`}
        data-event="call_click"
        className={
          className ||
          "flex flex-col items-center justify-center gap-0.5 py-2.5 text-red-700"
        }
        aria-label={telAria}
      >
        <span className="text-[11px] font-bold uppercase tracking-wide">
          Independent solicitor
        </span>
        <span className="text-sm font-black leading-none">{PHONE_DISPLAY}</span>
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <a
        href={`tel:${PHONE_TEL}`}
        className={
          className ||
          "flex items-center gap-1.5 text-white hover:text-blue-300 font-medium"
        }
        title="Independent solicitor — custody or scheduled voluntary interview only"
        aria-label={telAria}
      >
        Independent solicitor {PHONE_DISPLAY}
      </a>
    );
  }

  if (variant === "header-strip") {
    return (
      <a
        href={`tel:${PHONE_TEL}`}
        className={
          className ||
          "inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
        }
        title="Independent solicitor — for someone in custody or a scheduled voluntary interview only"
        aria-label={telAria}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Independent solicitor: {PHONE_DISPLAY}
      </a>
    );
  }

  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={className}
      aria-label={telAria}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-phone flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      <span className="hidden sm:inline">Independent solicitor</span>
      <span className="hidden sm:inline font-black">{PHONE_DISPLAY}</span>
      <span className="sm:hidden">Call</span>
    </a>
  );
}
