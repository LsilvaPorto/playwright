import { test, expect } from '../support/fixtures';
import { getRegisterPassword } from '../config/credentials';
import userData from '../fixtures/userData.json';
import type { UserData } from '../types/userData';

test.beforeEach(async ({ registerPage, signinPage }) => {
  await registerPage.open();
  // demo-site quirk: the Google consent banner re-renders on this page even
  // with the consent cookie from storageState, and it overlaps the form.
  await signinPage.acceptCookies();
});

test('register validation', async ({ registerPage, page }) => {
  const registerPassword = getRegisterPassword('dev');
  const data = userData as UserData;
  await registerPage.fillRegisterForm(data, registerPassword);

  await expect.soft(registerPage.firstNameInput).toHaveValue(data.firstName);
  await expect.soft(registerPage.lastNameInput).toHaveValue(data.lastName);
  await expect.soft(registerPage.genderInput(data.gender)).toBeChecked();
  await expect.soft(registerPage.emailInput).toHaveValue(data.email);
  await expect.soft(registerPage.phoneInput).toHaveValue(data.phone);
  await expect.soft(registerPage.skillsSelect).toHaveValue(data.skills);
  await expect.soft(registerPage.countrySelect).toHaveValue(data.country);
  await expect.soft(registerPage.yearSelect).toHaveValue(data.dateOfBirth.year);
  await expect.soft(registerPage.monthSelect).toHaveValue(data.dateOfBirth.month);
  await expect.soft(registerPage.daySelect).toHaveValue(data.dateOfBirth.day);
  await expect.soft(registerPage.passwordInput).toHaveValue(registerPassword);
  await expect.soft(registerPage.confirmPasswordInput).toHaveValue(registerPassword);

  for (const hobby of data.hobbies) {
    await expect.soft(page.locator(`input[value="${hobby}"]`)).toBeChecked();
  }

  for (const language of data.languages) {
    await expect.soft(page.locator('#msdd')).toContainText(language);
  }
});
