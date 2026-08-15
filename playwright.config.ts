import { defineConfig, devices } from "@playwright/test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Each run gets a clean throwaway DB so the smoke suite never touches
// data/layaida.db (dev) or the systemd deployment's LAYAIDA_DB.
const E2E_DB = path.join(os.tmpdir(), "layaida-e2e.db");
for (const f of [E2E_DB, `${E2E_DB}-wal`, `${E2E_DB}-shm`]) {
  fs.rmSync(f, { force: true });
}

const PORT = 3210;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // NEVER a bare `npm run build` here: `ecole.service` serves the live `.next`
    // from this same directory and holds that build's chunk manifest in memory,
    // so rebuilding into it makes the public site 400 on every chunk
    // (ROADMAP P4-T5 — that is exactly how the site broke for four days).
    // Build and serve out of the scratch dist dir instead; NEXT_DIST_DIR is read
    // by next.config.ts and covers `next start` as well as the build.
    command: `npm run build:verify && npm run start -- -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    env: { LAYAIDA_DB: E2E_DB, NEXT_DIST_DIR: ".next-verify" },
  },
});
