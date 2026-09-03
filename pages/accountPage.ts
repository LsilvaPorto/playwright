import { type Page, type Locator } from '@playwright/test';

class AccountPage {
    readonly title: Locator;
    readonly navMenu: Locator;
    readonly signOut: Locator;
    /* Tiles on the account overview itself. */
    readonly favoritesTile: Locator;
    readonly profileTile: Locator;
    readonly invoicesTile: Locator;
    readonly messagesTile: Locator;

    constructor(private readonly page: Page) {
        this.title = page.getByTestId('page-title');
        this.navMenu = page.getByTestId('nav-menu');
        this.signOut = page.getByTestId('nav-sign-out');
        this.favoritesTile = page.getByTestId('nav-favorites');
        this.profileTile = page.getByTestId('nav-profile');
        this.invoicesTile = page.getByTestId('nav-invoices');
        this.messagesTile = page.getByTestId('nav-messages');
    }

    async open() {
        await this.page.goto('/account');
    }

    /* The user dropdown (My profile / Sign out / ...) is collapsed until clicked. */
    async openUserMenu() {
        await this.navMenu.click();
    }
}

export default AccountPage;
