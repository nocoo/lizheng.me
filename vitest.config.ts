import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "utils/**/*.{ts,tsx}"],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.d.ts",
        "app/**/page.tsx",
        "app/**/layout.tsx",
        "app/**/loading.tsx",
        "app/**/error.tsx",
        "app/**/not-found.tsx",
        // UI shell components (6DQ: UI thin shells exempted from coverage)
        "components/home-client.tsx",
        "components/particle-name.tsx",
        // Canvas-based components (jsdom doesn't support canvas context)
        "components/flashlight.tsx",
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
