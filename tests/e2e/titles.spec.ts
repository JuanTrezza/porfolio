import { diffPercent, expect, settle, test, wait } from './helpers';

// Reveal por palabra del titular del hero (al cargar) y de los títulos de sección (al entrar).

const TITLES: [string, string][] = [
  ['hero', 'main section:first-child h1'],
  ['destacados', '#trabajos h2'],
  ['archivo', '#archivo h2'],
  ['stack', '#stack h2'],
  ['certificaciones', 'section:has(span:text-is("04 // VALIDACIÓN")) h2'],
  ['contacto', '#contacto h2'],
];

test('el titular del hero se revela al cargar, sin scroll, y la serif conserva su estilo', async ({ page }, info) => {
  test.skip(info.project.name === 'reduced', 'con reduced motion no se parte');
  await page.goto('./', { waitUntil: 'commit' });
  await page.waitForSelector('main section:first-child h1 .reveal-word');
  const early = await page.evaluate(() => {
    const words = [...document.querySelectorAll('main section:first-child h1 .reveal-word')];
    const hidden = words.filter((w) => w.getBoundingClientRect().top >= w.parentElement!.getBoundingClientRect().bottom - 1);
    return { words: words.length, hidden: hidden.length };
  });
  expect(early.words).toBe(7);
  expect(early.hidden, 'arranca oculto').toBeGreaterThan(0);

  await page.waitForLoadState('networkidle');
  await wait(2500);
  const done = await page.evaluate(() => {
    const h1 = document.querySelector('main section:first-child h1')!;
    const words = [...h1.querySelectorAll('.reveal-word')];
    const em = h1.querySelector('em')!;
    const emWords = [...em.querySelectorAll('.reveal-word')];
    return {
      inside: words.every((w) => {
        const m = w.parentElement!.getBoundingClientRect();
        const r = w.getBoundingClientRect();
        return r.top >= m.top - 1 && r.bottom <= m.bottom + 1;
      }),
      scrollY: window.scrollY,
      emWords: emWords.map((w) => w.textContent).join(' '),
      emStyle: emWords.every((w) => getComputedStyle(w).fontFamily.includes('Playfair') && getComputedStyle(w).color === 'rgb(113, 42, 226)'),
      emTransform: getComputedStyle(em).transform,
      aria: h1.getAttribute('aria-label') ?? '',
    };
  });
  expect(done.inside && done.scrollY === 0, 'revelado completo sin scrollear').toBe(true);
  expect(done.emWords).toBe('se sienten');
  expect(done.emStyle, '"se sienten" en Playfair y violeta').toBe(true);
  expect(done.emTransform, 'el <em> conserva su rotación').not.toBe('none');
  expect(done.aria).toMatch(/se sienten/i);
});

test('"¿Trabajamos juntos?" se parte con "juntos" dentro del <em> y espera a entrar en pantalla', async ({ page }, info) => {
  test.skip(info.project.name === 'reduced', 'con reduced motion no se parte');
  await page.goto('./', { waitUntil: 'networkidle' });
  await wait(400);
  const pre = await page.evaluate(() => {
    const h = document.querySelector('#contacto h2')!;
    const ws = [...h.querySelectorAll('.reveal-word')];
    return {
      n: ws.length,
      hidden: ws.every((w) => w.getBoundingClientRect().top >= w.parentElement!.getBoundingClientRect().bottom - 1),
      em: [...h.querySelectorAll('em .reveal-word')].map((w) => w.textContent).join(' '),
    };
  });
  // "¿Trabajamos", "juntos" y "?" (pegado al <em>, SplitText lo toma como palabra aparte)
  expect(pre).toEqual({ n: 3, hidden: true, em: 'juntos' });
});

test('con reduced motion ningún título se parte', async ({ page }, info) => {
  test.skip(info.project.name !== 'reduced', 'solo reduced');
  await page.goto('./', { waitUntil: 'networkidle' });
  await wait(800);
  expect(await page.locator('.reveal-word').count()).toBe(0);
});

test('cada título revelado es idéntico al original sin partir', async ({ page, browser }, info) => {
  test.skip(info.project.name === 'reduced', 'es la referencia');
  const { viewport, isMobile, hasTouch } = info.project.use;
  const refCtx = await browser.newContext({ baseURL: info.project.use.baseURL, viewport, isMobile, hasTouch, reducedMotion: 'reduce' });
  const ref = await refCtx.newPage();
  await Promise.all([page.goto('./', { waitUntil: 'networkidle' }), ref.goto('./', { waitUntil: 'networkidle' })]);

  for (const [name, selector] of TITLES) {
    const shots = [];
    for (const p of [page, ref]) {
      const el = p.locator(selector).first();
      await el.evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 200));
      await settle();
      shots.push(await el.screenshot());
    }
    const d = diffPercent(shots[0], shots[1]);
    // "STACK TECNOLÓGICO": Syne ajusta el kerning entre el espacio y la "T"; al partir en palabras
    // ese ajuste se pierde y "TECNOLÓGICO" se corre 1–1,5 px. Es el único título afectado.
    const known = name === 'stack';
    expect(d.sizeDelta, `${name}: tamaño`).toBeLessThanOrEqual(known ? 1 : 0);
    expect(d.percent, `${name}: ${d.pixels} px distintos`).toBeLessThanOrEqual(known ? 2 : 0.2);
  }
  await refCtx.close();
});
