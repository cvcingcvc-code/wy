import { copyFile, writeFile } from 'node:fs/promises';
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

await writeFile(resolve(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(dist, 'robots.txt'), robots, 'utf8');
await copyFile(resolve(dist, 'index.html'), resolve(dist, '404.html'));
await writeFile(resolve(dist, '.nojekyll'), '', 'utf8');

console.log(`postbuild: sitemap + robots written for ${origin}${prefix || '/'}; 404.html and .nojekyll ready.`);
