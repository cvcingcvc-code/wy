import { useLocale } from '../lib/i18n';

export function HeroSystem() {
  const { copy } = useLocale();
  const [agent, workflow, knowledge, human] = copy.home.systemLabels;

  return (
    <div className="hero-system" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="hero-system__svg" focusable="false">
        <defs>
          <radialGradient id="hs-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5B9DFF" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#5B9DFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hs-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8FC0FF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#57E6D9" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <g className="hs-grid">
          <path d="M300 26v548M26 300h548" />
          <circle cx="300" cy="300" r="268" />
        </g>

        <circle cx="300" cy="300" r="210" fill="url(#hs-core)" />

        <g className="hs-orbit hs-orbit--outer">
          <circle cx="300" cy="300" r="246" className="hs-ring hs-ring--dash" />
          <circle cx="300" cy="54" r="4.5" className="hs-node hs-node--accent" />
          <circle cx="546" cy="300" r="3" className="hs-node" />
          <circle cx="300" cy="546" r="3.5" className="hs-node hs-node--accent" />
          <circle cx="54" cy="300" r="2.5" className="hs-node" />
        </g>

        <g className="hs-orbit hs-orbit--inner">
          <circle cx="300" cy="300" r="182" className="hs-ring" />
          <path d="M300 118A182 182 0 0 1 482 300" className="hs-arc" />
          <circle cx="482" cy="300" r="3" className="hs-node hs-node--accent" />
        </g>

        <circle cx="300" cy="300" r="128" className="hs-ring hs-ring--soft" />
        <path d="M300 172 410 365H190Z" className="hs-triangle" />
        <path d="M300 172v128l110 65M300 300l-110 65" className="hs-link" />
        <circle cx="300" cy="172" r="4" className="hs-node hs-node--accent" />
        <circle cx="410" cy="365" r="4" className="hs-node" />
        <circle cx="190" cy="365" r="4" className="hs-node" />

        <circle cx="300" cy="300" r="72" className="hs-core-ring" />
        <g transform="translate(264 264) scale(1.125)">
          <path
            d="M45.5 22.8A16 16 0 1 0 48 32H34"
            fill="none"
            stroke="#EEF3FF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M34 32h14"
            fill="none"
            stroke="#5B9DFF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="2.4" fill="#5B9DFF" />
          <circle cx="48" cy="32" r="2" fill="#5B9DFF" />
          <path
            d="M48 32l5-8"
            fill="none"
            stroke="#EEF3FF"
            strokeOpacity="0.5"
            strokeWidth="1.1"
          />
          <circle cx="53" cy="24" r="1.4" fill="#EEF3FF" fillOpacity="0.8" />
        </g>

        <g className="hs-labels">
          <text x="300" y="22" textAnchor="middle">{agent}</text>
          <text x="580" y="304" textAnchor="end">{workflow}</text>
          <text x="300" y="590" textAnchor="middle">{knowledge}</text>
          <text x="20" y="304" textAnchor="start">{human}</text>
        </g>

        <g className="hs-ticks">
          <path d="M300 244v14M300 342v14M244 300h14M342 300h14" />
        </g>
      </svg>
      <span className="hero-system__caption">SYSTEM MAP / BOUNDED AUTONOMY</span>
    </div>
  );
}
