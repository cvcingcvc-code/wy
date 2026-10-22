import { Link } from 'react-router-dom';
import { CtaBand } from '../components/CtaBand';
import { HeroSystem } from '../components/HeroSystem';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import { ParticleField } from '../components/ParticleField';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

export function Home() {
  const { copy } = useLocale();
  const home = copy.home;

  usePageMeta(home.seo, '/');

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          <ParticleField />
          <span className="hero__grid" />
          <span className="hero__glow hero__glow--a" />
          <span className="hero__glow hero__glow--b" />
        </div>

        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">{home.eyebrow}</p>
            <h1 id="hero-title" className="hero__title">
              {home.heroTitle.map((line, index) => (
                <span key={line} className={index === 1 ? 'is-accent' : undefined}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero__tagline">{home.heroTagline}</p>
            <p className="hero__lead">{home.heroLead}</p>

            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" to="/products">
                {home.primary}
                <ArrowRight />
              </Link>
              <Link className="btn btn--outline btn--lg" to="/contact">
                {home.secondary}
                <ArrowUpRight />
              </Link>
            </div>

            <ul className="hero__tags" aria-label={copy.home.directions.kicker}>
              {home.heroTags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <HeroSystem />
          </div>
        </div>

        <div className="container hero__foot">
          <span className="mono-label">{home.heroFoot.brand}</span>
          <span className="hero__scroll">
            <i aria-hidden="true" />
            {home.heroFoot.scroll}
          </span>
          <span className="mono-label">{home.heroFoot.version}</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((pass) => (
            <div className="marquee__group" key={pass}>
              {home.marquee.map((item) => (
                <span key={`${pass}-${item}`}>
                  {item}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section intro" aria-labelledby="intro-title">
        <div className="container">
          <Reveal>
            <SectionHead
              index={home.intro.index}
              kicker={home.intro.kicker}
              title={<span id="intro-title">{home.intro.title}</span>}
            />
          </Reveal>

          <div className="intro__grid">
            <Reveal className="intro__body">
              {home.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link className="text-link" to="/about">
                {home.intro.link}
                <ArrowRight />
              </Link>
            </Reveal>

            <Reveal delay={120} className="intro__cards">
              {home.intro.cards.map((card, index) => (
                <article className="intro-card" key={card.title}>
                  <span className="intro-card__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                </article>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section directions" aria-labelledby="directions-title">
        <div className="container">
          <Reveal>
            <SectionHead
              index={home.directions.index}
              kicker={home.directions.kicker}
              title={<span id="directions-title">{home.directions.title}</span>}
              lead={home.directions.lead}
            />
          </Reveal>

          <Reveal>
            <div className="direction-grid">
              {home.directions.items.map((item) => (
                <Link key={item.id} className="direction-card" to={`/solutions#${item.id}`}>
                  <div className="direction-card__top">
                    <span className="direction-card__index">{item.index}</span>
                    <ArrowUpRight className="icon direction-card__arrow" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <ul className="tag-list">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="section-foot">
              <Link className="text-link" to="/solutions">
                {copy.ui.learnMore}
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section products-section" aria-labelledby="products-title">
        <div className="container">
          <Reveal>
            <SectionHead
              index={home.products.index}
              kicker={home.products.kicker}
              title={<span id="products-title">{home.products.title}</span>}
              lead={home.products.lead}
            />
          </Reveal>

          <Reveal>
            <div className="product-grid">
              {copy.products.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                  featured={index === 0}
                />
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="section-foot section-foot--split">
              <p className="foot-note">{home.products.note}</p>
              <Link className="text-link" to="/products">
                {home.products.all}
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section scenarios" aria-labelledby="scenarios-title">
        <div className="container">
          <Reveal>
            <SectionHead
              index={home.scenarios.index}
              kicker={home.scenarios.kicker}
              title={<span id="scenarios-title">{home.scenarios.title}</span>}
              lead={home.scenarios.lead}
            />
          </Reveal>

          <Reveal>
            <ol className="scenario-list">
              {home.scenarios.items.map((item) => (
                <li className="scenario-row" key={item.index}>
                  <span className="scenario-row__index" aria-hidden="true">
                    {item.index}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul className="tag-list">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section tech-section" aria-labelledby="tech-title">
        <div className="container">
          <Reveal>
            <SectionHead
              index={home.tech.index}
              kicker={home.tech.kicker}
              title={<span id="tech-title">{home.tech.title}</span>}
              lead={home.tech.lead}
            />
          </Reveal>

          <Reveal>
            <div className="tech-panel">
              <div className="tech-panel__left">
                <div className="tech-points">
                  {home.tech.points.map((point, index) => (
                    <div className="tech-point" key={point.title}>
                      <span className="tech-point__index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3>{point.title}</h3>
                        <p>{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link className="text-link" to="/technology">
                  {home.tech.link}
                  <ArrowRight />
                </Link>
              </div>

              <div className="tech-orbit" aria-hidden="true">
                <span className="tech-orbit__ring" />
                <span className="tech-orbit__ring tech-orbit__ring--two" />
                <span className="tech-orbit__ring tech-orbit__ring--three" />
                <span className="tech-orbit__node tech-orbit__node--a" />
                <span className="tech-orbit__node tech-orbit__node--b" />
                <span className="tech-orbit__node tech-orbit__node--c" />
                <span className="tech-orbit__core">G</span>
                <span className="tech-orbit__label">HUMAN IN THE LOOP</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        kicker={home.cta.kicker}
        title={home.cta.title}
        body={home.cta.body}
        ctaLabel={home.cta.primary}
      />
    </>
  );
}
