<template>
    <div>
        <v-row>
            <v-col>
                <ProgramName />
                <RinkCanvas
                    :currentsThreeElements="currentsThreeElements"
                />
                <ProgramPlayer
                    v-if="isFileLoad"
                    :currentsThreeElements="currentsThreeElements"
                />
                <AVWaveForm
                    v-if="isFileLoad"
                    :source="audioMetaData.audioUrl"
                />
                <SelectFile
                    v-else
                    @load-audio="onLoadAudio"
                />

                <ElemetsTable
                    :elements="elements"
                    @element-delete="onElementDelete"
                />
            </v-col>
            <v-col cols="4">
                <ElementsGridsTabs />
            </v-col>
        </v-row>
    </div>
</template>

//TODO: перейти на FSD

<script
    setup
    lang="ts"
>
import type { ElementTableView, CurrentThreeElements } from '@/interfaces'

definePageMeta({
    layout: 'default'
})

const elements = useTableElements()
const stepSequence = useStepSequence()
const audioMetaData = useAudioMetaData()

const isFileLoad = ref<boolean>(false)
const currentsThreeElements = computed<CurrentThreeElements>(() => {
    const currentElement = elements.value.find(element => element.startTime >= audioMetaData.value.currentPlayerTime &&
        element.endTime < audioMetaData.value.currentPlayerTime)
    const currentElementIndex = elements.value.indexOf(currentElement)
    const nextElement = elements.value[currentElementIndex - 1] || null
    const prevElement = elements.value[currentElementIndex + 1] || null

    return {
        currentElement,
        nextElement,
        prevElement
    }
})

const onLoadAudio = () => {
    isFileLoad.value = true
}

const onElementDelete = (element: ElementTableView) => {
    elements.value = elements.value.filter(el => el !== element)
    element.draggebleDom?.remove()
    stepSequence.value.filter(el => el.from !== element.draggebleDom && el.to !== element.draggebleDom)
}
</script>
