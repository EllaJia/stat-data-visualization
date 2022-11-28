
function f1() {
  console.log("Hovered!")
}

function f2() {
  console.log("Clicked!")
}

function f3() {
  console.log("Mouse moved!")
}

function f4(event) {
  console.log(d3.pointer(event))
}

/**
 * Event listener: 
 *    objects that register specific types of user interactions are called event listeners.
 *    Common types of event linsteners include:
 *      - .on("click", function)
 *      - .on("mouseover", function)
 *      - .on("mousemove", function)
 *      - .on("mouseover", function)
 *      - .on("mouseout", function)
 */

d3.select("#circle1")
  .on("mouseover", f1)

d3.select("#circle2")
  .on("click", f2)

d3.select("#circle3")
  .on("mousemove", f3)

d3.select("#circle4")
  .on("mousemove", f4)