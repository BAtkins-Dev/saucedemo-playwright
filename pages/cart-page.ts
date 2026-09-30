import { Page, Locator } from "@playwright/test";
import { CheckoutYourInfoPage } from "./checkout-your-info-page";

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly itemDescription: Locator;
  readonly itemQuantity: Locator;
  readonly cartPageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
    this.itemDescription = page.getByTestId("inventory-item-name");
    this.itemQuantity = page.getByTestId("item-quantity");
    this.cartPageTitle = page.getByTestId("title");
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickCheckOut() {
    await this.checkoutButton.click();
    return new CheckoutYourInfoPage(this.page);
  }
}
