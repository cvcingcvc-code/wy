import { Link } from 'react-router-dom';
import { useLocale } from '../lib/i18n';

export function GorgonMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <circle cx="32" cy="32" r="25" stroke="currentColor" strokeOpacity="0.16" />
      <circle
        cx="32"
        cy="32"
        r="29.5"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeDasharray="1 7"
      />
      <path
        d="M45.5 22.8A16 16 0 1 0 48 32H34"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M34 32h14"
        stroke="var(--accent, #5b9dff)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="2.5" fill="var(--accent, #5b9dff)" />
      <circle cx="48" cy="32" r="2.1" fill="var(--accent, #5b9dff)" />
      <path
        d="M48 32l5-8"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <circle cx="53" cy="24" r="1.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="16.5" cy="46.5" r="1.4" fill="var(--accent, #5b9dff)" fillOpacity="0.75" />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: () => void }) {
  const { copy } = useLocale();
  return (
    <Link className="brand" to="/" aria-label={copy.logo.aria} onClick={onClick}>
      <GorgonMark className="brand__mark" />
      <span className="brand__type" aria-hidden="true">
        <strong>GORGON</strong>
        <span>TECHNOLOGY</span>
      </span>
    </Link>
  );
}
