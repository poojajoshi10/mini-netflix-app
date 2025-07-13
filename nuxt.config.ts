export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [],
  runtimeConfig: {
    public: {
      omdbApiKey: process.env.OMDB_API_KEY,
    },
  },
})