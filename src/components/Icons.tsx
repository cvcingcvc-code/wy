type IconProps = { className?: string };

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false',
} as const;

export function ArrowUpRight({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function ArrowRight({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function CheckIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <path d="m3 8.5 3.2 3L13 4.8" />
    </svg>
  );
}

export function ClockIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <circle cx="8" cy="8" r="5.8" />
      <path d="M8 4.8V8l2.2 1.4" />
    </svg>
  );
}

export function BoundaryIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <path d="M8 2.2 13 4v4.1c0 2.9-2.1 4.9-5 5.7-2.9-.8-5-2.8-5-5.7V4l5-1.8Z" />
      <path d="M8 6v2.4M8 10.8v.2" />
    </svg>
  );
}

export function CopyIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <rect x="5.2" y="5.2" width="8.2" height="8.2" rx="1.4" />
      <path d="M10.8 3.4v-.4c0-.6-.5-1.1-1.1-1.1H3.9c-.6 0-1.1.5-1.1 1.1v5.8c0 .6.5 1.1 1.1 1.1h.4" />
    </svg>
  );
}

export function CloseIcon({ className = 'icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...baseProps}>
      <path d="m3.5 3.5 9 9m0-9-9 9" />
    </svg>
  );
}
