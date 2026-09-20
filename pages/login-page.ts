import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async gotoPage() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async userLogin(usernamePassed: string, passwordPassed: string) {
    await this.username.fill(usernamePassed);
    await this.password.fill(passwordPassed);
    await this.loginButton.click();
  }
}
