<template>
  <v-responsive :aspect-ratio="2 / 1" class="scheme_container mx-auto mb-5">
    <svg
      ref="scheme"
      class="scheme"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="triangle"
          viewBox="0 0 10 10"
          refX="3"
          refY="-6"
          markerUnits="strokeWidth"
          markerWidth="10"
          markerHeight="10"
          orient="auto"
        >
          <path
            d="M 0 6 L 3 0 L 6 6 z"
            fill="orange"
            translate="rotate(90)"
          />
        </marker>
      </defs>
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
          marker-end="url(#triangle)"
        />
        <g
          :transform="`translate(${line.quadraticCurvePos.cpx}, ${line.quadraticCurvePos.cpy})`"
          :class="`u-point${index}`"
        >
          <circle :r="isMobile ? 7 : 5" />
        </g>
      </template>

      <template
        v-for="(element, index) in elements"
        :key="element.key"
      >
        <g
          v-if="element.isShow"
          :class="`u-element${index}`"
        >
          <circle
            :cx="element.x * schemeWidth"
            :cy="element.y * schemeHeight"
            :r="elementRadius"
            stroke="none"
            fill="white"
          />
          <text
            :x="element.x * schemeWidth"
            :y="element.y * schemeHeight"
            dominant-baseline="middle"
            text-anchor="middle"
            :font-size="isMobile ? 14: 16"
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
import { useTableElements } from '@composables'
import { getLineCenter, getQuadraticCurvePath, getTriangleCoord } from '@shared/utils/rinkCanvas'
import type { StepSequencePos, StartPoint, QuadraticCurvePos, ElementTableView } from '@interfaces'
import { useIsMobile } from '@composables/common'
import { useSchemeElement } from '@composables/constructor'

const elements = useTableElements()
const audioMetaData = useAudioMetaData()
const isMobile = useIsMobile()

const schemeElement = useSchemeElement()

const scheme = ref<HTMLElement | null>(null)
const elementRadius = computed<number>(() => isMobile.value ? 15 : 20)
const schemeWidth = ref<number>(schemeElement.value?.clientWidth || 1)
const schemeHeight = ref<number>(schemeElement.value?.clientHeight || 1)

const setSchemeSize = () => {
  schemeWidth.value = schemeElement.value?.clientWidth || 1
  schemeHeight.value = schemeElement.value?.clientHeight || 1
}

watch(isMobile, setSchemeSize)
watch(schemeElement, setSchemeSize)

const getQuadraticStepSequence = (elements: ElementTableView[]): StepSequencePos[] => {
  return elements.reduce((acc: StepSequencePos[], element, index, elementsOrigin) => {
    const nextElement = elementsOrigin[index + 1]
    if (element.isShow &&
            nextElement &&
            nextElement.isShow) {
      const x0 = element.x as number * schemeWidth.value
      const y0 = element.y as number * schemeHeight.value

      const startPos: StartPoint = { x0, y0 }

      const x = nextElement.x as number * schemeWidth.value
      const y = nextElement.y as number * schemeHeight.value

      const lineCenter = getLineCenter(x0, y0, x, y)
      const cpx = nextElement.cpx ? nextElement.cpx * schemeWidth.value : lineCenter.x
      const cpy = nextElement.cpy ? nextElement.cpy * schemeHeight.value : lineCenter.y
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
    acc.push([element.x * schemeWidth.value, element.y * schemeHeight.value, index])
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
  isMobile.value = document.body.clientWidth < 768
  const mql = window.matchMedia('(max-width: 767px)')
  mql.addEventListener('change', (e) => {
    if (isMobile.value !== e.matches) {
      isMobile.value = e.matches
    }
  })

  // Если элементов еще нет, добавляем "Старт"
  if (elements.value.length === 0) {
    const startElement: ElementTableView = {
      key: 'start-element',
      fullname: 'Start',
      lvlName: '',
      timeExecute: '00-00',
      isShow: true,
      startTime: 0,
      endTime: 1,
      x: 0.4,
      y: 0.4,
      bgClass: 'bg-start-elemen',
      isNotShowInTable: true
    }

    elements.value.push(startElement)
  }

  if (scheme.value) {
    schemeElement.value = scheme.value
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

    function dragSubject (event: { sourceEvent: MouseEvent | TouchEvent }) {
      const touchObj = event.sourceEvent instanceof TouchEvent ? event.sourceEvent.touches[0] : null
      const p = touchObj ? d3.pointer(touchObj, schemeSvg) : d3.pointer(event.sourceEvent, schemeSvg)
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

        d3.select(schemeSvg)
          .style('cursor', 'grab')
      } else {
        d3.select(schemeSvg).style('cursor', null)
      }
      return subject
    }

    const onDragStart = (event: MouseEvent) => {
      if (subject) {
        d3.select(schemeSvg).style('cursor', 'grabbing')
        // Учитываем положение курсора мышки относительно центра элемента
        dx = subject[0] - event.x
        dy = subject[1] - event.y
      }
    }

    const onDragMove = (event: MouseEvent) => {
      if (subject) {
        subject[0] = event.x + dx
        subject[1] = event.y + dy

        const currElement = elements.value[currentElementIndex]

        if (isElementDrag) {
          if (subject[0] < schemeWidth.value && subject[0] > 0) {
            currElement.x = subject[0] / schemeWidth.value
          }
          if (subject[1] < schemeHeight.value && subject[1] > 0) {
            currElement.y = subject[1] / schemeHeight.value
          }
        } else {
          if (subject[0] < schemeWidth.value && subject[0] > 0) {
            currElement.cpx = subject[0] / schemeWidth.value
          }
          if (subject[1] < schemeHeight.value && subject[1] > 0) {
            currElement.cpy = subject[1] / schemeHeight.value
          }
        }
      }
    }

    const onDragEnd = () => {
      d3.select(schemeSvg).style('cursor', 'grab')
    }

    d3.select(schemeSvg)
      .on('mousemove', event => dragSubject({ sourceEvent: event }))
      .on('touchmove', event => dragSubject({ sourceEvent: event }))
      .call(
        d3.drag()
          .subject(dragSubject)
          .on('start', onDragStart)
          .on('drag', onDragMove)
          .on('end', onDragEnd)
      )

    // d3.select(schemeSvg)
    //   .on('touchmove', event => dragSubject({ sourceEvent: event }))
    //   .call(
    //     d3.drag()
    //       .subject(dragSubject)
    //       .on('start', onDragStart)
    //       .on('drag', onDragMove)
    //       .on('end', onDragEnd)
    //   )

    watch(elements, (updatedElements): void => {
      quadraticStepSequence.value = getQuadraticStepSequence(updatedElements)
    },
    {
      deep: true
    })

    watch(schemeWidth, () => {
      quadraticStepSequence.value = getQuadraticStepSequence(elements.value)
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

@media (max-width: 767px) {
  .scheme_container {
    width: 100%;
  }

  .scheme {
    border-radius: 30px;
  }
}
</style>
