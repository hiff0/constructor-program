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
                        <template
                            v-for="(line, index) in quadraticStepSequence"
                            :key="index"
                        >
                            <path
                                fill="none"
                                stroke="orange"
                                stroke-width="3"
                                stroke-dasharray="10 10"
                                :d="line.d"
                                :class="`u-path${index}`"
                            />
                            <g
                                :transform="`translate(${line.quadraticCurvePos.cpx}, ${line.quadraticCurvePos.cpy})`"
                                :class="`u-point${index}`"
                            >
                                <circle r="5" />
                            </g>
                        </template>

                        <template
                            v-for="(element, index) in elements"
                            :key="element.key"
                        >
                            <g
                                v-if="element.isShow && element.isInIce"
                                :width="elementWidth"
                                :height="elementHeight"
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
import * as d3 from 'd3'
import { getLineCenter, getQuadraticCurvePath } from '@/shared/utils/rinkCanvas'
import type { StepSequencePos, StartPoint, QuadraticCurvePos, ElementTableView } from '@/interfaces'

const elementWidth = 45
const elementHeight = 45

const canvas = ref<HTMLDivElement | null>(null)
const chart = ref<HTMLElement | null>(null)

const currentDraggableElement = useCurrentDraggableElement()
const isConstructorEditable = useIsConstructorEditable()
const audioMetaData = useAudioMetaData()
const elements = useTableElements()

const getQuadraticStepSequence = (elements: ElementTableView[]): StepSequencePos[] => {
    return elements.reduce((acc: StepSequencePos[], element, index, elementsOrigin) => {
        const nextElement = elementsOrigin[index + 1]
        if (element.isInIce && element.isShow &&
            nextElement &&
            nextElement.isInIce &&
            nextElement.isShow) {
            const x0 = element.xCenter as number
            const y0 = element.yCenter as number

            const startPos: StartPoint = { x0, y0 }

            const x = nextElement.xCenter as number
            const y = nextElement.yCenter as number

            const lineCenter = getLineCenter(x0, y0, x, y)
            const quadraticCurvePos: QuadraticCurvePos = {
                cpx: nextElement.cpx || lineCenter.x,
                cpy: nextElement.cpy || lineCenter.y,
                x,
                y
            }

            const stepSequencePos: StepSequencePos = {
                startPos,
                quadraticCurvePos,
                toIndex: index + 1,
                d: getQuadraticCurvePath(startPos, quadraticCurvePos).toString()
            }

            acc.push(stepSequencePos)
        }

        return acc
    }, [])
}

const quadraticStepSequence = ref<StepSequencePos[]>(getQuadraticStepSequence(elements.value))

const points = computed<number[][]>(() => quadraticStepSequence.value.reduce((acc: number[][], quadraticStep, index) => {
    acc.push([quadraticStep.quadraticCurvePos.cpx, quadraticStep.quadraticCurvePos.cpy, quadraticStep.toIndex, index])
    return acc
}, []))

const elementsCenterPoints = computed<number[][]>(() => elements.value.reduce((acc: number[][], element, index) => {
    if (element.isInIce && element.isShow && element.xCenter && element.yCenter) {
        acc.push([element.xCenter, element.yCenter, index])
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

            elementInTable.xCenter = x + elementWidth / 2
            elementInTable.yCenter = y + elementHeight / 2
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
            element.isShow = true
        }
    })

    elements.value.forEach((element, index) => {
        const isCurrentElement = index === currentElementIndex
        const isPrevElement = currentElementIndex !== null && index === currentElementIndex - 1
        const isNextElement = currentElementIndex !== null && index === currentElementIndex + 1
        if (isCurrentElement || isPrevElement || isNextElement) {
            element.isShow = true
        } else {
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

    const dist = (p: [number, number], m: [number, number, number]) => {
        return Math.sqrt((p[0] - m[0]) ** 2 + (p[1] - m[1]) ** 2)
    }

    let subject: number[] | null | undefined
    let dx: number
    let dy: number
    let currentElementIndex: number
    // let pathIndex: number
    let isElementDrag = false

    function dragSubject (event: { sourceEvent: MouseEvent }) {
        const p = d3.pointer(event.sourceEvent, chartHtml)
        subject = d3.least(points.value, (a, b) => dist(p, a) - dist(p, b))
        if ((subject && dist(p, subject) > 10) || !subject) {
            subject = d3.least(elementsCenterPoints.value, (a, b) => dist(p, a) - dist(p, b))

            if (subject && dist(p, subject) > 23) {
                subject = null
            } else {
                isElementDrag = true
            }
        } else {
            isElementDrag = false
        }

        if (subject) {
            currentElementIndex = subject[2]
            // pathIndex = subject[3]

            d3.select(chartHtml)
                .style('cursor', 'grab')
        } else {
            d3.select(chartHtml).style('cursor', null)
        }
        return subject
    }

    d3.select(chartHtml)
        .on('mousemove', event => dragSubject({ sourceEvent: event }))
        .call(
            d3.drag()
                .subject(dragSubject)
                .on('start', (event) => {
                    if (subject) {
                        d3.select(chartHtml).style('cursor', 'grabbing')
                        dx = subject[0] - event.x
                        dy = subject[1] - event.y
                    }
                })
                .on('drag', (event) => {
                    if (subject) {
                        subject[0] = event.x + dx
                        subject[1] = event.y + dy

                        const currElement = elements.value[currentElementIndex]
                        if (isElementDrag) {
                            currElement.xCenter = subject[0]
                            currElement.yCenter = subject[1]
                            currElement.x = subject[0] - elementWidth / 2
                            currElement.y = subject[1] - elementHeight / 2
                        } else {
                            currElement.cpx = subject[0]
                            currElement.cpy = subject[1]
                        }
                    }
                })
                .on('end', () => {
                    d3.select(chartHtml).style('cursor', 'grab')
                })
        )

    watch(elements, (updatedElements): void => {
        quadraticStepSequence.value = getQuadraticStepSequence(updatedElements)
    },
    {
        deep: true
    })

    watch(isConstructorEditable, (isEditable) => {
        if (isEditable) {
            setTargetCanvasDraggHandler(targetCanvas)
        } else {
            disableTargetCanvasDraggHandler(targetCanvas)
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
