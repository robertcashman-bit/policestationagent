import { test, expect } from "@playwright/test";

/**
 * CONTACT API TEST
 *
 * Verifies POST /api/contact accepts attendance and admin payloads.
 * Does not require RESEND env vars; email is skipped when not configured.
 */

const API_URL = "/api/contact";

const validAttendancePayload = {
  name: "E2E Test User",
  contactNumber: "01732 247427",
  email: "",
  role: "family",
  enquiryKind: "attendance",
  clientName: "",
  clientDOB: "",
  policeStation: "Medway",
  interviewDate: "2026-02-01",
  interviewTime: "10:00",
  attendanceType: "scheduled-voluntary",
  briefDetails: "E2E test submission – please disregard.",
  supportNeeds: "",
  nonUrgentConfirmation: true,
  consent: true,
};

const validAdminPayload = {
  name: "E2E Admin User",
  contactNumber: "",
  email: "admin-e2e@example.com",
  role: "prospective_client",
  enquiryKind: "admin",
  clientName: "",
  clientDOB: "",
  policeStation: "",
  interviewDate: "",
  interviewTime: "",
  attendanceType: "admin-enquiry",
  briefDetails: "E2E admin written enquiry – please disregard.",
  supportNeeds: "",
  nonUrgentConfirmation: true,
  consent: true,
};

test.describe("Contact API", () => {
  test("POST with valid attendance payload returns 200 and success", async ({ request }) => {
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: validAttendancePayload,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("success", true);
  });

  test("POST with valid admin payload returns 200 and success", async ({ request }) => {
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: validAdminPayload,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("success", true);
  });

  test("POST admin without email returns 400", async ({ request }) => {
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: { ...validAdminPayload, email: "" },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(String(body.error).toLowerCase()).toContain("email");
  });

  test("POST attendance without police station returns 400", async ({ request }) => {
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: { ...validAttendancePayload, policeStation: "" },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(String(body.error).toLowerCase()).toContain("police station");
  });

  test("POST with missing consent returns 400", async ({ request }) => {
    const invalidPayload = { ...validAttendancePayload, consent: false };
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: invalidPayload,
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(String(body.error).toLowerCase()).toContain("consent");
  });

  test("POST with missing briefDetails returns 400", async ({ request }) => {
    const invalidPayload = { ...validAttendancePayload, briefDetails: "" };
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: invalidPayload,
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });
});
