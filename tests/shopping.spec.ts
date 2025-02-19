import { test, expect } from "@playwright/test";
import { Pages } from '../common/pages';
import * as shoppingData from '../testData/shoppingData.json';
import ENV from "../common/env";

test.beforeEach(async ({ page }) => {
  const pages = Pages(page);
  await pages.loginPage.login(ENV.LOGINUSER, ENV.PASSWORD);
  await page.waitForTimeout(3000);
});

test("@P2 @Smoke verify that the customer is able to place an order with complete information", async ({ page }) => {
  const pages = Pages(page);

  await pages.inventoryPage.addItemsToCart();
  await page.waitForTimeout(3000);

  await expect(pages.cartPage.cartPageObjects.itemName).toHaveText(shoppingData.itemName);
  await pages.cartPage.checkoutInformation(shoppingData.firstName, shoppingData.lastName, shoppingData.postalCode);
  await expect(page).toHaveURL("/checkout-step-two.html");

  await pages.cartPage.finalCheckoutStep(shoppingData.itemName);
  await expect(page).toHaveURL("/checkout-complete.html");
  await expect(pages.cartPage.cartPageObjects.successMessage).toHaveText(shoppingData.successMessage);

  await expect(pages.cartPage.cartPageObjects.backHomeButton).toBeVisible();
  await pages.cartPage.cartPageObjects.backHomeButton.click();
  await expect(page).toHaveURL("/inventory.html");
});
