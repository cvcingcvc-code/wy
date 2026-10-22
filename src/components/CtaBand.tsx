import { Link } from 'react-router-dom';
import { contactEmail } from '../config/site';
import { useLocale } from '../lib/i18n';
import { ArrowUpRight } from './Icons';

interface CtaBandProps {
  kicker: string;
  title: string;
  body: string;
  ctaLabel: string;
}

export function CtaBand({ kicker, title, body, ctaLabel }: CtaBandProps) {
  const { copy } = useLocale();

  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-band__panel">
          <div className="cta-band__decor" aria-hidden="true">
            <span className="cta-orbit cta-orbit--one" />
            <span className="cta-orbit cta-orbit--two" />
            <span className="cta-glow" />
          </div>
          <p className="eyebrow">{kicker}</p>
          <h2>{title}</h2>
          <p className="cta-band__body">{body}</p>
          <div className="cta-band__actions">
            <Link className="btn btn--primary" to="/contact">
              {ctaLabel}
              <ArrowUpRight />
            </Link>
            <a className="cta-band__email" href={`mailto:${contactEmail}`}>
              {copy.ui.emailCta} · {contactEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
