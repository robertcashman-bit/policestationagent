import { test, expect } from "@playwright/test";

/**
 * CONTACT API TEST
 *
 * Verifies POST /api/contact accepts the form payload and returns 200 with success.
 * Does not require RESEND env vars; email is skipped when not configured.
 */

const API_URL = "/api/contact";

const validPayload = {
  name: "E2E Test User",
  contactNumber: "01732 247427",
  email: "",
  role: "family",
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

test.describe("Contact API", () => {
  test("POST with valid payload returns 200 and success", async ({ request }) => {
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: validPayload,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("success", true);
  });

  test("POST with missing consent returns 400", async ({ request }) => {
    const invalidPayload = { ...validPayload, consent: false };
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
    const invalidPayload = { ...validPayload, briefDetails: "" };
    const response = await request.post(API_URL, {
      headers: { "Content-Type": "application/json" },
      data: invalidPayload,
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });
});
