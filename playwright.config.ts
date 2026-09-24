import { defineConfig } from '@playwright/test';

// e2e na działającej aplikacji: BASE_URL (domyślnie lokalny `pnpm dev`). Raport JUnit do raporty/junit (tor, Allure).
export default defineConfig({
  testDir: 'testy/e2e',
  use: { baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3000' },
  reporter: [['list'], ['junit', { outputFile: 'raporty/junit/e2e.xml' }], ['html', { open: 'never' }]],
});
