// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/ui",
    "@vueuse/nuxt",
  ],
  ui: {
    global: true,
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  typescript: {
    strict: false,
  },
	colorMode: {
    disableTransition: true
  },
});
