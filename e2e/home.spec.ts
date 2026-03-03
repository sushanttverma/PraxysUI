import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads and shows the hero heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Praxys/i);
    // The hero should render some visible content
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("navbar is visible", async ({ page }) => {
    await page.goto("/");
    // The navbar pill is fixed at the top
    const navbar = page.locator("nav, [class*='fixed']").first();
    await expect(navbar).toBeVisible();
  });

  test("navigates to /components from the navbar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /components/i }).first().click();
    await expect(page).toHaveURL(/\/components/);
  });
});
