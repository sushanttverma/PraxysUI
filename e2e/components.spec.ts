import { test, expect } from "@playwright/test";

test.describe("Components page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/components");
  });

  test("shows the Components heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /components/i })
    ).toBeVisible();
  });

  test("search input is present and functional", async ({ page }) => {
    const search = page.getByPlaceholder("Search components...");
    await expect(search).toBeVisible();

    await search.fill("button");
    // Some results should still appear
    const cards = page.locator('[role="button"]');
    await expect(cards.first()).toBeVisible();
  });

  test("clear search button appears when query is typed", async ({ page }) => {
    const search = page.getByPlaceholder("Search components...");
    await search.fill("xyz-no-results");

    // clear button (X icon)
    const clearBtn = page.locator('button[class*="absolute"]').last();
    await expect(clearBtn).toBeVisible();
  });

  test("shows empty state for unmatched search", async ({ page }) => {
    const search = page.getByPlaceholder("Search components...");
    await search.fill("zzz-no-match-at-all-xyz");

    await expect(page.getByText(/no components match/i)).toBeVisible();
    await expect(page.getByText(/clear filters/i)).toBeVisible();
  });

  test("category filter buttons are present", async ({ page }) => {
    // At minimum: 'All' button + at least one category
    const allBtn = page.getByRole("button", { name: /^All/i });
    await expect(allBtn).toBeVisible();
  });
});
