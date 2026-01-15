import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ViteDevServer } from 'vite'
import type { Connect } from 'vite'
import type { ServerResponse } from 'node:http';

// Custom plugin for client-side routing fallback
const htmlFallback = {
  name: 'html-fallback',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req: Connect.IncomingMessage, _res: ServerResponse, next: Connect.NextFunction) => {
      // If the request URL is within the base path and not for a known file
      if (req.url === '/portfolio') {
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