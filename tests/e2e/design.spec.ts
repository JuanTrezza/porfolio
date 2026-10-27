import { expect, sectionTop, settle, test } from './helpers';

// Sección Diseño UI: una card por proyecto, con Behance y Figma, y fuera del archivo de proyectos.

test.beforeEach(async ({ page }) => {
  await page.goto('./', { waitUntil: 'networkidle' });
});

test('cada card muestra Behance y Figma, y abren en una pestaña nueva', async ({ page }) => {
  const cards = page.locator('#diseno > div.grid > article');
  await expect(cards).toHaveCount(3);

  for (const title of ['EcoVida', 'PULSO Sports', 'PULSO Newsletter']) {
    const card = cards.filter({ has: page.locator('h3', { hasText: new RegExp(`^${title}$`, 'i') }) });
    await expect(card).toHaveCount(1);
    await expect(card.locator('img')).toHaveAttribute('src', /\.jpg$/);
    await expect(card.locator('a:has-text("VER EN BEHANCE")')).toHaveAttribute('href', /^https:\/\/www\.behance\.net\/gallery\//);
    await expect(card.locator('a:has-text("VER EN FIGMA")')).toHaveAttribute('href', /^https:\/\/www\.figma\.com\/community\/file\//);
  }
  for (const link of await page.locator('#diseno a').all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }

  // No se duplican en el archivo
  await expect(page.locator('#archivo').getByText('PULSO Newsletter', { exact: true })).toHaveCount(0);
});

test('el link "Diseño" del header lleva a la sección', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'en mobile el menú se prueba en navigation');
  await page.click('header nav a[href="#diseno"]');
  await settle();
  expect(Math.abs((await sectionTop(page, 'diseno')) - 64)).toBeLessThanOrEqual(3);
});
