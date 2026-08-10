import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// So tests can see NEXT_PUBLIC_* when deciding skip logic (matches Next.js `.env.local`).
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * E2E tests for the marketing homepage. Run `npm run dev` in another terminal, or let Playwright start it.
 * Lighthouse (target >90): run separately, e.g. `npx lighthouse http://localhost:3000 --only-categories=performance,accessibility --chrome-flags="--headless"`
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'chromium-mobile', use: { ...devices['Pixel 5'] } },
    {
      name: 'chromium-tablet',
      use: {
        ...devices['iPad Pro 11'],
        // The iPad device descriptor defaults to WebKit; force Chromium
        // so we don't have to also install Playwright's WebKit binary
        // just to test a tablet viewport.
        defaultBrowserType: 'chromium',
        browserName: 'chromium',
      },
    },
  ],
  // When PLAYWRIGHT_BASE_URL points at production we don't want to spin up a
  // local dev server. Otherwise (default localhost) we still do.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: process.env.CI ? 'npm run start' : 'npm run dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
