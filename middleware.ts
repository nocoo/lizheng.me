import { type NextRequest, NextResponse } from "next/server";

const locales = ["en", "zh"] as const;
const defaultLocale = "en";

// Reserved paths for this site (not redirected to blog)
const reservedPaths = ["/en", "/zh", "/projects"];

// Blog path patterns - 301 redirect to lizheng.blog
const blogPatterns = [
  /^\/\d{4}\/\d{2}\//, // Post URLs: /2024/01/post-slug
  /^\/category(\/|$)/, // /category or /category/*
  /^\/tag(\/|$)/, // /tag or /tag/*
  /^\/archive(\/|$)/, // /archive or /archive/*
  /^\/search$/, // /search
  /^\/feed\.xml$/, // /feed.xml
  /^\/feed$/, // /feed
  /^\/page\//, // /page/2, /page/3
  /^\/preview\//, // /preview/*
  /^\/sitemap\.xml$/, // /sitemap.xml (blog's sitemap)
  /^\/admin(\/|$)/, // /admin/*
  /^\/login$/, // /login
];

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const parts = acceptLanguage.split(",")[0]?.split("-");
    const preferred = parts?.[0]?.toLowerCase();
    if (preferred && (locales as readonly string[]).includes(preferred)) {
      return preferred;
    }
    if (preferred === "zh") return "zh";
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    (pathname.includes(".") && !pathname.endsWith(".xml"))
  ) {
    return;
  }

  // Check if this is a blog path - 301 redirect to lizheng.blog
  if (blogPatterns.some((pattern) => pattern.test(pathname))) {
    const blogUrl = `https://lizheng.blog${pathname}`;
    return NextResponse.redirect(blogUrl, 301);
  }

  // Check if pathname starts with a locale or reserved path
  const isReservedPath = reservedPaths.some(
    (path) => pathname.startsWith(`${path}/`) || pathname === path,
  );

  if (isReservedPath) return;

  // Check if pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Root path - redirect to locale
  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Unknown paths - redirect to locale-prefixed homepage
  // This prevents 404s from being indexed and directs users to main content
  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next|images).*)"],
};
