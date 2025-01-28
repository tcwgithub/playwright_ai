import { CartPageObjects } from "../pageObjects/cartPageObjects";
import { expect } from "@playwright/test";

export class CartPage {
  constructor(public cartPageObjects: CartPageObjects) {}

  async checkoutInformation(firstName: string, lastName: string, postalCode: string) {
    const { checkoutButton, firstName: firstNameField, lastName: lastNameField, postalCode: postalCodeField, continueButton } = this.cartPageObjects;

    await checkoutButton.click();
    await this.cartPageObjects.page.waitForURL("/checkout-step-one.html");
    await firstNameField.fill(firstName);
    await lastNameField.fill(lastName);
    await postalCodeField.fill(postalCode);
    await continueButton.click();
  }

  async finalCheckoutStep(itemName: string) {
    const { itemName: itemNameField, finishButton } = this.cartPageObjects;

    await expect(itemNameField).toHaveText(itemName);
    await finishButton.click();
  }
}
