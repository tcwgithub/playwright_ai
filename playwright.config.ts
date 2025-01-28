import { defineConfig, devices } from '@playwright/test';
import ENV from './common/env';

export default defineConfig({
  testDir: './Tests',
  timeout: 90 * 1000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "on-failure" }],
    ["allure-playwright", { outputFolder: "allure-report" }],
  ],
  
  use: {
    baseURL: ENV.BASE_URL,
    headless: false,
    actionTimeout: 90 * 1000,
    navigationTimeout: 90 * 1000,
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    screenshot: `only-on-failure`,
    video: `retain-on-failure`,
    trace: `retain-on-failure`,
  },

  

  projects: [
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    */
  ],
});
