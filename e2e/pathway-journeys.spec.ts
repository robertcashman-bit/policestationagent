import { test, expect, type Page } from "@playwright/test";

/**
 * Pathway user journeys — act as a visitor through voluntary / custody / agency / contact.
 * Form POSTs are mocked so production runs never send real email.
 */

const FIRM_TEL_HREF = "tel:01732247427";
const FIRM_DIGITS = /01732\s*247427/;

async function mockJsonPost(page: Page, pathSuffix: string, body: Record<string, unknown>) {
  await page.route(`**${pathSuffix}`, async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });
}

function firmTelLinks(page: Page) {
  return page.locator(`a[href="${FIRM_TEL_HREF}"]`);
}

test.describe("Pathway journeys", () => {
  test("1. Home pathways visible without firm telephone", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Choose your pathway" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Voluntary interview booked/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Someone is in custody now/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Solicitor needing agent cover/i })).toBeVisible();

    await expect(firmTelLinks(page)).toHaveCount(0);
    const sticky = page.getByLabel("Enquiry pathways");
    if (await sticky.count()) {
      await expect(sticky.locator(`a[href^="tel:01732"]`)).toHaveCount(0);
    }
  });

  test("2. Custody happy path reveals firm phone", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Someone is in custody now/i }).click();
    await expect(page).toHaveURL(/\/current-custody/);

    await expect(firmTelLinks(page)).toHaveCount(0);

    await page.getByRole("group", { name: /Question 1/i }).getByRole("button", { name: "Yes", exact: true }).click();
    await page.getByRole("button", { name: "Parent", exact: true }).click();
    await page
      .getByRole("group", { name: /Question 3/i })
      .getByRole("button", { name: "No", exact: true })
      .click();

    await expect(
      page.getByRole("heading", { name: /You can call for current custody representation/i }),
    ).toBeVisible();
    const call = page.locator('a[href="tel:01732247427"][data-event="custody_phone_click"]');
    await expect(call).toBeVisible();
    await expect(call).toContainText(FIRM_DIGITS);
  });

  test("3. Custody friend gate — no firm phone", async ({ page }) => {
    await page.goto("/current-custody");
    await page.getByRole("group", { name: /Question 1/i }).getByRole("button", { name: "Yes", exact: true }).click();
    await page.getByRole("button", { name: "Friend", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: /Friends and unrelated third parties cannot usually instruct/i }),
    ).toBeVisible();
    await expect(firmTelLinks(page)).toHaveCount(0);
  });

  test("4. Custody released gate — no firm phone", async ({ page }) => {
    await page.goto("/current-custody");
    await page
      .getByRole("group", { name: /Question 1/i })
      .getByRole("button", { name: "No", exact: true })
      .click();

    await expect(
      page.getByRole("heading", { name: /only for someone presently detained/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Voluntary interview/i }).first()).toBeVisible();
    await expect(firmTelLinks(page)).toHaveCount(0);
  });

  test("5. Voluntary happy path — mocked submit", async ({ page }) => {
    await mockJsonPost(page, "/api/enquiry/voluntary", {
      success: true,
      reference: "VAI-E2E-TEST",
    });

    await page.goto("/");
    await page.getByRole("link", { name: /Voluntary interview booked/i }).click();
    await expect(page).toHaveURL(/voluntary-interview/);

    const form = page.locator("#request");
    await expect(form).toBeVisible();

    await form.getByRole("radio", { name: "Yes, an interview date is booked" }).check();
    await form.getByRole("button", { name: "Continue" }).click();

    await form.getByLabel(/Police station or proposed interview location/i).fill("Maidstone");
    await form.getByRole("radio", { name: "Yes" }).check();
    await form.getByRole("button", { name: "Continue" }).click();

    await form.getByLabel(/Alleged offence or brief description/i).fill("Theft — E2E pathway test");
    await form.getByRole("button", { name: "Continue" }).click();

    await form.getByLabel(/Full name/i).fill("E2E Pathway User");
    await form.getByLabel(/Date of birth/i).fill("1990-01-15");
    await form.getByLabel(/^Telephone/i).fill("07700900123");
    await form.getByRole("button", { name: "Continue" }).click();

    for (const label of [
      /information I have supplied is accurate/i,
      /forthcoming police interview under caution/i,
      /does not itself create a solicitor-client retainer/i,
      /urgent current-custody matters must use the custody pathway/i,
      /this website is not the police/i,
      /consent to my information being processed/i,
    ]) {
      await form.getByText(label).click();
    }

    await form.getByRole("button", { name: /Submit enquiry/i }).click();

    await expect(page.getByRole("heading", { name: /Request received/i })).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByText(/VAI-E2E-TEST/)).toBeVisible();
  });

  test('6. Voluntary "No" gate blocks progression', async ({ page }) => {
    await page.goto("/start/voluntary-interview#request");
    const form = page.locator("#request");
    await expect(form).toBeVisible();

    // Selecting No immediately replaces the form with the out-of-scope panel.
    await form.locator("label").filter({ hasText: /^No$/ }).click();

    await expect(
      page.getByRole("heading", { name: /This is not a general legal advice line/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Change answer/i })).toBeVisible();
    await expect(page.getByLabel(/Police station or proposed interview location/i)).toHaveCount(0);
  });

  test("7. Agency happy path — phone visible + mocked submit", async ({ page }) => {
    await mockJsonPost(page, "/api/enquiry/agency", {
      success: true,
      reference: "AGY-E2E-TEST",
    });

    await page.goto("/");
    await page.getByRole("link", { name: /Solicitor needing agent cover/i }).click();
    await expect(page).toHaveURL(/\/for-solicitors/);

    await expect(page.locator('a[href="tel:01732247427"]').first()).toBeVisible();
    await expect(page.getByText(FIRM_DIGITS).first()).toBeVisible();

    const form = page.locator("#agency-instructions form");
    await expect(form).toBeVisible();

    await form.getByLabel(/Firm name/i).fill("E2E Test LLP");
    await form.getByLabel(/Instructing solicitor/i).fill("Jane Solicitor");
    await form.getByLabel(/Work email/i).fill("jane.e2e@example-llp.co.uk");
    await form.getByLabel(/Direct telephone/i).fill("02071234567");
    await form.getByRole("button", { name: "Continue" }).click();

    await form.getByLabel(/Client name/i).fill("Test Client");
    await form.getByLabel(/Police station/i).fill("Maidstone");
    await form.getByLabel(/Alleged offence/i).fill("Assault — E2E agency test");
    await form.getByRole("button", { name: "Continue" }).click();

    for (const label of [
      /firm has authority to provide this information/i,
      /subject to conflict and availability checks/i,
      /No attendance is accepted until expressly confirmed/i,
      /responsible for funding authority/i,
      /Rates and terms have been reviewed/i,
    ]) {
      await form.getByText(label).click();
    }

    await form.getByRole("button", { name: /Send instructions/i }).click();

    await expect(
      page.getByRole("heading", { name: /Instructions received for review/i }),
    ).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/AGY-E2E-TEST/)).toBeVisible();
  });

  test("8. Contact admin written enquiry — mocked submit, no firm digits", async ({ page }) => {
    await mockJsonPost(page, "/api/contact", { success: true, emailNotified: false });

    await page.goto("/contact#admin-enquiry");
    const section = page.locator("#admin-enquiry");
    await expect(section).toBeVisible();

    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toMatch(FIRM_DIGITS);

    const form = section.locator("form");
    await form.getByLabel(/Your Name/i).fill("E2E Admin User");
    await form.getByLabel(/Email Address/i).fill("e2e-admin@example.com");
    await form.getByLabel(/Your message/i).fill("E2E admin written enquiry — please disregard.");
    await form.getByText(/I confirm this is a non-urgent written enquiry/i).click();
    await form.getByText(/I consent to the storage and secure email/i).click();
    await form.getByRole("button", { name: /Send written enquiry/i }).click();

    await expect(page.getByText(/Your written enquiry has been submitted/i)).toBeVisible({
      timeout: 15000,
    });
  });

  test("9. Contact pathway cards land on correct routes", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /Choose the reason for contacting us/i })).toBeVisible();

    await page.getByRole("link", { name: /Voluntary interview booked/i }).click();
    await expect(page).toHaveURL(/\/start\/voluntary-interview/);

    await page.goto("/contact");
    await page.getByRole("link", { name: /Someone is in custody now/i }).click();
    await expect(page).toHaveURL(/\/current-custody/);

    await page.goto("/contact");
    await page.getByRole("link", { name: /Solicitor needing agent cover/i }).click();
    await expect(page).toHaveURL(/\/for-solicitors/);
  });
});
