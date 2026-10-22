export const siteConfig = {
  brand: {
    zh: '戈尔贡科技',
    en: 'GORGON TECHNOLOGY',
  },
  legalName: '上海戈尔贡科技有限公司',
  tagline: {
    zh: '让智能技术，走进真实世界。',
    en: 'Building AI for Real-World Work.',
  },
  contact: {
    email: 'cvcingcvc@gmail.com',
    phone: null,
    address: null,
  },
  links: {
    github: 'https://github.com/cvcingcvc-code',
    websiteRepo: 'https://github.com/cvcingcvc-code/wy',
    workbenchRepo: 'https://github.com/cvcingcvc-code/cec',
    workbenchApk:
      'https://github.com/cvcingcvc-code/cec/releases/download/v0.3.6-alpha/gorgon-workbench-v0.3.6-alpha.apk',
    supportRepo: 'https://github.com/cvcingcvc-code/sales-skill-ai',
    labRepo: 'https://github.com/cvcingcvc-code/agent-growth-foundry',
  },
  updatedAt: '2026-10-23',
} as const;

const configuredOrigin = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();

export const siteOrigin = (
  configuredOrigin ||
  (typeof window !== 'undefined' ? window.location.origin : 'https://cvcingcvc-code.github.io')
).replace(/\/$/, '');

export const basePath = import.meta.env.BASE_URL;

export function absoluteUrl(path = '/'): string {
  const prefix = basePath.replace(/\/$/, '');
  const suffix = path === '/' || path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  return `${siteOrigin}${prefix}${suffix}`;
}

export const contactEmail = siteConfig.contact.email;
