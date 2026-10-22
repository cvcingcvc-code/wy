import { useEffect } from 'react';
import { absoluteUrl, siteConfig } from '../config/site';

export interface SeoCopy {
  title: string;
  description: string;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

export function usePageMeta(seo: SeoCopy, path: string): void {
  useEffect(() => {
    document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', absoluteUrl(path));
    setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteUrl('/og.png'));
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.brand.zh);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteUrl('/og.png'));
    setCanonical(absoluteUrl(path));
    const locale = document.documentElement.lang === 'en' ? 'en_US' : 'zh_CN';
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', locale);
  }, [path, seo.description, seo.title]);
}
