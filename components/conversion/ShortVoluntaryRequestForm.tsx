"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FunnelEvents } from "@/lib/analytics";
import { PATH_VOLUNTARY } from "@/config/enquiry-paths";

/**
 * Short VA request for Contact / landing conversion — station & date optional.
 * Posts formMode=short to /api/enquiry/voluntary.
 */
export function ShortVoluntaryRequestForm() {
  const [fullName, setFullName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [notPolice, setNotPolice] = useState(false);
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      FunnelEvents.voluntaryFormStart();
    }
  }, []);

  useEffect(() => {
    if (errors.length) errorRef.current?.focus();
  }, [errors]);

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: string[] = [];
    if (!fullName.trim()) e.push("Your name is required.");
    if (!telephone.trim() || telephone.replace(/\D/g, "").length < 10) {
      e.push("A valid contact telephone number is required.");
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.push("Enter a valid email or leave it blank.");
    }
    if (!notPolice) e.push("Please confirm you understand we are not the police.");
    if (!consent) e.push("Please consent to us storing your details to contact you.");
    if (e.length) {
      setErrors(e);
      return;
    }

    setSubmitting(true);
    setErrors([]);
    try {
      const body = new FormData();
      body.append("formMode", "short");
      body.append("enquiryType", "message");
      body.append("policeForce", "Kent Police");
      body.append("policeStation", policeStation.trim() || "Not yet known");
      body.append("town", "");
      body.append("inKent", "yes");
      body.append("interviewDate", interviewDate.trim());
      body.append("interviewTime", "");
      body.append("officerName", "");
      body.append("officerRank", "");
      body.append("officerPhone", "");
      body.append("officerEmail", "");
      body.append("crimeReference", "");
      body.append(
        "allegation",
        note.trim() ||
          "Voluntary interview / letter invitation — details to be confirmed on contact.",
      );
      body.append("receivedLetter", "yes");
      body.append("fullName", fullName.trim());
      body.append("dateOfBirth", "To confirm on contact");
      body.append("telephone", telephone.trim());
      body.append("email", email.trim());
      body.append("postcode", "");
      body.append("preferredContact", "phone");
      body.append("enquirerRole", "interviewee");
      body.append("otherSolicitor", "no");
      body.append("otherSolicitorDetails", "");
      body.append("accurate", "true");
      body.append("forthcoming", "true");
      body.append("noRetainer", "true");
      body.append("custodyRoute", "true");
      body.append("notPolice", "true");
      body.append("privacyConsent", "true");
      body.append("company", company);
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        ["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
          const val = params.get(key);
          if (val) body.append(key, val);
        });
        body.append("landingPage", window.location.pathname);
        body.append("referrer", document.referrer || "");
      }

      const res = await fetch("/api/enquiry/voluntary", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors([data.error || "Submission failed. Please try again."]);
        return;
      }
      FunnelEvents.voluntaryFormSubmit();
      setReference(data.reference || "received");
    } catch {
      setErrors(["Network error. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div
        className="rounded-xl border border-green-300 bg-green-50 p-5 space-y-3"
        role="status"
        aria-live="polite"
        data-testid="short-va-success"
      >
        <h3 className="text-lg font-bold text-slate-900">Request received</h3>
        <p className="text-sm text-slate-800 leading-relaxed">
          We will review your voluntary interview request. This does not guarantee acceptance. Do
          not miss an interview solely because you are waiting — contact the interviewing officer if
          arrangements need to change, and tell them a solicitor is being instructed.
        </p>
        <p className="text-sm font-semibold text-slate-900">Reference: {reference}</p>
        <p className="text-xs text-slate-600">
          Need the fuller form with officer details and letter upload?{" "}
          <Link href={`${PATH_VOLUNTARY}#request`} className="underline font-semibold">
            Open the full request form
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-card p-5 space-y-4"
      noValidate
      data-testid="short-va-form"
    >
      <div>
        <h3 className="font-display text-base font-bold text-primary">
          Short request — voluntary interview
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Station and date help us act faster but are optional if you do not have them yet.
        </p>
      </div>

      {errors.length > 0 ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          className="rounded-md border border-red-300 bg-red-50 p-3"
          role="alert"
        >
          <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="short-va-company">Company</label>
        <input
          id="short-va-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        Your name <span className="text-red-600">*</span>
        <input
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        Contact telephone <span className="text-red-600">*</span>
        <input
          type="tel"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
          autoComplete="tel"
        />
      </label>

      <label className="block text-sm font-semibold text-slate-800">
        Email <span className="text-slate-500 font-normal">(optional)</span>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          Police station <span className="text-slate-500 font-normal">(if known)</span>
          <input
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={policeStation}
            onChange={(e) => setPoliceStation(e.target.value)}
            placeholder="e.g. Maidstone, Medway, North Kent"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-800">
          Interview date <span className="text-slate-500 font-normal">(if known)</span>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-800">
        Anything else we should know?{" "}
        <span className="text-slate-500 font-normal">(optional — do not discuss the allegation in detail)</span>
        <textarea
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          rows={2}
          maxLength={500}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. letter received yesterday, no date set yet"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-slate-800">
        <input
          type="checkbox"
          className="mt-1"
          checked={notPolice}
          onChange={(e) => setNotPolice(e.target.checked)}
        />
        <span>
          I understand this is an independent criminal defence solicitor service — not Kent Police
          — and I am requesting representation for a voluntary interview / letter under caution.
        </span>
      </label>

      <label className="flex items-start gap-2 text-sm text-slate-800">
        <input
          type="checkbox"
          className="mt-1"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          I consent to Police Station Agent storing these details to contact me about this request.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-light disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Request free solicitor"}
      </button>

      <p className="text-xs text-slate-600">
        Prefer more detail (officer, crime reference, letter upload)?{" "}
        <Link href={`${PATH_VOLUNTARY}#request`} className="underline font-semibold text-primary">
          Use the full form
        </Link>
        .
      </p>
    </form>
  );
}
