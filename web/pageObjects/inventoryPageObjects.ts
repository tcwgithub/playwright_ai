import { Page } from "@playwright/test";

export class InventoryPageObjects {
  page: Page;

  burgerMenu;
  allItemsOption;
  aboutOption;
  logoutOption;
  resetAppStateOption;
  burgerMenuClose;
  addCartBackpackButton;
  cartButton;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenu = this.page.locator('//button[@id="react-burger-menu-btn"]');
    this.allItemsOption = this.page.locator('//a[text()="All Items"]');
    this.aboutOption = this.page.locator('//a[text()="About"]');
    this.logoutOption = this.page.locator('//a[text()="Logout"]');
    this.resetAppStateOption = this.page.locator('//a[text()="Reset App State"]');
    this.burgerMenuClose = this.page.locator('//button[@id="react-burger-cross-btn"]');
    this.addCartBackpackButton = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
    this.cartButton = this.page.locator('//div[@id="shopping_cart_container"]');
  }
}
