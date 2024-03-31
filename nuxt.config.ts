export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css'
    ],

    nitro: {
        plugins: ['~/server/index.ts']
    },

    runtimeConfig: {
        authSecret: process.env.AUTH_SECRET
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
        '@nuxtjs/eslint-module',
        'nuxt-server-utils',
        '@sidebase/nuxt-auth'
    ],

    build: {
        transpile: [
            'jsonwebtoken',
            'vuetify'
        ]
    },

    nuxtServerUtils: {
        mongodbUri: process.env.MONGODB_URI
    },

    auth: {
        provider: {
            type: 'authjs'
        }
    }
})
