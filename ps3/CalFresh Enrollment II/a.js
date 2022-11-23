
function initialize(data, scales){
  draw_lines(data, scales)
  draw_axes(scales)
}

function draw_lines(data, scales){
  let generator = d3.line()
      .x(d => scales.x(d.x))
      .y(d => scales.y(d.calfresh));

  d3.select("#series")
    .selectAll("path")
    .data(data).enter()
    .append("path")
    .attrs({
        d: generator,
        fill: "none",
        stroke: d => scales.fill(d[0].county),
        "stroke-width": 1
    })
}

function draw_axes(scales){
  let x_axis = d3.axisBottom().scale(scales.x),
      y_axis = d3.axisLeft().scale(scales.y)

  d3.select("#axes")
      .append("g")
      .attrs({
        id: "x_axis",
        transform: `translate(0,${height - margins.bottom})`
  }).call(x_axis);

  d3.select("#axes")
      .append("g")
      .attrs({
        id: "y_axis",
        transform: `translate(${margins.left}, 0)`
  }).call(y_axis)
}

function make_scales(data) {
  return {
    x: d3.scaleTime()
         .domain(d3.extent(data.map(d => d.x)))
         .range([margins.left, width - margins.right]),
    y: d3.scaleLinear()
         .domain(d3.extent(data.map(d => d.calfresh)))
         .range([height - margins.bottom, margins.top]),
    fill: d3.scaleOrdinal()
      .domain([... new Set(data.map(d => d.county))])
      .range(d3.schemeSet2)
  }
}

function visualize(data){
  data = data.filter(d => !isNaN(d.calfresh))
  data = data.map(d => { return {
                  county: d.county,
                  date: d.date,
                  medi_cal: d.medi_cal,
                  unemployment: d.unemployment,
                  calfresh: d.calfresh,
                  x: transform_date(d.date)
  }});
  let scales = make_scales(data);
  data = d3.flatGroup(data, d => d.county);
  for (let i=0; i<data.length; ++i){
    let temp = data[i][1];
    data[i] = temp;
  }
  initialize(data, scales);
}

function transform_date(date_str){
  const [year, str_month] = date_str.split(" ");
  let month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(str_month) / 3;
  let x = new Date(year, month, 1, 0,0,0);
  return x;
}

let width = 700,
    height = 500;
    margins = {left: 60, right: 60, top: 60, bottom: 60};

d3.csv("calfresh-small.csv", d3.autoType)
  .then(visualize)