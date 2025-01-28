import { test, expect } from '@playwright/test';
import { Pages } from '../common/pages';
import ENV from '../common/env';
import { LoginPageAPI } from '../api/apiLoginPage';
import { PerfLoginPage } from '../performance/perfLoginPage';

test("@WEB @Smoke Verify Authentication & API response", async ({ page, request }) => {
  const pages = Pages(page);

  // Verify login 
  await pages.loginPage.login(ENV.LOGINUSER, ENV.PASSWORD);
  await expect(page).toHaveURL("/inventory.html");

  // Get the current URL of the page
  const currentUrl = page.url();

  // Verify API response 
  const status = await new LoginPageAPI(request).getLoginStatus();
  console.log(`Response Code : ${status}`);
  console.log(`Current URL : ${currentUrl}`);
  expect(status).toBe(200);

  // Execute performance test using PerfLoginPage
  const perfLogin = new PerfLoginPage(page);
  const pageLoadTime = await perfLogin.measurePerformance();
  expect(pageLoadTime).toBeLessThan(5000); // Assert the performance metric
});
