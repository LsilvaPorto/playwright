import { test, expect } from '@playwright/test';
import SigninPage from '../pages/signinPage';
import { getCredential, getRegisterPassword } from '../config/credentials';
import RegisterPage from '../pages/registerPage';
import { blockAds } from '../config/blockAds';
import userData from '../fixtures/userData.json';
import type { UserData } from '../types/userData';

test.beforeEach(async ({ page }) => {
  await blockAds(page);
  const signin = new SigninPage(page);
  await signin.open();
});

test('register validation', async ({ page }) => {
  const signin = new SigninPage(page);
  
  const credential = getCredential('dev', 'validLogin', 'common');
  await signin.signin(credential.email);
  
  await expect(page).toHaveTitle(/Register/);

  await signin.acceptCookies();

  const register = new RegisterPage(page);
  const registerPassword = getRegisterPassword('dev');
  const data = userData as UserData;
  await register.fillRegisterForm(data, registerPassword);

  await expect.soft(register.firstNameInput).toHaveValue(data.firstName);
  await expect.soft(register.lastNameInput).toHaveValue(data.lastName);
  await expect.soft(register.genderInput(data.gender)).toBeChecked();
  await expect.soft(register.emailInput).toHaveValue(data.email);
  await expect.soft(register.phoneInput).toHaveValue(data.phone);
  await expect.soft(register.skillsSelect).toHaveValue(data.skills);
  await expect.soft(register.countrySelect).toHaveValue(data.country);
  await expect.soft(register.yearSelect).toHaveValue(data.dateOfBirth.year);
  await expect.soft(register.monthSelect).toHaveValue(data.dateOfBirth.month);
  await expect.soft(register.daySelect).toHaveValue(data.dateOfBirth.day);
  await expect.soft(register.passwordInput).toHaveValue(registerPassword);
  await expect.soft(register.confirmPasswordInput).toHaveValue(registerPassword);

  for (const hobby of data.hobbies) {
    await expect.soft(page.locator(`input[value="${hobby}"]`)).toBeChecked();
  }

  for (const language of data.languages) {
    await expect.soft(page.locator('#msdd')).toContainText(language);
  }
});