import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/** Assert a control is visible, enabled, and scrolled into the viewport before click. */
export async function expectActionable(locator: Locator) {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();
  await locator.scrollIntoViewIfNeeded();
}
