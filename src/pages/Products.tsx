import { CtaBand } from '../components/CtaBand';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

const statuses = ['alpha', 'rnd', 'research'] as const;

export function Products() {
  const { copy } = useLocale();
  const page = copy.productsPage;

  usePageMeta(page.seo, '/products');

  return (
    <>
      <PageHero
        kicker={page.kicker}
        title={page.title}
        lead={page.lead}
        aside={
          <div className="hero-legend">
            <span className="mono-label">{copy.ui.statusLegend}</span>
            {statuses.map((status) => (
              <div className={`legend-item legend-item--${status}`} key={status}>
                <span aria-hidden="true" />
                {page.legend[status]}
              </div>
            ))}
          </div>
        }
      />

      <section className="section products-index">
        <div className="container">
          <Reveal>
            <div className="index-meta">
              <span className="mono-label">PRODUCT INDEX / 03</span>
              <p>{page.note}</p>
            </div>
          </Reveal>
          <h2 className="sr-only">{copy.nav[3].label}</h2>

          <Reveal>
            <div className="product-grid product-grid--index">
              {copy.products.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  featured={index === 0}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHead kicker={copy.ui.statusLegend} title={page.explainTitle} />
          </Reveal>
          <div className="status-explain">
            {statuses.map((status, index) => (
              <Reveal key={status} delay={index * 80}>
                <article className={`status-explain__item status-explain__item--${status}`}>
                  <div className="status-explain__head">
                    <span className="status__dot" aria-hidden="true" />
                    <h3>{page.legend[status]}</h3>
                  </div>
                  <p>{page.explainBody[index]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker={copy.contact.kicker}
        title={page.ctaTitle}
        body={page.ctaBody}
        ctaLabel={page.cta}
      />
    </>
  );
}
