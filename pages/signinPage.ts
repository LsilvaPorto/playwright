import { type Page, type Locator } from '@playwright/test';

class SigninPage {
    readonly email: Locator;
    readonly enterBtn: Locator;

    constructor(private readonly page: Page) {
        this.email = page.locator('#email');
        this.enterBtn = page.locator('#enterimg');
    }

    async open() {
        await this.page.goto('/');
    }

    async signin(email: string) {
        await this.email.fill(email);
        await this.enterBtn.click();
    }

    async acceptCookiesBtn() {
        return this.page.getByRole('button', { name: 'Consent', exact: true });
    }

    async acceptCookies() {
        const acceptCookiesBtn = await this.acceptCookiesBtn();
        try {
            await acceptCookiesBtn.waitFor({ state: 'visible', timeout: 5000 });
        } catch {
            return;
        }
        await acceptCookiesBtn.click();
    }
}

export default SigninPage;