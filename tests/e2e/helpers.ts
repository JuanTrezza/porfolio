import { expect, test as base, type Page } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

/** test con un fixture automático: cualquier error de JS de la página hace fallar el test */
export const test = base.extend<{ jsErrors: string[] }>({
  jsErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(`console: ${m.text()}`);
      });
      await use(errors);
      expect(errors, 'sin errores de JS').toEqual([]);
    },
    { auto: true },
  ],
});
export { expect };

export const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Tiempo para que terminen scroll suave y animaciones */
export const settle = (ms = 2200) => wait(ms);

/** Elementos con texto (o imágenes) que, en el viewport, quedaron invisibles: opacidad ~0, visibility hidden o fuera de su máscara. */
export function invisibleInViewport(page: Page) {
  return page.evaluate(() => {
    const vh = window.innerHeight;
    const bad: string[] = [];
    for (const el of document.querySelectorAll('main *, header *, footer *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.bottom <= 64 || r.top >= vh) continue; // fuera de la vista (o debajo del header)
      const hasOwnText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent?.trim());
      if (!hasOwnText && el.tagName !== 'IMG') continue;
      // opacidad efectiva acumulada
      let op = 1;
      let hidden = false;
      for (let n: Element | null = el; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n);
        op *= parseFloat(cs.opacity);
        if (cs.visibility === 'hidden') hidden = true;
      }
      // palabras partidas: el texto tiene que estar dentro de su máscara
      let clipped = false;
      const mask = el.closest('[class*="-mask"]');
      if (mask && mask !== el) {
        const m = mask.getBoundingClientRect();
        clipped = r.top >= m.bottom - 1 || r.bottom <= m.top + 1;
      }
      if (op < 0.05 || hidden || clipped) {
        const text = (el.textContent || el.getAttribute('alt') || '').trim().slice(0, 40);
        bad.push(`${el.tagName.toLowerCase()} "${text}" op=${op.toFixed(2)}${hidden ? ' hidden' : ''}${clipped ? ' clipped' : ''}`);
      }
    }
    return bad;
  });
}

export const sectionTop = (page: Page, id: string) =>
  page.evaluate((id) => Math.round(document.getElementById(id)!.getBoundingClientRect().top), id);

export const lenisState = (page: Page) =>
  page.evaluate(() => ({
    lenis: document.documentElement.classList.contains('lenis'),
    stopped: document.documentElement.classList.contains('lenis-stopped'),
  }));

/** Lleva el primer elemento del selector a `offset` px del borde superior, con scroll instantáneo. */
export const scrollToSelector = (page: Page, selector: string, offset = 150) =>
  page
    .locator(selector)
    .first()
    .evaluate((e, offset) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - offset), offset);

export const opacities = (page: Page, selector: string) =>
  page.$$eval(selector, (els) => els.map((e) => +getComputedStyle(e).opacity));

/** Porcentaje de píxeles distintos entre dos capturas (recortadas al tamaño común). */
export function diffPercent(a: Buffer, b: Buffer) {
  const pa = PNG.sync.read(a);
  const pb = PNG.sync.read(b);
  const width = Math.min(pa.width, pb.width);
  const height = Math.min(pa.height, pb.height);
  const crop = (p: PNG) => {
    const out = new PNG({ width, height });
    PNG.bitblt(p, out, 0, 0, width, height, 0, 0);
    return out.data;
  };
  const px = pixelmatch(crop(pa), crop(pb), undefined, width, height, { threshold: 0.1 });
  return {
    percent: (100 * px) / (width * height),
    pixels: px,
    sizeDelta: Math.max(Math.abs(pa.width - pb.width), Math.abs(pa.height - pb.height)),
  };
}
