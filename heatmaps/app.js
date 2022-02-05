async function draw(el, scale) {
  //data 
  const dataset = await d3.json('data.json')
  dataset.sort((a,b) => a - b)

  //dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30

  //draw image
  const svg = d3.select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  //scales
  let colorScale;

  //The linear color scale uses a min-max mapping 
  //to build a linear continuous distribution of color
  //between a defined min-max extent
  if(scale === 'linear') {
    colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset))
      .range(['white','red'])
  } 
  
  //The quantize scale automatically defines buckets for color division
  //between specified color values
  else if(scale === 'quantize') {
    colorScale = d3.scaleQuantize()
      .domain(d3.extent(dataset))
      .range(['white', 'pink', 'red'])
  }

  //The quantile scale automatically defines buckets for color division
  //for equal distribution between specified ranges
  else if(scale === 'quantile') {
    colorScale = d3.scaleQuantile()
      .domain(dataset)
      .range(['white', 'pink', 'red'])
  }

  //The threshold scale allows the user to specify the distribution of buckets
  else if(scale === 'threshold') {
    colorScale = d3.scaleThreshold()
      .domain([45200, 135600])
      .range(['white', 'pink', 'red'])
  }

  //initialize rectangles
  svg.append('g')
    .attr('transform', 'translate(2,2)')
    .attr('stroke', 'black')
    .attr('fill','#ddd')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, i) => box * (i % 20))
    .attr('y', (d, i) => box * ((i /20) | 0))
    .attr('fill', (d) => colorScale(d))


}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'quantize')
draw('#heatmap3', 'quantile')
draw('#heatmap4', 'threshold')