import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "CATXI",
        name: "CATXI | 대학교 택시 스팟",
        icons: [
          {
            src: "/icon.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "/icon2.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/icon3.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#FEFEFE",
        background_color: "#FEFEFE"
      },
      workbox: {
        globPatterns: [
          'index.html',
          'manifest.webmanifest',
          '**/*.{js,css,ico,png,svg}'
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\..*$/i,  // API 요청에 대한 캐싱
            //캐싱 전략 NetWork만
            handler: 'NetworkOnly',
            options: {
              cacheName: 'catxi-pwa-cache-v1',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60  // 24시간
              },
            },
          },
        ],
      },
    }),
  ],
});
