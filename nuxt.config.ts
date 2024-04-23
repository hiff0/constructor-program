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
            'vuetify'
        ]
    },

})
