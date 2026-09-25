import { test, expect } from "@playwright/test";
test.use({ storageState: "playwright/.auth/user.json" });

test("click Add to cart for an item and see that the item is added to the shopping cart", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt").click();

  await expect(page.getByTestId("remove-sauce-labs-bolt-t-shirt")).toHaveText(
    "Remove",
  );
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
});

test("remove an item from the cart - cart is empty", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt").click();

  await page.getByTestId("remove-sauce-labs-bolt-t-shirt").click();
  await expect(
    page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt"),
  ).toHaveText("Add to cart");
  await expect(page.getByTestId("shopping-cart-link")).toHaveText("");
});
