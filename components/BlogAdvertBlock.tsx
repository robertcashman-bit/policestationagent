/**
 * MANDATORY ADVERT BLOCK COMPONENT
 *
 * This component MUST be included in every blog post.
 * It cannot be removed or disabled from individual posts.
 *
 * On station/custody-risk posts, never publish firm tel/SMS digits — link to /contact
 * so search/AI cannot quote the number next to police-station language.
 */

import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, SMS_DISPLAY, SMS_TEL, SOLICITOR_CONTACT_CTA } from "@/config/contact";

type Props = {
  /** When true, no crawlable firm telephone/SMS digits. */
  hideDigits?: boolean;
};

export default function BlogAdvertBlock({ hideDigits = false }: Props) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        Free legal advice at Kent police stations
      </h3>

      <p className="text-slate-700 mb-4">
        <strong>Robert Cashman</strong> is a qualified criminal solicitor and accredited duty
        solicitor. Legal services at the police station are provided through{" "}
        <strong>Tuckers Solicitors LLP</strong> (SRA ID: 127795). This is a private defence website
        — <strong>NOT Kent Police</strong>.
      </p>

      <p className="text-slate-700 mb-4">
        If you or someone you know faces arrest, custody, or a voluntary interview under caution at
        a Kent police station, you may be entitled to free legal advice. Robert Cashman attends
        custody suites and voluntary interviews across Kent — including North Kent (Gravesend),
        Tonbridge, Medway, Maidstone, Canterbury and other stations — subject to availability.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6" data-nosnippet={hideDigits || undefined}>
        {hideDigits ? (
          <>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition-colors"
            >
              {SOLICITOR_CONTACT_CTA}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold transition-colors"
            >
              Solicitor SMS (Contact)
            </Link>
          </>
        ) : (
          <>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition-colors"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={`sms:${SMS_TEL}?body=${encodeURIComponent("I need custody or scheduled interview representation in Kent")}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold transition-colors"
            >
              Text {SMS_DISPLAY}
            </a>
          </>
        )}
      </div>

      <p className="text-sm text-slate-600 mt-4">
        For someone in <strong>current</strong> custody or a <strong>booked</strong> voluntary
        interview at a Kent station. Ask for Robert Cashman, Tuckers Duty Solicitor — the DSCC have
        our details.
        {hideDigits ? (
          <>
            {" "}
            Solicitor telephone is on the{" "}
            <Link href="/contact" className="font-semibold underline text-blue-800">
              Contact
            </Link>{" "}
            page.
          </>
        ) : null}
      </p>
    </div>
  );
}
