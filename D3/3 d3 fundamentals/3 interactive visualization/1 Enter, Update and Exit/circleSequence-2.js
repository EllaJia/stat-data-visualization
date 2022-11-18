/*
  Add three additional elements to the circles array
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

circles = circles.concat([10, 11, 12])

/*
  How can we add asociated elements to the page without having to redraw everything?
    - Rebind the data and use .enter() again

  */

d3.select("svg")
  .selectAll("circle") 
  .data(circles).enter() // d3 recognizes the 10 circles from before and realizes that there are potentially three new HTML elements that could be drawnn
  .append("circle") // The 3 more elements are drawn
  .attrs({
    r: 10,
    cx: d => (d + 1) * 50,
    cy: 100,
    fill: "red"
  })