import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("/auth/login");
  await page.fill('input[placeholder="Email"]', "test@solia.io");
  await page.fill('input[placeholder="Mot de passe"]', "password");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
  await expect(page.locator("text=Connecté en tant que")).toContainText("test@solia.io");
});