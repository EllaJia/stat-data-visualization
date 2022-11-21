/**
 * Concept of scale:
 *    d3.{type of scale}
 *      .domain({data values})
 *      .range({visual mark values})
 */


// we can map cities to colors using an ordinal scale
/*
import * as d3 from 'd3';
let name_scale = d3.scaleOrdinal()
  .domain(["madison", "milwaukee", "chicago"])
  .range(["red", "green", "blue"])

console.log(name_scale("madison"))
*/




function visualize(data) {
  scales = make_scales(data)
  data = data.filter(d => d.year == 1965)

  d3.select("svg")
    .selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attrs({
      cx: d => scales.x(d.lpop),
      cy: d => scales.y(d.life_expectancy),
      fill: d => scales.fill(d.continent)
     })
}

/**
 * for our visualization, we will define three scales:
 *    - linear scale mapping life expenctancy to the y-axis
 *    - analogous linear scale for the log-population variable
 *    - color scale mapping continents to colors
 * 
 * d3.extent() 
 *    returns the minimum and maximum values of an array 
 */
function make_scales(data) {
  return {
    y: d3.scaleLinear()
         .domain(d3.extent(data.map(d => d.life_expectancy))) // extract the unique life_expenctancy values with "data.map(d => d.life_expectancy)"
         .range([0, 500]),
    x: d3.scaleLinear()
         .domain(d3.extent(data.map(d => d.lpop)))
         .range([0, 700]),
    fill: d3.scaleOrdinal()
      .domain([... new Set(data.map(d => d.continent))]) // [... new Set(x)] defines a new array with only the unique values appratin gin the array x
      .range(d3.schemeSet2)
  }
}

function parse_row(d) {
  return {
    country: d.country,
    continent: d.continent,
    year: +d.year,
    lpop: +d.lpop,
    life_expectancy: +d.life_expectancy
  }
}

d3.csv("gapminder.csv", parse_row)
  .then(visualize);