import { diffPercent, expect, settle, test, wait } from './helpers';

// Reveal por palabra del titular del hero (al cargar) y de los títulos de sección (al entrar).

const TITLES: [string, string][] = [
  ['hero', 'main section:first-child h1'],
  ['destacados', '#trabajos h2'],
  ['diseño', '#diseno h2'],
  ['archivo', '#archivo h2'],
  ['stack', '#stack h2'],
  ['certificaciones', 'section:has(span:text-is("05 // VALIDACIÓN")) h2'],
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

/** Posición de cada palabra del título (funciona partido o sin partir) */
function wordPositions(el: Element) {
  const out: { text: string; x: number; y: number }[] = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    for (const m of (t.textContent ?? '').matchAll(/S+/g)) {
      range.setStart(t, m.index!);
      range.setEnd(t, m.index! + m[0].length);
      const r = range.getBoundingClientRect();
      out.push({ text: m[0], x: r.left, y: r.top });
    }
  }
  return out;
}

test('cada título revelado es idéntico al original sin partir', async ({ page, browser }, info) => {
  test.skip(info.project.name === 'reduced', 'es la referencia');
  const { viewport, isMobile, hasTouch } = info.project.use;
  const refCtx = await browser.newContext({ baseURL: info.project.use.baseURL, viewport, isMobile, hasTouch, reducedMotion: 'reduce' });
  const ref = await refCtx.newPage();
  await Promise.all([page.goto('./', { waitUntil: 'networkidle' }), ref.goto('./', { waitUntil: 'networkidle' })]);

  for (const [name, selector] of TITLES) {
    const shots: Buffer[] = [];
    const words: ReturnType<typeof wordPositions>[] = [];
    for (const p of [page, ref]) {
      const el = p.locator(selector).first();
      await el.evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - 200));
      await settle();
      shots.push(await el.screenshot());
      words.push(await el.evaluate(wordPositions));
    }
    // "STACK TECNOLÓGICO": Syne ajusta el kerning entre el espacio y la "T"; al partir en palabras
    // ese ajuste se pierde y "TECNOLÓGICO" se corre 1–1,5 px. Es el único título afectado: para él
    // se acota el corrimiento de cada palabra en vez de exigir píxeles idénticos.
    if (name === 'stack') {
      const shift = Math.max(...words[0].map((w, i) => Math.max(Math.abs(w.x - words[1][i].x), Math.abs(w.y - words[1][i].y))));
      expect(words[0].map((w) => w.text)).toEqual(words[1].map((w) => w.text));
      expect(shift, `${name}: corrimiento máximo de una palabra`).toBeLessThanOrEqual(2);
      continue;
    }
    const d = diffPercent(shots[0], shots[1]);
    expect(d.sizeDelta, `${name}: tamaño`).toBe(0);
    expect(d.percent, `${name}: ${d.pixels} px distintos`).toBeLessThanOrEqual(0.2);
  }
  await refCtx.close();
});
