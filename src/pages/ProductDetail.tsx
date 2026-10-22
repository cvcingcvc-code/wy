import { Link, useParams } from 'react-router-dom';
import { CtaBand } from '../components/CtaBand';
import {
  ArrowRight,
  ArrowUpRight,
  BoundaryIcon,
  CheckIcon,
  ClockIcon,
} from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { StatusBadge } from '../components/StatusBadge';
import { siteConfig } from '../config/site';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';
import { NotFound } from './NotFound';

const topicByProduct: Record<string, string> = {
  'gorgon-workbench': 'agent-workflow',
  'local-ai-support': 'enterprise-support',
  'local-model-lab': 'local-models',
};

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { copy, locale } = useLocale();
  const labels = copy.productDetail;
  const product = copy.products.find((item) => item.slug === slug);

  usePageMeta(
    {
      title: product
        ? `${product.name}｜${labels.seoTitleSuffix}`
        : `${copy.ui.notFoundTitle}｜${labels.seoTitleSuffix}`,
      description: product?.summary ?? copy.ui.notFoundBody,
    },
    product ? `/products/${product.slug}` : '/products',
  );

  if (!product) {
    return <NotFound />;
  }

  const related = copy.products.filter((item) => item.slug !== product.slug);
  const contactTopic = topicByProduct[product.slug] ?? 'other';

  return (
    <>
      <section className="product-hero">
        <div className="product-hero__decor" aria-hidden="true">
          <span className="page-hero__grid" />
          <span className="page-hero__glow" />
        </div>
        <div className="container">
          <nav className="breadcrumb" aria-label={copy.ui.breadcrumb}>
            <Link to="/">{copy.ui.homeBreadcrumb}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/products">{labels.breadcrumb}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="product-hero__grid">
            <div className="product-hero__copy">
              <p className="eyebrow">{product.category}</p>
              <div className="product-hero__meta">
                <StatusBadge status={product.status} label={product.statusLabel} />
                <span className="mono-label">
                  {labels.updated} / {siteConfig.updatedAt}
                </span>
              </div>
              <h1>{product.name}</h1>
              <p className="lede">{product.summary}</p>
              <p className="stage-note">{product.stageNote}</p>
              <div className="product-hero__actions">
                {product.links.repo && (
                  <a
                    className="btn btn--primary"
                    href={product.links.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {labels.repo}
                    <ArrowUpRight />
                    <span className="sr-only"> ({copy.ui.external})</span>
                  </a>
                )}
                {product.links.download && (
                  <a
                    className="btn btn--outline"
                    href={product.links.download}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {labels.download}
                    <ArrowUpRight />
                    <span className="sr-only"> ({copy.ui.external})</span>
                  </a>
                )}
                <Link className="text-link" to={`/contact?topic=${contactTopic}`}>
                  {labels.askAbout}
                  <ArrowRight />
                </Link>
              </div>
            </div>

            <aside className="dossier">
              <span className="mono-label">PROJECT DOSSIER</span>
              <dl>
                <div>
                  <dt>{labels.status}</dt>
                  <dd>
                    <StatusBadge status={product.status} label={product.statusLabel} />
                  </dd>
                </div>
                <div>
                  <dt>{labels.stackTitle}</dt>
                  <dd>
                    <ul className="tag-list">
                      {product.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>{labels.demoNote}</dt>
                  <dd>{product.demoNote}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="section product-detail">
        <div className="container product-detail__layout">
          <div className="product-detail__main">
            <Reveal>
              <div className="detail-block">
                <span className="detail-block__index">01</span>
                <h2>{labels.overview}</h2>
                <p className="detail-overview">{product.description}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="detail-block">
                <span className="detail-block__index">02</span>
                <h2>{labels.implementedTitle}</h2>
                <p className="detail-block__note">{labels.implementedNote}</p>
                <ul className="check-list check-list--done">
                  {product.implemented.map((item) => (
                    <li key={item}>
                      <span className="check-list__icon" aria-hidden="true">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="detail-block">
                <span className="detail-block__index">03</span>
                <h2>{labels.inProgressTitle}</h2>
                <p className="detail-block__note">{labels.inProgressNote}</p>
                <ul className="check-list check-list--progress">
                  {product.inProgress.map((item) => (
                    <li key={item}>
                      <span className="check-list__icon" aria-hidden="true">
                        <ClockIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="detail-block detail-block--limits">
                <span className="detail-block__index">04</span>
                <h2>{labels.boundariesTitle}</h2>
                <p className="detail-block__note">{labels.boundariesNote}</p>
                <ul className="check-list check-list--limit">
                  {product.boundaries.map((item) => (
                    <li key={item}>
                      <span className="check-list__icon" aria-hidden="true">
                        <BoundaryIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <p className="detail-disclosure">{labels.disclosure}</p>
          </div>

          <aside className="product-detail__side">
            <div className="side-card">
              <span className="mono-label">{labels.linksTitle}</span>
              {product.links.repo && (
                <a
                  className="side-link"
                  href={product.links.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {labels.repo}
                  <ArrowUpRight />
                  <span className="sr-only"> ({copy.ui.external})</span>
                </a>
              )}
              {product.links.download && (
                <a
                  className="side-link"
                  href={product.links.download}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {labels.download}
                  <ArrowUpRight />
                  <span className="sr-only"> ({copy.ui.external})</span>
                </a>
              )}
              {product.links.demo ? (
                <a className="side-link" href={product.links.demo} target="_blank" rel="noreferrer noopener">
                  Demo
                  <ArrowUpRight />
                  <span className="sr-only"> ({copy.ui.external})</span>
                </a>
              ) : (
                <span className="side-muted">{labels.demoUnavailable}</span>
              )}
            </div>

            <div className="side-card side-card--note">
              <p>{product.demoNote}</p>
            </div>

            <Link className="side-cta" to={`/contact?topic=${contactTopic}`}>
              <span>{labels.askAbout}</span>
              <ArrowUpRight />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <div className="related-head">
              <h2>{labels.relatedTitle}</h2>
              <Link className="text-link" to="/products">
                {labels.back}
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
          <div className="related-grid">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <Link className="related-card" to={`/products/${item.slug}`}>
                  <div className="related-card__top">
                    <span className="mono-label">{item.category}</span>
                    <StatusBadge status={item.status} label={item.statusLabel} />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
                  <span className="text-link">
                    {copy.ui.viewDetails}
                    <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker={copy.contact.kicker}
        title={copy.contact.title.join(locale === 'zh' ? '' : ' ')}
        body={copy.contact.lead}
        ctaLabel={labels.contact}
      />
    </>
  );
}
