import type { ReactNode } from 'react';

interface SectionHeadProps {
  kicker: string;
  title: ReactNode;
  lead?: string;
  className?: string;
}

export function SectionHead({ kicker, title, lead, className = '' }: SectionHeadProps) {
  return (
    <div className={`section-head ${className}`.trim()}>
      <p className="section-kicker">{kicker}</p>
      <div className="section-head__body">
        <h2>{title}</h2>
        {lead && <p className="section-lead">{lead}</p>}
      </div>
    </div>
  );
}
