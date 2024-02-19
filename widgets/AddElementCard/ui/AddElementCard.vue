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
                            <ElementsVerticalList
                                :elements="jumps"
                                type="jump"
                                @element-click="onJumpClick"
                            />
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="spin">
                    <v-card flat>
                        <v-card-text>
                            <ElementsVerticalList
                                :elements="spins"
                                type="spin"
                                @element-click="onSpinClick"
                            />
                        </v-card-text>
                    </v-card>
                </v-window-item>

                <v-window-item value="track">
                    <v-card flat>
                        <v-card-text>
                            <ElementsVerticalList
                                :elements="tracks"
                                type="track"
                                @element-click="onTrackClick"
                            />
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
                :selected-element="selectedElement"
                @close-dialog="onDialogClose"
                @add-element="onDialogClose"
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
import type { Jump, Track, Spin } from '@/interfaces'

declare function statusHandler(value: never): never

type Tabs = 'jump' | 'track' | 'spin' | 'addition'

const tab = ref<Tabs>('jump')

const jumps = useJumps()
const spins = useSpins()
const tracks = useTracks()

const emits = defineEmits(['closeDialog'])

const selectedElementIndex = ref<number>(0)
const selectedElement = ref<Jump | Track | Spin>(jumps.value[selectedElementIndex.value])

const onJumpClick = (index: number) => {
    selectedElementIndex.value = index
    selectedElement.value = jumps.value[index]
}

const onSpinClick = (index: number) => {
    selectedElementIndex.value = index
    selectedElement.value = spins.value[index]
}

const onTrackClick = (index: number) => {
    selectedElementIndex.value = index
    selectedElement.value = tracks.value[index]
}

const onDialogClose = () => {
    emits('closeDialog')
}

watch(tab, (currentTab) => {
    if (currentTab === 'jump') {
        selectedElement.value = jumps.value[selectedElementIndex.value]
        return
    } else if (currentTab === 'spin') {
        selectedElement.value = spins.value[selectedElementIndex.value]
        return
    } else if (currentTab === 'track') {
        selectedElement.value = tracks.value[selectedElementIndex.value]
        return
    } else if (currentTab === 'addition') {
        return
    }

    statusHandler(currentTab)
})

</script>
