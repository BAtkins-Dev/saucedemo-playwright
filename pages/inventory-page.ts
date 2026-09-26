import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async gotoInventoryPage() {
    await this.page.goto("inventory.html");
  }

  getAddToCartButton(itemId: string): Locator {
    return this.page.getByTestId(`add-to-cart-${itemId}`);
  }

  async addItemToCart(itemId: string) {
    await this.getAddToCartButton(itemId).click();
  }

  getRemoveFromCartButton(itemId: string): Locator {
    return this.page.getByTestId(`remove-${itemId}`);
  }

  async removeItemFromCart(itemId: string) {
    await this.getRemoveFromCartButton(itemId).click();
  }

  async cartClick() {
    await this.page.getByTestId("shopping-cart-link").click();
  }
}
