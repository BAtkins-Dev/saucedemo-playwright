import { test, expect } from "@playwright/test";

test("successful login - verify products page displays", async ({ page }) => {
  await page.goto("https://saucedemo.com/");
  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/saucedemo\.com\/inventory\.html/);
  await expect(page.getByTestId("title")).toHaveText("Products");
});

test("locked-out user sees a lockout error and stays on the login page", async ({
  page,
}) => {
  await page.goto("https://saucedemo.com/");
  await page.getByRole("textbox", { name: "Username" }).fill("locked_out_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.getByRole("alert")).toHaveText(
    /Sorry, this user has been locked out/,
  );
});
