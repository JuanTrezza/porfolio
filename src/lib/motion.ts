import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Breakpoints para gsap.matchMedia — las animaciones de scroll solo corren sin reduced motion. */
export const MQ = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
};

export { gsap, ScrollTrigger, SplitText, useGSAP };

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Crea la instancia global de Lenis movida por el ticker de GSAP (un solo loop RAF)
 * y conectada a ScrollTrigger. Con prefers-reduced-motion no se crea Lenis y la
 * página usa el scroll nativo.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  const instance = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
  lenis = instance;

  instance.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Los cambios de alto de la página (filtros, imágenes, fuentes) mueven los triggers
  let refreshTimer: number | undefined;
  const resizeObserver = new ResizeObserver(() => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  resizeObserver.observe(document.body);

  return () => {
    resizeObserver.disconnect();
    window.clearTimeout(refreshTimer);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    lenis = null;
  };
}

let lockCount = 0;

/** Detiene Lenis mientras hay un overlay abierto (con contador para overlays apilados). */
export function lockScroll() {
  lockCount += 1;
  lenis?.stop();
  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) lenis?.start();
  };
}
