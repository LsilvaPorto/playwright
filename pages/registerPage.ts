import { type Page, type Locator } from '@playwright/test';
import type { UserData } from '../types/userData';
class RegisterPage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly submitButton: Locator;
    readonly skillsSelect: Locator;
    readonly countrySelect: Locator;
    readonly yearSelect: Locator;
    readonly monthSelect: Locator;
    readonly daySelect: Locator;

    constructor(private readonly page: Page) {
        this.firstNameInput = page.locator('form [ng-model="FirstName"]');
        this.lastNameInput = page.locator('form [ng-model="LastName"]');
        this.emailInput = page.locator('form [ng-model="EmailAdress"]');
        this.phoneInput = page.locator('form [ng-model="Phone"]');
        this.passwordInput = page.locator('input#firstpassword');
        this.confirmPasswordInput = page.locator('input#secondpassword');
        this.skillsSelect = page.locator('#Skills');
        this.countrySelect = page.locator('#country');
        this.yearSelect = page.locator('#yearbox');
        this.monthSelect = page.locator('select[ng-model="monthbox"]');
        this.daySelect = page.locator('#daybox');
        this.submitButton = page.locator('button[type="submit"]');
    }

    async open() {
        await this.page.goto('/Register.html');
    }

    genderInput(gender: UserData['gender']): Locator {
        return this.page.getByRole('radio', { name: gender, exact: true });
    }

    async fillRegisterForm(userData: UserData, password: string) {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.genderInput(userData.gender).check();
        await this.emailInput.fill(userData.email);
        await this.phoneInput.fill(userData.phone);
        await this.confirmPasswordInput.fill(password);

        for (const hobby of userData.hobbies) {
            await this.page.locator(`input[value="${hobby}"]`).check();
        }

        for (const language of userData.languages) {
            await this.page.locator('#msdd').click();
            await this.page.locator(`ul.ui-autocomplete li a:text-is("${language}")`).click();
        }

        await this.page.locator('body').click({ position: { x: 0, y: 0 } });
        await this.skillsSelect.selectOption(userData.skills);
        await this.countrySelect.selectOption(userData.country, { force: true });

        await this.yearSelect.selectOption(userData.dateOfBirth.year);
        await this.monthSelect.selectOption(userData.dateOfBirth.month);
        await this.daySelect.selectOption(userData.dateOfBirth.day);

        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }

    async submitRegisterForm() {
        await this.submitButton.click();
    }
}

export default RegisterPage;