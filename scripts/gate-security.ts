#!/usr/bin/env bun

/**
 * G2 Security Gate - runs osv-scanner and gitleaks in parallel
 * Exit code 0 = pass, non-zero = fail (hard gate)
 */

import { $ } from "bun";

async function runOsvScanner(): Promise<boolean> {
  console.log("🔍 Running osv-scanner...");
  try {
    await $`osv-scanner --lockfile=bun.lock --config=osv-scanner.toml`.quiet();
    console.log("✅ osv-scanner: No vulnerabilities found");
    return true;
  } catch (_error) {
    console.error("❌ osv-scanner: Vulnerabilities detected");
    return false;
  }
}

async function runGitleaks(): Promise<boolean> {
  console.log("🔍 Running gitleaks...");
  try {
    await $`gitleaks protect --staged --no-banner`.quiet();
    console.log("✅ gitleaks: No secrets detected");
    return true;
  } catch (_error) {
    console.error("❌ gitleaks: Secrets detected in staged files");
    return false;
  }
}

async function main() {
  console.log("\n🔒 G2 Security Gate\n");

  const [osvResult, gitleaksResult] = await Promise.all([runOsvScanner(), runGitleaks()]);

  console.log("");

  if (osvResult && gitleaksResult) {
    console.log("✅ G2 Security Gate: PASSED\n");
    process.exit(0);
  } else {
    console.error("❌ G2 Security Gate: FAILED\n");
    process.exit(1);
  }
}

main();
