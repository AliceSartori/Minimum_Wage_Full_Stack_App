
// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("../Data/minwage_forgraph.csv").then(function(wagedata) {

    console.log(wagedata);


    wagedata.forEach(function(d) {
      wagedata.Year = +wagedata.Year;
      wagedata.State = wagedata.State;
      wagedata.Minwage = +wagedata.Minwage;
    });

    var nest = d3.nest()
	  .key(function(d){
	    return wagedata.State;
	  })
	  .key(function(d){
	  	return wagedata.Year;
	  })
	  .entries(wagedata)

    //var alabama = data.filter(function(d){ return data.State == "Alabama" })


    // List of groups (here I have one group per column)
    var allGroup = ["Alabama", "Alaska", "Arizona", "Arkansas"]

    // add the options to the button
    var statedropdown = d3.select("#selectButton")

    statedropdown
		.append("select")
		.selectAll("option")
        .data(nest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        })

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

// ---------------------------------------------------------------------
  // Configure a time scale with a range between 0 and the chartWidth
  // Set the domain for the xlinearscale function
  // d3.extent returns the an array containing the min and max values for the property specified
  var xlinearscale = d3.scaleLinear()
    .range([0, width])
    .domain(d3.extent(wagedata, data => data.Year))
    ;
    

  // Configure a linear scale with a range between the chartHeight and 0
  // Set the domain for the xLinearScale function
  var yLinearScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(wagedata, data => data.Minwage)]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xlinearscale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a drawLine function which will use our scales to plot the line's points
  var drawLine = d3
    .line()
    .x(data => xlinearscale(data.Year))
    .y(data => yLinearScale(data.Minwage));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for milesData
    .attr("d", drawLine(wagedata))
    .classed("line", true);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis);


})

