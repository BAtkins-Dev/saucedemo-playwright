import { test, expect } from "@playwright/test";
import customerData from "../tests/data/checkoutValidation.json";
import { InventoryPage } from "../pages/inventory-page";
test.use({ storageState: "playwright/.auth/user.json" });

customerData.forEach(({ testName, firstName, lastName, zip, errorMessage }) => {
  test(testName, async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.gotoInventoryPage();
    await inventoryPage.addItemToCart("sauce-labs-bolt-t-shirt");
    const cartPage = await inventoryPage.cartClick();
    const checkoutYourInfoPage = await cartPage.clickCheckOut();
    await checkoutYourInfoPage.startCheckout(firstName, lastName, zip);
    await expect(checkoutYourInfoPage.errorMessage).toHaveText(errorMessage);
  });
});
