import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';

test.describe('Solia UI Pages', () => {
  test('Landing page loads and displays key elements', async ({ page }) => {
    await page.goto(baseURL + '/landing');
    await expect(page.locator('h1')).toHaveText('Bienvenue chez Solia');
    await expect(page.locator('button', { hasText: 'Créer un compte' })).toBeVisible();
  });

  test('Comparison page loads and displays key elements', async ({ page }) => {
    await page.goto(baseURL + '/comparison');
    await expect(page.locator('h1')).toHaveText('Comparaison : Solia vs Evergiving');
    await expect(page.locator('table')).toBeVisible();
  });

  test('Solutions page loads and displays key elements', async ({ page }) => {
    await page.goto(baseURL + '/solutions');
    await expect(page.locator('h1')).toHaveText('Solutions par secteur');
    await expect(page.locator('h3', { hasText: 'ONG' })).toBeVisible();
  });
});
