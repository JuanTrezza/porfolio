import type React from 'react';
import { getLenis, prefersReducedMotion } from './motion';

/**
 * Utilidad centralizada de scroll del portfolio.
 * Toda la navegación interna pasa por acá (sin scrollIntoView sueltos ni scroll-smooth
 * global). Usa Lenis cuando está activo y scroll nativo si no (reduced-motion).
 */
const HEADER_OFFSET = 64; // Altura fija del header (h-16 = 64px)

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/** Corre `run` con Lenis, esperando un frame si un overlay que se cerró en el mismo handler todavía lo tiene detenido. */
function withLenis(run: (lenis: NonNullable<ReturnType<typeof getLenis>>) => void): boolean {
  const lenis = getLenis();
  if (!lenis) return false;
  if (lenis.isStopped) requestAnimationFrame(() => run(lenis));
  else run(lenis);
  return true;
}

export function scrollToId(id: string): void {
  // Limpiar el selector en caso de recibir '#'
  const cleanId = id.replace(/^#/, '');
  const targetElement = document.getElementById(cleanId);

  if (!targetElement) {
    return;
  }

  const handled = withLenis((l) =>
    l.scrollTo(targetElement, {
      offset: -HEADER_OFFSET,
      duration: 1.4,
      easing: easeOutQuart,
      // Lenis calcula el destino al empezar: si en el camino cargan imágenes lazy de más
      // arriba y empujan la sección, corrige con un tramo corto al terminar
      onComplete: () => {
        const drift = targetElement.getBoundingClientRect().top - HEADER_OFFSET;
        if (Math.abs(drift) > 2 && l.scroll < l.limit) {
          l.scrollTo(targetElement, { offset: -HEADER_OFFSET, duration: 0.6, easing: easeOutQuart });
        }
      },
    })
  );
  if (handled) return;

  // Sin Lenis (reduced-motion o antes de inicializar): scroll nativo
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

/** Vuelve al inicio de la página (logo del navbar). */
export function scrollToTop(): void {
  const handled = withLenis((lenis) => lenis.scrollTo(0, { duration: 1.4, easing: easeOutQuart }));
  if (handled) return;

  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/**
 * onClick para links internos (`href="#id"`): scrollea con scrollToId en vez del salto nativo.
 * Con Ctrl/Cmd/Shift o clic del medio deja actuar al navegador (abrir en otra pestaña).
 */
export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, after?: () => void) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  after?.();
  const id = e.currentTarget.getAttribute('href') ?? '';
  if (id === '#' || id === '') scrollToTop();
  else scrollToId(id);
}
