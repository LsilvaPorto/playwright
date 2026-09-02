import { test, expect } from '@playwright/test';
import SigninPage from '../pages/signinPage';
import { getCredential, getRegisterPassword } from '../config/credentials';
import { blockAds } from '../config/blockAds';
import Nav from '../pages/components/Nav';
import AlertPage from '../pages/alertPage';

test.beforeEach(async ({ page }) => {
  await blockAds(page);
  const signin = new SigninPage(page);
  const nav = new Nav(page);
  const switchToBtn = nav.switchToBtn;
  await signin.open();

  const credential = getCredential('dev', 'validLogin', 'common');
  await signin.signin(credential.email);

  await expect(page).toHaveTitle(/Register/);
  await signin.acceptCookies();
  await switchToBtn.click();
  const switchToMenu = nav.switchToAlertsItem;
  await switchToMenu.click();
  await expect(page).toHaveTitle(/Alerts/);
});

test('alert validation', async ({ page }) => {
  const alertPage = new AlertPage(page);
  const alertBoxBtn = alertPage.alertBoxBtn;

  await alertPage.alertBoxTab.click();
  await expect(alertBoxBtn).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();
  });
  await alertBoxBtn.click();
});

test('confirmation validation', async ({ page }) => {
  const alertPage = new AlertPage(page);
  const confirmBoxBtn = alertPage.confirmBoxBtn;

  await alertPage.confirmBoxTab.click();
  await expect(confirmBoxBtn).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Press a Button !');
    await dialog.accept();
  });
  await confirmBoxBtn.click();
  await expect(alertPage.confirmBoxResult).toHaveText('You pressed Ok');

  await expect(confirmBoxBtn).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Press a Button !');
    await dialog.dismiss();
  });
  await confirmBoxBtn.click();
  await expect(alertPage.confirmBoxResult).toHaveText('You Pressed Cancel');
});

test('textbox validation', async ({ page }) => {
  const alertPage = new AlertPage(page);
  const promptBoxBtn = alertPage.promptBoxBtn;

  await alertPage.promptBoxTab.click();
  await expect(promptBoxBtn).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Please enter your name');
    await dialog.dismiss();
  });
  await promptBoxBtn.click();
  await expect(alertPage.promptBoxResult).toHaveText('');

  await expect(promptBoxBtn).toBeVisible();

  const userName = 'develop';
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Please enter your name');
    await dialog.accept(userName);
  });
  await promptBoxBtn.click();
  await expect(alertPage.promptBoxResult).toHaveText(`Hello ${userName} How are you today`);
});