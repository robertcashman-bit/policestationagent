"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FunnelEvents } from "@/lib/analytics";
import { FormProgress } from "@/components/conversion/FormProgress";
import { SecureFileUpload } from "@/components/conversion/SecureFileUpload";

const STEPS = ["Firm", "Attendance", "Declarations"];

type FormState = {
  firmName: string;
  instructerName: string;
  workEmail: string;
  directPhone: string;
  office: string;
  laaCode: string;
  purchaseOrder: string;
  clientName: string;
  clientDob: string;
  policeStation: string;
  custodySuite: string;
  custodyRecord: string;
  dsccReference: string;
  allegedOffence: string;
  arrestStatus: string;
  interviewDate: string;
  interviewTime: string;
  officerName: string;
  officerPhone: string;
  officerEmail: string;
  disclosureSummary: string;
  interpreter: string;
  appropriateAdult: string;
  conflictInfo: string;
  urgency: string;
  scope: string;
  writtenReport: string;
  billingContact: string;
  rateStatus: string;
  authority: boolean;
  conflicts: boolean;
  pendingAcceptance: boolean;
  funding: boolean;
  ratesReviewed: boolean;
  company: string;
};

const INITIAL: FormState = {
  firmName: "",
  instructerName: "",
  workEmail: "",
  directPhone: "",
  office: "",
  laaCode: "",
  purchaseOrder: "",
  clientName: "",
  clientDob: "",
  policeStation: "",
  custodySuite: "",
  custodyRecord: "",
  dsccReference: "",
  allegedOffence: "",
  arrestStatus: "custody",
  interviewDate: "",
  interviewTime: "",
  officerName: "",
  officerPhone: "",
  officerEmail: "",
  disclosureSummary: "",
  interpreter: "no",
  appropriateAdult: "no",
  conflictInfo: "",
  urgency: "standard",
  scope: "",
  writtenReport: "yes",
  billingContact: "",
  rateStatus: "confirm",
  authority: false,
  conflicts: false,
  pendingAcceptance: false,
  funding: false,
  ratesReviewed: false,
  company: "",
};

function fieldClass() {
  return "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500";
}

export function AgencyInstructionForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    FunnelEvents.agencyPageView();
  }, []);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      FunnelEvents.agencyFormStart();
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
    if (s === 1) {
      if (!form.firmName.trim()) e.push("Firm name is required.");
      if (!form.instructerName.trim()) e.push("Instructing solicitor or caseworker is required.");
      if (!form.workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
        e.push("A valid work email is required.");
      }
      if (!form.directPhone.trim()) e.push("Direct telephone is required.");
    }
    if (s === 2) {
      if (!form.clientName.trim()) e.push("Client name is required.");
      if (!form.policeStation.trim()) e.push("Police station is required.");
      if (!form.allegedOffence.trim()) e.push("Alleged offence or matter summary is required.");
    }
    if (s === 3) {
      if (
        !form.authority ||
        !form.conflicts ||
        !form.pendingAcceptance ||
        !form.funding ||
        !form.ratesReviewed
      ) {
        e.push("Please confirm all professional declarations.");
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
    setStep((s) => Math.min(3, s + 1));
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validateStep(3);
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
      }
      files.forEach((f) => body.append("files", f));

      const res = await fetch("/api/enquiry/agency", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors([data.error || "Submission failed. Please try again."]);
        return;
      }
      FunnelEvents.agencyFormSubmit();
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
        className="relative rounded-xl border border-green-300 bg-green-50 p-6 space-y-3"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-xl font-black text-slate-900">Instructions received for review</h2>
        <p className="text-sm text-slate-800">
          Attendance is not accepted until expressly confirmed.
        </p>
        <p className="text-sm font-semibold text-slate-900">Reference: {reference}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-amber-200 bg-white p-5 md:p-6 space-y-5"
      noValidate
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900">Send agency instructions</h2>
          <p className="text-sm text-slate-600 mt-1">
            Professional instructions only. Attendance is subject to conflicts, availability and
            express confirmation.
          </p>
        </div>
        <Link
          href="/contact"
          onClick={() => FunnelEvents.agencyPhoneClick()}
          data-event="agency_contact_click"
          className="inline-flex items-center justify-center min-h-[44px] rounded-md border-2 border-slate-800 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-amber-50 shrink-0"
          aria-label="Agency cover via Contact pathways"
        >
          Contact pathways
        </Link>
      </div>
      <p className="text-xs text-slate-600">
        Solicitor and law-firm instructions — use this form or Contact pathways. Telephone and SMS
        are not published as digits here. Not a public legal advice line.
      </p>

      <FormProgress step={step} total={3} labels={STEPS} />

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
        <label htmlFor="agency-company">Company</label>
        <input
          id="agency-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      {step === 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Firm name
            <input className={fieldClass()} value={form.firmName} onChange={(e) => update("firmName", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Instructing solicitor / caseworker
            <input className={fieldClass()} value={form.instructerName} onChange={(e) => update("instructerName", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Office
            <input className={fieldClass()} value={form.office} onChange={(e) => update("office", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Work email
            <input type="email" className={fieldClass()} value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Direct telephone
            <input type="tel" className={fieldClass()} value={form.directPhone} onChange={(e) => update("directPhone", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            LAA account / office code (if needed)
            <input className={fieldClass()} value={form.laaCode} onChange={(e) => update("laaCode", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Purchase order / internal reference
            <input className={fieldClass()} value={form.purchaseOrder} onChange={(e) => update("purchaseOrder", e.target.value)} />
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-800">
            Client name
            <input className={fieldClass()} value={form.clientName} onChange={(e) => update("clientName", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Date of birth
            <input type="date" className={fieldClass()} value={form.clientDob} onChange={(e) => update("clientDob", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Police station
            <input className={fieldClass()} value={form.policeStation} onChange={(e) => update("policeStation", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Custody suite
            <input className={fieldClass()} value={form.custodySuite} onChange={(e) => update("custodySuite", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Custody record number
            <input className={fieldClass()} value={form.custodyRecord} onChange={(e) => update("custodyRecord", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            DSCC reference
            <input className={fieldClass()} value={form.dsccReference} onChange={(e) => update("dsccReference", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Alleged offence
            <textarea className={fieldClass()} rows={2} value={form.allegedOffence} onChange={(e) => update("allegedOffence", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Arrest / interview status
            <select className={fieldClass()} value={form.arrestStatus} onChange={(e) => update("arrestStatus", e.target.value)}>
              <option value="custody">In custody</option>
              <option value="voluntary">Voluntary interview</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Urgency
            <select className={fieldClass()} value={form.urgency} onChange={(e) => update("urgency", e.target.value)}>
              <option value="urgent">Urgent</option>
              <option value="standard">Standard</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Interview / attendance date
            <input type="date" className={fieldClass()} value={form.interviewDate} onChange={(e) => update("interviewDate", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Interview / attendance time
            <input type="time" className={fieldClass()} value={form.interviewTime} onChange={(e) => update("interviewTime", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Officer in the case
            <input className={fieldClass()} value={form.officerName} onChange={(e) => update("officerName", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Officer telephone
            <input className={fieldClass()} value={form.officerPhone} onChange={(e) => update("officerPhone", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Officer email
            <input type="email" className={fieldClass()} value={form.officerEmail} onChange={(e) => update("officerEmail", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Disclosure summary
            <textarea className={fieldClass()} rows={3} value={form.disclosureSummary} onChange={(e) => update("disclosureSummary", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Interpreter required?
            <select className={fieldClass()} value={form.interpreter} onChange={(e) => update("interpreter", e.target.value)}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Appropriate adult required?
            <select className={fieldClass()} value={form.appropriateAdult} onChange={(e) => update("appropriateAdult", e.target.value)}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Conflict information
            <textarea className={fieldClass()} rows={2} value={form.conflictInfo} onChange={(e) => update("conflictInfo", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Requested scope of attendance
            <textarea className={fieldClass()} rows={2} value={form.scope} onChange={(e) => update("scope", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Full written report required?
            <select className={fieldClass()} value={form.writtenReport} onChange={(e) => update("writtenReport", e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-800">
            Billing contact
            <input className={fieldClass()} value={form.billingContact} onChange={(e) => update("billingContact", e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-800 sm:col-span-2">
            Rate confirmation status
            <select className={fieldClass()} value={form.rateStatus} onChange={(e) => update("rateStatus", e.target.value)}>
              <option value="confirm">Requires confirmation</option>
              <option value="agreed">Agreed / reviewed</option>
            </select>
          </label>
          <div className="sm:col-span-2">
            <SecureFileUpload
              files={files}
              onChange={setFiles}
              label="Uploads (disclosure, instruction sheet, correspondence)"
            />
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <fieldset className="space-y-3">
          <legend className="text-sm font-bold text-slate-900">Professional declarations</legend>
          {(
            [
              ["authority", "The firm has authority to provide this information."],
              [
                "conflicts",
                "The instruction is subject to conflict and availability checks.",
              ],
              [
                "pendingAcceptance",
                "No attendance is accepted until expressly confirmed.",
              ],
              [
                "funding",
                "The firm remains responsible for funding authority and compliance unless agreed otherwise.",
              ],
              [
                "ratesReviewed",
                "Rates and terms have been reviewed or require confirmation (see /servicerates).",
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
            <Link href="/servicerates" className="underline font-semibold">
              Service rates
            </Link>
            {" · "}
            <Link href="/attendanceterms" className="underline font-semibold">
              Agency terms
            </Link>
            {" · "}
            <Link href="/privacy" className="underline font-semibold">
              Privacy notice
            </Link>
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
            className="min-h-[44px] rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold"
          >
            Back
          </button>
        ) : null}
        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="min-h-[44px] rounded-md bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="min-h-[44px] rounded-md bg-amber-500 px-5 py-2 text-sm font-bold text-slate-900 hover:bg-amber-400 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send instructions"}
          </button>
        )}
      </div>
    </form>
  );
}
