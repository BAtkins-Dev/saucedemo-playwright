import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test("user logs out - login page displays", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoPage();
  await loginPage.userLogin("standard_user", "secret_sauce");

  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.getByTestId("logout-sidebar-link").click();

  await expect(loginPage.loginButton).toBeVisible();
});
