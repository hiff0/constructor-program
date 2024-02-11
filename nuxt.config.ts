export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css'
    ],

    imports: {
        dirs: [
            'feature/**',
            'entities/**',
            'widgets/**'
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
        // '@sidebase/nuxt-auth'
    ],

    build: {
        transpile: [
            'jsonwebtoken',
            'vuetify'
        ]
    }

    // auth: {
    //     baseURL: 'api/auth',
    //     provider: {
    //         type: 'local',
    //         pages: {
    //             login: '/signin'
    //         },
    //         token: {
    //             signInResponseTokenPointer: '/token/accessToken'
    //         }
    //     }
    // }
})
