// https://nuxt.com/docs/api/configuration/nuxt-config
const SITE_URL = 'https://yai.to'
const DESCRIPTION =
  '掛山夜糸（yaito3014）の個人サイト。C++ を中心としたライブラリ・ツールの開発と、Zenn での技術記事執筆について。'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.PR_NUMBER ? `/pr-${process.env.PR_NUMBER}/` : '/',
    head: {
      htmlAttrs: { lang: 'ja' },
      titleTemplate: '%s | yai.to',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: DESCRIPTION },
        { name: 'theme-color', content: '#fbfbfd', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0f1217', media: '(prefers-color-scheme: dark)' },
        { property: 'og:site_name', content: 'yai.to' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:image', content: 'https://avatars.githubusercontent.com/u/29890657?v=4' },
        { name: 'twitter:card', content: 'summary' },
      ],
    },
  },
  nitro: {
    prerender: {
      // Static HTML pages under public/; not Nuxt routes, so keep the crawler out of them.
      ignore: ['/yaitoPages'],
    },
  },
  runtimeConfig: {
    // Set NUXT_GITHUB_TOKEN at build time to raise the GitHub API rate limit.
    githubToken: '',
  },
})
