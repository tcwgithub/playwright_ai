import { Page } from "@playwright/test";

export class CartPageObjects {
  page: Page;

  checkoutButton;
  firstName;
  lastName;
  postalCode;
  continueButton;
  finishButton;
  itemName;
  successMessage;
  backHomeButton;
  postalErrorMessage;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.locator('//button[@id="checkout"]');
    this.firstName = this.page.locator('//input[@id="first-name"]');
    this.lastName = this.page.locator('//input[@id="last-name"]');
    this.postalCode = this.page.locator('//input[@id="postal-code"]');
    this.continueButton = this.page.locator('//input[@id="continue"]');
    this.finishButton = this.page.locator('//button[@id="finish"]');
    this.itemName = this.page.locator('//div[@class="inventory_item_name"]');
    this.successMessage = this.page.locator('//h2[@class="complete-header"]');
    this.backHomeButton = this.page.locator('//button[@id="back-to-products"]');
    this.postalErrorMessage = this.page.locator('//h3[@data-test="error"]');
  }
}
