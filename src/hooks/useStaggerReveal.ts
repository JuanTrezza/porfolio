import { useRef } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP } from '../lib/motion';

interface StaggerRevealOptions {
  /** Selector de los ítems, relativo al contenedor */
  selector?: string;
  /** Cuando cambia alguna (filtro, orden, vista) se revierte y vuelve a correr con los ítems nuevos */
  dependencies?: unknown[];
  /** Desplazamiento inicial en px en desktop (en mobile, la mitad) */
  distance?: number;
}

/**
 * Entrada escalonada de los ítems de un grid o lista a medida que entran en el viewport.
 * Con prefers-reduced-motion no se crea. Solo anima opacidad y desplazamiento: los ítems
 * siguen siendo focuseables.
 * Los ítems que ya quedaron arriba del viewport al crearse (recarga a mitad de scroll) no se
 * ocultan: no dependen de que ScrollTrigger dispare callbacks atrasados para volver a verse.
 */
export function useStaggerReveal<T extends HTMLElement>({
  selector = ':scope > *',
  dependencies = [],
  distance = 60,
}: StaggerRevealOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;

      const items = gsap.utils
        .toArray<HTMLElement>(selector, container)
        .filter((item) => item.getBoundingClientRect().bottom > 0);
      if (!items.length) return;

      const mm = gsap.matchMedia();
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };

        const offset = desktop ? distance : distance / 2;
        gsap.killTweensOf(items);
        gsap.set(items, { opacity: 0, y: offset });

        ScrollTrigger.batch(items, {
          // Arranca apenas el ítem asoma (su posición real, sin el desplazamiento inicial): un ítem
          // quieto en el borde inferior de la pantalla nunca queda oculto
          start: `top bottom+=${offset}`,
          once: true,
          // Tween común (no contextSafe): onEnter puede dispararse sincrónico dentro del
          // contexto de matchMedia, y anidar ahí el contexto externo crea un ciclo en GSAP
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: desktop ? 0.9 : 0.6,
              stagger: desktop ? 0.08 : 0.05,
              ease: 'expo.out',
              overwrite: true,
              // Al terminar, sin estilos en línea: un transform neutro deja el bloque en su propia
              // capa y cambia el antialiasing; así queda idéntico al diseño
              clearProps: 'opacity,transform',
            });
          },
        });

        return () => gsap.killTweensOf(items);
      });
    },
    { scope: ref, dependencies, revertOnUpdate: true }
  );

  return ref;
}
