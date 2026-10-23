import { Link } from 'react-router-dom';
import { CtaBand } from '../components/CtaBand';
import { ArrowRight } from '../components/Icons';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

export function Solutions() {
  const { copy } = useLocale();
  const solutions = copy.solutions;

  usePageMeta(solutions.seo, '/solutions');

  return (
    <>
      <PageHero
        kicker={solutions.kicker}
        title={solutions.title}
        lead={solutions.lead}
        aside={
          <nav className="hero-index" aria-label={solutions.labels.directions}>
            {solutions.items.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                <span>{item.index}</span>
                {item.title}
              </a>
            ))}
          </nav>
        }
      />

      <section className="section solutions">
        <div className="container">
          <Reveal>
            <SectionHead
              kicker={solutions.labels.directions}
              title={solutions.directionsTitle}
              lead={solutions.directionsLead}
            />
          </Reveal>

          <div className="solution-list">
            {solutions.items.map((item) => (
              <Reveal key={item.id}>
                <article className="solution-block" id={item.id}>
                  <div className="solution-block__head">
                    <span className="solution-block__index" aria-hidden="true">
                      {item.index}
                    </span>
                    <div className="solution-block__title">
                      <span className="stage-pill">{item.status}</span>
                      <h2>{item.title}</h2>
                      <p>{item.summary}</p>
                      <ul className="tag-list">
                        {item.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="solution-block__details">
                    <div>
                      <h3>{solutions.labels.scenarios}</h3>
                      <ul className="dot-list">
                        {item.scenarios.map((scenario) => (
                          <li key={scenario}>{scenario}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>{solutions.labels.scope}</h3>
                      <ul className="dot-list">
                        {item.scope.map((scope) => (
                          <li key={scope}>{scope}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="solution-block__foot">
                    <p className="note-line">
                      <span>{solutions.labels.status}</span>
                      {item.note}
                    </p>
                    <Link className="text-link" to={`/contact?topic=${item.id}`}>
                      {copy.ui.discuss}
                      <ArrowRight />
                    </Link>
                  </div>
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
              kicker={solutions.labels.collaboration}
              title={solutions.collabTitle}
              lead={solutions.collabLead}
            />
          </Reveal>
          <div className="card-grid card-grid--four">
            {solutions.collabModes.map((mode, index) => (
              <Reveal key={mode.index} delay={index * 70}>
                <article className="mode-card">
                  <span className="mode-card__index">{mode.index}</span>
                  <h3>{mode.title}</h3>
                  <p>{mode.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker={copy.contact.kicker}
        title={solutions.ctaTitle}
        body={solutions.ctaBody}
        ctaLabel={solutions.cta}
      />
    </>
  );
}
