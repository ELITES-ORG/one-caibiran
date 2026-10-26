import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * One identifier per build, baked into the bundle and written beside it.
 * Locally there is no commit SHA, so the timestamp does the same job.
 */
const BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? `local-${Date.now().toString(36)}`;

function buildIdFile(): Plugin {
  return {
    name: 'onekawayan-build-id',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'build-id.txt', source: BUILD_ID });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), buildIdFile()],
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // Proxying in dev keeps the browser on a single origin, so cookie-based
    // sessions behave the same locally as they will in production.
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
