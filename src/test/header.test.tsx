import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from '../components/Header';
import { LocaleProvider } from '../lib/i18n';

function renderHeader() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <LocaleProvider initialLocale="zh">
        <Header />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe('Header navigation', () => {
  it('renders the six primary destinations and a skip link', () => {
    renderHeader();

    const nav = screen.getByRole('navigation', { name: '网站导航' });
    expect(nav).toBeInTheDocument();
    for (const label of ['首页', '关于我们', '技术与解决方案', '产品与实验室', '技术理念', '联系我们']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: '跳至正文' })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });

  it('opens the mobile menu, traps focus and closes on Escape', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByRole('button', { name: '打开菜单' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(document.body).toHaveClass('menu-open');
    await waitFor(() =>
      expect(within(dialog).getByRole('button', { name: '关闭菜单' })).toHaveFocus(),
    );

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveAccessibleName('打开菜单');
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body).not.toHaveClass('menu-open');
  });

  it('switches language and keeps the mobile menu usable', async () => {
    const user = userEvent.setup();
    renderHeader();

    const languageSwitch = screen.getByRole('group', { name: '网站语言' });
    await user.click(within(languageSwitch).getByRole('button', { name: /English/ }));

    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('link', { name: /About/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });
});
