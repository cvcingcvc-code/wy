import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const svg = await readFile(resolve(process.cwd(), 'public', 'og.svg'), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.setContent(
  `<!doctype html><html><head><style>
    html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #05070d; }
    svg { display: block; }
  </style></head><body>${svg}</body></html>`,
  { waitUntil: 'load' },
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: resolve(process.cwd(), 'public', 'og.png'), type: 'png' });
await browser.close();
console.log('og: public/og.png generated (1200x630).');
