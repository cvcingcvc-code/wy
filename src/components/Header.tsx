import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { contactEmail } from '../config/site';
import { useLocale } from '../lib/i18n';
import { ArrowUpRight, CloseIcon } from './Icons';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

export function Header() {
  const { copy } = useLocale();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = menuPanelRef.current;
    if (!panel) return;

    document.body.classList.add('menu-open');
    const focusTimer = window.setTimeout(() => menuCloseRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
    // closeMenu is stable enough for this effect; it is recreated on locale change only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    window.setTimeout(() => menuTriggerRef.current?.focus(), 0);
  }

  const navLinks = copy.nav.map((item) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.path === '/'}
      className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      onClick={() => {
        if (menuOpen) setMenuOpen(false);
      }}
    >
      <span className="nav-label">{item.label}</span>
    </NavLink>
  ));

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
      <a className="skip-link" href="#main-content">
        {copy.ui.skip}
      </a>
      <div className="site-header__inner">
        <Logo />
        <nav className="site-nav" aria-label={copy.ui.menuLabel}>
          {navLinks}
        </nav>
        <div className="site-header__actions">
          <LanguageSwitch className="lang-switch--header" />
          <Link className="btn btn--ghost btn--sm header-cta" to="/contact">
            {copy.ui.contactCta}
            <ArrowUpRight />
          </Link>
          <button
            ref={menuTriggerRef}
            type="button"
            className="menu-trigger"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            aria-label={menuOpen ? copy.ui.closeMenu : copy.ui.menu}
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span className="menu-trigger__bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={copy.ui.menuLabel}
        >
          <div className="mobile-menu__panel" ref={menuPanelRef}>
            <div className="mobile-menu__top">
              <span className="mono-label">GORGON / MENU</span>
              <button
                ref={menuCloseRef}
                type="button"
                className="mobile-menu__close"
                aria-label={copy.ui.closeMenu}
                onClick={closeMenu}
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="mobile-nav" aria-label={copy.ui.menuLabel}>
              {copy.nav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight />
                </NavLink>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <LanguageSwitch />
              <a className="mobile-menu__mail" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              <Link
                className="btn btn--primary"
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                {copy.ui.contactCta}
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
