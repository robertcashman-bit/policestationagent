import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['tests/unit/**/*.test.ts'],
    globals: false,
    environment: 'node',
    testTimeout: 30_000,
  },
});
