import { expect, test } from "@playwright/test";

test.describe("Theme switching", () => {
  test("toggles from light to dark theme", async ({ page }) => {
    await page.goto("/en");

    // Initially light mode (no dark class on html)
    const html = page.locator("html");

    // Click theme toggle
    await page.getByLabel(/Switch to.*mode/).click();

    // Should have dark class
    await expect(html).toHaveClass(/dark/);
  });

  test("persists theme preference", async ({ page }) => {
    await page.goto("/en");

    // Toggle to dark mode
    await page.getByLabel(/Switch to.*mode/).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Reload page
    await page.reload();

    // Should still be dark mode
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
