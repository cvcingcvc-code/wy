import { contactEmail } from '../config/site';

export interface InquiryValues {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
}

export type InquiryErrorField = 'name' | 'email' | 'company' | 'message';

export interface MailLabels {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
  source: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(values: InquiryValues): InquiryErrorField[] {
  const errors: InquiryErrorField[] = [];
  const name = values.name.trim();
  const email = values.email.trim();
  const company = values.company.trim();
  const message = values.message.trim();

  if (name.length < 2 || name.length > 80) errors.push('name');
  if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.push('email');
  if (company.length > 160) errors.push('company');
  if (message.length < 10 || message.length > 2000) errors.push('message');

  return errors;
}

export function buildInquiryMailto(
  values: InquiryValues,
  topicLabel: string,
  labels: MailLabels,
): string {
  const company = values.company.trim();
  const subject = `[GORGON] ${values.name.trim()}${company ? ` · ${company}` : ''}`;
  const body = [
    `${labels.name}: ${values.name.trim()}`,
    `${labels.email}: ${values.email.trim()}`,
    `${labels.company}: ${company || '-'}`,
    `${labels.topic}: ${topicLabel}`,
    '',
    `${labels.message}:`,
    values.message.trim(),
    '',
    '---',
    labels.source,
  ].join('\n');

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
