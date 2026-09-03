import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import { users } from '../config/users';

const authFile = 'playwright/.auth/customer.json';

/**
 * Runs once before the browser projects (wired via `dependencies: ['setup']`).
 * Logs in through the UI a single time and persists the session
 * (localStorage `auth-token` + cookies) to disk. The browser projects load it
 * via `storageState`, so specs start already authenticated.
 *
 * Note: this app issues a short-lived JWT (~5 min). The setup runs immediately
 * before the projects that depend on it, so a normal run stays well inside that
 * window; a very long run may need the token refreshed.
 */
setup('authenticate as customer', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(users.customer);

    await page.waitForURL('**/account');
    await expect(page.getByTestId('nav-menu')).toBeVisible();

    await page.context().storageState({ path: authFile });
});
