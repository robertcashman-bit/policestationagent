"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SMS_DISPLAY,
  SMS_TEL,
  SOLICITOR_SMS_ARIA,
} from "@/config/contact";
import { isPoliceContactIntentPath } from "@/lib/seo/station-contact-routes";

type Props = {
  className?: string;
  /** When true, never publish SMS digits (SSR-safe for station pages). */
  forceHideDigits?: boolean;
  /** Optional SMS body (URL-encoded by caller or left empty). */
  body?: string;
  children?: React.ReactNode;
  variant?: "footer" | "sticky" | "inline";
};

/**
 * On station / police-contact-intent routes: no SMS digits — link to /contact.
 * Elsewhere: normal sms: CTA labelled as independent solicitor.
 */
export default function RouteAwareSmsLink({
  className,
  forceHideDigits = false,
  body = "I need custody or scheduled interview representation",
  children,
  variant = "inline",
}: Props) {
  const pathname = usePathname();
  const hideDigits = forceHideDigits || isPoliceContactIntentPath(pathname);

  if (hideDigits) {
    if (variant === "sticky") {
      return (
        <Link
          href="/contact"
          data-event="contact_click"
          className={
            className ||
            "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#0A2342]"
          }
          aria-label="Solicitor SMS — see Contact page"
        >
          <span className="text-[11px] font-bold uppercase tracking-wide">SMS</span>
          <span className="text-sm font-black leading-none">Contact</span>
        </Link>
      );
    }

    return (
      <Link
        href="/contact"
        data-event="contact_click"
        className={
          className ||
          (variant === "footer"
            ? "text-sky-300 hover:text-sky-200 font-medium"
            : "inline-flex items-center font-medium")
        }
        aria-label="Solicitor SMS — see Contact page"
      >
        {children || "Solicitor SMS (Contact)"}
      </Link>
    );
  }

  const href = body
    ? `sms:${SMS_TEL}?body=${encodeURIComponent(body)}`
    : `sms:${SMS_TEL}`;

  if (variant === "sticky") {
    return (
      <a
        href={href}
        data-event="sms_click"
        className={
          className ||
          "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[#0A2342]"
        }
        aria-label={SOLICITOR_SMS_ARIA}
      >
        <span className="text-[11px] font-bold uppercase tracking-wide">
          Independent solicitor
        </span>
        <span className="text-sm font-black leading-none">{SMS_DISPLAY}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      data-event="sms_click"
      className={
        className ||
        (variant === "footer"
          ? "text-sky-300 hover:text-sky-200 font-medium"
          : "inline-flex items-center font-medium")
      }
      aria-label={SOLICITOR_SMS_ARIA}
    >
      {children || `Solicitor SMS ${SMS_DISPLAY}`}
    </a>
  );
}
