<template>
    <v-card>
        <div class="d-flex flex-row">
            <v-tabs
                v-model="tab"
                bg-color="primary"
                direction="vertical"
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
                <v-tab value="addition">
                    Дополнительно
                </v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <v-window-item value="jump">
                    <v-card flat>
                        <v-card-text>
                            <ElementsVerticalList :elements="jumps" />
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="spin">
                    <v-card flat>
                        <v-card-text>
                            <ElementsVerticalList :elements="spins" />
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="track">
                    <v-card flat>
                        <v-card-text>
                            <ElementsVerticalList :elements="tracks" />
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="addition">
                    <v-card flat>
                        <v-card-text>
                            Additions
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>

            <ElementParametersForm
                :selected-element-index="selectedElementIndex"
            />
        </div>
    </v-card>
</template>

<script
    lang="ts"
    setup
>
import { ref } from 'vue'
import ElementsVerticalList from '@/widgets/ElementsVerticalList/ui/ElementsVerticalList'
import ElementParametersForm from '@/features/SelectElementParameters/ui/ElementParametersForm'
import { useJumps, useSpins, useTracks } from '@/composables'

const tab = ref(null)
const selectedElementIndex = ref(0)

const jumps = useJumps()
const spins = useSpins()
const tracks = useTracks()

</script>
