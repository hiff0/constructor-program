<template>
    <div class="d-flex justify-center align-center mb-5">
        <PlayerElementView
            :element="prevElement"
        />

        <NuxtImg
            src="./img/prev.png"
            alt="Предыдущий элемент"
            class="mx-3 element_player_button"
            @click="onElementClick(prevElement)"
        />

        <PlayerElementView
            :element="currentElement"
        />

        <!-- <v-icon
            icon="mdi-play"
            title="Следующий элемент"
            size="x-large"
            color="green"
            tag="button"
            class="mr-5"
            @click="onElementClick(nextElement)"
        >
        </v-icon> -->
        <NuxtImg
            src="./img/next.png"
            alt="Следующий элемент"
            class="mx-3 element_player_button"
            @click="onElementClick(nextElement)"
        />

        <PlayerElementView
            :element="nextElement"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
import type { ElementTableView, ElementView } from '@/interfaces'

const emptyElemment: ElementView = {
    fullname: '',
    difficultLvls: {},
    key: '',
    name: '',
    title: ''
}

const audioMetaData = useAudioMetaData()
const elements = useTableElements()
const currentElementIndex = ref<number | null>(null)

const getCurrentElement = (): ElementTableView | ElementView => {
    const currentElement = elements.value.find((element, index) => {
        if (element.startTime <= audioMetaData.value.currentPlayerTime &&
            element.endTime > audioMetaData.value.currentPlayerTime) {
            currentElementIndex.value = index
            return true
        }

        currentElementIndex.value = null
        return false
    })

    return currentElement || emptyElemment
}

const getPrevElement = (): ElementTableView | ElementView => {
    return currentElementIndex.value !== null
        ? elements.value[currentElementIndex.value - 1] || emptyElemment
        : emptyElemment
}

const getNextElement = (): ElementTableView | ElementView => {
    return currentElementIndex.value !== null
        ? elements.value[currentElementIndex.value + 1] || emptyElemment
        : emptyElemment
}

const currentElement = ref<ElementTableView | ElementView>(getCurrentElement())
const prevElement = ref<ElementTableView | ElementView>(getPrevElement())
const nextElement = ref<ElementTableView | ElementView>(getNextElement())

watch(audioMetaData, () => {
    currentElement.value = getCurrentElement()
    prevElement.value = getPrevElement()
    nextElement.value = getNextElement()
}, {
    deep: true
})

const onElementClick = (element: ElementTableView | ElementView) => {
    if (element.startTime !== undefined && element.startTime !== null) {
        audioMetaData.value.audioDom.currentTime = element.startTime
    }
}
</script>

<style scoped>
.element_player_button {
    cursor: pointer;
}
</style>
