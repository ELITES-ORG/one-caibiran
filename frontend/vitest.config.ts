import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Pure logic only. No jsdom, no Testing Library, no render assertions.
 * ADR 0007 explains why page rendering is not tested here.
 */
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    globals: false,
    include: ['src/**/*.test.ts'],
  },
});
