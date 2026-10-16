# Portfolio — Juan Moreno Trezza

Portfolio personal de desarrollador frontend, con estética editorial suiza: proyectos destacados, archivo completo filtrable, formación, stack, certificaciones y contacto.

**Demo en vivo → [juantrezza.github.io/porfolio](https://juantrezza.github.io/porfolio/)**

## Motion

Motion sutil: el contenido es lo principal, y el movimiento acompaña la lectura sin demorarla.

- **Scroll suave con Lenis + GSAP en un solo loop.** Lenis no usa su propio `requestAnimationFrame`: lo mueve `gsap.ticker`, y cada frame de scroll actualiza ScrollTrigger, así el scroll suave y las animaciones nunca se desfasan. Un `ResizeObserver` refresca los triggers cuando cambia el alto de la página (imágenes, fuentes, filtros).
- **Navegación interna centralizada.** Los links del navbar y del hero pasan por `scrollToId`, que usa Lenis con el offset del header fijo. Con Ctrl/Cmd o clic del medio el link se abre en otra pestaña como siempre. Un lock con contador (`useLenisLock`) pausa Lenis mientras está abierto el menú mobile o el modal de proyecto, y `data-lenis-prevent` deja scrollear el contenido del modal.
- **Reveals por palabra.** El titular del hero se revela al cargar la página y los títulos de sección al entrar en pantalla, palabra por palabra con SplitText y máscara. Las palabras en serif ("se sienten", "juntos") se parten dentro de su propio `<em>`, así conservan tipografía, color y rotación. La máscara tiene un padding compensado con margen negativo, porque la serif tiene un cuerpo mayor que el interlineado del titular: así no se recortan los trazos y el texto no se mueve.
- **Entradas escalonadas** en proyectos destacados, archivo, stack y certificaciones. En las grillas cuyas líneas son el fondo gris del contenedor (destacados y stack) se anima el contenido de cada card y no la card, para que nunca se vea ese gris. En el archivo, la entrada se repite al cambiar de filtro. Al terminar, la animación borra sus estilos en línea, así cada bloque queda idéntico al diseño.
- **Parallax leve** de las imágenes destacadas dentro de su marco, solo en desktop. Mueve un contenedor alrededor de la imagen, agrandado un 10% para que nunca se vea el borde, y no el `<img>`, así no pisa su zoom con hover.
- **Nada queda oculto.** Las entradas arrancan apenas un elemento asoma por el borde inferior, así lo que queda quieto al pie de la pantalla nunca queda invisible. Si se recarga a mitad de scroll, lo que ya quedó arriba del viewport no se oculta.
- **Mobile.** Animaciones más cortas y desplazamientos menores (`gsap.matchMedia`), y sin parallax.
- **Reduced-motion.** Con `prefers-reduced-motion` no se inicializa Lenis, no se parte ningún título y no se crea ninguna animación: todo es visible desde el inicio.

## Stack

React 19 + TypeScript · Vite · Tailwind CSS 3 · GSAP (ScrollTrigger, SplitText) + Lenis · GitHub Actions → GitHub Pages

## Correrlo localmente

```bash
git clone https://github.com/JuanTrezza/porfolio.git
cd porfolio
npm install
npm run dev   # http://localhost:3000/porfolio/
```

Para verificar motion y responsive contra el build: `npm run test:e2e` (Playwright, en `tests/e2e`; la primera vez, `npx playwright install chromium`). No corre en el workflow de deploy.

## Estructura

```
src/
├── components/   # secciones, navbar, footer y modal de proyecto
├── hooks/        # scroll suave, lock de Lenis, reveals de títulos, entradas escalonadas y parallax
├── lib/          # motion.ts (Lenis + GSAP + ScrollTrigger) y scroll.ts (navegación interna)
├── data/         # portfolioData.ts: todo el contenido (proyectos, formación, stack, certificaciones)
└── assets/       # capturas de los proyectos destacados y foto
public/           # CV_Juan_Moreno_Trezza.pdf
tests/e2e/        # verificación con Playwright: navegación, visibilidad, reveals y responsive
```

Para editar contenido, todo está en `src/data/portfolioData.ts`. Los proyectos con `featured: true` se muestran como destacados, en el orden del archivo.

La versión anterior del portfolio está en la rama [`v1-backup`](https://github.com/JuanTrezza/porfolio/tree/v1-backup).

## Autor

**Juan Moreno Trezza** — [LinkedIn](https://www.linkedin.com/in/juanmorenotrezza/) · [GitHub](https://github.com/JuanTrezza) · [Behance](https://www.behance.net/juanmorenotrezza)
