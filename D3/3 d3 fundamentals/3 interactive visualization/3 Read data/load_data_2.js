
function visualize(data) {
  data = data.filter(d => d.year == 1965) 
  d3.select("svg")
    .selectAll("circle")
    .data(data).enter() // since not yet any HTML tags in this selection, we can refer to each array element using .enter()
    .append("circle")
    .attrs({
      cx: d => 10 * d.lpop,
      cy: d => d.life_expectancy,
      r: 2
     })
}

/**
 * d3.autoType is a built in function which is able to automatically recognize the data type of columns. Otherwise it will automatically be string.
 */
d3.csv("gapminder.csv", d3.autoType)
  .then(visualize);
