import { Page } from "@playwright/test";
export { expect, Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  // async waitForNavitaion(url: string) {
  //   await this.page.waitForNavigation(url);
  // }

  async clickElement(selector: string) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }
}