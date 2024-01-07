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
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            v-for="(line, index) in quadraticStepSequence"
                            :key="index"
                            fill="none"
                            stroke="orange"
                            stroke-width="3"
                            stroke-dasharray='10 10'
                            :class="`u-path${index}`"
                        />
                        <g
                            v-for="(line, index) in quadraticStepSequence"
                            :key="index"
                            :class="`u-point${index}`"
                        >
                            <circle r="5" />
                        </g>

                        <template
                            v-for="(element, index) in elements"
                            :key="element.key + index"
                        >
                            <g
                                v-if="element.isShow && element.isInIce"
                                width="45"
                                height="45"
                                :class="`u-element${index}`"
                            >
                                <rect
                                    :x="element.x"
                                    :y="element.y"
                                    width="45"
                                    height="45"
                                    rx="10"
                                    stroke="none"
                                    fill="#e6c660"
                                />
                                <text :x="element.x" :y="element.y">{{ element.fullname }}</text>
                            </g>
                        </template>
                    </svg>
                </div>
            </v-row>
            <v-row>
                <v-checkbox
                    v-model="isConstructorEditable"
                    label="Редактирование"
                ></v-checkbox>
                {{ quadraticStepSequence }}
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
import { hideElement, showElement } from '@/utils/domManipulation'
import { draggable, getLineCenter } from '~/utils/rinkCanvas'
import type { StepSequencePos, StartPoint, QuadraticCurvePos } from '@/interfaces'

const canvas = ref<HTMLDivElement | null>(null)
const chart = ref<HTMLElement | null>(null)

const currentDraggableElement = useCurrentDraggableElement()
const isConstructorEditable = useIsConstructorEditable()
const audioMetaData = useAudioMetaData()
const elements = useTableElements()

const quadraticStepSequence = computed<StepSequencePos[]>(() => elements.value.reduce((acc: StepSequencePos[], element, index, elementsOrigin) => {
    if (elementsOrigin[index + 1] && elementsOrigin[index + 1].isInIce && elementsOrigin[index + 1].isShow) {
        const x0 = element.xCenter as number
        const y0 = element.yCenter as number

        const startPos: StartPoint = { x0, y0 }

        const x = elementsOrigin[index + 1].xCenter as number
        const y = elementsOrigin[index + 1].yCenter as number

        const lineCenter = getLineCenter(x0, y0, x, y)
        const quadraticCurvePos: QuadraticCurvePos = {
            cpx: lineCenter.x,
            cpy: lineCenter.y,
            x,
            y
        }

        const stepSequencePos: StepSequencePos = {
            startPos,
            quadraticCurvePos
        }

        acc.push(stepSequencePos)
    }

    return acc
}, []))

const setTargetCanvasDraggHandler = (targetCanvas: HTMLDivElement) => {
    targetCanvas.ondrop = (event) => {
        targetCanvas.style.backgroundColor = 'white'

        if (currentDraggableElement.value) {
            const mouseClickOffsetX = parseInt(event.dataTransfer?.getData('mouseClickOffsetX') as string)
            const mouseClickOffsetY = parseInt(event.dataTransfer?.getData('mouseClickOffsetY') as string)
            const elementIndex = parseInt(event.dataTransfer?.getData('elementIndex') as string)

            const x = event.offsetX - mouseClickOffsetX
            const y = event.offsetY - mouseClickOffsetY

            const elementInTable = elements.value[elementIndex]
            elementInTable.draggebleDom = currentDraggableElement.value
            elementInTable.xCenter = x
            elementInTable.yCenter = y
            elementInTable.x = x
            elementInTable.y = y
            elementInTable.isShow = true
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
            element.isShow = true
        }
    })

    elements.value.forEach((element, index) => {
        const isCurrentElement = index === currentElementIndex
        const isPrevElement = currentElementIndex && index === currentElementIndex - 1
        const isNextElement = currentElementIndex && index === currentElementIndex + 1
        if (isCurrentElement || isPrevElement || isNextElement) {
            element.draggebleDom && showElement(element.draggebleDom)
            element.isShow = true
        } else {
            element.draggebleDom && hideElement(element.draggebleDom)
            element.isShow = false
        }
    })
}, {
    deep: true
})

onMounted(() => {
    const targetCanvas = canvas.value as HTMLDivElement
    const chartHtml = chart.value as HTMLElement

    if (isConstructorEditable.value) {
        setTargetCanvasDraggHandler(targetCanvas)
    }

    draggable(chartHtml, quadraticStepSequence.value)

    watch(quadraticStepSequence, (updateQuadraticStepSequence): void => {
        // console.log('updateQuadraticStepSequence: ', updateQuadraticStepSequence)
        draggable(chartHtml, updateQuadraticStepSequence)
    })

    watch(isConstructorEditable, (isEditable) => {
        if (isEditable) {
            setTargetCanvasDraggHandler(targetCanvas)

            // for (const element of elements.value) {
            //     element.draggebleDom && setElementMoveFunction(targetCanvas, element.draggebleDom)
            // }
        } else {
            disableTargetCanvasDraggHandler(targetCanvas)

            // for (const element of elements.value) {
            //     element.draggebleDom && disableElementMoveFunction(targetCanvas, element.draggebleDom)
            // }
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
</style>
