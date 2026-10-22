import { en } from './en';
import { zh, type SiteCopy } from './zh';
import type { Locale } from './types';

export const dictionaries: Record<Locale, SiteCopy> = { zh, en };

export { en, zh };
export type { SiteCopy };
export type { Direction, DirectionSummary, Locale, NavItem, Product, ProductStatus } from './types';
