export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css'
    ],

    nitro: {
        plugins: ['~/server/index.ts']
    },

    imports: {
        dirs: [
            'feature/**',
            'entities/**',
            'widgets/**',
            'shared/**',
            'types/**'
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
            'jsonwebtoken',
            'vuetify'
        ]
    }

    // nuxtServerUtils: {
    //     mongodbUri: process.env.MONGODB_URI
    // },
    //
    // auth: {
    //     provider: {
    //         type: 'authjs'
    //     },
    //     baseURL: process.env.AUTH_ORIGIN
    // }
})
