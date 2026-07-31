import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // Relative base path: works out of the box whether this is deployed at
  // a domain root (Vercel/Netlify/custom domain) or in a GitHub Pages
  // project subpath (username.github.io/repo-name/) — no per-host editing needed.
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
  },
})
