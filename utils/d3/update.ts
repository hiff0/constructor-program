import * as d3 from 'd3'

export const update = (chart: HTMLElement, points: number[][], draw: (points: number[][]) => d3.Path) => {
    // d3.select(chart)
    //     .select('.u-path')
    //     .attr('d', draw(points))

    // d3.select(chart)
    //     .selectAll('.u-point')
    //     .data(points)
    //     .join(enter =>
    //         enter
    //             .append('g')
    //             .classed('u-point', true)
    //             .call((g) => {
    //                 g.append('circle').attr('r', 3)
    //             })
    //     )
    //     .attr('transform', d => `translate(${d})`)

    d3.select(chart)
        .select('.u-path')
        .attr('d', draw())

    d3.select(chart)
        .selectAll('.u-point')
        .data(points)
        .join(enter =>
            enter
                .append('g')
                .classed('u-point', true)
                .call((g) => {
                    g.append('circle').attr('r', 3)
                })
        )
        .attr('transform', d => `translate(${d})`)
}
