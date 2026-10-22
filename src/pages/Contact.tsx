import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import { ContactForm } from '../components/ContactForm';
import { EmailActions } from '../components/EmailActions';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SectionHead } from '../components/SectionHead';
import { siteConfig } from '../config/site';
import { useLocale } from '../lib/i18n';
import { usePageMeta } from '../lib/seo';

export function Contact() {
  const { copy } = useLocale();
  const contact = copy.contact;
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') ?? undefined;

  usePageMeta(contact.seo, '/contact');

  return (
    <>
      <PageHero kicker={contact.kicker} title={contact.title} lead={contact.lead} />

      <section className="section contact-section" id="contact-form">
        <div className="container contact-layout">
          <div className="contact-info">
            <Reveal>
              <div className="contact-card contact-card--email">
                <span className="mono-label">EMAIL / DIRECT</span>
                <h2>{contact.emailLabel}</h2>
                <EmailActions />
                <p className="contact-card__note">{contact.emailNote}</p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="contact-card">
                <span className="mono-label">REGISTERED ENTITY / CN</span>
                <h2>{contact.companyLabel}</h2>
                <p className="contact-card__strong">{siteConfig.legalName}</p>
                <p className="contact-card__note">{contact.companyNote}</p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="contact-card">
                <span className="mono-label">PUBLIC BUILD / GITHUB</span>
                <h2>{contact.githubLabel}</h2>
                <a
                  className="side-link"
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  github.com/cvcingcvc-code
                  <ArrowUpRight />
                  <span className="sr-only"> ({copy.ui.external})</span>
                </a>
                <Link className="text-link" to="/products">
                  {copy.nav[3].label}
                  <ArrowRight />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <ContactForm key={topic ?? 'default'} initialTopic={topic} />
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal>
            <SectionHead
              index="02"
              kicker={contact.labels.collaboration}
              title={contact.collaborationTitle}
              lead={contact.collaborationLead}
            />
          </Reveal>
          <ul className="topic-grid">
            {contact.form.topics.map((item, index) => (
              <li className="topic-card" key={item.value}>
                <span className="topic-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead index="03" kicker={contact.labels.faq} title={contact.faqTitle} />
          </Reveal>
          <Reveal className="faq-body">
            {contact.faqs.map((item, index) => (
              <details className="faq-item" key={item.q} open={index === 0}>
                <summary>
                  <span className="faq-item__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.q}
                  <span className="faq-item__icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
