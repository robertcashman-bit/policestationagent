"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FunnelEvents } from "@/lib/analytics";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";
import { PATH_CUSTODY } from "@/config/enquiry-paths";
import { FormProgress } from "@/components/conversion/FormProgress";
import { SecureFileUpload } from "@/components/conversion/SecureFileUpload";
import { PoliceSignposting } from "@/components/conversion/PoliceSignposting";

const STEPS = ["Enquiry type", "Location", "Interview", "Your details", "Declarations"];

type FormState = {
  enquiryType: string;
  policeForce: string;
  policeStation: string;
  town: string;
  inKent: string;
  interviewDate: string;
  interviewTime: string;
  officerName: string;
  officerRank: string;
  officerPhone: string;
  officerEmail: string;
  crimeReference: string;
  allegation: string;
  receivedLetter: string;
  fullName: string;
  dateOfBirth: string;
  telephone: string;
  email: string;
  postcode: string;
  preferredContact: string;
  enquirerRole: string;
  otherSolicitor: string;
  otherSolicitorDetails: string;
  accurate: boolean;
  forthcoming: boolean;
  noRetainer: boolean;
  custodyRoute: boolean;
  notPolice: boolean;
  privacyConsent: boolean;
  company: string;
};

const INITIAL: FormState = {
  enquiryType: "",
  policeForce: "Kent Police",
  policeStation: "",
  town: "",
  inKent: "",
  interviewDate: "",
  interviewTime: "",
  officerName: "",
  officerRank: "",
  officerPhone: "",
  officerEmail: "",
  crimeReference: "",
  allegation: "",
  receivedLetter: "",
  fullName: "",
  dateOfBirth: "",
  telephone: "",
  email: "",
  postcode: "",
  preferredContact: "phone",
  enquirerRole: "interviewee",
  otherSolicitor: "no",
  otherSolicitorDetails: "",
  accurate: false,
  forthcoming: false,
  noRetainer: false,
  custodyRoute: false,
  notPolice: false,
  privacyConsent: false,
  company: "",
};

function fieldClass(invalid?: boolean) {
  return `mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
    invalid ? "border-red-500" : "border-slate-300"
  } focus:outline-none focus:ring-2 focus:ring-blue-600`;
}

export function VoluntaryInterviewForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
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

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(s: number): string[] {
    const e: string[] = [];
    if (s === 1 && !form.enquiryType) e.push("Please select whether the police have contacted you.");
    if (s === 2) {
      if (!form.policeStation.trim()) e.push("Police station or interview location is required.");
      if (!form.inKent) e.push("Please confirm whether the interview is in Kent.");
    }
    if (s === 3) {
      if (!form.allegation.trim()) e.push("A brief description of the allegation is required.");
    }
    if (s === 4) {
      if (!form.fullName.trim()) e.push("Full name is required.");
      if (!form.dateOfBirth.trim()) e.push("Date of birth is required.");
      if (!form.telephone.trim()) e.push("Telephone number is required.");
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        e.push("Enter a valid email address or leave it blank.");
      }
    }
    if (s === 5) {
      if (
        !form.accurate ||
        !form.forthcoming ||
        !form.noRetainer ||
        !form.custodyRoute ||
        !form.notPolice ||
        !form.privacyConsent
      ) {
        e.push("Please confirm all declarations before submitting.");
      }
    }
    return e;
  }

  function next() {
    const e = validateStep(step);
    if (e.length) {
      setErrors(e);
      return;
    }
    setErrors([]);
    if (form.enquiryType === "no" && step === 1) return;
    setStep((s) => Math.min(5, s + 1));
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validateStep(5);
    if (e.length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setErrors([]);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === "boolean") body.append(k, v ? "true" : "false");
        else body.append(k, String(v ?? ""));
      });
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        ["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
          const val = params.get(key);
          if (val) body.append(key, val);
        });
        body.append("landingPage", window.location.pathname);
        body.append("referrer", document.referrer || "");
      }
      files.forEach((f) => body.append("files", f));

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
        className="relative rounded-xl border border-green-300 bg-green-50 p-6 space-y-4"
        role="status"
        aria-live="polite"
        id="request"
      >
        <h2 className="text-xl font-black text-slate-900">Request received</h2>
        <p className="text-sm text-slate-800">
          Your request has been received for review. This does not guarantee acceptance of
          instructions. Do not miss or attend an interview solely because you are waiting for a
          response. Contact the interviewing officer if arrangements need to be changed.
        </p>
        <p className="text-sm font-semibold text-slate-900">Reference: {reference}</p>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">
            Optional follow-up for active interview representation only — not Kent Police and not a
            general legal advice line.
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center min-h-[44px] rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    );
  }

  if (form.enquiryType === "no" && step === 1) {
    return (
      <div id="request" className="space-y-4">
        <div className="rounded-xl border border-slate-300 bg-white p-5 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">This is not a general legal advice line</h2>
          <p className="text-sm text-slate-700">
            This form is for people who have been contacted by the police about an interview under
            caution. If that does not apply, please use the FAQ or official police contacts instead.
          </p>
          <button
            type="button"
            className="text-sm font-semibold text-primary underline"
            onClick={() => update("enquiryType", "")}
          >
            Change answer
          </button>
        </div>
        <PoliceSignposting />
      </div>
    );
  }

  return (
    <form
      id="request"
      onSubmit={onSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 space-y-5 scroll-mt-24"
      noValidate
    >
      <div>
        <h2 className="text-xl font-black text-slate-900">Request voluntary interview representation</h2>
        <p className="text-sm text-slate-600 mt-1">
          Structured enquiry for a forthcoming interview under caution. Urgent current custody:{" "}
          <Link href={PATH_CUSTODY} className="underline font-semibold text-slate-800">
            check the custody pathway
          </Link>
          .
        </p>
      </div>

      <FormProgress step={step} total={5} labels={STEPS} />

      {errors.length > 0 ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          className="rounded-md border border-red-300 bg-red-50 p-3"
          role="alert"
        >
          <p className="font-semibold text-red-900 text-sm mb-1">Please fix the following:</p>
          <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      {step === 1 ? (
        <fieldset>
          <legend className="text-sm font-bold text-slate-900">
            Have the police contacted you about attending an interview under caution?
          </legend>
          <div className="mt-3 space-y-2">
            {(
              [
                ["booked", "Yes, an interview date is booked"],
                ["no_date", "Yes, but no date has been arranged"],
                ["message", "I have received a letter, email or message"],
                ["no", "No"],
                ["unsure", "I am not sure"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex items-start gap-2 text-sm text-slate-800">
                <input
                  type="radio"
                  name="enquiryType"
                  className="mt-1"
                  checked={form.enquiryType === value}
                  onChange={() => update("enquiryType", value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Police force
            <input
              className={fieldClass()}
              value={form.policeForce}
              onChange={(e) => update("policeForce", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Police station or proposed interview location
            <input
              className={fieldClass()}
              required
              value={form.policeStation}
              onChange={(e) => update("policeStation", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Town
            <input
              className={fieldClass()}
              value={form.town}
              onChange={(e) => update("town", e.target.value)}
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-bold text-slate-900">Is the interview in Kent?</legend>
            <div className="mt-2 flex flex-wrap gap-3">
              {(["yes", "no", "unsure"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="inKent"
                    checked={form.inKent === v}
                    onChange={() => update("inKent", v)}
                  />
                  {v === "yes" ? "Yes" : v === "no" ? "No" : "Not sure"}
                </label>
              ))}
            </div>
            {form.inKent === "no" ? (
              <p className="mt-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded p-2">
                Attendance outside Kent is not promised and depends on confirmation of availability.
              </p>
            ) : null}
          </fieldset>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-800">
            Scheduled date
            <input
              type="date"
              className={fieldClass()}
              value={form.interviewDate}
              onChange={(e) => update("interviewDate", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Scheduled time
            <input
              type="time"
              className={fieldClass()}
              value={form.interviewTime}
              onChange={(e) => update("interviewTime", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Officer name
            <input
              className={fieldClass()}
              value={form.officerName}
              onChange={(e) => update("officerName", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Officer rank (if known)
            <input
              className={fieldClass()}
              value={form.officerRank}
              onChange={(e) => update("officerRank", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Officer telephone
            <input
              className={fieldClass()}
              value={form.officerPhone}
              onChange={(e) => update("officerPhone", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Officer email
            <input
              type="email"
              className={fieldClass()}
              value={form.officerEmail}
              onChange={(e) => update("officerEmail", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Crime reference (if known)
            <input
              className={fieldClass()}
              value={form.crimeReference}
              onChange={(e) => update("crimeReference", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Alleged offence or brief description
            <textarea
              className={fieldClass()}
              rows={3}
              required
              value={form.allegation}
              onChange={(e) => update("allegation", e.target.value)}
            />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-bold text-slate-900">
              Have you received a letter or email from the police?
            </legend>
            <div className="mt-2 flex gap-4">
              {(["yes", "no"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="receivedLetter"
                    checked={form.receivedLetter === v}
                    onChange={() => update("receivedLetter", v)}
                  />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="sm:col-span-2">
            <SecureFileUpload files={files} onChange={setFiles} label="Police invitation (optional)" />
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Full name
            <input
              className={fieldClass()}
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Date of birth
            <input
              type="date"
              className={fieldClass()}
              required
              value={form.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Postcode
            <input
              className={fieldClass()}
              value={form.postcode}
              onChange={(e) => update("postcode", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Telephone
            <input
              type="tel"
              className={fieldClass()}
              required
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Email (optional)
            <input
              type="email"
              className={fieldClass()}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Preferred contact method
            <select
              className={fieldClass()}
              value={form.preferredContact}
              onChange={(e) => update("preferredContact", e.target.value)}
            >
              <option value="phone">Telephone</option>
              <option value="email">Email</option>
              <option value="either">Either</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Who is making this enquiry?
            <select
              className={fieldClass()}
              value={form.enquirerRole}
              onChange={(e) => update("enquirerRole", e.target.value)}
            >
              <option value="interviewee">The interviewee</option>
              <option value="family">Immediate family member</option>
            </select>
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-bold text-slate-900">
              Has another solicitor already been instructed?
            </legend>
            <div className="mt-2 flex gap-4">
              {(["no", "yes"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="otherSolicitor"
                    checked={form.otherSolicitor === v}
                    onChange={() => update("otherSolicitor", v)}
                  />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
            {form.otherSolicitor === "yes" ? (
              <label className="block mt-2 text-sm font-semibold text-slate-800">
                Details
                <input
                  className={fieldClass()}
                  value={form.otherSolicitorDetails}
                  onChange={(e) => update("otherSolicitorDetails", e.target.value)}
                />
              </label>
            ) : null}
          </fieldset>
        </div>
      ) : null}

      {step === 5 ? (
        <fieldset className="space-y-3">
          <legend className="text-sm font-bold text-slate-900">Declarations</legend>
          {(
            [
              ["accurate", "The information I have supplied is accurate to the best of my knowledge."],
              [
                "forthcoming",
                "This enquiry concerns a current or forthcoming police interview under caution.",
              ],
              [
                "noRetainer",
                "I understand that submitting this form does not itself create a solicitor-client retainer.",
              ],
              [
                "custodyRoute",
                "I understand that urgent current-custody matters must use the custody pathway, not this form.",
              ],
              ["notPolice", "I understand that this website is not the police."],
              [
                "privacyConsent",
                "I consent to my information being processed for the purpose of reviewing this representation request, including special-category and criminal-allegation data as described in the privacy notice.",
              ],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-start gap-2 text-sm text-slate-800">
              <input
                type="checkbox"
                className="mt-1"
                checked={form[key]}
                onChange={(e) => update(key, e.target.checked)}
              />
              <span>{label}</span>
            </label>
          ))}
          <p className="text-xs text-slate-600">
            See our{" "}
            <Link href="/privacy" className="underline font-semibold">
              privacy notice
            </Link>
            .
          </p>
        </fieldset>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => {
              setErrors([]);
              setStep((s) => Math.max(1, s - 1));
            }}
            className="min-h-[44px] rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Back
          </button>
        ) : null}
        {step < 5 ? (
          <button
            type="button"
            onClick={next}
            className="btn-navy text-sm px-5 py-2"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="btn-navy text-sm px-5 py-2 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit enquiry"}
          </button>
        )}
      </div>
    </form>
  );
}
