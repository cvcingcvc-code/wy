import type { ReactNode } from 'react';

interface PageHeroProps {
  kicker: string;
  title: string | readonly string[];
  lead: string;
  aside?: ReactNode;
  children?: ReactNode;
}

export function PageHero({ kicker, title, lead, aside, children }: PageHeroProps) {
  const lines: readonly string[] = typeof title === 'string' ? [title] : title;

  return (
    <section className="page-hero">
      <div className="page-hero__decor" aria-hidden="true">
        <span className="page-hero__grid" />
        <span className="page-hero__glow" />
        <span className="page-hero__arc" />
      </div>
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <p className="eyebrow">{kicker}</p>
          <h1 className="page-hero__title">
            {lines.map((line, index) => (
              <span key={line} className={index === lines.length - 1 ? 'is-accent' : undefined}>
                {line}
              </span>
            ))}
          </h1>
          <p className="lede">{lead}</p>
          {children}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  );
}
