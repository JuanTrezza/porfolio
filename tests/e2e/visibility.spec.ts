import { expect, invisibleInViewport, settle, test, wait } from './helpers';

// Regla del motion: nada puede quedar invisible, ni al recargar a mitad de scroll
// ni al quedarse quieto en cualquier punto de la página.

for (const id of ['archivo', 'stack', 'contacto']) {
  test(`recarga a mitad de scroll (#${id}): nada invisible en pantalla ni arriba`, async ({ page }) => {
    await page.goto('./', { waitUntil: 'networkidle' });
    await page.evaluate((id) => {
      const el = document.getElementById(id)!;
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 200);
    }, id);
    await wait(400);
    const target = await page.evaluate(() => Math.round(window.scrollY));

    await page.reload({ waitUntil: 'load' });
    // La restauración de scroll del navegador es intermitente en esta SPA (también sin motion):
    // si no ocurrió, se emula igual que la hace el navegador, de golpe.
    const restored = await page.evaluate(() => Math.round(window.scrollY));
    if (Math.abs(restored - target) > 5) await page.evaluate((t) => window.scrollTo(0, t), target);
    await settle();

    expect(Math.abs((await page.evaluate(() => Math.round(window.scrollY))) - target)).toBeLessThanOrEqual(5);
    expect(await invisibleInViewport(page), 'en pantalla').toEqual([]);

    // Lo que quedó arriba del viewport también tiene que estar visible al volver
    const above: string[] = [];
    for (let y = target - 700; y > -700; y -= 700) {
      await page.evaluate((v) => window.scrollTo(0, Math.max(0, v)), y);
      await wait(120);
      above.push(...(await invisibleInViewport(page)));
    }
    expect([...new Set(above)], 'arriba del viewport').toEqual([]);
  });
}

test('quieto en 9 posiciones de la página, nada oculto en pantalla', async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  await wait(400);
  const stops: string[] = [];
  for (let i = 0; i < 9; i++) {
    await page.mouse.wheel(0, 700 + (i % 3) * 230);
    await wait(1900);
    const inv = await invisibleInViewport(page);
    if (inv.length) stops.push(`y=${Math.round(await page.evaluate(() => window.scrollY))}: ${inv.slice(0, 3).join(' | ')}`);
  }
  expect(stops).toEqual([]);
});

test('después de recorrer toda la página, todo visible', async ({ page }, info) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  await wait(400);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 600) {
    await page.mouse.wheel(0, 600);
    await wait(info.project.name === 'reduced' ? 100 : 450);
  }
  await wait(1500);
  const vh = page.viewportSize()!.height;
  const pending: string[] = [];
  for (let y = 0; y < total; y += vh - 100) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await wait(150);
    pending.push(...(await invisibleInViewport(page)));
  }
  expect([...new Set(pending)]).toEqual([]);
});
