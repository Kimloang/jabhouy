
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use './' for relative paths or '/repo-name/' for GitHub Pages
  // base: 'jabhouy' // Use './' for relative paths or '/repo-name/' for GitHub Pages
  // build: {
  //   outDir: 'dist',
  //   sourcemap: false,
  // },
});
