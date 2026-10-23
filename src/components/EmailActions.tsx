import { useState } from 'react';
import { contactEmail } from '../config/site';
import { useLocale } from '../lib/i18n';
import { ArrowUpRight, CopyIcon } from './Icons';

export function EmailActions() {
  const { copy } = useLocale();
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setState('copied');
      return;
    } catch {
      // Clipboard access can be unavailable outside secure contexts; use a textarea fallback.
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = contactEmail;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      setState(ok ? 'copied' : 'failed');
    } catch {
      setState('failed');
    }
  }

  return (
    <div className="email-actions">
      <a className="email-actions__mail" href={`mailto:${contactEmail}`}>
        {contactEmail}
        <ArrowUpRight />
      </a>
      <button type="button" className="copy-button" onClick={() => void copyEmail()}>
        <CopyIcon />
        {state === 'copied' ? copy.contact.copied : copy.contact.copy}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? copy.contact.copied : state === 'failed' ? copy.contact.copyFailed : ''}
      </span>
    </div>
  );
}
