import { Page } from "@playwright/test";

export class LoginPageObjects {
  constructor(public page: Page) {}

  userName = this.page.locator('//input[@id="user-name"]');
  password = this.page.locator('//input[@id="password"]');
  loginButton = this.page.locator('//input[@id="login-button"]');
  errorMessage = this.page.locator('//h3[@data-test="error"]');
}
