import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input: ['index.html', 'climbing/index.html'] } },
  /**
   * GitHub Pages serves under /<repo>/, so we make base configurable.
   * - local dev: '/'
   * - GitHub Pages: '/<repo>/'
   */
  base: process.env.VITE_BASE ?? '/',
});
