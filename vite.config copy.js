//vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://casiergn.vercel.app", //si tu ne lie pas sa ne marchera pas
      routes: [
        "/",
        "/seconnecter ",
        "enregistrer",
        "videoexplic",
        "demande-guinee",
        "demande-etranger",
        "visiteur",
        "adminfils",
        "adminmere",

        "demande",
        "demandesList",
        "demandeid",
        "demandemisejour",
        "EnregistreCondanation",
        "listeCondamnations",
        "casier",
        "voir-mes-demandes",
        "etranger",
      ], // Remplace par les routes de ton application
    }), // Remplace par ton domaine
  ],

  build: {
    outDir: "dist", // Assurez-vous que la sortie est "dist"
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
  },
});
