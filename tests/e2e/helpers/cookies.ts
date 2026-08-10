import type { Page } from '@playwright/test';

/**
 * Cookie banner tests that aren't about consent UX should call this before
 * navigation. On tablet viewports the fixed banner's Accept button is often
 * not reliably clickable in CI (covered by support widget / safe-area layout).
 */
export async function suppressCookieBanner(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('cookies-accepted', 'true');
  });
}
