import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';
import { CtaBand } from '../components/CtaBand';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

export function Technology() {
  const { copy } = useLocale();
  const tech = copy.technology;

  usePageMeta(tech.seo, '/technology');

  return (
    <>
      <PageHero
        kicker={tech.kicker}
        title={tech.title}
        lead={tech.lead}
        aside={
          <div className="hero-stack">
            <span className="mono-label">STACK / 05 LAYERS</span>
            <ol>
              {tech.layers.map((layer) => (
                <li key={layer.index}>
                  <span>{layer.index}</span>
                  {layer.title}
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              index="01"
              kicker={tech.labels.architecture}
              title={tech.architectureTitle}
              lead={tech.architectureLead}
            />
          </Reveal>

          <Reveal>
            <div className="architecture">
              <div className="architecture__rail" aria-hidden="true">
                <span>05</span>
                <i />
                <span>01</span>
              </div>
              <div className="architecture__layers">
                {tech.layers.map((layer) => (
                  <article className="arch-layer" key={layer.index}>
                    <span className="arch-layer__index">{layer.index}</span>
                    <div className="arch-layer__title">
                      <h3>{layer.title}</h3>
                      <span>{layer.subtitle}</span>
                    </div>
                    <ul className="tag-list">
                      {layer.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="foot-note architecture__note">{tech.architectureNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHead
              index="02"
              kicker={tech.labels.principles}
              title={tech.principlesTitle}
            />
          </Reveal>
          <div className="card-grid card-grid--three">
            {tech.principles.map((principle, index) => (
              <Reveal key={principle.index} delay={index * 60}>
                <article className="principle-card principle-card--numbered">
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
              kicker={tech.labels.loop}
              title={tech.loopTitle}
              lead={tech.loopLead}
            />
          </Reveal>
          <div className="loop-track">
            {tech.loop.map((step, index) => (
              <Reveal key={step.index} delay={index * 60}>
                <article className="loop-step">
                  <span className="loop-step__index">{step.index}</span>
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
            <SectionHead index="04" kicker={tech.labels.stack} title={tech.stackTitle} />
          </Reveal>
          <Reveal>
            <div className="stack-panel">
              <ul className="stack-panel__items">
                {tech.stack.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="foot-note">{tech.stackNote}</p>
              <Link className="text-link" to="/products">
                {copy.home.products.all}
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        kicker={copy.contact.kicker}
        title={tech.ctaTitle}
        body={tech.ctaBody}
        ctaLabel={tech.cta}
      />
    </>
  );
}
