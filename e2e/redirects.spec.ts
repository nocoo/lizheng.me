import { expect, test } from "@playwright/test";

test.describe("Blog redirects (301 to lizheng.blog)", () => {
  test("redirects post URLs", async ({ request }) => {
    const response = await request.get("/2024/01/test-post", {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe("https://lizheng.blog/2024/01/test-post");
  });

  test("redirects category URLs", async ({ request }) => {
    const response = await request.get("/category/tech", {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe("https://lizheng.blog/category/tech");
  });

  test("redirects tag URLs", async ({ request }) => {
    const response = await request.get("/tag/javascript", {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe("https://lizheng.blog/tag/javascript");
  });

  test("redirects feed.xml", async ({ request }) => {
    const response = await request.get("/feed.xml", {
      maxRedirects: 0,
    });

    expect(response.status()).toBe(301);
    expect(response.headers().location).toBe("https://lizheng.blog/feed.xml");
  });
});
