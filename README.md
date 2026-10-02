# SauceDemo Playwright Test Suite

An automated UI and API test suite for [SauceDemo](https://www.saucedemo.com/), built with [Playwright](https://playwright.dev/) and TypeScript. The project uses the Page Object Model (POM) to keep test logic separate from UI interaction details, and includes both data-driven UI tests and API tests.

## Tech Stack

- **Playwright** (`@playwright/test`) – test runner, browser automation, and API testing
- **TypeScript** – typed page objects and test files
- **Node.js**

## Features / What It Covers

- **Login** – successful login, and a locked-out user being blocked with the correct error
- **Cart** – adding/removing items, viewing the cart, continuing shopping, and starting checkout
- **Checkout flow** – full purchase flow from cart through order confirmation, including total price validation
- **Checkout form validation** – data-driven tests (via a JSON fixture) covering missing first name, last name, and zip code, each asserting the specific error message
- **Product sorting** – verifying products sort correctly (Z–A)
- **Logout** – confirming a logged-in user is returned to the login page
- **API testing** – request tests against a public REST API (`reqres.in`), covering a successful GET, a 404 on a non-existent user, and a POST that creates a user and returns 201
- **Known defect tracking** – one test is written with `test.fail()` to document a real bug (the checkout button is enabled even with an empty cart), so the suite fails loudly if that bug is ever silently fixed or regresses further

## Design Notes

- **Page Object Model**: Each page (`login-page.ts`, `inventory-page.ts`, `cart-page.ts`, etc.) encapsulates its own locators and actions. Methods that navigate to a new page return an instance of that page's object (e.g. `cartPage.clickCheckOut()` returns a `CheckoutYourInfoPage`), so tests can chain through a flow while staying readable.
- **Authenticated state reuse**: `tests/auth.setup.ts` runs once as a Playwright "setup" project, logs in, and saves the browser's storage state to `playwright/.auth/user.json`. Tests that need a logged-in session (cart, checkout, sorting) load that saved state with `test.use({ storageState: ... })` instead of re-logging in every test, which keeps the suite faster and the tests focused on the behavior being verified rather than login mechanics.
- **Data-driven tests**: `customerCheckoutValidation.spec.ts` loops over `tests/data/checkoutValidation.json` to run the same checkout-validation test against multiple input/error combinations without duplicating test code.
- **Documenting a known defect**: rather than skip or ignore a bug found during testing, `test.fail()` is used in `checkout.spec.ts` with a comment explaining the defect. This keeps the bug visible in the test report instead of hiding it.

## Project Structure

```
├── pages/                        # Page Object Model classes
│   ├── login-page.ts
│   ├── inventory-page.ts
│   ├── cart-page.ts
│   ├── checkout-your-info-page.ts
│   ├── checkout-overview-page.ts
│   └── checkout-complete-page.ts
├── tests/
│   ├── auth.setup.ts              # Logs in once, saves auth state for reuse
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── customerCheckoutValidation.spec.ts
│   ├── sortProducts.spec.ts
│   ├── logoout.spec.ts
│   ├── api/
│   │   └── users.spec.ts          # API tests against reqres.in (GET, POST)
│   └── data/
│       └── checkoutValidation.json
├── playwright.config.ts
└── package.json
```

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/BAtkins-Dev/saucedemo-playwright.git
   cd saucedemo-playwright
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright's browser binaries:
   ```bash
   npx playwright install
   ```

## Running the Tests

Run the full suite (headless, Chromium):

```bash
npm test
```

Run with Playwright's UI mode (interactive, step-through):

```bash
npm run test:ui
```

Run a specific file:

```bash
npx playwright test tests/checkout.spec.ts
```

Run in headed mode (watch the browser):

```bash
npx playwright test --headed
```

View the HTML report after a run:

```bash
npm run report
```

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/`) runs the full suite on every push and pull request to `main`/`master`, installing dependencies and browsers fresh and uploading the HTML report as a build artifact.

## Notes

- Tests target the live `saucedemo.com` site rather than a local instance, so a network connection is required to run them.
- One test in `checkout.spec.ts` is intentionally left as `test.skip` (an empty-cart checkout guard) pending further investigation, separate from the `test.fail` defect case described above.
