import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import AccountPage from '../pages/accountPage';

type Pages = {
    loginPage: LoginPage;
    accountPage: AccountPage;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
});

export { expect };
