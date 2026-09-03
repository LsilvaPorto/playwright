import { test as base, expect } from '@playwright/test';
import SigninPage from '../pages/signinPage';
import RegisterPage from '../pages/registerPage';
import AlertPage from '../pages/alertPage';
import Nav from '../pages/components/Nav';
import { blockAds } from '../config/blockAds';

type Pages = {
    signinPage: SigninPage;
    registerPage: RegisterPage;
    alertPage: AlertPage;
    nav: Nav;
};

export const test = base.extend<Pages>({
    /* Override the built-in page fixture so every test blocks ad/tracker
       requests automatically, with no per-spec beforeEach. */
    page: async ({ page }, use) => {
        await blockAds(page);
        await use(page);
    },

    signinPage: async ({ page }, use) => {
        await use(new SigninPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    alertPage: async ({ page }, use) => {
        await use(new AlertPage(page));
    },
    nav: async ({ page }, use) => {
        await use(new Nav(page));
    },
});

export { expect };
