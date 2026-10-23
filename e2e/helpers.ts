import { expect, type Page } from '@playwright/test';

export function collectPageErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

export async function expectNoHorizontalOverflow(page: Page, label: string): Promise<void> {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  expect(
    Math.max(metrics.scrollWidth, metrics.bodyScrollWidth),
    `${label} must not overflow horizontally (viewport ${metrics.innerWidth}px)`,
  ).toBeLessThanOrEqual(metrics.innerWidth + 1);
}

export async function waitForPage(page: Page): Promise<void> {
  await expect(page.locator('main h1')).toBeVisible();
}
