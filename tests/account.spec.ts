import { test, expect } from '../support/fixtures';

test('authenticated customer lands on their account overview', async ({ accountPage }) => {
  await accountPage.open();

  await expect(accountPage.title).toHaveText('My account');
  await expect(accountPage.navMenu).toHaveText('Jane Doe');

  await accountPage.openUserMenu();
  await expect(accountPage.signOut).toBeVisible();
});

test('account overview tiles navigate to sub-pages', async ({ page, accountPage }) => {
  await accountPage.open();

  await accountPage.favoritesTile.click();
  await expect(page).toHaveURL(/\/account\/favorites$/);

  await accountPage.open();
  await accountPage.invoicesTile.click();
  await expect(page).toHaveURL(/\/account\/invoices$/);
});
