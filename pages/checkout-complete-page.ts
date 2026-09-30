import { Page, Locator } from "@playwright/test";

export class CheckoutComplete {
  readonly page;
  readonly orderCompleteMsg;

  constructor(page: Page) {
    this.page = page;
    this.orderCompleteMsg = page.getByTestId("complete-header");
  }
}
