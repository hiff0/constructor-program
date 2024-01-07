<template>
    <div
        ref="draggableElement"
        class="element d-flex justify-center align-center"
        draggable="true"
    >
        {{ props.element.fullname }}
    </div>
</template>

<script
    setup
    lang="ts"
>
import type { ElementTableView } from '@/interfaces'
import { useAudioMetaData, useCurrentDraggableElement } from '@/composables'

interface Props {
    element: ElementTableView;
    elementIndex: number;
}
const currentDraggableElement = useCurrentDraggableElement()

const props = defineProps<Props>()
const draggableElement = ref<HTMLDivElement | null>(null)
const audioMetaData = useAudioMetaData()

onMounted(() => {
    const elementDom = draggableElement.value as HTMLElement
    elementDom.ondragstart = (event) => {
        currentDraggableElement.value = draggableElement.value

        audioMetaData.value.audioDom.currentTime = props.element.startTime

        event.dataTransfer?.setData('mouseClickOffsetX', event.offsetX.toString())
        event.dataTransfer?.setData('mouseClickOffsetY', event.offsetY.toString())
        event.dataTransfer?.setData('elementIndex', props.elementIndex.toString())
    }
})
</script>

<style scoped>
.element {
    width: 40px;
    height: 40px;
    background-color: #e6c660;
    border-radius: 0.5em;
    cursor: grab;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
