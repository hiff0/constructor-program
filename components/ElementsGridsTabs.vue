<template>
    <v-card>
        <v-tabs
            v-model="tab"
            bg-color="primary"
        >
            <v-tab value="jump">
                Прыжки
            </v-tab>
            <v-tab value="spin">
                Вращения
            </v-tab>
            <v-tab value="track">
                Дорожки
            </v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="jump">
                    <ElementsGrid
                        :elements="jumps"
                    />
                </v-window-item>

                <v-window-item value="spin">
                    <ElementsGrid
                        :elements="spins"
                    />
                </v-window-item>

                <v-window-item value="track">
                    <ElementsGrid
                        :elements="tracks"
                    />
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script
    setup
    lang="ts"
>

const tab = ref(null)
const jumps = useJumps()
const spins = useSpins()
const tracks = useTracks()

</script>
