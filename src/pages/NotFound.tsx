import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

export function NotFound() {
  const { copy } = useLocale();

  usePageMeta(
    {
      title: `404 · ${copy.ui.notFoundTitle}｜${copy.productDetail.seoTitleSuffix}`,
      description: copy.ui.notFoundBody,
    },
    '/404',
  );

  return (
    <section className="not-found">
      <div className="not-found__decor" aria-hidden="true">
        <span className="page-hero__grid" />
        <span className="page-hero__glow" />
        <span className="not-found__ring" />
      </div>
      <div className="container not-found__inner">
        <span className="not-found__code" aria-hidden="true">
          404
        </span>
        <p className="eyebrow">GORGON / SIGNAL LOST</p>
        <h1>{copy.ui.notFoundTitle}</h1>
        <p className="lede">{copy.ui.notFoundBody}</p>
        <div className="not-found__actions">
          <Link className="btn btn--primary" to="/">
            {copy.ui.backHome}
            <ArrowUpRight />
          </Link>
          <Link className="btn btn--outline" to="/products">
            {copy.ui.productsBreadcrumb}
            <ArrowRight />
          </Link>
        </div>
        <nav className="not-found__nav" aria-label={copy.ui.menuLabel}>
          {copy.nav.slice(1).map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
