import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory-page";
test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Cart", () => {
  let inventoryPage: InventoryPage;
  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.gotoInventoryPage();
  });

  test("click Add to cart for an item and see that the item is added to the shopping cart", async ({
    page,
  }) => {
    await inventoryPage.addItemToCart("sauce-labs-bolt-t-shirt");
    await expect(page.getByTestId("remove-sauce-labs-bolt-t-shirt")).toHaveText(
      "Remove",
    );
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
  });

  test("remove an item from the cart - cart is empty", async ({ page }) => {
    await inventoryPage.addItemToCart("sauce-labs-bolt-t-shirt");
    await inventoryPage.removeItemFromCart("sauce-labs-bolt-t-shirt");
    await expect(
      page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt"),
    ).toHaveText("Add to cart");
    await expect(page.getByTestId("shopping-cart-link")).toHaveText("");
  });

  test.skip("click on cart to view added items", async ({ page }) => {});
});
