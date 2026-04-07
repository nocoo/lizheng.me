import { expect, test } from "@playwright/test";

test.describe("Locale switching", () => {
  test("switches from English to Chinese", async ({ page }) => {
    await page.goto("/en");

    // Click locale switch button
    await page.getByLabel("Switch to 中文").click();

    // Should navigate to /zh
    await expect(page).toHaveURL(/\/zh$/);

    // Should show Chinese content
    await expect(page.getByText(/首席软件工程经理/)).toBeVisible();
  });

  test("switches from Chinese to English", async ({ page }) => {
    await page.goto("/zh");

    // Click locale switch button
    await page.getByLabel("Switch to English").click();

    // Should navigate to /en
    await expect(page).toHaveURL(/\/en$/);

    // Should show English content
    await expect(page.getByText(/Principal Software Engineering Manager/i)).toBeVisible();
  });
});
