import { test, expect } from "@playwright/test";

/**
 * CONTACT FORM E2E TEST
 *
 * Fills the contact form on /contact and submits; verifies success message is shown.
 */

const CONTACT_URL = "/contact";
const SUCCESS_MESSAGE = "Your request has been submitted successfully";

test.describe("Contact form", () => {
  test("Submit form shows success message", async ({ page }) => {
    await page.goto(CONTACT_URL);
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/your name/i).fill("E2E Test User");
    await page.getByLabel(/contact number/i).fill("01732 247427");
    await page.locator("#role").selectOption("family");
    await page.getByLabel(/which police station/i).fill("Medway");
    await page.locator("#interviewDate").fill("2026-02-01");
    await page.locator("#interviewTime").fill("10:00");
    await page.locator("#attendanceType").selectOption("scheduled-voluntary");
    await page.getByLabel(/brief details/i).fill("E2E test – please disregard.");
    await page.getByLabel(/non-urgent/).check();
    await page.getByLabel(/consent to the storage/).check();

    await page.getByRole("button", { name: /submit request/i }).click();

    await expect(page.getByText(SUCCESS_MESSAGE)).toBeVisible({ timeout: 10000 });
  });
});
