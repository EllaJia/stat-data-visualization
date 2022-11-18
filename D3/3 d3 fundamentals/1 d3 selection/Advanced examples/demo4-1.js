/*
  transform.translate(x, y):
    where x and y are the number of horizontal and vertical pixels by which to translate the element

*/
let centers = [];
let u = d3.randomUniform();

for (let i = 0; i < 50; i ++){
  centers.push({
    x: 900 * u(),
    y: 500 * u()
  })
}

// console.log(centers)

/*
An example to better understand how transform.translate works

let initial = d3.select("#initial")
initial.clone(true).attrs({
  transform: "translate(50, 50)"
})

initial.clone(true).attrs({
  transform: "translate(300, 100)"
})
*/

let initial = d3.select("#initial")
for (let i = 0; i < 50; i ++){
  initial.clone(true).attrs({
    id: "smiley" + i,
    transform: "translate(" + centers[i].x + "," + centers[i].y + ")"
  })
}