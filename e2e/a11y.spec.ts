import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { waitForPage } from './helpers';

const pages = [
  { path: '/', label: 'home' },
  { path: '/solutions', label: 'solutions' },
  { path: '/products/gorgon-workbench', label: 'product-detail' },
  { path: '/technology', label: 'technology' },
  { path: '/contact', label: 'contact' },
];

async function expectNoSeriousViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const blocking = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  test.info().attach(`${label}-axe-violations.json`, {
    body: Buffer.from(JSON.stringify(results.violations, null, 2)),
    contentType: 'application/json',
  });

  expect(
    blocking.map((violation) => ({
      id: violation.id,
      help: violation.help,
      nodes: violation.nodes.map((node) => node.target.join(' ')),
    })),
    `${label} must not have serious or critical accessibility violations`,
  ).toEqual([]);
}

for (const entry of pages) {
  test(`axe: ${entry.label}`, async ({ page }) => {
    await page.goto(entry.path);
    await waitForPage(page);
    await page.waitForLoadState('networkidle');
    await expectNoSeriousViolations(page, entry.label);
  });
}

test.describe('axe: mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('open menu remains accessible', async ({ page }) => {
    await page.goto('/');
    await waitForPage(page);
    await page.getByRole('button', { name: '打开菜单' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expectNoSeriousViolations(page, 'mobile-menu');
  });
});
