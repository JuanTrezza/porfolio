import { expect, test, wait } from './helpers';

// Pantalla táctil en seis anchos: sin scroll horizontal, titulares sin cortar, header que entra
// y botón del menú visible y que responde al toque. Crea sus propios contextos, así que corre
// una sola vez (en el proyecto desktop).

const WIDTHS = [320, 390, 768, 1024, 1280, 1440];

for (const width of WIDTHS) {
  test(`${width}px táctil: sin desborde, titulares enteros y menú usable`, async ({ browser }, info) => {
    test.skip(info.project.name !== 'desktop', 'arma sus propios contextos');
    const ctx = await browser.newContext({ baseURL: info.project.use.baseURL, viewport: { width, height: 800 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await wait(800);

    // Con isMobile, el viewport de layout crece si algo desborda: tiene que seguir igual al ancho
    const m = await page.evaluate(() => ({ layout: window.innerWidth, docW: document.documentElement.scrollWidth }));
    expect(m, 'sin scroll horizontal').toEqual({ layout: width, docW: width });

    // Cada línea de cada titular dentro del viewport y de cualquier ancestro que recorte
    const cut = await page.evaluate(() => {
      const bad: string[] = [];
      for (const h of document.querySelectorAll('h1, h2, h3')) {
        if (!h.getClientRects().length) continue;
        const clips: DOMRect[] = [];
        for (let n: Element | null = h; n && n !== document.documentElement; n = n.parentElement) {
          if (/(hidden|clip|auto|scroll)/.test(getComputedStyle(n).overflowX)) clips.push(n.getBoundingClientRect());
        }
        const range = document.createRange();
        const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        for (let t = walker.nextNode(); t; t = walker.nextNode()) {
          range.selectNodeContents(t);
          for (const r of range.getClientRects()) {
            if (!r.width) continue;
            const out = r.left < -0.5 || r.right > window.innerWidth + 0.5 || clips.some((c) => r.left < c.left - 0.5 || r.right > c.right + 0.5);
            if (out) bad.push(`${h.tagName.toLowerCase()} "${t.textContent?.trim().slice(0, 30)}" ${Math.round(r.left)}–${Math.round(r.right)}`);
          }
        }
      }
      return bad;
    });
    expect(cut, 'ningún titular cortado').toEqual([]);

    const header = await page.evaluate(() => {
      const row = document.querySelector('header > div')!;
      return { scroll: row.scrollWidth, client: row.clientWidth };
    });
    expect(header.scroll, 'el header entra').toBeLessThanOrEqual(header.client);

    const button = page.locator('button[aria-label="Abrir menú"]');
    if (width < 1024) {
      const box = (await button.boundingBox())!;
      expect(box.x >= 0 && box.x + box.width <= width, 'botón del menú a la vista').toBe(true);
      const drawerLink = page.locator('header a:has-text("05 // STACK")');
      await button.tap();
      await expect(drawerLink).toBeVisible();
      await button.tap();
      await expect(drawerLink).toHaveCount(0);
    } else {
      await expect(button).toBeHidden();
      await expect(page.locator('header nav a[href="#trabajos"]')).toBeVisible();
    }

    // El estado vive solo en el hero: el header no lo repite en ningún ancho
    await expect(page.locator('main section').first().getByText('DISPONIBLE PARA TRABAJAR', { exact: true })).toBeVisible();
    await expect(page.locator('header > div').getByText('DISPONIBLE PARA TRABAJAR', { exact: true })).toHaveCount(0);

    await ctx.close();
  });
}
