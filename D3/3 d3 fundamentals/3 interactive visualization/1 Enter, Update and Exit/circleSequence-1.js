/*
  .enter(): refers to the array elements that don't have corresponding HTML tags. It's most often used to append new SVG objects to the original selection.
  .exit(): refers to HTML tags that no longer have associated array elements. It's most often used to remove tags that are no longer needed.
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