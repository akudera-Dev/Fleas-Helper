// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
      ],
      meta: [
        {
          name: "google-site-verification",
          content: "r9rvLpe3DW-KVtzEcxfpC_Q9rzx2_lOMw5N_eL0iUTQ",
        },
        {
          name: "color-scheme",
          content: "dark",
        },
        {
          name: "theme-color",
          content: "#0b1a24",
        },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],
  css: ["@/styles/main.scss"],
  routeRules: {
    "/": { redirect: "/fleas" },
    "/fleas": { prerender: true },
  },
  devServer: {
    host: "",
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Fleas Helper",
      short_name: "Fleas Helper",
      description: "Interactive checklist for collecting all fleas in Silksong",
      theme_color: "#0b1a24",
      background_color: "#0b1a24",
      display: "standalone",
      icons: [
        {
          src: "/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/favicon.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
    },
  },
});
