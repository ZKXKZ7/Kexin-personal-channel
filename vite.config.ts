import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const standalone = process.env.CLIMBING_STANDALONE === '1';

export default defineConfig({
  plugins: [react()],
  publicDir: standalone ? false : 'public',
  build: standalone
    ? { outDir: 'dist-shared', rollupOptions: { input: 'climbing/index.html' } }
    : { rollupOptions: { input: 'index.html' } },
  /**
   * GitHub Pages serves under /<repo>/, so we make base configurable.
   * - local dev: '/'
   * - GitHub Pages: '/<repo>/'
   */
  base: process.env.VITE_BASE ?? '/',
});
