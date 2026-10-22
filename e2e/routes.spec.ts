import { expect, test } from '@playwright/test';
import { collectPageErrors, waitForPage } from './helpers';

const routes = [
  { path: '/', title: /让智能技术，走进真实世界/, canonical: '/' },
  { path: '/about', title: /让技术进入现场/, canonical: '/about' },
  { path: '/solutions', title: /把 AI 接进流程/, canonical: '/solutions' },
  { path: '/products', title: /产品与实验室/, canonical: '/products' },
  { path: '/products/gorgon-workbench', title: 'Gorgon Workbench', canonical: '/products/gorgon-workbench' },
  { path: '/products/local-ai-support', title: '本地 AI 智能客服', canonical: '/products/local-ai-support' },
  {
    path: '/products/local-model-lab',
    title: '本地模型与智能自动化',
    canonical: '/products/local-model-lab',
  },
  { path: '/technology', title: /技术不是堆叠名词/, canonical: '/technology' },
  { path: '/contact', title: /从一个具体问题/, canonical: '/contact' },
  { path: '/this-route-does-not-exist', title: /这个页面不存在/, canonical: '/404' },
];

for (const route of routes) {
  test(`direct load and refresh: ${route.path}`, async ({ page }) => {
    const errors = collectPageErrors(page);

    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await waitForPage(page);
    await expect(page.locator('main h1')).toContainText(route.title);

    expect(await page.title()).not.toHaveLength(0);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain(route.canonical);

    await page.reload();
    await waitForPage(page);
    await expect(page.locator('main h1')).toContainText(route.title);

    expect(errors).toEqual([]);
  });
}

test('no placeholder links or broken internal destinations', async ({ page }) => {
  await page.goto('/');
  await waitForPage(page);

  const hrefs = await page.locator('a[href]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href') ?? ''),
  );
  expect(hrefs.filter((href) => href === '#' || href === '' || href === 'javascript:void(0)')).toEqual(
    [],
  );

  const internal = [...new Set(hrefs.filter((href) => href.startsWith('/')))];
  for (const href of internal) {
    const response = await page.request.get(href);
    expect(response.status(), `internal link ${href}`).toBe(200);
  }
});

test('external links are secure and explicitly open a new tab', async ({ page }) => {
  await page.goto('/products');
  await waitForPage(page);

  const external = page.locator('a[href^="http"]');
  const count = await external.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const link = external.nth(index);
    expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
    expect(await link.getAttribute('target')).toBe('_blank');
    expect(await link.getAttribute('rel')).toMatch(/noopener/);
  }
});
