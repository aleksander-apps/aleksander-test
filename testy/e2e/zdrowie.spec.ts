import { expect, test } from '@playwright/test';

test('strona główna i /api/health odpowiadają', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Cześć');
  const odp = await request.get('/api/health');
  expect(odp.ok()).toBeTruthy();
});
