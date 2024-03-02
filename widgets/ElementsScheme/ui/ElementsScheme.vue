<template>
    <v-responsive :aspect-ratio="2 / 1" class="scheme_container mx-auto mb-5">
        <svg
            ref="scheme"
            class="scheme"
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
                <!-- <path
                    fill="orange"
                    stroke="none"
                    :d="`M${line.triangleCoord.triangleX} ${line.triangleCoord.triangleY} l 13 7 l -13 7 z`"
                /> -->
            </template>

            <template
                v-for="(element, index) in elements"
                :key="element.key"
            >
                <g
                    v-if="element.isShow"
                    :width="elementRadius"
                    :height="elementRadius"
                    :class="`u-element${index}`"
                >
                    <circle
                        :cx="element.x"
                        :cy="element.y"
                        :r="elementRadius"
                        stroke="none"
                        fill="white"
                    />
                    <text
                        :x="element.x"
                        :y="element.y"
                        dominant-baseline="middle"
                        text-anchor="middle"
                    >
                        {{ element.fullname }}
                    </text>
                </g>
            </template>
        </svg>
    </v-responsive>
</template>

<script
    lang="ts"
    setup
>
import * as d3 from 'd3'
import { useTableElements } from '@/composables'
import { getLineCenter, getQuadraticCurvePath, getTriangleCoord } from '@/shared/utils/rinkCanvas'
import type { StepSequencePos, StartPoint, QuadraticCurvePos, ElementTableView } from '@/interfaces'

const elements = useTableElements()
const audioMetaData = useAudioMetaData()

const scheme = ref<HTMLElement | null>(null)
const elementRadius = ref<number>(20)

const getQuadraticStepSequence = (elements: ElementTableView[]): StepSequencePos[] => {
    return elements.reduce((acc: StepSequencePos[], element, index, elementsOrigin) => {
        const nextElement = elementsOrigin[index + 1]
        if (element.isShow &&
            nextElement &&
            nextElement.isShow) {
            const x0 = element.x as number
            const y0 = element.y as number

            const startPos: StartPoint = { x0, y0 }

            const x = nextElement.x as number
            const y = nextElement.y as number

            const lineCenter = getLineCenter(x0, y0, x, y)
            const cpx = nextElement.cpx || lineCenter.x
            const cpy = nextElement.cpy || lineCenter.y
            const quadraticCurvePos: QuadraticCurvePos = {
                cpx,
                cpy,
                x,
                y
            }

            const triangleCoord = getTriangleCoord(x, y, cpx, cpy, elementRadius.value)

            const stepSequencePos: StepSequencePos = {
                startPos,
                quadraticCurvePos,
                toIndex: index + 1,
                d: getQuadraticCurvePath(startPos, quadraticCurvePos).toString(),
                triangleCoord
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
    if (element.x && element.y) {
        acc.push([element.x, element.y, index])
    }

    return acc
}, []))

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
    if (scheme.value) {
        const schemeSvg = scheme.value

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
            const p = d3.pointer(event.sourceEvent, schemeSvg)
            subject = d3.least(points.value, (a, b) => dist(p, a) - dist(p, b))
            if ((subject && dist(p, subject) > 10) || !subject) {
                subject = d3.least(elementsCenterPoints.value, (a, b) => dist(p, a) - dist(p, b))

                if (subject && dist(p, subject) > 15) {
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

                d3.select(schemeSvg)
                    .style('cursor', 'grab')
            } else {
                d3.select(schemeSvg).style('cursor', null)
            }
            return subject
        }

        d3.select(schemeSvg)
            .on('mousemove', event => dragSubject({ sourceEvent: event }))
            .call(
                d3.drag()
                    .subject(dragSubject)
                    .on('start', (event) => {
                        if (subject) {
                            d3.select(schemeSvg).style('cursor', 'grabbing')
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
                                currElement.x = subject[0]
                                currElement.y = subject[1]
                            } else {
                                currElement.cpx = subject[0]
                                currElement.cpy = subject[1]
                            }
                        }
                    })
                    .on('end', () => {
                        d3.select(schemeSvg).style('cursor', 'grab')
                    })
            )

        watch(elements, (updatedElements): void => {
            quadraticStepSequence.value = getQuadraticStepSequence(updatedElements)
        },
        {
            deep: true
        })
    }
})

</script>

<style scoped>
.scheme_container {
    width: 60%;
}

.scheme {
    background: linear-gradient(#FFFFFF, #333399);
    border: 3px solid #336666;
    border-radius: 50px;

    width: 100%;
    height: 100%;
}
</style>
