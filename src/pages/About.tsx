import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BoundaryIcon } from '../components/Icons';
import { CtaBand } from '../components/CtaBand';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { StatusBadge } from '../components/StatusBadge';
import { contactEmail, siteConfig } from '../config/site';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

export function About() {
  const { copy } = useLocale();
  const about = copy.about;

  usePageMeta(about.seo, '/about');

  return (
    <>
      <PageHero
        kicker={about.kicker}
        title={about.title}
        lead={about.lead}
        aside={
          <div className="hero-aside">
            <span className="mono-label">GORGON / SHANGHAI</span>
            <p className="hero-aside__name">{siteConfig.legalName}</p>
            <p className="hero-aside__tagline">{copy.footer.tagline}</p>
            <dl className="hero-aside__facts">
              <div>
                <dt>{copy.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </dd>
              </div>
              <div>
                <dt>{copy.ui.updatedLabel}</dt>
                <dd>{siteConfig.updatedAt}</dd>
              </div>
            </dl>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead index="01" kicker={about.labels.story} title={about.storyTitle} />
          </Reveal>
          <div className="story-grid">
            <Reveal>
              <p className="story-grid__lead">{about.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={100} className="story-grid__body">
              {about.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHead
              index="02"
              kicker={about.labels.principles}
              title={about.principlesTitle}
            />
          </Reveal>
          <div className="card-grid card-grid--three">
            {about.principles.map((principle, index) => (
              <Reveal key={principle.index} delay={index * 80}>
                <article className="principle-card">
                  <span className="principle-card__index">{principle.index}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              index="03"
              kicker={about.labels.process}
              title={about.processTitle}
              lead={about.processLead}
            />
          </Reveal>
          <div className="step-grid">
            {about.process.map((step, index) => (
              <Reveal key={step.index} delay={index * 70}>
                <article className="step-card">
                  <span className="step-card__index">{step.index}</span>
                  <span className="step-card__line" aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHead
              index="04"
              kicker={about.labels.boundaries}
              title={about.boundariesTitle}
              lead={about.boundariesLead}
            />
          </Reveal>
          <Reveal>
            <div className="boundary-panel">
              <span className="boundary-panel__icon" aria-hidden="true">
                <BoundaryIcon />
              </span>
              <ul>
                {about.boundaries.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              index="05"
              kicker={about.labels.now}
              title={about.nowTitle}
              lead={about.nowLead}
            />
          </Reveal>
          <div className="now-list">
            {copy.products.map((product) => (
              <Link className="now-row" to={`/products/${product.slug}`} key={product.slug}>
                <span className="now-row__category">{product.category}</span>
                <span className="now-row__name">{product.name}</span>
                <StatusBadge status={product.status} label={product.statusLabel} />
                <ArrowUpRight className="icon now-row__arrow" />
              </Link>
            ))}
          </div>
          <Reveal>
            <div className="section-foot">
              <Link className="text-link" to="/products">
                {about.link}
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        kicker={copy.contact.kicker}
        title={about.ctaTitle}
        body={about.ctaBody}
        ctaLabel={about.cta}
      />
    </>
  );
}
