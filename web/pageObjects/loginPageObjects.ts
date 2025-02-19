import { Page } from "@playwright/test";

export class LoginPageObjects {
  page: Page;

  userName;
  password;
  loginButton;
  errorMessage;

  constructor(page: Page) {
    this.page = page; 
    this.userName = this.page.locator('//input[@id="user-name"]');
    this.password = this.page.locator('//input[@id="password"]');
    this.loginButton = this.page.locator('//input[@id="login-button"]');
    this.errorMessage = this.page.locator('//h3[@data-test="error"]');
  }
}
