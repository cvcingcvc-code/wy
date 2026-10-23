import type { ProductStatus } from '../content';

export function StatusBadge({ status, label }: { status: ProductStatus; label: string }) {
  return (
    <span className={`status status--${status}`}>
      <span className="status__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
