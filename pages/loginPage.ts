import { type Page, type Locator } from '@playwright/test';
import type { TestUser } from '../config/users';

class LoginPage {
    readonly email: Locator;
    readonly password: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(private readonly page: Page) {
        this.email = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.submitButton = page.getByTestId('login-submit');
        this.errorMessage = page.getByTestId('login-error');
    }

    async open() {
        await this.page.goto('/auth/login');
    }

    async login(user: TestUser) {
        await this.email.fill(user.email);
        await this.password.fill(user.password);
        await this.submitButton.click();
    }
}

export default LoginPage;
