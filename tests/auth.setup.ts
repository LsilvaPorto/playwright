import { test as setup, expect } from '@playwright/test';
import SigninPage from '../pages/signinPage';
import { getCredential } from '../config/credentials';

const authFile = 'playwright/.auth/user.json';

/**
 * Runs once before the browser projects (wired via `dependencies: ['setup']`).
 * Goes through the email gate + cookie consent a single time and saves the
 * resulting cookies/localStorage to disk. The browser projects load it via
 * `storageState`, so individual specs start from that state.
 *
 * Note: this demo app has no real authentication, so what actually persists
 * here is just the cookie-consent choice. On an app with a login, the saved
 * session token would ride along in exactly the same way.
 *
 * Ads/trackers are NOT blocked here on purpose: the consent script is one of
 * them, and it needs to run so we can accept it and capture the result.
 */
setup('authenticate', async ({ page }) => {
    const signin = new SigninPage(page);
    await signin.open();

    const { email } = getCredential('dev', 'validLogin', 'common');
    await signin.signin(email);
    await expect(page).toHaveTitle(/Register/);

    await signin.acceptCookies();

    await page.context().storageState({ path: authFile });
});
