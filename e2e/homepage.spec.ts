import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("displays name and title", async ({ page }) => {
    await page.goto("/en");

    // Check for name particle text (canvas element)
    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    // Check for title
    await expect(page.getByText(/Principal Software Engineering Manager/i)).toBeVisible();
  });

  test("displays tagline", async ({ page }) => {
    await page.goto("/en");

    await expect(page.getByText(/15 years building web/i)).toBeVisible();
  });

  test("renders social links", async ({ page }) => {
    await page.goto("/en");

    // Check all social links exist
    await expect(page.getByLabel("Blog")).toBeVisible();
    await expect(page.getByLabel("LinkedIn")).toBeVisible();
    await expect(page.getByLabel("X (Twitter)")).toBeVisible();
    await expect(page.getByLabel("GitHub")).toBeVisible();
  });

  test("social links have correct hrefs", async ({ page }) => {
    await page.goto("/en");

    await expect(page.getByLabel("Blog")).toHaveAttribute("href", "https://lizheng.blog");
    await expect(page.getByLabel("LinkedIn")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nocoo/",
    );
    await expect(page.getByLabel("X (Twitter)")).toHaveAttribute("href", "https://x.com/zhengli");
    await expect(page.getByLabel("GitHub")).toHaveAttribute("href", "https://github.com/nocoo");
  });
});
