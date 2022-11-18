/**
 *  General update pattern:
 *    keep track of a continually evolving data array. Each array element will be associated with one circle.
 *    
 */

// create one single js object parametrizing one circle
function new_point(width, height, max_radius) {
  let generator = d3.randomUniform();
  id += 1;
  return {
    x: width * generator(),
    y: height * generator(), // positions are uniformly chosen across the window
    r: 2, // all circles start with a radius of two pixels
    max_radius: max_radius * generator(),
    rate: 1 + 0.1 * generator(),
    id: id // guarantee the uniqueness of each circle
  }
}

// evolving the data
function update_data(rain) {
	  rain = rain.concat(new_point(900, 200, 50)) // with each frame, we add a single new circle to the array
	  rain = rain.map(d => { d.r *= d.rate;	return d}) // any circles that are already on the screen have their radius increased
	  return rain.filter(d => d.r < d.max_radius); // if it grows beyond max_radius, the circle is removed from the array
	}

// how the radius of the first circle increases across 10 frames
/*
let id = 0
let rain = []
for (let i = 0; i < 10; i ++){
  rain = update_data(rain);
  console.log(rain[0]["r"]);
}
*/

function update_vis() {
  rain = update_data(rain);
  let circ = d3.select("svg")
    .selectAll("circle")
    .data(rain, d => d.id) // data bind only knows the array has gotten shorter, so it exits the last circle tag. However, sometimes it's circles in the middle of array growing out of max radius. "d => d.id" helps the program know which circle should be removed correctly.
    .join(
      enter => enter.append("circle")
        .attrs({ cx: d => d.x, cy: d => d.y }),
      update => update.attr("r", d => d.r),
      exit => exit.remove()
    )
}

let id = 0;
let rain = [];
d3.interval(update_vis, 100); // call function update_vis every 100 milliseconds
