import * as d3 from 'd3'
import { update } from './update'

export const draggable = (chart: HTMLElement, points: number[][], draw: (points: number[][]) => d3.Path) => {
    update(chart, points, draw)

    const dist = (p: number[], m: number[]) => {
        return Math.sqrt((p[0] - m[0]) ** 2 + (p[1] - m[1]) ** 2)
    }

    let subject: number[] | null | undefined
    let dx: number
    let dy: number

    function dragSubject (event) {
        const p = d3.pointer(event.sourceEvent, chart)
        subject = d3.least(points, (a, b) => dist(p, a) - dist(p, b))
        if (dist(p, subject) > 20) { subject = null }
        if (subject) {
            d3.select(chart)
                .style('cursor', 'hand')
                .style('cursor', 'grab')
        } else { d3.select(chart).style('cursor', null) }
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
                        subject[0] = event.x + dx
                        subject[1] = event.y + dy
                    }
                })
                .on('end', () => {
                    d3.select(chart).style('cursor', 'grab')
                })
                .on('start.render drag.render end.render', () =>
                    update(chart, points, draw)
                )
        )
}
