export type Locale = 'zh' | 'en';

export type ProductStatus = 'alpha' | 'rnd' | 'research';

export interface NavItem {
  path: string;
  label: string;
}

export interface CtaLink {
  label: string;
  to: string;
}

export interface DirectionSummary {
  id: string;
  index: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface Direction extends DirectionSummary {
  status: string;
  scenarios: string[];
  scope: string[];
  note: string;
}

export interface ProductLinkSet {
  repo?: string;
  download?: string;
  demo?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  status: ProductStatus;
  statusLabel: string;
  summary: string;
  description: string;
  stageNote: string;
  implemented: string[];
  inProgress: string[];
  boundaries: string[];
  stack: string[];
  links: ProductLinkSet;
  demoNote: string;
}

/**
 * Turns the literal types produced by `as const` into their widened
 * counterparts so the English copy can be checked against the Chinese shape.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T;
