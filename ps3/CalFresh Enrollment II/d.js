function initialize(data, scales, map_data, map_scales) {
    draw_lines(data, scales);
    draw_axes(scales);
    make_brush(data, scales, map_data);
    draw_map(map_data, map_scales);
}

function draw_lines(data, scales) {
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

function draw_axes(scales) {
    let x_axis = d3.axisBottom().scale(scales.x),
        y_axis = d3.axisLeft().scale(scales.y);

    d3.select("#axes")
        .append("g")
        .attrs({
            id: "x_axis",
            transform: `translate(0,${height - margins.bottom})`
        })
        .call(x_axis);

    d3.select("#axes")
        .append("g")
        .attrs({
            id: "y_axis",
            transform: `translate(${margins.left}, 0)`
        })
        .call(y_axis)
}

function draw_map(data, scales) {
    let proj = d3.geoMercator()
        .fitSize([width, height], data)
    let path = d3.geoPath()
        .projection(proj);

    d3.select("#map")
        .selectAll("path")
        .data(data.features).enter()
        .append("path")
        .attrs({
            d: path,
            fill: d => scales.fill(d.properties.avg),
            stroke: "black",
            "stroke-width": 1
        }).on("mouseover", (_, d) => mouseover(d));
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
            .domain([...new Set(data.map(d => d.county))])
            .range(d3.schemeSet2)
    }
}

function make_map_scales(num_list) {
    return {
        fill: d3.scaleQuantize()
            .domain(d3.extent(num_list))
            .range(["#f7fcf0", "#f6fcef", "#f6fbef", "#f5fbee", "#f4fbed", "#f3fbed", "#f3faec", "#f2faeb", "#f1faeb", "#f1f9ea", "#f0f9e9", "#eff9e9", "#eef9e8", "#eef8e7", "#edf8e7", "#ecf8e6", "#ecf8e5", "#ebf7e5", "#eaf7e4", "#e9f7e3", "#e9f6e3", "#e8f6e2", "#e7f6e1", "#e7f6e1", "#e6f5e0", "#e5f5df", "#e5f5df", "#e4f4de", "#e3f4dd", "#e2f4dd", "#e2f4dc", "#e1f3db", "#e0f3db", "#e0f3da", "#dff3d9", "#def2d9", "#def2d8", "#ddf2d7", "#dcf2d7", "#dcf1d6", "#dbf1d5", "#daf1d5", "#daf0d4", "#d9f0d3", "#d8f0d3", "#d8f0d2", "#d7efd1", "#d6efd1", "#d6efd0", "#d5efcf", "#d4eecf", "#d3eece", "#d3eecd", "#d2edcd", "#d1edcc", "#d0edcb", "#d0edcb", "#cfecca", "#ceecca", "#cdecc9", "#cdebc8", "#ccebc8", "#cbebc7", "#caeac6", "#c9eac6", "#c8eac5", "#c7e9c5", "#c6e9c4", "#c5e8c4", "#c5e8c3", "#c4e8c2", "#c3e7c2", "#c2e7c1", "#c1e7c1", "#c0e6c0", "#bfe6c0", "#bde5bf", "#bce5bf", "#bbe5be", "#bae4be", "#b9e4be", "#b8e3bd", "#b7e3bd", "#b6e2bd", "#b5e2bc", "#b3e1bc", "#b2e1bc", "#b1e1bb", "#b0e0bb", "#afe0bb", "#aedfbb", "#acdfbb", "#abdeba", "#aadeba", "#a9ddba", "#a7ddba", "#a6dcba", "#a5dcba", "#a3dbba", "#a2dbba", "#a1daba", "#a0daba", "#9ed9bb", "#9dd9bb", "#9cd8bb", "#9ad8bb", "#99d7bb", "#98d7bc", "#96d6bc", "#95d6bc", "#93d5bd", "#92d5bd", "#91d4bd", "#8fd3be", "#8ed3be", "#8dd2be", "#8bd2bf", "#8ad1bf", "#88d1c0", "#87d0c0", "#86cfc1", "#84cfc1", "#83cec1", "#81cec2", "#80cdc2", "#7fccc3", "#7dccc3", "#7ccbc4", "#7acac4", "#79cac5", "#77c9c5", "#76c8c6", "#75c8c6", "#73c7c7", "#72c6c7", "#70c5c7", "#6fc5c8", "#6ec4c8", "#6cc3c9", "#6bc3c9", "#69c2ca", "#68c1ca", "#67c0ca", "#65bfcb", "#64bfcb", "#63becb", "#61bdcc", "#60bccc", "#5fbbcc", "#5dbacc", "#5cb9cc", "#5ab9cd", "#59b8cd", "#58b7cd", "#57b6cd", "#55b5cd", "#54b4cd", "#53b3cd", "#51b2cd", "#50b1cd", "#4fb0cd", "#4eafcd", "#4caecd", "#4badcc", "#4aaccc", "#49abcc", "#48aacc", "#46a9cb", "#45a8cb", "#44a6cb", "#43a5ca", "#42a4ca", "#41a3c9", "#3fa2c9", "#3ea1c8", "#3da0c8", "#3c9ec7", "#3b9dc7", "#3a9cc6", "#399bc6", "#379ac5", "#3699c5", "#3597c4", "#3496c4", "#3395c3", "#3294c2", "#3193c2", "#3092c1", "#2f90c0", "#2d8fc0", "#2c8ebf", "#2b8dbf", "#2a8cbe", "#298abd", "#2889bd", "#2788bc", "#2687bc", "#2586bb", "#2485ba", "#2383ba", "#2282b9", "#2081b9", "#1f80b8", "#1e7fb7", "#1d7eb7", "#1c7db6", "#1b7bb5", "#1a7ab5", "#1979b4", "#1978b3", "#1877b3", "#1776b2", "#1674b1", "#1573b0", "#1472b0", "#1371af", "#1370ae", "#126fad", "#116dac", "#106cac", "#106bab", "#0f6aaa", "#0e69a9", "#0e67a8", "#0d66a7", "#0d65a6", "#0c64a5", "#0c63a4", "#0c61a3", "#0b60a2", "#0b5fa1", "#0a5ea0", "#0a5d9e", "#0a5b9d", "#0a5a9c", "#09599b", "#09589a", "#095699", "#095597", "#095496", "#095395", "#085294", "#085092", "#084f91", "#084e90", "#084d8e", "#084b8d", "#084a8c", "#08498a", "#084889", "#084688", "#084586", "#084485", "#084384", "#084182", "#084081"])
    }
}

function choose_subset_data(ev, data, scales){
  let [[x0, y0], [x1, y1]] = ev.selection;
  y0 = scales.y.invert(y0);
  y1 = scales.y.invert(y1);

  let subset_data = [];
  for (let i = 0; i < data.length; i++){
      for (let j = 0; j < data[i].length; j++){
          let x = scales.x(data[i][j].x),
              y = data[i][j].calfresh;

          if (x >= x0 && y <= y0 && x <= x1 && y >= y1){
              subset_data.push(data[i][0].subset_data);
              break;
          }
      }
  }
  return subset_data;
}

function brush_update(ev, data, scales, map_data){
    let county = choose_subset_data(ev, data, scales);
    console.log(county);
    d3.select("#series")
        .selectAll("path")
        .attrs({
            stroke: d => county.indexOf(d[0].county) == -1 ? "grey" : scales.fill(d[0].county)
        })

    let avg_num_list = [];
    for (let i = 0; i < map_data["features"].length; ++i){
        if (county.indexOf(map_data["features"][i]["properties"]["county"]) != -1){
            avg_num_list.push(map_data["features"][i]["properties"]["avg"]);
        }
    }
    new_map_scales = make_map_scales(avg_num_list);

    d3.select("#map")
        .selectAll("path")
        .attr("fill", d => county.indexOf(d.properties.county) == -1 ? "grey" : new_map_scales.fill(d.properties.avg))
}

function make_brush(data, scales, map_data) {
  let brush = d3.brush()
      .extent([[0,0], [width, height]])
      .on("brush", ev => brush_update(ev, data, scales, map_data));

  d3.select("#brush")
      .attr("class", "brush")
      .call(brush);
}

function mouseover(d) {
  d3.select("#map")
      .selectAll("path")
      .attr("stroke-width", e => e.properties.county == d.properties.county ? 3 : 1);

  d3.select("#series")
      .selectAll("path")
      .attr("stroke-width", e => e[0].county == d.properties.county ? 3 : 1);
}

function transform_date(date_str) {
    const [year, str_month] = date_str.split(" ");
    let month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(str_month) / 3;
    let x = new Date(year, month, 1, 0, 0, 0);
    return x;
}

function visualize(files) {
    let data = files[0],
        map_data = files[1];

    data = data.filter(d => !isNaN(d.calfresh))
    data = data.map(d => {
        return {
            county: d.county,
            date: d.date,
            medi_cal: d.medi_cal,
            unemployment: d.unemployment,
            calfresh: d.calfresh,
            x: transform_date(d.date)
        }
    });

    let scales = make_scales(data);

    data = d3.flatGroup(data, d => d.county);
    let avg_num_list = [];

    for (let i = 0; i < data.length; ++i) {
        let temp = data[i][1];
        data[i] = temp;

        let calfresh_county = temp.map(d => d.calfresh),
            avg_num = calfresh_county.reduce((a, b) => a + b, 0) / calfresh_county.length;

        avg_num_list.push(avg_num);

        for (let j = 0; j < map_data["features"].length; j++) {
            if (map_data["features"][j]["properties"]["county"] == temp[0]["county"]) {
                map_data["features"][j]["properties"]["avg"] = avg_num;
                break;
            }
        }
    }

    map_scales = make_map_scales(avg_num_list)
    initialize(data, scales, map_data, map_scales);
}


let width = 500,
    height = 500;
margins = {left: 60, right: 60, top: 60, bottom: 60};

Promise.all([
    d3.csv("calfresh-small.csv", d3.autoType),
    d3.json("ca-counties.geojson")
]).then(visualize);