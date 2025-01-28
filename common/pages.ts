import { Page } from "@playwright/test";
import { LoginPage } from "../web/pages/loginPage";
import { InventoryPage } from "../web/pages/inventoryPage";
import { CartPage } from "../web/pages/cartPage";
import { InventoryPageObjects } from "../web/pageObjects/inventoryPageObjects";
import { LoginPageObjects } from "../web/pageObjects/loginPageObjects";
import { CartPageObjects } from "../web/pageObjects/cartPageObjects";

export const Pages = (page: Page) => {
  const loginPageObjects = new LoginPageObjects(page);
  const cartPageObjects = new CartPageObjects(page);
  const inventoryPageObjects = new InventoryPageObjects(page);

  return {
    loginPage: new LoginPage(loginPageObjects),
    inventoryPage: new InventoryPage (inventoryPageObjects,page),
    cartPage: new CartPage(cartPageObjects),
  };
};
