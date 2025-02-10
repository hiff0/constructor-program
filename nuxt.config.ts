import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css'
  ],

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@features': fileURLToPath(new URL('./features', import.meta.url)),
    '@entities': fileURLToPath(new URL('./entities', import.meta.url)),
    '@widgets': fileURLToPath(new URL('./widgets', import.meta.url)),
    '@shared': fileURLToPath(new URL('./shared', import.meta.url)),
    '@composables': fileURLToPath(new URL('./composables', import.meta.url)),
    '@layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
    '@public': fileURLToPath(new URL('./public', import.meta.url)),
    '@interfaces': fileURLToPath(new URL('./interfaces', import.meta.url))
  },

  imports: {
    dirs: [
      'feature/**',
      'entities/**',
      'widgets/**',
      'shared/**'
    ]
  },

  $production: {
    // TODO: write production configuration
  },
  $development: {
    devtools: { enabled: true }
  },

  modules: [
    '@nuxt/image',
    '@nuxtjs/eslint-module'
  ],

  build: {
    transpile: [
      'vuetify'
    ]
  }
})
