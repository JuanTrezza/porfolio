import { diffPercent, expect, opacities, scrollToSelector, settle, test, wait } from './helpers';

// Entradas escalonadas de destacados, archivo, stack y certificaciones, y parallax de las imágenes destacadas.

const GROUPS: Record<string, string> = {
  destacados: '#trabajos > div.grid > article > *',
  archivo: '#archivo .divide-y > *',
  stack: '#stack > div.grid > * > *',
  certificaciones: 'section:has(span:text-is("04 // VALIDACIÓN")) div.grid > *',
};

test.beforeEach(async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  await wait(600);
});

for (const [name, selector] of Object.entries(GROUPS)) {
  test(`${name}: oculto antes de llegar, entra escalonado y termina visible`, async ({ page }, info) => {
    const before = await opacities(page, selector);
    expect(before.length).toBeGreaterThan(0);
    if (info.project.name === 'reduced') {
      expect(before.every((o) => o === 1), 'visible desde el inicio').toBe(true);
      return;
    }
    expect(before.every((o) => o === 0), 'oculto antes de llegar').toBe(true);

    await scrollToSelector(page, selector);
    await wait(250);
    const mid = await opacities(page, selector);
    const partial = mid.filter((o) => o > 0 && o < 1);
    const staggered = new Set(mid.filter((o) => o > 0).map((o) => o.toFixed(2))).size > 1 || (partial.length > 0 && mid.includes(0));
    expect(staggered, `escalonado (a mitad: ${mid.slice(0, 6).map((o) => o.toFixed(2)).join(' ')})`).toBe(true);

    // bajar hasta ver todos los ítems del grupo
    for (let i = 0; i < before.length; i += 2) {
      await page.locator(selector).nth(i).evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 300));
      await wait(250);
    }
    await wait(1500);
    expect(await opacities(page, selector)).toEqual(before.map(() => 1));
  });
}

test('las cards de destacados y stack nunca se vuelven transparentes (no se ve el gris de la grilla)', async ({ page }) => {
  const cards = await opacities(page, '#trabajos > div.grid > article, #stack > div.grid > *');
  expect(cards.every((o) => o === 1)).toBe(true);
});

test('parallax de las imágenes destacadas: solo en desktop, sin ver el borde y sin romper el zoom', async ({ page }, info) => {
  const layers = page.locator('#trabajos [data-parallax]');
  await expect(layers).toHaveCount(6);
  const first = layers.first();
  const positions: number[] = [];
  let covers = true;
  let transformAtRest = '';
  for (const off of [-700, -350, 0, 350]) {
    await first.evaluate((l, off) => window.scrollTo(0, l.parentElement!.getBoundingClientRect().top + window.scrollY + off), off);
    await wait(700);
    const s = await first.evaluate((l) => {
      const f = l.parentElement!.getBoundingClientRect();
      const r = l.getBoundingClientRect();
      return {
        t: getComputedStyle(l).transform,
        covers: r.top <= f.top + 0.5 && r.bottom >= f.bottom - 0.5 && r.left <= f.left + 0.5 && r.right >= f.right - 0.5,
        y: r.top - f.top,
      };
    });
    positions.push(s.y);
    covers &&= s.covers;
    if (off === 0) transformAtRest = s.t;
  }

  if (info.project.name !== 'desktop') {
    // sin transformación; el contenedor está 1px adentro por el borde del marco
    expect(transformAtRest).toBe('none');
    expect(new Set(positions).size).toBe(1);
    return;
  }
  expect(Math.max(...positions) - Math.min(...positions), 'se desplaza con el scroll').toBeGreaterThan(10);
  expect(covers, 'la imagen siempre cubre el marco').toBe(true);

  const img = page.locator('#trabajos article img').first();
  await img.hover();
  await wait(800);
  expect(await img.evaluate((i) => getComputedStyle(i).transform)).toMatch(/^matrix\(1\.05/);
});

test('archivo: al filtrar, la entrada se repite y las filas quedan visibles', async ({ page }, info) => {
  test.skip(info.project.name === 'reduced', 'sin animación');
  await scrollToSelector(page, '#archivo');
  await wait(1500);
  await page.locator('#archivo button', { hasText: 'PYTHON & DATOS' }).click();
  await wait(150);
  const during = await opacities(page, GROUPS.archivo);
  await wait(1500);
  expect(during.some((o) => o < 1), 'la entrada se repite').toBe(true);
  expect(await opacities(page, GROUPS.archivo)).toEqual([1, 1]);

  await page.locator('#archivo button', { hasText: 'TODOS' }).click();
  await wait(300);
  for (let i = 0; i < 16; i += 3) {
    await page.locator(GROUPS.archivo).nth(i).evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 300));
    await wait(250);
  }
  await wait(1500);
  const all = await opacities(page, GROUPS.archivo);
  expect(all).toHaveLength(16);
  expect(all.every((o) => o === 1)).toBe(true);
});

test('en reposo, cada bloque queda idéntico al diseño', async ({ page, browser }, info) => {
  test.skip(info.project.name !== 'mobile', 'mobile: sin parallax, comparable píxel a píxel');
  const { viewport, isMobile, hasTouch } = info.project.use;
  const refCtx = await browser.newContext({ baseURL: info.project.use.baseURL, viewport, isMobile, hasTouch, reducedMotion: 'reduce' });
  const ref = await refCtx.newPage();
  await ref.goto('./', { waitUntil: 'networkidle' });

  const blocks: [string, string][] = [
    ['destacados', '#trabajos > div.grid > article'],
    ['archivo', '#archivo .divide-y'],
    ['stack', '#stack > div.grid'],
    ['certificaciones', 'section:has(span:text-is("04 // VALIDACIÓN")) div.grid'],
  ];
  for (const [name, selector] of blocks) {
    const shots = [];
    for (const p of [page, ref]) {
      const el = p.locator(selector).first();
      const h = await el.evaluate((e) => e.getBoundingClientRect().height);
      for (let y = 0; y < h; y += 300) {
        await el.evaluate((e, y) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 400 + y), y);
        await wait(200);
      }
      await el.evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 100));
      await settle(2000);
      shots.push(await el.screenshot());
    }
    const d = diffPercent(shots[0], shots[1]);
    expect(d.sizeDelta, `${name}: tamaño`).toBe(0);
    expect(d.percent, `${name}: ${d.pixels} px distintos`).toBeLessThanOrEqual(0.1);
  }
  await refCtx.close();
});
