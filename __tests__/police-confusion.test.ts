import { describe, it, expect } from "vitest";
import {
  detectPoliceConfusion,
  isPoliceForceEmail,
  policeConfusionPublicMessage,
} from "../lib/enquiry/police-confusion";
import {
  sanitizeEnquiryAttribution,
  formatAttributionForEmail,
} from "../lib/enquiry/attribution";

describe("police confusion detection", () => {
  it("flags police.uk emails", () => {
    expect(isPoliceForceEmail("hannah.youngs@btp.police.uk")).toBe(true);
    expect(isPoliceForceEmail("oic@kent.police.uk")).toBe(true);
    expect(isPoliceForceEmail("client@example.com")).toBe(false);
  });

  it("would have blocked the Hannah Youngs-style enquiry", () => {
    const reason = detectPoliceConfusion({
      email: "hannah.youngs@btp.police.uk",
      name: "PC HANNAH YOUNGS",
      message:
        "Good Morning, My name is PC 8515 YOUNGS from BTP COLCHESTER. One of my suspects were picked up and bought into your custody. The incident cannot be closed until FP / DNA has been obtained. Is there a contact number for custody or an email address?",
    });
    expect(reason).toBe("police_email");
  });

  it("flags custody contact / FP DNA chase language without police email", () => {
    const reason = detectPoliceConfusion({
      email: "colleague@example.com",
      message: "Please can I have a contact number for custody to arrange FP DNA samples?",
    });
    expect(reason).toBe("custody_contact_request");
  });

  it("flags OIC / officer self-identification", () => {
    const reason = detectPoliceConfusion({
      email: "a@example.com",
      message: "I am an OIC needing to speak to the custody sergeant about my suspect.",
    });
    expect(reason).toBe("officer_language");
  });

  it("allows ordinary defence enquiries", () => {
    const reason = detectPoliceConfusion({
      email: "parent@example.com",
      message: "My son has a booked voluntary interview next week and I would like to instruct you.",
    });
    expect(reason).toBeNull();
  });

  it("returns a public message that points to 101", () => {
    expect(policeConfusionPublicMessage("police_email")).toMatch(/101/);
    expect(policeConfusionPublicMessage("police_email")).toMatch(/not the police/i);
  });
});

describe("enquiry attribution sanitisation", () => {
  it("keeps safe fields and drops junk", () => {
    const cleaned = sanitizeEnquiryAttribution({
      submittedAt: "2026-08-11T07:37:59.643Z",
      currentPage: "/contact",
      landingPage: "/dna-fingerprints-police-station",
      documentReferrer: "https://www.google.com/",
      utm_source: "google",
      gclid: "abc123",
      sessionId: "s_test",
      deviceCategory: "desktop",
      email: "should-not-pass@example.com",
      name: "Nope",
    });
    expect(cleaned).toMatchObject({
      currentPage: "/contact",
      landingPage: "/dna-fingerprints-police-station",
      documentReferrer: "https://www.google.com/",
      utm_source: "google",
      gclid: "abc123",
      sessionId: "s_test",
      deviceCategory: "desktop",
    });
    expect(cleaned).not.toHaveProperty("email");
    expect(cleaned).not.toHaveProperty("name");
  });

  it("formats attribution for owner email", () => {
    const text = formatAttributionForEmail({
      currentPage: "/contact",
      landingPage: "/dna-fingerprints-police-station",
      source: "google",
      medium: "organic",
    });
    expect(text).toMatch(/Attribution/);
    expect(text).toMatch(/landingPage: \/dna-fingerprints-police-station/);
  });
});
