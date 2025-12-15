import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, ".") }],
  },
  test: {
    environment: "jsdom",
    setupFiles: "tests/setupTests.ts",
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
  },
});
