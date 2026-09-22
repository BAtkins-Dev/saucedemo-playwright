import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test("click Add to cart for an item and see that the item is added to the shopping cart", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoPage();
  await loginPage.userLogin("standard_user", "secret_sauce");

  await page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt").click();

  await expect(page.getByTestId("remove-sauce-labs-bolt-t-shirt")).toHaveText(
    "Remove",
  );
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
});

test("remove an item from the cart - cart is empty", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoPage();
  await loginPage.userLogin("standard_user", "secret_sauce");
  await page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt").click();

  await page.getByTestId("remove-sauce-labs-bolt-t-shirt").click();
  await expect(
    page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt"),
  ).toHaveText("Add to cart");
  await expect(page.getByTestId("shopping-cart-link")).toHaveText("");
});
