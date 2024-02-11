import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        link: '#D0D1D2',
        'link-active': '#8C8F92'
    }
    // variables: {
    // }
}

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        ssr: true,
        theme: {
            defaultTheme: 'customLightTheme',
            themes: {
                customLightTheme
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})
