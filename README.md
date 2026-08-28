# Playwright E2E + API Test Suite

End-to-end and API automation for the [Automation Testing](https://demo.automationtesting.in/) demo
application, built with **Playwright** and **TypeScript**.

## Stack

- Playwright Test (`@playwright/test`)
- TypeScript, strict types for test data
- Page Object Model
- GitHub Actions CI (cross-browser, HTML report artifact)

## Getting started

```bash
npm ci
npx playwright install --with-deps
cp example.env .env   # fill in the values below
```

Copy `example.env` and fill in real values. Credentials are keyed by
`{ENV}_{SCENARIO}_{TYPE}_{EMAIL|PASSWORD}` (e.g. `DEV_VALIDLOGIN_COMMON_EMAIL`),
resolved by `config/credentials.ts`; `{ENV}_REGISTER_PASSWORD` is used by the
registration form.

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
config/      environment-scoped credentials + network helpers (ad blocking)
fixtures/    static test data (JSON)
pages/       Page Objects (SigninPage, RegisterPage)
tests/       *.spec.ts (UI), *.api.spec.ts (API)
types/       shared TypeScript types for test data
```

## Design decisions

- **Page Object Model** keeps locators and interaction logic out of the specs, so a
  markup change touches one file. Locators favour `getByRole` / `ng-model` anchors
  over brittle CSS paths.
- **Typed test data.** `types/userData.ts` describes the fixture shape; the spec
  casts `userData.json` to it, so a malformed fixture fails at compile time.
- **Environment-scoped credentials.** `config/credentials.ts` resolves secrets by
  environment (`dev`, ...) from `.env`, never hard-coded, so the same suite can point
  at other environments without edits.
- **Soft assertions** on the registration form (`expect.soft`) report every field
  mismatch in one run instead of stopping at the first, which speeds up triage.
- **Ad/tracker blocking** (`config/blockAds.ts`) aborts third-party ad requests via
  `page.route`, removing a common source of flakiness and slow loads on the demo site.
- **Dedicated API project.** API specs run in their own Playwright project with no
  browser, keeping contract checks fast and independent of the UI layer.
- **CI settings.** On CI only: `retries: 2`, `workers: 1`, `forbidOnly`, and
  `trace: 'on-first-retry'` so the first retry of any failure ships a full trace for
  root-cause analysis. The HTML report is uploaded as a build artifact (30-day retention).

## CI

`.github/workflows/playwright.yml` runs the full suite on every push / PR to `main`
against Ubuntu, and uploads `playwright-report/`.

_Next steps: shard the UI run across CI machines; add visual and accessibility checks._
