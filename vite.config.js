import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: parseInt(process.env.PORT) || 5173,
    strictPort: false,
    host: true,
    proxy: {
      '/api': {
        // API_PROXY_TARGET is a plain Node env var (not exposed to browser).
        // Falls back to local backend port 5001 for dev.
        target: process.env.API_PROXY_TARGET || 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-core';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-libs';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
