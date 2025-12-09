// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: "google-site-verification",
          content: "r9rvLpe3DW-KVtzEcxfpC_Q9rzx2_lOMw5N_eL0iUTQ",
        },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["@/styles/main.scss"],
  routeRules: {
    "/": { redirect: "/fleas" },
    "/fleas": { prerender: true },
  },
  devServer: {
    host: "",
  },
});
