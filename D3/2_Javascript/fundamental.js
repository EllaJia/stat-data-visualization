import * as d3 from 'd3';

/*
    Array: index starts from 0
*/

let x = [1,2,3,4]
let y = ['a', 'b', 'c']
console.log(x[3])
console.log(y[0])

/*
    Object: kind of like dictionary in Python
*/
let lecture = {class: "679", session: "javascript"}
let everest = {longitude: 86.922623, latitude: 27.986065, height: 29032}
console.log("The lecture object is:", lecture)
console.log(lecture["class"])
console.log(everest["latitude"])

/*
    Combine arrays:
        1. concat
*/
let concat_arr_1 = [2,3,5],
    concat_arr_2 = [7,11,13]
console.log(concat_arr_1.concat(concat_arr_2))
console.log(x.concat(y))


/*
        2. spread operator: the spread(...) syntax allows an iterable, such as an array or string, to be expanded in places where zero 
    or more arguments or elements are expected.
*/
let color = ['red', 'green', 'blue'];
let color2 = ['yellow']
let rgb = [...color, ...color2];

console.log(rgb);

/*
    Combine objects: spread operator
*/

let combine_object = {...lecture, ...everest}
console.log(combine_object)

/*
    Add individual elements
*/
x.push(5)
lecture["week"] = 4

console.log(x)
console.log(lecture)

/*
    Control flow
*/

// looping over array
let mountains = [
    {longitude: 86.922623, latitude: 27.986065, height: 29032},
    {longitude: -78.816940, latitude: -1.469302, height: 20549},
    {longitude: 89.404169, latitude: 43.075322, height: 960}
  ]

for (let i = 0; i < mountains.length; i++){
    let cur_height = mountains[i]["height"]
    if (cur_height > 20000){
        console.log(cur_height + "feet is high")
    }else{
        console.log(cur_height + "feet is not high")
    }
}

// looping over object
for (let prop in lecture){
    console.log(prop, lecture[prop])
}


/*
    A special function to create a new array: map()
*/
let x_v2 = x.map(d => d ** 2)
console.log(x_v2)


/*
    Useful functions in d3
*/

// create sequential arrrays
let ix = d3.range(25)
console.log(ix)

// generate random normals
let generator = d3.randomNormal()
let z = ix.map(generator)
console.log(z)

// compute statistics
let mean_val = d3.mean(z)
let max_val = d3.max(z)
console.log("mean value is: ", mean_val)
console.log("max value is:", max_val)







