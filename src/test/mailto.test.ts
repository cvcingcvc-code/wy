import { describe, expect, it } from 'vitest';
import { contactEmail } from '../config/site';
import { buildInquiryMailto, validateInquiry, type InquiryValues, type MailLabels } from '../lib/mailto';

const validValues: InquiryValues = {
  name: 'Ada',
  email: 'ada@example.org',
  company: 'Analytical Engines',
  topic: 'agent-workflow',
  message: 'We need a traceable agent workflow for a support team.',
};

const labels: MailLabels = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  topic: 'Topic',
  message: 'Message',
  source: 'Website form',
};

describe('validateInquiry', () => {
  it('accepts a complete inquiry', () => {
    expect(validateInquiry(validValues)).toEqual([]);
  });

  it('trims whitespace before checking lengths', () => {
    expect(validateInquiry({ ...validValues, name: '  A  ' })).toContain('name');
    expect(validateInquiry({ ...validValues, message: '   short   ' })).toContain('message');
  });

  it('rejects invalid contact details', () => {
    expect(validateInquiry({ ...validValues, email: 'not-an-email' })).toContain('email');
    expect(validateInquiry({ ...validValues, email: 'a@b' })).toContain('email');
    expect(validateInquiry({ ...validValues, name: '' })).toContain('name');
  });

  it('rejects values beyond the configured limits', () => {
    expect(validateInquiry({ ...validValues, name: 'x'.repeat(81) })).toContain('name');
    expect(validateInquiry({ ...validValues, email: `${'x'.repeat(250)}@a.io` })).toContain(
      'email',
    );
    expect(validateInquiry({ ...validValues, message: 'x'.repeat(2001) })).toContain('message');
  });

  it('allows an empty optional company but caps its length', () => {
    expect(validateInquiry({ ...validValues, company: '' })).toEqual([]);
    expect(validateInquiry({ ...validValues, company: 'x'.repeat(161) })).toContain('company');
  });
});

describe('buildInquiryMailto', () => {
  it('targets the configured mailbox', () => {
    const href = buildInquiryMailto(validValues, 'Agent workflow', labels);
    expect(href.startsWith(`mailto:${contactEmail}?`)).toBe(true);
  });

  it('encodes the subject and body, including user special characters', () => {
    const values: InquiryValues = {
      ...validValues,
      name: 'Ada & Co?',
      company: 'R&D #1',
      message: 'Line one\nLine two & 100% safe?',
    };
    const href = buildInquiryMailto(values, 'Local models', labels);
    const query = new URLSearchParams(href.slice(href.indexOf('?') + 1));
    const subject = query.get('subject') ?? '';
    const body = query.get('body') ?? '';

    expect(subject).toBe('[GORGON] Ada & Co? · R&D #1');
    expect(body).toContain('Name: Ada & Co?');
    expect(body).toContain('Company: R&D #1');
    expect(body).toContain('Topic: Local models');
    expect(body).toContain('Line one\nLine two & 100% safe?');
    expect(body).toContain('Website form');
    expect(href).not.toContain(' ');
  });

  it('omits an empty company from the subject but keeps the body label', () => {
    const href = buildInquiryMailto({ ...validValues, company: '   ' }, 'Other', labels);
    const query = new URLSearchParams(href.slice(href.indexOf('?') + 1));
    const subject = query.get('subject') ?? '';
    const body = query.get('body') ?? '';

    expect(subject).toBe('[GORGON] Ada');
    expect(body).toContain('Company: -');
  });
});
