import * as d3 from "d3";
import data from "./data.json";

const { width, height, values } = data;

// Set up SVG dimensions
const cellSize = 4; // Size of each cell in pixels
const svgWidth = width * cellSize;
const svgHeight = height * cellSize;

const container = d3.select("#heatmap-container");
const svg = container
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create a tooltip for hover interaction
const tooltip = container
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Define color scale
const colorScale = d3.scaleSequential(d3.interpolateViridis).domain(d3.extent(values));

// Bind data to rectangles
svg
  .selectAll("rect")
  .data(values)
  .enter()
  .append("rect")
  .attr("x", (i) => (i % width) * cellSize)
  .attr("y", (i) => Math.floor(i / width) * cellSize)
  .attr("width", cellSize)
  .attr("height", cellSize)
  .attr("fill", d => colorScale(d))
  .on("mouseover", function (event, d) {
    d3.select(this).attr("stroke", "#000").attr("stroke-width", 1);
    tooltip
      .style("opacity", 1)
      .html(`Elevation: ${d.toFixed(2)} m`)
  })
  .on("mouseout", function () {
    d3.select(this).attr("stroke", "none");
    tooltip.style("opacity", 0);
  });
