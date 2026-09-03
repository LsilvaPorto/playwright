import { test, expect } from '../support/fixtures';

test.beforeEach(async ({ alertPage, page }) => {
  await alertPage.open();
  await expect(page).toHaveTitle(/Alerts/);
});

test('alert validation', async ({ alertPage, page }) => {
  const alertBoxBtn = alertPage.alertBoxBtn;

  await alertPage.alertBoxTab.click();
  await expect(alertBoxBtn).toBeVisible();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();
  });
  await alertBoxBtn.click();
});

test('confirmation validation', async ({ alertPage, page }) => {
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

test('textbox validation', async ({ alertPage, page }) => {
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
