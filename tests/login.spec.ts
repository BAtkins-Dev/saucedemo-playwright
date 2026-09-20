import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test("successful login - verify products page displays", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoPage();
  await loginPage.userLogin("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/saucedemo\.com\/inventory\.html/);
  await expect(page.getByTestId("title")).toHaveText("Products");
});

test("locked-out user sees a lockout error and stays on the login page", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoPage();
  await loginPage.userLogin("locked_out_user", "secret_sauce");

  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.getByRole("alert")).toHaveText(
    /Sorry, this user has been locked out/,
  );
});
