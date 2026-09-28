// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/sanity',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode'
  ],

  i18n: {
    locales: [
      { code: 'pt', iso: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'pt',
    strategy: 'prefix_except_default', 
    langDir: 'locales/' 
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  }
})