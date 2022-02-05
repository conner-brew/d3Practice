
async function draw() {
  //get data
  const dataset = await d3.json('data.json')

  const sizeAccessor = (d) => d.size 
  const nameAccessor = (d) => d.name 

  //set dimensions
  let dimensions = {
    width: 200,
    height: 500,
    margin: 50
  }

  //draw image by selecting html el and appending svg
  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  //create size scale
  const universeScale = d3.scaleLog()
    .domain(d3.extent(dataset, sizeAccessor))
    .range([
      dimensions.height - dimensions.margin,
      dimensions.margin
    ])

  //append g
  const circlesGroup = svg.append('g')

  //draw items
  circlesGroup.selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', dimensions.margin)
    .attr('cy', d => universeScale(sizeAccessor(d)))
    .attr('r', 6)

  //draw labels
  circlesGroup.selectAll('text')
    .data(dataset)
    .join('text')
    .attr('x', dimensions.margin + 15)
    .attr('y', d => universeScale(sizeAccessor(d)))
    .text(nameAccessor)

}

draw()