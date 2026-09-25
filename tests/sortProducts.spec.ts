import { test, expect } from "@playwright/test";
test.use({ storageState: "playwright/.auth/user.json" });

test("sort products in reverse-alphabetical order from Z to A", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.getByTestId("product-sort-container").selectOption("za");

  const texts = await page.getByTestId("inventory-item-name").allTextContents();

  expect(texts).toEqual([
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Onesie",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Bike Light",
    "Sauce Labs Backpack",
  ]);
});
