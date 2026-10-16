import { expect, invisibleInViewport, lenisState, sectionTop, settle, test, wait } from './helpers';

// Scroll suave (Lenis), navegación interna, menú mobile y modal de proyecto.

test.beforeEach(async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  await settle();
});

test('Lenis activo, salvo con reduced motion, y nada invisible al cargar', async ({ page }, info) => {
  const st = await lenisState(page);
  expect(st.lenis).toBe(info.project.name !== 'reduced');
  expect(await invisibleInViewport(page)).toEqual([]);
});

test('los links internos llevan a su sección con el offset del header', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'en mobile se prueba el menú');
  await page.click('a:has-text("EXPLORAR TRABAJOS")');
  await settle();
  expect(Math.abs((await sectionTop(page, 'trabajos')) - 64)).toBeLessThanOrEqual(3);

  await page.click('header nav a[href="#stack"]');
  await settle();
  expect(Math.abs((await sectionTop(page, 'stack')) - 64)).toBeLessThanOrEqual(3);

  await page.click('header a[href="#"]');
  await settle();
  expect(await page.evaluate(() => Math.round(window.scrollY))).toBe(0);
});

test('menú mobile: pausa Lenis, el link lo cierra y lleva a la sección', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'solo mobile');
  await page.locator('button[aria-label="Abrir menú"]').tap();
  await wait(300);
  expect((await lenisState(page)).stopped).toBe(true);

  await page.locator('header a:has-text("04 // STACK")').tap();
  await settle();
  expect((await lenisState(page)).stopped).toBe(false);
  expect(await page.locator('header a:has-text("04 // STACK")').count()).toBe(0);
  expect(Math.abs((await sectionTop(page, 'stack')) - 64)).toBeLessThanOrEqual(3);
});

test('modal de proyecto: pausa Lenis y la rueda scrollea el modal, no la página', async ({ page }, info) => {
  test.skip(info.project.name === 'reduced', 'sin Lenis no hay nada que pausar');
  await page.evaluate(() => document.getElementById('trabajos')!.scrollIntoView());
  await wait(300);
  await page.locator('#trabajos button:has-text("DETALLES")').first().click();
  await wait(400);
  expect((await lenisState(page)).stopped).toBe(true);

  const body = page.locator('[data-lenis-prevent]');
  await expect(body).toHaveCount(1);
  const yBefore = await page.evaluate(() => window.scrollY);
  await body.hover();
  await page.mouse.wheel(0, 400);
  await wait(600);
  const scrollable = await body.evaluate((el) => el.scrollHeight > el.clientHeight);
  if (scrollable) expect(await body.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(yBefore);

  await page.keyboard.press('Escape');
  await wait(300);
  expect((await lenisState(page)).stopped).toBe(false);
});
