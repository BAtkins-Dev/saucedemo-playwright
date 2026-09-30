import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory-page";
test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Checkout", () => {
  let inventoryPage: InventoryPage;
  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.gotoInventoryPage();
  });

  test("enter personal information and continue with checkout", async ({
    page,
  }) => {
    await inventoryPage.addItemToCart("sauce-labs-bolt-t-shirt");
    const cartPage = await inventoryPage.cartClick();
    const checkoutYourInfoPage = await cartPage.clickCheckOut();
    await expect(checkoutYourInfoPage.checkoutYourInfoTitle).toHaveText(
      "Checkout: Your Information",
    );
    const checkoutOverviewPage = await checkoutYourInfoPage.startCheckout(
      "Joe",
      "Jones",
      "98115",
    );
    await expect(checkoutOverviewPage.totalPrice).toContainText("17.27");

    const checkoutComplete = await checkoutOverviewPage.clickFinish();
    await expect(checkoutComplete.orderCompleteMsg).toHaveText(
      "Thank you for your order!",
    );
  });
});
