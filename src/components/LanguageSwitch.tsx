import { useLocale } from '../lib/i18n';

export function LanguageSwitch({ className = '' }: { className?: string }) {
  const { locale, setLocale, copy } = useLocale();

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={copy.ui.language}>
      <button
        type="button"
        className={locale === 'zh' ? 'is-active' : ''}
        aria-pressed={locale === 'zh'}
        onClick={() => setLocale('zh')}
      >
        中
        <span className="sr-only"> — {copy.ui.languageZh}</span>
      </button>
      <span className="lang-switch__slash" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={locale === 'en' ? 'is-active' : ''}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
        <span className="sr-only"> — {copy.ui.languageEn}</span>
      </button>
    </div>
  );
}
