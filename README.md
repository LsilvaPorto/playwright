# Playwright E2E + API Test Suite

End-to-end and API automation built with **Playwright** and **TypeScript**, targeting the
[Practice Software Testing](https://practicesoftwaretesting.com) (Toolshop) demo app.

## Stack

- Playwright Test (`@playwright/test`)
- TypeScript (strict)
- Page Object Model + custom fixtures
- `storageState` auth via a dedicated setup project
- GitHub Actions CI (cross-browser, HTML report artifact)

## Getting started

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

No secrets to configure — the target app ships public demo accounts
(`config/users.ts`).

## Running

| Command | What it runs |
| --- | --- |
| `npm test` | full suite — API project + UI on Chromium, Firefox, WebKit |
| `npm run test:e2e` | UI specs only, cross-browser |
| `npm run test:api` | API specs only, no browser |
| `npm run test:ui` | Playwright UI mode (watch / time-travel) |
| `npm run report` | open the last HTML report |

## Layout

```
config/      public demo credentials (users.ts)
pages/       Page Objects (LoginPage, AccountPage)
support/     custom test fixtures (POM injection)
tests/       auth.setup.ts (login → storageState), *.spec.ts (UI), *.api.spec.ts (API)
```

## Design decisions

- **`data-test` locators.** The app tags every element with `data-test`, so
  `testIdAttribute: 'data-test'` is set in the config and Page Objects use
  `getByTestId(...)` — resilient to styling and copy changes.
- **Shared login via `storageState`.** `tests/auth.setup.ts` runs once as its own
  project; the browser projects declare `dependencies: ['setup']` and load the
  saved session with `storageState`, so specs start authenticated without
  repeating the UI login. The app's JWT is short-lived (~5 min), which is fine
  because setup runs immediately before the dependent projects.
- **Page Object Model + fixtures.** Locators and flows live in `pages/`; the
  custom `test` in `support/fixtures.ts` injects ready-to-use Page Objects, so
  specs carry no `new SomePage(page)` boilerplate.
- **Dedicated API project.** API specs run in their own browserless project,
  keeping contract checks fast and independent of the UI layer.
- **CI settings.** On CI only: `retries: 2`, `workers: 1`, `forbidOnly`, and
  `trace: 'on-first-retry'`. The HTML report is uploaded as a build artifact.

## CI

`.github/workflows/playwright.yml` runs the full suite on every push / PR to `main`
against Ubuntu and uploads `playwright-report/`.

_Next steps: add product search / cart / checkout flows and a customer API smoke
against `api.practicesoftwaretesting.com`._
