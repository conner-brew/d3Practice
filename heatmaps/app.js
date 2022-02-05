async function draw(el) {
  //data 
  const dataset = await d3.json('data.json')

  //dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const svg = d3.select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

}

draw('#heatmap1')