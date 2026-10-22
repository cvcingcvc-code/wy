import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RouteErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ScrollManager } from './components/ScrollManager';
import { LocaleProvider, useLocale } from './lib/i18n';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Solutions = lazy(() =>
  import('./pages/Solutions').then((module) => ({ default: module.Solutions })),
);
const Products = lazy(() =>
  import('./pages/Products').then((module) => ({ default: module.Products })),
);
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').then((module) => ({ default: module.ProductDetail })),
);
const Technology = lazy(() =>
  import('./pages/Technology').then((module) => ({ default: module.Technology })),
);
const Contact = lazy(() =>
  import('./pages/Contact').then((module) => ({ default: module.Contact })),
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((module) => ({ default: module.NotFound })),
);

function PageLoading() {
  const { locale } = useLocale();

  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="page-loading__spinner" aria-hidden="true" />
      <span>{locale === 'zh' ? '正在加载页面…' : 'Loading page…'}</span>
    </div>
  );
}

function AppShell() {
  const location = useLocation();

  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <RouteErrorBoundary resetKey={`${location.pathname}${location.search}`}>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

const routerBase = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export function App() {
  return (
    <BrowserRouter basename={routerBase}>
      <LocaleProvider>
        <AppShell />
      </LocaleProvider>
    </BrowserRouter>
  );
}
