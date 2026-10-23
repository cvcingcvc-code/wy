import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const origin = (process.env.VITE_SITE_URL || 'https://cvcingcvc-code.github.io').replace(/\/$/, '');
const base = process.env.VITE_BASE || '/';
const prefix = base === '/' ? '' : base.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/solutions', priority: '0.9' },
  { path: '/products', priority: '0.9' },
  { path: '/products/gorgon-workbench', priority: '0.8' },
  { path: '/products/local-ai-support', priority: '0.7' },
  { path: '/products/local-model-lab', priority: '0.7' },
  { path: '/technology', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
];

function locationFor(path) {
  return `${origin}${prefix}${path}`;
}

const urls = routes
  .map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${locationFor(path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${locationFor('/sitemap.xml')}\n`;

const basePath = `${prefix}/`;
const redirectPage = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#05070d" />
    <title>正在打开 · 戈尔贡科技</title>
    <style>
      html { background: #05070d; color: #eef2f8; }
      body {
        display: grid;
        min-height: 100vh;
        margin: 0;
        place-items: center;
        font-family: system-ui, sans-serif;
        text-align: center;
      }
      p { margin: 12px 0; }
      a { color: #8fb8ff; }
    </style>
    <script>
      (function () {
        var target = location.pathname + location.search + location.hash;
        try {
          sessionStorage.setItem('gorgon:redirect', target);
        } catch (error) {
          /* storage unavailable: fall back to the home page below */
        }
        location.replace(${JSON.stringify(basePath)});
      })();
    </script>
  </head>
  <body>
    <main>
      <p>正在打开戈尔贡科技官网…</p>
      <p><a href="${basePath}">如果没有自动跳转，请点击这里</a></p>
    </main>
  </body>
</html>
`;

await writeFile(resolve(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(dist, 'robots.txt'), robots, 'utf8');
await writeFile(resolve(dist, '404.html'), redirectPage, 'utf8');
await writeFile(resolve(dist, '.nojekyll'), '', 'utf8');

console.log(`postbuild: sitemap + robots written for ${origin}${prefix || '/'}; 404.html redirect and .nojekyll ready.`);
