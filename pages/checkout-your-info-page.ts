import { Page, Locator } from "@playwright/test";
import { CheckoutOverview } from "./checkout-overview-page";

export class CheckoutYourInfoPage {
  readonly page: Page;
  readonly checkoutYourInfoTitle: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipcode: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutYourInfoTitle = page.getByTestId("title");
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.zipcode = page.getByTestId("postalCode");
    this.cancelButton = page.getByTestId("cancel");
    this.continueButton = page.getByTestId("continue");
    this.errorMessage = page.getByTestId("error");
  }

  async startCheckout(firstName: string, lastName: string, zip: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipcode.fill(zip);
    await this.continueButton.click();
    return new CheckoutOverview(this.page);
  }
}
