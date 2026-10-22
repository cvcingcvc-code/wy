import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LocaleProvider, useLocale } from '../lib/i18n';

function Probe() {
  const { locale, setLocale, copy } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span>{copy.ui.skip}</span>
      <button type="button" onClick={() => setLocale('en')}>
        switch
      </button>
    </div>
  );
}

describe('LocaleProvider', () => {
  it('defaults to Chinese and mirrors the locale onto <html>', () => {
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('zh');
    expect(screen.getByText('跳至正文')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.documentElement.dataset.locale).toBe('zh');
  });

  it('switches language, persists it and updates the document language', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'switch' }));

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
    expect(window.localStorage.getItem('gorgon-locale')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('restores a persisted English preference', () => {
    window.localStorage.setItem('gorgon-locale', 'en');
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('falls back to Chinese for unknown stored values', () => {
    window.localStorage.setItem('gorgon-locale', 'fr');
    render(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('zh');
  });
});
