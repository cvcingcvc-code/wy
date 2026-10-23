import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactForm } from '../components/ContactForm';
import { LocaleProvider } from '../lib/i18n';

function renderForm(initialTopic?: string) {
  return render(
    <LocaleProvider initialLocale="zh">
      <ContactForm initialTopic={initialTopic} />
    </LocaleProvider>,
  );
}

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('ContactForm', () => {
  it('preselects a valid topic from the query string', () => {
    renderForm('local-models');
    expect(screen.getByLabelText('想聊的方向')).toHaveValue('local-models');
  });

  it('falls back to "other" for an unknown topic', () => {
    renderForm('does-not-exist');
    expect(screen.getByLabelText('想聊的方向')).toHaveValue('other');
  });

  it('validates required fields, focuses the first error and never submits', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /生成邮件/ }));

    expect(screen.getByRole('alert')).toHaveTextContent('请检查标记的字段');
    expect(screen.getByRole('textbox', { name: '你的称呼' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('textbox', { name: '联系邮箱' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('textbox', { name: '想解决的问题' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('textbox', { name: '你的称呼' })).toHaveFocus();
    expect(screen.queryByRole('heading', { name: '邮件草稿已生成' })).not.toBeInTheDocument();
  });

  it('clears a field error once the user edits it', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /生成邮件/ }));
    expect(screen.getByText('请填写至少 2 个字符的称呼。')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: '你的称呼' }), 'Ada');
    expect(screen.queryByText('请填写至少 2 个字符的称呼。')).not.toBeInTheDocument();
  });

  it('builds a mailto draft with the selected topic instead of storing data', () => {
    vi.useFakeTimers();
    renderForm('local-models');

    fireEvent.change(screen.getByRole('textbox', { name: '你的称呼' }), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: '联系邮箱' }), {
      target: { value: 'ada@example.org' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: '想解决的问题' }), {
      target: { value: '我们需要一个可追溯的智能体工作流来支持客服团队。' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /生成邮件/ }).closest('form')!);

    expect(screen.getByRole('heading', { name: '邮件草稿已生成' })).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /打开邮件客户端/ });
    const href = link.getAttribute('href') ?? '';
    const query = new URLSearchParams(href.slice(href.indexOf('?') + 1));

    expect(href.startsWith('mailto:cvcingcvc@gmail.com?')).toBe(true);
    expect(query.get('subject')).toContain('Ada Lovelace');
    expect(query.get('body')).toContain('本地 AI 模型与私有化部署');
    expect(query.get('body')).toContain('我们需要一个可追溯的智能体工作流来支持客服团队。');

    vi.clearAllTimers();
  });
});
