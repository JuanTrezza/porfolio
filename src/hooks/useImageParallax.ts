import { useRef } from 'react';
import { gsap, MQ, useGSAP } from '../lib/motion';

/**
 * Parallax leve de las imágenes dentro de su marco, solo en desktop y sin reduced motion.
 * Mueve cada `[data-parallax]` (un contenedor alrededor del <img>, no la imagen: así no pisa
 * su zoom con hover). El contenedor se agranda un 10% para que el desplazamiento de ±4%
 * nunca deje ver el borde; en mobile y con reduced motion queda sin transformar.
 */
export function useImageParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;

      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]', container).forEach((layer) => {
          gsap.fromTo(
            layer,
            { yPercent: -4, scale: 1.1 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        });
      });
    },
    { scope: ref }
  );

  return ref;
}
