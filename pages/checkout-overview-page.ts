import { Page, Locator } from "@playwright/test";
import { CheckoutComplete } from "./checkout-complete-page";

export class CheckoutOverview {
    readonly page;
    readonly finishButton;
    readonly cancelButton;
    readonly paymentMethodInfo;
    readonly totalPrice;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.getByTestId('finish');
        this.cancelButton = page.getByTestId('cancel');
        this.paymentMethodInfo = page.getByTestId('payment-info-value');
        this.totalPrice = page.getByTestId('total-label');
    }

    async clickFinish() {
        await this.finishButton.click();
        return new CheckoutComplete(this.page);
    }

}