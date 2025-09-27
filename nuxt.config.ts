// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: process.env.PR_NUMBER ? `/pr-${process.env.PR_NUMBER}/` : '/',
  }
})
