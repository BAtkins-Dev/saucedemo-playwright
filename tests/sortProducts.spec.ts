import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test("sort products in reverse-alphabetical order from Z to A", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoPage();
  await loginPage.userLogin("standard_user", "secret_sauce");

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
