import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin for client-side routing fallback
const htmlFallback = {
  name: 'html-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // If the request URL is within the base path and not for a known file
      if (req.url == '/portfolio') {
        // Rewrite the URL to the base index.html
        req.url = '/portfolio/'; 
      }
      next();
    });
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), htmlFallback],
  base: '/portfolio/',
})