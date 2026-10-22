import { Link } from 'react-router-dom';
import type { Product } from '../content';
import { useLocale } from '../lib/i18n';
import { ArrowRight, ArrowUpRight } from './Icons';
import { StatusBadge } from './StatusBadge';

export function ProductCard({
  product,
  index,
  featured = false,
}: {
  product: Product;
  index: number;
  featured?: boolean;
}) {
  const { copy } = useLocale();

  return (
    <article
      className={`product-card${featured ? ' product-card--featured' : ''} product-card--${product.status}`}
    >
      <div className="product-card__top">
        <span className="product-card__category">{product.category}</span>
        <StatusBadge status={product.status} label={product.statusLabel} />
      </div>

      <div className="product-card__body">
        <span className="product-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3>{product.name}</h3>
        <p className="product-card__summary">{product.summary}</p>
        <p className="product-card__stage">{product.stageNote}</p>

        <ul className="tag-list" aria-label={copy.productDetail.stackTitle}>
          {product.stack.slice(0, featured ? 6 : 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {featured && (
        <div className="product-card__diagram" aria-hidden="true">
          <span className="pcd-orbit pcd-orbit--one" />
          <span className="pcd-orbit pcd-orbit--two" />
          <span className="pcd-axis" />
          <span className="pcd-node pcd-node--a" />
          <span className="pcd-node pcd-node--b" />
          <span className="pcd-node pcd-node--c" />
          <span className="pcd-label">TRACEABLE / BOUNDED</span>
        </div>
      )}

      <div className="product-card__actions">
        <Link className="text-link" to={`/products/${product.slug}`}>
          {copy.ui.viewDetails}
          <ArrowRight />
        </Link>
        {product.links.repo ? (
          <a
            className="text-link text-link--muted"
            href={product.links.repo}
            target="_blank"
            rel="noreferrer noopener"
          >
            {copy.ui.visitRepo}
            <ArrowUpRight />
            <span className="sr-only"> ({copy.ui.external})</span>
          </a>
        ) : (
          <span className="text-link text-link--disabled">{copy.ui.demoUnavailable}</span>
        )}
      </div>
    </article>
  );
}
