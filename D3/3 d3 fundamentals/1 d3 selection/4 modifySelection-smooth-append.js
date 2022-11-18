/*
  The first .attrs() call creates an invisible path at the correct location
  The second call increases the wide and sets the class
*/


d3.select("g")
  .append("path")
  .attrs({
    "stroke-width": 0,
    d: "M 100 0 L 200 5 L 300 15 L 400 0",
  })
  .transition()
  .duration(1000)
  .attrs({
    "stroke-width": 20,
    class: "wide"
  })