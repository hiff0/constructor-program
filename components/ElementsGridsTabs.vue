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
                        :audio-duration="props.audioDuration"
                    />
                </v-window-item>

                <v-window-item value="spin">
                    <ElementsGrid
                        :elements="spins"
                        :audio-duration="props.audioDuration"
                    />
                </v-window-item>

                <v-window-item value="track">
                    <ElementsGrid
                        :elements="tracks"
                        :audio-duration="props.audioDuration"
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
interface Props {
    audioDuration: number;
}

const tab = ref(null)
const jumps = useJumps()
const spins = useSpins()
const tracks = useTracks()

const props = defineProps<Props>()

</script>
