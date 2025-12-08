import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Required for Docker container access from host machine
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        // Use API_PROXY_TARGET for Docker internal routing, not VITE_API_URL
        // VITE_API_URL is for production builds where browser hits API directly
        target: process.env.API_PROXY_TARGET || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});