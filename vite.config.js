import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import { viteMarkdownPlugin } from './scripts/vite-markdown-plugin.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  plugins: [
    viteMarkdownPlugin(),
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', 'ai.txt', '**/*.{png,jpg,jpeg,svg,mp3,wav,json,pdf}'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json,mp3,wav,pdf}'],
        maximumFileSizeToCacheInBytes: 10000000, // 10MB to ensure large game assets are cached
        navigateFallbackDenylist: [/^\/assets\/resume\//, /\.pdf$/, /\.txt$/, /\.xml$/, /\.md$/]
      },
      manifest: {
        name: 'The Arcade by Aritro',
        short_name: 'Arcade',
        description: 'An arcade of games to play with',
        theme_color: '#ffffff',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Ensure alias points to the src directory
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async') || id.includes('react/')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
          }
        }
      }
    }
  }
});
