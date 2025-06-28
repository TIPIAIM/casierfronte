// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://casiergn.verser.app",
      routes: [
        "/",
        "/seconnecter",
        "/enregistrer",
        "/videoexplic",
        "/demande-guinee",
        "/demande-etranger",
        "/visiteur",
        "/adminfils",
        "/adminmere",
        "/demande",
        "/demandesList",
        "/demandeid",
        "/demandemisejour",
        "/EnregistreCondanation",
        "/listeCondamnations",
        "/casier",
        "/etranger",
      ],
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false, // tu met true pour tes testworkbox Désactive le service worker en mode développement àctive en dev
      },
      includeAssets: [
        "favicon.ico",
        "logo192.png",
        "logo512.png",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Casier Judiciaire Guinée",
        short_name: "CasierGN",
        description: "Plateforme digitale du casier judiciaire en Guinée.",
        start_url: ".",
        scope: ".",
        display: "standalone",
        orientation: "portrait",
        background_color: "#fff",
        theme_color: "#2563eb",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/logo384.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB (par exemple) rollupOptions
        // Fallback offline page (optionnel) :casieradmin
        // Les routes à pré-cacher (mets ici toutes les pages importantes !)
        additionalManifestEntries: [
          { url: "/", revision: null },
          { url: "/seconnecter", revision: null },
          { url: "/enregistrer", revision: null },
          { url: "/verify-email", revision: null },
          { url: "/demande-guinee", revision: null },
          { url: "/demande-etranger", revision: null },
          { url: "/videoexplic", revision: null },
          { url: "/demande", revision: null },
          { url: "/demandesList", revision: null },
          { url: "/gestiondesdeux", revision: null },
          { url: "/demandesListstati", revision: null },
          { url: "/debut", revision: null },
          { url: "/gestionDetC", revision: null },
          { url: "/casieradmin", revision: null },
          { url: "/gestiondemande", revision: null },
          { url: "/gestionCondanations", revision: null },
          { url: "/adminmere", revision: null },
          { url: "/EnregistreCondanation", revision: null },
          { url: "/sessionlist", revision: null },
          { url: "/listeCondamnations", revision: null },
          { url: "/casier", revision: null },
          { url: "/adminfils", revision: null },
          { url: "/voir-mes-demandes", revision: null },
          { url: "/etranger", revision: null },
          // Ajoute toutes les routes fixes ici gestiondesdeux
          // Pour les routes dynamiques comme /demandeid/:id => mets au moins le chemin de base, ou prépare une page de fallback "détail"
        ],
        // Ajoute ceci pour gerer les pàges non rencontrées:
        navigateFallback: "/offline.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 mois
              },
            },
          },
          {
            //urlPattern: /^http:\/\/localhost:2025\/api\/\/?.*$/,
            // urlPattern: /^https:\/\/casiergn\.verser\.app\/api\//,
            urlPattern: /^https:\/\/casierba\.onrender\.com\/api\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60,
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: /^http:\/\/localhost:2027\/api\/\/?.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60,
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
  },
  // désactive le SW en mode dev, réactive-le pour build build met true si tu serà en pro
});
{
  /**
   En mode dev pur (npm run dev + enabled: false)
Pas de bouton d’installation, c’est normal et voulu.

On désactive la PWA en dev pour éviter les bugs de cache/hot reload.
 
Très bon travail, ta configuration vite.config.js est quasi parfaite pour une PWA. Tu as bien ajouté :

maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 ✅

des routes à pré-cacher via additionalManifestEntries ✅

un navigateFallback vers /offline.html ✅

des règles runtimeCaching bien pensées ✅

découpage manualChunks pour alléger le JS global ✅
*/
}
