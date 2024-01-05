<template>
    <v-row
        id="draggable_canvas"
        class="mb-5 ml-1"
    >
        <v-col>
            <v-row>
                <div
                    id="canvas"
                    ref="canvas"
                    class="canvas-container"
                >
                    <svg
                        ref="chart"
                        class="chart"
                    >
                        <path class="u-path" />
                    </svg>
                </div>
            </v-row>
            <v-row>
                <v-checkbox
                    v-model="isConstructorEditable"
                    label="Редактирование"
                ></v-checkbox>
            </v-row>
        </v-col>
        <v-col>
            <DraggableElementGrid />
        </v-col>
    </v-row>
</template>

<script
    lang="ts"
    setup
>
import { setElementMoveFunction, disableElementMoveFunction } from '@/utils/mouse'
import { hideElement, showElement } from '@/utils/domManipulation'

const canvas = ref<HTMLDivElement | null>(null)
const chart = ref<HTMLElement | null>(null)

const currentDraggableElement = useCurrentDraggableElement()
const isConstructorEditable = useIsConstructorEditable()
const audioMetaData = useAudioMetaData()
const elements = useTableElements()

const setTargetCanvasDraggHandler = (targetCanvas: HTMLDivElement) => {
    targetCanvas.ondrop = (event) => {
        targetCanvas.style.backgroundColor = 'white'

        if (currentDraggableElement.value) {
            const mouseClickOffsetX = parseInt(event.dataTransfer?.getData('mouseClickOffsetX') as string)
            const mouseClickOffsetY = parseInt(event.dataTransfer?.getData('mouseClickOffsetY') as string)
            const elementIndex = parseInt(event.dataTransfer?.getData('elementIndex') as string)

            const x = event.offsetX - mouseClickOffsetX
            const y = event.offsetY - mouseClickOffsetY

            targetCanvas.appendChild(currentDraggableElement.value)
            currentDraggableElement.value.style.position = 'absolute'
            currentDraggableElement.value.style.zIndex = '1000'
            currentDraggableElement.value.style.top = `${y}px`
            currentDraggableElement.value.style.left = `${x}px`
            currentDraggableElement.value.style.cursor = 'pointer'

            setElementMoveFunction(targetCanvas, currentDraggableElement.value)

            const elementInTable = elements.value[elementIndex]
            elementInTable.draggebleDom = currentDraggableElement.value
            elementInTable.isInIce = true
        }

        currentDraggableElement.value = null
    }

    targetCanvas.ondragover = (event) => {
        event.preventDefault()
        targetCanvas.style.backgroundColor = 'aqua'
    }

    targetCanvas.ondragleave = (event) => {
        event.preventDefault()
        targetCanvas.style.backgroundColor = 'white'
    }

    targetCanvas.ondragend = (event) => {
        event.preventDefault()
        targetCanvas.style.backgroundColor = 'white'
    }
}

const disableTargetCanvasDraggHandler = (targetCanvas: HTMLDivElement) => {
    targetCanvas.ondrop = null
    targetCanvas.ondragover = null
    targetCanvas.ondragleave = null
    targetCanvas.ondragend = null
}

watch(audioMetaData, (audioData) => {
    // FIXME: Определять элементы, которые нужно показывать за один цикл
    // Возможно, хранить текущие 3 элемента в сторе, т.к. они нужны еще в плеере
    let currentElementIndex: number | null = null
    elements.value.forEach((element, index) => {
        if (element.startTime <= audioData.currentPlayerTime &&
            element.endTime > audioData.currentPlayerTime) {
            currentElementIndex = index
            element.draggebleDom && showElement(element.draggebleDom)
        }
    })

    elements.value.forEach((element, index) => {
        const isCurrentElement = index === currentElementIndex
        const isPrevElement = currentElementIndex && index === currentElementIndex - 1
        const isNextElement = currentElementIndex && index === currentElementIndex + 1
        if (isCurrentElement || isPrevElement || isNextElement) {
            element.draggebleDom && showElement(element.draggebleDom)
        } else {
            element.draggebleDom && hideElement(element.draggebleDom)
        }
    })
}, {
    deep: true
})

onMounted(() => {
    const targetCanvas = canvas.value as HTMLDivElement

    if (isConstructorEditable.value) {
        setTargetCanvasDraggHandler(targetCanvas)
    }

    watch(isConstructorEditable, (isEditable) => {
        if (isEditable) {
            setTargetCanvasDraggHandler(targetCanvas)

            for (const element of elements.value) {
                element.draggebleDom && setElementMoveFunction(targetCanvas, element.draggebleDom)
            }
        } else {
            disableTargetCanvasDraggHandler(targetCanvas)

            for (const element of elements.value) {
                element.draggebleDom && disableElementMoveFunction(targetCanvas, element.draggebleDom)
            }
        }
    })
})
</script>

<style scoped>
.canvas-container {
    position: relative;
    top: 0;
    left: 0;

    height: 300px;
    width: 100%;
    border: 1px solid black;
    border-radius: 15px;

    min-height: 250px;
}

.chart {
    width: 100%;
    height: 100%;
}

.chart .u-line { stroke: #aaa; stroke-dasharray: 2 2; }
.chart .u-path { stroke: orange; fill: none; }
.chart .u-point circle {
    fill: orange;
    z-index: 1500;
}
</style>
