
// create 100 two-dimensional uniform coordinates from 0 to 500
let ix = d3.range(1000)
let generator = d3.randomUniform(0, 500)
let u = ix.map(_ =>{ return {x: generator(), y: generator(), r: 0.01 * generator()} })

// append them to the #scatter group
d3.select("#scatter")
  .selectAll("circle")
  .data(u).enter()
  .append("circle")
  .attrs({
    cx: d => d.x,
    cy: d => d.y,
    r: d => d.r
  })

/*
  d3.timer(callback, delay)
    When making our visualizations we may want a function that continuously keeps executing.
    - callback: Invoke a callback function every animation frame (~17 ms)
    - delay: prevents the timer from calling the callback until delay milliseconds have passed

  d3.timeout(callback, delay):
    Runs once after delay milliseconds.
    - callback: the function to be stopped after a particular delay
    - delay: the time after which the function will be stopped
*/

function animate(t) {
  u = u.map(d => {return {x: d.x, y: d.y, r: d.r, rnew: (1 + Math.sin(t/10)) * d.r}})
  d3.selectAll("circle")
    .data(u)
    .attr("r", d => d.rnew)

  d3.timeout(() => {animate(t + 1)}, 100)
}

animate(0);