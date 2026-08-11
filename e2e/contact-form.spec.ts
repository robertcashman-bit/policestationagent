import { test, expect } from "@playwright/test";

/**
 * CONTACT FORM E2E TEST
 *
 * Fills the admin written-enquiry form on /contact and verifies success.
 */

const CONTACT_URL = "/contact";
const SUCCESS_MESSAGE = "Your written enquiry has been submitted";

test.describe("Contact form", () => {
  test("Submit admin written enquiry shows success message", async ({ page }) => {
    await page.goto(CONTACT_URL);
    await page.waitForLoadState("networkidle");

    const section = page.locator("#admin-enquiry");
    await section.getByRole("button", { name: /defence client or instructing solicitor/i }).click();

    const form = section.locator("form");
    await form.getByLabel(/your name/i).fill("E2E Test User");
    await form.getByLabel(/email address/i).fill("e2e-test@example.com");
    await form.locator("#role").selectOption("prospective_client");
    await form.getByLabel(/your message/i).fill("E2E test – please disregard.");
    await form.getByLabel(/non-urgent/).check();
    await form.getByLabel(/consent to the storage/).check();

    await form.getByRole("button", { name: /send written enquiry/i }).click();

    await expect(page.getByText(SUCCESS_MESSAGE)).toBeVisible({ timeout: 10000 });
  });

  test("Police / OIC gate blocks the admin form", async ({ page }) => {
    await page.goto(CONTACT_URL);
    await page.waitForLoadState("networkidle");

    const section = page.locator("#admin-enquiry");
    await section.getByRole("button", { name: /police \/ custody enquiry/i }).click();
    await expect(section.getByText(/Police \/ custody enquiries — wrong website/i)).toBeVisible();
    await expect(section.locator("form")).toHaveCount(0);
  });
});
