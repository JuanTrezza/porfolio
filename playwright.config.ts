import { defineConfig } from '@playwright/test';

/**
 * Verificación end-to-end del motion y del responsive, contra el build de producción.
 * Se corre a mano con `npm run test:e2e` (compila y levanta `vite preview`); no forma
 * parte del workflow de deploy.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'test-results',
  timeout: 120_000,
  // Las animaciones dependen del tiempo: sin paralelismo los tiempos son estables
  workers: 1,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173/porfolio/',
    browserName: 'chromium',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'reduced', use: { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' } },
  ],
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/porfolio/',
    reuseExistingServer: true,
  },
});
