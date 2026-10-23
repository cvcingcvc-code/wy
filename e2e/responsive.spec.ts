import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, waitForPage } from './helpers';

const viewports = [
  { width: 1440, height: 900, label: 'desktop-1440' },
  { width: 390, height: 844, label: 'mobile-390' },
  { width: 375, height: 812, label: 'mobile-375' },
];

const routes = ['/', '/about', '/solutions', '/products', '/technology', '/contact'];

for (const viewport of viewports) {
  test.describe(viewport.label, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route} has no horizontal overflow`, async ({ page }, testInfo) => {
        await page.goto(route);
        await waitForPage(page);
        await expectNoHorizontalOverflow(page, `${viewport.label} ${route}`);

        if (route === '/' || route === '/products' || route === '/contact') {
          await testInfo.attach(`${viewport.label}${route.replace(/\//g, '-')}.png`, {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png',
          });
        }
      });
    }
  });
}

test.describe('narrow viewport with the menu open', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('open menu does not introduce horizontal scroll', async ({ page }) => {
    await page.goto('/');
    await waitForPage(page);
    await page.getByRole('button', { name: '打开菜单' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expectNoHorizontalOverflow(page, '375px with the mobile menu open');

    await page.getByRole('button', { name: '关闭菜单' }).last().click();
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});
