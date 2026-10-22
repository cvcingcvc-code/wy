import { Link } from 'react-router-dom';
import { contactEmail, siteConfig } from '../config/site';
import { useLocale } from '../lib/i18n';
import { ArrowUpRight } from './Icons';
import { GorgonMark as Mark } from './Logo';

export function Footer() {
  const { copy } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__lockup" aria-label={copy.logo.aria}>
              <Mark className="site-footer__mark" />
              <span>
                <strong>GORGON</strong>{' '}
                <small>TECHNOLOGY</small>
              </span>
            </Link>
            <p>{copy.footer.tagline}</p>
            <span className="mono-label">SHANGHAI · GORGON TECHNOLOGY</span>
          </div>

          <div className="site-footer__col">
            <h2 className="footer-title">{copy.footer.navTitle}</h2>
            <nav aria-label={copy.ui.footerNav}>
              {copy.nav.map((item) => (
                <Link key={item.path} to={item.path}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__col">
            <h2 className="footer-title">{copy.footer.contactTitle}</h2>
            <a href={`mailto:${contactEmail}`} className="footer-email">
              {contactEmail}
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer noopener">
              GitHub
              <ArrowUpRight />
              <span className="sr-only"> ({copy.ui.external})</span>
            </a>
            <Link to="/contact">{copy.ui.contactCta}</Link>
          </div>

          <div className="site-footer__col site-footer__build">
            <h2 className="footer-title">{copy.footer.buildTitle}</h2>
            <p>{copy.footer.buildText}</p>
            <p className="site-footer__updated">{copy.footer.updated}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {siteConfig.legalName}
            <span aria-hidden="true"> · </span>
            {copy.footer.rights}
          </p>
          <p className="site-footer__legal-note">{copy.footer.disclaimer}</p>
          <button
            type="button"
            className="footer-top"
            onClick={() => {
              const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
            }}
          >
            {copy.footer.backTop}
            <Mark className="footer-top__mark" />
          </button>
        </div>
      </div>
    </footer>
  );
}
