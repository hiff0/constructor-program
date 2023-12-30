export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],

    imports: {
        dirs: [
            './feature'
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
        '@invictus.codes/nuxt-vuetify',
        '@nuxtjs/eslint-module',
        '@sidebase/nuxt-auth'
    ],

    build: {
        transpile: ['jsonwebtoken']
    },

    auth: {
        baseURL: 'api/auth',
        provider: {
            type: 'local',
            pages: {
                login: '/signin'
            },
            token: {
                signInResponseTokenPointer: '/token/accessToken'
            }
        }
    }
})
