import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollManager() {
  const location = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;
    let timer = 0;
    let attempts = 0;
    let disposed = false;

    function scrollToHash() {
      if (disposed) return;

      let id = '';
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        id = location.hash.slice(1);
      }

      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }

      attempts += 1;
      if (attempts < 60) {
        timer = window.setTimeout(scrollToHash, 50);
      } else {
        window.scrollTo(0, 0);
      }
    }

    if (location.hash) {
      scrollToHash();
    } else if (!isFirst) {
      window.scrollTo(0, 0);
    }

    if (!isFirst) {
      const main = document.getElementById('main-content');
      if (main) main.focus({ preventScroll: true });
    }

    return () => {
      disposed = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [location.hash, location.pathname]);

  return null;
}
