#!/usr/bin/env bun

/**
 * L1 Coverage Check - ensures coverage meets 90% threshold
 * Exit code 0 = pass, non-zero = fail
 */

import { $ } from "bun";

async function main() {
  console.log("\n📊 L1 Coverage Check\n");

  try {
    // Run vitest with coverage - it will fail if thresholds aren't met
    await $`bun run vitest run --coverage`;
    console.log("\n✅ L1 Coverage Check: PASSED (≥90%)\n");
    process.exit(0);
  } catch (_error) {
    console.error("\n❌ L1 Coverage Check: FAILED (<90%)\n");
    process.exit(1);
  }
}

main();
