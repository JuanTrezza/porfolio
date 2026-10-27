import { expect, test, wait } from './helpers';

// Meta tags para compartir, estado en el hero, copiar email y página 404.

const SITE = 'https://juantrezza.github.io/porfolio/';

test('meta tags: título, OG y Twitter con URLs absolutas, canonical y favicons con la base', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'el HTML es el mismo en todos los proyectos');
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle('Juan Moreno Trezza — Frontend Developer & UI Designer');

  const attr = (sel: string, name = 'content') => page.locator(sel).getAttribute(name);
  expect(await attr('link[rel="canonical"]', 'href')).toBe(SITE);
  expect(await attr('meta[property="og:url"]')).toBe(SITE);
  expect(await attr('meta[property="og:image"]')).toBe(`${SITE}og-image.jpg`);
  expect(await attr('meta[name="twitter:image"]')).toBe(`${SITE}og-image.jpg`);
  expect(await attr('meta[property="og:locale"]')).toBe('es_AR');
  expect(await attr('meta[name="twitter:card"]')).toBe('summary_large_image');

  for (const sel of ['link[rel="icon"][type="image/svg+xml"]', 'link[rel="icon"][sizes="32x32"]', 'link[rel="apple-touch-icon"]']) {
    const href = (await attr(sel, 'href'))!;
    expect(href).toMatch(/^\/porfolio\/[\w-]+\.(svg|png)$/);
    expect((await page.request.get(href)).status(), href).toBe(200);
  }
  expect((await page.request.get('og-image.jpg')).status()).toBe(200);
});

test('estado del hero: texto completo y el punto late solo sin reduced motion', async ({ page }, info) => {
  await page.goto('./', { waitUntil: 'networkidle' });
  const tag = page.locator('main section').first().locator('p', { hasText: 'DISPONIBLE PARA TRABAJAR' });
  await expect(tag).toBeVisible();
  await expect(tag).toHaveText('DISPONIBLE PARA TRABAJAR · BUENOS AIRES / REMOTO');

  const animation = await tag.locator('[aria-hidden="true"] > span').first().evaluate((e) => getComputedStyle(e).animationName);
  expect(animation).toBe(info.project.name === 'reduced' ? 'none' : 'statusPulse');
});

test('copiar email: copia, muestra "¡Copiado!" 2 s y lo anuncia', async ({ page, context }, info) => {
  test.skip(info.project.name === 'mobile', 'mismo comportamiento que desktop');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('./', { waitUntil: 'networkidle' });
  const button = page.locator('#copy-btn');
  const live = page.locator('#contacto [aria-live="polite"]');
  await expect(live).toHaveText('');

  await button.scrollIntoViewIfNeeded();
  await button.click();
  await expect(button).toContainText('¡COPIADO!');
  await expect(live).toContainText('¡Copiado!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('jgmorenotrezza@gmail.com');

  await wait(2300);
  await expect(button).toContainText('COPIAR EMAIL');
  await expect(live).toHaveText('');
});

test('copiar email: sin Clipboard API abre el mailto', async ({ page }, info) => {
  test.skip(info.project.name !== 'desktop', 'basta un proyecto');
  // Sin Clipboard API; la navigation API registra a dónde quiere ir la página y la cancela
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined });
    const w = window as unknown as { __nav: string[]; navigation: EventTarget };
    w.__nav = [];
    w.navigation.addEventListener('navigate', (e) => {
      const ev = e as Event & { destination: { url: string } };
      w.__nav.push(ev.destination.url);
      ev.preventDefault();
    });
  });
  await page.goto('./', { waitUntil: 'networkidle' });
  await page.locator('#copy-btn').click();
  await wait(300);
  expect(await page.evaluate(() => (window as unknown as { __nav: string[] }).__nav)).toContain('mailto:jgmorenotrezza@gmail.com');
  await expect(page.locator('#copy-btn')).toContainText('COPIAR EMAIL');
});

test('404: autocontenida, con favicon y botón al inicio', async ({ page }, info) => {
  test.skip(info.project.name === 'reduced', 'página estática sin motion');
  await page.goto('./404.html', { waitUntil: 'networkidle' });
  await expect(page.locator('h1')).toHaveAttribute('aria-label', '404');
  await expect(page.getByText('Esta página no existe')).toBeVisible();
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', '/porfolio/favicon.svg');

  const width = page.viewportSize()!.width;
  expect(await page.evaluate(() => document.documentElement.scrollWidth), 'sin scroll horizontal').toBe(width);

  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await page.waitForLoadState('networkidle');
  expect(new URL(page.url()).pathname).toBe('/porfolio/');
  await expect(page.locator('#trabajos')).toHaveCount(1);
});
