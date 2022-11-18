/**
 * Change attributes for all tags
 *   - reselct the tags after new data are added
 */
let circles = d3.range(10);

d3.select("svg")
  .selectAll("circle")
  .data(circles).enter()
  .append("circle")
  .attrs({
    r: 10,
    cx: d => (d + 1) * 50,
    cy: 100
  })

circles = circles.concat([10, 11, 12])
d3.select("svg")
  .selectAll("circle")
  .data(circles).enter()
  .append("circle")
  .attrs({
    cx: d => (d + 1) * 50,
    cy: 100,
    r: 10,
    fill: "red"
  })

// Task: Change all circles to be red
//    inefficient because it will change attributes even for the entered elements, which we already know have the correct attributes
d3.select("svg")
  .selectAll("circle")
  .attrs({ fill: "red" })
