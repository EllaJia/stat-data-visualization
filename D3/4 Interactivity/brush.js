/**
 *  d3.brush():
 *    Can be applied to a <g> element using .call() applied to the group(otherwise, they will not appear)
 */

function f(event) {
  console.log(event.selection)
}

let brush = d3.brush().on("brush", f)
d3.select(".brush").call(brush)