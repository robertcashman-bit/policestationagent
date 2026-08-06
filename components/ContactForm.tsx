"use client";

/**
 * CONTACT FORM COMPONENT
 *
 * Non-urgent police station attendance request form.
 * For scheduled voluntary interviews, pre-booked interviews, and solicitor instructions only.
 * Urgent custody matters must be dealt with by telephone.
 * GDPR compliant with consent checkbox.
 */

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import {
  SEO_NOT_POLICE,
  SERVICE_SCOPE_SHORT,
  CTA_OUT_OF_SCOPE,
  ADMIN_ENQUIRY_INTRO,
} from "@/config/contact";

interface FormData {
  name: string;
  contactNumber: string;
  email: string;
  role: "family" | "solicitor" | "representative";
  clientName: string;
  clientDOB: string;
  policeStation: string;
  interviewDate: string;
  interviewTime: string;
  attendanceType: "scheduled-voluntary" | "pre-booked" | "solicitor-instruction";
  briefDetails: string;
  supportNeeds: string;
  nonUrgentConfirmation: boolean;
  consent: boolean;
}

interface ContactFormProps {
  defaultRole?: FormData["role"];
  defaultAttendanceType?: FormData["attendanceType"];
  heading?: string;
  /** Admin = Contact-page non-urgent written enquiry framing (no phone CTA). */
  variant?: "attendance" | "admin";
}

export default function ContactForm({
  defaultRole = "family",
  defaultAttendanceType = "scheduled-voluntary",
  heading = "Request Police Station Solicitor Attendance",
  variant = "attendance",
}: ContactFormProps = {}) {
  const isAdmin = variant === "admin";
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contactNumber: "",
    email: "",
    role: defaultRole,
    clientName: "",
    clientDOB: "",
    policeStation: "",
    interviewDate: "",
    interviewTime: "",
    attendanceType: defaultAttendanceType,
    briefDetails: "",
    supportNeeds: "",
    nonUrgentConfirmation: false,
    consent: false,
  });

  // Honeypot: hidden field that real users never fill in; bots usually do.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (isAdmin) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required for written enquiries";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.role) newErrors.role = "Please select your role";
    if (!isAdmin && (formData.role === "solicitor" || formData.role === "representative") && !formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }
    if (!isAdmin && (formData.role === "solicitor" || formData.role === "representative") && !formData.clientDOB.trim()) {
      newErrors.clientDOB = "Client date of birth is required";
    }
    if (!isAdmin && !formData.policeStation.trim()) newErrors.policeStation = "Police station is required";
    if (!isAdmin && !formData.interviewDate.trim()) newErrors.interviewDate = "Interview date is required";
    if (!isAdmin && !formData.interviewTime.trim()) newErrors.interviewTime = "Interview time is required";
    if (!isAdmin && !formData.attendanceType) newErrors.attendanceType = "Please select the type of attendance request";
    if (!formData.briefDetails.trim()) {
      newErrors.briefDetails = isAdmin ? "Your message is required" : "Brief details are required";
    } else if (formData.briefDetails.length > (isAdmin ? 2000 : 300)) {
      newErrors.briefDetails = isAdmin
        ? "Message must not exceed 2000 characters"
        : "Brief details must not exceed 300 characters";
    }
    if (!formData.nonUrgentConfirmation) {
      newErrors.nonUrgentConfirmation = "You must confirm this is a non-urgent request";
    }
    if (!formData.consent) {
      newErrors.consent = "You must consent to data storage and email communication";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          enquiryKind: isAdmin ? "admin" : "attendance",
          company: honeypotRef.current?.value ?? "",
          policeStation: formData.policeStation.trim() || (isAdmin ? "N/A — admin enquiry" : ""),
          interviewDate: formData.interviewDate.trim() || (isAdmin ? "N/A" : ""),
          interviewTime: formData.interviewTime.trim() || (isAdmin ? "N/A" : ""),
          attendanceType: isAdmin ? "admin-enquiry" : formData.attendanceType,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          contactNumber: "",
          email: "",
          role: defaultRole,
          clientName: "",
          clientDOB: "",
          policeStation: "",
          interviewDate: "",
          interviewTime: "",
          attendanceType: defaultAttendanceType,
          briefDetails: "",
          supportNeeds: "",
          nonUrgentConfirmation: false,
          consent: false,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field — hidden from users, ignored by the server when filled. */}
      <input
        ref={honeypotRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-6 md:p-8">
        {/* Introductory Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {isAdmin
              ? "Non-urgent written enquiry only"
              : "Scheduled voluntary interviews & solicitor instructions only"}
          </h3>
          <p className="text-red-800 font-semibold text-sm mb-2">{SEO_NOT_POLICE}</p>
          <p className="text-slate-700 mb-2">{SERVICE_SCOPE_SHORT}</p>
          <p className="text-slate-700 mb-2 font-medium text-red-900">{CTA_OUT_OF_SCOPE}</p>
          {isAdmin ? (
            <p className="text-slate-700 mb-2">{ADMIN_ENQUIRY_INTRO}</p>
          ) : (
            <p className="text-slate-700 mb-2">
              This form is for <strong>scheduled</strong> voluntary (VAI) interviews or solicitor
              attendance instructions — not general legal advice.
            </p>
          )}
          <p className="text-slate-700 font-medium">
            Someone in custody now? Use the{" "}
            <Link href="/current-custody" className="text-blue-800 hover:underline font-semibold">
              current custody check
            </Link>
            . Booked interview?{" "}
            <Link
              href="/start/voluntary-interview#request"
              className="text-blue-800 hover:underline font-semibold"
            >
              Request representation
            </Link>
            . Do not use this form for urgent custody.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">{heading}</h2>

        {/* Requestor Information */}
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
            Your Contact Details
          </h3>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-slate-300"
              }`}
              required
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Your Contact Number (Mobile Preferred) <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactNumber ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="Your callback number"
              required
            />
            <p className="text-xs text-slate-500 mt-1">Primary contact method</p>
            {errors.contactNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address{" "}
              {isAdmin ? (
                <span className="text-red-600">*</span>
              ) : (
                <span className="text-slate-500 text-xs">(Optional)</span>
              )}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-slate-500 mt-1">For follow-up only</p>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
              Role of person making this request <span className="text-red-600">*</span>
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as "family" | "solicitor" | "representative" })
              }
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? "border-red-500" : "border-slate-300"
              }`}
              required
            >
              <option value="family">Family member or friend</option>
              <option value="solicitor">Solicitor or law firm</option>
              <option value="representative">Other authorised representative</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
          </div>
        </div>

        {/* Client Information (if solicitor or representative) */}
        {(formData.role === "solicitor" || formData.role === "representative") && (
          <div className="space-y-6 mb-8 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
              Client Information
            </h3>

            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-slate-700 mb-1">
                Client Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientName ? "border-red-500" : "border-slate-300"
                }`}
                required
              />
              {errors.clientName && (
                <p className="text-red-600 text-sm mt-1">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label htmlFor="clientDOB" className="block text-sm font-medium text-slate-700 mb-1">
                Client Date of Birth <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="clientDOB"
                value={formData.clientDOB}
                onChange={(e) => setFormData({ ...formData, clientDOB: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.clientDOB ? "border-red-500" : "border-slate-300"
                }`}
                required
              />
              {errors.clientDOB && <p className="text-red-600 text-sm mt-1">{errors.clientDOB}</p>}
            </div>
          </div>
        )}

        {/* Interview Details */}
        <div className="space-y-6 mb-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
            {isAdmin ? "Optional context (if relevant)" : "Interview Details"}
          </h3>

          <div>
            <label
              htmlFor="policeStation"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Which Police Station{" "}
              {isAdmin ? (
                <span className="text-slate-500 text-xs">(Optional)</span>
              ) : (
                <span className="text-red-600">*</span>
              )}
            </label>
            <input
              type="text"
              id="policeStation"
              value={formData.policeStation}
              onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.policeStation ? "border-red-500" : "border-slate-300"
              }`}
              placeholder="e.g., Medway, Maidstone, Canterbury"
              required={!isAdmin}
            />
            {errors.policeStation && (
              <p className="text-red-600 text-sm mt-1">{errors.policeStation}</p>
            )}
          </div>

          {!isAdmin ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="interviewDate"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Date of Interview/Appointment <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    id="interviewDate"
                    value={formData.interviewDate}
                    onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.interviewDate ? "border-red-500" : "border-slate-300"
                    }`}
                    required
                  />
                  {errors.interviewDate && (
                    <p className="text-red-600 text-sm mt-1">{errors.interviewDate}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="interviewTime"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Time of Interview/Appointment <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="time"
                    id="interviewTime"
                    value={formData.interviewTime}
                    onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.interviewTime ? "border-red-500" : "border-slate-300"
                    }`}
                    required
                  />
                  {errors.interviewTime && (
                    <p className="text-red-600 text-sm mt-1">{errors.interviewTime}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="attendanceType" className="block text-sm font-medium text-slate-700 mb-1">
                  Type of attendance request <span className="text-red-600">*</span>
                </label>
                <select
                  id="attendanceType"
                  value={formData.attendanceType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendanceType: e.target.value as
                        | "scheduled-voluntary"
                        | "pre-booked"
                        | "solicitor-instruction",
                    })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.attendanceType ? "border-red-500" : "border-slate-300"
                  }`}
                  required
                >
                  <option value="scheduled-voluntary">Scheduled voluntary interview</option>
                  <option value="pre-booked">Pre-booked police interview</option>
                  <option value="solicitor-instruction">
                    Solicitor or firm instruction for police station attendance
                  </option>
                </select>
                {errors.attendanceType && (
                  <p className="text-red-600 text-sm mt-1">{errors.attendanceType}</p>
                )}
              </div>
            </>
          ) : null}

          <div>
            <label htmlFor="briefDetails" className="block text-sm font-medium text-slate-700 mb-1">
              {isAdmin
                ? "Your message"
                : "Brief details (e.g. interview type or police request)"}{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="briefDetails"
              value={formData.briefDetails}
              onChange={(e) => setFormData({ ...formData, briefDetails: e.target.value })}
              rows={isAdmin ? 6 : 3}
              maxLength={isAdmin ? 2000 : 300}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.briefDetails ? "border-red-500" : "border-slate-300"
              }`}
              placeholder={
                isAdmin
                  ? "Describe your non-urgent enquiry (maximum 2000 characters)..."
                  : "Brief description (maximum 300 characters)..."
              }
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              {formData.briefDetails.length}/{isAdmin ? 2000 : 300} characters
            </p>
            {errors.briefDetails && (
              <p className="text-red-600 text-sm mt-1">{errors.briefDetails}</p>
            )}
          </div>
        </div>

        {/* Support Requirements */}
        <div className="space-y-6 mb-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
            Support Requirements
          </h3>

          <div>
            <label htmlFor="supportNeeds" className="block text-sm font-medium text-slate-700 mb-1">
              Any Vulnerability or Support Requirements
            </label>
            <textarea
              id="supportNeeds"
              value={formData.supportNeeds}
              onChange={(e) => setFormData({ ...formData, supportNeeds: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., interpreter needed, disability support, mental health considerations"
            />
            <p className="text-xs text-slate-500 mt-1">
              Optional: Please specify any support needs such as interpreter, disability
              accommodations, or mental health considerations.
            </p>
          </div>
        </div>

        {/* Confirmations */}
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={formData.nonUrgentConfirmation}
                onChange={(e) => setFormData({ ...formData, nonUrgentConfirmation: e.target.checked })}
                className="mt-1 mr-3"
                required
              />
              <span className="text-sm text-slate-700">
                {isAdmin
                  ? "I confirm this is a non-urgent written enquiry, not current custody, not a police matter, and not a request for free advice after release."
                  : "I confirm this request relates to a non-urgent police station attendance and not an urgent custody arrest."}{" "}
                <span className="text-red-600">*</span>
              </span>
            </label>
            {errors.nonUrgentConfirmation && (
              <p className="text-red-600 text-sm mt-1">{errors.nonUrgentConfirmation}</p>
            )}
          </div>

          <div>
            <p className="text-xs text-slate-600 mb-3">
              By contacting us you consent to your details being used to respond and, where
              appropriate, shared with Tuckers Solicitors LLP for that purpose.
            </p>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 mr-3"
                required
              />
              <span className="text-sm text-slate-700">
                I consent to the storage and secure email communication of the information provided
                above. <span className="text-red-600">*</span>
              </span>
            </label>
            {errors.consent && <p className="text-red-600 text-sm mt-1">{errors.consent}</p>}
          </div>
        </div>

        {/* Form Submission Disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500">
          <p className="text-sm text-slate-800 font-medium">
            Submitting this form does not create a retainer. If someone is currently in Kent police
            custody, use the{" "}
            <a href="/current-custody" className="text-amber-900 hover:underline font-semibold">
              current-custody qualification
            </a>{" "}
            rather than this administrative form. Forthcoming interviews should use{" "}
            <a
              href="/start/voluntary-interview#request"
              className="text-amber-900 hover:underline font-semibold"
            >
              request representation
            </a>
            .
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : isAdmin ? "Send written enquiry" : "Submit Request"}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Thank you! Your request has been submitted successfully. We will contact you shortly.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">
              There was an error submitting your request. Please try again, or use the{" "}
              <a href="/contact" className="underline font-semibold">
                contact pathways
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
