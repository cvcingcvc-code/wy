import { describe, expect, it } from 'vitest';
import { contactEmail, siteConfig } from '../config/site';
import { dictionaries, en, zh } from '../content';
import type { Locale, ProductStatus } from '../content/types';

const locales: Locale[] = ['zh', 'en'];
const statuses: ProductStatus[] = ['alpha', 'rnd', 'research'];

describe('bilingual content parity', () => {
  it('mirrors navigation paths and labels', () => {
    expect(en.nav.map((item) => item.path)).toEqual(zh.nav.map((item) => item.path));
    expect(en.nav.map((item) => item.label)).not.toEqual(zh.nav.map((item) => item.label));
  });

  it('mirrors product slugs, direction ids and contact topics', () => {
    expect(en.products.map((item) => item.slug)).toEqual(zh.products.map((item) => item.slug));
    expect(en.solutions.items.map((item) => item.id)).toEqual(
      zh.solutions.items.map((item) => item.id),
    );
    expect(en.contact.form.topics.map((item) => item.value)).toEqual(
      zh.contact.form.topics.map((item) => item.value),
    );
    expect(en.home.directions.items.map((item) => item.id)).toEqual(
      zh.home.directions.items.map((item) => item.id),
    );
  });

  it('mirrors top-level dictionary keys', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(zh).sort());
    for (const locale of locales) {
      expect(dictionaries[locale].nav).toHaveLength(6);
      expect(dictionaries[locale].products).toHaveLength(3);
      expect(dictionaries[locale].solutions.items).toHaveLength(4);
    }
  });
});

describe('public navigation', () => {
  it('exposes the six required pages', () => {
    expect(zh.nav.map((item) => item.path)).toEqual([
      '/',
      '/about',
      '/solutions',
      '/products',
      '/technology',
      '/contact',
    ]);
  });

  it('keeps product detail routes distinct', () => {
    const slugs = zh.products.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain('gorgon-workbench');
    expect(slugs).toContain('local-ai-support');
    expect(slugs).toContain('local-model-lab');
  });
});

describe.each(locales)('%s product staging', (locale) => {
  const copy = dictionaries[locale];

  it('uses only the supported stage labels', () => {
    for (const product of copy.products) {
      expect(statuses).toContain(product.status);
      expect(product.statusLabel.length).toBeGreaterThan(0);
      expect(product.stageNote.length).toBeGreaterThan(20);
    }
  });

  it('gives every product real detail content and boundaries', () => {
    for (const product of copy.products) {
      expect(product.implemented.length).toBeGreaterThan(0);
      expect(product.inProgress.length).toBeGreaterThan(0);
      expect(product.boundaries.length).toBeGreaterThan(0);
      expect(product.stack.length).toBeGreaterThan(0);
      expect(product.demoNote.length).toBeGreaterThan(10);
    }
  });

  it('only exposes https links and never a placeholder destination', () => {
    const links = copy.products.flatMap((product) => Object.values(product.links));
    for (const link of links) {
      expect(link).toMatch(/^https:\/\//);
      expect(link).not.toMatch(/localhost|127\.0\.0\.1|example\.com|TODO/i);
    }
  });
});

describe('content safety rails', () => {
  it('uses the configured public contact email and no unconfirmed channels', () => {
    expect(contactEmail).toBe('cvcingcvc@gmail.com');
    expect(siteConfig.contact.phone).toBeNull();
    expect(siteConfig.contact.address).toBeNull();
    expect(zh.contact.faqs.length).toBeGreaterThan(0);
    expect(zh.contact.emailNote.length).toBeGreaterThan(0);
  });

  it('contains no placeholder or unfinished marketing copy', () => {
    const serialized = JSON.stringify(dictionaries);
    expect(serialized).not.toMatch(/lorem ipsum|待补充|undefined|TODO/i);
  });

  it('provides a title and description for every page', () => {
    const pages = [
      zh.home.seo,
      zh.about.seo,
      zh.solutions.seo,
      zh.productsPage.seo,
      zh.technology.seo,
      zh.contact.seo,
    ];
    for (const page of pages) {
      expect(page.title.length).toBeGreaterThan(8);
      expect(page.title.length).toBeLessThanOrEqual(80);
      expect(page.description.length).toBeGreaterThan(30);
      expect(page.description.length).toBeLessThanOrEqual(200);
    }
  });

  it('covers each product in the Chinese product detail copy', () => {
    expect(zh.productDetail.implementedNote.length).toBeGreaterThan(0);
    expect(zh.productDetail.boundariesTitle.length).toBeGreaterThan(0);
    expect(zh.productDetail.disclosure.length).toBeGreaterThan(0);
  });
});
