import { test, expect } from '@playwright/test';

test.describe('Core pages', () => {
  test('should load login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toHaveText('Login');
  });

  test('should load signup page', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('h1')).toHaveText('Sign Up');
  });

  test('should load dashboard page after login', async ({ page }) => {
    // This test assumes a logged-in state or mocks authentication
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });

  test('should load missions page', async ({ page }) => {
    await page.goto('/missions');
    await expect(page.locator('h1')).toHaveText('Missions');
  });

  test('should load prospects page', async ({ page }) => {
    await page.goto('/prospects');
    await expect(page.locator('h1')).toHaveText('Prospects');
  });

  test('should load notifications page', async ({ page }) => {
    await page.goto('/notifications');
    await expect(page.locator('h1')).toHaveText('Notifications');
  });

  test('should load comments page', async ({ page }) => {
    await page.goto('/comments');
    await expect(page.locator('h1')).toHaveText('Comments');
  });

  test('should load documents page', async ({ page }) => {
    await page.goto('/documents');
    await expect(page.locator('h1')).toHaveText('Documents');
  });

  test('should load donations page', async ({ page }) => {
    await page.goto('/donations');
    await expect(page.locator('h1')).toHaveText('Donations');
  });

  test('should load stats page', async ({ page }) => {
    await page.goto('/stats');
    await expect(page.locator('h1')).toHaveText('Statistics');
  });
});
