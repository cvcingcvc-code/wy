import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../lib/i18n';

interface Props {
  children: ReactNode;
  resetKey: string;
}

interface State {
  hasError: boolean;
}

class Boundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page render failed:', error, info.componentStack);
  }

  componentDidUpdate(previous: Props) {
    if (previous.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

function ErrorFallback() {
  const { locale, copy } = useLocale();
  const zh = locale === 'zh';

  return (
    <section className="error-state" role="alert">
      <div className="container error-state__inner">
        <span className="mono-label">SYSTEM / RECOVERABLE ERROR</span>
        <h1>{zh ? '页面暂时无法显示。' : 'This page could not be displayed.'}</h1>
        <p>
          {zh
            ? '页面渲染时出现异常。你可以重新加载，或返回首页继续浏览。'
            : 'Something went wrong while rendering. Reload the page or return home.'}
        </p>
        <div className="error-state__actions">
          <button className="btn btn--primary" type="button" onClick={() => window.location.reload()}>
            {zh ? '重新加载' : 'Reload'}
          </button>
          <Link className="btn btn--outline" to="/">
            {copy.ui.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function RouteErrorBoundary({ children, resetKey }: Props) {
  return <Boundary resetKey={resetKey}>{children}</Boundary>;
}
