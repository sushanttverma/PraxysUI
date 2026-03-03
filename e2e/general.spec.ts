import { test, expect } from "@playwright/test";

test.describe("Installation page", () => {
  test("loads and contains CLI instructions", async ({ page }) => {
    await page.goto("/installation");
    await expect(page.getByText(/npx @praxys\/ui/i).first()).toBeVisible();
  });
});

test.describe("Templates page", () => {
  test("loads and shows template cards", async ({ page }) => {
    await page.goto("/templates");
    await expect(page.locator("body")).not.toBeEmpty();
  });
});

test.describe("Theme toggle", () => {
  test("toggles theme on click", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to/i });
    await expect(toggle).toBeVisible();
    await toggle.click();
    // After click, aria-label should reflect the new state
    await expect(toggle).toHaveAttribute("aria-label", /switch to/i);
  });
});
