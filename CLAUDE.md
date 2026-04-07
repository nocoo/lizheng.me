# lizheng.me

Personal homepage of Zheng Li, built with vinext (Vite + Next.js API).

## Tech Stack

- **Framework**: vinext (Vite reimplementation of Next.js)
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl (en/zh)
- **Deployment**: Cloudflare Workers

## Development

```bash
bun install
bun run dev
```

## Deployment

Manual deployment to Cloudflare Workers:

```bash
bunx vinext deploy --name lizhengme
```

This deploys to: https://lizhengme.nocoo.workers.dev

## Quality (6DQ S-Grade)

| Dimension | Status | Details |
|-----------|--------|---------|
| L1 | ✅ | vitest, 16 tests, 93.75% function coverage |
| L2 | ✅ | Playwright API tests (redirects) |
| L3 | ✅ | Playwright E2E specs (5 specs) |
| G1 | ✅ | TypeScript strict + Biome strict |
| G2 | ✅ | osv-scanner + gitleaks |
| D1 | N/A | Static site, no database |

Hooks: `pre-commit` (G1+L1) + `pre-push` (G2)

## Blog Migration

Old blog paths (e.g., `/2024/01/post-slug`, `/category/*`, `/tag/*`) are 301 redirected to https://lizheng.blog via middleware.
