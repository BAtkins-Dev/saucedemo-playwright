import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

setup("login fixture", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.gotoPage();
  await loginPage.userLogin("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/saucedemo\.com\/inventory\.html/);

  await page.context().storageState({ path: "playwright/.auth/user.json" });
});
