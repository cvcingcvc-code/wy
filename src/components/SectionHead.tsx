import type { ReactNode } from 'react';

interface SectionHeadProps {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: string;
  className?: string;
}

export function SectionHead({ index, kicker, title, lead, className = '' }: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`.trim()}>
      <div className="section-head__meta">
        <span className="section-index">{index}</span>
        <span className="section-kicker">{kicker}</span>
      </div>
      <div className="section-head__body">
        <h2>{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
    </div>
  );
}
