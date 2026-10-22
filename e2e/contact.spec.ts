import { expect, test } from '@playwright/test';
import { waitForPage } from './helpers';

test('preselects the topic from the query string and explains the static form', async ({ page }) => {
  await page.goto('/contact?topic=local-models');
  await waitForPage(page);

  await expect(page.getByLabel('想聊的方向')).toHaveValue('local-models');
  await expect(page.getByText('当前官网为静态版本：表单不会向服务器提交或存储数据')).toBeVisible();
  await expect(page.getByRole('link', { name: 'cvcingcvc@gmail.com' }).first()).toHaveAttribute(
    'href',
    'mailto:cvcingcvc@gmail.com',
  );
});

test('validates input, focuses the first error and never posts to a server', async ({ page }) => {
  const posts: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') posts.push(request.url());
  });

  await page.goto('/contact');
  await waitForPage(page);

  await page.getByRole('button', { name: /生成邮件/ }).click();

  await expect(page.getByRole('alert')).toContainText('请检查标记的字段');
  await expect(page.getByLabel('你的称呼')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('联系邮箱')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('想解决的问题')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('你的称呼')).toBeFocused();

  await page.getByLabel('你的称呼').fill('Ada Lovelace');
  await expect(page.getByText('请填写至少 2 个字符的称呼。')).toBeHidden();

  expect(posts).toEqual([]);
});

test('generates a real mailto draft with the selected topic', async ({ page }) => {
  await page.goto('/contact?topic=multi-device');
  await waitForPage(page);

  await page.getByLabel('你的称呼').fill('Ada Lovelace');
  await page.getByLabel('联系邮箱').fill('ada@example.org');
  await page.getByLabel('想解决的问题').fill('我们想评估手机发起、电脑执行的任务流程，需要人工批准。');
  await page.getByRole('button', { name: /生成邮件/ }).click();

  await expect(page.getByRole('heading', { name: '邮件草稿已生成' })).toBeVisible();
  const href = await page.getByRole('link', { name: /打开邮件客户端/ }).getAttribute('href');
  if (!href) throw new Error('The generated mailto link is missing.');
  expect(href).toMatch(/^mailto:cvcingcvc@gmail\.com\?/);

  const query = new URLSearchParams(href.slice(href.indexOf('?') + 1));
  expect(query.get('subject')).toContain('Ada Lovelace');
  expect(query.get('body')).toContain('多端协作与远程任务');
  expect(query.get('body')).toContain('我们想评估手机发起、电脑执行的任务流程');
});

test('solution discussion links open the contact form with the matching topic', async ({ page }) => {
  await page.goto('/solutions');
  await waitForPage(page);

  const firstDirection = page.locator('article.solution-block').first();
  await firstDirection.getByRole('link', { name: /讨论这个方向/ }).click();

  await expect(page).toHaveURL(/\/contact\?topic=agent-workflow$/);
  await expect(page.getByLabel('想聊的方向')).toHaveValue('agent-workflow');
});

test('product detail CTA carries the product topic into contact', async ({ page }) => {
  await page.goto('/products/local-ai-support');
  await waitForPage(page);

  await page.getByRole('link', { name: /询问这个项目/ }).first().click();
  await expect(page).toHaveURL(/\/contact\?topic=enterprise-support$/);
  await expect(page.getByLabel('想聊的方向')).toHaveValue('enterprise-support');
});
