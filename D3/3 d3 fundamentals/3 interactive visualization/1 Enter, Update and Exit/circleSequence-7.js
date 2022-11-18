/**
 * Change attributes for all tags
 *   - .join(): it can distinguish between enter and update selections
 */
let circles = d3.range(10);

d3.select("svg")
  .selectAll("circle")
  .data(circles).enter()
  .append("circle")
  .attrs({
    r: 10,
    cx: d => (d + 1) * 50,
    cy: 100,
  })

// Task: Modify the existed circles to blue and new circles to red
circles = circles.concat([10, 11, 12])
d3.select("svg")
  .selectAll("circle")
  .data(circles)
  .join(
    enter => enter.append("circle")
      .attrs({
        r: 10,
        cx: d => (d + 1) * 50,
        cy: 100,
        fill: "red"
      }),
    update => update.attr("fill", "blue")
  )
