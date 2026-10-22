import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let context: CanvasRenderingContext2D | null = null;
    try {
      context = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!context) return;
    const ctx = context;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 1;
    let height = 1;
    let points: Point[] = [];
    let raf = 0;
    let lastFrame = 0;
    let visible = true;
    let disposed = false;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (const point of points) {
        for (const other of points) {
          if (point === other) continue;
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 118) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(91, 157, 255, ${0.1 * (1 - distance / 118)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      for (const point of points) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(139, 178, 255, ${point.radius > 1.2 ? 0.7 : 0.42})`;
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function update() {
      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -10) point.x = width + 10;
        if (point.x > width + 10) point.x = -10;
        if (point.y < -10) point.y = height + 10;
        if (point.y > height + 10) point.y = -10;
      }
    }

    function tick(time: number) {
      if (disposed) return;
      raf = window.requestAnimationFrame(tick);
      if (!visible || time - lastFrame < 33) return;
      lastFrame = time;
      update();
      draw();
    }

    function start() {
      if (reduced || raf) return;
      raf = window.requestAnimationFrame(tick);
    }

    function stop() {
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 720 ? 24 : 52;
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.1 + 0.6,
      }));
      draw();
    }

    resize();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(parent);
    window.addEventListener('resize', resize, { passive: true });

    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              visible = entries.some((entry) => entry.isIntersecting);
              if (visible) start();
              else stop();
            },
            { threshold: 0 },
          )
        : null;
    intersectionObserver?.observe(parent);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    start();

    return () => {
      disposed = true;
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={`particle-field ${className}`.trim()} aria-hidden="true" />;
}
