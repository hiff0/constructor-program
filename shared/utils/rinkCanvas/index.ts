import * as d3 from 'd3'
import type { ElementTableView, QuadraticCurvePos, StartPoint, StepSequencePos } from '@/interfaces'

export const getLineCenter = (x0: number, y0: number, x1: number, y1: number) => {
    return {
        x: (x0 + x1) / 2,
        y: (y0 + y1) / 2
    }
}

/**
 * Создает rinkCanvas.Path для квадратичной кривой Безье
 * @param startPos - Координаты начальной точки
 * @param quadraticPos - Координаты конечной точки и точки изгиба
 */
export const getQuadraticCurvePath = (startPos: StartPoint, quadraticPos: QuadraticCurvePos): d3.Path => {
    const path = d3.path()
    path.moveTo(startPos.x0, startPos.y0)
    path.quadraticCurveTo(quadraticPos.cpx, quadraticPos.cpy, quadraticPos.x, quadraticPos.y)
    return path
}

/**
 * Обновляет позицию кривую Безье (дорожку шагов) и точку, контролирующую изгиб кривой
 * @param chart - Корневой svg элемент
 * @param index - Индекс элементов в массиве
 * @param startPos - Координаты начальной точки
 * @param quadraticPos - Координаты конечной точки и точки, контролирующей изгиб кривой
 */
export const updateStepSequence = (chart: HTMLElement, index: number, startPos: StartPoint, quadraticPos: QuadraticCurvePos): [number, number, number] => {
    d3.select(chart)
        .select(`.u-path${index}`)
        .attr('d', getQuadraticCurvePath(startPos, quadraticPos).toString())

    d3.select(chart)
        .select(`.u-point${index}`)
        .attr('transform', `translate(${quadraticPos.cpx}, ${quadraticPos.cpy})`)

    return [quadraticPos.cpx, quadraticPos.cpy, index]
}

/**
 * Обновляет положение всех кривых Безье (дорожек шагов) и задает drag-and-drop функцию для перемещения точки, контролирующей изгиб кривой
 * @param chart
 * @param quadraticStepSequence
 */
export const draggable = (chart: HTMLElement, quadraticStepSequence: StepSequencePos[], elements: Ref<ElementTableView[]>) => {
    if (quadraticStepSequence.length === 0) {
        return
    }

    const points: number[][] = []

    quadraticStepSequence.forEach((element) => {
        const elPoints = [element.quadraticCurvePos.cpx, element.quadraticCurvePos.cpy, element.toIndex] as [number, number, number]
        points.push(elPoints)
    })

    const dist = (p: [number, number], m: [number, number, number]) => {
        return Math.sqrt((p[0] - m[0]) ** 2 + (p[1] - m[1]) ** 2)
    }

    let subject: number[] | null | undefined
    let dx: number
    let dy: number
    let currentIndex: number

    function dragSubject (event: { sourceEvent: MouseEvent }) {
        const p = d3.pointer(event.sourceEvent, chart)
        subject = d3.least(points, (a, b) => dist(p, a) - dist(p, b))
        if (subject && dist(p, subject) > 10) {
            subject = null
        }

        console.log('subject: ', subject)

        if (subject) {
            currentIndex = subject[2]

            d3.select(chart)
                .style('cursor', 'hand')
                .style('cursor', 'grab')
        } else {
            d3.select(chart).style('cursor', null)
        }
        return subject
    }

    d3.select(chart)
        .on('mousemove', event => dragSubject({ sourceEvent: event }))
        .call(
            d3.drag()
                .subject(dragSubject)
                .on('start', (event) => {
                    if (subject) {
                        d3.select(chart).style('cursor', 'grabbing')
                        dx = subject[0] - event.x
                        dy = subject[1] - event.y
                    }
                })
                .on('drag', (event) => {
                    if (subject) {
                        console.log('subject drag: ', subject)
                        subject[0] = event.x + dx
                        subject[1] = event.y + dy
                        elements.value[currentIndex].cpx = subject[0]
                        elements.value[currentIndex].cpy = subject[1]
                    }
                })
                .on('end', () => {
                    d3.select(chart).style('cursor', 'grab')
                })
                // .on('start.render drag.render end.render', () =>
                //     updateStepSequence(chart, currentIndex, quadraticStepSequence[currentIndex].startPos, quadraticStepSequence[currentIndex].quadraticCurvePos)
                // )
        )
}
