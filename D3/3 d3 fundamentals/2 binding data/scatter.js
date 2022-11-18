
// create a simulated dataset of 100 random two-dimensional uniform numbers
// a length 100 array of objects with "x", "y" and "r" being the keys
let ix = d3.range(100)
let generator = d3.randomUniform(0, 500)
let u = ix.map(_ => {return {x: generator(), y: generator(), r: 0.01 * generator()}})

// bind the dataset u to a group
d3.select("#scatter")
  .selectAll("circle") // we define a selection of circles, even though there are none on the page.
  .data(u).enter() // calculates the difference between the current circle selection (which sees no relevant tags) and the array we've attached (which has 100 elements). The difference means that when we call the next line, we append 100 circles.
  .append("circle") // The circles have no attributes now and they would be invisible on the webpage if we stopped our code here.
  .attrs({ // modify appearance of the circles
    cx: d => d.x, // set the cx attribute of each circle by filling it with the value of d.x
    cy: d => d.y,
    r: d => d.r
  })