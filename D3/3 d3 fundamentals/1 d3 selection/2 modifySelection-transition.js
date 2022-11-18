/*
  slow down the change using transition() function
*/
let transition_length = 2000;

d3.select("#changeme")
  .transition()
  .duration(transition_length)
  .attr("fill", "#e34234");

d3.select(".wide")
  .transition()
  .duration(transition_length)
  .attr("stroke-width", 20);

d3.select(".narrow")
  .transition()
  .duration(transition_length)
  .attr("stroke-width", 1);