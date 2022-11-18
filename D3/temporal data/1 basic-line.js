/* if we want to draw a collection of paths, we can use an array of arrays.
[
    [{t: t1, y: value1}, {t: t2, y: value2}, ...] // array for first line
    [{t: t2, y: value2}, {t: t2, y: value2}, ...] // array for second line
]
*/


let line_data = [],
    generator = d3.randomNormal();

for (let t = 0; t < 20; t ++){
    line_data.push({t: t, value: generator()});
}

let scales = {
    x: d3.scaleLinear()
        .domain([0, 20])
        .range([0, 400]),
    y: d3.scaleLinear()
        .domain([-5, 5])
        .range([200, 0])
}

path_generator = d3.line()
    .x(d => scales.x(d.t))
    .y(d => scales.y(d.value));

d3.select("#line")
    .selectAll("path")
    .data([line_data]).enter()
    .append("path")
    .attr("d", path_generator)