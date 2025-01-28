import ENV from "../../common/env";
import { LoginPageObjects } from  "../pageObjects/loginPageObjects";
import { expect } from "@playwright/test";

export class LoginPage {
  constructor(private loginPageObjects: LoginPageObjects) {}

  async login(userName: string, password: string) {
    const { userName: userNameField, password: passwordField, loginButton } = this.loginPageObjects;
    await this.loginPageObjects.page.goto(ENV.BASE_URL);
    await userNameField.fill(userName);
    await passwordField.fill(password);
    await loginButton.click();
  }
}
