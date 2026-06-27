import { defineConfig, devices } from "@playwright/test";

// Local-only config: uses the bundled full Chromium build (channel: 'chromium')
// so tests can run without downloading chrome-headless-shell.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  timeout: 60000,
  use: {
    baseURL: process.env.PW_BASE_URL || "http://localhost:3000",
    channel: "chrome",
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
