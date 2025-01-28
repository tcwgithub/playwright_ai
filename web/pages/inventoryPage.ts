import { InventoryPageObjects } from "../pageObjects/inventoryPageObjects";
import { expect, Page } from "@playwright/test";

export class InventoryPage {
  constructor(public inventoryPageObjects: InventoryPageObjects, public page: Page) {}

  async addItemsToCart() {
    await this.inventoryPageObjects.addCartBackpackButton.click();
    await this.inventoryPageObjects.cartButton.click();
    await expect(this.page).toHaveURL("/cart.html"); 
  }

}
