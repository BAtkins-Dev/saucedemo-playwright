import { test, expect } from "@playwright/test";

test("click Add to cart for an item and see that the item is added to the shopping cart", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt").click();

  await expect(page.getByTestId("remove-sauce-labs-bolt-t-shirt")).toHaveText(
    "Remove",
  );
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

  //assertion passes with an incorrect name attribute
  await expect(page.getByTestId("remove-sauce-labs-bolt-t-shirt")).toHaveText(
    "Remove",
  );
});

test("remove an item from the cart - cart is empty", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt").click();

  await page.getByTestId("remove-sauce-labs-bolt-t-shirt").click();
  await expect(
    page.getByTestId("add-to-cart-sauce-labs-bolt-t-shirt"),
  ).toHaveText("Add to cart");
  await expect(page.getByTestId("shopping-cart-link")).toHaveText("");
});
