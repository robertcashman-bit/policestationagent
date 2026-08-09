"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { FunnelEvents } from "@/lib/analytics";
import { PATH_VOLUNTARY, PATH_VOLUNTARY_LANDING } from "@/config/enquiry-paths";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";
import { QualifiedPhoneReveal } from "@/components/conversion/QualifiedPhoneReveal";

type Detained = "yes" | "no" | "unknown" | null;
type Relationship =
  | "detainee"
  | "parent"
  | "spouse"
  | "child"
  | "sibling"
  | "aa"
  | "friend"
  | "other"
  | null;
type OtherSolicitor = "no" | "yes" | "unknown" | null;

const QUALIFIED_RELATIONSHIPS = new Set<Relationship>([
  "detainee",
  "parent",
  "spouse",
  "child",
  "sibling",
  "aa",
]);

function OutOfScope({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-xl border border-slate-300 bg-white p-5 space-y-4"
      role="status"
      aria-live="polite"
    >
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <div className="text-sm text-slate-700 space-y-3">{children}</div>
      <PoliceSignposting compact />
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href={PATH_VOLUNTARY} className="font-semibold text-primary underline">
          Voluntary interview route
        </Link>
        <Link href="/faq" className="font-semibold text-primary underline">
          FAQ
        </Link>
        <Link href={PATH_VOLUNTARY_LANDING} className="font-semibold text-primary underline">
          Voluntary interviews
        </Link>
      </div>
    </div>
  );
}

export function CustodyQualificationFlow() {
  const [detained, setDetained] = useState<Detained>(null);
  const [relationship, setRelationship] = useState<Relationship>(null);
  const [otherSolicitor, setOtherSolicitor] = useState<OtherSolicitor>(null);

  useEffect(() => {
    FunnelEvents.custodyScreenStart();
  }, []);

  const qualified =
    detained === "yes" &&
    QUALIFIED_RELATIONSHIPS.has(relationship) &&
    (otherSolicitor === "no" || otherSolicitor === "unknown");

  useEffect(() => {
    if (qualified) FunnelEvents.custodyScreenQualified();
  }, [qualified]);

  useEffect(() => {
    if (detained === "no") FunnelEvents.enquiryOutOfScope("not_detained");
    if (detained === "unknown") FunnelEvents.enquiryOutOfScope("unknown_detention");
  }, [detained]);

  useEffect(() => {
    if (relationship === "friend") FunnelEvents.enquiryOutOfScope("friend");
    if (relationship === "other") FunnelEvents.enquiryOutOfScope("other_relationship");
  }, [relationship]);

  useEffect(() => {
    if (otherSolicitor === "yes") FunnelEvents.enquiryOutOfScope("other_solicitor");
  }, [otherSolicitor]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 md:p-5">
        <p className="text-sm md:text-base text-red-950 font-medium">
          Someone must be detained inside a police station now. This service cannot trace a person,
          obtain a custody update for an uninstructed relative, report a crime or provide advice
          about an arrest that has already ended.
        </p>
      </div>

      <fieldset className="rounded-xl border border-slate-200 bg-white p-5">
        <legend className="text-base font-bold text-slate-900 px-1">
          Question 1 — Is the person currently detained inside a Kent police station?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ["yes", "Yes"],
              ["no", "No"],
              ["unknown", "I do not know"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setDetained(value);
                setRelationship(null);
                setOtherSolicitor(null);
              }}
              className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-semibold border ${
                detained === value
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
              }`}
              aria-pressed={detained === value}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {detained === "no" ? (
        <OutOfScope title="This custody line is only for someone presently detained">
          <p>
            If the person has already been released, or the matter is a booked interview rather than
            current detention, use the voluntary interview route or the FAQ instead. We do not
            provide free general legal advice by telephone.
          </p>
        </OutOfScope>
      ) : null}

      {detained === "unknown" ? (
        <OutOfScope title="We cannot trace detainees or run welfare checks">
          <p>
            The solicitor is not able to locate a person in custody or perform police welfare
            checks. Contact the police on 101 (or 999 in an emergency) if you need to establish
            whether someone is detained.
          </p>
        </OutOfScope>
      ) : null}

      {detained === "yes" ? (
        <fieldset className="rounded-xl border border-slate-200 bg-white p-5">
          <legend className="text-base font-bold text-slate-900 px-1">Question 2 — Who are you?</legend>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {(
              [
                ["detainee", "The detained person"],
                ["parent", "Parent"],
                ["spouse", "Spouse or partner"],
                ["child", "Child"],
                ["sibling", "Sibling"],
                ["aa", "Appropriate adult or guardian"],
                ["friend", "Friend"],
                ["other", "Other"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setRelationship(value);
                  setOtherSolicitor(null);
                }}
                className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-semibold border text-left ${
                  relationship === value
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                }`}
                aria-pressed={relationship === value}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {detained === "yes" && (relationship === "friend" || relationship === "other") ? (
        <OutOfScope title="Friends and unrelated third parties cannot usually instruct">
          <p>
            The detainee should ask the custody officer directly for legal advice, or an immediate
            family member may make contact subject to the detainee confirming instructions. We do
            not reveal the solicitor telephone for friend or unrelated enquiries.
          </p>
        </OutOfScope>
      ) : null}

      {detained === "yes" && QUALIFIED_RELATIONSHIPS.has(relationship) ? (
        <fieldset className="rounded-xl border border-slate-200 bg-white p-5">
          <legend className="text-base font-bold text-slate-900 px-1">
            Question 3 — Has the detainee already asked for another solicitor or the duty solicitor?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                ["no", "No"],
                ["yes", "Yes"],
                ["unknown", "I do not know"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setOtherSolicitor(value)}
                className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-semibold border ${
                  otherSolicitor === value
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                }`}
                aria-pressed={otherSolicitor === value}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {otherSolicitor === "yes" ? (
        <OutOfScope title="An existing solicitor should normally be contacted">
          <p>
            If another solicitor or the duty solicitor has already been requested, that lawyer
            should normally be contacted. This website cannot obtain custody information merely
            because a third party calls, and we will not interfere with an existing retainer.
          </p>
        </OutOfScope>
      ) : null}

      {qualified ? <QualifiedPhoneReveal /> : null}
    </div>
  );
}
