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

  test("enter personal information, leaving out zip - can't continue checkout", async ({
    page,
  }) => {
    await inventoryPage.addItemToCart("sauce-labs-bolt-t-shirt");
    const cartPage = await inventoryPage.cartClick();
    const checkoutYourInfoPage = await cartPage.clickCheckOut();
    await expect(checkoutYourInfoPage.checkoutYourInfoTitle).toHaveText(
      "Checkout: Your Information",
    );
    await checkoutYourInfoPage.startCheckout("Joe", "Jones", "");
    await expect(checkoutYourInfoPage.errorMessage).toHaveText(
      "Error: Postal Code is required",
    );
  });

  //Defect: This test is expected to fail because checkout button is enabled for an empty cart.
  test.fail(
    "start checking out with an empty cart - not allowed to start check out",
    async ({ page }) => {
      const cartPage = await inventoryPage.cartClick();
      await expect(cartPage.checkoutButton).toBeDisabled();
    },
  );

  test("view cart and continue shopping", async ({ page }) => {
    await inventoryPage.addItemToCart("sauce-labs-bolt-t-shirt");
    const cartPage = await inventoryPage.cartClick();
    await expect(
      inventoryPage.getRemoveFromCartButton("sauce-labs-bolt-t-shirt"),
    ).toBeVisible();
  });
});
