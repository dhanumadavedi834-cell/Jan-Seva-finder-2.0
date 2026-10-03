import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

// Cloudflare Pages native SPA plugin: generates dist/200.html from dist/index.html
function cloudflarePagesSpaPlugin() {
  return {
    name: 'cloudflare-pages-spa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      const spaFallbackPath = path.join(distDir, '200.html');
      try {
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, spaFallbackPath);
        }
        const workerInDist = path.join(distDir, '_worker.js');
        if (fs.existsSync(workerInDist)) {
          fs.unlinkSync(workerInDist);
        }
      } catch {
        // fail-safe
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cloudflarePagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
