import { expect, test } from '@playwright/test';
import { waitForPage } from './helpers';

test('desktop navigation reaches every primary page', async ({ page }) => {
  await page.goto('/');
  await waitForPage(page);

  const nav = page.getByRole('navigation', { name: '网站导航' });

  await nav.getByRole('link', { name: '关于我们' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('main h1')).toContainText('让技术进入现场');

  await nav.getByRole('link', { name: '产品与实验室' }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.locator('main h1')).toContainText('正在构建的东西');

  await nav.getByRole('link', { name: '联系我们' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator('main h1')).toContainText('从一个具体问题');
});

test('language switch translates the page and survives a reload', async ({ page }) => {
  await page.goto('/');
  await waitForPage(page);
  await page.evaluate(() => window.localStorage.removeItem('gorgon-locale'));

  const headerLanguage = page.locator('.site-header__actions .lang-switch');
  await headerLanguage.getByRole('button', { name: /English/ }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toContainText('Building AI for');
  await expect(page.getByRole('navigation', { name: 'Site navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

  await page.reload();
  await waitForPage(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toContainText('Building AI for');

  await page.locator('.site-header__actions .lang-switch').getByRole('button', { name: /中文/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('main h1')).toContainText('让智能技术');
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, traps the page, closes on Escape and navigates', async ({ page }) => {
    await page.goto('/');
    await waitForPage(page);

    const trigger = page.locator('.menu-trigger');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAccessibleName('打开菜单');
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger).toHaveAccessibleName('关闭菜单');
    await expect(page.getByRole('button', { name: '关闭菜单' }).last()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveAccessibleName('打开菜单');
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page.getByRole('dialog').getByRole('link', { name: /关于我们/ }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.locator('main h1')).toContainText('让技术进入现场');
  });

  test('switches language inside the menu', async ({ page }) => {
    await page.goto('/');
    await waitForPage(page);
    await page.getByRole('button', { name: '打开菜单' }).click();

    const dialog = page.getByRole('dialog');
    await dialog.locator('.lang-switch').getByRole('button', { name: /English/ }).click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(dialog.getByRole('link', { name: /About/ })).toBeVisible();
    await expect(dialog).toContainText('Start a conversation');
  });
});
