import { useRef, useState, type FormEvent } from 'react';
import { contactEmail } from '../config/site';
import { useLocale } from '../lib/i18n';
import {
  buildInquiryMailto,
  validateInquiry,
  type InquiryErrorField,
  type InquiryValues,
} from '../lib/mailto';
import { ArrowUpRight, CheckIcon } from './Icons';

function fieldErrorId(field: InquiryErrorField): string {
  return `inquiry-${field}-error`;
}

export function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const { copy } = useLocale();
  const formCopy = copy.contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<InquiryValues>({
    name: '',
    email: '',
    company: '',
    topic: formCopy.topics.some((item) => item.value === initialTopic)
      ? (initialTopic as string)
      : 'other',
    message: '',
  });
  const [errors, setErrors] = useState<InquiryErrorField[]>([]);
  const [mailto, setMailto] = useState<string | null>(null);

  function update(field: keyof InquiryValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field === 'name' || field === 'email' || field === 'company' || field === 'message') {
      setErrors((current) => current.filter((item) => item !== field));
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    if (nextErrors.length > 0) {
      const first = nextErrors[0];
      const input = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      input?.focus();
      return;
    }

    const topicLabel =
      formCopy.topics.find((item) => item.value === values.topic)?.label ?? formCopy.topics[4]?.label ?? '';
    const href = buildInquiryMailto(values, topicLabel ?? '', {
      name: formCopy.name,
      email: formCopy.email,
      company: formCopy.company,
      topic: formCopy.topic,
      message: formCopy.message,
      source: formCopy.source,
    });
    setMailto(href);
    window.setTimeout(() => {
      window.location.href = href;
    }, 80);
  }

  return (
    <div className="contact-form">
      <div className="contact-form__head">
        <p className="eyebrow">EMAIL / INQUIRY</p>
        <h2>{formCopy.title}</h2>
        <p>{formCopy.description}</p>
      </div>

      {mailto ? (
        <div className="form-generated" role="status" aria-live="polite">
          <span className="form-generated__icon" aria-hidden="true">
            <CheckIcon />
          </span>
          <div>
            <h3>{formCopy.statusTitle}</h3>
            <p>{formCopy.statusBody}</p>
            <a className="btn btn--primary" href={mailto}>
              {formCopy.statusLink}
              <ArrowUpRight />
            </a>
            <p className="form-privacy">{formCopy.privacy}</p>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="inquiry-name">{formCopy.name}</label>
              <input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                maxLength={80}
                placeholder={formCopy.namePh}
                value={values.name}
                onChange={(event) => update('name', event.target.value)}
                aria-invalid={errors.includes('name')}
                aria-describedby={errors.includes('name') ? fieldErrorId('name') : undefined}
                required
              />
              {errors.includes('name') && (
                <p className="field-error" id={fieldErrorId('name')}>
                  {formCopy.errors.name}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-email">{formCopy.email}</label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={254}
                placeholder={formCopy.emailPh}
                value={values.email}
                onChange={(event) => update('email', event.target.value)}
                aria-invalid={errors.includes('email')}
                aria-describedby={errors.includes('email') ? fieldErrorId('email') : undefined}
                required
              />
              {errors.includes('email') && (
                <p className="field-error" id={fieldErrorId('email')}>
                  {formCopy.errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-company">{formCopy.company}</label>
              <input
                id="inquiry-company"
                name="company"
                autoComplete="organization"
                maxLength={160}
                placeholder={formCopy.companyPh}
                value={values.company}
                onChange={(event) => update('company', event.target.value)}
                aria-invalid={errors.includes('company')}
                aria-describedby={errors.includes('company') ? fieldErrorId('company') : undefined}
              />
              {errors.includes('company') && (
                <p className="field-error" id={fieldErrorId('company')}>
                  {formCopy.errors.company}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="inquiry-topic">{formCopy.topic}</label>
              <select
                id="inquiry-topic"
                name="topic"
                value={values.topic}
                onChange={(event) => update('topic', event.target.value)}
              >
                {formCopy.topics.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="inquiry-message">{formCopy.message}</label>
              <textarea
                id="inquiry-message"
                name="message"
                rows={5}
                maxLength={2000}
                placeholder={formCopy.messagePh}
                value={values.message}
                onChange={(event) => update('message', event.target.value)}
                aria-invalid={errors.includes('message')}
                aria-describedby={errors.includes('message') ? fieldErrorId('message') : undefined}
                required
              />
              {errors.includes('message') && (
                <p className="field-error" id={fieldErrorId('message')}>
                  {formCopy.errors.message}
                </p>
              )}
            </div>
          </div>

          {errors.length > 0 && (
            <p className="form-summary-error" role="alert">
              {formCopy.errorSummary}
            </p>
          )}

          <button className="btn btn--primary form-submit" type="submit">
            {formCopy.submit}
            <ArrowUpRight />
          </button>

          <p className="form-privacy">{formCopy.privacy}</p>
          <p className="form-fallback">
            {formCopy.mailtoFallback}{' '}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </form>
      )}
    </div>
  );
}
