import Vue from 'vue'

export const methods = {
    getDinamicFile (name: string) {
        return require(`@/${name}`)
    }
}

Vue.mixin({
    methods
})
