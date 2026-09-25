import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], input[name="email"]');
    this.passwordInput = page.locator(
      'input[type="password"], input[name="password"]',
    );
    this.submitButton = page.locator('button[type="submit"]');
  }

  async login(email: string, pass: string) {
    await this.emailInput.waitFor({ state: "visible" });
    await this.emailInput.click();
    await this.emailInput.fill("");
    await this.emailInput.pressSequentially(email, { delay: 30 });

    await this.passwordInput.waitFor({ state: "visible" });
    await this.passwordInput.click();
    await this.passwordInput.fill("");
    await this.passwordInput.pressSequentially(pass, { delay: 30 });

    await Promise.all([
      this.page
        .waitForResponse(
          (resp) => resp.url().includes("login") && resp.url().includes("auth"),
          { timeout: 7000 },
        )
        .catch(() => null),
      this.submitButton.click(),
    ]);

    await this.page.waitForLoadState("networkidle").catch(() => null);
  }
}
