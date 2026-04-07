import { expect, test } from "@playwright/test";

test.describe("SEO and Meta", () => {
  test("has correct title for English page", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Zheng Li.*Microsoft/i);
  });

  test("has correct title for Chinese page", async ({ page }) => {
    await page.goto("/zh");
    await expect(page).toHaveTitle(/李征.*微软/);
  });

  test("has Open Graph meta tags", async ({ page }) => {
    await page.goto("/en");

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute("content", /Zheng Li/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute("content", "profile");
  });

  test("has Twitter card meta tags", async ({ page }) => {
    await page.goto("/en");

    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute("content", "summary_large_image");
  });

  test("has JSON-LD structured data", async ({ page }) => {
    await page.goto("/en");

    const jsonLd = page.locator('script[type="application/ld+json"]');
    const content = await jsonLd.textContent();
    expect(content).toBeTruthy();

    if (content) {
      const data = JSON.parse(content);
      expect(data["@type"]).toBe("Person");
      expect(data.name).toBe("Zheng Li");
    }
  });

  test("has canonical URL", async ({ page }) => {
    await page.goto("/en");

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", "https://lizheng.me/en");
  });

  test("has alternate language links", async ({ page }) => {
    await page.goto("/en");

    const enAlternate = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(enAlternate).toHaveAttribute("href", "https://lizheng.me/en");

    const zhAlternate = page.locator('link[rel="alternate"][hreflang="zh"]');
    await expect(zhAlternate).toHaveAttribute("href", "https://lizheng.me/zh");
  });
});
